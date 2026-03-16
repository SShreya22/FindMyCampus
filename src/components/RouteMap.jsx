import { motion } from 'framer-motion';
import { useState, useRef } from 'react';

function pointsToPath(pts) {
  if (!pts || pts.length < 2) return '';
  const [first, ...rest] = pts;
  return `M ${first.x} ${first.y} ` + rest.map(p => `L ${p.x} ${p.y}`).join(' ');
}

export default function RouteMap({ buildings, pathData, highlightPath, onBuildingClick, selectedBuilding }) {
  const [routeKey, setRouteKey] = useState(0);

  const activePath = highlightPath ? pathData[highlightPath] : null;
  const pathString = pointsToPath(activePath || []);

  return (
    <div className="relative w-full rounded-2xl overflow-hidden bg-gradient-to-br from-slate-50 to-green-50 border border-slate-200" style={{ height: 340 }}>
      {/* Grid background */}
      <svg className="absolute inset-0 w-full h-full opacity-30" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
            <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#9CAF88" strokeWidth="0.5"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      <svg viewBox="0 0 360 340" className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
        {/* Campus paths / roads */}
        <path d="M 80 60 L 220 60" stroke="#e2e8f0" strokeWidth="6" strokeLinecap="round" />
        <path d="M 80 60 L 80 290" stroke="#e2e8f0" strokeWidth="6" strokeLinecap="round" />
        <path d="M 150 60 L 150 340" stroke="#e2e8f0" strokeWidth="6" strokeLinecap="round" />
        <path d="M 80 180 L 300 180" stroke="#e2e8f0" strokeWidth="6" strokeLinecap="round" />
        <path d="M 220 60 L 280 180" stroke="#e2e8f0" strokeWidth="6" strokeLinecap="round" />
        <path d="M 80 290 L 280 290" stroke="#e2e8f0" strokeWidth="6" strokeLinecap="round" />

        {/* Animated route */}
        {activePath && (
          <motion.path
            key={highlightPath}
            d={pathString}
            fill="none"
            stroke="#9CAF88"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="8 4"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
          />
        )}

        {/* Direction arrow on route */}
        {activePath && activePath.length >= 2 && (
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <circle
              cx={activePath[Math.floor(activePath.length / 2)].x}
              cy={activePath[Math.floor(activePath.length / 2)].y}
              r={5}
              fill="#9CAF88"
            />
          </motion.g>
        )}

        {/* Buildings */}
        {buildings.map((b, i) => {
          const isSelected = selectedBuilding === b.id;
          const isOnPath = activePath && (
            (highlightPath || '').includes(b.id.replace('block-', ''))
          );
          return (
            <motion.g
              key={b.id}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.06, type: 'spring', stiffness: 300 }}
              whileHover={{ scale: 1.12 }}
              style={{ cursor: 'pointer' }}
              onClick={() => onBuildingClick(b)}
            >
              <rect
                x={b.x - 22}
                y={b.y - 16}
                width={44}
                height={32}
                rx={8}
                fill={isSelected ? b.color : '#ffffff'}
                stroke={isSelected ? b.color : '#e2e8f0'}
                strokeWidth={isSelected ? 2 : 1.5}
                filter={isSelected ? 'drop-shadow(0 4px 8px rgba(0,0,0,0.12))' : 'drop-shadow(0 2px 4px rgba(0,0,0,0.06))'}
              />
              <text
                x={b.x}
                y={b.y + 5}
                textAnchor="middle"
                fontSize={isSelected ? "9" : "8"}
                fontWeight={isSelected ? "700" : "600"}
                fill={isSelected ? '#ffffff' : '#334155'}
                fontFamily="Inter, sans-serif"
              >
                {b.shortName}
              </text>

              {/* Pulse ring on selected */}
              {isSelected && (
                <motion.circle
                  cx={b.x}
                  cy={b.y}
                  r={28}
                  fill="none"
                  stroke={b.color}
                  strokeWidth={1.5}
                  initial={{ scale: 0.8, opacity: 0.8 }}
                  animate={{ scale: 1.4, opacity: 0 }}
                  transition={{ duration: 1.2, repeat: Infinity }}
                />
              )}

              {/* Start/End markers on route */}
              {activePath && (
                (activePath[0].x === b.x && activePath[0].y === b.y) ||
                (activePath[activePath.length - 1].x === b.x && activePath[activePath.length - 1].y === b.y)
              ) && (
                <circle cx={b.x} cy={b.y - 22} r={4} fill="#9CAF88" />
              )}
            </motion.g>
          );
        })}
      </svg>

      {/* Compass */}
      <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 flex items-center justify-center text-xs font-bold text-slate-500 shadow-sm border border-slate-200">
        N
      </div>

      {/* Legend */}
      <div className="absolute bottom-3 left-3 flex gap-2">
        <div className="flex items-center gap-1 bg-white/80 rounded-full px-2 py-1 text-xs text-slate-500 shadow-sm border border-slate-100">
          <div className="w-2 h-2 rounded-full bg-[#9CAF88]" />
          Route
        </div>
      </div>
    </div>
  );
}
