import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';
import SearchBar from '../components/SearchBar';
import RouteMap from '../components/RouteMap';
import { useApp } from '../context/AppContext';
import { pathData } from '../data/buildingData';
import { Building2, Navigation, Layers, X } from 'lucide-react';

export default function CampusMap() {
  const { buildings } = useApp();
  const [query, setQuery] = useState('');
  const [selectedBuilding, setSelectedBuilding] = useState(null);
  const [from, setFrom] = useState(null);
  const [to, setTo] = useState(null);
  const [activePathKey, setActivePathKey] = useState(null);
  const [infoPanel, setInfoPanel] = useState(null);

  const filtered = query
    ? buildings.filter(b => b.name.toLowerCase().includes(query.toLowerCase()) || b.type.toLowerCase().includes(query.toLowerCase()))
    : buildings;

  const handleBuildingClick = (b) => {
    setSelectedBuilding(b.id);
    setInfoPanel(b);
    if (!from) {
      setFrom(b);
    } else if (!to && b.id !== from.id) {
      setTo(b);
      const key1 = `${from.id}-${b.id}`;
      const key2 = `${b.id}-${from.id}`;
      setActivePathKey(pathData[key1] ? key1 : pathData[key2] ? key2 : null);
    } else {
      setFrom(b);
      setTo(null);
      setActivePathKey(null);
    }
  };

  const handleClearRoute = () => {
    setFrom(null);
    setTo(null);
    setActivePathKey(null);
    setSelectedBuilding(null);
    setInfoPanel(null);
  };

  return (
    <div className="phone-wrapper flex flex-col min-h-screen bg-[#F8FAFC]">
      <Navbar title="Campus Map" showLogout={false} />

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {/* Search */}
        <SearchBar
          value={query}
          onChange={setQuery}
          placeholder="Search building..."
        />

        {/* Route builder */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-card border border-slate-100 p-4"
        >
          <div className="flex items-center gap-2 mb-3">
            <Navigation size={15} className="text-sage-500" />
            <span className="text-xs font-semibold text-slate-600 uppercase tracking-wider">Route Planner</span>
            {(from || to) && (
              <button onClick={handleClearRoute} className="ml-auto">
                <X size={14} className="text-slate-400 hover:text-slate-600" />
              </button>
            )}
          </div>
          <div className="flex gap-2">
            <div className="flex-1 bg-sage-50 rounded-xl px-3 py-2 border border-sage-100">
              <div className="text-[10px] text-sage-500 font-semibold uppercase tracking-wide">From</div>
              <div className="text-sm font-medium text-slate-700 mt-0.5 truncate">{from ? from.name : 'Select on map'}</div>
            </div>
            <div className="flex items-center text-slate-300">→</div>
            <div className="flex-1 bg-pastel-50 rounded-xl px-3 py-2 border border-pastel-100">
              <div className="text-[10px] text-pastel-500 font-semibold uppercase tracking-wide">To</div>
              <div className="text-sm font-medium text-slate-700 mt-0.5 truncate">{to ? to.name : 'Select on map'}</div>
            </div>
          </div>
          {activePathKey && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-3 bg-sage-50 rounded-xl p-2.5 border border-sage-100 text-xs text-sage-700 font-medium text-center"
            >
              Route calculated — follow the green path
            </motion.div>
          )}
          {from && to && !activePathKey && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-3 bg-amber-50 rounded-xl p-2.5 border border-amber-100 text-xs text-amber-700 text-center">
              No direct path found between these buildings
            </motion.div>
          )}
        </motion.div>

        {/* Map */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
          <RouteMap
            buildings={buildings}
            pathData={pathData}
            highlightPath={activePathKey}
            onBuildingClick={handleBuildingClick}
            selectedBuilding={selectedBuilding}
          />
        </motion.div>

        {/* Info panel */}
        <AnimatePresence>
          {infoPanel && (
            <motion.div
              key={infoPanel.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="bg-white rounded-2xl shadow-card border border-slate-100 p-4"
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: infoPanel.color + '22', border: `1.5px solid ${infoPanel.color}44` }}>
                  <Building2 size={20} style={{ color: infoPanel.color }} />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-slate-800 text-sm">{infoPanel.name}</h3>
                      <span className="text-xs text-slate-400">{infoPanel.type} • {infoPanel.floors} Floors</span>
                    </div>
                    <button onClick={() => setInfoPanel(null)}><X size={16} className="text-slate-400 mt-0.5" /></button>
                  </div>
                  <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">{infoPanel.description}</p>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {infoPanel.facilities.map(f => (
                      <span key={f} className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[10px] font-medium">{f}</span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Building list (when searching) */}
        {query && (
          <div className="space-y-2">
            <p className="text-xs text-slate-500 font-medium px-1">{filtered.length} result{filtered.length !== 1 ? 's' : ''} found</p>
            {filtered.map((b, i) => (
              <motion.button
                key={b.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => { handleBuildingClick(b); setQuery(''); }}
                className="w-full bg-white rounded-xl shadow-card border border-slate-100 p-3 text-left flex items-center gap-3 hover:shadow-card-hover transition-all"
              >
                <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: b.color + '22' }}>
                  <Layers size={15} style={{ color: b.color }} />
                </div>
                <div>
                  <div className="text-sm font-semibold text-slate-700">{b.name}</div>
                  <div className="text-xs text-slate-400">{b.type} • {b.floors} Floors</div>
                </div>
              </motion.button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
