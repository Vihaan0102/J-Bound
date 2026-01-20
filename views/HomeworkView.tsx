
import React, { useState } from 'react';
import { Upload, FileCheck, AlertCircle, Search } from 'lucide-react';
import { TaskStatus, Homework } from '../types';

const INITIAL_HOMEWORK: Homework[] = [
  { id: '1', title: '《日本留学试验》日语模拟卷一', dueDate: '2024-05-10', status: TaskStatus.PENDING },
  { id: '2', title: '小论文：日本老龄化社会的思考', dueDate: '2024-05-12', status: TaskStatus.PENDING },
  { id: '3', title: '托福单词背诵阶段检测 2', dueDate: '2024-05-01', status: TaskStatus.GRADED, grade: 'A', feedback: '逻辑清晰，用词准确。' },
  { id: '4', title: '志望理由书（草稿）', dueDate: '2024-04-20', status: TaskStatus.SUBMITTED },
];

const HomeworkView: React.FC = () => {
  const [filter, setFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const getStatusColor = (status: TaskStatus) => {
    switch (status) {
      case TaskStatus.PENDING: return 'bg-amber-100 text-amber-700';
      case TaskStatus.SUBMITTED: return 'bg-blue-100 text-blue-700';
      case TaskStatus.GRADED: return 'bg-emerald-100 text-emerald-700';
      case TaskStatus.LATE: return 'bg-rose-100 text-rose-700';
    }
  };

  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h2 className="text-2xl font-bold text-slate-800">作业与测评</h2>
        <div className="flex items-center gap-2 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="搜索作业名称..." 
              className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2">
        {['all', TaskStatus.PENDING, TaskStatus.SUBMITTED, TaskStatus.GRADED].map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`whitespace-nowrap px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === tab ? 'bg-indigo-600 text-white' : 'bg-white text-slate-600 border hover:border-indigo-300'
            }`}
          >
            {tab === 'all' ? '全部任务' : tab}
          </button>
        ))}
      </div>

      <div className="grid gap-4">
        {INITIAL_HOMEWORK
          .filter(h => filter === 'all' || h.status === filter)
          .filter(h => h.title.toLowerCase().includes(searchTerm.toLowerCase()))
          .map((hw) => (
          <div key={hw.id} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-xl ${hw.status === TaskStatus.PENDING ? 'bg-amber-50' : 'bg-slate-50'}`}>
                  {hw.status === TaskStatus.PENDING ? <AlertCircle className="text-amber-600" /> : <FileCheck className="text-slate-400" />}
                </div>
                <div>
                  <h4 className="font-bold text-slate-800">{hw.title}</h4>
                  <p className="text-sm text-slate-500 mt-1">截止日期: {hw.dueDate}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(hw.status)}`}>
                  {hw.status}
                </span>
                {hw.status === TaskStatus.PENDING && (
                  <label className="cursor-pointer bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl text-sm font-semibold transition-colors flex items-center gap-2">
                    <Upload size={16} />
                    <span>提交作业</span>
                    <input type="file" className="hidden" />
                  </label>
                )}
              </div>
            </div>
            {hw.feedback && (
              <div className="mt-4 pt-4 border-t bg-slate-50 p-4 rounded-xl">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">老师评语</p>
                <p className="text-sm text-slate-700 italic">“{hw.feedback}”</p>
                <div className="mt-2 text-lg font-bold text-emerald-600">得分: {hw.grade}</div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeworkView;
