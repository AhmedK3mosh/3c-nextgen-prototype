"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import {
  ArrowLeft, ArrowRight, BookOpen, Bot, Brain, Check, CheckCircle2, ChevronDown,
  ChevronLeft, ChevronRight, Code2, Home, Lightbulb, MoreHorizontal, Play, Search,
  Sparkles, Target, Trophy, UserRound, UsersRound
} from "lucide-react";

type Screen = "landing"|"assessment"|"profile"|"path"|"today"|"coach"|"projects"|"parent";
type Lang = "en"|"ar";

const nav: Record<Screen,string> = {
  landing:"/prototype/landing", assessment:"/prototype/assessment", profile:"/prototype/profile",
  path:"/prototype/path", today:"/prototype/today", coach:"/prototype/coach",
  projects:"/prototype/projects", parent:"/prototype/parent"
};

const copy = {
  en: {
    landingTitle:["A Brighter","Future Starts","Here"], landingSub:"Live online coding & AI classes for kids aged 6–18.", cta:"Start Your Journey",
    students:"Students", rating:"Parent Rating", countries:"Countries", countryValue:"Egypt • UAE • KSA • Oman",
    assessTitle:"Let's get to know your child", ageQ:"What is your child's age?", interestsQ:"What are they interested in?", choose3:"Choose up to 3",
    deviceQ:"Do they have a laptop/PC/tablet?", yes:"Yes", notYet:"Not yet", next:"Next", back:"Back", smartAssessment:"Smart Assessment",
    profileTitle:"Here’s Youssef’s Learning Profile!", profileSub:"Based on our smart assessment, we recommend the following track.",
    skillSnapshot:"Skill Snapshot", topInterests:"Top Interests", recommended:"Recommended Track", recTitle:"Python & Game Development", recSub:"A great fit for Youssef's interests and skills.", viewPath:"View Learning Path",
    pathTitle:"My Learning Path", levels:"Levels", courses:"Courses", achievements:"Achievements", completed:"Completed", inProgress:"In Progress", locked:"Locked", whatsNext:"What's next?", joinClass:"Join Class",
    today:"Today’s Mission", keepGoing:"Keep going, Youssef! 🔥", keepGoingSub:"You're 2 classes away from completing Level 2!", liveClass:"Live Class", practice:"Practice", projectStudio:"Project Studio", startCoach:"Start with AI Coach",
    coachTitle:"AI Coding Coach", coachSub:"I help you think — I don't just give the answer.", hint:"Give me a hint", explain:"Explain this concept", similar:"Show similar example", askPlaceholder:"Type your question...",
    projectsTitle:"My Projects", all:"All", progress:"In Progress", done:"Completed", parentTitle:"Parent Dashboard", month:"This Month", progressTitle:"Youssef’s Progress", attendance:"Attendance", learningTime:"Learning Time", growth:"Skills Growth", skillDev:"Skill Development", aiInsight:"AI Insight", upcoming:"Upcoming",
    home:"Home", learn:"Learn", projects:"Projects", community:"Community", more:"More",
  },
  ar: {
    landingTitle:["مستقبل أكثر","إشراقًا يبدأ","من هنا"], landingSub:"حصص مباشرة أونلاين في البرمجة والذكاء الاصطناعي للأطفال من 6 إلى 18 سنة.", cta:"ابدأ رحلتك الآن",
    students:"طالب وطالبة", rating:"تقييم أولياء الأمور", countries:"الدول", countryValue:"مصر • الإمارات • السعودية • عُمان",
    assessTitle:"خلّينا نتعرّف أكثر على طفلك", ageQ:"كم عمر طفلك؟", interestsQ:"ما المجالات التي يهتم بها؟", choose3:"اختر حتى 3",
    deviceQ:"هل لديه لابتوب/كمبيوتر/تابلت؟", yes:"نعم", notYet:"ليس بعد", next:"التالي", back:"رجوع", smartAssessment:"التقييم الذكي",
    profileTitle:"هذا ملف يوسف التعليمي!", profileSub:"بناءً على التقييم الذكي، نوصي بالمسار التالي.",
    skillSnapshot:"ملخص المهارات", topInterests:"أبرز الاهتمامات", recommended:"المسار المقترح", recTitle:"Python وتطوير الألعاب", recSub:"مسار مناسب لاهتمامات يوسف ومهاراته الحالية.", viewPath:"عرض المسار التعليمي",
    pathTitle:"مساري التعليمي", levels:"المستويات", courses:"الدورات", achievements:"الإنجازات", completed:"مكتمل", inProgress:"قيد التعلم", locked:"مغلق", whatsNext:"ما التالي؟", joinClass:"انضم للحصة",
    today:"مهام اليوم", keepGoing:"استمر يا يوسف! 🔥", keepGoingSub:"متبقي حصتان فقط لإكمال المستوى 2!", liveClass:"حصة مباشرة", practice:"تدريب", projectStudio:"استوديو المشاريع", startCoach:"ابدأ مع المساعد الذكي",
    coachTitle:"مساعد 3C الذكي", coachSub:"أساعدك على التفكير — لا أعطيك الإجابة مباشرة.", hint:"أعطني تلميحًا", explain:"اشرح لي المفهوم", similar:"أعطني مثالًا مشابهًا", askPlaceholder:"اكتب سؤالك هنا...",
    projectsTitle:"مشاريعي", all:"الكل", progress:"قيد العمل", done:"مكتمل", parentTitle:"لوحة ولي الأمر", month:"هذا الشهر", progressTitle:"تقدم يوسف", attendance:"الحضور", learningTime:"وقت التعلم", growth:"نمو المهارات", skillDev:"تطور المهارات", aiInsight:"رؤية الذكاء الاصطناعي", upcoming:"القادم",
    home:"الرئيسية", learn:"تعلم", projects:"المشاريع", community:"المجتمع", more:"المزيد",
  }
};

function Logo(){return <div className="c3-logo" aria-label="3C"><span>3</span><span>C</span></div>}
function Avatar({kind="kid"}:{kind?:"kid"|"parent"|"teacher"}){const g=kind==="parent"?"👩🏻":kind==="teacher"?"👨🏻‍🏫":"👦🏻";return <span className={`avatar avatar-${kind}`} aria-hidden="true">{g}</span>}
function StatusBar(){return <div className="status-bar"><span>9:41</span><div><span>▮▮▮</span><span>⌁</span><span>▰</span></div></div>}

function Skill({label,value,delta,color="#1f78ff"}:{label:string;value:number;delta?:string;color?:string}){
  return <div className="skill-row"><div className="skill-label"><span>{label}</span><div><b>{value}%</b>{delta&&<em>{delta}</em>}</div></div><div className="skill-track"><i style={{width:`${value}%`,background:color}}/></div></div>
}

export default function PrototypeScreen({screen}:{screen:Screen}){
  const router=useRouter();
  const search=useSearchParams();
  const lang:Lang=search.get("lang")==="ar"?"ar":"en";
  const t=copy[lang];
  const rtl=lang==="ar";
  const href=(s:Screen)=>`${nav[s]}?lang=${lang}`;
  const switchLang=()=>router.push(`${nav[screen]}?lang=${lang==="en"?"ar":"en"}`);
  const backIcon=rtl?<ChevronRight/>:<ChevronLeft/>;
  const nextIcon=rtl?<ArrowLeft/>:<ArrowRight/>;

  const [assessmentStep,setAssessmentStep]=useState(1);
  const [age,setAge]=useState("9-12");
  const [interests,setInterests]=useState<string[]>(["games","ai","python"]);
  const [device,setDevice]=useState("yes");
  const [coachText,setCoachText]=useState(lang==="ar"?"بداية ممتازة! أرى أنك تعمل على Dictionary. هل تريد تلميحًا، شرحًا، أم مثالًا مشابهًا؟":"Great start! I can see you’re working on a dictionary. Do you want a hint, an explanation, or a similar example?");
  const [question,setQuestion]=useState("");
  const [projectFilter,setProjectFilter]=useState<"all"|"progress"|"completed">("all");
  const [pathTab,setPathTab]=useState<"levels"|"courses"|"achievements">("levels");
  const [toast,setToast]=useState("");
  const toggleInterest=(v:string)=>setInterests(p=>p.includes(v)?p.filter(x=>x!==v):(p.length<3?[...p,v]:p));
  const notify=(m:string)=>{setToast(m);window.setTimeout(()=>setToast(""),1800)};

  const projects=useMemo(()=>[
    {id:1,status:"progress",title:rtl?"مغامرة فضائية":"Space Adventure",sub:rtl?"لعبة ثنائية الأبعاد باستخدام Pygame":"A 2D game built with Pygame",emoji:"🚀",tag:t.progress},
    {id:2,status:"completed",title:rtl?"مصنف الصور بالذكاء الاصطناعي":"AI Image Classifier",sub:"Teachable Machine",emoji:"🤖",tag:t.done},
    {id:3,status:"completed",title:rtl?"موقعي الأول":"My First Website",sub:"HTML, CSS, JavaScript",emoji:"🌐",tag:t.done},
    {id:4,status:"new",title:rtl?"تطبيق الحاسبة":"Calculator App",sub:"Python (Tkinter)",emoji:"🧮",tag:rtl?"لم يبدأ":"Not Started"}
  ].filter(p=>projectFilter==="all"||(projectFilter==="progress"&&p.status==="progress")||(projectFilter==="completed"&&p.status==="completed")),[projectFilter,rtl,t.progress,t.done]);

  function BottomNav(){return <nav className="bottom-nav"><Link href={href("today")} className={screen==="today"?"active":""}><Home/><span>{t.home}</span></Link><Link href={href("path")} className={screen==="path"?"active":""}><BookOpen/><span>{t.learn}</span></Link><Link href={href("projects")} className={screen==="projects"?"active":""}><Trophy/><span>{t.projects}</span></Link><Link href={href("profile")} className={screen==="profile"?"active":""}><UsersRound/><span>{t.community}</span></Link><Link href={href("parent")} className={screen==="parent"?"active":""}><MoreHorizontal/><span>{t.more}</span></Link></nav>}
  function Phone({children,navBar=true}:{children:React.ReactNode;navBar?:boolean}){return <main className="demo-page" dir={rtl?"rtl":"ltr"}><div className="phone"><div className="notch"/><StatusBar/><div className="phone-body">{children}</div>{navBar&&screen!=="landing"&&screen!=="assessment"&&screen!=="coach"&&<BottomNav/>}</div></main>}
  function TopTitle({title,back,avatar}:{title:string;back?:Screen;avatar?:boolean}){return <header className="screen-title">{back?<Link href={href(back)} className="back-btn">{backIcon}</Link>:<span className="title-spacer"/>}<h1>{title}</h1>{avatar?<Avatar/>:<span className="title-spacer"/>}</header>}

  if(screen==="landing")return <Phone navBar={false}><section className="landing-screen">
    <div className="landing-top"><Logo/><button type="button" className="lang-btn" onClick={switchLang}>🌐 {lang==="en"?"AR":"EN"}</button></div>
    <div className="landing-copy"><h1>{t.landingTitle.map((x,i)=><span key={i}>{x}<br/></span>)}</h1><p>{t.landingSub}</p></div>
    <div className="hero-kids hero-kids-animated" aria-label={rtl?"طلاب 3C":"3C students"}>
      <span className="float-tile tile-code">&lt;/&gt;</span><span className="float-tile tile-game">🎮</span><span className="float-tile tile-star">★</span>
      <div className="kid-card kid-small kid-left"><span className="kid-face">👦🏻</span></div>
      <div className="kid-card kid-main"><span className="kid-face">🧑🏻‍💻</span><span className="hoodie">3C</span></div>
      <div className="kid-card kid-small kid-right"><span className="kid-face">👧🏻</span></div>
      <div className="hero-glow"/>
    </div>
    <div className="landing-cta"><Link href={href("assessment")} className="blue-btn">{t.cta} {nextIcon}</Link></div>
    <div className="landing-stats"><div><b>120K+</b><span>{t.students}</span></div><div><b>4.8 ⭐</b><span>{t.rating}</span></div><div><b>{t.countryValue}</b><span>{t.countries}</span></div></div>
  </section></Phone>;

  if(screen==="assessment")return <Phone navBar={false}><section className="assessment-screen"><div className="assessment-head"><Link href={href("landing")}>{backIcon}</Link><Bot/></div><h1>{t.assessTitle}</h1><div className="assessment-progress"><i style={{width:`${assessmentStep*25}%`}}/><span>{assessmentStep}/4</span></div>{assessmentStep===1&&<><h2>{t.ageQ}</h2><div className="age-grid">{["6-8","9-12","13-15","16-18"].map(v=><button key={v} onClick={()=>setAge(v)} className={age===v?"selected":""}>{v}</button>)}</div><h2>{t.interestsQ} <small>({t.choose3})</small></h2><div className="interest-grid">{[["games","🎮",rtl?"الألعاب":"Games"],["ai","🤖",rtl?"الذكاء الاصطناعي":"AI & Robots"],["web","🖥️",rtl?"الويب":"Web"],["mobile","📱",rtl?"تطبيقات الموبايل":"Mobile Apps"],["design","🚀",rtl?"التصميم":"Design"],["python","📊",rtl?"علوم البيانات":"Data Science"]].map(([id,ico,label])=><button key={id} onClick={()=>toggleInterest(id)} className={interests.includes(id)?"selected":""}><span>{ico}</span><b>{label}</b>{interests.includes(id)&&<CheckCircle2/>}</button>)}</div><h2>{t.deviceQ}</h2><div className="segmented two"><button onClick={()=>setDevice("yes")} className={device==="yes"?"active":""}>{t.yes}</button><button onClick={()=>setDevice("not-yet")} className={device==="not-yet"?"active":""}>{t.notYet}</button></div></>}{assessmentStep===2&&<div className="step-card"><Brain/><h2>{rtl?"كيف يتعامل غالبًا مع مشكلة جديدة؟":"How do they usually solve a new problem?"}</h2><div className="choice-stack">{(rtl?["أجرب أفكارًا مختلفة","أطلب المساعدة سريعًا","أشاهد مثالًا أولًا"]:["I try different ideas","I ask for help quickly","I watch an example first"]).map((x,i)=><button key={x} className={i===0?"selected":""}>{x}</button>)}</div></div>}{assessmentStep===3&&<div className="step-card"><Code2/><h2>{rtl?"هل سبق له البرمجة؟":"Have they coded before?"}</h2><div className="choice-stack">{(rtl?["لم يجرب من قبل","Scratch / Block Coding","Python أو برمجة نصية"]:["Never","Scratch / block coding","Python or text-based coding"]).map((x,i)=><button key={x} className={i===1?"selected":""}>{x}</button>)}</div></div>}{assessmentStep===4&&<div className="step-card final-step"><Sparkles/><h2>{rtl?"ممتاز — لدينا معلومات كافية لبناء ملف يوسف المبدئي.":"Perfect — we have enough to build Youssef's starting profile."}</h2><p>{rtl?"سنقترح المسار بناءً على العمر والاهتمامات والخبرة الحالية.":"We'll recommend a path based on age, interests, and current experience."}</p></div>}<button className="blue-btn assessment-next" onClick={()=>assessmentStep<4?setAssessmentStep(assessmentStep+1):router.push(href("profile"))}>{t.next} {nextIcon}</button></section></Phone>;

  if(screen==="profile")return <Phone><section className="profile-screen"><TopTitle title={t.profileTitle} avatar/><p className="subhead">{t.profileSub}</p><div className="profile-identity"><Avatar/><div><b>{rtl?"يوسف":"Youssef"}</b><span>{rtl?"11 سنة":"11 years old"}</span><em>Explorer 🚀</em></div><Link href={href("assessment")}>✎ {rtl?"تعديل":"Edit"}</Link></div><div className="card skill-card"><h2>{t.skillSnapshot}</h2><Skill label={rtl?"التفكير المنطقي":"Logical Thinking"} value={88} color="#19bf7f"/><Skill label={rtl?"الإبداع":"Creativity"} value={92} color="#a737e8"/><Skill label={rtl?"حل المشكلات":"Problem Solving"} value={71} color="#f3a61f"/><Skill label={rtl?"أساسيات البرمجة":"Coding Basics"} value={64} color="#187cff"/><Skill label={rtl?"مفاهيم الذكاء الاصطناعي":"AI Concepts"} value={35} color="#e94d84"/><h3>{t.topInterests}</h3><div className="chips"><span>{rtl?"الألعاب":"Games"}</span><span>AI</span><span>Python</span></div></div><div className="card recommended-card"><div className="rec-icon">🧭</div><div><small>{t.recommended}</small><h2>{t.recTitle}</h2><p>{t.recSub}</p></div></div><Link className="blue-btn" href={href("path")}>{t.viewPath} {nextIcon}</Link></section></Phone>;

  if(screen==="path")return <Phone><section className="path-screen"><TopTitle title={t.pathTitle} avatar/><button className="track-select" onClick={()=>notify(rtl?"تم فتح اختيار المسار":"Track selector opened")}>Python Track <ChevronDown/></button><div className="tabs"><button className={pathTab==="levels"?"active":""} onClick={()=>setPathTab("levels")}>{t.levels}</button><button className={pathTab==="courses"?"active":""} onClick={()=>setPathTab("courses")}>{t.courses}</button><button className={pathTab==="achievements"?"active":""} onClick={()=>setPathTab("achievements")}>{t.achievements}</button></div>{pathTab==="levels"&&<div className="level-list"><div className="level-item done"><div className="level-dot"><Check/></div><div><span>{rtl?"المستوى 1":"Level 1"}</span><h2>{rtl?"أساسيات Python":"Python Basics"}</h2><b>{t.completed}</b><small>{rtl?"12 درسًا • 3 مشاريع":"12 lessons • 3 projects"}</small></div></div><div className="level-item current"><div className="level-dot">2</div><div><span>{rtl?"المستوى 2":"Level 2"}</span><h2>{rtl?"Python المتوسط":"Intermediate Python"}</h2><b>{t.inProgress}</b><small>{rtl?"6/13 درس":"6/13 lessons"}</small></div></div><div className="level-item locked"><div className="level-dot">3</div><div><span>{rtl?"المستوى 3":"Level 3"}</span><h2>{rtl?"تطوير الألعاب":"Game Development"}</h2><b>{t.locked}</b></div></div><div className="level-item locked"><div className="level-dot">4</div><div><span>{rtl?"المستوى 4":"Level 4"}</span><h2>{rtl?"Python المتقدم":"Advanced Python"}</h2><b>{t.locked}</b></div></div></div>}{pathTab==="courses"&&<div className="simple-list"><div>📘 {rtl?"القواميس والمجموعات":"Dictionaries & Sets"} <b>{rtl?"اليوم":"Today"}</b></div><div>🧩 {rtl?"الدوال":"Functions"} <b>{rtl?"التالي":"Next"}</b></div><div>🎮 Pygame Basics <b>{t.locked}</b></div></div>}{pathTab==="achievements"&&<div className="achievement-grid"><span>🏅 Python Starter</span><span>🔥 7 Day Streak</span><span>🧠 Logic Pro</span><span>🚀 Project Builder</span></div>}<div className="whats-next"><small>{t.whatsNext}</small><h3>👜 {rtl?"الدرس 7: القواميس":"Lesson 7: Dictionaries"}</h3><p>{rtl?"اليوم • 5:00 م":"Today • 5:00 PM"}</p><Link href={href("today")} className="blue-btn">{t.joinClass}</Link></div>{toast&&<div className="toast">{toast}</div>}</section></Phone>;

  if(screen==="today")return <Phone><section className="today-screen"><TopTitle title={t.today} avatar/><div className="keep-going"><div><b>{t.keepGoing}</b><span>{t.keepGoingSub}</span></div><span className="flame">🔥</span></div><div className="mission-card"><div className="mission-label"><span>▣ {t.liveClass}</span><em>{rtl?"بعد ساعتين":"In 2 hours"}</em></div><h2>{rtl?"Python المتوسط":"Intermediate Python"}</h2><p>{rtl?"القواميس والمجموعات":"Dictionaries & Sets"}</p><div className="meta-line">🕔 5:00 – 6:00 PM</div><div className="teacher-line"><Avatar kind="teacher"/> Mr. Ahmed</div><button className="blue-btn" onClick={()=>notify(rtl?"يتم فتح الحصة المباشرة...":"Joining live class…")}>{t.joinClass}</button></div><div className="mission-card practice"><div className="mission-label"><span>▣ {t.practice}</span></div><div className="mini-challenge"><div className="challenge-icon">🏅</div><div><b>{rtl?"تحدٍ صغير":"Mini Challenge"}</b><span>{rtl?"تدرب على القواميس":"Work with dictionaries"}</span></div><Link href={href("coach")} className="round-play"><Play/></Link></div><div className="challenge-meta"><span>◷ 15 min</span><span>+30 XP</span></div></div><div className="mission-card project-mission"><div className="mission-label"><span>▣ {t.projectStudio}</span></div><Link href={href("projects")}><div className="challenge-icon orange">🧩</div><div><b>{rtl?"ابنِ حاسبة بسيطة":"Build a Simple Calculator"}</b><span>{rtl?"تابع مشروعك":"Continue your project"}</span></div><em>+50 XP</em></Link></div>{toast&&<div className="toast">{toast}</div>}</section></Phone>;

  if(screen==="coach")return <Phone navBar={false}><section className="coach-screen"><header className="coach-header"><Link href={href("today")}>{backIcon}</Link><h1>{t.coachTitle}</h1><Bot/></header><p className="coach-subtitle">{t.coachSub}</p><div className="coach-bubble"><Bot/><p>{coachText}</p></div><pre className="code-block" dir="ltr">{`student = {\n  "name": "Youssef",\n  "age": 11\n}\n\nprint(student["name"])\nprint(student["ag"])`}</pre><div className="issue-box"><b>⚠ {rtl?"يوجد خطأ بسيط!":"There's a small issue!"}</b><p>{rtl?<>هل تقصد <code>"age"</code> بدلًا من <code>"ag"</code>؟</>:<>Did you mean <code>"age"</code> instead of <code>"ag"</code>?</>}</p></div><div className="coach-action-list"><button onClick={()=>setCoachText(rtl?"تلميح: قارن المفتاح في السطر الأخير بالمفاتيح داخل القاموس 👀":"Hint: compare the key in the last line with the keys inside the dictionary. 👀")}><Lightbulb/>{t.hint}</button><button onClick={()=>setCoachText(rtl?"في Python، القاموس يخزن القيم باستخدام مفاتيح دقيقة. يجب كتابة اسم المفتاح نفسه تمامًا.":"A Python dictionary stores values by exact keys. If the key is 'age', asking for 'ag' will fail.")}><BookOpen/>{t.explain}</button><button onClick={()=>setCoachText(rtl?"مثال: user = {'name':'Ali'} ثم print(user['name']). جرّب تطبيق النمط نفسه.":"Similar example: user = {'name':'Ali'} then print(user['name']). Now try the same pattern.")}><UserRound/>{t.similar}</button></div><form className="coach-input" onSubmit={e=>{e.preventDefault();if(question.trim()){setCoachText(rtl?`سؤال ممتاز. دعنا نفكر معًا في: ${question}`:`Good question. Let's work through: ${question}`);setQuestion("")}}}><input value={question} onChange={e=>setQuestion(e.target.value)} placeholder={t.askPlaceholder}/><button aria-label={rtl?"إرسال":"Send"}>{nextIcon}</button></form></section></Phone>;

  if(screen==="projects")return <Phone><section className="projects-screen"><header className="screen-title"><span className="title-spacer"/><h1>{t.projectsTitle}</h1><Search/></header><div className="tabs project-tabs"><button className={projectFilter==="all"?"active":""} onClick={()=>setProjectFilter("all")}>{t.all}</button><button className={projectFilter==="progress"?"active":""} onClick={()=>setProjectFilter("progress")}>{t.progress}</button><button className={projectFilter==="completed"?"active":""} onClick={()=>setProjectFilter("completed")}>{t.done}</button></div><div className="project-list">{projects.map(p=><article className="project-card" key={p.id}><div className={`project-cover cover-${p.id}`}><span>{p.emoji}</span><div className="cover-scene">{p.id===1?"🌌 🚀 🪐":p.id===2?"🧠 🖼️ ✨":p.id===3?"💻 🌐":p.id===4?"🧮":""}</div></div><div className="project-info"><div><b>{p.title}</b><span>{p.sub}</span></div><div className={`project-status ${p.status}`}>{p.tag}</div>{p.status!=="new"&&<button onClick={()=>notify(rtl?"تم فتح تفاصيل المشروع":"Project details opened")}>{rtl?"عرض المشروع":"View Project"}</button>}</div></article>)}</div>{toast&&<div className="toast">{toast}</div>}</section></Phone>;

  return <Phone><section className="parent-screen"><header className="screen-title"><span className="title-spacer"/><h1>{t.parentTitle}</h1><Avatar kind="parent"/></header><button className="month-select">{t.month} <ChevronDown/></button><div className="parent-hero"><Avatar/><b>{t.progressTitle}</b></div><div className="parent-metrics"><div><b>92%</b><span>{t.attendance}</span></div><div><b>12h 30m</b><span>{t.learningTime}</span></div><div><b>+18%</b><span>{t.growth}</span></div></div><div className="parent-section"><div className="section-heading"><h2>{t.skillDev}</h2><span>{t.month}</span></div><Skill label={rtl?"التفكير المنطقي":"Logical Thinking"} value={88} delta="+6%"/><Skill label="Python" value={64} delta="+12%"/><Skill label={rtl?"حل المشكلات":"Problem Solving"} value={71} delta="+9%"/><Skill label={rtl?"الإبداع":"Creativity"} value={92} delta="+4%"/><Skill label={rtl?"مفاهيم الذكاء الاصطناعي":"AI Concepts"} value={35} delta="+15%"/></div><div className="ai-insight"><Sparkles/><div><b>{t.aiInsight}</b><p>{rtl?"يوسف يظهر إبداعًا قويًا. نوصي بتشجيعه بمزيد من مشاريع تطوير الألعاب.":"Youssef shows great creativity! We recommend encouraging him with more game development projects."}</p></div></div><div className="upcoming"><h2>{t.upcoming}</h2><Link href={href("path")}><span>🗓️</span><div><b>{rtl?"إكمال المستوى 2":"Level 2 Completion"}</b><small>{rtl?"متبقي حصتان":"2 classes left"}</small></div>{nextIcon}</Link></div></section></Phone>;
}
