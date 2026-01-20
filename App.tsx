
import React, { useState } from 'react';
import { HashRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  BookOpen, 
  FileText, 
  Calendar, 
  School, 
  UserCircle,
  Menu,
  X,
  ChevronRight,
  Sparkles,
  Library,
  Mail,
  PenTool,
  BadgeCheck
} from 'lucide-react';
import Dashboard from './views/Dashboard';
import HomeworkView from './views/HomeworkView';
import ResearchProposalView from './views/ResearchProposalView';
import PlanningView from './views/PlanningView';
import SchoolSelectionView from './views/SchoolSelectionView';
import ProfileView from './views/ProfileView';
import SOPView from './views/SOPView';
import PastPapersView from './views/PastPapersView';
import ProfessorContactView from './views/ProfessorContactView';

const NavItem = ({ to, icon: Icon, label, active }: { to: string, icon: any, label: string, active: boolean }) => (
  <Link 
    to={to} 
    className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
      active 
        ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' 
        : 'text-slate-600 hover:bg-slate-100 hover:text-indigo-600'
    }`}
  >
    <Icon size={20} />
    <span className="font-medium">{label}</span>
  </Link>
);

const App: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <HashRouter>
      <div className="flex flex-col md:flex-row min-h-screen bg-slate-50">
        {/* Mobile Header */}
        <div className="md:hidden bg-white px-4 py-3 flex items-center justify-between border-b sticky top-0 z-50">
          <div className="flex items-center space-x-2">
            <div className="bg-indigo-600 p-1.5 rounded-lg">
              <Sparkles className="text-white" size={20} />
            </div>
            <span className="font-bold text-slate-800 text-lg">J-Bound</span>
          </div>
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-slate-600 p-1">
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Sidebar */}
        <aside className={`
          fixed inset-y-0 left-0 z-40 w-64 bg-white border-r transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
        `}>
          <div className="h-full flex flex-col p-6 overflow-y-auto custom-scrollbar">
            <div className="hidden md:flex items-center space-x-3 mb-10 px-2">
              <div className="bg-indigo-600 p-2 rounded-xl">
                <Sparkles className="text-white" size={24} />
              </div>
              <span className="font-bold text-slate-800 text-xl tracking-tight">J-Bound</span>
            </div>

            <nav className="flex-1 space-y-1">
              <NavigationLinks />
            </nav>

            <div className="mt-auto pt-6 border-t">
              <Link to="/profile" className="flex items-center space-x-3 px-2 hover:bg-slate-50 p-2 rounded-xl transition-colors">
                <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center overflow-hidden">
                  <img src="https://picsum.photos/seed/student/40/40" alt="Avatar" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-800">张同学</p>
                  <p className="text-xs text-slate-500">查看个人资料</p>
                </div>
              </Link>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-x-hidden">
          <div className="max-w-6xl mx-auto p-4 md:p-8">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/homework" element={<HomeworkView />} />
              <Route path="/research" element={<ResearchProposalView />} />
              <Route path="/sop" element={<SOPView />} />
              <Route path="/papers" element={<PastPapersView />} />
              <Route path="/contact" element={<ProfessorContactView />} />
              <Route path="/planning" element={<PlanningView />} />
              <Route path="/school" element={<SchoolSelectionView />} />
              <Route path="/profile" element={<ProfileView />} />
            </Routes>
          </div>
        </main>
      </div>
    </HashRouter>
  );
};

const NavigationLinks = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <NavItem to="/" icon={LayoutDashboard} label="首页概览" active={isActive('/')} />
      
      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-6 mb-2 px-4">学习管理</div>
      <NavItem to="/homework" icon={BookOpen} label="作业提交" active={isActive('/homework')} />
      <NavItem to="/papers" icon={Library} label="真题下载" active={isActive('/papers')} />
      
      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-6 mb-2 px-4">考研/升学</div>
      <NavItem to="/research" icon={FileText} label="研究计划书" active={isActive('/research')} />
      <NavItem to="/sop" icon={PenTool} label="志望理由书" active={isActive('/sop')} />
      <NavItem to="/contact" icon={Mail} label="教授联络" active={isActive('/contact')} />
      <NavItem to="/school" icon={School} label="选校建议" active={isActive('/school')} />
      
      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-6 mb-2 px-4">账号</div>
      <NavItem to="/planning" icon={Calendar} label="月度规划" active={isActive('/planning')} />
      <NavItem to="/profile" icon={UserCircle} label="个人中心" active={isActive('/profile')} />
    </>
  );
};

export default App;
