import React, { useState, useEffect, useContext } from 'react';
import { HashRouter, Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  ShoppingBag, Heart, ShoppingCart, 
  Menu, X, Loader2, MapPin, Phone, Mail, HelpCircle, Shield, RefreshCw, ExternalLink,
  MessageSquare, Clock, LifeBuoy, PackageOpen, RotateCcw, ShieldCheck, Lock, Fingerprint, EyeOff, PhoneCall,
  LayoutDashboard, ChevronRight
} from 'lucide-react';
import { dataStore } from './services/dataStore';
import { UserRole, CartItem } from './types';

// Pages
import HomePage from './pages/Home';
import ShopPage from './pages/Shop';
import CartPage from './pages/Cart';
import CheckoutPage from './pages/Checkout';
import AuthPage from './pages/Auth';
import OrderHistoryPage from './pages/OrderHistory';
import WishlistPage from './pages/Wishlist';
import ProfilePage from './pages/Profile';

export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 2
  }).format(amount);
};

export const AppContext = React.createContext<{
  user: any;
  setUser: any;
  cart: CartItem[];
  wishlist: string[];
  hideLayout: boolean;
  setHideLayout: (val: boolean) => void;
  addToCart: (pid: string, qty: number) => void;
  removeFromCart: (pid: string) => void;
  clearCart: () => void;
  toggleWishlist: (pid: string) => void;
  logout: () => void;
} | null>(null);

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const RefreshHandler = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate('/', { replace: true });
  }, []);
  return null;
};

const SiteLoader = () => (
  <div className="fixed inset-0 z-[9999] bg-white flex flex-col items-center justify-center animate-out fade-out duration-1000 fill-mode-forwards">
    <div className="relative">
      <div className="bg-red-600 p-4 rounded-2xl text-white shadow-2xl shadow-red-200 animate-bounce">
        <ShoppingBag size={48} />
      </div>
      <div className="absolute -inset-4 border-2 border-red-100 rounded-[2rem] animate-ping opacity-20"></div>
    </div>
    <div className="mt-8 text-center">
      <h2 className="text-2xl font-black animated-brand-gradient uppercase tracking-tighter">QuickCart V1.0</h2>
      <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.4em] mt-2 ml-1">Boutique Hydration...</p>
    </div>
  </div>
);

const Navbar: React.FC = () => {
  const context = useContext(AppContext);
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [navLoading, setNavLoading] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  if (context?.hideLayout) return null;

  const isAuthPage = location.pathname === '/auth';
  const cartCount = context?.cart.reduce((acc, i) => acc + i.quantity, 0) || 0;
  const wishlistCount = context?.wishlist.length || 0;
  const isAdmin = context?.user?.role === UserRole.ADMIN;

  const handleBrandClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  const handleNavIconClick = (path: string) => {
    setNavLoading(true);
    setTimeout(() => {
      setNavLoading(false);
      navigate(path);
    }, 400);
  };

  const navTextClass = (path: string) => {
    const isActive = location.pathname === path;
    if (isActive) return 'animated-brand-gradient';
    return 'text-gray-900 hover:text-red-500 font-bold';
  };

  const NavLink = ({ to, children }: { to: string; children: React.ReactNode }) => {
    const isActive = location.pathname === to;
    return (
      <Link 
        to={to} 
        className={`relative text-[10px] font-black uppercase transition-all py-1 group ${navTextClass(to)}`}
      >
        {children}
        <span className={`absolute bottom-0 left-0 w-full h-[2px] bg-red-500 transition-transform duration-300 origin-center transform scale-x-0 group-hover:scale-x-100 ${isActive ? 'scale-x-100' : ''}`}></span>
      </Link>
    );
  };

  return (
    <>
      {navLoading && (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center bg-white/20 backdrop-blur-[2px] animate-in fade-in duration-200">
          <div className="bg-white p-6 rounded-[2rem] shadow-2xl flex flex-col items-center gap-4 animate-in zoom-in-95 duration-300">
            <Loader2 className="animate-spin text-red-600" size={40} />
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">Syncing Request...</p>
          </div>
        </div>
      )}

      {/* Desktop Navbar */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 h-14 sm:h-16 flex items-center 
        ${isScrolled || isAuthPage ? 'bg-white/95 backdrop-blur-xl shadow-md border-b border-gray-100' : 'bg-white/80 backdrop-blur-md'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex justify-between items-center">
          <Link to="/" onClick={handleBrandClick} className="flex items-center gap-2 group">
            <div className="bg-red-600 p-1.5 rounded-xl text-white shadow-lg shadow-red-100 transition-transform group-hover:scale-110">
              <ShoppingBag size={18} className="sm:w-[20px]" />
            </div>
            <span className="text-base sm:text-xl font-black tracking-tighter uppercase animated-brand-gradient">QuickCart</span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/shop">Catalog</NavLink>
            <NavLink to="/orders">Tracking</NavLink>
            {isAdmin && <NavLink to="/admin">Intelligence</NavLink>}
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <button onClick={() => handleNavIconClick('/wishlist')} className="relative p-2 rounded-xl transition-colors bg-red-50 text-red-500 hover:bg-red-100">
              <Heart size={16} />
              {wishlistCount > 0 && <span className="absolute -top-1 -right-1 px-1.5 py-0.5 text-[7px] font-black bg-red-600 text-white rounded-full">{wishlistCount}</span>}
            </button>
            <button onClick={() => handleNavIconClick('/cart')} className="relative p-2 rounded-xl transition-colors bg-red-50 text-red-500 hover:bg-red-100">
              <ShoppingCart size={16} />
              {cartCount > 0 && <span className="absolute -top-1 -right-1 px-1.5 py-0.5 text-[7px] font-black bg-red-600 text-white rounded-full">{cartCount}</span>}
            </button>
            {context?.user ? (
              <Link to="/profile" className="w-8 h-8 rounded-xl flex items-center justify-center font-black transition-all text-xs bg-gray-900 text-white">
                {context.user.name.charAt(0)}
              </Link>
            ) : (
              <Link to="/auth" className="px-4 py-2 rounded-xl font-black text-[9px] uppercase tracking-widest transition-all btn-gradient text-white">Sign In</Link>
            )}
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden p-2 text-gray-900 hover:bg-gray-100 rounded-xl transition-colors">
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[49] md:hidden">
          <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)}></div>
          <div className="absolute top-0 right-0 bottom-0 w-72 bg-white shadow-2xl animate-in slide-in-from-right duration-300 p-8 flex flex-col">
            <div className="flex items-center gap-2 mb-10">
              <div className="bg-red-600 p-1.5 rounded-xl text-white">
                <ShoppingBag size={18} />
              </div>
              <span className="text-xl font-black tracking-tighter uppercase animated-brand-gradient">QuickCart</span>
            </div>
            
            <nav className="flex flex-col gap-6">
              {[
                { to: '/', label: 'Home', icon: ChevronRight },
                { to: '/shop', label: 'Catalog', icon: ChevronRight },
                { to: '/orders', label: 'Tracking', icon: ChevronRight },
                ...(isAdmin ? [{ to: '/admin', label: 'Intelligence', icon: LayoutDashboard }] : []),
                { to: '/wishlist', label: 'Wishlist', icon: Heart },
                { to: '/profile', label: 'My Account', icon: ShieldCheck },
              ].map((item) => (
                <Link 
                  key={item.to} 
                  to={item.to} 
                  className={`flex items-center justify-between font-black text-xs uppercase tracking-widest py-2 border-b border-gray-50 hover:text-red-500 transition-colors ${location.pathname === item.to ? 'text-red-600' : 'text-gray-500'}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span className="flex items-center gap-3">
                    {item.label}
                  </span>
                  <item.icon size={16} />
                </Link>
              ))}
            </nav>
            
            <div className="mt-auto pt-10">
              {context?.user ? (
                <button 
                  onClick={() => { context.logout(); setIsMobileMenuOpen(false); }}
                  className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl"
                >
                  Secure Logout
                </button>
              ) : (
                <Link 
                  to="/auth" 
                  className="w-full py-4 btn-gradient text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl text-center block"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Join / Sign In
                </Link>
              )}
              <p className="text-[8px] font-black text-gray-300 uppercase tracking-widest text-center mt-6">Version 1.0 Elite</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const FooterModal: React.FC<{ isOpen: boolean; title: string; content: React.ReactNode; onClose: () => void }> = ({ isOpen, title, content, onClose }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xl">
      <div className="bg-white rounded-[2rem] w-full max-w-3xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh] animate-in zoom-in-95 duration-300">
        <div className="p-6 border-b flex justify-between items-center bg-gray-50/50">
          <h2 className="text-xl font-black animated-brand-gradient uppercase">{title}</h2>
          <button onClick={onClose} className="p-2 hover:bg-red-50 hover:text-red-500 rounded-xl transition-all"><X size={20} /></button>
        </div>
        <div className="p-8 overflow-y-auto custom-scrollbar text-gray-600 font-medium leading-relaxed">{content}</div>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [user, setUser] = useState<any>(dataStore.getCurrentUser());
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [hideLayout, setHideLayout] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [modal, setModal] = useState<{ isOpen: boolean; title: string; content: React.ReactNode }>({ isOpen: false, title: '', content: null });

  useEffect(() => {
    const timer = setTimeout(() => setIsInitialLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  const addToCart = (productId: string, quantity: number) => {
    setCart(prev => {
      const existing = prev.find(item => item.productId === productId);
      if (existing) return prev.map(item => item.productId === productId ? { ...item, quantity: item.quantity + quantity } : item);
      return [...prev, { productId, quantity }];
    });
  };
  const removeFromCart = (productId: string) => setCart(prev => prev.filter(item => item.productId !== productId));
  const clearCart = () => setCart([]);
  const toggleWishlist = (productId: string) => setWishlist(prev => prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]);
  const logout = async () => { await dataStore.logout(); setUser(null); setCart([]); setWishlist([]); };

  return (
    <AppContext.Provider value={{ user, setUser, cart, wishlist, hideLayout, setHideLayout, addToCart, removeFromCart, clearCart, toggleWishlist, logout }}>
      <HashRouter>
        <ScrollToTop />
        <RefreshHandler />
        <div className="min-h-screen bg-white flex flex-col">
          {isInitialLoading && <SiteLoader />}
          <Navbar />
          <main className={`flex-grow ${hideLayout ? 'pt-0' : 'pt-14 sm:pt-16'}`}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/shop" element={<ShopPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/auth" element={<AuthPage />} />
              <Route path="/orders" element={<OrderHistoryPage />} />
              <Route path="/wishlist" element={<WishlistPage />} />
              <Route path="/profile" element={<ProfilePage />} />
            </Routes>
          </main>
          
          {!hideLayout && (
            <footer className="bg-slate-950 text-slate-300 py-16 sm:py-20 border-t border-slate-800">
              <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="bg-red-600 p-2 rounded-xl text-white shadow-xl shadow-red-900/20"><ShoppingBag size={24} /></div>
                    <span className="text-2xl font-black uppercase tracking-tighter static-brand-gradient">QUICKCART</span>
                    <span className="text-red-900/50 font-black">V1.0</span>
                  </div>
                  <p className="max-w-md text-slate-400 font-medium leading-relaxed text-sm">
                    Premium digital marketplace for curated essentials. 100% Secure Shopping experience for the modern lifestyle.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <button 
                      onClick={() => setModal({ 
                        isOpen: true, 
                        title: 'Help Center & Support', 
                        content: (
                          <div className="space-y-6">
                            <div className="flex gap-4 items-center animate-in slide-in-from-bottom-2 duration-300">
                              <div className="p-3 bg-red-50 text-red-600 rounded-xl h-fit transition-transform hover:scale-[1.3] animate-in zoom-in-50"><MessageSquare size={24}/></div>
                              <div>
                                <h4 className="font-black text-gray-900 uppercase text-xs tracking-widest mb-1">24/7 Dedicated Support</h4>
                                <p className="text-sm">Our boutique concierge is always online to assist with your V1.0 acquisitions.</p>
                              </div>
                            </div>
                            <div className="flex gap-4 items-center animate-in slide-in-from-bottom-2 duration-400">
                              <div className="p-3 bg-red-50 text-red-600 rounded-xl h-fit transition-transform hover:scale-[1.3] animate-in zoom-in-50"><Clock size={24}/></div>
                              <div>
                                <h4 className="font-black text-gray-900 uppercase text-xs tracking-widest mb-1">Express Ticket System</h4>
                                <p className="text-sm">Priority resolution for Prime Elite members within 2 hours.</p>
                              </div>
                            </div>
                            <div className="flex gap-4 items-center animate-in slide-in-from-bottom-2 duration-500">
                              <div className="p-3 bg-red-50 text-red-600 rounded-xl h-fit transition-transform hover:scale-[1.3] animate-in zoom-in-50"><LifeBuoy size={24}/></div>
                              <div>
                                <h4 className="font-black text-gray-900 uppercase text-xs tracking-widest mb-1">Catalog Navigation</h4>
                                <p className="text-sm">Need help finding a specific style? Contact our fashion studio core.</p>
                              </div>
                            </div>
                          </div>
                        )
                      })} 
                      className="flex items-center gap-3 text-xs font-black uppercase tracking-widest text-slate-400 hover:text-orange-500 transition-all group"
                    >
                      <div className="group-hover:scale-[1.5] group-hover:-translate-y-2 transition-all duration-300 text-slate-600 group-hover:text-red-600">
                        <HelpCircle size={16} />
                      </div> 
                      Help Center
                    </button>
                    <button 
                      onClick={() => setModal({ 
                        isOpen: true, 
                        title: 'Returns Hub & Logistics', 
                        content: (
                          <div className="space-y-6">
                            <div className="flex gap-4 items-center animate-in slide-in-from-bottom-2 duration-300">
                              <div className="p-3 bg-red-50 text-red-600 rounded-xl h-fit transition-transform hover:scale-[1.3] animate-in zoom-in-50"><RotateCcw size={24}/></div>
                              <div>
                                <h4 className="font-black text-gray-900 uppercase text-xs tracking-widest mb-1">15-Day Acquisition Refund</h4>
                                <p className="text-sm">Hassle-free returns for all unused items in their original boutique packaging.</p>
                              </div>
                            </div>
                            <div className="flex gap-4 items-center animate-in slide-in-from-bottom-2 duration-400">
                              <div className="p-3 bg-red-50 text-red-600 rounded-xl h-fit transition-transform hover:scale-[1.3] animate-in zoom-in-50"><PackageOpen size={24}/></div>
                              <div>
                                <h4 className="font-black text-gray-900 uppercase text-xs tracking-widest mb-1">Free Doorstep Pickup</h4>
                                <p className="text-sm">Our logistics fleet will collect your return from your registered address.</p>
                              </div>
                            </div>
                            <div className="flex gap-4 items-center animate-in slide-in-from-bottom-2 duration-500">
                              <div className="p-3 bg-red-50 text-red-600 rounded-xl h-fit transition-transform hover:scale-[1.3] animate-in zoom-in-50"><ShieldCheck size={24}/></div>
                              <div>
                                <h4 className="font-black text-gray-900 uppercase text-xs tracking-widest mb-1">QC Verified Instant Credits</h4>
                                <p className="text-sm">Refunds are processed instantly once our hub verifies the QC manifest.</p>
                              </div>
                            </div>
                          </div>
                        )
                      })} 
                      className="flex items-center gap-3 text-xs font-black uppercase tracking-widest text-slate-400 hover:text-orange-500 transition-all group"
                    >
                      <div className="group-hover:scale-[1.5] group-hover:-translate-y-2 transition-all duration-300 text-slate-600 group-hover:text-red-600">
                        <RefreshCw size={16} />
                      </div> 
                      Returns Hub
                    </button>
                  </div>
                  <div className="space-y-4">
                    <button 
                      onClick={() => setModal({ 
                        isOpen: true, 
                        title: 'Privacy & Security Protocol', 
                        content: (
                          <div className="space-y-6">
                            <div className="flex gap-4 items-center animate-in slide-in-from-bottom-2 duration-300">
                              <div className="p-3 bg-red-50 text-red-600 rounded-xl h-fit transition-transform hover:scale-[1.3] animate-in zoom-in-50"><Lock size={24}/></div>
                              <div>
                                <h4 className="font-black text-gray-900 uppercase text-xs tracking-widest mb-1">AES-256 Quantum Shield</h4>
                                <p className="text-sm">Your transaction and personal data are protected by the highest standard of encryption.</p>
                              </div>
                            </div>
                            <div className="flex gap-4 items-center animate-in slide-in-from-bottom-2 duration-400">
                              <div className="p-3 bg-red-50 text-red-600 rounded-xl h-fit transition-transform hover:scale-[1.3] animate-in zoom-in-50"><Fingerprint size={24}/></div>
                              <div>
                                <h4 className="font-black text-gray-900 uppercase text-xs tracking-widest mb-1">Local Data Sovereignty</h4>
                                <p className="text-sm">All identity and order history are stored on secure local Indian servers.</p>
                              </div>
                            </div>
                            <div className="flex gap-4 items-center animate-in slide-in-from-bottom-2 duration-500">
                              <div className="p-3 bg-red-50 text-red-600 rounded-xl h-fit transition-transform hover:scale-[1.3] animate-in zoom-in-50"><EyeOff size={24}/></div>
                              <div>
                                <h4 className="font-black text-gray-900 uppercase text-xs tracking-widest mb-1">Zero-Sharing Guarantee</h4>
                                <p className="text-sm">We never monetize your shopping habits with third-party advertising networks.</p>
                              </div>
                            </div>
                          </div>
                        )
                      })} 
                      className="flex items-center gap-3 text-xs font-black uppercase tracking-widest text-slate-400 hover:text-orange-500 transition-all group"
                    >
                      <div className="group-hover:scale-[1.5] group-hover:-translate-y-2 transition-all duration-300 text-slate-600 group-hover:text-red-600">
                        <Shield size={16} />
                      </div> 
                      Privacy Policy
                    </button>
                    <button 
                      onClick={() => setModal({ 
                        isOpen: true, 
                        title: 'Contact Hub & Global HQ', 
                        content: (
                          <div className="space-y-6">
                            <div className="flex gap-4 items-center animate-in slide-in-from-bottom-2 duration-300">
                              <div className="p-3 bg-red-50 text-red-600 rounded-xl h-fit transition-transform hover:scale-[1.3] animate-in zoom-in-50"><MapPin size={24}/></div>
                              <div>
                                <h4 className="font-black text-gray-900 uppercase text-xs tracking-widest mb-1">Operational Headquarters</h4>
                                <p className="text-sm">22/3, 20/3, Dharmatala Rd, Belur, Bally, Howrah, West Bengal - 711202, India.</p>
                              </div>
                            </div>
                            <div className="flex gap-4 items-center animate-in slide-in-from-bottom-2 duration-400">
                              <div className="p-3 bg-red-50 text-red-600 rounded-xl h-fit transition-transform hover:scale-[1.3] animate-in zoom-in-50"><Mail size={24}/></div>
                              <div>
                                <h4 className="font-black text-gray-900 uppercase text-xs tracking-widest mb-1">Digital Dispatch</h4>
                                <p className="text-sm"><a href="mailto:babinbid05@gmail.com" className="hover:text-red-600 underline transition-colors">babinbid05@gmail.com</a></p>
                              </div>
                            </div>
                            <div className="flex gap-4 items-center animate-in slide-in-from-bottom-2 duration-500">
                              <div className="p-3 bg-red-50 text-red-600 rounded-xl h-fit transition-transform hover:scale-[1.3] animate-in zoom-in-50"><PhoneCall size={24}/></div>
                              <div>
                                <h4 className="font-black text-gray-900 uppercase text-xs tracking-widest mb-1">Priority Logistics Line</h4>
                                <p className="text-sm"><a href="tel:+919123777679" className="hover:text-red-600 underline transition-colors">+91 91237 77679</a></p>
                              </div>
                            </div>
                          </div>
                        )
                      })} 
                      className="flex items-center gap-3 text-xs font-black uppercase tracking-widest text-slate-400 hover:text-orange-500 transition-all group"
                    >
                      <div className="group-hover:scale-[1.5] group-hover:-translate-y-2 transition-all duration-300 text-slate-600 group-hover:text-red-600">
                        <Phone size={16} />
                      </div> 
                      Contact Hub
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="flex items-center gap-6 text-[9px] font-black uppercase tracking-widest">
                  <a 
                    href="https://www.google.com/maps/search/?api=1&query=22/3,+20/3,+Dharmatala+Rd,+Howrah,+West+Bengal+711202" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-slate-500 hover:text-orange-500 transition-colors group"
                  >
                    <MapPin size={12} className="text-slate-600 group-hover:text-red-500" /> 
                    <span>Howrah, WB 711202</span>
                    <ExternalLink size={10} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </div>
                <p className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-600">© 2026 QuickCart India. Verified V1.0 Release.</p>
              </div>
            </footer>
          )}
          
          <FooterModal isOpen={modal.isOpen} title={modal.title} content={modal.content} onClose={() => setModal({ ...modal, isOpen: false })} />
        </div>
      </HashRouter>
    </AppContext.Provider>
  );
};

export default App;