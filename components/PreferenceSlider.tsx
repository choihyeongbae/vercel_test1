import React from 'react';

interface PreferenceSliderProps {
  label: string;
  value: number;
  onChange: (val: number) => void;
  minLabel: string;
  maxLabel: string;
  description: string;
  colorClass: string;
}

export const PreferenceSlider: React.FC<PreferenceSliderProps> = ({
  label,
  value,
  onChange,
  minLabel,
  maxLabel,
  description,
  colorClass
}) => {
  return (
    <div className="mb-8 p-6 bg-gray-800 rounded-xl border border-gray-700 shadow-lg">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-semibold text-white">{label}</h3>
        <span className={`text-xl font-bold ${colorClass}`}>{value}</span>
      </div>
      <p className="text-gray-400 text-sm mb-4">{description}</p>
      
      <input
        type="range"
        min="1"
        max="10"
        step="0.5"
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full h-3 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-indigo-500"
      />
      
      <div className="flex justify-between mt-2 text-xs text-gray-500 font-medium uppercase tracking-wider">
        <span>{minLabel}</span>
        <span>{maxLabel}</span>
      </div>
    </div>
  );
};
