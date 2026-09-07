"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const screens = [
  ["landing","Landing","Clear value & age focus","الصفحة الرئيسية","قيمة واضحة وجذابة"],
  ["assessment","Assessment","Interactive discovery","التقييم المبدئي","اكتشاف تفاعلي"],
  ["profile","Learner Profile","AI-powered profile","ملف المتعلم","تحليل ذكي مخصص"],
  ["path","Learning Path","Real levels, personalized","المسار التعليمي","مسار مبني على 3C"],
  ["today","Today's Mission","Daily motivated experience","مهامي اليوم","تجربة يومية محفّزة"],
  ["coach","AI Coding Coach","Teaches, not just answers","المساعد الذكي","دعم لحظي في التعلم"],
  ["projects","My Projects","Build a real portfolio","مشاريعي","مشاريع حقيقية"],
  ["parent","Parent Dashboard","Progress & insights","لوحة ولي الأمر","متابعة وطمأنينة"],
] as const;

export default function LandingScreen(){
  const router=useRouter();
  const search=useSearchParams();
  const lang=search.get("lang")==="ar"?"ar":"en";
  const rtl=lang==="ar";
  const [dark,setDark]=useState(false);
  const switchLang=()=>router.push(`/prototype/landing?lang=${lang==="en"?"ar":"en"}`);
  const go=(path:string)=>router.push(`/prototype/${path}?lang=${lang}`);

  return <main className={`v3-root ${dark?"v3-dark":""}`} dir={rtl?"rtl":"ltr"}>
    <header className="v3-topbar">
      <div className="v3-brand"><div className="v3-logo">3C</div><div>3C — Interactive Prototype<small>{rtl?"من الفضول إلى الإبداع · مسار مترابط":"Curiosity to Creations · linked flow"}</small></div></div>
      <div className="v3-spacer"/>
      <button className="v3-pill" onClick={switchLang}>🌐 {rtl?"English":"العربية"}</button>
      <button className="v3-pill" onClick={()=>router.push(`/prototype/landing?lang=${lang}`)}>↺ {rtl?"إعادة الجولة":"Restart flow"}</button>
      <button className="v3-pill" onClick={()=>setDark(v=>!v)}>{dark?"☀️":"🌙"}</button>
      <button className="v3-pill">🔗 {rtl?"المسار":"Flow"}</button>
      <button className="v3-pill">▦ {rtl?"نظرة عامة":"Overview"}</button>
    </header>

    <div className="v3-layout">
      <aside className="v3-rail">
        <h3>{rtl?"الشاشات · المسار":"Screens · Flow"}</h3>
        <div className="v3-flow">
          {screens.map((s,i)=><div key={s[0]}>
            <button className={`v3-node ${s[0]==="landing"?"active":""}`} onClick={()=>go(s[0])}>
              <span className="v3-num">{i+1}</span>
              <span><b>{rtl?s[3]:s[1]}</b><small>{rtl?s[4]:s[2]}</small></span>
            </button>
            {i<screens.length-1&&<div className="v3-connector"/>}
          </div>)}
        </div>
        <p className="v3-hint">{rtl?"اضغط أي شاشة للانتقال إليها. الأزرار داخل الجهاز تربط الشاشات ببعضها مثل البروتوتايب الحقيقي.":"Tap any screen to jump. Buttons inside the phone link screens together like a real prototype."}</p>
      </aside>

      <section className="v3-stage">
        <div className="v3-device">
          <div className="v3-bezel">
            <div className="v3-notch"/>
            <div className="v3-screen">
              <div className="v3-statusbar"><span>9:41</span><span>▮▮▮ ⌁ ▰</span></div>
              <div className="v3-content"><div className="v3-pad">
                <div className="v3-between v3-app-head"><div className="v3-logo v3-logo-small">3C</div><button className="v3-lang" onClick={switchLang}>🌐 {rtl?"AR":"EN"}</button></div>

                <h1 className="v3-hero-title">{rtl?<>مستقبل أفضل <em>يبدأ من هنا</em></>:<>A Brighter Future <em>Starts Here</em></>}</h1>
                <p className="v3-muted v3-hero-sub">{rtl?"دورات برمجة وذكاء اصطناعي مباشرة أونلاين للأطفال من 6 إلى 18 سنة.":"Live online coding & AI classes for kids aged 6–18."}</p>

                <div className="v3-stats">
                  <div><span>🎓</span><b>120K+</b><small>{rtl?"طالب":"Students"}</small></div><i/><div><span>⭐</span><b>4.8</b><small>{rtl?"تقييم الأهل":"Parent Rating"}</small></div><i/><div><span>🌐</span><b className="v3-countries">{rtl?<>مصر·الإمارات<br/>السعودية·عُمان</>:<>Egypt·UAE<br/>KSA·Oman</>}</b></div>
                </div>

                <div className="v3-hero3d"><img src="/hero-kids-final.webp?v=v3-final" alt={rtl?"أطفال 3C يتعلمون البرمجة":"3C kids learning to code"}/></div>

                <button className="v3-primary" onClick={()=>go("assessment")}>{rtl?"ابدأ رحلتك الآن":"Start Your Journey"} →</button>

                <div className="v3-card v3-domains">
                  {[["🎮","Game Development","تطوير الألعاب"],["🤖","AI & Robotics","الذكاء والروبوتات"],["🌐","Web Development","تطوير المواقع"],["📊","Apps & Design","التطبيقات والتصميم"]].map(x=><div className="v3-domain" key={x[1]}><span>{x[0]}</span><b>{rtl?x[2]:x[1]}</b></div>)}
                </div>

                <div className="v3-card v3-community">
                  <div className="v3-avatars"><span>👦🏻</span><span>👩🏻</span><span>👨🏻‍🏫</span></div>
                  <div className="v3-community-copy"><b>{rtl?"انضم لـ 120,000+":"Join 120,000+"}</b><small>{rtl?"متعلّم يبنون مستقبلهم مع 3C":"learners building their future with 3C"}</small></div>
                  <button className="v3-story"><span>▶</span><b>{rtl?<>شاهد<br/>قصتنا</>:<>Watch<br/>Our Story</>}</b></button>
                </div>

                <div className="v3-scroll">⌄ {rtl?"مرّر للاستكشاف":"Scroll to explore"}</div>
              </div></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </main>;
}
