
import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, CreditCard, Truck, CheckCircle2, Loader2, Download, AlertCircle, ShoppingCart } from 'lucide-react';
import { AppContext, formatCurrency } from '../App';
import { dataStore } from '../services/dataStore';
import { Product, Order } from '../types';
import { generateOrderReceipt } from '../services/logistics';

const CheckoutPage: React.FC = () => {
  const context = useContext(AppContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<Record<string, Product>>({});
  const [success, setSuccess] = useState(false);
  const [lastOrder, setLastOrder] = useState<Order | null>(null);
  const [paymentMode, setPaymentMode] = useState<'upi' | 'cod'>('upi');
  const [upiId, setUpiId] = useState('');
  const [upiError, setUpiError] = useState('');
  const [zipError, setZipError] = useState('');

  const [formData, setFormData] = useState({
    name: context?.user?.name || '',
    email: context?.user?.email || '',
    address: '',
    city: '',
    zip: '',
  });

  useEffect(() => {
    if (!context?.user && !success) {
      navigate('/auth?redirect=checkout');
      return;
    }
    if (!context?.cart.length && !success) {
      navigate('/shop');
      return;
    }
    const fetch = async () => {
      const data = await dataStore.getProducts();
      const map: any = {};
      data.forEach(p => map[p.id] = p);
      setProducts(map);
    };
    fetch();
  }, [context, navigate, success]);

  const validateUpi = (id: string) => {
    const upiRegex = /^[\w.-]+@[\w.-]+$/;
    return upiRegex.test(id);
  };

  const validateZip = (zip: string) => {
    return /^\d{6}$/.test(zip);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setZipError('');
    setUpiError('');

    if (!context?.user) {
      navigate('/auth?redirect=checkout');
      return;
    }

    if (!validateZip(formData.zip)) {
      setZipError('Pincode must be exactly 6 numeric digits.');
      return;
    }

    if (paymentMode === 'upi') {
      if (!validateUpi(upiId)) {
        setUpiError('Please enter a valid UPI ID (e.g., user@bank)');
        return;
      }
    }
    
    setLoading(true);
    try {
      const order = await dataStore.placeOrder(context.cart, {
        name: formData.name,
        email: formData.email,
        address: formData.address,
        city: formData.city,
        zip: formData.zip
      });
      setLastOrder(order);
      setSuccess(true);
      context.clearCart();
    } catch (err) {
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const downloadReceipt = () => {
    if (!lastOrder) return;
    generateOrderReceipt(lastOrder);
  };

  const subtotal = context?.cart.reduce((acc, i) => acc + (products[i.productId]?.price || 0) * i.quantity, 0) || 0;
  const shipping = subtotal > 1500 ? 0 : 99;
  const tax = subtotal * 0.12;
  const total = subtotal + shipping + tax;

  if (success) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-24 text-center animate-in fade-in zoom-in-95 duration-500">
        <div className="bg-red-50 p-8 rounded-full w-fit mx-auto mb-8 shadow-xl shadow-red-100">
          <CheckCircle2 size={64} className="text-red-600" />
        </div>
        <h1 className="text-4xl font-black text-gray-900 mb-4 tracking-tighter uppercase">Order Confirmed</h1>
        <p className="text-lg text-gray-500 mb-10 font-medium leading-relaxed">Thank you for shopping with ClickBazaar. Your acquisition manifest has been finalized and processed for immediate fulfillment.</p>
        
        <div className="bg-white border border-gray-100 rounded-[2.5rem] p-8 mb-10 text-left shadow-2xl">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <h3 className="font-black text-gray-900 flex items-center gap-2 uppercase tracking-tighter">
              <Truck size={20} className="text-red-600" />
              Fulfillment Point
            </h3>
            <button 
              onClick={downloadReceipt}
              className="flex items-center gap-2 text-red-600 font-black text-[10px] uppercase tracking-widest hover:underline bg-red-50 px-4 py-2 rounded-xl transition-all"
            >
              <Download size={14} /> Download Receipt
            </button>
          </div>
          <p className="text-gray-800 font-bold">{formData.name}</p>
          <p className="text-gray-500 font-medium text-sm leading-relaxed">{formData.address}, {formData.city}, India - {formData.zip}</p>
          <div className="mt-6 pt-6 border-t border-gray-100">
            <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">Transaction Identity</p>
            <p className="text-sm font-bold text-gray-900 uppercase">Payment Mode: {paymentMode}</p>
            {paymentMode === 'upi' && <p className="text-xs text-red-500 font-bold mt-1">UPI: {upiId}</p>}
            <p className="text-[10px] font-black text-red-600 mt-4 uppercase tracking-[0.2em] bg-red-50 w-fit px-3 py-1 rounded-full border border-red-100">Audit ID: {lastOrder?.id}</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button onClick={() => navigate('/orders')} className="px-10 py-5 bg-red-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-red-700 transition-all shadow-xl active:scale-95">Track Acquisition</button>
          <button onClick={() => navigate('/shop')} className="px-10 py-5 bg-gray-100 text-gray-600 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-gray-200 transition-all">Enter Catalog</button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-black text-gray-900 mb-12 tracking-tighter uppercase"><span className="static-brand-gradient">Secure Gate</span></h1>
      
      <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row gap-12">
        <div className="flex-grow space-y-8">
          <div className="bg-white border border-gray-100 rounded-[2.5rem] p-10 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-10">
              <div className="bg-red-50 p-2 rounded-xl text-red-600">
                <Truck size={24} />
              </div>
              <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tighter">Shipping Logistics</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2 md:col-span-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Full Legal Name</label>
                <input 
                  required
                  className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-red-50 focus:border-red-600 outline-none transition-all font-bold text-sm"
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Delivery Address</label>
                <input 
                  required
                  className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-red-50 focus:border-red-600 outline-none transition-all font-bold text-sm"
                  value={formData.address}
                  onChange={e => setFormData({...formData, address: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">City Hub</label>
                <input 
                  required
                  className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-red-50 focus:border-red-600 outline-none transition-all font-bold text-sm"
                  value={formData.city}
                  onChange={e => setFormData({...formData, city: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Postal Code (India)</label>
                <input 
                  required
                  maxLength={6}
                  placeholder="6 Digits"
                  className={`w-full px-6 py-4 bg-gray-50 border rounded-2xl focus:ring-4 focus:ring-red-50 focus:border-red-600 outline-none transition-all font-bold text-sm ${zipError ? 'border-red-500' : 'border-gray-100'}`}
                  value={formData.zip}
                  onChange={e => setFormData({...formData, zip: e.target.value.replace(/\D/g, '')})}
                />
                {zipError && <p className="text-[10px] text-red-500 font-black uppercase mt-1 ml-1">{zipError}</p>}
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-100 rounded-[2.5rem] p-10 shadow-sm">
            <div className="flex items-center gap-3 mb-10">
              <div className="bg-red-50 p-2 rounded-xl text-red-600">
                <CreditCard size={24} />
              </div>
              <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tighter">Settlement Protocol</h2>
            </div>
            
            <div className="space-y-8">
              <div className="grid grid-cols-2 gap-6">
                <button 
                  type="button"
                  onClick={() => setPaymentMode('upi')}
                  className={`p-8 rounded-[2rem] border-2 transition-all flex flex-col items-center gap-3 group relative overflow-hidden ${paymentMode === 'upi' ? 'border-red-600 bg-red-50 text-red-700 shadow-xl' : 'border-gray-100 bg-gray-50 text-gray-400 hover:border-red-100'}`}
                >
                  <ShoppingCart size={24} className="group-hover:scale-110 transition-transform" />
                  <span className="font-black text-xs uppercase tracking-widest">Unified Payments (UPI)</span>
                </button>
                <button 
                  type="button"
                  onClick={() => setPaymentMode('cod')}
                  className={`p-8 rounded-[2rem] border-2 transition-all flex flex-col items-center gap-3 group relative overflow-hidden ${paymentMode === 'cod' ? 'border-red-600 bg-red-50 text-red-700 shadow-xl' : 'border-gray-100 bg-gray-50 text-gray-400 hover:border-red-100'}`}
                >
                  <Truck size={24} className="group-hover:scale-110 transition-transform" />
                  <span className="font-black text-xs uppercase tracking-widest">Cash on Delivery</span>
                </button>
              </div>

              {paymentMode === 'upi' && (
                <div className="space-y-3 animate-in slide-in-from-top-2 duration-300">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Verified UPI ID</label>
                  <div className="relative">
                    <input 
                      required
                      placeholder="merchant@vpa"
                      className={`w-full px-6 py-5 bg-gray-50 border rounded-2xl focus:ring-4 focus:ring-red-50 focus:border-red-600 outline-none transition-all font-black text-sm ${upiError ? 'border-red-500' : 'border-gray-100'}`}
                      value={upiId}
                      onChange={e => { setUpiId(e.target.value); setUpiError(''); }}
                    />
                    <div className="absolute right-6 top-1/2 -translate-y-1/2 text-[10px] font-black text-red-600 uppercase tracking-widest pointer-events-none opacity-40">Auto-Check Active</div>
                  </div>
                  {upiError && (
                    <p className="text-[10px] text-red-600 font-black uppercase flex items-center gap-1.5 mt-2 ml-1">
                      <AlertCircle size={14} /> {upiError}
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="w-full lg:w-96">
          <div className="bg-gray-950 rounded-[3rem] p-10 shadow-2xl sticky top-28 border border-white/5 overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/10 blur-[60px] rounded-full pointer-events-none"></div>
            <h2 className="text-xl font-black text-white mb-8 uppercase tracking-tighter">Acquisition Ledger</h2>
            <div className="space-y-5 mb-10 max-h-64 overflow-y-auto pr-3 custom-scrollbar">
              {context?.cart.map(item => {
                const p = products[item.productId];
                return (
                  <div key={item.productId} className="flex justify-between items-start gap-4 py-3 border-b border-white/5">
                    <div className="text-xs text-gray-400 font-bold truncate max-w-[140px] uppercase">{p?.name} <span className="text-red-500 font-black">x{item.quantity}</span></div>
                    <span className="text-white font-black text-xs whitespace-nowrap">{formatCurrency((p?.price || 0) * item.quantity)}</span>
                  </div>
                );
              })}
            </div>
            <div className="pt-6 border-t border-white/10 flex flex-col gap-4">
              <div className="flex justify-between text-[10px] font-black text-gray-500 uppercase tracking-widest">
                <span>Total Items Value</span>
                <span className="text-gray-300">{formatCurrency(subtotal)}</span>
              </div>
              <div className="flex justify-between items-baseline">
                <span className="text-white font-black text-sm uppercase tracking-tighter">Settlement Total</span>
                <span className="text-3xl font-black text-red-600">{formatCurrency(total)}</span>
              </div>
            </div>
            <button 
              type="submit"
              disabled={loading}
              className="w-full mt-10 py-5 bg-red-600 hover:bg-red-700 text-white rounded-[1.5rem] font-black text-xs uppercase tracking-widest transition-all shadow-xl shadow-red-500/20 flex items-center justify-center gap-3 disabled:opacity-50 active:scale-95"
            >
              {loading ? <Loader2 className="animate-spin" size={18} /> : <ShieldCheck size={18} />}
              {loading ? 'Finalizing...' : 'Authorize Transaction'}
            </button>
            <p className="mt-6 text-center text-[8px] font-black text-gray-600 uppercase tracking-[0.3em]">PCI-DSS Level 1 Encryption V1.0</p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CheckoutPage;
