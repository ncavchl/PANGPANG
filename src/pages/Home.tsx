import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MOCK_POLLS } from '../mocks/data';
import { formatRelativeTime } from '../lib/utils';

const Home: React.FC = () => {
  const [filter, setFilter] = useState<'hot' | 'popular' | 'latest'>('hot');

  const getSortedPolls = () => {
    const polls = [...MOCK_POLLS];
    if (filter === 'hot') {
      return polls.sort((a, b) => {
        const totalA = a.votesA + a.votesB;
        const totalB = b.votesA + b.votesB;
        const ratioA = a.votesA / totalA;
        const ratioB = b.votesA / totalB;
        const diffA = Math.abs(ratioA - 0.5);
        const diffB = Math.abs(ratioB - 0.5);
        
        // 1. >10 votes 50/50 (Tier 1)
        const isTier1A = totalA > 10 && a.votesA === a.votesB;
        const isTier1B = totalB > 10 && b.votesA === b.votesB;
        if (isTier1A !== isTier1B) return isTier1A ? -1 : 1;
        
        // 2. >10 votes 45-55% range (Tier 2)
        const isTier2A = totalA > 10 && diffA <= 0.05;
        const isTier2B = totalB > 10 && diffB <= 0.05;
        if (isTier2A !== isTier2B) return isTier2A ? -1 : 1;
        
        // 3. All others (Tier 3) - includes <= 10 votes, or >10 votes outside 45-55%
        if (Math.abs(diffA - diffB) > 0.001) return diffA - diffB;
        
        // 4. Same ratio: Higher total votes first
        return totalB - totalA;
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
            className={`px-5 py-2.5 rounded-full text-sm font-black transition-all whitespace-nowrap ${
              filter === tab.id 
                ? 'bg-penguin-yellow text-penguin-black shadow-md' 
                : 'bg-white text-penguin-black border border-gray-100 hover:bg-penguin-yellow/20'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {getSortedPolls().map((poll) => {
          const total = poll.votesA + poll.votesB;
          const percentA = Math.round((poll.votesA / total) * 100);
          const percentB = 100 - percentA;
          const isHot = Math.abs(percentA - 50) <= 5 && (total > 10 || percentA !== 50);

          return (
            <Link 
              key={poll.id} 
              to={`/poll/${poll.id}`} 
              className="group block bg-white p-6 md:p-8 rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgb(0,0,0,0.1)] hover:-translate-y-2 transition-all border-2 border-transparent hover:border-penguin-yellow"
            >
              <div className="flex justify-between items-center mb-6">
                <div className="flex gap-2 h-6">
                  {isHot && (
                    <span className="flex items-center justify-center bg-penguin-yellow text-penguin-black text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider shadow-sm">
                      팽팽🔥
                    </span>
                  )}
                  <span className="flex items-center justify-center text-[10px] text-gray-500 font-bold px-3 py-1 bg-gray-50 rounded-full">
                    {total}명 참여
                  </span>
                </div>
                <span className="text-[11px] text-gray-400 font-black">
                  {formatRelativeTime(poll.createdAt)}
                </span>
              </div>
              
              <div className="mb-6 min-h-[3.5rem] md:min-h-[4rem] flex flex-col justify-center">
                <h2 className="font-black text-lg md:text-xl group-hover:text-penguin-black transition-colors line-clamp-2 leading-[1.4]">
                  {poll.title}
                </h2>
              </div>

              <div className="space-y-4">
                {/* 고정된 위치 표기: Flex justify-between 사용 */}
                <div className="flex justify-between px-1 text-penguin-black items-end h-10">
                   <div className="flex flex-col items-start">
                      <span className="text-sm md:text-base font-black leading-none">{poll.votesA}표</span>
                      <span className="text-[10px] md:text-xs font-bold text-gray-400 mt-1">({percentA}%)</span>
                   </div>
                   <div className="flex flex-col items-end">
                      <span className="text-sm md:text-base font-black leading-none">{poll.votesB}표</span>
                      <span className="text-[10px] md:text-xs font-bold text-gray-400 mt-1">({percentB}%)</span>
                   </div>
                </div>

                <div className="w-full bg-gray-100 h-9 md:h-10 rounded-2xl overflow-hidden flex shadow-inner border-2 border-gray-50">
                  <div className="bg-penguin-black h-full transition-all duration-1000 flex items-center px-4" style={{ width: `${percentA}%` }}>
                    <span className="text-xs md:text-sm font-black text-penguin-yellow italic">A</span>
                  </div>
                  <div className="bg-penguin-yellow h-full transition-all duration-1000 flex items-center justify-end px-4" style={{ width: `${percentB}%` }}>
                    <span className="text-xs md:text-sm font-black text-penguin-black italic">B</span>
                  </div>
                </div>
                
                <div className="flex justify-between gap-4 px-1 pt-1">
                  <span className="text-gray-400 font-bold text-[11px] line-clamp-1 flex-1">{poll.optionA}</span>
                  <span className="text-gray-400 font-bold text-[11px] line-clamp-1 flex-1 text-right">{poll.optionB}</span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      <Link 
        to="/create" 
        className="fixed bottom-8 right-8 w-16 h-16 md:w-20 md:h-20 bg-penguin-yellow text-penguin-black rounded-full text-4xl md:text-5xl shadow-2xl flex items-center justify-center hover:bg-penguin-black hover:text-penguin-yellow hover:scale-110 active:scale-95 transition-all z-20 border-4 md:border-8 border-white"
      >
        <span className="mb-1 font-black">+</span>
      </Link>
    </div>
  );
};

export default Home;
