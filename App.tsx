import React, { useState, useMemo, useEffect } from 'react';
import { Sparkles, Clapperboard, RefreshCw } from 'lucide-react';
import { Vector3, Movie } from './types';
import { MOVIES } from './data/movies';
import { cosineSimilarity } from './utils/math';
import { PreferenceSlider } from './components/PreferenceSlider';
import { MovieCard } from './components/MovieCard';

const App: React.FC = () => {
  const [tone, setTone] = useState<number>(5.5);
  const [intensity, setIntensity] = useState<number>(5.5);
  const [complexity, setComplexity] = useState<number>(5.5);
  const [recommendations, setRecommendations] = useState<Movie[]>([]);
  const [isCalculating, setIsCalculating] = useState(false);

  const sortedMovies = useMemo(() => {
    const userVec: Vector3 = { x: tone, y: intensity, z: complexity };
    const scored = MOVIES.map(movie => ({
      ...movie,
      similarity: cosineSimilarity(userVec, movie.vector)
    }));
    return scored.sort((a, b) => (b.similarity || 0) - (a.similarity || 0));
  }, [tone, intensity, complexity]);

  useEffect(() => {
    // Add a tiny artificial delay for "calculating" feel when vectors change drastically
    setIsCalculating(true);
    const timer = setTimeout(() => {
      setRecommendations(sortedMovies.slice(0, 5));
      setIsCalculating(false);
    }, 300);
    return () => clearTimeout(timer);
  }, [sortedMovies]);

  return (
    <div className="min-h-screen bg-background text-gray-200 pb-20 font-sans">
      
      {/* Navbar */}
      <nav className="border-b border-white/5 bg-background/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
              <Clapperboard className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-lg tracking-tight text-white">
              CineMatch <span className="text-indigo-500">AI</span>
            </span>
          </div>
          <div className="text-xs font-medium px-3 py-1 rounded-full bg-white/5 border border-white/5 text-gray-400">
            v1.0.0
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Left Column: Input Panel */}
          <div className="lg:col-span-5 space-y-8 animate-fade-in">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-5xl font-bold text-white leading-tight">
                오늘 당신의 <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
                  영화 취향은?
                </span>
              </h1>
              <p className="text-gray-400 text-lg leading-relaxed word-keep-all">
                감정의 미세한 차이를 조절해보세요. 
                AI가 벡터 공간을 탐색하여 당신의 현재 기분에 딱 맞는 영화를 찾아냅니다.
              </p>
            </div>

            <div className="space-y-6 pt-4">
              <PreferenceSlider
                label="분위기 (Tone)"
                value={tone}
                onChange={setTone}
                minLabel="느와르 / 어두움"
                maxLabel="코미디 / 밝음"
                description="영화의 전반적인 색채와 분위기를 결정합니다."
                gradientFrom="from-gray-700"
                gradientTo="from-blue-500 to-cyan-400"
              />

              <PreferenceSlider
                label="강렬함 (Intensity)"
                value={intensity}
                onChange={setIntensity}
                minLabel="잔잔함 / 서정적"
                maxLabel="액션 / 폭발적"
                description="이야기의 전개 속도와 시각적 자극의 정도입니다."
                gradientFrom="from-emerald-900"
                gradientTo="from-red-500 to-orange-500"
              />

              <PreferenceSlider
                label="복잡성 (Complexity)"
                value={complexity}
                onChange={setComplexity}
                minLabel="킬링타임 / 단순"
                maxLabel="철학적 / 복잡"
                description="스토리의 구조와 메시지의 깊이를 선택하세요."
                gradientFrom="from-indigo-900"
                gradientTo="from-purple-500 to-pink-500"
              />
            </div>
            
            <div className="p-4 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex gap-4 items-start">
              <Sparkles className="w-5 h-5 text-indigo-400 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-bold text-indigo-300 text-sm mb-1">실시간 분석 중</h4>
                <p className="text-xs text-indigo-200/60 leading-relaxed">
                  사용자의 입력값이 변경될 때마다 코사인 유사도(Cosine Similarity) 알고리즘이 200여 개의 영화 데이터와 실시간으로 대조합니다.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Recommendations */}
          <div className="lg:col-span-7">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                추천 결과
                <span className="text-sm font-normal text-gray-500 ml-2 bg-surface px-2 py-1 rounded-md border border-white/5">Top 5</span>
              </h2>
              {isCalculating && (
                <div className="flex items-center gap-2 text-indigo-400 text-sm animate-pulse">
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  분석 중...
                </div>
              )}
            </div>

            <div className="space-y-4 min-h-[500px]">
              {recommendations.map((movie, index) => (
                <MovieCard key={movie.id} movie={movie} rank={index + 1} />
              ))}
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default App;
