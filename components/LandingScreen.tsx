"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, ArrowRight, Play } from "lucide-react";

const copy = {
  en: {
    titleA: "A Brighter Future ", titleB: "Starts Here",
    sub: "Live online coding & AI classes for kids aged 6–18.", cta: "Start Your Journey",
    students: "Students", rating: "Parent Rating", countries: <>Egypt·UAE<br/>KSA·Oman</>,
    tracks: ["Game Development", "AI & Robotics", "Web Development", "Apps & Design"],
    join: "Join 120,000+", joinSub: "learners building their future with 3C", watch: "Watch", story: "Our Story", scroll: "Scroll to explore"
  },
  ar: {
    titleA: "مستقبل أفضل ", titleB: "يبدأ من هنا",
    sub: "دورات برمجة وذكاء اصطناعي مباشرة أونلاين للأطفال من 6 إلى 18 سنة.", cta: "ابدأ رحلتك الآن",
    students: "طالب", rating: "تقييم الأهل", countries: <>مصر·الإمارات<br/>السعودية·عُمان</>,
    tracks: ["تطوير الألعاب", "الذكاء والروبوتات", "تطوير المواقع", "التطبيقات والتصميم"],
    join: "انضم لـ 120,000+", joinSub: "متعلّم يبنون مستقبلهم مع 3C", watch: "شاهد", story: "قصتنا", scroll: "مرّر للاستكشاف"
  },
};

function Logo(){return <div className="c3-logo" aria-label="3C"><span>3</span><span>C</span></div>}
function StatusBar(){return <div className="status-bar"><span>9:41</span><div><span>▮▮▮</span><span>⌁</span><span>▰</span></div></div>}

export default function LandingScreen(){
  const router=useRouter(); const search=useSearchParams();
  const lang=search.get("lang")==="ar"?"ar":"en"; const rtl=lang==="ar"; const t=copy[lang];
  const switchLang=()=>router.push(`/prototype/landing?lang=${lang==="en"?"ar":"en"}`);
  const Arrow=rtl?ArrowLeft:ArrowRight; const icons=["🎮","🤖","🌐","📊"];

  return <main className="demo-page" dir={rtl?"rtl":"ltr"}><div className="phone"><div className="notch"/><StatusBar/><div className="phone-body">
    <section className="landing-screen v3-landing">
      <div className="landing-top"><Logo/><button type="button" className="lang-btn" onClick={switchLang}>🌐 {lang==="en"?"AR":"EN"}</button></div>
      <div className="landing-copy v3-copy"><h1>{t.titleA}<span>{t.titleB}</span></h1><p>{t.sub}</p></div>
      <div className="v3-stats"><div><i>🎓</i><b>120K+</b><span>{t.students}</span></div><em/><div><i>⭐</i><b>4.8</b><span>{t.rating}</span></div><em/><div><i>🌐</i><b className="country-copy">{t.countries}</b></div></div>
      <div className="hero-kids hero-kids-direct"><img src="/hero-kids-final.webp?v=v3-approved" alt={rtl?"أطفال 3C يتعلمون البرمجة":"3C kids learning to code"} className="hero-kids-image"/></div>
      <div className="landing-cta"><Link href={`/prototype/assessment?lang=${lang}`} className="blue-btn">{t.cta}<Arrow/></Link></div>
      <div className="v3-tracks">{t.tracks.map((track,i)=><div key={track}><span>{icons[i]}</span><b>{track}</b></div>)}</div>
      <div className="v3-community"><div className="v3-avatars"><span>👦</span><span>👩</span><span>👨‍🏫</span></div><div className="v3-community-copy"><b>{t.join}</b><span>{t.joinSub}</span></div><button aria-label={`${t.watch} ${t.story}`}><i><Play/></i><span><b>{t.watch}</b><b>{t.story}</b></span></button></div>
      <div className="v3-scroll">⌄ {t.scroll}</div>
    </section>
  </div></div></main>;
}
