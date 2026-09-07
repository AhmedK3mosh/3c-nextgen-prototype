"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import {
  ArrowLeft, ArrowRight, BarChart3, Bot, Brain, Check, CheckCircle2, ChevronLeft,
  Code2, Crown, Gamepad2, Home, Lightbulb, LockKeyhole, Medal, Play, Rocket,
  Sparkles, Star, Target, Trophy, UserRound, UsersRound, X
} from "lucide-react";

type Screen = "landing" | "assessment" | "profile" | "path" | "today" | "coach" | "projects" | "parent";
type Answers = { age?: string; interest?: string; level?: string };

const tracks: Record<string, { title: string; subtitle: string }> = {
  games: { title: "Python + تطوير الألعاب", subtitle: "من المنطق البرمجي إلى بناء ألعاب Pygame" },
  ai: { title: "Python + الذكاء الاصطناعي", subtitle: "Python ثم AI/ML ومشاريع Teachable Machine" },
  web: { title: "Python + تطوير الويب", subtitle: "أساس قوي ثم HTML, CSS, JavaScript" },
  data: { title: "Python + تحليل البيانات", subtitle: "أساسيات البرمجة ثم Data Science" }
};

const packages = [
  { name: "Quarter", months: "3 شهور", levels: "مستوى واحد", price: "3,950", old: "5,900", badge: "بداية مرنة" },
  { name: "Half Annual", months: "6 شهور", levels: "مستويان", price: "6,950", old: "10,800", badge: "الأكثر توازنًا" },
  { name: "Annual", months: "12 شهر", levels: "4 مستويات", price: "11,800", old: "18,800", badge: "أفضل قيمة" }
];

function Logo() {
  return <div className="brand-logo" aria-label="3C"><span>3</span><span>C</span></div>;
}

function Skill({ label, value, tone = "blue" }: { label: string; value: number; tone?: "blue" | "cyan" | "green" | "orange" }) {
  return <div className="skill-row">
    <div className="skill-meta"><span>{label}</span><b>{value}%</b></div>
    <div className="skill-track"><span className={`skill-fill ${tone}`} style={{ width: `${value}%` }} /></div>
  </div>;
}

function TopBar({ title, subtitle, onBack }: { title: string; subtitle?: string; onBack?: () => void }) {
  return <div className="topbar">
    <div className="topbar-copy"><h2>{title}</h2>{subtitle && <p>{subtitle}</p>}</div>
    {onBack ? <button className="icon-button" onClick={onBack} aria-label="رجوع"><ChevronLeft size={20}/></button> : <Logo/>}
  </div>;
}

export default function HomePage() {
  const [screen, setScreen] = useState<Screen>("landing");
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState<Answers>({});
  const [notice, setNotice] = useState("");
  const [coachText, setCoachText] = useState("وجدت مشكلة صغيرة 👀 — اسم المفتاح في السطر الأخير لا يطابق المفتاح الموجود داخل القاموس.");
  const [packagesOpen, setPackagesOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState("Half Annual");

  const track = useMemo(() => tracks[answers.interest || "games"] ?? tracks.games, [answers.interest]);
  const go = (s: Screen) => { setNotice(""); setScreen(s); window.scrollTo({ top: 0, behavior: "smooth" }); };
  const reset = () => { setScreen("landing"); setStep(1); setAnswers({}); setNotice(""); setPackagesOpen(false); };

  const groups = [
    { key: "age" as const, title: "كم عمر طفلك؟", hint: "نخصص التجربة والمحتوى حسب المرحلة العمرية", options: [["6-8","6–8 سنوات"],["9-12","9–12 سنة"],["13-15","13–15 سنة"],["16-18","16–18 سنة"]] },
    { key: "interest" as const, title: "ما المجال الذي يحمّسه أكثر؟", hint: "اختر الأقرب لاهتمامه الحالي — ويمكن تغييره لاحقًا", options: [["games","🎮 الألعاب"],["ai","🤖 الذكاء الاصطناعي"],["web","🌐 المواقع والتطبيقات"],["data","📊 البيانات وPython"]] },
    { key: "level" as const, title: "ما خبرته الحالية؟", hint: "لن نبدأ من الصفر إذا كان لديه أساس جيد", options: [["new","لم يجرّب البرمجة من قبل"],["basic","جرّب Scratch أو أساسيات بسيطة"],["intermediate","لديه خبرة في Python أو مشاريع"]] }
  ];
  const group = groups[step - 1];
  const next = () => {
    if (!answers[group.key]) { setNotice("اختر إجابة واحدة للمتابعة"); return; }
    setNotice("");
    if (step < groups.length) setStep(step + 1); else go("profile");
  };

  return <main className="prototype-page">
    <header className="site-header">
      <div className="header-inner">
        <div className="brand-wrap"><Logo/><div><b>3C NextGen Experience</b><span>تصور تطوير منتج مقترح لـ 3C</span></div></div>
        <div className="header-actions">
          <button className="ghost-btn" onClick={() => setPackagesOpen(true)}>الباقات الحالية</button>
          <button className="ghost-btn" onClick={reset}>إعادة التجربة</button>
        </div>
      </div>
    </header>

    <section className="showcase">
      <div className="showcase-copy">
        <div className="eyebrow"><Sparkles size={16}/> Learner Experience Concept</div>
        <h1>من LMS تقليدي إلى <span>رحلة تعلم شخصية</span> تبني مهارات حقيقية</h1>
        <p>Prototype تفاعلي مبني على مسارات 3C الحالية، مع طبقة AI للتقييم، التخصيص، دعم المدرّس، المشاريع، ورؤية ولي الأمر.</p>
        <div className="showcase-pills"><span>6–18 سنة</span><span>Live Coding</span><span>Python</span><span>AI & ML</span><span>Game Development</span></div>
      </div>
      <button className="concept-board" onClick={() => go("landing")} aria-label="ابدأ تجربة النموذج">
        <Image src="/3c-concept-ar.jpg" alt="التصور العربي الذي تم اعتماده لشاشات 3C" fill sizes="(max-width: 900px) 100vw, 45vw" priority/>
        <span className="board-overlay"><Play size={18} fill="currentColor"/> جرّب الشاشات تفاعليًا</span>
      </button>
    </section>

    <section className="experience-stage">
      <div className="stage-meta">
        <div><span>Interactive Prototype</span><strong>رحلة يوسف — 11 سنة</strong></div>
        <div className="stage-flow">اكتشاف <ArrowLeft size={14}/> تقييم <ArrowLeft size={14}/> تخصيص <ArrowLeft size={14}/> تعلم <ArrowLeft size={14}/> إنجاز</div>
      </div>

      <div className="phone-shell">
        {screen === "landing" && <section className="app-screen landing-screen">
          <div className="landing-hero">
            <div className="mini-header"><Logo/><span>AR</span></div>
            <div className="mascot-orb"><Bot size={44}/><span className="orbit-dot one"/><span className="orbit-dot two"/></div>
            <span className="landing-kicker">3C Online Coding School</span>
            <h2>مستقبل أفضل<br/>يبدأ من هنا</h2>
            <p>تعلم البرمجة والذكاء الاصطناعي بطريقة ممتعة، تفاعلية، ومخصصة لطفلك.</p>
            <div className="metric-grid"><div><b>+120K</b><span>طالب وطالبة</span></div><div><b>4.8 ★</b><span>تقييم أولياء الأمور</span></div><div><b>6–18</b><span>سنة</span></div></div>
            <button className="primary-btn" onClick={() => go("assessment")}>ابدأ رحلة طفلك <ArrowLeft size={18}/></button>
            <button className="text-btn" onClick={() => setPackagesOpen(true)}>استكشف الباقات الحالية</button>
          </div>
          <div className="benefit-grid"><div><Code2/><span>Live Coding</span></div><div><Gamepad2/><span>مشاريع حقيقية</span></div><div><Brain/><span>AI & ML</span></div><div><Trophy/><span>شهادات ومستويات</span></div></div>
        </section>}

        {screen === "assessment" && <section className="app-screen screen-pad">
          <TopBar title="التقييم الذكي" subtitle="دقيقتان لبناء نقطة بداية أدق" onBack={() => step > 1 ? setStep(step - 1) : go("landing")}/>
          <div className="step-head"><div className="step-progress"><span style={{width:`${(step / groups.length) * 100}%`}}/></div><span>{step}/{groups.length}</span></div>
          <div className="assessment-robot"><Bot/><span>خلّيني أتعرف على طفلك 👋</span></div>
          <h3 className="question-title">{group.title}</h3><p className="question-hint">{group.hint}</p>
          <div className={`answer-grid ${step === 3 ? "single" : ""}`}>{group.options.map(([value,label]) => <button key={value} className={`answer-card ${answers[group.key] === value ? "selected" : ""}`} onClick={() => { setAnswers(v => ({...v,[group.key]:value})); setNotice(""); }}>{answers[group.key] === value && <CheckCircle2 size={17}/>}<span>{label}</span></button>)}</div>
          <div className="validation">{notice}</div>
          <button className="primary-btn" onClick={next}>{step === groups.length ? "أنشئ ملف المتعلم" : "التالي"}<ArrowLeft size={18}/></button>
        </section>}

        {screen === "profile" && <section className="app-screen screen-pad dark-top">
          <TopBar title="مرحبًا يوسف! 👋" subtitle="هذا ملفك التعليمي المبدئي" onBack={() => go("assessment")}/>
          <div className="learner-id"><div className="avatar">ي</div><div><b>يوسف • 11 سنة</b><span>Explorer 🚀</span></div><button onClick={() => go("assessment")}>تعديل</button></div>
          <div className="section-title"><div><span>Skill Snapshot</span><h3>ملف المهارات</h3></div><Sparkles/></div>
          <div className="skills-card"><Skill label="التفكير المنطقي" value={88} tone="green"/><Skill label="الإبداع" value={92} tone="cyan"/><Skill label="حل المشكلات" value={71} tone="orange"/><Skill label="أساسيات البرمجة" value={64}/><Skill label="مفاهيم الذكاء الاصطناعي" value={35}/></div>
          <div className="recommend-card"><div className="recommend-icon"><Target/></div><div><span>المسار المقترح</span><h3>{track.title}</h3><p>{track.subtitle}</p></div></div>
          <button className="primary-btn" onClick={() => go("path")}>عرض مساري الشخصي <ArrowLeft size={18}/></button>
        </section>}

        {screen === "path" && <section className="app-screen screen-pad">
          <TopBar title="مساري التعليمي" subtitle={track.title} onBack={() => go("profile")}/>
          <div className="ai-banner"><Sparkles/><div><b>AI حدّث خطتك</b><span>أضفنا تدريبًا إضافيًا على Problem Solving بناءً على أدائك.</span></div></div>
          <div className="level-timeline">
            <div className="level done"><div className="node"><Check/></div><div><span>المستوى 1</span><b>أساسيات Python</b><small>مكتمل • 12 درسًا • 3 مشاريع</small></div></div>
            <div className="level current"><div className="node">2</div><div><span>المستوى 2</span><b>Python المتوسط</b><small>6/13 جلسة • قيد التعلم</small><div className="mini-progress"><span style={{width:"46%"}}/></div></div></div>
            <div className="level locked"><div className="node"><LockKeyhole size={15}/></div><div><span>المستوى 3</span><b>تطوير الألعاب</b><small>يفتح بعد المستوى الحالي</small></div></div>
            <div className="level locked"><div className="node"><LockKeyhole size={15}/></div><div><span>المستوى 4</span><b>الذكاء الاصطناعي المتقدم</b><small>AI & Machine Learning</small></div></div>
          </div>
          <div className="next-class-card"><span>الدرس القادم</span><b>القواميس والمجموعات</b><small>اليوم • 5:00 مساءً</small><button onClick={() => go("today")}>عرض مهام اليوم <ArrowLeft size={16}/></button></div>
        </section>}

        {screen === "today" && <section className="app-screen screen-pad">
          <TopBar title="مهامي اليوم" subtitle="خطوات صغيرة. مستقبل أكبر." onBack={() => go("path")}/>
          <div className="streak-card"><div><span>🔥</span><b>7 أيام متتالية</b></div><div><b>1,250</b><span>XP</span></div></div>
          <div className="mission-card"><div className="mission-head"><span>مهمتك الرئيسية</span><Medal/></div><h3>أكمل تحدي Python لتفتح Badge جديد</h3><div className="mission-progress"><span style={{width:"70%"}}/></div></div>
          <div className="task-card live"><div className="task-icon"><Play fill="currentColor"/></div><div className="task-copy"><span>حصة مباشرة • بعد ساعتين</span><b>Python المتوسط</b><small>القواميس والمجموعات • 5:00 م</small></div><button onClick={() => setNotice("✓ تم تجهيز رابط الحصة التجريبية")}>انضم</button></div>
          <div className="task-card"><div className="task-icon orange"><Target/></div><div className="task-copy"><span>15 دقيقة • +30 XP</span><b>Mini Challenge</b><small>تحدي سريع على Dictionaries</small></div><button onClick={() => go("coach")}>ابدأ</button></div>
          <div className="task-card"><div className="task-icon cyan"><Rocket/></div><div className="task-copy"><span>استوديو المشاريع</span><b>Simple Calculator</b><small>تابع مشروعك الحالي</small></div><button onClick={() => go("projects")}>افتح</button></div>
          {notice && <div className="success-note">{notice}</div>}
        </section>}

        {screen === "coach" && <section className="app-screen screen-pad">
          <TopBar title="مساعد 3C الذكي" subtitle="يساعدك تفكّر — لا يعطيك الحل" onBack={() => go("today")}/>
          <div className="coach-intro"><div className="bot-avatar"><Bot/></div><p>أرى أنك تعمل على Dictionary. جرّب نحل المشكلة سويًا خطوة بخطوة.</p></div>
          <pre className="code-editor" dir="ltr"><code>{`student = {\n  "name": "Youssef",\n  "age": 11\n}\n\nprint(student["ag"])`}</code><span className="error-line">السطر 6</span></pre>
          <div className="coach-response"><Lightbulb/><p>{coachText}</p></div>
          <div className="coach-actions"><button onClick={() => setCoachText("تلميح: قارن كلمة ag بالمفاتيح المكتوبة داخل student. هل هناك حرف ناقص؟")}>💡 أعطني تلميحًا</button><button onClick={() => setCoachText("Dictionary يخزن البيانات كـ Key وValue. عند القراءة يجب استخدام نفس اسم الـKey بالضبط.")}>📘 اشرح المفهوم</button><button onClick={() => setCoachText("مثال: user = {'name':'Ali'} ثم print(user['name']). طبّق الفكرة على age.")}>🧪 مثال مشابه</button><button className="solve" onClick={() => setCoachText("أحسنت! 🎉 صححت المفتاح إلى age وحصلت على +30 XP.")}>تم الحل ✓</button></div>
        </section>}

        {screen === "projects" && <section className="app-screen screen-pad">
          <TopBar title="استوديو المشاريع" subtitle="من التعلم إلى إنجاز يمكن عرضه" onBack={() => go("today")}/>
          <div className="portfolio-head"><div><span>My Portfolio</span><b>3 مشاريع</b></div><div><Trophy/><b>450 XP</b></div></div>
          <div className="project featured"><div className="project-visual space"><Rocket/></div><div className="project-body"><div className="project-status">قيد العمل</div><h3>مغامرة فضائية</h3><p>لعبة 2D باستخدام Pygame</p><div className="milestones"><span>✓ Game mechanics</span><span>✓ Level design</span><span className="active">● Sound effects</span><span>○ Final testing</span></div><button onClick={() => setNotice("الخطوة التالية: إضافة المؤثرات الصوتية ثم Final Testing")}>متابعة المشروع</button></div></div>
          <div className="project-row"><div className="project-thumb ai"><Brain/></div><div><b>مصنف الصور بالذكاء الاصطناعي</b><span>Teachable Machine • مكتمل</span></div><CheckCircle2/></div>
          <div className="project-row"><div className="project-thumb web"><Code2/></div><div><b>موقعي الأول</b><span>HTML, CSS, JavaScript • مكتمل</span></div><CheckCircle2/></div>
          {notice && <div className="success-note">{notice}</div>}
          <button className="primary-btn" onClick={() => go("parent")}>كيف يرى ولي الأمر التقدم؟ <ArrowLeft size={18}/></button>
        </section>}

        {screen === "parent" && <section className="app-screen screen-pad">
          <TopBar title="لوحة ولي الأمر" subtitle="صورة واضحة عن القيمة والتطور" onBack={() => go("projects")}/>
          <div className="parent-summary"><div className="avatar">ي</div><div><b>تقدم يوسف</b><span>هذا الشهر</span></div><Star fill="currentColor"/></div>
          <div className="parent-metrics"><div><b>92%</b><span>الحضور</span></div><div><b>12س 30د</b><span>وقت التعلم</span></div><div><b>+18%</b><span>نمو المهارات</span></div></div>
          <div className="section-title"><div><span>Skill Development</span><h3>تطور المهارات</h3></div><BarChart3/></div>
          <div className="skills-card"><Skill label="التفكير المنطقي" value={88} tone="green"/><Skill label="Python" value={64}/><Skill label="حل المشكلات" value={71} tone="orange"/><Skill label="الإبداع" value={92} tone="cyan"/><Skill label="مفاهيم الذكاء الاصطناعي" value={35}/></div>
          <div className="parent-insight"><div className="insight-icon"><Sparkles/></div><div><b>رؤية الذكاء الاصطناعي</b><p>يوسف يظهر إبداعًا قويًا ونموًا جيدًا في التفكير المنطقي. نوصي بمشروع Game Development صغير لترسيخ Python.</p></div></div>
          <button className="secondary-btn" onClick={() => setNotice("التوصية القادمة: مشروع Pygame لمدة أسبوعين + جلسة مراجعة Python")}>عرض التوصية القادمة</button>
          {notice && <div className="success-note">{notice}</div>}
        </section>}

        {screen !== "landing" && screen !== "assessment" && <nav className="bottom-nav"><button className={screen === "today" ? "active" : ""} onClick={() => go("today")}><Home/><span>الرئيسية</span></button><button className={screen === "path" ? "active" : ""} onClick={() => go("path")}><Target/><span>المسار</span></button><button className={screen === "projects" ? "active" : ""} onClick={() => go("projects")}><Rocket/><span>المشاريع</span></button><button className={screen === "parent" ? "active" : ""} onClick={() => go("parent")}><UserRound/><span>ولي الأمر</span></button></nav>}
      </div>

      <div className="stage-side">
        <span className="side-label">ما الذي يتغير؟</span>
        <h3>نحافظ على الـ LMS الحالي، ونضيف فوقه طبقة تجربة ذكية.</h3>
        <div className="side-points"><div><Brain/><span><b>Learner DNA</b> بدل مجرد Level</span></div><div><Sparkles/><span><b>Adaptive Practice</b> حول الـCurriculum الأساسي</span></div><div><Bot/><span><b>AI Coding Coach</b> يوجّه بدل إعطاء الإجابة</span></div><div><UsersRound/><span><b>Parent Intelligence</b> لقياس القيمة والـRetention</span></div></div>
        <button className="outline-btn" onClick={() => setPackagesOpen(true)}>عرض الباقات الفعلية المستخدمة في التصور</button>
      </div>
    </section>

    <section className="product-layer">
      <span className="section-kicker">Existing → Enhancement → AI Layer</span><h2>التطوير المقترح بدون هدم النظام الحالي</h2>
      <div className="layer-grid"><article><span>01</span><h3>Existing LMS</h3><p>Courses, Live Sessions, Attendance, Quizzes, Payments, Certificates.</p></article><article><span>02</span><h3>Experience Layer</h3><p>Today, Skill Map, Project Studio, Parent Dashboard, Gamification.</p></article><article className="highlight"><span>03</span><h3>AI Layer</h3><p>Assessment, Personalization, Coding Coach, Risk Detection, Instructor Copilot.</p></article></div>
    </section>

    <footer><div><Logo/><span>Concept prototype — ليس منتجًا رسميًا منشورًا من 3C</span></div><span>Designed for Egypt & GCC learner experience</span></footer>

    {packagesOpen && <div className="modal-backdrop" onClick={() => setPackagesOpen(false)}><div className="packages-modal" onClick={e => e.stopPropagation()}><button className="close-modal" onClick={() => setPackagesOpen(false)}><X/></button><span className="section-kicker">Actual 3C Packages</span><h2>الباقات المستخدمة داخل التصور</h2><p className="modal-sub">الأسعار بالجنيه المصري كما ظهرت في الـProduct Audit. يمكن تكييف تجربة العرض للسعودية والخليج مع الحفاظ على منطق المستويات.</p><div className="package-grid">{packages.map(p => <button key={p.name} className={`package-card ${selectedPackage === p.name ? "selected" : ""}`} onClick={() => setSelectedPackage(p.name)}><div className="package-badge">{p.badge}</div><h3>{p.name}</h3><div className="package-meta"><span>{p.months}</span><span>{p.levels}</span></div><div className="price"><b>{p.price}</b><span>EGP</span><del>{p.old}</del></div><ul><li><Check/> Live Sessions</li><li><Check/> Assessments & Quizzes</li><li><Check/> Technical Guidance</li><li><Check/> Graduation Projects</li><li><Check/> Certificate</li></ul><div className="package-select">{selectedPackage === p.name ? "محدد للتجربة ✓" : "اختيار الباقة"}</div></button>)}</div><button className="primary-btn modal-cta" onClick={() => {setPackagesOpen(false); go("assessment");}}>جرّب كيف نوصي بالمسار قبل البيع <ArrowLeft size={18}/></button></div></div>}
  </main>;
}
