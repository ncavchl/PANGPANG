import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import PollDetail from "./pages/PollDetail";
import CreatePoll from "./pages/CreatePoll";
import Management from "./pages/Management";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
        <header className="bg-white border-b sticky top-0 z-10 shadow-sm">
          <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
            <Link to="/" className="text-2xl font-black text-blue-600 tracking-tighter hover:opacity-80 transition-opacity">
              PANGPANG 입니다
            </Link>
            <nav className="flex gap-6">
              <Link to="/" className="text-sm font-semibold text-gray-600 hover:text-blue-600 transition-colors">홈</Link>
              <Link to="/create" className="text-sm font-semibold text-gray-600 hover:text-blue-600 transition-colors">투표 만들기</Link>
            </nav>
          </div>
        </header>

        <main className="max-w-4xl mx-auto py-6 px-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/poll/:id" element={<PollDetail />} />
            <Route path="/create" element={<CreatePoll />} />
            <Route path="/poll/:id/manage" element={<Management />} />
          </Routes>
        </main>

        <footer className="border-t py-8 mt-12 bg-white">
          <div className="max-w-4xl mx-auto px-4 text-center text-gray-400 text-sm">
            © 2026 PANGPANG. All rights reserved.
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
