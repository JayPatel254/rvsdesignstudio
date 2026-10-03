"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { CATEGORIES, GALLERY, SITE } from "@/lib/site";
export default function Gallery() {
  const [cat, setCat] = useState("All");
  const [open, setOpen] = useState(null);
  const grid = useRef(null);
  const items = GALLERY.filter((g) => cat === "All" || g.cat === cat);
  useEffect(() => {
    gsap.fromTo(grid.current.children, { opacity: 0, y: 40, scale: 0.96 }, { opacity: 1, y: 0, scale: 1, duration: 0.7, stagger: 0.07, ease: "power3.out" });
  }, [cat]);
  useEffect(() => {
    const k = (e) => e.key === "Escape" && setOpen(null);
    addEventListener("keydown", k); return () => removeEventListener("keydown", k);
  }, []);
  return (
    <section id="work" className="sec dark">
      <h2>Spaces we&apos;ve finished</h2>
      <div className="tabs" role="tablist">
        {CATEGORIES.map((c) => (<button key={c} role="tab" aria-selected={cat === c} className={cat === c ? "on" : ""} onClick={() => setCat(c)}>{c}</button>))}
      </div>
      <div className="grid" ref={grid}>
        {items.map((g) => (
          <button key={g.src} className={`tile${g.w ? " wide" : ""}`} onClick={() => setOpen(g)} aria-label={`Open ${g.title}`}>
            <img src={g.src} alt={`${g.cat}: ${g.title}`} loading="lazy" onError={(e) => (e.currentTarget.style.opacity = 0)} />
            <span>{g.title}<small>{g.cat}{g.render ? " · 3D render" : ""}</small></span>
          </button>
        ))}
      </div>
      <a className="more" href={SITE.instagram} target="_blank" rel="noreferrer">More projects on Instagram</a>
      {open && (
        <div className="lightbox" onClick={() => setOpen(null)} role="dialog" aria-modal="true">
          <img src={open.src} alt={open.title} /><p>{open.title}</p>
        </div>
      )}
    </section>
  );
}
