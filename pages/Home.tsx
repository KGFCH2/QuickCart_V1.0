
import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ArrowRight, Smartphone, Watch, Laptop, ShoppingBag, Zap, Shirt, Baby, Clock, Sparkles, Truck, ShieldCheck, Apple, HelpCircle, ChevronRight, TrendingUp } from 'lucide-react';
import { ProductCategory } from '../types';

const assistantKnowledgeBase = [
  {
    q: "How do I track my order?",
    a: "You can track any active shipment using the 'Live Tracking' link in our navigation bar. Simply enter your unique Tracking ID starting with 'ORD-' to see real-time updates from our logistics hub."
  },
  {
    q: "What are the shipping charges?",
    a: "QuickCart offers FREE Priority Shipping on all orders above ₹1500 across India in V1.0 (January 2026). For orders below this threshold, a standard delivery fee of ₹99 is applied."
  },
  {
    q: "How long does delivery take?",
    a: "In V1.0 (January 2026), we've optimized our Howrah-based fulfillment center. Urban hubs like Kolkata receive items within 24 hours. Other regions typically take 2-4 business days."
  },
  {
    q: "Is QuickCart secure?",
    a: "Absolutely. We utilize Quantum Safe Encryption protocols and are PCI-DSS Level 1 certified. Your payment data and personal information are handled with the highest standards of digital security."
  },
  {
    q: "Can I return a product?",
    a: "Yes, we offer a 15-day instant return policy. For Fashion items, we provide a 'Try-and-Return' service where our courier waits while you try the fit. Refunds are processed instantly to your source account."
  }
];

const WatchRedirections: React.FC = () => {
  const navigate = useNavigate();
  const [overlay, setOverlay] = useState<{ color: string; visible: boolean }>({ color: 'rgba(0,0,0,0)', visible: false });

  const handleRedirect = (e: React.MouseEvent, to: string, color: string) => {
    e.preventDefault();
    setOverlay({ color, visible: true });
    // short delay to show color effect before navigation
    setTimeout(() => navigate(to), 320);
  };

  return (
    <section className="w-full bg-[#f1f5f9] py-12 sm:py-16 md:py-20 lg:py-24 px-3 sm:px-4 md:px-6 relative border-t border-gray-100">
      {/* Full-screen color overlay for redirect effect */}
      <div
        aria-hidden
        className={`fixed inset-0 z-[2500] transition-opacity duration-300 pointer-events-none ${overlay.visible ? 'opacity-100' : 'opacity-0'}`}
        style={{ backgroundColor: overlay.color }}
      />

      {/* Subtle Decorative Glows - small on mobile, larger on desktop */}
      <div className="hidden sm:block absolute top-0 left-0 w-96 h-96 bg-blue-500/5 blur-[120px] rounded-full pointer-events-none -z-10"></div>
      <div className="hidden sm:block absolute bottom-0 right-0 w-96 h-96 bg-rose-500/5 blur-[120px] rounded-full pointer-events-none -z-10"></div>

      <div className="w-full flex flex-col lg:flex-row gap-3 sm:gap-4 md:gap-6 lg:gap-8 relative z-10 mx-auto max-w-7xl px-0 sm:px-2">
        {/* Men's Luxury Watch Redirect */}
        <a
          href={`/shop?category=${ProductCategory.MENS_WATCHES}`}
          onClick={(e) => handleRedirect(e, `/shop?category=${ProductCategory.MENS_WATCHES}`, 'rgba(59,130,246,0.92)')}
          className="relative w-full flex-1 group overflow-hidden rounded-xl sm:rounded-2xl h-56 sm:h-72 md:h-80 lg:h-96 bg-slate-900 transition-all duration-500 hover:shadow-[0_20px_60px_rgba(30,64,175,0.25)] hover:-translate-y-2 border border-slate-800"
        >
          <img
            src="https://images-cdn.ubuy.co.in/65ebd13aa496cc761a5ae72b-poedagar-men-watch-top-brand-luxury.jpg"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2500ms] group-hover:scale-110 opacity-80"
            alt="Men's Watches"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/50 to-transparent"></div>
          <div className="absolute inset-0 p-3 sm:p-5 md:p-8 flex flex-col justify-end items-start text-left z-20">
            <span className="text-blue-300 font-bold text-[7px] sm:text-[8px] uppercase tracking-widest mb-1 sm:mb-2">HOROLOGY</span>
            <h3 className="text-white text-lg sm:text-2xl md:text-4xl lg:text-5xl font-black uppercase tracking-tight mb-2 sm:mb-3 leading-none">Men's<br /><span className="text-blue-400">Watches</span></h3>
            <p className="text-gray-300 font-medium text-[10px] sm:text-xs md:text-sm max-w-full mb-3 sm:mb-4 leading-snug hidden sm:block">
              Precision crafted.
            </p>
            <button className="bg-blue-600 hover:bg-blue-500 text-white px-3 sm:px-5 py-2 rounded-lg font-bold text-[10px] sm:text-xs uppercase tracking-widest flex items-center gap-1 sm:gap-2 w-full sm:w-auto justify-center transition-all duration-300 shadow-lg">
              EXPLORE <ArrowRight size={12} className="hidden sm:inline" />
            </button>
          </div>
        </a>

        {/* Women's Luxury Watch Redirect */}
        <a
          href={`/shop?category=${ProductCategory.WOMENS_WATCHES}`}
          onClick={(e) => handleRedirect(e, `/shop?category=${ProductCategory.WOMENS_WATCHES}`, 'rgba(225,29,72,0.92)')}
          className="relative w-full flex-1 group overflow-hidden rounded-xl sm:rounded-2xl h-56 sm:h-72 md:h-80 lg:h-96 bg-white transition-all duration-500 hover:shadow-[0_20px_60px_rgba(225,29,72,0.15)] hover:-translate-y-2 border border-gray-100"
        >
          <img
            src="https://img4.dhresource.com/webp/m/0x0/f3/albu/km/n/27/aca5a1bc-2f87-417c-b632-54c249cd7a7f.jpg"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2500ms] group-hover:scale-110 opacity-85"
            alt="Women's Watches"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-900/50 to-transparent"></div>
          <div className="absolute inset-0 p-3 sm:p-5 md:p-8 flex flex-col justify-end md:items-end items-start md:text-right text-left z-20">
            <span className="text-rose-400 font-bold text-[7px] sm:text-[8px] uppercase tracking-widest mb-1 sm:mb-2">ELEGANCE</span>
            <h3 className="text-white text-lg sm:text-2xl md:text-4xl lg:text-5xl font-black uppercase tracking-tight mb-2 sm:mb-3 leading-none">Women's<br /><span className="text-rose-400">Watches</span></h3>
            <p className="text-gray-300 font-medium text-[10px] sm:text-xs md:text-sm max-w-full mb-3 sm:mb-4 leading-snug hidden sm:block">
              Minimalist design.
            </p>
            <button className="bg-rose-600 hover:bg-rose-500 text-white px-3 sm:px-5 py-2 rounded-lg font-bold text-[10px] sm:text-xs uppercase tracking-widest flex items-center gap-1 sm:gap-2 w-full sm:w-auto justify-center transition-all duration-300 shadow-lg">
              EXPLORE <ArrowRight size={12} className="hidden sm:inline" />
            </button>
          </div>
        </a>
      </div>
    </section>
  );
};

const CategoryCard = ({ icon: Icon, title, color, desc }: any) => (
  <Link
    to={`/shop?category=${title}`}
    className="group relative flex flex-col items-center p-6 sm:p-8 bg-white/80 backdrop-blur-md rounded-[1.5rem] sm:rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl hover:border-red-100 transition-all duration-500 transform hover:-translate-y-1.5 overflow-hidden"
  >
    <div className={`p-3 sm:p-4 rounded-xl sm:rounded-2xl ${color} text-white mb-4 sm:mb-6 transition-all duration-500 shadow-md group-hover:scale-110 group-hover:rotate-6`}>
      <Icon size={24} />
    </div>
    <h3 className="text-sm sm:text-lg font-black text-gray-900 group-hover:text-red-600 transition-colors tracking-tight leading-none text-center">{title}</h3>
    <p className="text-gray-500 mt-2 text-[10px] sm:text-xs text-center font-semibold leading-relaxed px-1 sm:px-2">{desc}</p>
    <div className="mt-4 sm:mt-6 flex items-center gap-1.5 text-[8px] sm:text-[9px] font-black uppercase tracking-widest text-red-500 opacity-0 group-hover:opacity-100 transition-all">
      Enter boutique <ArrowRight size={10} className="group-hover:translate-x-1" />
    </div>
  </Link>
);

const HomePage: React.FC = () => {
  const [activeQuestion, setActiveQuestion] = useState<number | null>(null);
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);
  const location = useLocation();

  const heroImages = [
    "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=1920",
    "https://img.freepik.com/free-photo/realistic-scene-from-neighborhood-yard-sale-miscellaneous-items_23-2151238490.jpg?semt=ais_hybrid&w=740&q=80",
    "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=1920",
    "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&q=80&w=1920",
    "https://img.freepik.com/free-photo/woman-with-shopping-bags_329181-8871.jpg?semt=ais_hybrid&w=740&q=80",
    "https://img.freepik.com/free-photo/young-man-choosing-cloths-menswear-shop_1303-30951.jpg?semt=ais_hybrid&w=740&q=80",
    "https://www.opendatabay.com/_next/image?url=https://storage.googleapis.com/opendatabay_public/8594dec6-9252-4519-9011-3933c6fd77f7/808c5da8-1738692447252.jpg&w=640&q=75",
    "https://img.freepik.com/free-photo/eco-bag-with-different-fruits-vegetables_169016-5438.jpg?semt=ais_hybrid&w=740&q=80",
    "https://img.freepik.com/premium-photo/display-phones-store-with-glass-wall-that-says-phone_862462-29657.jpg?w=360",
    "https://assets.entrepreneur.com/content/3x2/2000/1719984450-FashionIndustry.jpg?format=pjeg&auto=webp&crop=4:3",
    "https://img.freepik.com/free-photo/fast-fashion-concept-with-full-clothing-store_23-2150871356.jpg?semt=ais_hybrid&w=740&q=80"
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentHeroIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroImages.length]);

  const categoriesData = [
    { icon: Shirt, title: ProductCategory.MENS_WEAR, color: "bg-blue-600", desc: "Tailored linen, bespoke suits, and everyday urban essentials." },
    { icon: ShoppingBag, title: ProductCategory.WOMENS_WEAR, color: "bg-pink-600", desc: "Mulberry silk wrap dresses and high-end seasonal styles." },
    { icon: Baby, title: ProductCategory.KIDS_WEAR, color: "bg-amber-500", desc: "Organic cotton staples for comfort and childhood adventures." },
    { icon: Clock, title: ProductCategory.MENS_WATCHES, color: "bg-gray-900", desc: "Horology excellence: Sapphire glass and automatic movements." },
    { icon: Smartphone, title: ProductCategory.MOBILE, color: "bg-red-600", desc: "Next-gen devices, premium accessories, and connectivity." },
    { icon: Laptop, title: ProductCategory.ELECTRONICS, color: "bg-violet-600", desc: "Studio-grade audio and high-performance computing hardware." },
    { icon: Watch, title: ProductCategory.WOMENS_WATCHES, color: "bg-rose-500", desc: "Minimalist dials paired with rose gold magnetic mesh straps." },
    { icon: Zap, title: ProductCategory.HOME, color: "bg-emerald-600", desc: "Intelligent living: Smart lighting and luxury decor." },
    { icon: Apple, title: ProductCategory.GROCERY, color: "bg-lime-600", desc: "Fresh organic produce, artisanal coffee, and pantry essentials." },
    { icon: Sparkles, title: ProductCategory.BEAUTY, color: "bg-fuchsia-500", desc: "Clinical-grade skincare, vibrant cosmetics, and luxury fragrances." },
  ];

  const sortedCategories = [...categoriesData].sort((a, b) => a.title.localeCompare(b.title));

  return (
    <div className="flex flex-col">
      {/* Hero Slideshow Section */}
      <section className="relative h-[550px] sm:h-[680px] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          {heroImages.map((img, idx) => (
            <div
              key={idx}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${idx === currentHeroIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-110'}`}
              style={{ transition: 'opacity 1s ease-in-out, transform 10s linear' }}
            >
              <img
                src={img}
                alt={`Hero Boutique ${idx}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/40 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-10 sm:pt-0">
          <div className="max-w-2xl pt-10 sm:pt-0">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-400/20 backdrop-blur-md text-red-300 mb-4 sm:mb-6">
              <span className="flex h-1.5 w-1.5 rounded-full bg-red-400 animate-pulse"></span>
              <span className="text-[9px] font-black uppercase tracking-widest">Global Marketplace V1.0 January 2026</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-6xl font-black text-white leading-tight mb-4 sm:mb-5 tracking-tighter">
              Curated Essentials <br />
              <span className="animated-brand-gradient">For The Modern Life</span>
            </h1>

            <p className="text-sm sm:text-base md:text-lg text-gray-300 mb-6 sm:mb-8 leading-relaxed font-medium max-w-lg">
              Precision-crafted timepieces, bespoke couture, and next-gen technology.
              Delivered within 24 hours to all major urban hubs.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Link to="/shop" className="btn-gradient w-full sm:w-auto px-8 py-4 text-white rounded-xl font-black text-xs tracking-widest flex items-center justify-center shadow-lg group">
                BROWSE CATALOG <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={16} />
              </Link>
              <Link to="/orders" className="w-full sm:w-auto px-8 py-4 bg-white/5 hover:bg-white/10 text-white border border-white/20 rounded-xl font-black text-xs tracking-widest backdrop-blur-xl transition-all text-center">
                TRACKING
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 z-20 flex gap-2 sm:gap-3">
          {heroImages.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentHeroIndex(idx)}
              className={`h-1.5 rounded-full transition-all duration-500 ${idx === currentHeroIndex ? 'w-8 bg-red-500' : 'w-2 bg-white/30 hover:bg-white/50'}`}
            />
          ))}
        </div>
      </section>

      {/* Trust & Metrics - Clean White Break */}
      <section className="bg-white py-10 border-b border-gray-100 -mt-10 mx-6 rounded-3xl shadow-2xl relative z-20">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-center gap-4 group cursor-pointer">
            <div className="p-3 bg-red-50 text-red-600 rounded-xl group-hover:bg-red-600 group-hover:text-white transition-all flex-shrink-0"><Truck size={20} /></div>
            <div>
              <p className="font-black text-gray-900 text-sm leading-none">Global Logistics</p>
              <p className="text-[10px] text-gray-400 font-bold mt-1">Free delivery over ₹1500</p>
            </div>
          </div>
          <div className="flex items-center gap-4 border-gray-100 md:border-x group cursor-pointer">
            <div className="p-3 bg-red-50 text-red-600 rounded-xl group-hover:bg-red-600 group-hover:text-white transition-all flex-shrink-0"><ShieldCheck size={20} /></div>
            <div>
              <p className="font-black text-gray-900 text-sm leading-none">Buyer Protection</p>
              <p className="text-[10px] text-gray-400 font-bold mt-1">100% Secure Shopping</p>
            </div>
          </div>
          <div className="flex items-center gap-4 group cursor-pointer">
            <div className="p-3 bg-red-50 text-red-600 rounded-xl group-hover:bg-red-600 group-hover:text-white transition-all flex-shrink-0"><TrendingUp size={20} /></div>
            <div>
              <p className="font-black text-gray-900 text-sm leading-none">Quality Assurance</p>
              <p className="text-[10px] text-gray-400 font-bold mt-1">Curated premium partners</p>
            </div>
          </div>
        </div>
      </section>

      {/* Collections - Warm Ivory/Stone Palette */}
      <section className="py-24 bg-[#fafaf9] relative overflow-hidden transition-colors border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-red-600 font-black uppercase tracking-widest text-[9px] mb-2 block">Departments</span>
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tighter mb-4">
              The <span className="animated-brand-gradient">Collections</span>
            </h2>
            <p className="text-gray-500 font-medium text-sm max-w-lg mx-auto">Explore our specialized studios, each dedicated to bringing you the finest selection of quality goods.</p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {sortedCategories.map((cat, idx) => (
              <CategoryCard key={idx} icon={cat.icon} title={cat.title} color={cat.color} desc={cat.desc} />
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Support Hub - Deep Midnight Navy */}
      <section className="py-24 bg-[#020617] relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1920" className="w-full h-full object-cover opacity-[0.05]" alt="Background" />
          <div className="absolute inset-0 bg-gradient-to-br from-red-950/40 via-transparent to-transparent"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center gap-16 relative z-10">
          <div className="flex-1 w-full">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-red-600 rounded-xl text-white shadow-lg shadow-red-500/30"><HelpCircle size={18} /></div>
              <span className="text-red-400 font-black tracking-widest text-[9px] uppercase">QuickCart Support Hub V1.0</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-white mb-6 tracking-tighter leading-tight">
              Customer <br />
              <span className="animated-brand-gradient">Intelligence</span>
            </h2>
            <p className="text-base text-gray-400 mb-10 font-medium leading-relaxed max-w-md">
              Browse our internal knowledge base for details about our logistics and specialized services.
            </p>

            <div className="space-y-4 max-w-xl">
              {assistantKnowledgeBase.map((item, idx) => (
                <div key={idx} className={`transition-all duration-500 ${activeQuestion === idx ? 'scale-105' : 'scale-100'}`}>
                  <button
                    onClick={() => setActiveQuestion(activeQuestion === idx ? null : idx)}
                    className={`w-full text-left px-6 py-5 rounded-2xl border transition-all flex items-center justify-between font-bold text-sm ${activeQuestion === idx
                      ? 'bg-red-600 border-red-500 text-white shadow-xl shadow-red-500/20'
                      : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10 hover:border-white/20'
                      }`}
                  >
                    <span className="flex items-center gap-3">
                      <HelpCircle size={16} className={activeQuestion === idx ? 'text-red-200' : 'text-red-500'} />
                      {item.q}
                    </span>
                    <ChevronRight size={16} className={`transition-transform duration-500 ${activeQuestion === idx ? 'rotate-90' : ''}`} />
                  </button>
                  {activeQuestion === idx && (
                    <div className="mt-2 p-6 bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl animate-in fade-in slide-in-from-top-4 duration-500">
                      <p className="text-gray-300 text-sm font-medium leading-relaxed">
                        {item.a}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="flex-1 w-full lg:w-auto hidden sm:block">
            <div className="relative rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl group">
              <img
                src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=1200"
                alt="Customer Hub"
                className="w-full h-[520px] object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
              <div className="absolute bottom-10 left-10 right-10 p-8 bg-black/40 backdrop-blur-2xl border border-white/10 rounded-[2rem]">
                <p className="text-white font-black text-xl tracking-tight mb-2">Dedicated Fulfillment</p>
                <p className="text-red-300 font-bold uppercase tracking-widest text-[9px]">Verified Support Core V1.0</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Watch Redirections (Featured Sections) - Soft Slate/Sky Backdrop */}
      <WatchRedirections />
    </div>
  );
};

export default HomePage;
