
import { GoogleGenAI, Type } from "@google/genai";

// Always use the named parameter and direct process.env.API_KEY access as required by the guidelines.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getProposalFeedback = async (content: string, major: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `你是一名资深的留考/考研顾问。请根据以下日本留学生提交的研究计划书内容进行评审，针对其在“先行研究”、“研究意义”、“研究方法”三个核心维度给出专业的中文点评和改进建议。
      
      专业领域: ${major}
      计划书内容: ${content}`,
      config: {
        thinkingConfig: { thinkingBudget: 0 }
      }
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "暂时无法获取AI反馈，请稍后再试。";
  }
};

export const getSOPFeedback = async (content: string, school: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `请作为一名日本名校招生官，审核这份“志望理由书”。
      目标学校: ${school}
      内容: ${content}
      请重点分析：
      1. 动机是否充分且符合该校特色？
      2. 个人背景是否能支撑学习计划？
      3. 日语表达是否得体（是否有中式日语）？`,
      config: { thinkingConfig: { thinkingBudget: 0 } }
    });
    return response.text;
  } catch (error) {
    return "AI 诊断暂时不可用。";
  }
};

export const generateProfessorEmail = async (studentInfo: string, profInfo: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `请帮我写一封发给日本大学教授的“套磁信”（联络邮件）。
      学生信息: ${studentInfo}
      教授信息/研究方向: ${profInfo}
      要求：使用标准敬语，语气诚恳，逻辑清晰，包含自我介绍、对教授研究的兴趣、希望能够报考其研究室的意愿。`,
      config: { thinkingConfig: { thinkingBudget: 0 } }
    });
    return response.text;
  } catch (error) {
    return "无法生成邮件草稿。";
  }
};

export const getSchoolSuggestions = async (profile: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `基于以下学生背景，推荐5所适合申请的日本大学。请包含学校名称、推荐理由和大概的申请难度。
      
      学生背景: ${profile}`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              schoolName: { type: Type.STRING },
              rank: { type: Type.STRING },
              major: { type: Type.STRING },
              difficulty: { type: Type.STRING },
              deadline: { type: Type.STRING },
              link: { type: Type.STRING }
            },
            required: ["schoolName", "rank", "major", "difficulty"]
          }
        }
      }
    });
    return JSON.parse(response.text || '[]');
  } catch (error) {
    console.error("Gemini Error:", error);
    return [];
  }
};
