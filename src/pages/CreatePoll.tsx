import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreatePoll: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    question: '',
    optionA: '',
    optionB: '',
    creatorId: '',
    creatorPw: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('새로운 투표가 생성되었습니다!');
    navigate('/poll/1');
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-3xl font-black mb-8 text-penguin-black">새 투표 만들기</h1>
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 space-y-6">
          <div>
            <label className="block text-sm font-black text-penguin-black mb-2 ml-1">투표 제목 (필수, 최대 50자)</label>
            <input 
              required
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              className="w-full p-5 bg-penguin-gray border-none rounded-2xl focus:ring-4 focus:ring-penguin-yellow transition-all font-black text-penguin-black" 
              placeholder="예: 점심 메뉴 추천해주세요!"
              maxLength={50}
            />
          </div>
          <div>
            <label className="block text-sm font-black text-penguin-black mb-2 ml-1">상세 내용 (선택, 최대 300자)</label>
            <textarea 
              value={formData.question}
              onChange={(e) => setFormData({...formData, question: e.target.value})}
              className="w-full p-5 bg-penguin-gray border-none rounded-2xl h-32 focus:ring-4 focus:ring-penguin-yellow transition-all font-bold placeholder:text-gray-300 text-penguin-black" 
              placeholder="투표에 대한 상세 설명을 적어보세요."
              maxLength={300}
            />
          </div>
          <div className="space-y-4">
            <input 
              required
              type="text" 
              value={formData.optionA}
              onChange={(e) => setFormData({...formData, optionA: e.target.value})}
              className="w-full p-5 bg-penguin-black border-none rounded-2xl focus:ring-4 focus:ring-penguin-yellow transition-all font-black text-white" 
              placeholder="선택지 A"
              maxLength={50}
            />
            <input 
              required
              type="text" 
              value={formData.optionB}
              onChange={(e) => setFormData({...formData, optionB: e.target.value})}
              className="w-full p-5 bg-penguin-yellow border-none rounded-2xl focus:ring-4 focus:ring-penguin-black transition-all font-black text-penguin-black" 
              placeholder="선택지 B"
              maxLength={50}
            />
          </div>
        </div>

        <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 space-y-4">
          <p className="text-sm text-gray-500 font-black mb-2 ml-1">🛡️ 관리 정보 설정</p>
          <div className="grid grid-cols-2 gap-4">
            <input 
              required
              type="text" 
              value={formData.creatorId}
              onChange={(e) => setFormData({...formData, creatorId: e.target.value})}
              className="w-full p-4 bg-penguin-gray border-none rounded-2xl focus:ring-4 focus:ring-penguin-yellow transition-all font-bold text-sm text-penguin-black" 
              placeholder="ID" 
            />
            <input 
              required
              type="password" 
              value={formData.creatorPw}
              onChange={(e) => setFormData({...formData, creatorPw: e.target.value})}
              className="w-full p-4 bg-penguin-gray border-none rounded-2xl focus:ring-4 focus:ring-penguin-yellow transition-all font-bold text-sm text-penguin-black" 
              placeholder="PW" 
            />
          </div>
        </div>

        <button type="submit" className="w-full py-5 bg-penguin-yellow text-penguin-black rounded-[2rem] font-black text-xl shadow-xl shadow-penguin-yellow/20 hover:bg-penguin-black hover:text-penguin-yellow hover:-translate-y-1 active:translate-y-0 transition-all">
          투표 생성하기
        </button>
      </form>
    </div>
  );
};

export default CreatePoll;
