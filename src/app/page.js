import Header from "./components/Header";
import Hero from "./components/Hero";
import WorkSection from "./components/WorkSection";
import Parichay from "./components/Parichay";
import Legislative from "./components/Legislative";
import Transparency from "./components/Transparency";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 space-y-20">
        <Hero />
        <WorkSection />
        <Parichay />
        <Legislative />
        <Transparency />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
