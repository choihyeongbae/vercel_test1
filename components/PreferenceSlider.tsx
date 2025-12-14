import React from 'react';

interface PreferenceSliderProps {
  label: string;
  value: number;
  onChange: (val: number) => void;
  minLabel: string;
  maxLabel: string;
  description: string;
  gradientFrom: string;
  gradientTo: string;
}

const PreferenceSlider: React.FC<PreferenceSliderProps> = ({
  label,
  value,
  onChange,
  minLabel,
  maxLabel,
  description,
  gradientFrom,
  gradientTo
}) => {
  return (
    <div className="group relative bg-surface p-6 rounded-2xl border border-white/5 hover:border-white/10 transition-all duration-300 shadow-lg hover:shadow-2xl">
      <div className="flex justify-between items-end mb-4">
        <div>
          <h3 className="text-lg font-bold text-white mb-1">{label}</h3>
          <p className="text-xs text-gray-400 font-light">{description}</p>
        </div>
        <div className="flex items-center justify-center w-10 h-10 bg-black/40 rounded-lg font-mono font-bold text-white border border-white/10">
          {value}
        </div>
      </div>

      <div className="relative h-6 w-full flex items-center">
        {/* Track Background */}
        <div className="absolute w-full h-2 bg-gray-800 rounded-full overflow-hidden">
           <div 
             className={`h-full bg-gradient-to-r ${gradientFrom} ${gradientTo} opacity-30`}
             style={{ width: '100%' }}
           />
        </div>
        
        {/* Active Track */}
        <div 
          className={`absolute h-2 rounded-full bg-gradient-to-r ${gradientFrom} ${gradientTo}`}
          style={{ width: `${(value / 10) * 100}%` }}
        />

        {/* Range Input (Invisible but functional) */}
        <input
          type="range"
          min="1"
          max="10"
          step="0.5"
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          className="absolute w-full h-full opacity-0 cursor-pointer z-10"
        />
        
        {/* Thumb (Visual only, follows input) */}
        <div 
          className="absolute h-5 w-5 bg-white rounded-full shadow-lg border-2 border-gray-900 pointer-events-none transition-transform duration-75 ease-out"
          style={{ 
            left: `calc(${(value / 10) * 100}% - 10px)`,
            boxShadow: `0 0 10px ${gradientTo}`
          }}
        />
      </div>

      <div className="flex justify-between mt-3 text-[10px] text-gray-500 font-bold uppercase tracking-widest">
        <span>{minLabel}</span>
        <span>{maxLabel}</span>
      </div>
    </div>
  );
};

export default PreferenceSlider;
