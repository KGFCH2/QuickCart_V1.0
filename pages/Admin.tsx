import React, { useState, useEffect, useContext } from 'react';
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, Package, ShoppingCart, Users, TrendingUp, 
  Plus, Edit, Trash2, Check, X, ArrowLeft, Loader2
} from 'lucide-react';
import { api } from '../services/api';
import { AppContext, formatCurrency } from '../App';
import { UserRole, Product, Order, DashboardStats, OrderStatus, ProductCategory } from '../types';

const AdminDashboard = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const data = await api.getAdminStats();
      setStats(data);
      setLoading(false);
    };
    fetch();
  }, []);

  if (loading) return <div className="p-8 flex justify-center"><Loader2 className="animate-spin text-red-600" /></div>;

  const cards = [
    { label: 'Total Revenue', value: formatCurrency(stats?.totalRevenue || 0), icon: TrendingUp, color: 'text-green-600', bg: 'bg-green-50' },
    { label: 'Orders', value: stats?.totalOrders, icon: ShoppingCart, color: 'text-red-600', bg: 'bg-red-50' },
    { label: 'Products', value: stats?.totalProducts, icon: Package, color: 'text-orange-600', bg: 'bg-orange-50' },
    { label: 'Customers', value: stats?.totalCustomers, icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
  ];

  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {cards.map((card, idx) => (
          <div key={idx} className="bg-white border border-gray-100 p-5 sm:p-6 rounded-2xl sm:rounded-3xl shadow-sm hover:shadow-md transition-shadow">
            <div className={`p-2.5 sm:p-3 rounded-xl sm:rounded-2xl w-fit ${card.bg} ${card.color} mb-3 sm:mb-4`}>
              <card.icon size={20} />
            </div>
            <p className="text-gray-500 text-xs sm:text-sm font-medium">{card.label}</p>
            <p className="text-2xl sm:text-3xl font-black text-gray-900 mt-0.5 sm:mt-1">{card.value}</p>
          </div>
        ))}
      </div>
      
      <div className="bg-white border border-gray-100 rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-sm">
        <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6 uppercase tracking-tighter">2026 Sales Dynamics</h3>
        <div className="h-48 sm:h-64 flex items-center justify-center text-gray-400 bg-gray-50 rounded-xl sm:rounded-2xl border-2 border-dashed border-gray-200 text-xs sm:text-sm px-4 text-center font-black uppercase tracking-widest">
          Predictive Analytics Engine - V1.0 Stable
        </div>
      </div>
    </div>
  );
};

const ProductManager = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isEditing, setIsEditing] = useState<Partial<Product> | null>(null);
  const [loading, setLoading] = useState(true);

  const fetch = async () => {
    setLoading(true);
    const data = await api.getProducts();
    setProducts(data);
    setLoading(false);
  };

  useEffect(() => { fetch(); }, []);

  const handleDelete = async (id: string) => {
    if (confirm('Permanently remove this acquisition from catalog?')) {
      await api.adminDeleteProduct(id);
      fetch();
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    await api.adminUpsertProduct(isEditing!);
    setIsEditing(null);
    fetch();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tighter">Boutique Inventory</h2>
        <button 
          onClick={() => setIsEditing({ name: '', price: 0, stock: 0, category: ProductCategory.GROCERY, description: '', image: '' })}
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 bg-red-600 text-white rounded-xl font-black text-xs uppercase tracking-widest hover:bg-red-700 transition-all shadow-lg shadow-red-100"
        >
          <Plus size={18} /> New Product
        </button>
      </div>

      {isEditing && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4 overflow-y-auto">
          <form onSubmit={handleSave} className="bg-white rounded-2xl sm:rounded-[2.5rem] p-6 sm:p-10 max-w-xl w-full shadow-2xl my-8 animate-in zoom-in-95 duration-300">
            <h3 className="text-xl sm:text-2xl font-black mb-8 uppercase tracking-tighter">{isEditing.id ? 'Refine' : 'Register'} Acquisition</h3>
            <div className="grid grid-cols-2 gap-6">
              <div className="col-span-2 space-y-1">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Product Descriptor</label>
                <input required className="w-full p-4 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-4 focus:ring-red-50 focus:border-red-600 transition-all font-bold text-sm" value={isEditing.name} onChange={e => setIsEditing({...isEditing, name: e.target.value})} />
              </div>
              <div className="col-span-2 sm:col-span-1 space-y-1">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Studio Category</label>
                <select className="w-full p-4 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-4 focus:ring-red-50 focus:border-red-600 transition-all font-bold text-sm" value={isEditing.category} onChange={e => setIsEditing({...isEditing, category: e.target.value as any})}>
                  {Object.values(ProductCategory).map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div className="col-span-1 space-y-1">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Price Point (₹)</label>
                <input type="number" step="0.01" required className="w-full p-4 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-4 focus:ring-red-50 focus:border-red-600 transition-all font-bold text-sm" value={isEditing.price} onChange={e => setIsEditing({...isEditing, price: parseFloat(e.target.value)})} />
              </div>
              <div className="col-span-1 space-y-1">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Stock Level</label>
                <input type="number" required className="w-full p-4 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-4 focus:ring-red-50 focus:border-red-600 transition-all font-bold text-sm" value={isEditing.stock} onChange={e => setIsEditing({...isEditing, stock: parseInt(e.target.value)})} />
              </div>
              <div className="col-span-2 space-y-1">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Asset URL</label>
                <input className="w-full p-4 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-4 focus:ring-red-50 focus:border-red-600 transition-all font-bold text-sm" value={isEditing.image} onChange={e => setIsEditing({...isEditing, image: e.target.value})} />
              </div>
              <div className="col-span-2 space-y-1">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Detail Brief</label>
                <textarea className="w-full p-4 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-4 focus:ring-red-50 focus:border-red-600 transition-all font-medium text-sm h-28" value={isEditing.description} onChange={e => setIsEditing({...isEditing, description: e.target.value})} />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 mt-10">
              <button type="submit" className="flex-grow py-4 bg-red-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-red-700 transition-all shadow-xl">Confirm Registry</button>
              <button type="button" onClick={() => setIsEditing(null)} className="px-8 py-4 bg-gray-100 text-gray-600 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-gray-200 transition-all">Dismiss</button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white border border-gray-100 rounded-[2.5rem] overflow-hidden shadow-sm">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left min-w-[640px]">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Asset</th>
                <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Department</th>
                <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Value</th>
                <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Quantity</th>
                <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {products.map(p => (
                <tr key={p.id} className="hover:bg-red-50/10 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <img src={p.image} className="w-12 h-12 rounded-xl object-cover flex-shrink-0 shadow-sm group-hover:scale-105 transition-transform" />
                      <span className="font-black text-gray-900 text-sm truncate max-w-[150px] uppercase tracking-tighter">{p.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">{p.category}</td>
                  <td className="px-6 py-4 font-black text-red-600 text-sm">{formatCurrency(p.price)}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${p.stock < 10 ? 'bg-red-50 text-red-600 border-red-100' : 'bg-green-50 text-green-600 border-green-100'}`}>
                      {p.stock} units
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button onClick={() => setIsEditing(p)} className="p-2.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"><Edit size={16} /></button>
                      <button onClick={() => handleDelete(p.id)} className="p-2.5 text-gray-400 hover:text-red-700 hover:bg-red-50 rounded-xl transition-all"><Trash2 size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const OrderManager = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const fetch = async () => setOrders(await api.getOrders());
  useEffect(() => { fetch(); }, []);

  const handleStatusUpdate = async (id: string, status: OrderStatus) => {
    await api.updateOrderStatus(id, status);
    fetch();
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tighter">Fleet Logistics Control</h2>
      <div className="bg-white border border-gray-100 rounded-[2.5rem] overflow-hidden shadow-sm">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left min-w-[700px]">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Audit ID</th>
                <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Client</th>
                <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Total Value</th>
                <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Fulfillment</th>
                <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Modifier</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {orders.map(o => (
                <tr key={o.id} className="hover:bg-red-50/10 transition-colors">
                  <td className="px-6 py-4 font-black text-gray-900 text-sm tracking-tighter">{o.id}</td>
                  <td className="px-6 py-4">
                    <p className="font-black text-sm text-gray-900 leading-none uppercase tracking-tighter">{o.shippingAddress.name}</p>
                    <p className="text-gray-400 text-[10px] mt-1 truncate max-w-[120px] font-bold">{o.shippingAddress.email}</p>
                  </td>
                  <td className="px-6 py-4 font-black text-red-600 text-sm">{formatCurrency(o.total)}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${
                      o.status === OrderStatus.DELIVERED ? 'bg-green-50 text-green-600 border-green-100' : 'bg-red-50 text-red-600 border-red-100'
                    }`}>
                      {o.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <select 
                      className="text-[10px] font-black uppercase bg-gray-50 border border-gray-100 rounded-xl px-3 py-2 focus:outline-none focus:ring-4 focus:ring-red-50 transition-all cursor-pointer"
                      value={o.status}
                      onChange={(e) => handleStatusUpdate(o.id, e.target.value as OrderStatus)}
                    >
                      {Object.values(OrderStatus).map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const AdminPage: React.FC = () => {
  const context = useContext(AppContext);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (context?.user?.role !== UserRole.ADMIN) navigate('/shop');
  }, [context, navigate]);

  const menuItems = [
    { label: 'Intelligence', path: '/admin', icon: LayoutDashboard },
    { label: 'Catalog', path: '/admin/products', icon: Package },
    { label: 'Logistics', path: '/admin/orders', icon: ShoppingCart },
  ];

  return (
    <div className="flex flex-col md:flex-row min-h-[calc(100vh-80px)]">
      <aside className="w-full md:w-72 bg-white border-b md:border-b-0 md:border-r border-gray-100 flex-shrink-0">
        <div className="p-6 overflow-x-auto no-scrollbar md:overflow-visible">
          <p className="hidden md:block text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] mb-10">Administrative Tier</p>
          <nav className="flex md:flex-col gap-3 md:space-y-1">
            {menuItems.map(item => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-6 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all whitespace-nowrap flex-grow md:flex-grow-0 justify-center md:justify-start ${
                  location.pathname === item.path 
                  ? 'bg-red-600 text-white shadow-xl shadow-red-500/20 translate-x-1' 
                  : 'text-gray-400 hover:bg-red-50 hover:text-red-600'
                }`}
              >
                <item.icon size={18} />
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </aside>

      <main className="flex-grow bg-gray-50/50 p-6 sm:p-12 overflow-x-hidden">
        <div className="max-w-6xl mx-auto">
          <Routes>
            <Route path="/" element={<AdminDashboard />} />
            <Route path="/products" element={<ProductManager />} />
            <Route path="/orders" element={<OrderManager />} />
          </Routes>
        </div>
      </main>
    </div>
  );
};

export default AdminPage;