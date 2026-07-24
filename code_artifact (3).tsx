import React, { useState, useEffect, useRef } from 'react';
import { 
  CheckCircle, 
  Circle, 
  Download, 
  MessageSquare, 
  X, 
  Send, 
  User, 
  Moon, 
  Sun, 
  Briefcase, 
  GraduationCap, 
  BookOpen, 
  Activity,
  Heart,
  Calendar
} from 'lucide-react';

// --- البيانات الأولية للجدول الأسبوعي ---
const initialSchedule = {
  "السبت": [
    { id: 'sat1', time: '04:30 ص - 05:30 ص', text: 'صلاة الفجر + نص ساعة حفظ القرآن', category: 'religious', xp: 20, done: false },
    { id: 'sat2', time: '05:30 ص - 09:30 ص', text: 'نوم بيولوجي تعويضي', category: 'health', xp: 10, done: false },
    { id: 'sat3', time: '09:30 ص - 10:00 ص', text: 'استيقاظ + إفطار وصلاة الضحى', category: 'health', xp: 10, done: false },
    { id: 'sat4', time: '10:00 ص - 05:00 م', text: 'شفت المكتب الصباحي (محمد)', category: 'office', xp: 50, done: false },
    { id: 'sat5', time: '05:00 م - 08:00 م', text: 'كورس الألماني', category: 'german', xp: 100, done: false },
    { id: 'sat6', time: '08:00 م - 08:30 م', text: 'صلاة المغرب والعشاء + العودة', category: 'religious', xp: 10, done: false },
    { id: 'sat7', time: '08:30 م - 09:30 م', text: 'ساعة إدارية وتسويق للمكتب', category: 'office', xp: 30, done: false },
    { id: 'sat8', time: '09:30 م - 10:30 م', text: 'فيديو ديني (ساعة)', category: 'religious', xp: 15, done: false },
    { id: 'sat9', time: '10:30 م - 12:00 ص', text: 'وقت حر / استرخاء', category: 'health', xp: 10, done: false },
    { id: 'sat10', time: '12:00 ص - 04:30 ص', text: 'نوم', category: 'health', xp: 20, done: false },
  ],
  "الأحد": [
    { id: 'sun1', time: '04:30 ص - 05:30 ص', text: 'صلاة الفجر + حفظ القرآن', category: 'religious', xp: 20, done: false },
    { id: 'sun2', time: '05:30 ص - 09:30 ص', text: 'نوم أساسي', category: 'health', xp: 10, done: false },
    { id: 'sun3', time: '10:00 ص - 05:00 م', text: 'شفت المكتب الصباحي (محمد)', category: 'office', xp: 50, done: false },
    { id: 'sun4', time: '05:00 م - 06:00 م', text: 'راحة + صلاة العصر والمغرب', category: 'religious', xp: 10, done: false },
    { id: 'sun5', time: '06:00 م - 07:00 م', text: 'مذاكرة ألماني (ساعة تمهيدية)', category: 'german', xp: 40, done: false },
    { id: 'sun6', time: '07:00 م - 08:30 م', text: 'جلسة تعلم دروب شيبينج (ساعة ونصف)', category: 'dropshipping', xp: 50, done: false },
    { id: 'sun7', time: '08:30 م - 09:30 م', text: 'ساعة تسويق وإدارة للمكتب', category: 'office', xp: 30, done: false },
    { id: 'sun8', time: '09:30 م - 10:30 م', text: 'فيديو ديني', category: 'religious', xp: 15, done: false },
    { id: 'sun9', time: '10:30 م - 12:00 ص', text: 'قسط راحة / عائلة', category: 'health', xp: 10, done: false },
    { id: 'sun10', time: '12:00 ص - 04:30 ص', text: 'نوم', category: 'health', xp: 20, done: false },
  ],
  "الإثنين": [
    { id: 'mon1', time: '04:30 ص - 05:30 ص', text: 'صلاة الفجر + حفظ القرآن', category: 'religious', xp: 20, done: false },
    { id: 'mon2', time: '05:30 ص - 09:30 ص', text: 'نوم', category: 'health', xp: 10, done: false },
    { id: 'mon3', time: '10:00 ص - 05:00 م', text: 'شفت المكتب الصباحي (محمد)', category: 'office', xp: 50, done: false },
    { id: 'mon4', time: '05:00 م - 07:00 م', text: 'مذاكرة ألماني مكثفة', category: 'german', xp: 80, done: false },
    { id: 'mon5', time: '07:00 م - 08:30 م', text: 'جلسة تعلم دروب شيبينج', category: 'dropshipping', xp: 50, done: false },
    { id: 'mon6', time: '08:30 م - 09:30 م', text: 'ساعة تسويق وإدارة للمكتب', category: 'office', xp: 30, done: false },
    { id: 'mon7', time: '09:30 م - 10:30 م', text: 'فيديو ديني', category: 'religious', xp: 15, done: false },
    { id: 'mon8', time: '10:30 م - 12:00 ص', text: 'راحة', category: 'health', xp: 10, done: false },
    { id: 'mon9', time: '12:00 ص - 04:30 ص', text: 'نوم', category: 'health', xp: 20, done: false },
  ],
  "الثلاثاء": [
    { id: 'tue1', time: '04:30 ص - 05:30 ص', text: 'صلاة الفجر + حفظ القرآن', category: 'religious', xp: 20, done: false },
    { id: 'tue2', time: '05:30 ص - 09:30 ص', text: 'نوم', category: 'health', xp: 10, done: false },
    { id: 'tue3', time: '10:00 ص - 04:30 م', text: 'شفت المكتب الصباحي (محمد)', category: 'office', xp: 50, done: false },
    { id: 'tue4', time: '04:30 م - 05:00 م', text: 'التحرك لمكان الكورس', category: 'health', xp: 5, done: false },
    { id: 'tue5', time: '05:00 م - 08:00 م', text: 'كورس الألماني', category: 'german', xp: 100, done: false },
    { id: 'tue6', time: '08:00 م - 08:00 ص', text: 'نبطشية المستشفى الفرنساوي', category: 'hospital', xp: 150, done: false },
  ],
  "الأربعاء": [
    { id: 'wed1', time: '08:00 ص - 08:30 ص', text: 'العودة للمنزل من الفرنساوي', category: 'health', xp: 5, done: false },
    { id: 'wed2', time: '08:30 ص - 01:30 ظ', text: 'نوم تعويضي عميق', category: 'health', xp: 40, done: false },
    { id: 'wed3', time: '01:30 ظ - 02:00 ظ', text: 'استيقاظ + صلاة الظهر + تحرك', category: 'religious', xp: 10, done: false },
    { id: 'wed4', time: '02:00 ظ - 08:00 ص', text: 'نبطشية المستشفى الفرنساوي', category: 'hospital', xp: 180, done: false },
  ],
  "الخميس": [
    { id: 'thu1', time: '08:00 ص - 08:30 ص', text: 'العودة للبيت', category: 'health', xp: 5, done: false },
    { id: 'thu2', time: '08:30 ص - 01:30 ظ', text: 'نوم تعويضي للنبطشية', category: 'health', xp: 40, done: false },
    { id: 'thu3', time: '01:30 ظ - 03:00 م', text: 'جلسة تعلم دروب شيبينج', category: 'dropshipping', xp: 50, done: false },
    { id: 'thu4', time: '03:00 م - 04:00 م', text: 'ساعة إدارة وتسويق للمكتب', category: 'office', xp: 30, done: false },
    { id: 'thu5', time: '05:00 م - 01:00 ص', text: 'شفت المكتب المسائي (محمد)', category: 'office', xp: 60, done: false },
    { id: 'thu6', time: '01:00 ص - 04:30 ص', text: 'نوم', category: 'health', xp: 20, done: false },
  ],
  "الجمعة": [
    { id: 'fri1', time: '04:30 ص - 05:30 ص', text: 'صلاة الفجر + حفظ القرآن', category: 'religious', xp: 20, done: false },
    { id: 'fri2', time: '05:30 ص - 08:30 ص', text: 'تجهيز وقسط راحة', category: 'health', xp: 10, done: false },
    { id: 'fri3', time: '09:00 ص - 12:00 ظ', text: 'حضور ماجستير الإدارة بالكلية', category: 'masters', xp: 80, done: false },
    { id: 'fri4', time: '12:00 ظ - 01:30 م', text: 'صلاة الجمعة + الغداء', category: 'religious', xp: 20, done: false },
    { id: 'fri5', time: '01:30 م - 03:30 م', text: 'نوم واستراحة', category: 'health', xp: 15, done: false },
    { id: 'fri6', time: '05:00 م - 01:00 ص', text: 'شفت المكتب المسائي (محمد)', category: 'office', xp: 60, done: false },
    { id: 'fri7', time: '01:00 ص - 04:30 ص', text: 'نوم', category: 'health', xp: 20, done: false },
  ]
};

// --- بيانات شفتات المكتب ---
const officeShifts = {
  "السبت": { morning: 'محمد', evening: 'أحمد (مغطي الكورس)' },
  "الأحد": { morning: 'محمد', evening: 'أحمد' },
  "الإثنين": { morning: 'محمد', evening: 'أحمد' },
  "الثلاثاء": { morning: 'محمد', evening: 'أحمد (مغطي كورس+نبطشية)' },
  "الأربعاء": { morning: 'أحمد', evening: 'أحمد (مغطي نبطشيتك)' },
  "الخميس": { morning: 'أحمد', evening: 'محمد' },
  "الجمعة": { morning: 'أحمد', evening: 'محمد' },
};

const daysOfWeek = ['السبت', 'الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة'];

export default function App() {
  const [activeDay, setActiveDay] = useState('السبت');
  const [schedule, setSchedule] = useState(initialSchedule);
  const [notes, setNotes] = useState('');
  
  // Gamification State (XP)
  const [xpData, setXpData] = useState({
    german: { current: 1200, max: 13500, label: 'الألماني (باقي 9 شهور)' },
    office: { current: 800, max: 6000, label: 'إدارة المكتب (هدف 4 شهور)' },
    dropshipping: { current: 450, max: 3000, label: 'الدروب شيبينج' },
    religious: { current: 600, max: 2000, label: 'الجانب الروحي' }
  });

  // AI Chat State
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { sender: 'ai', text: 'أهلاً بك يا دكتور محمد! تم تفعيل مفتاح الذكاء الاصطناعي بنجاح. أبلغني بأي طارئ (مثل اعتذار أحمد عن شفت) وسأعيد ترتيب مهامك بدقة.' }
  ]);
  const [userInput, setUserInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages, isChatOpen]);

  const toggleTask = (day, taskId, category, xpReward, isDone) => {
    const updatedSchedule = { ...schedule };
    const taskIndex = updatedSchedule[day].findIndex(t => t.id === taskId);
    
    if (taskIndex !== -1) {
      updatedSchedule[day][taskIndex].done = !isDone;
      setSchedule(updatedSchedule);

      if (xpData[category]) {
        setXpData(prev => ({
          ...prev,
          [category]: {
            ...prev[category],
            current: isDone 
              ? Math.max(0, prev[category].current - xpReward) 
              : prev[category].current + xpReward 
          }
        }));
      }
    }
  };

  const exportToCSV = () => {
    const dayTasks = schedule[activeDay];
    let csvContent = "الوقت,المهمة,التصنيف,حالة الإنجاز\n";
    
    dayTasks.forEach(task => {
      const status = task.done ? 'منجز' : 'لم ينجز';
      const row = `"${task.time}","${task.text}","${task.category}","${status}"`;
      csvContent += row + "\n";
    });

    const blob = new Blob(["\uFEFF" + csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `جدول_محمد_${activeDay}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // AI Chat Logic with your API Key
  const handleSendMessage = async () => {
    if (!userInput.trim()) return;

    const newMessages = [...chatMessages, { sender: 'user', text: userInput }];
    setChatMessages(newMessages);
    setUserInput('');
    setIsTyping(true);

    try {
      const apiKey = "AQ.Ab8RN6IY2vwlU4iVSdL87kcMNQXppxdG504LkHwdNWTLf6GfGw";
      const systemPrompt = `
      أنت مساعد ذكي لتنظيم الوقت لممرض اسمه محمد.
      معلومات محمد:
      - يعمل نبطشيات في مستشفى الفرنساوي (الثلاثاء ليل، الأربعاء ليل، الخميس صباحاً).
      - شريك مع "أحمد" في مكتب تمريض منزلي، ويتبادلان الشفتات (صباحي 10ص-5م، مسائي 5م-1ص). لا يعملان معاً في نفس الوقت.
      - يدرس ألماني (السبت والثلاثاء 5م-8م).
      - يدرس ماجستير (الجمعة 9ص-12ظ).
      - يدرس دروب شيبينج ويقوم بتسويق المكتب.
      - الصلاة والقرآن أولويات قصوى.
      إذا طلب محمد تعديل الجدول (مثلاً أحمد اعتذر)، قم باقتراح جدول جديد لليوم بمهارة، وحافظ على أولويات النوم البيولوجي والكورسات والمستشفى. رد باختصار وعملية باللغة العربية.
      `;

      const payload = {
        contents: [{ parts: [{ text: userInput }] }],
        systemInstruction: { parts: [{ text: systemPrompt }] }
      };

      let response;
      let retries = 5;
      let delay = 1000;
      
      while (retries > 0) {
        try {
          response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
          });
          if (response.ok) break;
        } catch (err) {
          if (retries === 1) throw err;
        }
        retries--;
        await new Promise(res => setTimeout(res, delay));
        delay *= 2;
      }

      if (!response || !response.ok) {
         throw new Error("API failed");
      }
      
      const data = await response.json();
      const aiText = data.candidates?.[0]?.content?.parts?.[0]?.text || "عذراً، لم أتمكن من معالجة الطلب.";
      
      setChatMessages(prev => [...prev, { sender: 'ai', text: aiText }]);
    } catch (error) {
      setChatMessages(prev => [...prev, { sender: 'ai', text: "حدث خطأ في الاتصال بنموذج الذكاء الاصطناعي. يرجى التأكد من اتصال الإنترنت." }]);
    } finally {
      setIsTyping(false);
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'german': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'hospital': return 'bg-red-100 text-red-800 border-red-200';
      case 'office': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'dropshipping': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'religious': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'masters': return 'bg-indigo-100 text-indigo-800 border-indigo-200';
      case 'health': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div dir="rtl" className="min-h-screen bg-slate-50 font-sans text-slate-800 pb-20 selection:bg-teal-200">
      
      <header className="bg-teal-700 text-white p-6 shadow-md rounded-b-3xl">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <Activity className="w-6 h-6" /> منظم وقت د. محمد
            </h1>
            <p className="text-teal-100 text-sm mt-1">السيطرة الكاملة على يومك، ومستقبلك.</p>
          </div>
          <div className="text-left">
            <div className="bg-teal-800/50 px-4 py-2 rounded-full border border-teal-600 flex items-center gap-2">
              <User className="w-4 h-4" />
              <span className="font-semibold">المستوى 12</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-4 space-y-6 mt-4">
        
        <section className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2 text-slate-700">
            <GraduationCap className="w-5 h-5 text-teal-600" /> تقدم الأهداف (Gamification)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(xpData).map(([key, data]) => {
              const percentage = Math.min(100, Math.round((data.current / data.max) * 100));
              return (
                <div key={key} className="space-y-1">
                  <div className="flex justify-between text-sm font-medium">
                    <span>{data.label}</span>
                    <span className="text-teal-600">{data.current} / {data.max} XP</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                    <div 
                      className="bg-teal-500 h-2.5 rounded-full transition-all duration-500 ease-out" 
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2 text-slate-700">
            <Briefcase className="w-5 h-5 text-blue-600" /> شفتات المكتب المنزلي (اليوم: {activeDay})
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center gap-3 p-4 rounded-xl bg-amber-50 border border-amber-100">
              <Sun className="w-8 h-8 text-amber-500" />
              <div>
                <p className="text-sm text-slate-500">الصباحي (10ص - 5م)</p>
                <p className="font-bold text-lg text-slate-800">{officeShifts[activeDay].morning}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 rounded-xl bg-indigo-50 border border-indigo-100">
              <Moon className="w-8 h-8 text-indigo-500" />
              <div>
                <p className="text-sm text-slate-500">المسائي (5م - 1ص)</p>
                <p className="font-bold text-lg text-slate-800">{officeShifts[activeDay].evening}</p>
              </div>
            </div>
          </div>
        </section>

        <div className="flex overflow-x-auto hide-scrollbar gap-2 pb-2">
          {daysOfWeek.map(day => (
            <button
              key={day}
              onClick={() => setActiveDay(day)}
              className={`px-5 py-2.5 rounded-full whitespace-nowrap font-medium transition-all ${
                activeDay === day 
                  ? 'bg-teal-600 text-white shadow-md' 
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {day}
            </button>
          ))}
        </div>

        <section className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="p-4 bg-slate-50 border-b border-slate-100 flex justify-between items-center">
            <h2 className="font-bold text-lg flex items-center gap-2">
              <Calendar className="w-5 h-5 text-teal-600" /> مهام يوم {activeDay}
            </h2>
            <button 
              onClick={exportToCSV}
              className="flex items-center gap-1.5 text-sm bg-white border border-slate-300 px-3 py-1.5 rounded-lg hover:bg-slate-50 text-slate-700 transition-colors"
            >
              <Download className="w-4 h-4" /> تحميل Excel
            </button>
          </div>
          <div className="divide-y divide-slate-100">
            {schedule[activeDay].map(task => (
              <div 
                key={task.id} 
                className={`p-4 flex items-start gap-4 transition-colors hover:bg-slate-50 ${task.done ? 'opacity-60 bg-slate-50' : ''}`}
              >
                <button 
                  onClick={() => toggleTask(activeDay, task.id, task.category, task.xp, task.done)}
                  className="mt-1 flex-shrink-0 text-teal-600 hover:text-teal-700 transition-colors"
                >
                  {task.done ? <CheckCircle className="w-6 h-6" /> : <Circle className="w-6 h-6 text-slate-300" />}
                </button>
                <div className="flex-grow">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="text-sm font-bold text-slate-600 bg-white px-2 py-0.5 rounded border shadow-sm">
                      {task.time}
                    </span>
                    <span className={`text-xs px-2 py-0.5 rounded-full border ${getCategoryColor(task.category)}`}>
                      {task.category === 'german' ? 'ألماني' : 
                       task.category === 'hospital' ? 'مستشفى' : 
                       task.category === 'office' ? 'مكتب' :
                       task.category === 'religious' ? 'ديني' :
                       task.category === 'dropshipping' ? 'دروب شيبينج' :
                       task.category === 'health' ? 'صحة/نوم' : 'أخرى'}
                    </span>
                    <span className="text-xs font-bold text-amber-500 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                      +{task.xp} XP
                    </span>
                  </div>
                  <p className={`text-slate-800 ${task.done ? 'line-through text-slate-500' : ''}`}>
                    {task.text}
                  </p>
                  
                  {!task.done && task.category === 'hospital' && (
                    <p className="text-xs text-slate-500 mt-2 bg-slate-100 inline-block p-1 rounded">
                      💡 فكرة لوقت الفراغ: راجع 10 كلمات ألماني أو اقرأ مقال عن الإدارة.
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
          <h2 className="text-lg font-bold mb-3 flex items-center gap-2 text-slate-700">
            <BookOpen className="w-5 h-5 text-teal-600" /> ملاحظات {activeDay}
          </h2>
          <textarea 
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="اكتب هنا أي ملاحظات، تذكيرات، أو أشياء تريد إضافتها لليوم..."
            className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 min-h-[100px] focus:outline-none focus:ring-2 focus:ring-teal-500/50 resize-y"
          />
        </section>

      </main>

      <div className="fixed bottom-6 left-6 z-50 flex flex-col items-end">
        {isChatOpen && (
          <div className="bg-white w-80 sm:w-96 rounded-2xl shadow-2xl border border-slate-200 overflow-hidden mb-4 flex flex-col h-[400px] transition-all transform origin-bottom-left animate-in fade-in slide-in-from-bottom-5">
            <div className="bg-teal-700 text-white p-3 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="bg-white/20 p-1.5 rounded-full">
                  <Heart className="w-4 h-4 text-white" fill="currentColor" />
                </div>
                <span className="font-bold">المساعد الذكي</span>
              </div>
              <button onClick={() => setIsChatOpen(false)} className="text-teal-100 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="flex-grow p-4 overflow-y-auto bg-slate-50 space-y-3">
              {chatMessages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${
                    msg.sender === 'user' 
                      ? 'bg-teal-600 text-white rounded-bl-none' 
                      : 'bg-white border border-slate-200 text-slate-800 rounded-br-none shadow-sm'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white border border-slate-200 text-slate-500 p-3 rounded-2xl rounded-br-none shadow-sm text-xs flex gap-1 items-center">
                    <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></span>
                    <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></span>
                    <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></span>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            <div className="p-3 bg-white border-t border-slate-100 flex gap-2">
              <input 
                type="text" 
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="مثال: أحمد اعتذر عن شفت اليوم..."
                className="flex-grow bg-slate-100 border-none rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/50"
              />
              <button 
                onClick={handleSendMessage}
                disabled={!userInput.trim() || isTyping}
                className="bg-teal-600 text-white p-2 rounded-full hover:bg-teal-700 disabled:opacity-50 transition-colors flex-shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        <button 
          onClick={() => setIsChatOpen(!isChatOpen)}
          className="bg-teal-600 hover:bg-teal-700 text-white p-4 rounded-full shadow-xl shadow-teal-900/20 transition-transform hover:scale-105 active:scale-95 flex items-center justify-center"
        >
          {isChatOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
        </button>
      </div>

    </div>
  );
}