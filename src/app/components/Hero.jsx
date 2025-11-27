import Image from "next/image";
import img1 from "../images/img1.png";
import home from "@/lib/home.json";

export default function Hero({ config }) {
  const { parichay, hero } = home;

  const title = config?.heroTitle || `${hero.title} ${hero.subtitle}`;
  const subtitle = config?.heroSubtitle || hero.tagline;
  const imageSrc = config?.heroImage || img1;

  return (
    <section id="home" className="relative py-16 md:py-24 bg-gradient-to-br from-orange-50 to-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-16 items-center">

          {/* Left Text */}
          <div className="lg:col-span-7 text-center lg:text-left">
            <div className="inline-block px-4 py-1 mb-4 bg-orange-100 text-blue-800 rounded-full text-sm font-semibold tracking-wide uppercase">
              जनता की आवाज़
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900 leading-tight mb-6">
              {title.split(',').map((part, i) => (
                <span key={i} className={`block ${i === 0 ? 'text-[#1e3a8a]' : 'text-[#1e3a8a] mt-2'}`}>
                  {part.trim()}{i === 0 && ','}
                </span>
              ))}
            </h1>

            <p className="mt-4 text-xl text-gray-600 font-medium italic max-w-2xl mx-auto lg:mx-0">
              {subtitle}
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <div className="px-8 py-4 bg-[#1e3a8a] text-white rounded-lg font-bold text-lg shadow-lg hover:bg-[#1e40af] transform hover:-translate-y-1 transition duration-300"
                dangerouslySetInnerHTML={{ __html: parichay.quickFacts.winningMargin }}>
              </div>
              <a href="#contact" className="px-8 py-4 bg-white text-[#1e3a8a] border-2 border-[#1e3a8a] rounded-lg font-bold text-lg shadow-md hover:bg-blue-50 transition duration-300">
                संपर्क करें
              </a>
            </div>
          </div>

          {/* Right Image */}
          <div className="lg:col-span-5 mt-12 lg:mt-0 flex justify-center relative">
            <div className="relative w-72 h-72 sm:w-96 sm:h-96">
              <div className="absolute inset-0 bg-[#1e3a8a] rounded-[2rem] rotate-6 opacity-20 blur-xl"></div>
              <div className="relative w-full h-full bg-white rounded-[2rem] overflow-hidden border-4 border-white shadow-2xl">
                <Image
                  src={imageSrc}
                  alt="MLA Rikesh Sen"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority
                />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
