import home from '@/lib/home.json';

export default function Parichay() {
  const { parichay } = home;

  return (
    <section
      id="parichay"
      className="py-12 bg-gray-50 rounded-xl p-8 shadow-inner"
    >
      {/* Section Heading */}
      <h2 className="text-4xl font-extrabold text-gray-900 text-center"
        dangerouslySetInnerHTML={{ __html: parichay.title }}
      >
      </h2>

      <div className="w-24 h-1 bg-[#1e3a8a] mx-auto my-4"></div>

      {/* Main Content Row */}
      <div className="mt-10 lg:flex lg:space-x-10">
        {/* LEFT SIDE TEXT */}
        <div className="lg:w-2/3">
          {/* Sub-heading */}
          <h3 className="text-2xl font-bold text-[#1e3a8a] mb-4"
            dangerouslySetInnerHTML={{ __html: parichay.subtitle }}
          >
          </h3>

          <p className="text-gray-700 mb-6 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: parichay.description1 }}
          >
          </p>

          <p className="text-gray-700 mb-6 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: parichay.description2 }}
          >
          </p>

          {/* Sub-heading */}
          <h3 className="text-2xl font-bold text-[#1e3a8a] mb-4"
            dangerouslySetInnerHTML={{ __html: parichay.experienceTitle }}
          >
          </h3>

          <p className="text-gray-700 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: parichay.experienceDescription }}
          >
          </p>
        </div>

        {/* RIGHT SIDE FACTS CARD */}
        <div className="lg:w-1/3 mt-8 lg:mt-0">
          <div className="bg-[#1e3a8a] p-6 rounded-lg text-white shadow-lg">
            <h4 className="text-xl font-bold mb-3">{parichay.quickFacts.title}</h4>

            <ul className="space-y-2 text-lg">
              <li dangerouslySetInnerHTML={{ __html: parichay.quickFacts.constituency }}></li>
              <li dangerouslySetInnerHTML={{ __html: parichay.quickFacts.party }}></li>
              <li dangerouslySetInnerHTML={{ __html: parichay.quickFacts.winningMargin }}></li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
