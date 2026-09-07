"use client";

import { useMemo, useState } from "react";
import {
  ArrowLeft, Bot, Brain, CheckCircle2, Code2, Gamepad2, Home,
  Lightbulb, Rocket, Sparkles, Trophy, UserRound, UsersRound
} from "lucide-react";

type Screen = "landing" | "assessment" | "profile" | "path" | "today" | "coach" | "projects" | "parent";
type Answers = { age?: string; interest?: string; level?: string };

const interestTracks: Record<string, string> = {
  games: "Python + تطوير الألعاب",
  ai: "Python + الذكاء الاصطناعي",
  web: "Python + تطوير الويب",
  data: "Python + تحليل البيانات"
};

function Skill({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div className="mb-1 flex items-center justify-between text-sm">
        <span>{label}</span><b>{value}%</b>
      </div>
      <div className="progress"><span style={{ width: `${value}%` }} /></div>
    </div>
  );
}

export default function HomePage() {
  const [screen, setScreen] = useState<Screen>("landing");
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState<Answers>({});
  const [coachText, setCoachText] = useState("لاحظت مشكلة بسيطة 👀. المفتاح المستخدم لا يطابق اسم المفتاح الموجود داخل القاموس.");
  const [notice, setNotice] = useState("");

  const recommendedTrack = useMemo(
    () => interestTracks[answers.interest || "games"] || interestTracks.games,
    [answers.interest]
  );

  const select = (key: keyof Answers, value: string) =>
    setAnswers(prev => ({ ...prev, [key]: value }));

  const reset = () => {
    setScreen("landing");
    setStep(1);
    setAnswers({});
    setNotice("");
    setCoachText("لاحظت مشكلة بسيطة 👀. المفتاح المستخدم لا يطابق اسم المفتاح الموجود داخل القاموس.");
  };

  const assessmentGroups = [
    {
      key: "age" as const,
      title: "ما عمر طفلك؟",
      options: [["6-8","6–8"],["9-12","9–12"],["13-15","13–15"],["16-18","16–18"]]
    },
    {
      key: "interest" as const,
      title: "ما أكثر مجال يجذب اهتمامه؟",
      options: [["games","🎮 الألعاب"],["ai","🤖 الذكاء الاصطناعي"],["web","🌐 المواقع والتطبيقات"],["data","📊 البيانات وPython"]]
    },
    {
      key: "level" as const,
      title: "ما مستوى خبرته الحالية؟",
      options: [["new","مبتدئ تمامًا"],["basic","جرب Scratch أو أساسيات بسيطة"],["intermediate","لديه خبرة في Python أو مشاريع"]]
    }
  ];

  const group = assessmentGroups[step - 1];

  const nextAssessment = () => {
    if (!answers[group.key]) {
      setNotice("اختر إجابة للمتابعة.");
      return;
    }
    setNotice("");
    if (step < 3) setStep(step + 1);
    else setScreen("profile");
  };

  const nav = (target: Screen) => {
    setNotice("");
    setScreen(target);
  };

  return (
    <main className="min-h-screen px-4 py-6 md:py-10">
      <div className="mx-auto mb-4 flex max-w-[430px] items-center justify-between">
        <div>
          <div className="font-bold text-slate-900">3C NextGen Prototype</div>
          <div className="text-xs text-slate-500">Concept product — Arabic Gulf experience</div>
        </div>
        <button onClick={reset} className="rounded-xl border bg-white px-3 py-2 text-sm">إعادة البداية</button>
      </div>

      <div className="phone-shell">
        {screen === "landing" && (
          <section>
            <div className="bg-gradient-to-br from-violet-50 via-indigo-50 to-blue-50 p-7 text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-600 text-white">
                <Code2 size={30}/>
              </div>
              <h1 className="text-3xl font-black leading-tight">مستقبل أفضل يبدأ من هنا</h1>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                رحلة تعلم مخصصة في البرمجة والذكاء الاصطناعي للأطفال من 6 إلى 18 سنة.
              </p>
              <div className="mt-5 grid grid-cols-3 gap-2 text-xs">
                <div className="card p-3"><b className="text-base">+120K</b><br/>طالب</div>
                <div className="card p-3"><b className="text-base">4.8★</b><br/>تقييم</div>
                <div className="card p-3"><b className="text-base">مصر والخليج</b><br/>انتشار</div>
              </div>
              <button onClick={() => nav("assessment")} className="btn-primary mt-6">ابدأ رحلة طفلك الآن</button>
            </div>
            <div className="grid grid-cols-2 gap-3 p-5 text-sm">
              <div className="card p-4"><Gamepad2 className="mb-2 text-brand-600"/>تطوير الألعاب</div>
              <div className="card p-4"><Brain className="mb-2 text-brand-600"/>الذكاء الاصطناعي</div>
              <div className="card p-4"><Code2 className="mb-2 text-brand-600"/>تطوير الويب</div>
              <div className="card p-4"><Sparkles className="mb-2 text-brand-600"/>Python</div>
            </div>
          </section>
        )}

        {screen === "assessment" && (
          <section className="p-5">
            <div className="mb-3 flex items-center justify-between">
              <b>التقييم المبدئي</b>
              <span className="text-sm text-slate-500">{step}/3</span>
            </div>
            <div className="progress mb-6"><span style={{ width: `${step * 33.33}%` }} /></div>
            <h2 className="mb-4 text-xl font-bold">{group.title}</h2>
            <div className={`grid gap-2 ${step < 3 ? "grid-cols-2" : ""}`}>
              {group.options.map(([value,label]) => {
                const active = answers[group.key] === value;
                return (
                  <button
                    key={value}
                    onClick={() => { select(group.key, value); setNotice(""); }}
                    className={`min-h-14 rounded-2xl border p-3 text-right font-semibold transition ${
                      active ? "border-brand-600 bg-brand-50 text-brand-700 ring-2 ring-brand-100" : "border-slate-200 bg-white"
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
            <div className="mt-4 min-h-6 text-sm text-red-600">{notice}</div>
            <div className="mt-2 flex gap-2">
              {step > 1 && <button onClick={() => setStep(step - 1)} className="btn-secondary">السابق</button>}
              <button onClick={nextAssessment} className="btn-primary">{step === 3 ? "عرض النتيجة" : "التالي"}</button>
            </div>
          </section>
        )}

        {screen === "profile" && (
          <section className="p-5">
            <h2 className="text-2xl font-black">هذا ملف يوسف التعليمي 🎉</h2>
            <p className="mt-1 text-sm text-slate-500">نتيجة التقييم الذكي — Learner DNA</p>
            <div className="card mt-5 space-y-4 p-4">
              <b>ملخص المهارات</b>
              <Skill label="التفكير المنطقي" value={88}/>
              <Skill label="الإبداع" value={92}/>
              <Skill label="حل المشكلات" value={71}/>
              <Skill label="أساسيات البرمجة" value={64}/>
            </div>
            <div className="mt-4 rounded-2xl bg-brand-50 p-4">
              <span className="text-xs text-slate-500">المسار المقترح</span>
              <h3 className="mt-1 text-xl font-black text-brand-700">{recommendedTrack}</h3>
              <p className="mt-2 text-sm leading-6">تم تخصيصه وفق العمر والاهتمامات ومستوى الخبرة.</p>
            </div>
            <button onClick={() => nav("path")} className="btn-primary mt-4">عرض المسار المقترح</button>
          </section>
        )}

        {screen === "path" && (
          <section className="p-5">
            <div className="mb-5 flex items-start justify-between">
              <div><h2 className="text-2xl font-black">مساري التعليمي</h2><p className="text-sm text-slate-500">{recommendedTrack}</p></div>
              <button onClick={() => nav("profile")} className="rounded-xl border px-3 py-2 text-sm">ملفي</button>
            </div>
            <div className="space-y-3">
              <div className="card p-4"><div className="flex justify-between"><b>المستوى 1 — أساسيات Python</b><CheckCircle2 className="text-emerald-500"/></div><p className="mt-1 text-sm text-slate-500">12 درسًا • 3 مشاريع</p></div>
              <div className="rounded-2xl border-2 border-brand-500 bg-brand-50 p-4">
                <div className="flex justify-between"><b>المستوى 2 — Python متوسط</b><span className="font-bold text-brand-700">46%</span></div>
                <p className="mt-1 text-sm text-slate-600">القواميس • الحلقات • الدوال • حل المشكلات</p>
                <div className="progress mt-3"><span style={{width:"46%"}}/></div>
              </div>
              <div className="card p-4 opacity-60"><div className="flex justify-between"><b>المستوى 3 — تطوير الألعاب</b><span>🔒</span></div></div>
              <div className="card p-4 opacity-60"><div className="flex justify-between"><b>المستوى 4 — الذكاء الاصطناعي</b><span>🔒</span></div></div>
            </div>
            <button onClick={() => nav("today")} className="btn-primary mt-5">ابدأ مهام اليوم</button>
          </section>
        )}

        {screen === "today" && (
          <section className="p-5">
            <div className="mb-4 flex justify-between">
              <div><h2 className="text-2xl font-black">مهامي اليوم</h2><p className="text-sm text-slate-500">استمر يا يوسف 🔥</p></div>
              <div className="rounded-xl bg-orange-50 px-3 py-2 text-sm font-bold text-orange-700">7 أيام 🔥</div>
            </div>
            <div className="card mb-3 p-4">
              <span className="text-xs text-slate-500">الحصة المباشرة</span>
              <h3 className="mt-1 font-black">Python متوسط — القواميس</h3>
              <p className="mt-1 text-sm">5:00 – 6:00 مساءً</p>
              <button onClick={() => setNotice("تم تجهيز تجربة الحصة المباشرة ✓")} className="btn-primary mt-3">الانضمام للحصة</button>
              {notice && <p className="mt-2 text-center text-sm text-emerald-600">{notice}</p>}
            </div>
            <div className="card mb-3 p-4">
              <div className="flex justify-between"><b>تحدي صغير</b><span className="text-brand-700">+30 XP</span></div>
              <p className="mt-1 text-sm text-slate-600">استخدم القواميس لبناء ملف طالب بسيط.</p>
              <button onClick={() => nav("coach")} className="btn-secondary mt-3">ابدأ التحدي مع المساعد الذكي</button>
            </div>
            <div className="card p-4">
              <div className="flex justify-between"><b>استوديو المشاريع</b><span className="text-brand-700">+50 XP</span></div>
              <p className="mt-1 text-sm text-slate-600">تابع مشروع لعبة المغامرة الفضائية.</p>
              <button onClick={() => nav("projects")} className="btn-secondary mt-3">فتح المشروع</button>
            </div>
          </section>
        )}

        {screen === "coach" && (
          <section className="p-5">
            <div className="mb-4 flex items-center justify-between">
              <div><h2 className="text-2xl font-black">مساعد 3C الذكي 🤖</h2><p className="text-sm text-slate-500">يعلمك ولا يعطيك الحل مباشرة</p></div>
              <button onClick={() => nav("today")} className="rounded-xl border p-2"><ArrowLeft size={18}/></button>
            </div>
            <pre className="overflow-x-auto rounded-2xl bg-slate-950 p-4 text-left text-sm text-slate-100" dir="ltr">{`student = {\n  "name": "Youssef",\n  "age": 11\n}\n\nprint(student["ag"])`}</pre>
            <div className="mt-3 rounded-2xl bg-brand-50 p-4 text-sm leading-7">{coachText}</div>
            <div className="mt-3 grid gap-2">
              <button onClick={() => setCoachText("تلميح: راجع الحروف الموجودة بين علامتي الاقتباس داخل القاموس ثم قارنها بما كتبته في print().")} className="btn-secondary"><Lightbulb className="ml-2 inline" size={18}/>أعطني تلميحًا</button>
              <button onClick={() => setCoachText("القاموس في Python يخزن البيانات بصيغة Key وValue. يجب استخدام نفس الـKey بالضبط عند استرجاع القيمة.")} className="btn-secondary"><Brain className="ml-2 inline" size={18}/>اشرح لي المفهوم</button>
              <button onClick={() => setCoachText("مثال مشابه: user = {'name':'Ali'} ثم print(user['name']). جرّب تطبيق الفكرة على الكود الخاص بك.")} className="btn-secondary"><Code2 className="ml-2 inline" size={18}/>أعطني مثالًا مشابهًا</button>
              <button onClick={() => setCoachText("أحسنت يا يوسف! 🎉 تم حل الخطأ وحصلت على +30 XP.")} className="btn-primary">تم الحل ✓</button>
            </div>
          </section>
        )}

        {screen === "projects" && (
          <section className="p-5">
            <div className="mb-4 flex items-center justify-between">
              <div><h2 className="text-2xl font-black">مشاريعي</h2><p className="text-sm text-slate-500">ابنِ ملف أعمال حقيقي</p></div>
              <Rocket className="text-brand-600"/>
            </div>
            <div className="space-y-3">
              <div className="card p-4">
                <div className="flex justify-between"><b>🚀 مغامرة فضائية</b><span className="text-sm text-brand-700">قيد العمل</span></div>
                <p className="mt-1 text-sm text-slate-500">لعبة 2D باستخدام Pygame</p>
                <div className="progress mt-3"><span style={{width:"60%"}}/></div>
                <button onClick={() => setNotice("المرحلة التالية: إضافة المؤثرات الصوتية للمشروع ✓")} className="btn-secondary mt-3">متابعة المشروع</button>
              </div>
              <div className="card p-4"><div className="flex justify-between"><b>🤖 مصنف الصور بالذكاء الاصطناعي</b><CheckCircle2 className="text-emerald-500"/></div><p className="mt-1 text-sm text-slate-500">Teachable Machine</p></div>
              <div className="card p-4"><div className="flex justify-between"><b>🌐 موقعي الأول</b><CheckCircle2 className="text-emerald-500"/></div><p className="mt-1 text-sm text-slate-500">HTML • CSS • JavaScript</p></div>
            </div>
            {notice && <p className="mt-3 text-sm text-emerald-600">{notice}</p>}
            <button onClick={() => nav("parent")} className="btn-primary mt-5">عرض تقدم يوسف لولي الأمر</button>
          </section>
        )}

        {screen === "parent" && (
          <section className="p-5">
            <div className="mb-4 flex items-start justify-between">
              <div><h2 className="text-2xl font-black">لوحة ولي الأمر</h2><p className="text-sm text-slate-500">تقدم يوسف هذا الشهر</p></div>
              <UsersRound className="text-brand-600"/>
            </div>
            <div className="mb-4 grid grid-cols-3 gap-2 text-center text-xs">
              <div className="card p-3"><b className="text-xl">92%</b><br/>الحضور</div>
              <div className="card p-3"><b className="text-xl">12س</b><br/>وقت التعلم</div>
              <div className="card p-3"><b className="text-xl">+18%</b><br/>نمو المهارات</div>
            </div>
            <div className="card space-y-4 p-4">
              <b>تطور المهارات</b>
              <Skill label="التفكير المنطقي" value={88}/>
              <Skill label="Python" value={64}/>
              <Skill label="حل المشكلات" value={71}/>
              <Skill label="الإبداع" value={92}/>
            </div>
            <div className="mt-4 rounded-2xl bg-brand-50 p-4">
              <div className="flex items-center gap-2 font-black"><Bot size={19}/>رؤية الذكاء الاصطناعي</div>
              <p className="mt-2 text-sm leading-7">يوسف يظهر إبداعًا قويًا وتطورًا ملحوظًا في التفكير المنطقي. نوصي بزيادة المشاريع العملية في تطوير الألعاب خلال الشهر القادم.</p>
              <button onClick={() => setNotice("التوصية القادمة: مشروع Game Development مصغر + جلسة مراجعة Python.")} className="btn-secondary mt-3">عرض التوصية القادمة</button>
              {notice && <p className="mt-3 text-sm text-brand-700">{notice}</p>}
            </div>
          </section>
        )}

        {screen !== "landing" && screen !== "assessment" && (
          <nav className="grid grid-cols-4 border-t bg-white p-2 text-center text-[11px]">
            <button onClick={() => nav("today")} className={`rounded-xl p-2 ${screen==="today"?"bg-brand-50 text-brand-700":"text-slate-500"}`}><Home className="mx-auto mb-1" size={18}/>الرئيسية</button>
            <button onClick={() => nav("path")} className={`rounded-xl p-2 ${screen==="path"?"bg-brand-50 text-brand-700":"text-slate-500"}`}><Sparkles className="mx-auto mb-1" size={18}/>المسار</button>
            <button onClick={() => nav("projects")} className={`rounded-xl p-2 ${screen==="projects"?"bg-brand-50 text-brand-700":"text-slate-500"}`}><Trophy className="mx-auto mb-1" size={18}/>المشاريع</button>
            <button onClick={() => nav("parent")} className={`rounded-xl p-2 ${screen==="parent"?"bg-brand-50 text-brand-700":"text-slate-500"}`}><UserRound className="mx-auto mb-1" size={18}/>ولي الأمر</button>
          </nav>
        )}
      </div>

      <p className="mx-auto mt-4 max-w-[430px] text-center text-xs text-slate-500">
        Prototype UX — بيانات تجريبية، بدون Backend أو حسابات حقيقية.
      </p>
    </main>
  );
}
