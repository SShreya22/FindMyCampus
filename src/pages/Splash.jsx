import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { MapPin, Compass } from 'lucide-react';

export default function Splash() {
  const navigate = useNavigate();

  return (
    <div className="phone-wrapper flex flex-col items-center justify-between min-h-screen relative overflow-hidden">
      {/* Animated background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.6, 0.4] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-20 -left-20 w-72 h-72 rounded-full bg-sage-300/30 blur-3xl"
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="absolute -bottom-20 -right-10 w-80 h-80 rounded-full bg-pastel-300/30 blur-3xl"
        />
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-sage-200/20 blur-3xl"
        />
      </div>

      {/* Top decoration */}
      <div className="w-full pt-16 px-6 flex justify-end">
        <motion.div
          initial={{ opacity: 0, rotate: -20 }}
          animate={{ opacity: 1, rotate: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="opacity-20"
        >
          <Compass size={80} className="text-sage-600" />
        </motion.div>
      </div>

      {/* Center content */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 text-center relative z-10">
        {/* Logo mark */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20, delay: 0.2 }}
          className="mb-8"
        >
          <div className="relative">
            <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-sage-400 to-pastel-300 shadow-glow-sage flex items-center justify-center mb-4">
              <MapPin size={44} className="text-white" strokeWidth={1.5} />
            </div>
            {/* Floating dots decoration */}
            <motion.div
              animate={{ y: [-4, 4, -4] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-pastel-300"
            />
            <motion.div
              animate={{ y: [4, -4, 4] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -bottom-1 -left-3 w-3 h-3 rounded-full bg-sage-400/60"
            />
          </div>
        </motion.div>

        {/* App name */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold tracking-tight mb-2">
            <span className="text-slate-800">FindMy</span>
            <span className="gradient-text">Campus</span>
          </h1>
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="text-slate-500 text-base font-light leading-relaxed max-w-xs"
        >
          Navigate Smart.
          <span className="font-medium text-sage-600"> Connect Faster.</span>
        </motion.p>

        {/* Feature pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="flex flex-wrap justify-center gap-2 mt-8"
        >
          {['Campus Map', 'Faculty Finder', 'Bus Schedule', 'Accessibility'].map((feat, i) => (
            <motion.span
              key={feat}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.0 + i * 0.1 }}
              className="px-3 py-1.5 rounded-full bg-white/70 border border-slate-200 text-xs font-medium text-slate-600 shadow-sm"
            >
              {feat}
            </motion.span>
          ))}
        </motion.div>
      </div>

      {/* Bottom CTA */}
      <div className="w-full px-6 pb-12 relative z-10">
        <motion.button
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6, type: 'spring' }}
          whileHover={{ scale: 1.02, boxShadow: '0 12px 32px rgba(156,175,136,0.4)' }}
          whileTap={{ scale: 0.97 }}
          onClick={() => navigate('/role-select')}
          className="w-full py-4 rounded-2xl bg-gradient-to-r from-sage-400 to-pastel-400 text-white font-semibold text-base shadow-glow-sage active:opacity-90 transition-all"
        >
          Get Started
        </motion.button>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="text-center text-xs text-slate-400 mt-4"
        >
          Your smart campus companion
        </motion.p>
      </div>
    </div>
  );
}
