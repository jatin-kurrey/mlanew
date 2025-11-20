const LegislativeCard = ({ title, value, subtitle, borderColor }) => (
  <div className={`bg-white p-6 rounded-xl shadow-lg border-b-4 ${borderColor}`}>
    <div className={`text-6xl font-extrabold ${borderColor.replace('border-', 'text-')}`}>{value}</div>
    <p className="mt-2 text-lg font-semibold text-gray-700">{title}</p>
    <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
  </div>
);

const legislativeData = [
  {
    title: "Assembly Attendance",
    value: "100%",
    subtitle: "कर्तव्यों के प्रति अटूट समर्पण",
    borderColor: "border-[#000080]",
  },
  {
    title: "Focus on Implementation",
    value: "Execution",
    subtitle: "सवाल नहीं — सीधे समाधान",
    borderColor: "border-[#ff9933]",
  },
  {
    title: "Strong Policy Alignment",
    value: "Budget",
    subtitle: "PM आवास और महतारी वंदन योजना हेतु फंडिंग सुनिश्चित",
    borderColor: "border-[#000080]",
  },
];

export default function Legislative() {
  return (
    <section id="legislative" className="py-12">
      <h2 className="text-4xl font-extrabold text-gray-900 text-center">
        विधानसभा रिकॉर्ड (Execution Over Debate)
      </h2>
      <div className="w-24 h-1 bg-[#000080] mx-auto my-4"></div>
      <div className="mt-10 grid gap-8 md:grid-cols-3 text-center">
        {legislativeData.map((card, index) => (
          <LegislativeCard key={index} {...card} />
        ))}
      </div>
    </section>
  );
}
