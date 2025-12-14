import React, { useState, useMemo, useEffect } from 'react';
import { Film, Brain, Info, Github } from 'lucide-react';
import { Vector3, Movie } from './types';
import { MOVIES } from './data/movies';
import { cosineSimilarity } from './utils/math';
import { PreferenceSlider } from './components/PreferenceSlider';

const App: React.FC = () => {
  // State for user preferences (3 dimensions)
  // Defaulting to middle ground (5,5,5)
  const [tone, setTone] = useState<number>(5);
  const [intensity, setIntensity] = useState<number>(5);
  const [complexity, setComplexity] = useState<number>(5);
  
  const [recommendations, setRecommendations] = useState<Movie[]>([]);

  // Calculate similarity whenever inputs change
  // Optimization: useMemo or useEffect. Since dataset is small (200), we can do this real-time.
  const sortedMovies = useMemo(() => {
    const userVec: Vector3 = { x: tone, y: intensity, z: complexity };
    
    // 1. Calculate similarity for all movies
    const scored = MOVIES.map(movie => {
      const sim = cosineSimilarity(userVec, movie.vector);
      return { ...movie, similarity: sim };
    });

    // 2. Sort by similarity descending
    scored.sort((a, b) => (b.similarity || 0) - (a.similarity || 0));

    return scored;
  }, [tone, intensity, complexity]);

  // Update top recommendations when sorted list changes
  useEffect(() => {
    setRecommendations(sortedMovies.slice(0, 5));
  }, [sortedMovies]);

  return (
    <div className="min-h-screen bg-[#0f1014] text-white selection:bg-indigo-500 selection:text-white pb-20">
      {/* Header */}
      <header className="border-b border-gray-800 bg-[#0f1014]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Film className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight">CineMatch<span className="text-indigo-400">AI</span></span>
          </div>
          <a href="https://github.com" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white transition-colors">
            <Github className="w-6 h-6" />
          </a>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Controls */}
          <div className="lg:col-span-4 space-y-2">
            <div className="mb-6">
              <h1 className="text-3xl font-bold mb-2">나만의 영화 찾기</h1>
              <p className="text-gray-400 leading-relaxed word-keep-all">
                아래의 슬라이더를 조절하여 당신의 현재 기분을 설정하세요. 
                <span className="text-indigo-400 font-mono mx-1 font-bold">코사인 유사도(Cosine Similarity)</span> 
                알고리즘이 당신의 취향과 가장 가까운 영화를 데이터베이스에서 찾아냅니다.
              </p>
            </div>

            <PreferenceSlider
              label="분위기 (Tone)"
              value={tone}
              onChange={setTone}
              minLabel="어두움 / 진지함"
              maxLabel="밝음 / 행복함"
              description="느와르 같은 어두움부터 뮤지컬 같은 밝음까지."
              colorClass="text-blue-400"
            />

            <PreferenceSlider
              label="강렬함 (Intensity)"
              value={intensity}
              onChange={setIntensity}
              minLabel="잔잔함 / 느림"
              maxLabel="강렬함 / 빠름"
              description="명상적인 느린 호흡부터 숨 쉴 틈 없는 액션까지."
              colorClass="text-red-400"
            />

            <PreferenceSlider
              label="복잡성 (Complexity)"
              value={complexity}
              onChange={setComplexity}
              minLabel="단순함 / 킬링타임"
              maxLabel="복잡함 / 예술적"
              description="가볍게 즐기는 팝콘 무비부터 생각하게 만드는 영화까지."
              colorClass="text-green-400"
            />
            
            <div className="bg-indigo-900/20 border border-indigo-500/30 p-4 rounded-lg flex gap-3 items-start">
              <Info className="w-5 h-5 text-indigo-400 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-indigo-200/80 word-keep-all">
                <span className="font-semibold text-indigo-300">작동 원리:</span> 사용자의 설정값은 3차원 공간의 벡터가 됩니다. 이 벡터와 영화들의 벡터 사이의 각도를 계산(내적)하여 가장 유사한 작품을 추천합니다.
              </div>
            </div>
          </div>

          {/* Right Column: Results Only */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Movie List */}
            <section>
              <h2 className="text-xl font-bold flex items-center gap-2 mb-6">
                <Brain className="w-5 h-5 text-pink-400" />
                추천 영화 TOP 5
              </h2>
              
              <div className="grid gap-4">
                {recommendations.map((movie, idx) => (
                  <div 
                    key={movie.id} 
                    className="group relative bg-gray-800/50 hover:bg-gray-800 border border-gray-700 hover:border-indigo-500/50 rounded-xl p-5 transition-all duration-300 flex items-center justify-between overflow-hidden"
                  >
                    {/* Background Similarity Bar */}
                    <div 
                      className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-indigo-500/10 to-transparent transition-all duration-500" 
                      style={{ width: `${(movie.similarity || 0) * 100}%` }} 
                    />

                    <div className="relative z-10 flex items-center gap-6">
                      <div className="flex flex-col items-center justify-center w-12 h-12 bg-gray-900 rounded-lg border border-gray-700 group-hover:border-indigo-500/50 group-hover:text-indigo-400 font-mono font-bold text-lg transition-colors">
                        #{idx + 1}
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-bold text-white group-hover:text-indigo-300 transition-colors">
                          {movie.title}
                          <span className="ml-3 text-sm font-normal text-gray-500 bg-gray-900 px-2 py-0.5 rounded-full border border-gray-700">
                            {movie.year}
                          </span>
                        </h3>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {movie.genres.map(g => (
                            <span key={g} className="text-xs font-medium text-gray-400 px-2 py-0.5 rounded bg-gray-700/50">
                              {g}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="relative z-10 text-right">
                      <div className="text-sm text-gray-400 uppercase tracking-wider font-semibold text-[10px] mb-1">일치도 (Similarity)</div>
                      <div className="text-2xl font-bold text-white font-mono">
                        {((movie.similarity || 0) * 100).toFixed(1)}%
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;