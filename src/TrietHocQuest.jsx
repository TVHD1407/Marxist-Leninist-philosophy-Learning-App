import React, { useState, useEffect } from 'react';

// ==========================================
// KNOWLEDGE BASE (Trích xuất từ Tài liệu đính kèm)
// ==========================================
const CORE_QUESTIONS = [
  // Chương 1
  {
    id: 1, chapter: 1, level: 1,
    question: "Theo triết học Mác - Lênin, triết học được định nghĩa là gì?",
    options: [
      "Khoa học của mọi khoa học, nghiên cứu về vạn vật.",
      "Hệ thống quan điểm lý luận chung nhất về thế giới và vị trí của con người trong thế giới đó.",
      "Môn khoa học nghiên cứu về quy luật kinh tế của xã hội loài người.",
      "Khoa học nghiên cứu về sự tiến hóa của tự nhiên."
    ],
    correct: 1,
    explanation: "Triết học là hệ thống quan điểm lý luận chung nhất về thế giới, vị trí của con người trong thế giới đó; là khoa học về những quy luật vận động phát triển chung nhất của tự nhiên, xã hội và tư duy[cite: 2]."
  },
  {
    id: 2, chapter: 1, level: 1,
    question: "Vấn đề cơ bản của triết học là gì?",
    options: [
      "Mối quan hệ giữa tư duy và tồn tại (vật chất và ý thức).",
      "Mối quan hệ giữa con người và tự nhiên.",
      "Mối quan hệ giữa lý luận và thực tiễn.",
      "Mối quan hệ giữa giai cấp thống trị và bị trị."
    ],
    correct: 0,
    explanation: "Vấn đề cơ bản của triết học là mối quan hệ giữa vật chất và ý thức (hay giữa tồn tại và tư duy)[cite: 2]."
  },
  {
    id: 3, chapter: 1, level: 2,
    question: "Trong mối quan hệ biện chứng giữa vật chất và ý thức, khẳng định nào sau đây là đúng?",
    options: [
      "Ý thức quyết định vật chất và vật chất tồn tại độc lập.",
      "Vật chất và ý thức tồn tại song song, không tác động qua lại.",
      "Vật chất đóng vai trò quyết định đối với ý thức, nhưng ý thức có tác động trở lại vật chất thông qua hoạt động thực tiễn.",
      "Ý thức sinh ra vật chất thông qua tư duy của con người."
    ],
    correct: 2,
    explanation: "Vật chất đóng vai trò quyết định đối với ý thức, nhưng ý thức tác động trở lại vật chất phải thông qua hoạt động thực tiễn của con người[cite: 3]."
  },
  {
    id: 4, chapter: 1, level: 3,
    question: "Từ việc tìm hiểu mối quan hệ biện chứng giữa vật chất và ý thức, ý nghĩa phương pháp luận (nguyên tắc khách quan) rút ra đòi hỏi con người phải làm gì trong thực tiễn?",
    options: [
      "Xuất phát từ ý muốn chủ quan để cải tạo thế giới.",
      "Phủ nhận hoàn toàn vai trò của ý thức con người.",
      "Chỉ cần tôn trọng thực tế khách quan là đủ để thành công.",
      "Xuất phát từ thực tế khách quan, tôn trọng quy luật khách quan, đồng thời phát huy tính năng động chủ quan."
    ],
    correct: 3,
    explanation: "Nguyên tắc khách quan nhấn mạnh: hoạt động nhận thức và thực tiễn phải xuất phát từ thực tế khách quan, tôn trọng quy luật khách quan kết hợp với việc phát huy tính năng động chủ quan[cite: 3]."
  },
  // Chương 2
  {
    id: 5, chapter: 2, level: 1,
    question: "Theo định nghĩa của Ph. Ăngghen, phép biện chứng là khoa học nghiên cứu về vấn đề gì?",
    options: [
      "Nghiên cứu về cấu trúc nguyên tử của vật chất.",
      "Nghiên cứu những quy luật phổ biến của sự vận động và sự phát triển của tự nhiên, của xã hội loài người và của tư duy.",
      "Nghiên cứu về các hình thái kinh tế - xã hội trong lịch sử.",
      "Nghiên cứu về quá trình hình thành ý thức con người."
    ],
    correct: 1,
    explanation: "Trong tác phẩm Chống Đuyrinh, Ph. Ăngghen định nghĩa: 'phép biện chứng chẳng qua chỉ là môn khoa học về những quy luật phổ biến của sự vận động và sự phát triển của tự nhiên, của xã hội loài người và của tư duy'[cite: 3]."
  },
  {
    id: 6, chapter: 2, level: 1,
    question: "Đối tượng nghiên cứu của phép biện chứng duy vật là gì?",
    options: [
      "Sự tiến hóa của các sinh vật trên Trái Đất.",
      "Trạng thái tồn tại có tính quy luật phổ biến nhất của sự vật, hiện tượng trong thế giới.",
      "Lịch sử phát triển của các nền văn minh nhân loại.",
      "Cấu trúc và chức năng của bộ não người."
    ],
    correct: 1,
    explanation: "Đối tượng nghiên cứu của phép biện chứng duy vật là trạng thái tồn tại có tính quy luật phổ biến nhất của sự vật, hiện tượng trong thế giới[cite: 4]."
  },
  {
    id: 7, chapter: 2, level: 2,
    question: "Nội dung của phép biện chứng duy vật bao gồm những gì?",
    options: [
      "Một nguyên lý, ba cặp phạm trù và hai quy luật cơ bản.",
      "Hai nguyên lý, sáu cặp phạm trù và ba quy luật cơ bản.",
      "Ba nguyên lý, năm cặp phạm trù và bốn quy luật cơ bản.",
      "Hai nguyên lý, bốn cặp phạm trù và ba quy luật cơ bản."
    ],
    correct: 1,
    explanation: "Phép biện chứng duy vật đã đưa ra nội dung gồm hai nguyên lý, sáu cặp phạm trù và ba quy luật cơ bản[cite: 4]."
  },
  {
    id: 8, chapter: 2, level: 2,
    question: "Chân lý không có tính chất nào sau đây?",
    options: [
      "Tính cụ thể.",
      "Tính tuyệt đối.",
      "Tính trừu tượng, chung chung.",
      "Tính tương đối."
    ],
    correct: 2,
    explanation: "Không có chân lý trừu tượng, chung chung, chân lý luôn là cụ thể[cite: 4]."
  },
  {
    id: 9, chapter: 2, level: 3,
    question: "Vì sao nhận thức sự vật phải gắn với điều kiện, hoàn cảnh cụ thể?",
    options: [
      "Vì chân lý là trừu tượng, không thể nắm bắt được bằng thực tiễn.",
      "Vì chân lý luôn cụ thể, nó phản ánh sự vật trong một điều kiện cụ thể với không gian và thời gian xác định.",
      "Vì sự vật không bao giờ vận động, phát triển.",
      "Vì con người không thể có nhận thức tuyệt đối."
    ],
    correct: 1,
    explanation: "Chân lý luôn cụ thể, phản ánh sự vật trong một điều kiện cụ thể với hoàn cảnh lịch sử cụ thể trong một không gian và thời gian xác định[cite: 4]."
  },
  // Chương 3
  {
    id: 10, chapter: 3, level: 1,
    question: "Nội dung nào sau đây KHÔNG thuộc đối tượng nghiên cứu của chương Chủ nghĩa duy vật lịch sử?",
    options: [
      "Học thuyết hình thái kinh tế - xã hội.",
      "Giai cấp và đấu tranh giai cấp.",
      "Hai nguyên lý cơ bản của phép biện chứng.",
      "Nhà nước và cách mạng xã hội."
    ],
    correct: 2,
    explanation: "Hai nguyên lý cơ bản thuộc Chương 2 (Phép biện chứng duy vật). Chương 3 tập trung vào Chủ nghĩa duy vật lịch sử: học thuyết hình thái KT-XH, giai cấp, nhà nước, cách mạng xã hội[cite: 4]."
  },
  {
    id: 11, chapter: 3, level: 2,
    question: "Mục tiêu trang bị kiến thức của Chương 3 (Chủ nghĩa duy vật lịch sử) giúp sinh viên nắm được quan điểm của triết học Mác - Lênin về vấn đề gì?",
    options: [
      "Về vật chất, ý thức và quy luật tự nhiên.",
      "Về dân tộc, quan hệ giai cấp - dân tộc - nhân loại.",
      "Về các cặp phạm trù cơ bản.",
      "Về các quy luật của tư duy logic."
    ],
    correct: 1,
    explanation: "Chương 3 giúp sinh viên nắm được quan điểm cơ bản của triết học Mác - Lênin về giai cấp, nhà nước, cách mạng xã hội, về dân tộc, quan hệ giai cấp - dân tộc - nhân loại[cite: 4]."
  }
];

// ==========================================
// ICONS & MASCOT (SVG Inline)
// ==========================================
const IconHome = () => <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>;
const IconLock = () => <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>;
const IconCheck = () => <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>;
const IconX = () => <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>;
const IconStar = () => <svg viewBox="0 0 24 24" width="24" height="24" fill="#FFD700" stroke="#B8860B" strokeWidth="1"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>;

// Mascot Đảng Cộng Sản dễ thương (Ngôi sao đỏ bo góc có búa liềm vàng)
const Mascot = ({ size = 100 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    role="img"
    aria-label="Biểu tượng búa liềm"
  >
    <rect
      x="5"
      y="5"
      width="90"
      height="90"
      rx="28"
      fill="#D92D27"
    />

    <text
      x="50"
      y="70"
      textAnchor="middle"
      fontSize="60"
      fontFamily="Arial Unicode MS, Segoe UI Symbol, sans-serif"
      fontWeight="700"
      fill="#FFD84D"
    >
      ☭
    </text>
  </svg>
);
// ==========================================
// GAME LOGIC & HELPERS
// ==========================================
const TARGETS = [
  { id: 'Pass', label: 'Qua môn (Pass)', l1: 0.7, l2: 0.2, l3: 0.1 },
  { id: 'C', label: 'Khá (C/C+)', l1: 0.5, l2: 0.3, l3: 0.2 },
  { id: 'B', label: 'Giỏi (B/B+)', l1: 0.3, l2: 0.4, l3: 0.3 },
  { id: 'A', label: 'Xuất sắc (A/A+)', l1: 0.1, l2: 0.4, l3: 0.5 },
];

const generateDayQuestions = (dayIndex, targetDist) => {
  // Map Day 1-20 -> Ch 1; 21-40 -> Ch 2; 41-60 -> Ch 3
  const chapter = dayIndex < 20 ? 1 : dayIndex < 40 ? 2 : 3;
  const chapterQuestions = CORE_QUESTIONS.filter(q => q.chapter === chapter);
  
  const questions = [];
  // Phân bổ đúng 60 câu/ngày dựa trên thuật toán sinh (lặp các core Qs để đủ số lượng)
  for (let i = 0; i < 60; i++) {
    const rand = Math.random();
    let levelTarget = 1;
    if (rand > targetDist.l1 && rand <= (targetDist.l1 + targetDist.l2)) levelTarget = 2;
    if (rand > (targetDist.l1 + targetDist.l2)) levelTarget = 3;

    let pool = chapterQuestions.filter(q => q.level === levelTarget);
    if (pool.length === 0) pool = chapterQuestions; // Fallback
    
    const selected = pool[Math.floor(Math.random() * pool.length)];
    // Deep clone to allow isolated tracking
    questions.push({ ...selected, uniqId: `d${dayIndex}_q${i}` });
  }
  return questions;
};

// ==========================================
// MAIN COMPONENT
// ==========================================
export default function MLLearningApp() {
  const [screen, setScreen] = useState('ONBOARDING');
  const [target, setTarget] = useState(null);
  const [roadmap, setRoadmap] = useState([]);
  
  // Player Stats
  const [xp, setXp] = useState(0);
  const [streak, setStreak] = useState(0);
  const [wrongNotebook, setWrongNotebook] = useState([]);

  // Active Quiz State
  const [activeDayIndex, setActiveDayIndex] = useState(0);
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [isRetryingWrong, setIsRetryingWrong] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [dayStats, setDayStats] = useState({ correct: 0, wrong: 0, startTime: null, timeTaken: 0 });

  // Hoàn thành Onboarding
  const handleStartRoadmap = (selectedTarget) => {
    setTarget(selectedTarget);
    // Sinh lộ trình 60 ngày
    const newRoadmap = Array.from({ length: 60 }).map((_, i) => ({
      day: i + 1,
      chapter: i < 20 ? 1 : i < 40 ? 2 : 3,
      status: i === 0 ? 'UNLOCKED' : 'LOCKED',
      questions: generateDayQuestions(i, selectedTarget)
    }));
    setRoadmap(newRoadmap);
    setScreen('ROADMAP');
  };

  // Navigations
  const goHome = (withConfirm = false) => {
    if (withConfirm && !window.confirm("Tiến độ quiz hiện tại sẽ không được lưu. Bạn có chắc muốn thoát?")) return;
    setScreen('ROADMAP');
  };

  const startDay = (dayIndex) => {
    setActiveDayIndex(dayIndex);
    setScreen('DAY_SUMMARY');
  };

  const startQuiz = (isRetry = false) => {
    setIsRetryingWrong(isRetry);
    if (isRetry) {
      setQuizQuestions([...wrongNotebook]);
    } else {
      setQuizQuestions(roadmap[activeDayIndex].questions);
    }
    setCurrentQIndex(0);
    setDayStats({ correct: 0, wrong: 0, startTime: Date.now(), timeTaken: 0 });
    setShowFeedback(false);
    setSelectedOption(null);
    setScreen('QUIZ');
  };

  // Xử lý trả lời
  const handleAnswer = (optIndex) => {
    if (showFeedback) return;
    setSelectedOption(optIndex);
    setShowFeedback(true);
    
    const currentQ = quizQuestions[currentQIndex];
    const isCorrect = optIndex === currentQ.correct;

    if (isCorrect) {
      setXp(prev => prev + (isRetryingWrong ? 5 : 10));
      setDayStats(prev => ({ ...prev, correct: prev.correct + 1 }));
      if (isRetryingWrong) {
        // Gỡ khỏi sổ tay
        setWrongNotebook(prev => prev.filter(q => q.uniqId !== currentQ.uniqId));
      }
    } else {
      setDayStats(prev => ({ ...prev, wrong: prev.wrong + 1 }));
      if (!isRetryingWrong && !wrongNotebook.some(q => q.uniqId === currentQ.uniqId)) {
        setWrongNotebook(prev => [...prev, currentQ]);
      }
    }
  };

  const nextQuestion = () => {
    if (currentQIndex + 1 < quizQuestions.length) {
      setCurrentQIndex(prev => prev + 1);
      setShowFeedback(false);
      setSelectedOption(null);
    } else {
      // Kết thúc Quest
      setDayStats(prev => ({ ...prev, timeTaken: Math.floor((Date.now() - prev.startTime) / 1000) }));
      if (!isRetryingWrong) {
        setXp(prev => prev + 50); // Bonus hoàn thành
        setStreak(prev => prev + 1);
        
        // Mở khóa ngày tiếp theo
        const nextRoadmap = [...roadmap];
        nextRoadmap[activeDayIndex].status = 'COMPLETED';
        if (activeDayIndex + 1 < 60) nextRoadmap[activeDayIndex + 1].status = 'UNLOCKED';
        setRoadmap(nextRoadmap);
      }
      setScreen('DAY_END');
    }
  };

  // UI Components
  const TopBar = ({ inQuiz = false }) => (
    <div className="flex items-center justify-between p-4 bg-white shadow-sm rounded-b-2xl mb-6">
      <button onClick={() => goHome(inQuiz)} className="p-2 rounded-full bg-purple-100 hover:bg-purple-200 text-purple-700 transition">
        <IconHome />
      </button>
      <div className="flex gap-4 font-bold text-purple-900">
        <div className="flex items-center gap-1"><IconStar /> {xp} XP</div>
        <div className="flex items-center gap-1 text-orange-500">🔥 {streak} Streak</div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-purple-50 text-purple-900 font-sans p-4 md:p-8 flex justify-center">
      <div className="w-full max-w-md md:max-w-3xl bg-white/50 backdrop-blur-xl rounded-3xl shadow-xl overflow-hidden relative border border-purple-100">
        
        {/* SCREEN: ONBOARDING */}
        {screen === 'ONBOARDING' && (
          <div className="p-8 flex flex-col items-center justify-center min-h-[80vh] text-center space-y-6 animate-fade-in">
            <Mascot size={120} />
            <h1 className="text-3xl font-extrabold text-purple-800">Chinh Phục Triết Học</h1>
            <p className="text-gray-600">60 Ngày - 3 Chương - Hoàn thành mục tiêu của bạn!</p>
            <div className="w-full space-y-3 mt-6">
              <h3 className="font-bold text-lg mb-2">Bạn muốn đạt mục tiêu điểm nào?</h3>
              {TARGETS.map(t => (
                <button 
                  key={t.id} 
                  onClick={() => handleStartRoadmap(t)}
                  className="w-full p-4 rounded-xl border-2 border-purple-200 hover:border-purple-500 hover:bg-purple-50 transition font-semibold flex justify-between items-center"
                >
                  <span>{t.label}</span>
                  <span className="text-sm font-normal text-purple-600">~60 phút/ngày</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* SCREEN: ROADMAP */}
        {screen === 'ROADMAP' && (
          <div className="min-h-[80vh] flex flex-col animate-fade-in">
            <TopBar />
            <div className="px-6 flex-1">
              <div className="flex justify-between items-end mb-4">
                <div>
                  <h2 className="text-2xl font-black text-purple-800">Bản đồ lộ trình</h2>
                  <p className="text-sm text-gray-500">Mục tiêu: {target.label}</p>
                </div>
                {wrongNotebook.length > 0 && (
                  <button onClick={() => startQuiz(true)} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full font-bold shadow-md shadow-red-200 transition transform hover:scale-105">
                    Luyện câu sai ({wrongNotebook.length})
                  </button>
                )}
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-purple-100 rounded-full h-3 mb-8">
                <div 
                  className="bg-purple-600 h-3 rounded-full transition-all duration-1000"
                  style={{ width: `${(roadmap.filter(d => d.status === 'COMPLETED').length / 60) * 100}%` }}
                ></div>
              </div>

              {/* Roadmap Grid */}
              <div className="grid grid-cols-4 md:grid-cols-6 gap-3 pb-8">
                {roadmap.map((day, idx) => (
                  <button
                    key={idx}
                    disabled={day.status === 'LOCKED'}
                    onClick={() => startDay(idx)}
                    className={`aspect-square rounded-2xl flex flex-col items-center justify-center font-bold text-lg transition-all ${
                      day.status === 'COMPLETED' ? 'bg-green-100 text-green-700 border-2 border-green-300' :
                      day.status === 'UNLOCKED' ? 'bg-purple-600 text-white shadow-lg shadow-purple-300 transform hover:scale-105' :
                      'bg-gray-100 text-gray-400 border-2 border-gray-200 cursor-not-allowed opacity-60'
                    }`}
                  >
                    <span className="text-xs opacity-80">DAY</span>
                    <span>{day.day}</span>
                    {day.status === 'LOCKED' && <div className="mt-1 opacity-50"><IconLock /></div>}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* SCREEN: DAY SUMMARY */}
        {screen === 'DAY_SUMMARY' && (
          <div className="min-h-[80vh] flex flex-col animate-fade-in">
            <TopBar />
            <div className="p-8 flex-1 flex flex-col justify-center items-center text-center">
              <div className="bg-purple-100 w-24 h-24 rounded-full flex items-center justify-center mb-6 shadow-inner">
                <span className="text-4xl font-black text-purple-700">{activeDayIndex + 1}</span>
              </div>
              <h2 className="text-3xl font-black text-purple-800 mb-2">Nhiệm Vụ Ngày {activeDayIndex + 1}</h2>
              <p className="font-semibold text-purple-600 mb-6">Chương {roadmap[activeDayIndex].chapter}</p>
              
              <div className="bg-white p-6 rounded-2xl border-2 border-purple-100 shadow-sm text-left w-full mb-8">
                <h3 className="font-bold text-lg mb-3">Nội dung trọng tâm:</h3>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  {roadmap[activeDayIndex].chapter === 1 && <li>Khái luận triết học, vấn đề cơ bản.</li>}
                  {roadmap[activeDayIndex].chapter === 2 && <li>Phép biện chứng duy vật, nguyên lý, quy luật.</li>}
                  {roadmap[activeDayIndex].chapter === 3 && <li>Chủ nghĩa duy vật lịch sử, hình thái KT-XH.</li>}
                  <li>60 câu hỏi luyện tập (Mức độ {target.label})</li>
                </ul>
              </div>

              <button 
                onClick={() => startQuiz(false)}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white text-xl font-bold py-4 rounded-2xl shadow-xl shadow-purple-200 transition transform hover:-translate-y-1"
              >
                Bắt Đầu Ngay!
              </button>
            </div>
          </div>
        )}

        {/* SCREEN: QUIZ */}
        {screen === 'QUIZ' && (
          <div className="min-h-[80vh] flex flex-col animate-fade-in bg-gray-50/50">
            <TopBar inQuiz={true} />
            <div className="px-4 md:px-8 flex-1 flex flex-col pb-8">
              {/* Progress */}
              <div className="flex items-center justify-between text-sm font-bold text-purple-400 mb-2">
                <span>Câu {currentQIndex + 1} / {quizQuestions.length}</span>
                <span>Chương {quizQuestions[currentQIndex]?.chapter}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
                <div 
                  className="bg-purple-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((currentQIndex + 1) / quizQuestions.length) * 100}%` }}
                ></div>
              </div>

              {/* Question */}
              <div className="bg-white p-6 rounded-3xl shadow-sm border border-purple-100 mb-6 flex-1">
                <span className="inline-block bg-purple-100 text-purple-700 text-xs font-black px-3 py-1 rounded-full mb-4">
                  {quizQuestions[currentQIndex]?.level === 1 ? 'NHẬN BIẾT' : quizQuestions[currentQIndex]?.level === 2 ? 'HIỂU' : 'VẬN DỤNG'}
                </span>
                <h3 className="text-xl md:text-2xl font-bold leading-relaxed">
                  {quizQuestions[currentQIndex]?.question}
                </h3>
              </div>

              {/* Options */}
              <div className="space-y-3">
                {quizQuestions[currentQIndex]?.options.map((opt, idx) => {
                  let btnClass = "w-full text-left p-4 rounded-2xl border-2 font-medium transition-all ";
                  if (!showFeedback) {
                    btnClass += "border-purple-100 bg-white hover:border-purple-400 hover:bg-purple-50";
                  } else {
                    if (idx === quizQuestions[currentQIndex].correct) {
                      btnClass += "border-green-500 bg-green-50 text-green-800";
                    } else if (idx === selectedOption) {
                      btnClass += "border-red-500 bg-red-50 text-red-800";
                    } else {
                      btnClass += "border-gray-200 bg-gray-50 opacity-50";
                    }
                  }
                  
                  return (
                    <button 
                      key={idx} 
                      disabled={showFeedback}
                      onClick={() => handleAnswer(idx)}
                      className={btnClass}
                    >
                      <div className="flex items-start gap-3">
                        <span className="w-6 h-6 rounded-full bg-white border border-current flex items-center justify-center shrink-0 mt-0.5 text-sm">
                          {['A','B','C','D'][idx]}
                        </span>
                        <span>{opt}</span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Feedback Popup */}
              {showFeedback && (
                <div className="mt-6 p-5 rounded-2xl bg-white border border-purple-100 shadow-xl animate-fade-in-up">
                  <div className={`flex items-center gap-2 font-black text-xl mb-2 ${selectedOption === quizQuestions[currentQIndex].correct ? 'text-green-600' : 'text-red-500'}`}>
                    {selectedOption === quizQuestions[currentQIndex].correct ? <><IconCheck/> Chính xác! +{isRetryingWrong ? 5 : 10} XP</> : <><IconX/> Rất tiếc, sai rồi!</>}
                  </div>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    {quizQuestions[currentQIndex]?.explanation}
                  </p>
                  <button onClick={nextQuestion} className="w-full py-3 bg-purple-600 text-white rounded-xl font-bold shadow-md hover:bg-purple-700 transition">
                    Tiếp tục
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* SCREEN: DAY END */}
        {screen === 'DAY_END' && (
          <div className="min-h-[80vh] p-8 flex flex-col items-center justify-center text-center animate-fade-in">
            <Mascot size={100} />
            <h1 className="text-4xl font-black text-purple-800 mt-4 mb-2">QUEST COMPLETED!</h1>
            <p className="text-gray-500 font-medium mb-8">Ngày {activeDayIndex + 1} • {isRetryingWrong ? 'Luyện tập câu sai' : 'Bài học chính'}</p>

            <div className="grid grid-cols-2 gap-4 w-full mb-8">
              <div className="bg-green-50 border border-green-200 rounded-2xl p-4">
                <div className="text-3xl font-black text-green-600">{dayStats.correct}</div>
                <div className="text-sm font-bold text-green-800 opacity-80">CÂU ĐÚNG</div>
              </div>
              <div className="bg-red-50 border border-red-200 rounded-2xl p-4">
                <div className="text-3xl font-black text-red-500">{dayStats.wrong}</div>
                <div className="text-sm font-bold text-red-800 opacity-80">CÂU SAI</div>
              </div>
              <div className="bg-purple-50 border border-purple-200 rounded-2xl p-4 col-span-2 flex justify-around">
                <div>
                  <div className="text-2xl font-black text-purple-700">+{dayStats.correct * (isRetryingWrong ? 5 : 10) + (!isRetryingWrong ? 50 : 0)}</div>
                  <div className="text-xs font-bold text-purple-900 opacity-70">XP NHẬN ĐƯỢC</div>
                </div>
                <div>
                  <div className="text-2xl font-black text-purple-700">{Math.floor(dayStats.timeTaken / 60)}m {dayStats.timeTaken % 60}s</div>
                  <div className="text-xs font-bold text-purple-900 opacity-70">THỜI GIAN</div>
                </div>
              </div>
            </div>

            <div className="w-full space-y-3">
              {dayStats.wrong > 0 && !isRetryingWrong && (
                <button onClick={() => startQuiz(true)} className="w-full py-4 rounded-xl border-2 border-red-500 text-red-600 font-bold hover:bg-red-50 transition">
                  Làm lại {dayStats.wrong} câu sai
                </button>
              )}
              {!isRetryingWrong && activeDayIndex + 1 < 60 && (
                <button onClick={() => startDay(activeDayIndex + 1)} className="w-full py-4 rounded-xl bg-purple-600 text-white font-bold shadow-lg shadow-purple-200 hover:bg-purple-700 transition">
                  Tiếp tục hành trình
                </button>
              )}
              <button onClick={() => goHome()} className="w-full py-4 rounded-xl bg-gray-100 text-gray-700 font-bold hover:bg-gray-200 transition">
                Về trang chủ
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
