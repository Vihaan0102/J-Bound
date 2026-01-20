
import React, { useState } from 'react';
// Added 'X' to the imports from lucide-react
import { Mail, Plus, Send, MessageSquare, Clock, CheckCircle, ChevronDown, X } from 'lucide-react';
import { ProfessorContact } from '../types';
import { generateProfessorEmail } from '../services/geminiService';

const STATUS_MAP = {
  planned: { label: '准备中', color: 'bg-slate-100 text-slate-500' },
  sent: { label: '已发送', color: 'bg-blue-100 text-blue-600' },
  replied: { label: '已回信', color: 'bg-indigo-100 text-indigo-600' },
  interview: { label: '面试安排', color: 'bg-amber-100 text-amber-600' },
  accepted: { label: '内诺获准', color: 'bg-emerald-100 text-emerald-600' },
  rejected: { label: '婉拒', color: 'bg-rose-100 text-rose-600' },
};

const ProfessorContactView: React.FC = () => {
  const [contacts, setContacts] = useState<ProfessorContact[]>([
    { 
      id: '1', 
      professorName: '佐藤 一郎', 
      university: '东京大学', 
      status: 'replied', 
      lastActionDate: '2024-04-28',
      emailDraft: ''
    },
    { 
      id: '2', 
      professorName: '田中 雅子', 
      university: '庆应义塾大学', 
      status: 'sent', 
      lastActionDate: '2024-05-01',
      emailDraft: ''
    }
  ]);
  
  const [showDraftGen, setShowDraftGen] = useState(false);
  const [draftResult, setDraftResult] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    setIsGenerating(true);
    const result = await generateProfessorEmail(
      "我是XXX，国内211大四学生，JLPT N1，希望研究孤独死课题。",
      "佐藤教授，研究方向是社会福利与城市社会学。"
    );
    setDraftResult(result);
    setIsGenerating(false);
  };

  return (
    <div className="space-y-6 animate-in slide-in-from-right-4 duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">教授联络记录</h2>
          <p className="text-sm text-slate-500">有条不紊地管理你的“套磁”进度</p>
        </div>
        <button 
          onClick={() => setShowDraftGen(true)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-indigo-700 flex items-center gap-2"
        >
          <Mail size={18} />
          AI 生成套磁信
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {contacts.map(c => (
          <div key={c.id} className="bg-white border border-slate-100 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 border border-slate-100">
                  <span className="text-lg font-bold">{c.professorName[0]}</span>
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 text-lg">{c.professorName} 教授</h4>
                  <p className="text-sm text-slate-500">{c.university}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-6">
                <div className="text-right">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${STATUS_MAP[c.status].color}`}>
                    {STATUS_MAP[c.status].label}
                  </span>
                  <p className="text-[10px] text-slate-400 mt-1">最后更新: {c.lastActionDate}</p>
                </div>
                <button className="text-slate-300 hover:text-indigo-600">
                  <ChevronDown size={20} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Draft Generator Modal-like Section */}
      {showDraftGen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
          <div className="bg-white rounded-3xl w-full max-w-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-6 border-b flex justify-between items-center">
              <h3 className="font-bold text-lg text-slate-800 flex items-center gap-2">
                <Send size={18} className="text-indigo-600" />
                AI 套磁信助手
              </h3>
              <button onClick={() => setShowDraftGen(false)} className="text-slate-400 hover:text-slate-600">
                <X size={24} />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-400 block mb-1 uppercase">你的核心优势</label>
                  <textarea className="w-full bg-slate-50 border-none rounded-xl p-3 text-sm h-24 outline-none" placeholder="例如：N1 150分，发表过XX论文..." />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-400 block mb-1 uppercase">教授/实验室信息</label>
                  <textarea className="w-full bg-slate-50 border-none rounded-xl p-3 text-sm h-24 outline-none" placeholder="例如：佐藤教授，研究领域是..." />
                </div>
              </div>
              
              <button 
                onClick={handleGenerate}
                disabled={isGenerating}
                className="w-full bg-indigo-600 text-white py-3 rounded-xl font-bold hover:bg-indigo-700 transition-all flex items-center justify-center gap-2"
              >
                {isGenerating ? "正在撰写敬语..." : "生成草稿"}
              </button>

              {draftResult && (
                <div className="mt-4 bg-slate-50 p-4 rounded-xl border border-slate-100 max-h-[250px] overflow-y-auto">
                   <p className="text-sm text-slate-700 whitespace-pre-wrap font-serif leading-relaxed">
                     {draftResult}
                   </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfessorContactView;
