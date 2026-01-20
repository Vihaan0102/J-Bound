
import React, { useState } from 'react';
import { School, MapPin, Search, Star, ExternalLink, Sparkles } from 'lucide-react';
import { getSchoolSuggestions } from '../services/geminiService';
import { SchoolSuggestion } from '../types';

const SchoolSelectionView: React.FC = () => {
  const [schools, setSchools] = useState<SchoolSuggestion[]>([
    { schoolName: '东京大学', rank: 'A+', major: '社会学', difficulty: 'S', deadline: '2024-12-15', link: '#' },
    { schoolName: '京都大学', rank: 'A+', major: '社会学', difficulty: 'S', deadline: '2024-11-20', link: '#' },
    { schoolName: '早稻田大学', rank: 'A', major: '人间科学', difficulty: 'A', deadline: '2024-09-10', link: '#' },
  ]);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateSuggestions = async () => {
    setIsGenerating(true);
    const background = "JLPT N1 155分, EJU 日语 340分, 目标专业：社会学, 出身校：国内211大学";
    const newSchools = await getSchoolSuggestions(background);
    if (newSchools && newSchools.length > 0) {
      setSchools([...newSchools]);
    }
    setIsGenerating(false);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">选校建议库</h2>
          <p className="text-sm text-slate-500">根据你的当前成绩和目标专业，精准匹配理想学府</p>
        </div>
        <button 
          onClick={handleGenerateSuggestions}
          disabled={isGenerating}
          className="bg-indigo-600 text-white px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-indigo-700 transition-all flex items-center gap-2 shadow-lg shadow-indigo-200 disabled:opacity-70"
        >
          {isGenerating ? (
            <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
          ) : <Sparkles size={18} />}
          AI 智能择校
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {schools.map((school, idx) => (
          <div key={idx} className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all group">
            <div className="h-24 bg-slate-100 relative overflow-hidden">
               <img src={`https://picsum.photos/seed/${school.schoolName}/400/200`} alt="School" className="w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-500" />
               <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-2 py-1 rounded-lg flex items-center gap-1 shadow-sm">
                 <Star className="text-amber-400 fill-amber-400" size={12} />
                 <span className="text-[10px] font-bold text-slate-700">推荐指数 {idx === 0 ? '9.8' : '9.2'}</span>
               </div>
            </div>
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-bold text-lg text-slate-800">{school.schoolName}</h3>
                  <div className="flex items-center gap-1 text-slate-400 text-xs mt-1">
                    <MapPin size={12} />
                    <span>日本 · 关东地区</span>
                  </div>
                </div>
                <div className={`px-2 py-1 rounded text-xs font-bold ${
                  school.difficulty === 'S' ? 'bg-rose-100 text-rose-700' : 'bg-blue-100 text-blue-700'
                }`}>
                  难度 {school.difficulty}
                </div>
              </div>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">推荐专业</span>
                  <span className="font-medium text-slate-700">{school.major}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">SGU项目</span>
                  <span className="font-medium text-emerald-600">支持</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">出愿截止</span>
                  <span className="font-medium text-amber-600">{school.deadline}</span>
                </div>
              </div>

              <a 
                href={school.link} 
                className="block w-full text-center py-2.5 rounded-xl border border-slate-200 text-slate-600 font-semibold text-sm hover:bg-slate-50 transition-colors flex items-center justify-center gap-2"
              >
                查看招生简章
                <ExternalLink size={14} />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SchoolSelectionView;
