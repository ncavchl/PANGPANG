import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Link } from 'react-router-dom';

interface TestLog {
  id: number;
  message: string;
  created_at: string;
}

const DbTest: React.FC = () => {
  const [logs, setLogs] = useState<TestLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const { data, error } = await supabase
          .from('test_logs')
          .select('*');

        if (error) throw error;
        setLogs(data || []);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLogs();
  }, []);

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <Link to="/" className="text-blue-500 hover:underline mb-4 inline-block font-bold">← 홈으로</Link>
      <h1 className="text-3xl font-black mb-6">Supabase DB 연결 테스트</h1>

      {loading && <p className="text-gray-500 font-bold">데이터를 불러오는 중...</p>}
      {error && <p className="text-red-500 font-bold">에러 발생: {error}</p>}
      
      {!loading && !error && (
        <div className="space-y-4">
          <p className="text-green-600 font-bold">✅ DB 연결 성공! 테이블의 데이터 목록:</p>
          <ul className="bg-white rounded-2xl shadow-sm border border-gray-100 divide-y divide-gray-50 overflow-hidden">
            {logs.map(log => (
              <li key={log.id} className="p-4">
                <p className="font-bold text-gray-800">{log.message}</p>
                <p className="text-xs text-gray-400">{new Date(log.created_at).toLocaleString()}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DbTest;
