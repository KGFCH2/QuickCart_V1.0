
// Fixed: Added ADMIN role to UserRole enum to support administrative access
export enum UserRole {
  CUSTOMER = 'CUSTOMER',
  ADMIN = 'ADMIN'
}

export enum OrderStatus {
  PLACED = 'PLACED',
  PACKED = 'PACKED',
  SHIPPED = 'SHIPPED',
  DELIVERED = 'DELIVERED'
}

export enum ProductCategory {
  MENS_WEAR = "Men's Wear",
  WOMENS_WEAR = "Women's Wear",
  KIDS_WEAR = "Kids' Wear",
  MENS_WATCHES = "Men's Watches",
  WOMENS_WATCHES = "Women's Watches",
  ELECTRONICS = 'Electronics',
  GROCERY = 'Grocery',
  MOBILE = 'Mobile',
  HOME = 'Home',
  BEAUTY = 'Beauty'
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  password?: string;
}

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  price: number;
  description: string;
  image: string;
  stock: number;
}

export interface CartItem {
  productId: string;
  quantity: number;
}

export interface Order {
  id: string;
  userId: string;
  items: (CartItem & { price: number; name: string })[];
  total: number;
  status: OrderStatus;
  createdAt: string;
  shippingAddress: {
    name: string;
    email: string;
    address: string;
    city: string;
    zip: string;
  };
}

// Fixed: Defined DashboardStats interface to resolve missing export error in api.ts and Admin.tsx
export interface DashboardStats {
  totalRevenue: number;
  totalOrders: number;
  totalProducts: number;
  totalCustomers: number;
}
