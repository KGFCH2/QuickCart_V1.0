import React, { useState, useEffect, useContext, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, Loader2, Eye, Heart, Plus, Minus, X, Sparkles } from 'lucide-react';
import { dataStore } from '../services/dataStore';
import { Product, ProductCategory } from '../types';
import { AppContext, formatCurrency } from '../App';

const QuickViewModal: React.FC<{ product: Product; isOpen: boolean; onClose: () => void }> = ({ product, isOpen, onClose }) => {
  const context = useContext(AppContext);
  const [qty, setQty] = useState(1);
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setQty(1);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleAdd = () => {
    setAdding(true);
    context?.addToCart(product.id, qty);
    setTimeout(() => {
      setAdding(false);
      onClose();
    }, 800);
  };

  return createPortal(
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-0 sm:p-4 bg-black/80 backdrop-blur-xl animate-in fade-in duration-300">
      <div className="bg-white w-full h-full sm:h-auto sm:max-w-5xl sm:rounded-[3rem] shadow-2xl overflow-hidden flex flex-col md:flex-row relative animate-in zoom-in-95 duration-500 max-h-[100vh] sm:max-h-[90vh]">

        {/* Floating Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 sm:top-6 sm:right-6 z-[1100] p-2 bg-white/90 backdrop-blur shadow-xl rounded-full text-gray-900 border border-gray-100 active:scale-90 transition-transform hover:bg-red-50 hover:text-red-600"
        >
          <X size={18} />
        </button>

        {/* Left: Responsive Image Hub */}
        <div className="h-[40vh] md:h-auto md:w-1/2 bg-gray-50 flex items-center justify-center p-8 md:p-12 md:border-r border-gray-100 flex-shrink-0">
          <img
            src={product.image}
            alt={product.name}
            className="max-w-full max-h-full object-contain drop-shadow-2xl transform hover:scale-105 transition-transform duration-700"
          />
        </div>

        {/* Right: Details Boutique */}
        <div className="flex-grow md:w-1/2 p-8 md:p-16 flex flex-col overflow-y-auto custom-scrollbar bg-white">
          <div className="mb-6 sm:mb-10">
            <span className="inline-block bg-red-50 text-red-500 font-black uppercase tracking-[0.2em] text-[10px] px-4 py-2 rounded-full mb-4">
              {product.category}
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-3 tracking-tighter leading-tight">{product.name}</h2>
            <div className="flex items-center gap-4">
              <span className="text-2xl sm:text-3xl font-black text-red-500">{formatCurrency(product.price)}</span>
              <span className="text-gray-200">|</span>
              <span className={`text-[10px] font-black uppercase tracking-widest ${product.stock < 10 ? 'text-red-500' : 'text-gray-400'}`}>
                {product.stock} units in boutique
              </span>
            </div>
          </div>

          <p className="text-gray-500 mb-10 leading-relaxed font-medium text-sm sm:text-base">{product.description}</p>

          <div className="mt-auto space-y-6">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <div className="flex items-center justify-between bg-gray-50 rounded-2xl p-2 border border-gray-100">
                <button onClick={() => setQty(Math.max(1, qty - 1))} className="p-3 hover:bg-white rounded-xl text-red-500 transition-all disabled:opacity-20" disabled={qty <= 1}><Minus size={20} /></button>
                <span className="font-black text-2xl w-12 text-center">{qty}</span>
                <button onClick={() => setQty(Math.min(product.stock, qty + 1))} className="p-3 hover:bg-white rounded-xl text-red-500 transition-all" disabled={qty >= product.stock}><Plus size={20} /></button>
              </div>

              <button
                onClick={handleAdd}
                disabled={adding || product.stock === 0}
                className="flex-grow py-5 bg-red-600 hover:bg-red-700 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-3 transition-all shadow-xl shadow-red-100 disabled:opacity-50 active:scale-95"
              >
                {adding ? <Loader2 className="animate-spin" size={18} /> : <ShoppingCart size={18} />}
                {product.stock === 0 ? 'Out of Stock' : (adding ? 'Securing...' : 'Add to Bag')}
              </button>
            </div>
            <p className="text-center text-[9px] text-gray-400 font-black uppercase tracking-widest">Free Express Shipping V1.0</p>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const context = useContext(AppContext);
  const [adding, setAdding] = useState(false);
  const [wishlistLoading, setWishlistLoading] = useState(false);
  const [showQuickView, setShowQuickView] = useState(false);
  const isWishlisted = context?.wishlist.includes(product.id);

  const handleAddToCart = () => {
    setAdding(true);
    context?.addToCart(product.id, 1);
    setTimeout(() => setAdding(false), 800);
  };

  const handleToggleWishlist = () => {
    setWishlistLoading(true);
    context?.toggleWishlist(product.id);
    setTimeout(() => setWishlistLoading(false), 600);
  };

  return (
    <>
      <div className="group bg-white rounded-[2rem] border border-gray-100 overflow-hidden hover:shadow-xl hover:border-red-100 transition-all duration-500 flex flex-col h-full relative">
        <div className="absolute top-4 right-4 z-20 flex flex-col gap-3">
          <button
            onClick={handleToggleWishlist}
            disabled={wishlistLoading}
            className={`p-2.5 rounded-xl shadow-lg transition-all transform hover:scale-110 active:scale-90 flex items-center justify-center min-w-[40px] min-h-[40px] ${isWishlisted ? 'bg-red-500 text-white' : 'bg-white/90 backdrop-blur-md text-gray-400 hover:text-red-500'}`}
          >
            {wishlistLoading ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <Heart size={16} fill={isWishlisted ? 'currentColor' : 'none'} />
            )}
          </button>
          <button
            onClick={handleAddToCart}
            disabled={adding || product.stock === 0}
            className={`p-2.5 rounded-xl shadow-lg transition-all transform hover:scale-110 active:scale-90 flex items-center justify-center min-w-[40px] min-h-[40px] ${adding ? 'bg-red-500 text-white' : 'bg-white/90 backdrop-blur-md text-gray-400 hover:text-red-500'}`}
          >
            {adding ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <ShoppingCart size={16} />
            )}
          </button>
        </div>

        <div className="relative aspect-square overflow-hidden bg-gray-50 flex-shrink-0">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
          <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <button onClick={() => setShowQuickView(true)} className="bg-white text-gray-900 px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest flex items-center gap-2 shadow-2xl transform translate-y-2 group-hover:translate-y-0 transition-all duration-300"><Eye size={16} /> Quick View</button>
          </div>
          <div className="absolute top-4 left-4"><span className="bg-red-600/90 backdrop-blur-md text-[9px] font-black tracking-widest uppercase px-3 py-1.5 rounded-full text-white shadow-lg">{product.category}</span></div>
        </div>

        <div className="p-6 flex flex-col flex-grow">
          <h3 className="text-base font-black text-gray-900 mb-1 group-hover:text-red-500 transition-colors truncate tracking-tight uppercase">{product.name}</h3>
          <p className="text-[9px] text-gray-400 font-bold mb-5 uppercase tracking-widest">{product.stock} units available</p>

          <div className="mt-auto space-y-4">
            <div className="flex items-center justify-between"><span className="text-xl font-black text-gray-900">{formatCurrency(product.price)}</span></div>
            <button
              onClick={handleAddToCart}
              disabled={adding || product.stock === 0}
              className={`w-full py-3.5 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all flex items-center justify-center gap-2 shadow-lg ${adding ? 'bg-red-500 text-white' : 'bg-red-600 text-white hover:bg-red-700 shadow-red-100'}`}
            >
              {adding ? <Loader2 size={16} className="animate-spin" /> : <ShoppingCart size={16} />}
              {product.stock === 0 ? 'Out of Stock' : (adding ? 'Added' : 'Add to Bag')}
            </button>
          </div>
        </div>
      </div>
      {showQuickView && <QuickViewModal product={product} isOpen={showQuickView} onClose={() => setShowQuickView(false)} />}
    </>
  );
};

const ShopPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAutocompleteOpen, setIsAutocompleteOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>(searchParams.get('category') || 'All');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const autocompleteRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      const data = await dataStore.getProducts();
      setProducts(data);
      setLoading(false);
    };
    fetch();

    const handleClickOutside = (e: MouseEvent) => { if (autocompleteRef.current && !autocompleteRef.current.contains(e.target as Node)) setIsAutocompleteOpen(false); };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const suggestions = searchTerm.trim() ? products.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase())).slice(0, 6) : [];
  const categories = ['All', ...Object.values(ProductCategory)];

  const handleSearch = () => {
    const term = searchTerm.toLowerCase().trim();
    if ((term.includes('track') && term.includes('order')) || term === 'order history' || term === 'my orders') {
      navigate('/orders');
      setIsAutocompleteOpen(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <section className="relative h-[300px] flex items-center overflow-hidden bg-slate-900">
        <div className="absolute inset-0 opacity-50 bg-[url('https://upcycleluxe.com/cdn/shop/articles/correction-2.jpg?v=1709860540&width=1024')] bg-cover bg-center"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full pt-10">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-4"><div className="p-2 bg-red-600 text-white rounded-lg"><Sparkles size={16} /></div><span className="text-[10px] font-black uppercase tracking-widest text-red-300">Catalog Registry V1.0</span></div>
            <h1 className="text-4xl md:text-6xl font-black text-white leading-tight tracking-tighter uppercase">Market <span className="animated-brand-gradient">Boutique</span></h1>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-12 -mt-12 relative z-10 w-full mb-20">
        <div className="bg-white p-4 rounded-3xl border border-gray-100 shadow-xl mb-12 flex flex-col lg:flex-row items-center gap-6">
          <div className="flex-grow w-full overflow-hidden">
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
              {categories.map(cat => (
                <button key={cat} onClick={() => { if (cat !== selectedCategory) { setIsTransitioning(true); setTimeout(() => { setSelectedCategory(cat); setIsTransitioning(false); }, 300); } }} className={`px-6 py-3 rounded-2xl text-[10px] font-black transition-all border whitespace-nowrap uppercase tracking-widest ${selectedCategory === cat ? 'bg-red-600 text-white border-red-600 shadow-lg' : 'bg-white text-gray-400 border-gray-100 hover:text-red-500'}`}>{cat}</button>
              ))}
            </div>
          </div>
          <div className="relative w-full lg:w-96" ref={autocompleteRef}>
            <div className="relative">
              <button onClick={handleSearch} className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300 hover:text-red-500 transition-colors">
                <Search size={18} />
              </button>
              <input type="text" placeholder="Search boutique..." value={searchTerm} onFocus={() => setIsAutocompleteOpen(true)} onChange={e => { setSearchTerm(e.target.value); setIsAutocompleteOpen(true); }} onKeyDown={(e) => { if (e.key === 'Enter') handleSearch(); }} className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-4 pl-14 pr-6 focus:ring-4 focus:ring-red-50 outline-none transition-all font-bold text-sm" />
            </div>
            {isAutocompleteOpen && suggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-3 bg-white border border-gray-50 rounded-[2rem] shadow-2xl z-[60] overflow-hidden p-2">
                {suggestions.map(s => (
                  <button key={s.id} onClick={() => { setSearchTerm(s.name); setIsAutocompleteOpen(false); }} className="w-full text-left p-4 flex items-center gap-4 hover:bg-gray-50 rounded-2xl transition-all">
                    <img src={s.image} className="w-12 h-12 rounded-xl object-cover" />
                    <div><p className="font-black text-xs uppercase text-gray-900">{s.name}</p><p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">{s.category}</p></div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-40 gap-4"><Loader2 className="animate-spin text-red-600" size={40} /><p className="text-gray-400 font-black uppercase tracking-widest text-[10px]">Syncing Boutique...</p></div>
        ) : filteredProducts.length > 0 ? (
          <div key={selectedCategory} className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 animate-in fade-in duration-500 ${isTransitioning ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}>
            {filteredProducts.map((product, idx) => (
              <div
                key={product.id}
                className="h-full animate-in fade-in zoom-in-90 slide-in-from-bottom-6 duration-800 ease-out"
                style={{ animationDelay: `${idx * 75}ms`, animationFillMode: 'both' }}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-32 bg-gray-50 border-4 border-dashed border-gray-100 rounded-[3rem]"><Search size={60} className="text-gray-200 mx-auto mb-6" /><h2 className="text-2xl font-black text-gray-900 tracking-tighter uppercase">No Acquisitions Matching</h2><button onClick={() => { setSearchTerm(''); setSelectedCategory('All'); }} className="mt-8 text-red-600 font-black text-xs uppercase tracking-widest hover:underline">Reset Inventory Audit</button></div>
        )}
      </div>
    </div>
  );
};

export default ShopPage;