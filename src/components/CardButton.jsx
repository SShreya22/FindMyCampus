import { motion } from 'framer-motion';

export default function CardButton({
  icon: Icon,
  label,
  description,
  onClick,
  gradient = 'from-sage-400 to-pastel-300',
  iconBg = 'bg-sage-100',
  iconColor = 'text-sage-600',
  index = 0,
}) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      whileHover={{ y: -4, boxShadow: '0 12px 32px rgba(156,175,136,0.25)' }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className="group relative w-full bg-white rounded-2xl p-5 text-left shadow-card hover:shadow-card-hover transition-all duration-300 border border-slate-100 overflow-hidden"
    >
      {/* Subtle gradient accent top */}
      <div className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${gradient} opacity-70`} />

      <div className="flex items-start gap-4">
        <div className={`w-12 h-12 rounded-xl ${iconBg} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
          {Icon && <Icon size={22} className={iconColor} />}
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-semibold text-slate-800 text-[0.95rem] leading-tight">{label}</div>
          {description && (
            <div className="text-slate-400 text-xs mt-1 leading-relaxed">{description}</div>
          )}
        </div>
        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-slate-400 self-center">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </div>
      </div>
    </motion.button>
  );
}
