import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { GraduationCap, Eye, EyeOff, AlertCircle, ArrowLeft, Lock, User } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function StudentLogin() {
  const navigate = useNavigate();
  const { loginStudent } = useApp();
  const [form, setForm] = useState({ id: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.id || !form.password) {
      setError('Please fill in all fields');
      return;
    }
    setIsLoading(true);
    setError('');
    await new Promise(r => setTimeout(r, 800));
    const ok = loginStudent(form.id, form.password);
    if (ok) {
      navigate('/student-dashboard');
    } else {
      setError('Invalid Credentials. Try STU001 / password');
      setIsLoading(false);
    }
  };

  return (
    <div className="phone-wrapper flex flex-col min-h-screen bg-[#F8FAFC]">
      {/* Top gradient */}
      <div className="relative bg-gradient-to-br from-sage-400 to-sage-500 px-5 pt-14 pb-12 rounded-b-[2.5rem]">
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => navigate(-1)}
          className="absolute left-5 top-14 w-9 h-9 flex items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm"
        >
          <ArrowLeft size={18} className="text-white" />
        </motion.button>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center text-center mt-4"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
            className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-4 shadow-lg"
          >
            <GraduationCap size={32} className="text-white" />
          </motion.div>
          <h1 className="text-2xl font-bold text-white">Student Login</h1>
          <p className="text-sage-100 text-sm mt-1">Sign in to your campus account</p>
        </motion.div>
      </div>

      {/* Form card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="flex-1 px-5 -mt-6 relative z-10"
      >
        <div className="bg-white rounded-3xl shadow-card p-6 border border-slate-100">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Student ID */}
            <div>
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 block">Student ID</label>
              <div className="relative">
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                  <User size={17} />
                </div>
                <input
                  type="text"
                  value={form.id}
                  onChange={e => setForm(p => ({ ...p, id: e.target.value }))}
                  placeholder="e.g. STU001"
                  className="input-field pl-10"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 block">Password</label>
              <div className="relative">
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                  <Lock size={17} />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={form.password}
                  onChange={e => setForm(p => ({ ...p, password: e.target.value }))}
                  placeholder="Enter password"
                  className="input-field pl-10 pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(p => !p)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>
            </div>

            {/* Error */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -8, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: 'auto' }}
                  exit={{ opacity: 0, y: -8, height: 0 }}
                  className="flex items-center gap-2.5 bg-red-50 border border-red-200 rounded-xl p-3"
                >
                  <AlertCircle size={16} className="text-red-500 flex-shrink-0" />
                  <p className="text-red-600 text-sm">{error}</p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Submit */}
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-sage-400 to-sage-500 text-white font-semibold text-base shadow-glow-sage disabled:opacity-70 transition-all duration-200 mt-2"
            >
              {isLoading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full mx-auto"
                />
              ) : 'Sign In'}
            </motion.button>
          </form>

          {/* Demo hint */}
          <div className="mt-4 p-3 rounded-xl bg-slate-50 border border-slate-100">
            <p className="text-xs text-center text-slate-400">
              Demo: <span className="font-mono font-medium text-slate-600">STU001</span> / <span className="font-mono font-medium text-slate-600">password</span>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
