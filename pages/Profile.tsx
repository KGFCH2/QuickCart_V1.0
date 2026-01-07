import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  User as UserIcon, Mail, Shield, Package, Heart, ShoppingBag,
  LogOut, Star, Clock, Loader2, ArrowRight
} from 'lucide-react';
import { AppContext, formatCurrency } from '../App';
import { dataStore } from '../services/dataStore';
import { Order, OrderStatus } from '../types';

const ProfilePage: React.FC = () => {
  const context = useContext(AppContext);
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!context?.user) {
      navigate('/auth');
      return;
    }

    const fetchData = async () => {
      try {
        const data = await dataStore.getOrders();
        setOrders(data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
      } catch (err) {
        // Silently handle fetch error
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [context?.user, navigate]);

  const handleLogout = async () => {
    if (context?.logout) {
      await context.logout();
      navigate('/');
    }
  };

  if (!context?.user || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin text-red-600" size={48} />
      </div>
    );
  }

  const recentOrders = orders.slice(0, 3);
  const wishlistCount = context.wishlist.length;
  const cartCount = context.cart.reduce((acc, i) => acc + i.quantity, 0);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 md:py-20">
      <div className="flex flex-col lg:flex-row gap-12">
        <div className="lg:w-1/3 space-y-8">
          <div className="bg-white border border-gray-100 rounded-[3rem] p-10 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/5 blur-3xl rounded-full pointer-events-none"></div>

            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="w-32 h-32 rounded-[2.5rem] bg-red-600 flex items-center justify-center text-white text-5xl font-black shadow-2xl shadow-red-200 mb-6">
                {context.user.name.charAt(0)}
              </div>
              <h1 className="text-3xl font-black text-gray-900 tracking-tighter mb-1">{context.user.name}</h1>
              <div className="inline-flex items-center gap-2 bg-red-50 text-red-600 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-8 border border-red-100">
                <Star size={12} fill="currentColor" /> Prime Elite Member V1.0
              </div>

              <div className="w-full space-y-4">
                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl border border-transparent hover:border-gray-100 transition-all text-left">
                  <div className="p-3 bg-white rounded-xl text-gray-400 group-hover:text-red-500 transition-colors"><Mail size={20} /></div>
                  <div>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">Email Address</p>
                    <p className="text-sm font-bold text-gray-700">{context.user.email}</p>
                  </div>
                </div>
              </div>

              <button
                onClick={handleLogout}
                className="w-full mt-10 py-4 bg-red-50 text-red-500 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-red-500 hover:text-white transition-all shadow-sm"
              >
                <LogOut size={16} /> SIGN OUT SECURELY
              </button>
            </div>
          </div>
        </div>

        <div className="flex-grow space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link to="/orders" className="bg-white border border-gray-100 p-8 rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all group">
              <Package size={28} className="text-red-600 mb-4 group-hover:scale-110 transition-transform" />
              <p className="text-3xl font-black text-gray-900 tracking-tighter">{orders.length}</p>
              <p className="text-xs font-black text-gray-400 uppercase tracking-widest mt-1">Total Orders</p>
            </Link>
            <Link to="/wishlist" className="bg-white border border-gray-100 p-8 rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all group">
              <Heart size={28} className="text-red-500 mb-4 group-hover:scale-110 transition-transform" />
              <p className="text-3xl font-black text-gray-900 tracking-tighter">{wishlistCount}</p>
              <p className="text-xs font-black text-gray-400 uppercase tracking-widest mt-1">Wishlist Items</p>
            </Link>
            <Link to="/cart" className="bg-white border border-gray-100 p-8 rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all group">
              <ShoppingBag size={28} className="text-orange-500 mb-4 group-hover:scale-110 transition-transform" />
              <p className="text-3xl font-black text-gray-900 tracking-tighter">{cartCount}</p>
              <p className="text-xs font-black text-gray-400 uppercase tracking-widest mt-1">In Bag</p>
            </Link>
          </div>

          <div>
            <div className="flex justify-between items-end mb-8">
              <div>
                <h2 className="text-4xl font-black text-gray-900 tracking-tighter">Recent Activity</h2>
                <p className="text-gray-400 font-medium mt-1">Live tracking of your curated V1.0 acquisitions.</p>
              </div>
              <Link to="/orders" className="text-red-600 font-black text-xs uppercase tracking-[0.2em] flex items-center gap-2 hover:underline">
                View History <ArrowRight size={14} />
              </Link>
            </div>

            <div className="space-y-6">
              {recentOrders.length > 0 ? (
                recentOrders.map(order => (
                  <div key={order.id} className="bg-white border border-gray-100 rounded-[2.5rem] p-8 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row items-center gap-8 group">
                    <div className="p-5 bg-red-50 rounded-3xl text-red-600 flex-shrink-0 group-hover:bg-red-600 group-hover:text-white transition-all">
                      <Clock size={32} />
                    </div>
                    <div className="flex-grow text-center md:text-left">
                      <div className="flex flex-wrap justify-center md:justify-start items-center gap-3 mb-2">
                        <span className="text-lg font-black text-gray-900 uppercase tracking-tighter">{order.id}</span>
                        <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${order.status === OrderStatus.DELIVERED ? 'bg-green-50 text-green-600 border-green-100' : 'bg-red-50 text-red-600 border-red-100'
                          }`}>
                          {order.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 font-medium">{order.items.length} items • {formatCurrency(order.total)}</p>
                    </div>
                    <Link to="/orders" className="px-6 py-3 bg-gray-900 text-white rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-red-600 transition-all flex items-center gap-2">
                      Track Order <ArrowRight size={14} />
                    </Link>
                  </div>
                ))
              ) : (
                <div className="text-center py-20 bg-gray-50 border-2 border-dashed border-gray-100 rounded-[3rem]">
                  <ShoppingBag size={48} className="text-gray-200 mx-auto mb-6" />
                  <p className="text-gray-400 font-black uppercase tracking-widest text-sm">No recent transactions</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;