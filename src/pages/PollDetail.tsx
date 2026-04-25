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

      <div className="bg-white p-8 md:p-14 rounded-[4rem] shadow-[0_20px_70px_rgb(0,0,0,0.08)] border border-gray-50 mb-8 relative overflow-hidden">
        {/* 상단 배지 */}
        <div className="flex flex-wrap justify-between items-center gap-4 mb-10">
          <div className="flex items-center gap-3">
             <span className="bg-penguin-black text-penguin-yellow text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-[0.2em] shadow-sm">Live Poll</span>
             <span className="text-xs text-gray-400 font-black">{total}명 참여중</span>
          </div>
          <span className="text-xs text-gray-400 font-black bg-gray-50 px-4 py-2 rounded-2xl">
             {formatRelativeTime(poll.createdAt)} 작성
          </span>
        </div>

        {/* 제목 (필수) */}
        <h1 className="text-3xl md:text-5xl font-black mb-8 leading-[1.2] text-penguin-black tracking-tight italic">
          "{poll.title}"
        </h1>

        {/* 상세 내용 (선택) */}
        {hasQuestion && (
          <div className="mb-14 p-6 bg-penguin-gray/50 rounded-3xl border border-gray-100">
            <p className={`font-bold leading-[1.6] text-gray-600 transition-all duration-300 ${isExpanded ? 'text-lg' : 'text-base'}`}>
              {displayQuestion}
            </p>
            {needsTruncation && (
              <button 
                onClick={() => setIsExpanded(!isExpanded)}
                className="mt-4 text-xs font-black text-penguin-black bg-penguin-yellow px-3 py-1.5 rounded-xl hover:bg-penguin-black hover:text-penguin-yellow transition-all"
              >
                {isExpanded ? '간략히 보기' : '상세 내용 더보기'}
              </button>
            )}
          </div>
        )}
        
        {!voted ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <button 
              onClick={() => setVoted('A')}
              className="group relative p-10 bg-penguin-black rounded-[2.5rem] text-left hover:scale-[1.03] transition-all shadow-xl shadow-black/20 overflow-hidden"
            >
              <span className="text-xs font-black text-penguin-yellow/50 uppercase tracking-widest mb-4 block">Option A</span>
              <p className="font-black text-white text-xl md:text-2xl leading-snug">{poll.optionA}</p>
              <span className="absolute -right-4 -bottom-4 text-9xl opacity-10 font-black text-white italic">A</span>
            </button>
            <button 
              onClick={() => setVoted('B')}
              className="group relative p-10 bg-penguin-yellow rounded-[2.5rem] text-left hover:scale-[1.03] transition-all shadow-xl shadow-penguin-yellow/30 overflow-hidden"
            >
              <span className="text-xs font-black text-penguin-black/40 uppercase tracking-widest mb-4 block">Option B</span>
              <p className="font-black text-penguin-black text-xl md:text-2xl leading-snug">{poll.optionB}</p>
              <span className="absolute -right-4 -bottom-4 text-9xl opacity-10 font-black text-penguin-black italic">B</span>
            </button>
          </div>
        ) : (
          <div className="space-y-16 animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="space-y-6">
              <div className="flex justify-between items-end px-2">
                <div className="flex items-center gap-4">
                  <div className="w-6 h-6 bg-penguin-black rounded-lg shadow-md" />
                  <div className="flex flex-col">
                    <span className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">Option A</span>
                    <span className={`text-xl md:text-3xl font-black ${voted === 'A' ? 'text-penguin-black underline decoration-penguin-yellow decoration-4 underline-offset-8' : 'text-gray-400'}`}>
                      {poll.optionA} {voted === 'A' && '✅'}
                    </span>
                  </div>
                </div>
                <span className="text-6xl font-black text-penguin-black">{percentA}%</span>
              </div>
              <div className="w-full bg-gray-100 h-16 rounded-[2rem] overflow-hidden flex shadow-inner border-4 border-gray-100">
                <div className="bg-penguin-black h-full transition-all duration-1000 flex items-center px-6" style={{ width: `${percentA}%` }}>
                  <span className="font-black text-penguin-yellow text-xl italic">A</span>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex justify-between items-end px-2">
                <div className="flex items-center gap-4">
                  <div className="w-6 h-6 bg-penguin-yellow rounded-lg shadow-md" />
                  <div className="flex flex-col">
                    <span className="text-xs font-black text-penguin-black uppercase tracking-widest bg-penguin-yellow px-2 py-0.5 rounded-md mb-1 w-fit">Option B</span>
                    <span className={`text-xl md:text-3xl font-black ${voted === 'B' ? 'text-penguin-black underline decoration-penguin-yellow decoration-4 underline-offset-8' : 'text-gray-400'}`}>
                      {poll.optionB} {voted === 'B' && '✅'}
                    </span>
                  </div>
                </div>
                <span className="text-6xl font-black text-penguin-black">{percentB}%</span>
              </div>
              <div className="w-full bg-gray-100 h-16 rounded-[2rem] overflow-hidden flex shadow-inner border-4 border-gray-100">
                <div className="bg-penguin-yellow h-full transition-all duration-1000 flex items-center px-6" style={{ width: `${percentB}%` }}>
                  <span className="font-black text-penguin-black text-xl italic">B</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-between items-center px-8">
        <Link 
          to={`/poll/${poll.id}/manage`}
          className="text-sm font-black text-gray-300 hover:text-penguin-black underline underline-offset-8 transition-colors"
        >
          관리자 메뉴 (수정/삭제)
        </Link>
        <button 
          onClick={() => {
            navigator.clipboard.writeText(window.location.href);
            alert('링크가 복사되었습니다!');
          }}
          className="flex items-center gap-3 px-10 py-5 bg-penguin-yellow text-penguin-black hover:bg-penguin-black hover:text-penguin-yellow rounded-full text-lg font-black transition-all shadow-2xl active:scale-95"
        >
          <span>🔗 링크 복사하기</span>
        </button>
      </div>
    </div>
  );
};

export default PollDetail;
