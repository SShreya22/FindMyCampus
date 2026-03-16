import { motion } from 'framer-motion';
import { ArrowLeft, LogOut } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export default function Navbar({ title, showBack = true, showLogout = false }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useApp();

  const handleBack = () => {
    navigate(-1);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-100"
    >
      <div className="flex items-center justify-between px-4 h-14">
        <div className="flex items-center gap-3">
          {showBack && (
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={handleBack}
              className="w-9 h-9 flex items-center justify-center rounded-xl bg-slate-100 hover:bg-sage-100 transition-colors"
            >
              <ArrowLeft size={18} className="text-slate-600" />
            </motion.button>
          )}
          <span className="font-semibold text-slate-800 text-base tracking-tight">{title}</span>
        </div>

        {showLogout && (
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={handleLogout}
            className="flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-red-500 transition-colors px-3 py-1.5 rounded-xl hover:bg-red-50"
          >
            <LogOut size={16} />
            <span>Logout</span>
          </motion.button>
        )}
      </div>
    </motion.nav>
  );
}
