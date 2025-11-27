import Header from "./components/Header";
import Hero from "./components/Hero";
import WorkSection from "./components/WorkSection";
import Parichay from "./components/Parichay";
import Legislative from "./components/Legislative";
import Transparency from "./components/Transparency";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

import { connectToDB } from "@/lib/mongodb";
import SiteConfig from "@/models/SiteConfig";

async function getSiteConfig() {
  try {
    await connectToDB();
    const config = await SiteConfig.findOne().lean();
    return JSON.parse(JSON.stringify(config));
  } catch (error) {
    console.error("Error fetching site config:", error);
    return null;
  }
}

export default async function Home() {
  const siteConfig = await getSiteConfig();

  return (
    <>
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 space-y-20">
        <Hero config={siteConfig} />
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
