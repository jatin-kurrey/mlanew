const LegislativeCard = ({ title, value, subtitle, borderColor }) => (
  <div className={`bg-white p-6 rounded-xl shadow-lg border-b-4 ${borderColor}`}>
    <div className={`text-6xl font-extrabold ${borderColor.replace('border-', 'text-')}`}>{value}</div>
    <p className="mt-2 text-lg font-semibold text-gray-700">{title}</p>
    <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
  </div>
);

import home from "@/lib/home.json";

const legislativeData = home.legislative.cards.map(card => ({
  title: card.title,
  value: card.value,
  subtitle: card.subtitle,
  borderColor: "border-[#1e3a8a]",
}));

export default function Legislative() {
  return (
    <section id="legislative" className="py-12">
      <h2 className="text-4xl font-extrabold text-gray-900 text-center">
        विधानसभा रिकॉर्ड (Execution Over Debate)
      </h2>
      <div className="w-24 h-1 bg-[#1e3a8a] mx-auto my-4"></div>
      <div className="mt-10 grid gap-8 md:grid-cols-3 text-center">
        {legislativeData.map((card, index) => (
          <LegislativeCard key={index} {...card} />
        ))}
      </div>
    </section>
  );
}
