import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Map, Users, Bus, Accessibility, Bell, Search } from 'lucide-react';
import { useApp } from '../context/AppContext';

const menuCards = [
  {
    id: 'campus-map',
    label: 'Campus Map',
    description: 'Navigate buildings & find routes',
    icon: Map,
    route: '/campus-map',
    gradient: 'from-sage-400 to-sage-500',
    bg: 'bg-sage-50',
    iconBg: 'bg-sage-100',
    iconColor: 'text-sage-600',
    glowColor: 'rgba(156,175,136,0.3)',
  },
  {
    id: 'faculty-finder',
    label: 'Faculty Finder',
    description: 'Find faculty & cabin locations',
    icon: Users,
    route: '/faculty-finder',
    gradient: 'from-pastel-400 to-pastel-500',
    bg: 'bg-pastel-50',
    iconBg: 'bg-pastel-100',
    iconColor: 'text-pastel-600',
    glowColor: 'rgba(168,199,231,0.35)',
  },
  {
    id: 'bus-schedule',
    label: 'Bus Schedule',
    description: 'View routes, stops & timings',
    icon: Bus,
    route: '/bus-schedule',
    gradient: 'from-amber-400 to-orange-400',
    bg: 'bg-amber-50',
    iconBg: 'bg-amber-100',
    iconColor: 'text-amber-600',
    glowColor: 'rgba(251,191,36,0.3)',
  },
  {
    id: 'accessibility',
    label: 'Accessibility',
    description: 'Accessible routes & facilities',
    icon: Accessibility,
    route: '/campus-map?mode=accessibility',
    gradient: 'from-violet-400 to-purple-500',
    bg: 'bg-violet-50',
    iconBg: 'bg-violet-100',
    iconColor: 'text-violet-600',
    glowColor: 'rgba(167,139,250,0.3)',
  },
];

export default function StudentDashboard() {
  const navigate = useNavigate();
  const { user } = useApp();

  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good Morning' : hour < 17 ? 'Good Afternoon' : 'Good Evening';

  return (
    <div className="phone-wrapper flex flex-col min-h-screen bg-[#F8FAFC]">
      {/* Header */}
      <div className="bg-gradient-to-br from-sage-400 to-sage-500 px-5 pt-14 pb-16 rounded-b-[2.5rem] relative overflow-hidden">
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.25, 0.15] }}
          transition={{ duration: 6, repeat: Infinity }}
          className="absolute -top-8 -right-8 w-40 h-40 rounded-full bg-white/20"
        />
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 8, repeat: Infinity, delay: 1 }}
          className="absolute -bottom-10 -left-10 w-36 h-36 rounded-full bg-white/15"
        />

        <div className="relative z-10 flex items-start justify-between">
          <div>
            <p className="text-sage-100 text-sm font-medium">{greeting} 👋</p>
            <h1 className="text-white text-xl font-bold mt-0.5">{user?.name || 'Student'}</h1>
            <div className="flex items-center gap-1.5 mt-2">
              <div className="w-1.5 h-1.5 rounded-full bg-green-300 animate-pulse" />
              <span className="text-sage-100 text-xs">Campus Active</span>
            </div>
          </div>
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center mt-1"
            onClick={() => navigate('/role-select')}
          >
            <Bell size={18} className="text-white" />
          </motion.button>
        </div>

        {/* Quick search */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-5 relative"
        >
          <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
            <Search size={17} />
          </div>
          <input
            readOnly
            onClick={() => navigate('/faculty-finder')}
            placeholder="Search faculty, building..."
            className="w-full pl-10 pr-4 py-3 rounded-2xl bg-white/90 backdrop-blur-sm text-sm text-slate-500 placeholder-slate-400 cursor-pointer shadow-sm border-0 outline-none"
          />
        </motion.div>
      </div>

      {/* Main grid */}
      <div className="flex-1 px-5 -mt-5 relative z-10 pb-8">
        <div className="grid grid-cols-2 gap-3">
          {menuCards.map((card, i) => (
            <motion.button
              key={card.id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + i * 0.1, duration: 0.5, type: 'spring' }}
              whileHover={{ y: -5, boxShadow: `0 16px 40px ${card.glowColor}` }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate(card.route)}
              className={`relative bg-white rounded-3xl p-5 text-left shadow-card border border-slate-100 overflow-hidden transition-all duration-300 ${i < 2 ? 'col-span-1' : 'col-span-1'}`}
              style={{ minHeight: 140 }}
            >
              {/* Gradient accent */}
              <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${card.gradient} rounded-t-3xl`} />

              {/* Background shape */}
              <div className={`absolute -bottom-6 -right-6 w-20 h-20 rounded-full ${card.bg} opacity-60`} />

              <div className="relative z-10">
                <div className={`w-11 h-11 rounded-2xl ${card.iconBg} flex items-center justify-center mb-3 shadow-sm`}>
                  <card.icon size={22} className={card.iconColor} />
                </div>
                <span className="font-semibold text-slate-800 text-sm block leading-tight">{card.label}</span>
                <span className="text-slate-400 text-xs mt-1 block leading-tight line-clamp-2">{card.description}</span>
              </div>
            </motion.button>
          ))}
        </div>

        {/* Quick info strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-4 bg-white rounded-2xl shadow-card border border-slate-100 p-4"
        >
          <div className="flex items-center justify-between">
            <div className="text-center flex-1 border-r border-slate-100">
              <div className="text-xl font-bold text-sage-500">8</div>
              <div className="text-xs text-slate-400 mt-0.5">Faculty Available</div>
            </div>
            <div className="text-center flex-1 border-r border-slate-100">
              <div className="text-xl font-bold text-pastel-500">6</div>
              <div className="text-xs text-slate-400 mt-0.5">Bus Stops</div>
            </div>
            <div className="text-center flex-1">
              <div className="text-xl font-bold text-amber-500">6</div>
              <div className="text-xs text-slate-400 mt-0.5">Buildings</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
