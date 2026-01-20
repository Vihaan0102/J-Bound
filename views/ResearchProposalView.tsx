
import React, { useState } from 'react';
import { Sparkles, Save, History, BrainCircuit } from 'lucide-react';
import { getProposalFeedback } from '../services/geminiService';

const ResearchProposalView: React.FC = () => {
  const [proposal, setProposal] = useState({
    title: '关于日本现代社会中“孤独死”现象的社会学考察',
    major: '社会学',
    content: '在本研究中，我打算探讨现代日本城市中孤独死发生的背景及其社会机制。通过文献回顾和实地调研，我将分析孤独死与地缘、血缘断裂之间的关联...'
  });
  const [aiFeedback, setAiFeedback] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleAiReview = async () => {
    setIsLoading(true);
    const feedback = await getProposalFeedback(proposal.content, proposal.major);
    setAiFeedback(feedback);
    setIsLoading(false);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">研究计划书</h2>
          <p className="text-sm text-slate-500">使用AI进行润色与逻辑分析，助力获得教授青睐</p>
        </div>
        <div className="flex gap-2">
          <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-lg transition-colors">
            <History size={20} />
          </button>
          <button className="bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-xl text-sm font-semibold hover:bg-slate-50 transition-colors flex items-center gap-2">
            <Save size={18} />
            保存草稿
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Editor Area */}
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b bg-slate-50">
              <input 
                type="text" 
                value={proposal.title}
                onChange={(e) => setProposal({...proposal, title: e.target.value})}
                className="w-full bg-transparent font-bold text-slate-800 outline-none placeholder-slate-300"
                placeholder="在此输入研究题目..."
              />
            </div>
            <div className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <span className="text-xs font-bold text-slate-400">研究领域:</span>
                <input 
                  type="text" 
                  value={proposal.major}
                  onChange={(e) => setProposal({...proposal, major: e.target.value})}
                  className="text-xs bg-indigo-50 text-indigo-700 px-2 py-1 rounded outline-none border border-indigo-100"
                />
              </div>
              <textarea 
                className="w-full h-[500px] resize-none outline-none text-slate-700 leading-relaxed"
                value={proposal.content}
                onChange={(e) => setProposal({...proposal, content: e.target.value})}
                placeholder="开始撰写你的研究计划..."
              />
            </div>
          </div>
        </div>

        {/* AI Sidebar */}
        <div className="space-y-4">
          <div className="bg-gradient-to-br from-indigo-600 to-violet-700 rounded-2xl p-6 text-white shadow-xl shadow-indigo-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-white/20 p-2 rounded-lg">
                <BrainCircuit size={24} />
              </div>
              <h3 className="font-bold text-lg">Gemini 导师</h3>
            </div>
            <p className="text-indigo-100 text-sm mb-6">
              我会从学术逻辑、先行研究覆盖、以及研究方法的可行性为您提供反馈。
            </p>
            <button 
              onClick={handleAiReview}
              disabled={isLoading}
              className="w-full bg-white text-indigo-600 py-3 rounded-xl font-bold hover:bg-indigo-50 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isLoading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-indigo-600 border-t-transparent" />
              ) : (
                <>
                  <Sparkles size={18} />
                  开始AI评审
                </>
              )}
            </button>
          </div>

          {aiFeedback ? (
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 max-h-[500px] overflow-y-auto custom-scrollbar">
              <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                <Sparkles size={16} className="text-amber-500" />
                反馈建议
              </h4>
              <div className="prose prose-slate prose-sm max-w-none">
                <p className="whitespace-pre-wrap text-slate-600 leading-relaxed">
                  {aiFeedback}
                </p>
              </div>
            </div>
          ) : (
            <div className="bg-slate-50 border border-dashed border-slate-200 rounded-2xl p-8 text-center">
              <p className="text-slate-400 text-sm">点击“开始AI评审”获取指导建议</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResearchProposalView;
