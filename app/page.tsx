import { About } from "@/components/About";
import { Cases } from "@/components/Cases";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Licitacoes } from "@/components/Licitacoes";
import { Nav } from "@/components/Nav";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Services } from "@/components/Services";

export default function Home() {
  return (
    <>
      <ScrollReveal />
      <Nav />
      <main className="flex-1">
        <Hero />
        <Services />
        <Cases />
        <Licitacoes />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
