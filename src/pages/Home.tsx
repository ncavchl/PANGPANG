import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MOCK_POLLS } from '../mocks/data';

const Home: React.FC = () => {
  const [filter, setFilter] = useState<'hot' | 'popular' | 'latest'>('hot');

  // 치열함(50% 근접순) 계산 로직 (간단히 구현)
  const getSortedPolls = () => {
    const polls = [...MOCK_POLLS];
    if (filter === 'hot') {
      return polls.sort((a, b) => {
        const diffA = Math.abs((a.votesA / (a.votesA + a.votesB)) - 0.5);
        const diffB = Math.abs((b.votesA / (b.votesA + b.votesB)) - 0.5);
        return diffA - diffB;
      });
    }
    if (filter === 'popular') {
      return polls.sort((a, b) => (b.votesA + b.votesB) - (a.votesA + a.votesB));
    }
    return polls.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  };

  return (
    <div className="p-4">
      <div className="flex gap-2 mb-8 overflow-x-auto pb-2 scrollbar-hide">
        {[
          { id: 'hot', label: '🔥 치열함' },
          { id: 'popular', label: '⭐ 인기순' },
          { id: 'latest', label: '🕒 최신순' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilter(tab.id as any)}
            className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all whitespace-nowrap ${
              filter === tab.id 
                ? 'bg-blue-600 text-white shadow-md' 
                : 'bg-white text-gray-500 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {getSortedPolls().map((poll) => {
          const total = poll.votesA + poll.votesB;
          const percentA = Math.round((poll.votesA / total) * 100);
          const percentB = 100 - percentA;
          const isHot = Math.abs(percentA - 50) <= 5;

          return (
            <Link 
              key={poll.id} 
              to={`/poll/${poll.id}`} 
              className="group block border bg-white p-6 rounded-3xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex gap-2">
                  {isHot && <span className="bg-orange-100 text-orange-600 text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider">Super Hot</span>}
                  <span className="text-[10px] text-gray-400 font-bold px-2 py-0.5 border border-gray-100 rounded-full uppercase tracking-wider">
                    {total}명 참여
                  </span>
                </div>
              </div>
              
              <h2 className="font-bold text-xl mb-6 group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug">
                {poll.question}
              </h2>

              <div className="space-y-3">
                <div className="w-full bg-gray-100 h-3 rounded-full overflow-hidden flex">
                  <div className="bg-blue-500 h-full transition-all duration-1000" style={{ width: `${percentA}%` }}></div>
                  <div className="bg-red-400 h-full transition-all duration-1000" style={{ width: `${percentB}%` }}></div>
                </div>
                <div className="flex justify-between text-xs font-black">
                  <div className="flex flex-col items-start">
                    <span className="text-blue-600">{percentA}%</span>
                    <span className="text-gray-400 font-medium truncate max-w-[120px]">{poll.optionA}</span>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-red-500">{percentB}%</span>
                    <span className="text-gray-400 font-medium truncate max-w-[120px] text-right">{poll.optionB}</span>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      <Link 
        to="/create" 
        className="fixed bottom-8 right-8 w-16 h-16 bg-blue-600 text-white rounded-full text-4xl shadow-2xl flex items-center justify-center hover:bg-blue-700 hover:scale-110 active:scale-95 transition-all z-20"
      >
        <span className="mb-1">+</span>
      </Link>
    </div>
  );
};

export default Home;
