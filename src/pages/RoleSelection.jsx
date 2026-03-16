import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { GraduationCap, ShieldCheck, ArrowLeft } from 'lucide-react';

const roles = [
  {
    id: 'student',
    label: 'Student',
    description: 'Access campus map, faculty finder, bus schedule and more',
    icon: GraduationCap,
    gradient: 'from-sage-400/15 to-sage-300/10',
    border: 'border-sage-200',
    iconBg: 'bg-sage-100',
    iconColor: 'text-sage-600',
    glow: 'hover:shadow-glow-sage',
    route: '/student-login',
  },
  {
    id: 'admin',
    label: 'Admin',
    description: 'Manage campus data, faculty info, and bus schedules',
    icon: ShieldCheck,
    gradient: 'from-pastel-300/15 to-pastel-200/10',
    border: 'border-pastel-200',
    iconBg: 'bg-pastel-100',
    iconColor: 'text-pastel-600',
    glow: 'hover:shadow-glow-pastel',
    route: '/admin-login',
  },
];

export default function RoleSelection() {
  const navigate = useNavigate();

  return (
    <div className="phone-wrapper flex flex-col min-h-screen bg-[#F8FAFC]">
      {/* Header */}
      <div className="relative px-5 pt-14 pb-8">
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => navigate('/')}
          className="absolute left-5 top-14 w-9 h-9 flex items-center justify-center rounded-xl bg-white shadow-sm border border-slate-100"
        >
          <ArrowLeft size={18} className="text-slate-500" />
        </motion.button>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mt-2"
        >
          <p className="text-xs font-medium text-sage-500 uppercase tracking-widest mb-2">Welcome to FindMyCampus</p>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Login As</h1>
          <p className="text-sm text-slate-500 mt-1.5">Choose your role to continue</p>
        </motion.div>
      </div>

      {/* Role cards */}
      <div className="flex-1 px-5 space-y-4">
        {roles.map((role, i) => (
          <motion.button
            key={role.id}
            initial={{ opacity: 0, x: i === 0 ? -30 : 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 + i * 0.15, duration: 0.5, type: 'spring' }}
            whileHover={{ y: -4, scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate(role.route)}
            className={`w-full relative bg-gradient-to-br ${role.gradient} ${role.border} border rounded-3xl p-6 text-left overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 ${role.glow}`}
          >
            {/* Corner decoration */}
            <div className="absolute top-0 right-0 w-24 h-24 opacity-10">
              <role.icon size={96} className={role.iconColor} />
            </div>

            <div className="flex items-start gap-4 relative z-10">
              <motion.div
                whileHover={{ rotate: 10, scale: 1.1 }}
                transition={{ type: 'spring', stiffness: 400 }}
                className={`w-14 h-14 rounded-2xl ${role.iconBg} flex items-center justify-center shadow-sm flex-shrink-0`}
              >
                <role.icon size={28} className={role.iconColor} />
              </motion.div>

              <div className="flex-1">
                <h2 className="text-xl font-bold text-slate-800 mb-1.5">{role.label}</h2>
                <p className="text-sm text-slate-500 leading-relaxed">{role.description}</p>
              </div>
            </div>

            {/* Bottom arrow */}
            <div className="flex justify-end mt-4 relative z-10">
              <div className="flex items-center gap-1.5 text-sm font-semibold text-slate-600">
                Continue
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </div>
            </div>
          </motion.button>
        ))}
      </div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="px-5 py-8 text-center"
      >
        <p className="text-xs text-slate-400">Secure • Fast • Reliable</p>
      </motion.div>
    </div>
  );
}
