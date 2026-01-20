
import React, { useState } from 'react';
import { Calendar as CalendarIcon, Plus, CheckCircle2, ChevronRight, MessageSquare } from 'lucide-react';
import { MonthlyPlan } from '../types';

const INITIAL_PLANS: MonthlyPlan[] = [
  {
    month: '2024年4月',
    goals: ['完成志望理由书初稿', 'JLPT N1 真题练习 5套', '联系三位意向教授'],
    achievements: ['志望理由书已完成并送审', '真题平均分150+'],
    reflection: '本月进度超前，但听力部分仍有薄弱点，5月需加强。',
    status: 'completed'
  },
  {
    month: '2024年5月',
    goals: ['研究计划书定稿', '参加早稻田大学进学说明会', '开始EJU理科专项练习'],
    achievements: [],
    reflection: '',
    status: 'active'
  }
];

const PlanningView: React.FC = () => {
  const [plans] = useState<MonthlyPlan[]>(INITIAL_PLANS);

  return (
    <div className="space-y-6 animate-in slide-in-from-right-4 duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">月度规划与反馈</h2>
          <p className="text-sm text-slate-500">脚踏实地，记录每一个向目标迈进的脚步</p>
        </div>
        <button className="bg-indigo-600 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-indigo-700 transition-colors flex items-center gap-2">
          <Plus size={18} />
          新建月度计划
        </button>
      </div>

      <div className="space-y-6">
        {plans.sort((a, b) => b.month.localeCompare(a.month)).map((plan, idx) => (
          <div key={idx} className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden transition-all hover:border-indigo-200">
            <div className="flex items-center justify-between px-6 py-4 border-b bg-slate-50/50">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${plan.status === 'active' ? 'bg-indigo-100 text-indigo-600' : 'bg-slate-200 text-slate-500'}`}>
                  <CalendarIcon size={20} />
                </div>
                <h3 className="font-bold text-slate-800">{plan.month}</h3>
                {plan.status === 'active' && (
                  <span className="bg-indigo-100 text-indigo-700 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">执行中</span>
                )}
              </div>
              <button className="text-slate-400 hover:text-indigo-600">
                <ChevronRight size={20} />
              </button>
            </div>
            
            <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">月度目标</h4>
                <ul className="space-y-3">
                  {plan.goals.map((g, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-slate-600">
                      <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-2 flex-shrink-0" />
                      {g}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">本月达成</h4>
                <ul className="space-y-3">
                  {plan.achievements.length > 0 ? (
                    plan.achievements.map((a, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-emerald-600">
                        <CheckCircle2 size={16} className="mt-0.5 flex-shrink-0" />
                        {a}
                      </li>
                    ))
                  ) : (
                    <li className="text-sm text-slate-400 italic">尚未记录成就...</li>
                  )}
                </ul>
              </div>

              <div className="bg-slate-50 rounded-xl p-4">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                  <MessageSquare size={14} />
                  自我总结 / 教师建议
                </h4>
                <p className="text-sm text-slate-600 leading-relaxed italic">
                  {plan.reflection || "点击此处添加本月感想..."}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlanningView;
