import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, ShoppingBag, ArrowLeft, Plus, Minus, ShieldCheck } from 'lucide-react';
import { AppContext, formatCurrency } from '../App';
import { dataStore } from '../services/dataStore';
import { Product } from '../types';

const CartPage: React.FC = () => {
  const context = useContext(AppContext);
  const navigate = useNavigate();
  const [products, setProducts] = useState<Record<string, Product>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      const all = await dataStore.getProducts();
      const map: Record<string, Product> = {};
      all.forEach(p => map[p.id] = p);
      setProducts(map);
      setLoading(false);
    };
    loadProducts();
  }, []);

  const cartItems = context?.cart || [];
  const subtotal = cartItems.reduce((acc, item) => {
    const p = products[item.productId];
    return acc + (p ? p.price * item.quantity : 0);
  }, 0);
  const shipping = subtotal > 1500 ? 0 : 99;
  const tax = subtotal * 0.12;
  const total = subtotal + shipping + tax;

  const handleCheckoutClick = () => {
    if (!context?.user) {
      navigate('/auth?redirect=checkout');
    } else {
      navigate('/checkout');
    }
  };

  if (loading) return null;

  if (cartItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center">
        <div className="bg-red-50 p-8 rounded-full w-fit mx-auto mb-8 shadow-xl shadow-red-100/50">
          <ShoppingBag size={64} className="text-red-500" />
        </div>
        <h1 className="text-3xl font-extrabold mb-4 tracking-tighter uppercase static-brand-gradient">Your bag is empty</h1>
        <p className="text-gray-500 mb-10 text-lg font-medium">Ready to begin your acquisition journey?</p>
        <Link 
          to="/shop" 
          className="inline-flex items-center px-10 py-4 bg-red-600 hover:bg-red-700 text-white rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-xl shadow-red-100"
        >
          <ArrowLeft className="mr-2" size={16} />
          Go Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-black text-gray-900 mb-12 tracking-tighter uppercase"><span className="static-brand-gradient">Acquisition Bag</span></h1>
      
      <div className="flex flex-col lg:flex-row gap-12">
        <div className="flex-grow space-y-6">
          {cartItems.map(item => {
            const p = products[item.productId];
            if (!p) return null;
            return (
              <div key={item.productId} className="flex gap-6 p-6 bg-white border border-gray-100 rounded-[2rem] shadow-sm hover:shadow-xl transition-all group">
                <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gray-50 rounded-2xl overflow-hidden flex-shrink-0">
                  <img src={p.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div className="flex flex-col justify-between flex-grow">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-black text-gray-900 group-hover:text-red-500 transition-colors tracking-tight uppercase">{p.name}</h3>
                      <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest">{p.category}</p>
                    </div>
                    <button 
                      onClick={() => context?.removeFromCart(p.id)}
                      className="p-2 text-gray-300 hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                  
                  <div className="flex justify-between items-end mt-4">
                    <div className="flex items-center gap-4 bg-gray-50 rounded-xl p-1 border border-gray-100">
                      <button 
                        disabled={item.quantity <= 1}
                        onClick={() => context?.addToCart(p.id, -1)}
                        className="p-1.5 hover:bg-white rounded-lg disabled:opacity-30 text-red-500"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="font-black text-gray-900 min-w-[1.5rem] text-center">{item.quantity}</span>
                      <button 
                        onClick={() => context?.addToCart(p.id, 1)}
                        className="p-1.5 hover:bg-white rounded-lg text-red-500"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                    <span className="text-xl font-black text-red-500">{formatCurrency(p.price * item.quantity)}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="w-full lg:w-96 space-y-8">
          <div className="bg-white border border-gray-100 rounded-[2.5rem] p-8 shadow-sm">
            <h2 className="text-xl font-black text-gray-900 mb-8 uppercase tracking-tighter">Manifest Summary</h2>
            <div className="space-y-4">
              <div className="flex justify-between text-gray-500 text-sm font-bold">
                <span>Subtotal</span>
                <span className="text-gray-900">{formatCurrency(subtotal)}</span>
              </div>
              <div className="flex justify-between text-gray-500 text-sm font-bold">
                <span>Express Shipping</span>
                <span className="text-gray-900">
                  {shipping === 0 ? <span className="text-green-600">FREE</span> : formatCurrency(shipping)}
                </span>
              </div>
              <div className="flex justify-between text-gray-500 text-sm font-bold">
                <span>Estimated GST (12%)</span>
                <span className="text-gray-900">{formatCurrency(tax)}</span>
              </div>
              <div className="pt-6 border-t border-gray-100">
                <div className="flex justify-between items-baseline">
                  <span className="text-gray-400 text-xs font-black uppercase tracking-widest">Grand Total</span>
                  <span className="text-3xl font-black text-red-600">{formatCurrency(total)}</span>
                </div>
              </div>
            </div>
            
            <button 
              onClick={handleCheckoutClick}
              className="w-full mt-8 py-5 bg-red-600 hover:bg-red-700 text-white rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all shadow-xl shadow-red-100 active:scale-95"
            >
              Begin Checkout <ArrowLeft className="rotate-180" size={18} />
            </button>
            
            <div className="mt-8 flex items-center justify-center gap-2 text-[9px] font-black text-gray-400 uppercase tracking-widest">
              <ShieldCheck size={14} className="text-red-500" />
              Verified Secure Protocol
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;