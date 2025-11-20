  import Image from "next/image";
import img1 from "../images/img1.png";
import home from "@/lib/home.json";

export default function Hero() {
  const { parichay } = home;
  return (
    <section id="home" className="py-12 md:py-16 bg-white rounded-xl shadow-2xl overflow-hidden">
    
      <div className="lg:grid grid-cols-3 gap-10 items-center p-6 sm:p-10">

        {/* Left Text */}
        <div className="col-span-2 order-2 lg:order-1">
          <p className="text-2xl font-semibold text-[#000080]">छत्तीसगढ़ की पहचान:</p>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl mt-4 font-extrabold tracking-tight text-gray-900 leading-tight">
            <span className="text-[#ff9933] block">वैशाली नगर</span>
            <span className="text-[#000080] block mt-2">का सेवक, Rikesh Sen</span>
          </h1>

          <p className="mt-4 text-xl text-gray-600 font-medium italic">
            Sewa aur vikas ke saath, imaandaari se janta ka vishwas jeetne ka sankalp.
          </p>

          <div className="mt-8">
            <div className="inline-block px-6 py-3 bg-[#000080] text-white rounded-lg font-bold text-lg shadow-lg"
              dangerouslySetInnerHTML={{ __html: parichay.quickFacts.winningMargin }}>
            </div>
          </div>
        </div>

        {/* Right Image */}
        <div className="col-span-1 order-1 lg:order-2 mb-8 lg:mb-0 flex justify-center">
          <div className="w-64 h-64 sm:w-80 sm:h-80 bg-gray-200 rounded-[75px] overflow-hidden border-8 border-[#ff9933] shadow-xl">
            
           <Image src={img1} alt="Description of the image" />
          </div>
        </div>

      </div>
    </section>
  );
}
