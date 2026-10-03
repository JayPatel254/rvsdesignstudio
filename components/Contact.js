"use client";
import { useEffect, useState } from "react";
import { SITE, HOURS, DAYS } from "@/lib/site";
export default function Contact() {
  const [f, setF] = useState({ name: "", phone: "", message: "" });
  const [today, setToday] = useState(-1);
  useEffect(() => setToday(new Date().getDay()), []);
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });
  const text = () => `Hi RVS Design Studio, I'm ${f.name} (${f.phone}).\n\n${f.message}`;
  const mail = (e) => {
    e.preventDefault();
    location.href = `mailto:${SITE.email}?subject=${encodeURIComponent("Enquiry from " + f.name)}&body=${encodeURIComponent(text())}`;
  };
  const wa = () => window.open(`https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(text())}`, "_blank");
  return (
    <section id="visit" className="sec light">
      <h2>Visit the studio or tell us about your space.</h2>
      <div className="split">
        <form onSubmit={mail} className="form">
          <label>Your name<input required value={f.name} onChange={set("name")} /></label>
          <label>Phone number<input required type="tel" value={f.phone} onChange={set("phone")} /></label>
          <label>What are you planning?<textarea required rows={4} value={f.message} onChange={set("message")} /></label>
          <div className="row"><button className="btn" type="submit">Send by email</button><button className="btn ghost-d" type="button" onClick={() => (f.name && f.phone && f.message ? wa() : alert("Please fill in all fields first."))}>Send on WhatsApp</button></div>
        </form>
        <div>
          <iframe title="RVS Design Studio on Google Maps" src={SITE.mapsEmbed} loading="lazy" className="map" />
          <p><a href={SITE.mapsLink} target="_blank" rel="noreferrer">Open in Google Maps</a> · <a href={`tel:${SITE.phone.replace(/\s/g, "")}`}>{SITE.phone}</a></p>
          <ul className="hours">{DAYS.map((d, i) => (<li key={d} className={i === today ? "today" : ""}><span>{d}</span><span>{HOURS[i]}</span></li>))}</ul>
        </div>
      </div>
    </section>
  );
}
