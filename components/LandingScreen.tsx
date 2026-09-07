"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";

const copy = {
  en: {
    title:["A Brighter","Future Starts","Here"],
    sub:"Live online coding & AI classes for kids aged 6–18.",
    cta:"Start Your Journey",
    students:"Students",
    rating:"Parent Rating",
    countries:"Countries",
    countryValue:"Egypt • UAE • KSA • Oman",
  },
  ar: {
    title:["مستقبل أكثر","إشراقًا يبدأ","من هنا"],
    sub:"حصص مباشرة أونلاين في البرمجة والذكاء الاصطناعي للأطفال من 6 إلى 18 سنة.",
    cta:"ابدأ رحلتك الآن",
    students:"طالب وطالبة",
    rating:"تقييم أولياء الأمور",
    countries:"الدول",
    countryValue:"مصر • الإمارات • السعودية • عُمان",
  },
};

function Logo(){return <div className="c3-logo" aria-label="3C"><span>3</span><span>C</span></div>}
function StatusBar(){return <div className="status-bar"><span>9:41</span><div><span>▮▮▮</span><span>⌁</span><span>▰</span></div></div>}

export default function LandingScreen(){
  const router=useRouter();
  const search=useSearchParams();
  const lang=search.get("lang")==="ar"?"ar":"en";
  const rtl=lang==="ar";
  const t=copy[lang];
  const switchLang=()=>router.push(`/prototype/landing?lang=${lang==="en"?"ar":"en"}`);
  const nextIcon=rtl?<ArrowLeft/>:<ArrowRight/>;

  return <main className="demo-page" dir={rtl?"rtl":"ltr"}>
    <div className="phone">
      <div className="notch"/>
      <StatusBar/>
      <div className="phone-body">
        <section className="landing-screen">
          <div className="landing-top"><Logo/><button type="button" className="lang-btn" onClick={switchLang}>🌐 {lang==="en"?"AR":"EN"}</button></div>
          <div className="landing-copy"><h1>{t.title.map((x,i)=><span key={i}>{x}<br/></span>)}</h1><p>{t.sub}</p></div>
          <div className="hero-kids hero-kids-direct" aria-label={rtl?"طلاب 3C":"3C students"}>
            <img
              src="/hero-kids-final.webp?v=20260907-direct"
              alt={rtl?"ثلاثة طلاب من 3C يتعلمون البرمجة":"Three 3C students learning coding"}
              className="hero-kids-image"
              onError={(e)=>{
                const img=e.currentTarget;
                if(!img.dataset.fallback){
                  img.dataset.fallback="1";
                  img.src="https://raw.githubusercontent.com/AhmedK3mosh/3c-nextgen-prototype/main/public/hero-kids-final.webp?direct=1";
                }
              }}
            />
          </div>
          <div className="landing-cta"><Link href={`/prototype/assessment?lang=${lang}`} className="blue-btn">{t.cta} {nextIcon}</Link></div>
          <div className="landing-stats"><div><b>120K+</b><span>{t.students}</span></div><div><b>4.8 ⭐</b><span>{t.rating}</span></div><div><b>{t.countryValue}</b><span>{t.countries}</span></div></div>
        </section>
      </div>
    </div>
  </main>;
}
