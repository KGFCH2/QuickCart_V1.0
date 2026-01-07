
import React, { useState, useContext } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ShoppingBag, Loader2, ShieldCheck, Mail, Lock, User, Globe, Sparkles, X } from 'lucide-react';
import { dataStore } from '../services/dataStore';
import { AppContext } from '../App';

const AuthPage: React.FC = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchParams] = useSearchParams();
  const context = useContext(AppContext);
  const navigate = useNavigate();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      let user;
      if (isRegistering) {
        user = await dataStore.register(name, email, password);
      } else {
        user = await dataStore.login(email, password);
      }
      context?.setUser(user);

      const redirectTo = searchParams.get('redirect');
      if (redirectTo === 'checkout') {
        navigate('/checkout');
      } else {
        navigate('/shop');
      }
    } catch (err: any) {
      setError(err.message || 'Verification failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const toggleMode = () => {
    setIsRegistering(!isRegistering);
    setError('');
    setName('');
    setEmail('');
    setPassword('');
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=1920"
          className="w-full h-full object-cover"
          alt="Background"
        />
        <div className="absolute inset-0 bg-gray-950/80 backdrop-blur-[2px]"></div>
      </div>

      <div className="relative z-10 max-w-lg w-full animate-in fade-in slide-in-from-bottom-8 duration-700 mt-6 sm:mt-2 mb-20">
        <div className="text-center mb-6 sm:mb-8">
          <div className="inline-flex items-center justify-center p-3 bg-red-600 rounded-2xl text-white mb-4 sm:mb-6 shadow-xl shadow-red-500/30 group cursor-pointer transition-transform hover:scale-105">
            <ShoppingBag size={40} className="group-hover:scale-110 transition-transform" />
          </div>
          <h1 className="text-3xl font-black mb-2 tracking-tighter leading-none uppercase">
            <span className="animated-brand-gradient">
              {isRegistering ? 'Join QuickCart' : 'Welcome Back'}
            </span>
          </h1>
          <p className="text-gray-400 text-[10px] font-bold uppercase tracking-[0.3em] opacity-80">
            Elite Marketplace Access V1.0 January 2026
          </p>
        </div>

        <div className="bg-white/95 backdrop-blur-2xl rounded-[2.5rem] shadow-2xl border border-white/20 p-8 md:p-12">
          {searchParams.get('redirect') === 'checkout' && (
            <div className="mb-6 p-4 bg-red-50 rounded-xl text-red-600 text-xs font-bold flex items-center gap-3">
              <Sparkles size={16} /> Please sign in to complete your purchase.
            </div>
          )}

          <form onSubmit={handleAuth} className="space-y-6">
            {isRegistering && (
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Full Name</label>
                <div className="relative group no-icon-anim">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-red-400 group-focus-within:text-red-600 transition-colors" size={18} />
                  <input
                    type="text"
                    required
                    className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-100 rounded-xl focus:ring-4 focus:ring-red-100 focus:border-red-600 outline-none transition-all font-bold text-sm"
                    placeholder="Arjun Sharma"
                    value={name}
                    onChange={e => setName(e.target.value)}
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Verified Email</label>
              <div className="relative group no-icon-anim">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-red-400 group-focus-within:text-red-600 transition-colors" size={18} />
                <input
                  type="email"
                  required
                  className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-100 rounded-xl focus:ring-4 focus:ring-red-100 focus:border-red-600 outline-none transition-all font-bold text-sm"
                  placeholder="customer@test.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Secure Passkey</label>
              <div className="relative group no-icon-anim">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-red-400 group-focus-within:text-red-600 transition-colors" size={18} />
                <input
                  type="password"
                  required
                  className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-100 rounded-xl focus:ring-4 focus:ring-red-100 focus:border-red-600 outline-none transition-all font-bold text-sm"
                  placeholder="password123"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
              </div>
            </div>

            {error && (
              <div className="p-4 bg-red-50 border border-red-100 rounded-xl text-red-600 text-[11px] font-black flex items-center gap-3">
                <X size={14} className="bg-red-600 text-white rounded-full p-0.5" />
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-gradient w-full py-4 text-white rounded-xl font-black text-xs tracking-widest shadow-xl flex items-center justify-center gap-2 disabled:opacity-50 transition-all hover:scale-[1.02] active:scale-95"
            >
              {loading ? <Loader2 size={18} className="animate-spin" /> : <ShieldCheck size={18} />}
              {isRegistering ? 'CREATE ACCOUNT' : 'SECURE SIGN IN'}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-gray-100 text-center">
            <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">
              {isRegistering ? 'Already a member?' : "New to QuickCart?"}{' '}
              <button
                onClick={toggleMode}
                className="font-black text-red-600 hover:text-red-700 ml-1 transition-colors"
              >
                {isRegistering ? 'Login' : 'Join Now'}
              </button>
            </p>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center gap-3 opacity-40">
          <div className="flex items-center gap-4 text-white">
            <ShieldCheck size={16} />
            <Globe size={16} />
            <Sparkles size={16} />
          </div>
          <p className="text-[8px] font-black text-white uppercase tracking-[0.5em]">Quantum Safe Encryption • QuickCart V1.0 January 2026</p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
