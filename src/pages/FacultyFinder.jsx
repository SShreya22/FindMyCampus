import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Users, Search, X, Mail, Phone, Clock, BookOpen,
  DoorOpen, MapPin, ChevronRight, Filter
} from 'lucide-react';
import Navbar from '../components/Navbar';
import SearchBar from '../components/SearchBar';
import Modal from '../components/Modal';
import { useApp } from '../context/AppContext';

const STATUS_CONFIG = {
  Available: {
    label: 'Available',
    className: 'badge-available',
    dot: 'bg-green-500',
  },
  Busy: {
    label: 'Busy',
    className: 'badge-busy',
    dot: 'bg-yellow-400',
  },
  'In Class': {
    label: 'In Class',
    className: 'badge-inclass',
    dot: 'bg-red-500',
  },
};

const DEPARTMENTS = ['All', 'CSE', 'ECE', 'IT', 'MECH', 'CIVIL', 'MATH'];

const DEPT_COLORS = {
  CSE: '#9CAF88',
  ECE: '#A8C7E7',
  IT: '#b8a8c7',
  MECH: '#c4a882',
  CIVIL: '#a8c2c7',
  MATH: '#c7b8a8',
};

function getInitials(name) {
  return name
    .split(' ')
    .filter(w => w.length > 1)
    .slice(0, 2)
    .map(w => w[0])
    .join('');
}

export default function FacultyFinder() {
  const navigate = useNavigate();
  const { faculty } = useApp();
  const [query, setQuery] = useState('');
  const [deptFilter, setDeptFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedFaculty, setSelectedFaculty] = useState(null);

  const filtered = faculty.filter(f => {
    const matchesQuery =
      !query ||
      f.name.toLowerCase().includes(query.toLowerCase()) ||
      f.department.toLowerCase().includes(query.toLowerCase()) ||
      f.cabin.toLowerCase().includes(query.toLowerCase());
    const matchesDept = deptFilter === 'All' || f.shortDept === deptFilter;
    const matchesStatus = statusFilter === 'All' || f.status === statusFilter;
    return matchesQuery && matchesDept && matchesStatus;
  });

  const available = faculty.filter(f => f.status === 'Available').length;

  return (
    <div className="phone-wrapper flex flex-col min-h-screen bg-[#F8FAFC]">
      <Navbar title="Faculty Finder" />

      {/* Header strip */}
      <div className="bg-gradient-to-br from-pastel-400 to-pastel-500 px-5 pt-4 pb-10 relative overflow-hidden">
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.25, 0.15] }}
          transition={{ duration: 6, repeat: Infinity }}
          className="absolute -top-6 -right-6 w-32 h-32 rounded-full bg-white/20"
        />
        <p className="text-blue-100 text-sm">
          <span className="font-semibold text-white">{available}</span> faculty available now
        </p>
      </div>

      {/* Sticky search + filters */}
      <div className="sticky top-14 z-30 bg-[#F8FAFC]/95 backdrop-blur-sm px-4 pt-3 pb-2 -mt-6 space-y-3">
        <div className="bg-white rounded-2xl shadow-card border border-slate-100 p-3">
          <SearchBar value={query} onChange={setQuery} placeholder="Search faculty, cabin, dept…" />
        </div>

        {/* Department filter */}
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {DEPARTMENTS.map(d => (
            <motion.button
              key={d}
              whileTap={{ scale: 0.94 }}
              onClick={() => setDeptFilter(d)}
              className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
                deptFilter === d
                  ? 'bg-pastel-400 text-white shadow-sm'
                  : 'bg-white text-slate-500 border border-slate-200'
              }`}
            >
              {d}
            </motion.button>
          ))}
        </div>

        {/* Status filter */}
        <div className="flex gap-2">
          {['All', 'Available', 'Busy', 'In Class'].map(s => (
            <motion.button
              key={s}
              whileTap={{ scale: 0.94 }}
              onClick={() => setStatusFilter(s)}
              className={`flex-1 py-1.5 rounded-xl text-xs font-semibold border transition-all duration-200 ${
                statusFilter === s
                  ? s === 'All'
                    ? 'bg-slate-700 text-white border-slate-700'
                    : s === 'Available'
                    ? 'bg-green-500 text-white border-green-500'
                    : s === 'Busy'
                    ? 'bg-yellow-400 text-white border-yellow-400'
                    : 'bg-red-500 text-white border-red-500'
                  : 'bg-white text-slate-500 border-slate-200'
              }`}
            >
              {s}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Faculty list */}
      <div className="flex-1 px-4 py-3 space-y-3 overflow-y-auto">
        <p className="text-xs text-slate-400 font-medium px-1">
          {filtered.length} result{filtered.length !== 1 ? 's' : ''}
        </p>

        <AnimatePresence>
          {filtered.map((f, i) => {
            const status = STATUS_CONFIG[f.status];
            const color = DEPT_COLORS[f.shortDept] || '#9CAF88';
            return (
              <motion.button
                key={f.id}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: i * 0.05, duration: 0.3 }}
                whileHover={{ y: -3, boxShadow: '0 8px 28px rgba(51,65,85,0.12)' }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedFaculty(f)}
                className="w-full bg-white rounded-2xl shadow-card border border-slate-100 p-4 text-left transition-all duration-200 overflow-hidden relative"
              >
                {/* Top color accent */}
                <div
                  className="absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl"
                  style={{ background: color }}
                />

                <div className="flex items-center gap-3">
                  {/* Avatar */}
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 text-white font-bold text-base shadow-sm"
                    style={{ background: color }}
                  >
                    {getInitials(f.name)}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="font-semibold text-slate-800 text-sm leading-tight truncate">{f.name}</h3>
                        <p className="text-xs text-slate-400 mt-0.5">{f.shortDept} · Cabin {f.cabin}</p>
                      </div>
                      <span className={`flex-shrink-0 px-2 py-0.5 rounded-full text-[10px] font-semibold ${status.className}`}>
                        {status.label}
                      </span>
                    </div>

                    <div className="flex items-center gap-1 mt-2">
                      <div className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
                      <span className="text-xs text-slate-500">{f.specialization.split(',')[0]}</span>
                    </div>
                  </div>

                  <ChevronRight size={16} className="text-slate-300 flex-shrink-0" />
                </div>
              </motion.button>
            );
          })}
        </AnimatePresence>

        {filtered.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <Users size={40} className="text-slate-200 mx-auto mb-3" />
            <p className="text-slate-400 text-sm font-medium">No faculty found</p>
            <p className="text-slate-300 text-xs mt-1">Try adjusting your filters</p>
          </motion.div>
        )}

        <div className="h-6" />
      </div>

      {/* Faculty Detail Modal */}
      <Modal
        isOpen={!!selectedFaculty}
        onClose={() => setSelectedFaculty(null)}
        title="Faculty Details"
      >
        {selectedFaculty && <FacultyDetailContent faculty={selectedFaculty} onClose={() => setSelectedFaculty(null)} navigate={navigate} />}
      </Modal>
    </div>
  );
}

function FacultyDetailContent({ faculty: f, onClose, navigate }) {
  const status = STATUS_CONFIG[f.status];
  const color = DEPT_COLORS[f.shortDept] || '#9CAF88';

  return (
    <div className="space-y-5">
      {/* Profile card */}
      <div className="flex items-center gap-4">
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-sm flex-shrink-0"
          style={{ background: color }}
        >
          {getInitials(f.name)}
        </div>
        <div>
          <h2 className="font-bold text-slate-800 text-base leading-tight">{f.name}</h2>
          <p className="text-sm text-slate-500 mt-0.5">{f.department}</p>
          <span className={`inline-block mt-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold ${status.className}`}>
            {status.label}
          </span>
        </div>
      </div>

      {/* Details grid */}
      <div className="grid grid-cols-2 gap-3">
        <DetailCard icon={DoorOpen} label="Cabin" value={f.cabin} color={color} />
        <DetailCard icon={BookOpen} label="Dept" value={f.shortDept} color={color} />
        <DetailCard icon={Clock} label="Office Hours" value={f.office_hours} color={color} />
        <DetailCard icon={BookOpen} label="Specialization" value={f.specialization.split(',')[0]} color={color} />
      </div>

      {/* Contact */}
      <div className="space-y-2">
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Contact</p>
        <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
          <Mail size={15} className="text-pastel-500 flex-shrink-0" />
          <span className="text-sm text-slate-600 truncate">{f.email}</span>
        </div>
        <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
          <Phone size={15} className="text-pastel-500 flex-shrink-0" />
          <span className="text-sm text-slate-600">{f.phone}</span>
        </div>
      </div>

      {/* Navigate button */}
      <motion.button
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => { onClose(); navigate('/campus-map'); }}
        className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-pastel-400 to-pastel-500 text-white font-semibold text-sm shadow-glow-pastel flex items-center justify-center gap-2"
      >
        <MapPin size={16} />
        Navigate to Cabin {f.cabin}
      </motion.button>
    </div>
  );
}

function DetailCard({ icon: Icon, label, value, color }) {
  return (
    <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
      <div className="flex items-center gap-1.5 mb-1">
        <Icon size={13} style={{ color }} />
        <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">{label}</span>
      </div>
      <p className="text-sm font-semibold text-slate-700 leading-tight">{value}</p>
    </div>
  );
}
