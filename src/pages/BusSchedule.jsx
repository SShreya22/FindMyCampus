import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bus, MapPin, Clock, ChevronDown, ChevronUp } from 'lucide-react';
import Navbar from '../components/Navbar';
import { useApp } from '../context/AppContext';

const STOP_ICONS = {
  gate: '🏫',
  academic: '📚',
  library: '📖',
  hostel: '🏠',
  sports: '⚽',
  admin: '🏛️',
};

const ROUTE_COLORS = {
  'Bus A': '#9CAF88',
  'Bus B': '#A8C7E7',
  'Bus C': '#c4a882',
  'Bus D': '#b8a8c7',
  'Bus E': '#a8c2c7',
  'Bus F': '#c7b8a8',
};

export default function BusSchedule() {
  const { buses } = useApp();
  const [dayMode, setDayMode] = useState('weekday');
  const [expandedStop, setExpandedStop] = useState(buses[0]?.id ?? null);

  return (
    <div className="phone-wrapper flex flex-col min-h-screen bg-[#F8FAFC]">
      <Navbar title="Bus Schedule" />

      {/* Header */}
      <div className="bg-gradient-to-br from-amber-400 to-orange-400 px-5 pt-4 pb-10 relative overflow-hidden">
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.25, 0.15] }}
          transition={{ duration: 6, repeat: Infinity }}
          className="absolute -top-6 -right-6 w-32 h-32 rounded-full bg-white/20"
        />
        <p className="text-orange-100 text-sm">
          <span className="font-semibold text-white">{buses.length}</span> stops · <span className="font-semibold text-white">6</span> routes
        </p>
      </div>

      {/* Day Toggle */}
      <div className="sticky top-14 z-30 bg-[#F8FAFC]/95 backdrop-blur-sm px-4 pt-3 pb-3 -mt-6">
        <div className="bg-white rounded-2xl shadow-card border border-slate-100 p-1.5 flex">
          {['weekday', 'weekend'].map(mode => (
            <motion.button
              key={mode}
              onClick={() => setDayMode(mode)}
              whileTap={{ scale: 0.97 }}
              className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 capitalize ${
                dayMode === mode
                  ? 'bg-gradient-to-r from-amber-400 to-orange-400 text-white shadow-sm'
                  : 'text-slate-500'
              }`}
            >
              {mode === 'weekday' ? '🗓 Weekday' : '🌅 Weekend'}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Stop list */}
      <div className="flex-1 px-4 py-3 space-y-3 overflow-y-auto">
        {buses.map((stop, i) => {
          const isExpanded = expandedStop === stop.id;
          const schedule = stop[dayMode];
          const emoji = STOP_ICONS[stop.icon] || '🚏';

          return (
            <motion.div
              key={stop.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              className="bg-white rounded-2xl shadow-card border border-slate-100 overflow-hidden"
            >
              {/* Stop header */}
              <motion.button
                whileTap={{ scale: 0.99 }}
                onClick={() => setExpandedStop(isExpanded ? null : stop.id)}
                className="w-full flex items-center gap-3 p-4 text-left"
              >
                <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-xl flex-shrink-0 border border-amber-100">
                  {emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-slate-800 text-sm">{stop.stop}</h3>
                  <div className="flex items-center gap-1 mt-0.5">
                    <Clock size={11} className="text-slate-400" />
                    <span className="text-xs text-slate-400">{schedule.length} service{schedule.length !== 1 ? 's' : ''} today</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {/* Route badges preview */}
                  <div className="flex gap-1">
                    {[...new Set(schedule.map(s => s.route))].slice(0, 3).map(r => (
                      <span
                        key={r}
                        className="w-2 h-2 rounded-full"
                        style={{ background: ROUTE_COLORS[r] || '#9CAF88' }}
                      />
                    ))}
                  </div>
                  {isExpanded
                    ? <ChevronUp size={16} className="text-slate-400" />
                    : <ChevronDown size={16} className="text-slate-400" />}
                </div>
              </motion.button>

              {/* Schedule table */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 pb-4">
                      <div className="bg-slate-50 rounded-xl overflow-hidden border border-slate-100">
                        {/* Table header */}
                        <div className="grid grid-cols-3 px-3 py-2 bg-slate-100">
                          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Route</span>
                          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Time</span>
                          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Destination</span>
                        </div>

                        {/* Rows */}
                        {schedule.map((entry, j) => (
                          <motion.div
                            key={j}
                            initial={{ opacity: 0, x: -8 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: j * 0.04 }}
                            className={`grid grid-cols-3 px-3 py-2.5 items-center ${j < schedule.length - 1 ? 'border-b border-slate-100' : ''}`}
                          >
                            <div className="flex items-center gap-2">
                              <div
                                className="w-2 h-2 rounded-full flex-shrink-0"
                                style={{ background: ROUTE_COLORS[entry.route] || '#9CAF88' }}
                              />
                              <span
                                className="text-xs font-bold"
                                style={{ color: ROUTE_COLORS[entry.route] || '#9CAF88' }}
                              >
                                {entry.route}
                              </span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock size={11} className="text-slate-400" />
                              <span className="text-xs font-semibold text-slate-700">{entry.time}</span>
                            </div>
                            <span className="text-xs text-slate-500 truncate">{entry.dest}</span>
                          </motion.div>
                        ))}
                      </div>

                      {/* Next bus highlight */}
                      <div className="mt-2 flex items-center gap-2 px-2">
                        <Bus size={13} className="text-amber-500" />
                        <span className="text-xs text-slate-400">
                          Next: <span className="font-semibold text-slate-600">{schedule[0]?.route}</span> at <span className="font-semibold text-amber-500">{schedule[0]?.time}</span>
                        </span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}

        <div className="h-6" />
      </div>
    </div>
  );
}
