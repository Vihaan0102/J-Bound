
import React, { useState } from 'react';
import { 
  UserCircle, 
  Mail, 
  Phone, 
  MapPin, 
  GraduationCap, 
  Trophy, 
  FileText, 
  ShieldCheck, 
  Plus, 
  Download, 
  Trash2,
  CheckCircle2,
  Edit3,
  BadgeCheck
} from 'lucide-react';
import { StudentProfile, DocumentRecord } from '../types';

const INITIAL_PROFILE: StudentProfile = {
  name: "张小明",
  targetMajor: "社会学",
  languageLevel: "N1 (155/180)",
  progress: 85,
  email: "xiaoming.zhang@example.com",
  phone: "+86 138-xxxx-xxxx",
  scores: {
    eju: { japanese: "345", math: "165", science: "170", total: "680" },
    jlpt: { level: "N1", score: "155" },
    english: { type: 'TOEFL', score: "98" }
  }
};

const INITIAL_DOCS: DocumentRecord[] = [
  { id: '1', type: '成绩单', fileName: '本科四年成绩单_盖章扫描件.pdf', uploadDate: '2024-03-15', url: '#' },
  { id: '2', type: '学位证', fileName: '学士学位证书_中文版.jpg', uploadDate: '2024-03-15', url: '#' },
  { id: '3', type: '考试成绩单', fileName: 'EJU_2023_ScoreReport.pdf', uploadDate: '2024-04-01', url: '#' },
  { id: '4', type: '语言证书', fileName: 'JLPT_N1_Certificate.pdf', uploadDate: '2024-04-01', url: '#' },
];

const ProfileView: React.FC = () => {
  const [profile] = useState<StudentProfile>(INITIAL_PROFILE);
  const [docs] = useState<DocumentRecord[]>(INITIAL_DOCS);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-800">个人中心</h2>
        <button className="flex items-center gap-2 text-indigo-600 font-semibold text-sm hover:underline">
          <Edit3 size={16} />
          编辑资料
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Personal Info Card */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 text-center">
            <div className="relative inline-block mb-4">
              <div className="w-24 h-24 rounded-full bg-slate-200 mx-auto overflow-hidden border-4 border-white shadow-md">
                <img src="https://picsum.photos/seed/student/100/100" alt="Avatar" />
              </div>
              <div className="absolute bottom-0 right-0 bg-emerald-500 border-2 border-white w-5 h-5 rounded-full" />
            </div>
            <h3 className="text-xl font-bold text-slate-800">{profile.name}</h3>
            <p className="text-sm text-slate-500 mb-6">{profile.targetMajor} 进学中</p>
            
            <div className="space-y-4 text-left border-t pt-6">
              <div className="flex items-center gap-3 text-slate-600">
                <Mail size={18} className="text-slate-400" />
                <span className="text-sm">{profile.email}</span>
              </div>
              <div className="flex items-center gap-3 text-slate-600">
                <Phone size={18} className="text-slate-400" />
                <span className="text-sm">{profile.phone}</span>
              </div>
              <div className="flex items-center gap-3 text-slate-600">
                <MapPin size={18} className="text-slate-400" />
                <span className="text-sm">中国 · 上海 / 日本 · 东京</span>
              </div>
              <div className="flex items-center gap-3 text-slate-600">
                <GraduationCap size={18} className="text-slate-400" />
                <span className="text-sm">211院校 本科学士</span>
              </div>
            </div>
          </div>

          <div className="bg-indigo-600 rounded-3xl p-6 text-white shadow-xl shadow-indigo-100">
            <h4 className="font-bold mb-4 flex items-center gap-2">
              <Trophy size={20} />
              申校竞争力
            </h4>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs mb-1 text-indigo-100">
                  <span>材料完整度</span>
                  <span>{profile.progress}%</span>
                </div>
                <div className="w-full bg-indigo-900/30 h-2 rounded-full overflow-hidden">
                  <div className="bg-white h-full transition-all duration-1000" style={{ width: `${profile.progress}%` }} />
                </div>
              </div>
              <p className="text-xs text-indigo-100 leading-relaxed opacity-80">
                基于您的 EJU 和 N1 成绩，您申请“MARCH”以上院校的成功率为 82%。
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Scores and Documents */}
        <div className="lg:col-span-2 space-y-8">
          {/* Exam Scores Section */}
          <section>
            <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
              {/* Fix: Added missing BadgeCheck icon usage */}
              <BadgeCheck size={20} className="text-indigo-600" />
              标准化考试成绩
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* EJU */}
              <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">EJU 留考</p>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">日语</span>
                    <span className="font-bold text-slate-800">{profile.scores.eju.japanese}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">数学</span>
                    <span className="font-bold text-slate-800">{profile.scores.eju.math}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">综/理</span>
                    <span className="font-bold text-slate-800">{profile.scores.eju.science}</span>
                  </div>
                  <div className="pt-2 border-t flex justify-between">
                    <span className="text-xs font-bold text-indigo-600">总分</span>
                    <span className="text-lg font-black text-indigo-600">{profile.scores.eju.total}</span>
                  </div>
                </div>
              </div>

              {/* JLPT */}
              <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between">
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">JLPT 语能</p>
                  <div className="text-center py-2">
                    <span className="text-4xl font-black text-slate-800">{profile.scores.jlpt.level}</span>
                  </div>
                </div>
                <div className="pt-2 border-t flex justify-between">
                  <span className="text-xs font-bold text-indigo-600">得分</span>
                  <span className="text-lg font-black text-indigo-600">{profile.scores.jlpt.score}</span>
                </div>
              </div>

              {/* English */}
              <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between">
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">英语成绩</p>
                  <div className="text-center py-2">
                    <span className="text-4xl font-black text-slate-800">{profile.scores.english.type}</span>
                  </div>
                </div>
                <div className="pt-2 border-t flex justify-between">
                  <span className="text-xs font-bold text-indigo-600">分数</span>
                  <span className="text-lg font-black text-indigo-600">{profile.scores.english.score}</span>
                </div>
              </div>
            </div>
          </section>

          {/* Document Management Section */}
          <section>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                <FileText size={20} className="text-indigo-600" />
                证件管理柜
              </h3>
              <label className="cursor-pointer bg-white border border-slate-200 text-slate-600 px-3 py-1.5 rounded-xl text-xs font-bold hover:bg-slate-50 transition-all flex items-center gap-2">
                <Plus size={14} />
                上传新证件
                <input type="file" className="hidden" />
              </label>
            </div>

            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
              <div className="bg-slate-50 px-6 py-3 flex items-center gap-3 border-b">
                <ShieldCheck size={16} className="text-indigo-600" />
                <span className="text-xs font-bold text-slate-500">已启用 256 位加密存储，保障您的个人隐私。</span>
              </div>
              <div className="divide-y divide-slate-50">
                {docs.map((doc) => (
                  <div key={doc.id} className="px-6 py-4 flex items-center justify-between group hover:bg-slate-50/50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
                        <FileText size={20} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-indigo-100 text-indigo-700">{doc.type}</span>
                          <h5 className="text-sm font-bold text-slate-800 truncate max-w-[200px]">{doc.fileName}</h5>
                        </div>
                        <p className="text-[10px] text-slate-400 mt-1">上传日期: {doc.uploadDate}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-white rounded-lg transition-all shadow-none hover:shadow-sm">
                        <Download size={18} />
                      </button>
                      <button className="p-2 text-slate-400 hover:text-rose-500 hover:bg-white rounded-lg transition-all shadow-none hover:shadow-sm">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Checklist */}
          <section className="bg-slate-100 rounded-3xl p-6">
            <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2 text-sm">
              <CheckCircle2 size={18} className="text-emerald-500" />
              材料归档清单
            </h4>
            <div className="grid grid-cols-2 gap-3">
              {[
                { name: '护照首页扫描', status: true },
                { name: '毕业证明书', status: true },
                { name: '学位证明书', status: true },
                { name: '语言能力证明', status: true },
                { name: 'EJU 成绩单', status: true },
                { name: 'TOEFL 官方成绩', status: false },
                { name: '研究计划书(定稿)', status: false },
                { name: '经费支付保证书', status: false },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-xs">
                  <div className={`w-4 h-4 rounded-full flex items-center justify-center ${item.status ? 'bg-emerald-500 text-white' : 'bg-slate-300 text-white'}`}>
                    {item.status && <CheckCircle2 size={10} />}
                  </div>
                  <span className={item.status ? 'text-slate-700 font-medium' : 'text-slate-400'}>{item.name}</span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ProfileView;
