import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Trash2, ArrowLeft, Loader2, Sparkles } from 'lucide-react';
import { AppContext, formatCurrency } from '../App';
import { dataStore } from '../services/dataStore';
import { Product } from '../types';

const WishlistPage: React.FC = () => {
  const context = useContext(AppContext);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWishlistItems = async () => {
      const all = await dataStore.getProducts();
      const wishlisted = all.filter(p => context?.wishlist.includes(p.id));
      setProducts(wishlisted);
      setLoading(false);
    };
    fetchWishlistItems();
  }, [context?.wishlist]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-40">
        <Loader2 className="animate-spin text-red-600" size={48} />
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-32 text-center">
        <div className="bg-red-50 p-10 rounded-full w-fit mx-auto mb-10 shadow-xl shadow-red-100">
          <Heart size={80} className="text-red-300" />
        </div>
        <h1 className="text-4xl sm:text-5xl font-black mb-4 tracking-tighter uppercase static-brand-gradient">Your wishlist is empty</h1>
        <p className="text-gray-500 text-lg sm:text-xl font-medium mb-12 max-w-md mx-auto">Save items you love and they will appear here. Ready to find something special?</p>
        <Link 
          to="/shop" 
          className="inline-flex items-center px-10 py-5 bg-red-600 hover:bg-red-700 text-white rounded-[2rem] font-black text-xs uppercase tracking-widest transition-all shadow-2xl shadow-red-500/20"
        >
          <ArrowLeft className="mr-3" size={20} />
          Explore Market
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-16">
        <div>
          <h1 className="text-4xl sm:text-6xl font-black text-gray-900 mb-2 tracking-tighter uppercase"><span className="static-brand-gradient">Wishlist Boutique</span></h1>
          <p className="text-gray-500 text-lg font-medium">Keep track of items you're keeping an eye on in India.</p>
        </div>
        <div className="bg-red-50 border border-red-100 px-6 py-4 rounded-[1.5rem] flex items-center gap-3 shadow-sm">
          <Sparkles className="text-red-500" size={24} />
          <span className="text-red-700 font-black uppercase text-[10px] tracking-widest">{products.length} Favorites Found</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {products.map(product => (
          <div key={product.id} className="bg-white rounded-[2.5rem] border border-gray-100 overflow-hidden shadow-sm hover:shadow-2xl hover:border-red-100 transition-all duration-500 group">
            <div className="relative aspect-[4/3] overflow-hidden">
              <img src={product.image} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={product.name} />
              <button 
                onClick={() => context?.toggleWishlist(product.id)}
                className="absolute top-4 right-4 bg-white/90 backdrop-blur-md p-3 rounded-2xl text-red-500 shadow-xl hover:bg-red-500 hover:text-white transition-all transform hover:scale-110 active:scale-90"
              >
                <Trash2 size={20} />
              </button>
            </div>
            <div className="p-8">
              <span className="text-red-600 text-[10px] font-black uppercase tracking-widest block mb-2">{product.category}</span>
              <h3 className="text-xl font-black text-gray-900 mb-6 truncate uppercase tracking-tighter group-hover:text-red-600 transition-colors">{product.name}</h3>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-black text-gray-900">{formatCurrency(product.price)}</span>
                <button 
                  onClick={() => context?.addToCart(product.id, 1)}
                  className="bg-red-600 hover:bg-red-700 text-white p-4 rounded-2xl shadow-xl shadow-red-500/20 transition-all transform hover:-translate-y-1 active:scale-90"
                >
                  <ShoppingCart size={24} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WishlistPage;