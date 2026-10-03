"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import * as THREE from "three";

const SLIDES = [
  { src: "/images/living-1.webp", label: "Living room" },
  { src: "/images/bedroom-2.webp", label: "Master suite" },
  { src: "/images/kitchen-1.webp", label: "Kitchen" },
  { src: "/images/living-2.webp", label: "Lounge" },
  { src: "/images/bath-1.webp", label: "Bathroom" },
  { src: "/images/bedroom-1.webp", label: "Bedroom" },
];
const INT = 4.5; // seconds each image is held
const DUR = 1.8; // seconds the transition takes

const VS = `varying vec2 vUv; void main(){ vUv = uv; gl_Position = vec4(position.xy, 0., 1.); }`;
// Luminance-guided wipe: the next photo sweeps in left to right, brightest areas first, with a brass edge.
const FS = `precision highp float;
uniform sampler2D t0, t1; uniform float p, z; uniform vec2 s0, s1; varying vec2 vUv;
float lum(vec3 c){ return dot(c, vec3(.299, .587, .114)); }
void main(){
  vec2 u0 = (vUv - .5) * s0 * (1. - .12 * z) + .5;
  vec2 u1 = (vUv - .5) * s1 + .5;
  float l1 = lum(texture2D(t1, u1).rgb);
  float m = smoothstep(0., .35, p * 1.35 - (vUv.x * .65 + l1 * .35));
  vec3 a = texture2D(t0, u0 + vec2(.05, 0.) * m).rgb;
  vec3 b = texture2D(t1, u1 - vec2(.05, 0.) * (1. - m)).rgb;
  vec3 c = mix(a, b, m);
  c = mix(c, vec3(.79, .63, .35), m * (1. - m) * 1.2);
  gl_FragColor = vec4(c, 1.);
}`;

export default function Hero() {
  const canvas = useRef(null), dots = useRef(null), cap = useRef(null), goRef = useRef(() => {});

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const el = canvas.current;
    const renderer = new THREE.WebGLRenderer({ canvas: el });
    renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5));
    const scene = new THREE.Scene(), cam = new THREE.Camera();
    const u = { t0: { value: null }, t1: { value: null }, p: { value: 0 }, z: { value: 0 }, s0: { value: new THREE.Vector2(1, 1) }, s1: { value: new THREE.Vector2(1, 1) } };
    const mat = new THREE.ShaderMaterial({ uniforms: u, vertexShader: VS, fragmentShader: FS });
    const geo = new THREE.PlaneGeometry(2, 2);
    scene.add(new THREE.Mesh(geo, mat));

    let tex = [], cur = 0, busy = false, raf, timer, zoomTw, dead = false;
    const cover = (t, v) => { const ca = el.clientWidth / el.clientHeight, ia = t.image.width / t.image.height; ca > ia ? v.set(1, ia / ca) : v.set(ca / ia, 1); };
    const size = () => {
      renderer.setSize(el.clientWidth, el.clientHeight, false);
      if (tex.length) { cover(u.t0.value, u.s0.value); cover(u.t1.value, u.s1.value); }
    };
    const fill = (i) => {
      dots.current.querySelectorAll("i").forEach((b, k) => { gsap.killTweensOf(b); k === i ? gsap.fromTo(b, { scaleX: 0 }, { scaleX: 1, duration: INT + DUR, ease: "none" }) : gsap.set(b, { scaleX: 0 }); });
      cap.current.textContent = SLIDES[i].label;
      gsap.fromTo(cap.current, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.8, delay: 0.4 });
    };
    const schedule = () => { timer = gsap.delayedCall(INT, () => go((cur + 1) % SLIDES.length)); };
    const startZoom = () => { u.z.value = 0; zoomTw && zoomTw.kill(); zoomTw = gsap.to(u.z, { value: 1, duration: INT + DUR, ease: "none" }); };
    const go = (to) => {
      if (busy || to === cur || !tex.length) return;
      busy = true; timer && timer.kill();
      u.t1.value = tex[to]; cover(tex[to], u.s1.value); fill(to);
      gsap.to(u.p, { value: 1, duration: DUR, ease: "power2.inOut", onComplete: () => {
        u.t0.value = tex[to]; u.s0.value.copy(u.s1.value); u.p.value = 0;
        startZoom(); cur = to; busy = false; schedule();
      } });
    };
    goRef.current = go;

    const draw = () => { renderer.render(scene, cam); raf = requestAnimationFrame(draw); };
    const loader = new THREE.TextureLoader();
    Promise.all(SLIDES.map((s) => loader.loadAsync(s.src))).then((t) => {
      if (dead) { t.forEach((x) => x.dispose()); return; }
      tex = t; u.t0.value = u.t1.value = t[0]; size();
      cap.current.textContent = SLIDES[0].label;
      if (reduce) { renderer.render(scene, cam); return; }
      gsap.fromTo(el, { opacity: 0 }, { opacity: 0.62, duration: 1.4 });
      fill(0); startZoom(); schedule(); draw();
    }).catch(() => {});
    size(); addEventListener("resize", size);

    const ctx = gsap.context(() => {
      if (reduce) return;
      gsap.timeline({ defaults: { ease: "power4.out" } })
        .from(".h-line span", { yPercent: 110, duration: 1.3, stagger: 0.15, delay: 0.2 })
        .from(".h-sub, .h-cta", { opacity: 0, y: 20, duration: 0.9, stagger: 0.12 }, "-=0.6")
        .from(".nav", { opacity: 0, duration: 1 }, "<");
    });
    return () => { dead = true; cancelAnimationFrame(raf); timer && timer.kill(); zoomTw && zoomTw.kill(); gsap.killTweensOf(u.p); removeEventListener("resize", size); tex.forEach((x) => x.dispose()); geo.dispose(); mat.dispose(); renderer.dispose(); ctx.revert(); };
  }, []);

  return (
    <header id="top" className="hero">
      <canvas ref={canvas} className="hero-canvas" aria-hidden="true" />
      <div className="hero-shade" />
      <div className="hero-copy">
        <h1>
          <span className="h-line"><span>Rooms that feel</span></span>
          <span className="h-line"><span><em>like you</em>, finished</span></span>
          <span className="h-line"><span>to the last detail.</span></span>
        </h1>
        <p className="h-sub">Interior design for homes and workplaces, planned and built by RVS Design Studio.</p>
        <div className="h-cta"><a className="btn" href="#work">See our work</a><a className="btn ghost" href="#visit">Book a visit</a></div>
      </div>
      <div className="hero-meta">
        <span ref={cap} className="slide-cap" />
        <div className="dots" ref={dots}>{SLIDES.map((s, i) => (<button key={s.src} aria-label={`Show ${s.label}`} onClick={() => goRef.current(i)}><i /></button>))}</div>
      </div>
    </header>
  );
}
