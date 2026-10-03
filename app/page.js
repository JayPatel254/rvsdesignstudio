import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Gallery from "@/components/Gallery";
import Contact from "@/components/Contact";
import { SITE } from "@/lib/site";
export default function Page() {
  return (
    <main>
      <nav className="nav">
        <a href="#top" className="logo">RVS</a>
        <div><a href="#work">Work</a><a href="#services">Services</a><a href="#visit">Visit</a>
          <a className="pill" href={`https://wa.me/${SITE.whatsapp}`}>WhatsApp us</a></div>
      </nav>
      <Hero />
      <Services />
      <Gallery />
      <Contact />
      <footer className="foot">© {new Date().getFullYear()} RVS Design Studio · <a href={SITE.instagram}>@rvsdesignstudio</a></footer>
    </main>
  );
}
