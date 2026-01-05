
import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Package, Truck, CheckCircle2, Clock, Search, X, MapPin, ArrowRight, Box, Download, Loader2 } from 'lucide-react';
import { dataStore } from '../services/dataStore';
import { Order, OrderStatus } from '../types';
import { AppContext, formatCurrency } from '../App';
import { generateOrderReceipt } from '../services/logistics';

const StatusBadge = ({ status }: { status: OrderStatus }) => {
  const configs = {
    [OrderStatus.PLACED]: { icon: Clock, color: 'bg-blue-100 text-blue-700 border-blue-200' },
    [OrderStatus.PACKED]: { icon: Package, color: 'bg-amber-100 text-amber-700 border-amber-200' },
    [OrderStatus.SHIPPED]: { icon: Truck, color: 'bg-orange-100 text-orange-700 border-orange-200' },
    [OrderStatus.DELIVERED]: { icon: CheckCircle2, color: 'bg-red-100 text-red-700 border-red-200' }
  };
  const config = configs[status] || configs[OrderStatus.PLACED];
  const { icon: Icon, color } = config;
  return (
    <span className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase border ${color} whitespace-nowrap`}>
      <Icon size={12} />
      {status}
    </span>
  );
};

const ShipmentModal: React.FC<{ order: Order; isOpen: boolean; onClose: () => void }> = ({ order, isOpen, onClose }) => {
  const context = useContext(AppContext);

  useEffect(() => {
    if (isOpen) {
      context?.setHideLayout(true);
      document.body.style.overflow = 'hidden';
    } else {
      context?.setHideLayout(false);
      document.body.style.overflow = 'unset';
    }
    return () => {
      context?.setHideLayout(false);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const createdAt = new Date(order.createdAt);
  const addTime = (date: Date, days: number, hour: number, minute: number) => {
    const r = new Date(date);
    r.setDate(r.getDate() + days);
    r.setHours(hour, minute, 0);
    return r;
  };

  const timeline = [
    { label: 'Order Placed', date: createdAt, icon: Package, active: true },
    { label: 'Packed & Processed', date: addTime(createdAt, 1, 9, 30), icon: Box, active: order.status !== OrderStatus.PLACED },
    { label: 'Dispatched to Hub', date: addTime(createdAt, 3, 11, 45), icon: Truck, active: order.status === OrderStatus.SHIPPED || order.status === OrderStatus.DELIVERED },
    { label: 'Final Delivery', date: addTime(createdAt, 5, 17, 15), icon: CheckCircle2, active: order.status === OrderStatus.DELIVERED }
  ];

  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4 sm:p-6 bg-slate-950 animate-in fade-in duration-300">
      <div className="bg-white w-full max-h-[90vh] sm:max-w-2xl sm:rounded-[3rem] shadow-2xl overflow-hidden flex flex-col relative animate-in zoom-in-95 duration-500">

        {/* Header - Fixed Height */}
        <div className="bg-red-600 p-8 sm:p-10 text-white flex-shrink-0 flex justify-between items-center shadow-lg relative z-10">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tighter uppercase leading-tight">Live Tracker</h2>
            <p className="text-red-100 text-[10px] font-black tracking-widest opacity-80 uppercase">ID: {order.id}</p>
          </div>
          <button
            onClick={onClose}
            className="p-3 bg-white/20 hover:bg-white/30 rounded-full transition-all active:scale-90"
          >
            <X size={28} />
          </button>
        </div>

        {/* Content - Scrollable on Desktop & Mobile */}
        <div className="flex-grow overflow-y-auto custom-scrollbar p-6 sm:p-12 bg-white">
          <div className="space-y-12 relative">
            <div className="absolute left-[27px] top-6 bottom-6 w-[3px] bg-gray-100"></div>
            {timeline.map((step, idx) => (
              <div key={idx} className="flex gap-8 items-start relative z-10">
                <div className={`p-4 rounded-2xl shadow-xl transition-all duration-500 flex-shrink-0 ${step.active ? 'bg-red-600 text-white scale-110' : 'bg-white border-2 border-gray-100 text-gray-200'}`}>
                  <step.icon size={24} />
                </div>
                <div className="flex-grow pt-2">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 mb-2">
                    <h4 className={`font-black text-base uppercase tracking-tight ${step.active ? 'text-gray-900' : 'text-gray-300'}`}>{step.label}</h4>
                    <span className={`text-[11px] font-black uppercase tracking-widest whitespace-nowrap ${step.active ? 'text-red-600' : 'text-gray-300'}`}>
                      {step.date.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                    </span>
                  </div>
                  <p className={`text-xs font-bold leading-relaxed ${step.active ? 'text-gray-500' : 'text-gray-300'}`}>
                    Confirmed Milestone: {step.date.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 pt-8 border-t border-gray-100 space-y-8">
            <div className="bg-gray-50 rounded-[2rem] p-6 border border-gray-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-red-100 text-red-600 rounded-xl">
                  <MapPin size={18} />
                </div>
                <h5 className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Acquisition Destination</h5>
              </div>
              <p className="text-sm font-black text-gray-800 leading-relaxed">
                {order.shippingAddress.name}<br />
                {order.shippingAddress.address}, {order.shippingAddress.city}<br />
                <span className="text-red-600">Pincode: {order.shippingAddress.zip}</span>
              </p>
            </div>
            <button
              onClick={onClose}
              className="w-full py-5 bg-slate-950 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-2xl active:scale-95 transition-all mb-4"
            >
              Dismiss Tracker
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const OrderHistoryPage: React.FC = () => {
  const context = useContext(AppContext);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  useEffect(() => {
    const fetch = async () => {
      if (context?.user) {
        const data = await dataStore.getOrders();
        setOrders(data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
      }
      setLoading(false);
    };
    fetch();
  }, [context?.user]);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <section className="relative h-[350px] flex items-center overflow-hidden bg-slate-900">
        <div className="absolute inset-0 opacity-40 bg-[url('https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=1920')] bg-cover bg-center"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full pt-10">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 bg-red-600 text-white rounded-lg"><Truck size={18} /></div>
              <span className="text-[10px] font-black uppercase text-red-300 tracking-widest">Fulfillment Logistics V1.0</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white leading-tight tracking-tighter uppercase">Audit <span className="animated-brand-gradient">Center</span></h1>
            <p className="text-gray-300 mt-4 font-medium max-w-lg">Real-time status monitor for your ClickBazaar acquisitions.</p>
          </div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-6 py-12 -mt-12 relative z-10 w-full mb-20">
        {!context?.user && !loading ? (
          <div className="bg-white/90 backdrop-blur-xl p-10 sm:p-16 rounded-[3rem] border border-gray-100 shadow-2xl text-center">
            <div className="max-w-md mx-auto space-y-6">
              <div className="space-y-3">
                <p className="text-gray-600 font-bold text-base">Sign in to view your orders</p>
                <Link to="/auth" className="w-full py-5 bg-red-600 text-white rounded-2xl font-black tracking-widest shadow-xl hover:bg-red-700 active:scale-95 transition-all inline-block">
                  SIGN IN / REGISTER
                </Link>
              </div>
            </div>
            <p className="mt-8 text-gray-400 font-bold text-[10px] uppercase tracking-[0.3em]">Sign in for automated fleet sync</p>
          </div>
        ) : (
          <div className="space-y-12">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-20 gap-4">
                <Loader2 className="animate-spin text-red-600" size={40} />
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Querying Logistics Hub...</p>
              </div>
            ) : orders.length > 0 ? (
              <div className="space-y-10">
                {orders.map(order => (
                  <div key={order.id} className="bg-white border border-gray-100 rounded-[2.5rem] shadow-sm hover:shadow-2xl transition-all overflow-hidden group">
                    <div className="bg-gray-50/50 px-8 py-6 border-b flex flex-wrap justify-between items-center gap-4">
                      <div>
                        <p className="text-[9px] text-gray-400 uppercase font-black tracking-widest mb-1">Audit Identifier</p>
                        <p className="font-black text-gray-900 text-xl tracking-tighter group-hover:text-red-600 transition-colors">{order.id}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <button onClick={() => generateOrderReceipt(order)} className="flex items-center gap-2 bg-white px-5 py-2.5 rounded-xl text-red-600 font-black text-[10px] border border-red-50 hover:bg-red-50 transition-all shadow-sm"><Download size={14} /> PDF INVOICE</button>
                        <StatusBadge status={order.status} />
                      </div>
                    </div>
                    <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-12">
                      <div className="space-y-5">
                        <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest pb-2 border-b">Acquisition Manifest</h4>
                        <div className="space-y-3 max-h-48 overflow-y-auto pr-3 custom-scrollbar">
                          {order.items.map((item, idx) => (
                            <div key={idx} className="flex justify-between items-center text-xs font-bold"><span className="text-gray-600 truncate max-w-[200px]">{item.name} <span className="text-red-400">x{item.quantity}</span></span><span className="text-gray-900 font-black">{formatCurrency(item.price * item.quantity)}</span></div>
                          ))}
                        </div>
                        <div className="pt-6 border-t flex justify-between items-center"><span className="font-black text-gray-400 text-xs uppercase">Total Value</span><span className="text-2xl font-black text-red-600">{formatCurrency(order.total)}</span></div>
                      </div>
                      <div className="bg-red-50/30 rounded-[2rem] p-8 border border-red-100/50 flex flex-col justify-between">
                        <div><div className="flex items-center gap-2 mb-4"><div className="p-1.5 bg-red-600 text-white rounded-lg"><MapPin size={14} /></div><h4 className="text-[10px] font-black text-gray-900 uppercase tracking-widest">Fulfillment Point</h4></div><p className="text-sm font-black text-gray-900 mb-1">{order.shippingAddress.name}</p><p className="text-[11px] text-gray-500 font-bold opacity-80">{order.shippingAddress.address}, {order.shippingAddress.city}<br />India - {order.shippingAddress.zip}</p></div>
                        <button onClick={() => setSelectedOrder(order)} className="mt-8 w-full py-4 bg-white border-2 border-red-200 text-red-600 rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-red-600 hover:text-white transition-all shadow-sm">View Shipment Details <ArrowRight size={14} /></button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-32 bg-gray-50 border-4 border-dashed border-gray-100 rounded-[3rem]">
                <Package size={60} className="text-gray-200 mx-auto mb-6" />
                <h2 className="text-2xl font-black text-gray-900 tracking-tighter mb-2 uppercase">No Manifests Found</h2>
                <p className="text-gray-400 font-bold text-sm mb-8">Ready to begin your acquisition journey?</p>
                <Link to="/shop" className="inline-block px-10 py-4 bg-red-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl hover:bg-red-700 transition-all">ENTER CATALOG</Link>
              </div>
            )}
          </div>
        )}
      </div>

      {selectedOrder && (
        <ShipmentModal order={selectedOrder} isOpen={!!selectedOrder} onClose={() => setSelectedOrder(null)} />
      )}
    </div>
  );
};

export default OrderHistoryPage;
