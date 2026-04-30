import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MOCK_POLLS } from '../mocks/data';
import { formatRelativeTime } from '../lib/utils';

const PollDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const poll = MOCK_POLLS.find(p => p.id === id);
  
  const [voted, setVoted] = useState<null | 'A' | 'B'>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  if (!poll) return <div className="p-8 text-center font-bold text-penguin-black">투표를 찾을 수 없습니다.</div>;

  const total = poll.votesA + poll.votesB + (voted ? 1 : 0);
  const currentVotesA = poll.votesA + (voted === 'A' ? 1 : 0);
  const currentVotesB = poll.votesB + (voted === 'B' ? 1 : 0);
  
  const percentA = Math.round((currentVotesA / total) * 100);
  const percentB = 100 - percentA;

  const hasQuestion = !!poll.question && poll.question.trim().length > 0;
  const needsTruncation = hasQuestion && poll.question!.length > 100;
  const displayQuestion = (needsTruncation && !isExpanded) 
    ? poll.question!.slice(0, 100) + "..." 
    : poll.question;

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <div className="mb-6">
        <Link to="/" className="text-sm text-gray-400 hover:text-penguin-black font-black transition-colors flex items-center gap-2">
          <span className="text-xl">←</span> 목록으로 돌아가기
        </Link>
      </div>

      <div className="bg-white p-6 md:p-14 rounded-[3rem] md:rounded-[4rem] shadow-[0_20px_70px_rgb(0,0,0,0.08)] border border-gray-50 mb-8 relative overflow-hidden">
        {/* 상단 배지 */}
        <div className="flex flex-wrap justify-between items-center gap-4 mb-10">
          <div className="flex items-center gap-3">
             <span className="bg-penguin-black text-penguin-yellow text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-[0.2em] shadow-sm">Live Poll</span>
             <span className="text-xs text-gray-400 font-black">{total}명 참여중</span>
          </div>
          <span className="text-[11px] text-gray-400 font-black bg-gray-50 px-4 py-2 rounded-2xl">
             {formatRelativeTime(poll.createdAt)} 작성
          </span>
        </div>

        {/* 제목 */}
        <h1 className="text-2xl md:text-5xl font-black mb-8 leading-[1.3] text-penguin-black tracking-tight italic">
          {poll.title}
        </h1>

        {/* 상세 내용 */}
        {hasQuestion && (
          <div className="mb-14 p-5 md:p-8 bg-penguin-gray/50 rounded-[2rem] border border-gray-100">
            <p className={`font-bold leading-[1.7] text-gray-600 transition-all duration-300 ${isExpanded ? 'text-lg' : 'text-sm md:text-base'}`}>
              {displayQuestion}
            </p>
            {needsTruncation && (
              <button 
                onClick={() => setIsExpanded(!isExpanded)}
                className="mt-4 text-xs font-black text-penguin-black bg-penguin-yellow px-4 py-2 rounded-xl hover:bg-penguin-black hover:text-penguin-yellow transition-all shadow-sm"
              >
                {isExpanded ? '간략히 보기' : '상세 내용 더보기'}
              </button>
            )}
          </div>
        )}
        
        {!voted ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mt-8">
            <button 
              onClick={() => setVoted('A')}
              className="group relative p-8 md:p-10 bg-penguin-black rounded-[2rem] md:rounded-[2.5rem] text-left hover:scale-[1.03] transition-all shadow-xl shadow-black/20 overflow-hidden"
            >
              <span className="text-[10px] font-black text-penguin-yellow/50 uppercase tracking-widest mb-3 block">Option A</span>
              <p className="font-black text-penguin-yellow text-lg md:text-xl leading-snug relative z-10">{poll.optionA}</p>
              <span className="absolute -right-4 -bottom-4 text-8xl md:text-9xl opacity-10 font-black text-white italic">A</span>
            </button>
            <button 
              onClick={() => setVoted('B')}
              className="group relative p-8 md:p-10 bg-penguin-yellow rounded-[2rem] md:rounded-[2.5rem] text-left hover:scale-[1.03] transition-all shadow-xl shadow-penguin-yellow/30 overflow-hidden"
            >
              <span className="text-[10px] font-black text-penguin-black/40 uppercase tracking-widest mb-3 block">Option B</span>
              <p className="font-black text-penguin-black text-lg md:text-xl leading-snug relative z-10">{poll.optionB}</p>
              <span className="absolute -right-4 -bottom-4 text-8xl md:text-9xl opacity-10 font-black text-penguin-black italic">B</span>
            </button>
          </div>
        ) : (
          <div className="space-y-10 md:space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="space-y-10">
              {/* Option A Result: Fixed Alignment */}
              <div className="space-y-3">
                <div className="flex justify-between items-end px-2 text-left">
                  <span className={`text-lg md:text-2xl font-black ${voted === 'A' ? 'text-penguin-black' : 'text-gray-400'}`}>
                    {poll.optionA} {voted === 'A' && '✅'}
                  </span>
                </div>
                <div className="flex items-center gap-4 md:gap-8">
                  <div className="flex-1 bg-gray-100 h-14 md:h-16 rounded-[1.5rem] md:rounded-[2rem] overflow-hidden flex shadow-inner border-4 border-gray-100">
                    <div className="bg-penguin-black h-full transition-all duration-1000 relative min-w-0" style={{ width: `${percentA}%` }}>
                      <span className="absolute left-6 top-1/2 -translate-y-1/2 font-black text-penguin-yellow text-lg md:text-xl italic whitespace-nowrap">A</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end w-24 md:w-32 flex-shrink-0">
                    <span className="text-2xl md:text-4xl font-black text-penguin-black leading-none tabular-nums text-right">{currentVotesA}표</span>
                    <span className="text-sm md:text-lg font-bold text-gray-400 mt-1 tabular-nums text-right">({percentA}%)</span>
                  </div>
                </div>
              </div>

              {/* Option B Result: Fixed Alignment */}
              <div className="space-y-3">
                <div className="flex justify-between items-end px-2 text-left">
                  <span className={`text-lg md:text-2xl font-black ${voted === 'B' ? 'text-penguin-black' : 'text-gray-300'}`}>
                    {poll.optionB} {voted === 'B' && '✅'}
                  </span>
                </div>
                <div className="flex items-center gap-4 md:gap-8">
                  <div className="flex-1 bg-gray-100 h-14 md:h-16 rounded-[1.5rem] md:rounded-[2rem] overflow-hidden flex shadow-inner border-4 border-gray-100">
                    <div className="bg-penguin-yellow h-full transition-all duration-1000 relative min-w-0" style={{ width: `${percentB}%` }}>
                      <span className="absolute left-6 top-1/2 -translate-y-1/2 font-black text-penguin-black text-lg md:text-xl italic whitespace-nowrap">B</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end w-24 md:w-32 flex-shrink-0">
                    <span className="text-2xl md:text-4xl font-black text-penguin-black leading-none tabular-nums text-right">{currentVotesB}표</span>
                    <span className="text-sm md:text-lg font-bold text-gray-400 mt-1 tabular-nums text-right">({percentB}%)</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="pt-6 text-center border-t border-gray-50">
               <p className="text-sm text-gray-400 font-black uppercase tracking-[0.1em]">총 {total}명이 팽팽하게 참여했습니다!</p>
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-between items-center px-8">
        <Link 
          to={`/poll/${poll.id}/manage`}
          className="text-xs md:text-sm font-black text-gray-300 hover:text-penguin-black underline underline-offset-8 transition-colors"
        >
          관리자 메뉴 (수정/삭제)
        </Link>
        <button 
          onClick={() => {
            navigator.clipboard.writeText(window.location.href);
            alert('링크가 복사되었습니다!');
          }}
          className="flex items-center gap-3 px-6 py-4 md:px-10 md:py-5 bg-penguin-yellow text-penguin-black hover:bg-penguin-black hover:text-penguin-yellow rounded-full text-sm md:text-lg font-black transition-all shadow-2xl active:scale-95"
        >
          <span>🔗 링크 복사</span>
        </button>
      </div>
    </div>
  );
};

export default PollDetail;
