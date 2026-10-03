"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SERVICES } from "@/lib/site";
export default function Services() {
  const root = useRef(null);
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from(".svc", { opacity: 0, x: -40, stagger: 0.15, duration: 0.9, ease: "power3.out", scrollTrigger: { trigger: root.current, start: "top 70%" } });
    }, root);
    return () => ctx.revert();
  }, []);
  return (
    <section id="services" className="sec light" ref={root}>
      <h2>We design the whole room, not just the look of it.</h2>
      <ul className="svcs">{SERVICES.map(([t, d]) => (<li className="svc" key={t}><h3>{t}</h3><p>{d}</p></li>))}</ul>
    </section>
  );
}
