import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Building2, Users, Bus, LogOut, Edit3, Save, X,
  ShieldCheck, ChevronRight, CheckCircle2
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Modal from '../components/Modal';
import { useApp } from '../context/AppContext';

const STATUS_OPTIONS = ['Available', 'Busy', 'In Class'];

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { user, faculty, buses, buildings, updateFaculty, updateBus, updateBuilding, logout } = useApp();

  const [modal, setModal] = useState(null); // 'buildings' | 'faculty' | 'bus'
  const [saved, setSaved] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const showSaved = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const cards = [
    {
      id: 'buildings',
      label: 'Update Buildings',
      description: 'Edit building names, types & facilities',
      icon: Building2,
      gradient: 'from-sage-400 to-sage-500',
      iconBg: 'bg-sage-100',
      iconColor: 'text-sage-600',
      count: buildings.length,
    },
    {
      id: 'faculty',
      label: 'Update Faculty',
      description: 'Edit faculty info & availability',
      icon: Users,
      gradient: 'from-pastel-400 to-pastel-500',
      iconBg: 'bg-pastel-100',
      iconColor: 'text-pastel-600',
      count: faculty.length,
    },
    {
      id: 'bus',
      label: 'Update Bus Timings',
      description: 'Manage bus routes & schedules',
      icon: Bus,
      gradient: 'from-amber-400 to-orange-400',
      iconBg: 'bg-amber-100',
      iconColor: 'text-amber-600',
      count: buses.length,
    },
  ];

  return (
    <div className="phone-wrapper flex flex-col min-h-screen bg-[#F8FAFC]">
      {/* Header */}
      <div className="bg-gradient-to-br from-pastel-400 to-pastel-500 px-5 pt-14 pb-16 relative overflow-hidden">
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
            <p className="text-blue-100 text-sm font-medium">Admin Panel 🛡️</p>
            <h1 className="text-white text-xl font-bold mt-0.5">{user?.name || 'Admin'}</h1>
            <div className="flex items-center gap-1.5 mt-2">
              <div className="w-1.5 h-1.5 rounded-full bg-green-300 animate-pulse" />
              <span className="text-blue-100 text-xs">Full Access</span>
            </div>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-sm">
            <ShieldCheck size={24} className="text-white" />
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="px-5 -mt-6 relative z-10">
        <div className="bg-white rounded-2xl shadow-card border border-slate-100 p-4">
          <div className="flex items-center justify-between">
            <div className="text-center flex-1 border-r border-slate-100">
              <div className="text-xl font-bold text-sage-500">{buildings.length}</div>
              <div className="text-xs text-slate-400 mt-0.5">Buildings</div>
            </div>
            <div className="text-center flex-1 border-r border-slate-100">
              <div className="text-xl font-bold text-pastel-500">{faculty.length}</div>
              <div className="text-xs text-slate-400 mt-0.5">Faculty</div>
            </div>
            <div className="text-center flex-1">
              <div className="text-xl font-bold text-amber-500">{buses.length}</div>
              <div className="text-xs text-slate-400 mt-0.5">Bus Stops</div>
            </div>
          </div>
        </div>
      </div>

      {/* Action cards */}
      <div className="flex-1 px-5 mt-5 space-y-3 pb-8">
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-1">Manage</p>

        {cards.map((card, i) => (
          <motion.button
            key={card.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.1 }}
            whileHover={{ y: -3, boxShadow: '0 8px 28px rgba(51,65,85,0.12)' }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setModal(card.id)}
            className="w-full bg-white rounded-2xl shadow-card border border-slate-100 p-4 text-left relative overflow-hidden transition-all duration-200"
          >
            <div className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${card.gradient}`} />
            <div className="flex items-center gap-3">
              <div className={`w-11 h-11 rounded-xl ${card.iconBg} flex items-center justify-center flex-shrink-0`}>
                <card.icon size={22} className={card.iconColor} />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-slate-800 text-sm">{card.label}</h3>
                <p className="text-xs text-slate-400 mt-0.5">{card.description}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-400">{card.count}</span>
                <ChevronRight size={16} className="text-slate-300" />
              </div>
            </div>
          </motion.button>
        ))}

        {/* Logout */}
        <motion.button
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleLogout}
          className="w-full bg-white rounded-2xl shadow-card border border-red-100 p-4 text-left flex items-center gap-3 hover:bg-red-50 transition-all duration-200 mt-4"
        >
          <div className="w-11 h-11 rounded-xl bg-red-50 flex items-center justify-center flex-shrink-0">
            <LogOut size={20} className="text-red-500" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-red-500 text-sm">Logout</h3>
            <p className="text-xs text-slate-400 mt-0.5">Exit admin panel</p>
          </div>
        </motion.button>
      </div>

      {/* Saved toast */}
      <AnimatePresence>
        {saved && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 bg-slate-800 text-white px-4 py-2.5 rounded-full shadow-xl text-sm font-medium"
          >
            <CheckCircle2 size={16} className="text-green-400" />
            Changes saved!
          </motion.div>
        )}
      </AnimatePresence>

      {/* Buildings modal */}
      <Modal isOpen={modal === 'buildings'} onClose={() => setModal(null)} title="Update Buildings">
        <BuildingsEditor buildings={buildings} updateBuilding={updateBuilding} onSave={() => { setModal(null); showSaved(); }} />
      </Modal>

      {/* Faculty modal */}
      <Modal isOpen={modal === 'faculty'} onClose={() => setModal(null)} title="Update Faculty">
        <FacultyEditor faculty={faculty} updateFaculty={updateFaculty} onSave={() => { setModal(null); showSaved(); }} />
      </Modal>

      {/* Bus modal */}
      <Modal isOpen={modal === 'bus'} onClose={() => setModal(null)} title="Update Bus Timings">
        <BusEditor buses={buses} updateBus={updateBus} onSave={() => { setModal(null); showSaved(); }} />
      </Modal>
    </div>
  );
}

/* ── Buildings Editor ── */
function BuildingsEditor({ buildings, updateBuilding, onSave }) {
  const [edits, setEdits] = useState(() =>
    Object.fromEntries(buildings.map(b => [b.id, { name: b.name, type: b.type, floors: b.floors }]))
  );

  const set = (id, field, val) =>
    setEdits(p => ({ ...p, [id]: { ...p[id], [field]: val } }));

  const handleSave = () => {
    buildings.forEach(b => updateBuilding(b.id, edits[b.id]));
    onSave();
  };

  return (
    <div className="space-y-4">
      {buildings.map(b => (
        <div key={b.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-3">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-3 h-3 rounded-full" style={{ background: b.color }} />
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{b.id}</span>
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-500 mb-1.5 block">Building Name</label>
            <input
              className="input-field text-sm"
              value={edits[b.id].name}
              onChange={e => set(b.id, 'name', e.target.value)}
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-500 mb-1.5 block">Type</label>
              <input
                className="input-field text-sm"
                value={edits[b.id].type}
                onChange={e => set(b.id, 'type', e.target.value)}
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-500 mb-1.5 block">Floors</label>
              <input
                type="number"
                className="input-field text-sm"
                value={edits[b.id].floors}
                onChange={e => set(b.id, 'floors', Number(e.target.value))}
                min={1}
              />
            </div>
          </div>
        </div>
      ))}
      <SaveButton onSave={handleSave} />
    </div>
  );
}

/* ── Faculty Editor ── */
function FacultyEditor({ faculty, updateFaculty, onSave }) {
  const [edits, setEdits] = useState(() =>
    Object.fromEntries(faculty.map(f => [f.id, { name: f.name, department: f.department, cabin: f.cabin, status: f.status }]))
  );

  const set = (id, field, val) =>
    setEdits(p => ({ ...p, [id]: { ...p[id], [field]: val } }));

  const handleSave = () => {
    faculty.forEach(f => updateFaculty(f.id, edits[f.id]));
    onSave();
  };

  return (
    <div className="space-y-4">
      {faculty.map(f => (
        <div key={f.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-3">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-7 h-7 rounded-lg bg-pastel-100 flex items-center justify-center">
              <Users size={13} className="text-pastel-600" />
            </div>
            <span className="text-xs font-bold text-slate-500">{f.shortDept}</span>
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-500 mb-1.5 block">Faculty Name</label>
            <input className="input-field text-sm" value={edits[f.id].name} onChange={e => set(f.id, 'name', e.target.value)} />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-500 mb-1.5 block">Department</label>
            <input className="input-field text-sm" value={edits[f.id].department} onChange={e => set(f.id, 'department', e.target.value)} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-500 mb-1.5 block">Cabin</label>
              <input className="input-field text-sm" value={edits[f.id].cabin} onChange={e => set(f.id, 'cabin', e.target.value)} />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-500 mb-1.5 block">Availability</label>
              <select
                className="input-field text-sm"
                value={edits[f.id].status}
                onChange={e => set(f.id, 'status', e.target.value)}
              >
                {STATUS_OPTIONS.map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
          </div>
        </div>
      ))}
      <SaveButton onSave={handleSave} />
    </div>
  );
}

/* ── Bus Editor ── */
function BusEditor({ buses, updateBus, onSave }) {
  const [edits, setEdits] = useState(() =>
    Object.fromEntries(buses.map(b => [b.id, { stop: b.stop }]))
  );

  const set = (id, val) => setEdits(p => ({ ...p, [id]: { stop: val } }));

  const handleSave = () => {
    buses.forEach(b => updateBus(b.id, edits[b.id]));
    onSave();
  };

  return (
    <div className="space-y-3">
      <p className="text-xs text-slate-400 leading-relaxed">
        Edit stop names below. Schedule timings are managed per-route in the live data.
      </p>
      {buses.map(b => (
        <div key={b.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
          <label className="text-xs font-semibold text-slate-500 mb-1.5 block uppercase tracking-wider">
            Stop Name
          </label>
          <div className="flex items-center gap-2">
            <span className="text-lg">{['🏫','📚','📖','🏠','⚽','🏛️'][b.id - 1]}</span>
            <input
              className="input-field text-sm flex-1"
              value={edits[b.id].stop}
              onChange={e => set(b.id, e.target.value)}
            />
          </div>
          <p className="text-xs text-slate-400 mt-2">
            {b.weekday.length} weekday · {b.weekend.length} weekend services
          </p>
        </div>
      ))}
      <SaveButton onSave={handleSave} />
    </div>
  );
}

function SaveButton({ onSave }) {
  return (
    <motion.button
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      onClick={onSave}
      className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-pastel-400 to-pastel-500 text-white font-semibold text-sm shadow-glow-pastel flex items-center justify-center gap-2 mt-2"
    >
      <Save size={16} />
      Save Changes
    </motion.button>
  );
}
