
import React from 'react';
import { 
  TrendingUp, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  ArrowUpRight
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts';

const data = [
  { name: '1月', progress: 65 },
  { name: '2月', progress: 78 },
  { name: '3月', progress: 82 },
  { name: '4月', progress: 90 },
];

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">早安，张同学! 🇯🇵</h1>
          <p className="text-slate-500 mt-1">你的升学进度已经领先了 85% 的同期学员。</p>
        </div>
        <div className="flex gap-2">
          <span className="bg-indigo-50 text-indigo-700 text-xs font-semibold px-3 py-1 rounded-full border border-indigo-100">
            距离EJU考: 45天
          </span>
          <span className="bg-emerald-50 text-emerald-700 text-xs font-semibold px-3 py-1 rounded-full border border-emerald-100">
            JLPT N1 已达成
          </span>
        </div>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: '待交作业', value: '3', icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50' },
          { label: '计划书进度', value: '85%', icon: TrendingUp, color: 'text-indigo-600', bg: 'bg-indigo-50' },
          { label: '月报反馈', value: '4份', icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: '过期提醒', value: '0', icon: AlertCircle, color: 'text-rose-600', bg: 'bg-rose-50' },
        ].map((stat, idx) => (
          <div key={idx} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <div className={`${stat.bg} ${stat.color} p-2.5 rounded-xl`}>
                <stat.icon size={20} />
              </div>
              <ArrowUpRight className="text-slate-300" size={16} />
            </div>
            <p className="text-slate-500 text-sm font-medium">{stat.label}</p>
            <p className="text-2xl font-bold text-slate-800 mt-1">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-slate-800">学习进度走势</h3>
            <select className="text-sm border-none bg-slate-50 rounded-lg px-2 py-1 outline-none font-medium">
              <option>最近四个月</option>
              <option>年度计划</option>
            </select>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#94a3b8', fontSize: 12 }} 
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#94a3b8', fontSize: 12 }} 
                />
                <Tooltip 
                  cursor={{ fill: '#f8fafc' }}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                />
                <Bar dataKey="progress" radius={[4, 4, 0, 0]} barSize={40}>
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === data.length - 1 ? '#4f46e5' : '#e2e8f0'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Task List */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <h3 className="font-bold text-slate-800 mb-6">近期任务</h3>
          <div className="space-y-4">
            {[
              { task: '提交志望理由书初稿', time: '明天 18:00', type: 'urgent' },
              { task: 'JLPT N1 听力练习 Set 4', time: '周五', type: 'normal' },
              { task: '更新本月学习计划', time: '4月30日', type: 'normal' },
              { task: '扫描上传学位证原件', time: '尽快', type: 'urgent' },
            ].map((item, idx) => (
              <div key={idx} className="flex items-start gap-3 group cursor-pointer">
                <div className={`mt-1.5 w-2 h-2 rounded-full flex-shrink-0 ${item.type === 'urgent' ? 'bg-rose-500' : 'bg-slate-300'}`} />
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-700 group-hover:text-indigo-600 transition-colors">{item.task}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-6 py-2 text-sm font-semibold text-indigo-600 bg-indigo-50 rounded-xl hover:bg-indigo-100 transition-colors">
            查看全部任务
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
