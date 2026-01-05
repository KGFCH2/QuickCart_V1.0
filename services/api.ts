
import { getDB, saveDB } from '../db';
import { Product, User, Order, UserRole, OrderStatus, CartItem, ProductCategory } from '../types';

const simulateDelay = () => new Promise(resolve => setTimeout(resolve, 600));

export const api = {
  // AUTH
  login: async (email: string, password: string): Promise<User> => {
    await simulateDelay();
    const db = getDB();
    const user = db.users.find(u => u.email === email && u.password === password);
    if (!user) throw new Error('Invalid credentials');
    db.currentUser = { ...user };
    delete db.currentUser.password;
    saveDB(db);
    return db.currentUser;
  },

  register: async (name: string, email: string, password: string): Promise<User> => {
    await simulateDelay();
    const db = getDB();

    const existing = db.users.find(u => u.email === email);
    if (existing) throw new Error('Email already registered');

    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      email,
      role: UserRole.CUSTOMER,
      password
    };

    db.users.push(newUser);
    db.currentUser = { ...newUser };
    delete db.currentUser.password;
    saveDB(db);
    return db.currentUser;
  },

  logout: async () => {
    const db = getDB();
    db.currentUser = null;
    saveDB(db);
  },

  getCurrentUser: (): User | null => getDB().currentUser,

  // PRODUCTS
  getProducts: async (category?: ProductCategory): Promise<Product[]> => {
    await simulateDelay();
    const db = getDB();
    return category ? db.products.filter(p => p.category === category) : db.products;
  },

  getProductById: async (id: string): Promise<Product | undefined> => {
    const db = getDB();
    return db.products.find(p => p.id === id);
  },

  // ORDERS
  placeOrder: async (items: CartItem[], shippingAddress: Order['shippingAddress']): Promise<Order> => {
    await simulateDelay();
    const db = getDB();
    if (!db.currentUser) throw new Error('Must be logged in');

    const orderItems = items.map(item => {
      const p = db.products.find(prod => prod.id === item.productId)!;
      // Update stock
      p.stock -= item.quantity;
      return {
        ...item,
        price: p.price,
        name: p.name
      };
    });

    const total = orderItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const order: Order = {
      id: 'ORD-' + Math.random().toString(36).substr(2, 6).toUpperCase(),
      userId: db.currentUser.id,
      items: orderItems,
      total,
      status: OrderStatus.PLACED,
      createdAt: new Date().toISOString(),
      shippingAddress
    };

    db.orders.push(order);
    saveDB(db);
    return order;
  },

  getOrders: async (): Promise<Order[]> => {
    await simulateDelay();
    const db = getDB();
    // Return only orders belonging to the logged-in user
    if (!db.currentUser) return [];
    return db.orders.filter(o => o.userId === db.currentUser.id);
  },

  getOrderById: async (id: string): Promise<Order | undefined> => {
    await simulateDelay();
    const db = getDB();
    return db.orders.find(o => o.id === id);
  },

  updateOrderStatus: async (orderId: string, status: OrderStatus): Promise<void> => {
    await simulateDelay();
    const db = getDB();
    const order = db.orders.find(o => o.id === orderId);
    if (order) order.status = status;
    saveDB(db);
  },

};
