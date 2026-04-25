import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { MOCK_POLLS } from '../mocks/data';

const Management: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const poll = MOCK_POLLS.find(p => p.id === id);

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginInfo, setLoginInfo] = useState({ id: '', pw: '' });
  const [editForm, setEditForm] = useState(poll ? {
    question: poll.question,
    optionA: poll.optionA,
    optionB: poll.optionB,
  } : { question: '', optionA: '', optionB: '' });

  if (!poll) return <div className="p-8 text-center font-bold">투표를 찾을 수 없습니다.</div>;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginInfo.id === poll.creatorId && loginInfo.pw === poll.creatorPw) {
      setIsAuthenticated(true);
    } else {
      alert('아이디 또는 비밀번호가 일치하지 않습니다.\n(힌트: ' + poll.creatorId + ' / ' + poll.creatorPw + ')');
    }
  };

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    alert('성공적으로 수정되었습니다! (Mock)');
    navigate(`/poll/${poll.id}`);
  };

  const handleDelete = () => {
    if (window.confirm('정말로 이 투표를 삭제하시겠습니까?')) {
      alert('삭제되었습니다! (Mock)');
      navigate('/');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="p-4 max-w-md mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-black mb-2">관리자 인증</h1>
          <p className="text-gray-400 font-medium text-sm">투표를 수정하거나 삭제하려면 인증이 필요합니다.</p>
        </div>
        <form onSubmit={handleLogin} className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-400 mb-1 ml-1">ID</label>
            <input 
              type="text" 
              value={loginInfo.id}
              onChange={(e) => setLoginInfo({...loginInfo, id: e.target.value})}
              className="w-full p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 font-bold" 
              placeholder="생성 시 입력한 ID"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-400 mb-1 ml-1">PASSWORD</label>
            <input 
              type="password" 
              value={loginInfo.pw}
              onChange={(e) => setLoginInfo({...loginInfo, pw: e.target.value})}
              className="w-full p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 font-bold" 
              placeholder="••••••"
              required
            />
          </div>
          <button type="submit" className="w-full py-4 bg-blue-600 text-white rounded-2xl font-black text-lg shadow-lg shadow-blue-100 hover:bg-blue-700 active:scale-[0.98] transition-all">
            인증 및 수정하기
          </button>
          <Link to={`/poll/${id}`} className="block text-center text-sm font-bold text-gray-400 hover:text-gray-600">취소</Link>
        </form>
      </div>
    );
  }

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-3xl font-black mb-8">투표 수정</h1>
      <form onSubmit={handleUpdate} className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 space-y-6">
        <div>
          <label className="block text-sm font-black text-gray-600 mb-2">질문 수정</label>
          <textarea 
            value={editForm.question}
            onChange={(e) => setEditForm({...editForm, question: e.target.value})}
            className="w-full p-4 bg-gray-50 border-none rounded-2xl h-32 focus:ring-2 focus:ring-blue-500 font-bold" 
            maxLength={300}
          />
        </div>
        <div className="space-y-4">
          <input 
            type="text" 
            value={editForm.optionA}
            onChange={(e) => setEditForm({...editForm, optionA: e.target.value})}
            className="w-full p-4 bg-blue-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 font-bold" 
            maxLength={50}
          />
          <input 
            type="text" 
            value={editForm.optionB}
            onChange={(e) => setEditForm({...editForm, optionB: e.target.value})}
            className="w-full p-4 bg-red-50 border-none rounded-2xl focus:ring-2 focus:ring-red-500 font-bold" 
            maxLength={50}
          />
        </div>
        
        <div className="flex gap-3 pt-4">
          <button 
            type="button"
            onClick={handleDelete}
            className="flex-1 py-4 bg-red-50 text-red-600 rounded-2xl font-black hover:bg-red-100 transition-colors"
          >
            삭제하기
          </button>
          <button 
            type="submit"
            className="flex-[2] py-4 bg-blue-600 text-white rounded-2xl font-black shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all"
          >
            저장하기
          </button>
        </div>
      </form>
    </div>
  );
};

export default Management;
