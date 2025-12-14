import React from 'react';
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  ZAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell
} from 'recharts';
import { Movie, Vector3 } from '../types';

interface ResultsChartProps {
  userVector: Vector3;
  movies: Movie[];
}

export const ResultsChart: React.FC<ResultsChartProps> = ({ userVector, movies }) => {
  // Format data for Recharts
  // We plot X (Tone) vs Y (Intensity). Z (Complexity) controls size/color implicitly via the ZAxis range or we just ignore it for 2D plot clarity.
  
  const data = movies.map(m => ({
    x: m.vector.x,
    y: m.vector.y,
    z: m.vector.z, // Complexity
    title: m.title,
    similarity: m.similarity || 0,
    isUser: false,
  }));

  const userData = [{
    x: userVector.x,
    y: userVector.y,
    z: userVector.z,
    title: "YOUR PREFERENCE",
    similarity: 1,
    isUser: true,
  }];

  const combinedData = [...data, ...userData];

  return (
    <div className="w-full h-[400px] bg-gray-900 rounded-xl border border-gray-700 p-4">
      <h3 className="text-gray-400 text-sm mb-4 text-center font-mono">
        VECTOR SPACE VISUALIZATION (X: Tone, Y: Intensity, Z: Complexity)
      </h3>
      <ResponsiveContainer width="100%" height="100%">
        <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis 
            type="number" 
            dataKey="x" 
            name="Tone" 
            domain={[0, 11]} 
            stroke="#9ca3af"
            label={{ value: 'Dark <-> Light', position: 'insideBottom', offset: -10, fill: '#6b7280' }}
          />
          <YAxis 
            type="number" 
            dataKey="y" 
            name="Intensity" 
            domain={[0, 11]} 
            stroke="#9ca3af"
            label={{ value: 'Calm <-> Intense', angle: -90, position: 'insideLeft', fill: '#6b7280' }}
          />
          <ZAxis type="number" dataKey="z" range={[50, 400]} name="Complexity" />
          <Tooltip 
            cursor={{ strokeDasharray: '3 3' }}
            contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151', color: '#f3f4f6' }}
            itemStyle={{ color: '#d1d5db' }}
          />
          <Scatter name="Movies" data={combinedData} fill="#8884d8">
            {combinedData.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={entry.isUser ? '#f43f5e' : `rgba(99, 102, 241, ${0.3 + (entry.similarity * 0.7)})`} 
                stroke={entry.isUser ? '#fff' : 'none'}
                strokeWidth={entry.isUser ? 2 : 0}
              />
            ))}
          </Scatter>
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
};
