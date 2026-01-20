
import React, { useState } from 'react';
import { Search, Download, FileText, ChevronRight, Tags } from 'lucide-react';
import { PastPaper } from '../types';

const PAPERS: PastPaper[] = [
  { id: '1', category: 'EJU', title: '2023年第2回日本留学试验', year: '2023', subject: '日语', downloadUrl: '#' },
  { id: '2', category: 'EJU', title: '2023年第2回日本留学试验', year: '2023', subject: '综合科目', downloadUrl: '#' },
  { id: '3', category: '校内考', title: '早稻田大学 政治经济学部 2023年小论文', year: '2023', subject: '小论文', downloadUrl: '#' },
  { id: '4', category: 'JLPT', title: '2022年12月 JLPT N1 真题合集', year: '2022', subject: '日语全科', downloadUrl: '#' },
];

const PastPapersView: React.FC = () => {
  const [activeTab, setActiveTab] = useState('全部');

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">真题归档库</h2>
          <p className="text-sm text-slate-500">涵盖留考、语能考及名校校内考历年真题</p>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="搜年份、科目或学校..."
            className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 w-full md:w-64"
          />
        </div>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-2">
        {['全部', 'EJU', 'JLPT', '校内考'].map(t => (
          <button 
            key={t}
            onClick={() => setActiveTab(t)}
            className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
              activeTab === t ? 'bg-indigo-600 text-white shadow-lg' : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-100'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {PAPERS.filter(p => activeTab === '全部' || p.category === activeTab).map(paper => (
          <div key={paper.id} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between group hover:border-indigo-200 transition-all">
            <div className="flex items-center gap-4">
              <div className="bg-slate-50 p-3 rounded-xl group-hover:bg-indigo-50 transition-colors">
                <FileText className="text-slate-400 group-hover:text-indigo-600" size={24} />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                   <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-100 text-slate-500">{paper.category}</span>
                   <span className="text-xs text-slate-400">{paper.year}年</span>
                </div>
                <h4 className="font-bold text-slate-800">{paper.title}</h4>
                <p className="text-xs text-slate-500 mt-0.5">科目: {paper.subject}</p>
              </div>
            </div>
            <button className="p-3 bg-slate-50 text-slate-400 rounded-xl hover:bg-indigo-600 hover:text-white transition-all">
              <Download size={20} />
            </button>
          </div>
        ))}
      </div>

      <div className="bg-amber-50 rounded-2xl p-6 border border-amber-100">
        <div className="flex items-center gap-3 mb-2">
          <Tags className="text-amber-600" size={20} />
          <h4 className="font-bold text-amber-900">真题求助区</h4>
        </div>
        <p className="text-sm text-amber-700">没找到想要的题目？在此留言，我们会尽快补充特定学校的“过去问”。</p>
        <button className="mt-4 bg-white text-amber-800 px-4 py-2 rounded-xl text-sm font-bold shadow-sm hover:shadow-md transition-all">
          发布求助
        </button>
      </div>
    </div>
  );
};

export default PastPapersView;
