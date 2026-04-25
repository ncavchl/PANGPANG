import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MOCK_POLLS } from '../mocks/data';

const PollDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const poll = MOCK_POLLS.find(p => p.id === id);
  
  const [voted, setVoted] = useState<null | 'A' | 'B'>(null);

  if (!poll) return <div className="p-8 text-center font-bold">투표를 찾을 수 없습니다.</div>;

  const total = poll.votesA + poll.votesB + (voted ? 1 : 0);
  const currentVotesA = poll.votesA + (voted === 'A' ? 1 : 0);
  const currentVotesB = poll.votesB + (voted === 'B' ? 1 : 0);
  
  const percentA = Math.round((currentVotesA / total) * 100);
  const percentB = 100 - percentA;

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <div className="mb-4">
        <Link to="/" className="text-sm text-gray-400 hover:text-blue-600 font-bold transition-colors">← 목록으로 돌아가기</Link>
      </div>

      <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 mb-6">
        <h1 className="text-2xl font-black mb-8 leading-tight">{poll.question}</h1>
        
        {!voted ? (
          <div className="grid grid-cols-1 gap-4">
            <button 
              onClick={() => setVoted('A')}
              className="group relative p-6 border-2 border-blue-100 rounded-2xl text-left hover:border-blue-500 hover:bg-blue-50 transition-all overflow-hidden"
            >
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-4xl opacity-5 group-hover:opacity-10 transition-opacity font-black">A</span>
              <p className="font-bold text-gray-700 text-lg pr-8">{poll.optionA}</p>
            </button>
            <button 
              onClick={() => setVoted('B')}
              className="group relative p-6 border-2 border-red-100 rounded-2xl text-left hover:border-red-500 hover:bg-red-50 transition-all overflow-hidden"
            >
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-4xl opacity-5 group-hover:opacity-10 transition-opacity font-black">B</span>
              <p className="font-bold text-gray-700 text-lg pr-8">{poll.optionB}</p>
            </button>
          </div>
        ) : (
          <div className="space-y-8 animate-in fade-in duration-500">
            <div className="space-y-4">
              <div className="flex justify-between items-end">
                <span className={`text-lg font-black ${voted === 'A' ? 'text-blue-600' : 'text-gray-400'}`}>
                  {poll.optionA} {voted === 'A' && '✅'}
                </span>
                <span className="text-2xl font-black text-blue-600">{percentA}%</span>
              </div>
              <div className="w-full bg-gray-100 h-6 rounded-2xl overflow-hidden">
                <div className="bg-blue-500 h-full" style={{ width: `${percentA}%` }}></div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-end">
                <span className={`text-lg font-black ${voted === 'B' ? 'text-red-600' : 'text-gray-400'}`}>
                  {poll.optionB} {voted === 'B' && '✅'}
                </span>
                <span className="text-2xl font-black text-red-500">{percentB}%</span>
              </div>
              <div className="w-full bg-gray-100 h-6 rounded-2xl overflow-hidden">
                <div className="bg-red-400 h-full" style={{ width: `${percentB}%` }}></div>
              </div>
            </div>
            
            <p className="text-center text-sm text-gray-400 font-bold pt-4">총 {total}명이 참여했습니다</p>
          </div>
        )}
      </div>

      <div className="flex justify-between items-center px-4">
        <Link 
          to={`/poll/${poll.id}/manage`}
          className="text-sm font-bold text-gray-300 hover:text-gray-600 underline underline-offset-4"
        >
          수정/삭제하기
        </Link>
        <button 
          onClick={() => {
            navigator.clipboard.writeText(window.location.href);
            alert('링크가 복사되었습니다!');
          }}
          className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-full text-sm font-bold transition-colors"
        >
          <span>🔗 링크 복사</span>
        </button>
      </div>
    </div>
  );
};

export default PollDetail;
