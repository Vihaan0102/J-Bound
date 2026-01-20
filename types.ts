
export enum TaskStatus {
  PENDING = '待完成',
  SUBMITTED = '已提交',
  GRADED = '已批改',
  LATE = '逾期'
}

export interface Homework {
  id: string;
  title: string;
  dueDate: string;
  status: TaskStatus;
  feedback?: string;
  grade?: string;
}

export interface ResearchProposal {
  id: string;
  title: string;
  content: string;
  major: string;
  lastUpdated: string;
  aiFeedback?: string;
}

export interface StatementOfPurpose {
  schoolName: string;
  content: string;
  status: 'draft' | 'reviewing' | 'final';
}

export interface PastPaper {
  id: string;
  category: 'EJU' | 'JLPT' | '校内考';
  title: string;
  year: string;
  subject: string;
  downloadUrl: string;
}

export interface ProfessorContact {
  id: string;
  professorName: string;
  university: string;
  status: 'planned' | 'sent' | 'replied' | 'interview' | 'accepted' | 'rejected';
  lastActionDate: string;
  emailDraft: string;
}

export interface MonthlyPlan {
  month: string;
  goals: string[];
  achievements: string[];
  reflection: string;
  status: 'active' | 'completed';
}

export interface SchoolSuggestion {
  schoolName: string;
  rank: string;
  major: string;
  difficulty: 'S' | 'A' | 'B' | 'C';
  deadline: string;
  link: string;
}

export interface DocumentRecord {
  id: string;
  type: '成绩单' | '学位证' | '语言证书' | '考试成绩单' | '护照/签证' | '其他';
  fileName: string;
  uploadDate: string;
  url: string;
}

export interface StudentProfile {
  name: string;
  targetMajor: string;
  languageLevel: string;
  progress: number;
  email: string;
  phone: string;
  scores: {
    eju: { japanese: string; math: string; science: string; total: string };
    jlpt: { level: string; score: string };
    english: { type: 'TOEFL' | 'TOEIC'; score: string };
  };
}
