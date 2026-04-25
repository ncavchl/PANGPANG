import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreatePoll: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    question: '',
    optionA: '',
    optionB: '',
    creatorId: '',
    creatorPw: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 실제로는 여기서 API 호출을 통해 DB에 저장합니다.
    alert('새로운 투표가 생성되었습니다! (Mock)');
    // 생성된 ID가 '1'이라고 가정하고 이동
    navigate('/poll/1');
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-3xl font-black mb-8">새 투표 만들기</h1>
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 space-y-6">
          <div>
            <label className="block text-sm font-black text-gray-600 mb-2 ml-1">질문 (최대 300자)</label>
            <textarea 
              required
              value={formData.question}
              onChange={(e) => setFormData({...formData, question: e.target.value})}
              className="w-full p-4 bg-gray-50 border-none rounded-2xl h-32 focus:ring-2 focus:ring-blue-500 font-bold placeholder:text-gray-300" 
              placeholder="사람들의 의견이 궁금한 질문을 입력하세요."
              maxLength={300}
            />
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-400 mb-1 ml-1 uppercase tracking-wider">Option A</label>
              <input 
                required
                type="text" 
                value={formData.optionA}
                onChange={(e) => setFormData({...formData, optionA: e.target.value})}
                className="w-full p-4 bg-blue-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 font-bold" 
                placeholder="선택지 A 내용"
                maxLength={50}
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-400 mb-1 ml-1 uppercase tracking-wider">Option B</label>
              <input 
                required
                type="text" 
                value={formData.optionB}
                onChange={(e) => setFormData({...formData, optionB: e.target.value})}
                className="w-full p-4 bg-red-50 border-none rounded-2xl focus:ring-2 focus:ring-red-500 font-bold" 
                placeholder="선택지 B 내용"
                maxLength={50}
              />
            </div>
          </div>
        </div>

        <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 space-y-4">
          <p className="text-sm text-gray-500 font-black mb-2 ml-1">🛡️ 관리 정보 설정 (수정/삭제용)</p>
          <div className="grid grid-cols-2 gap-4">
            <input 
              required
              type="text" 
              value={formData.creatorId}
              onChange={(e) => setFormData({...formData, creatorId: e.target.value})}
              className="w-full p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 font-bold text-sm" 
              placeholder="관리자 ID" 
            />
            <input 
              required
              type="password" 
              value={formData.creatorPw}
              onChange={(e) => setFormData({...formData, creatorPw: e.target.value})}
              className="w-full p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 font-bold text-sm" 
              placeholder="비밀번호" 
            />
          </div>
        </div>

        <button type="submit" className="w-full py-5 bg-blue-600 text-white rounded-[1.5rem] font-black text-xl shadow-xl shadow-blue-100 hover:bg-blue-700 hover:-translate-y-1 active:translate-y-0 transition-all">
          투표 생성하기
        </button>
      </form>
    </div>
  );
};

export default CreatePoll;
