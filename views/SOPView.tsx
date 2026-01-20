
import React, { useState } from 'react';
import { Sparkles, Save, Layout, Quote } from 'lucide-react';
import { getSOPFeedback } from '../services/geminiService';

const SOPView: React.FC = () => {
  const [sop, setSop] = useState({
    school: '东京大学 大学院人文社会系研究科',
    content: '之所以选择贵校，是因为贵校在社会学领域拥有深厚的学术积淀。特别是XXX教授在孤独死研究方面的先行工作，对我产生了巨大的影响...'
  });
  const [aiFeedback, setAiFeedback] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleAiReview = async () => {
    setIsLoading(true);
    const feedback = await getSOPFeedback(sop.content, sop.school);
    setAiFeedback(feedback);
    setIsLoading(false);
  };

  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">志望理由书</h2>
          <p className="text-sm text-slate-500">讲述你的故事，连接你与理想学府</p>
        </div>
        <button className="flex items-center gap-2 bg-white border border-slate-200 px-4 py-2 rounded-xl text-sm font-semibold hover:bg-slate-50">
          <Save size={18} />
          存为模板
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b bg-slate-50 flex items-center gap-3">
              <Layout size={18} className="text-indigo-600" />
              <input 
                type="text" 
                value={sop.school}
                onChange={(e) => setSop({...sop, school: e.target.value})}
                className="w-full bg-transparent font-bold text-slate-800 outline-none"
                placeholder="志望校/研究科名称"
              />
            </div>
            <div className="p-6">
              <textarea 
                className="w-full h-[450px] resize-none outline-none text-slate-700 leading-relaxed font-serif"
                value={sop.content}
                onChange={(e) => setSop({...sop, content: e.target.value})}
                placeholder="在此撰写你的志望理由（推荐包含：报考动机、学习目标、未来职业规划等）"
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-indigo-600 rounded-2xl p-6 text-white shadow-xl">
            <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
              <Sparkles size={20} />
              AI 招生官诊断
            </h3>
            <p className="text-indigo-100 text-sm mb-4">
              我们会分析你的表达是否符合日本大学的“学术谦卑”与“目标导向”风格。
            </p>
            <button 
              onClick={handleAiReview}
              disabled={isLoading}
              className="w-full bg-white text-indigo-600 py-3 rounded-xl font-bold hover:bg-indigo-50 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isLoading ? <div className="animate-spin rounded-full h-5 w-5 border-2 border-indigo-600 border-t-transparent" /> : "立即诊断"}
            </button>
          </div>

          {aiFeedback ? (
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 max-h-[400px] overflow-y-auto">
              <h4 className="font-bold text-slate-800 mb-3 flex items-center gap-2">诊断结论</h4>
              <div className="text-sm text-slate-600 whitespace-pre-wrap leading-relaxed">
                {aiFeedback}
              </div>
            </div>
          ) : (
            <div className="bg-slate-50 border border-dashed border-slate-200 rounded-2xl p-6 text-center">
              <Quote className="mx-auto text-slate-200 mb-2" size={32} />
              <p className="text-slate-400 text-xs italic">“一个好的动机，是成功的一半。”</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SOPView;
