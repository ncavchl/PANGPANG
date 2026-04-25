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
          const isHot = Math.abs(percentA - 50) <= 5;

          return (
            <Link 
              key={poll.id} 
              to={`/poll/${poll.id}`} 
              className="group block bg-white p-6 md:p-8 rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgb(0,0,0,0.1)] hover:-translate-y-2 transition-all border-2 border-transparent hover:border-penguin-yellow"
            >
              <div className="flex justify-between items-center mb-6">
                <div className="flex gap-2">
                  {isHot && <span className="bg-penguin-yellow text-penguin-black text-[10px] font-black px-2 py-0.5 rounded-full uppercase shadow-sm">Hot</span>}
                  <span className="text-[10px] text-gray-500 font-bold px-3 py-1 bg-gray-50 rounded-full">
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
                {/* 포맷 변경: 표 수(퍼센트) */}
                <div className="flex px-4 text-xs md:text-sm font-black text-penguin-black h-5 items-end transition-all duration-1000">
                   <div style={{ width: `${percentA}%` }} className="text-left leading-none whitespace-nowrap">
                     {poll.votesA}표<span className="text-[10px] md:text-xs opacity-40 ml-1">({percentA}%)</span>
                   </div>
                   <div style={{ width: `${percentB}%` }} className="text-right leading-none whitespace-nowrap">
                     <span className="text-[10px] md:text-xs opacity-40 mr-1">({percentB}%)</span>{poll.votesB}표
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
