import { MapPin, Users, Building, History } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function ConstituencyPage() {
    return (
        <>
            <Header />
            <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    {/* Hero Section */}
                    <div className="text-center mb-16">
                        <h1 className="text-4xl font-extrabold text-[#1e3a8a] mb-4">Vaishali Nagar Constituency</h1>
                        <p className="text-xl text-gray-600 mb-2">Bhilai, Durg District, Chhattisgarh</p>
                        <p className="text-lg text-[#1e3a8a] font-semibold">विकसित वैशाली नगर - समृद्ध भिलाई</p>
                    </div>

                    {/* Key Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                        {[
                            { icon: MapPin, label: "Area", value: "20 sq km", color: "blue" },
                            { icon: Users, label: "Population", value: "2.5 Lakh+", color: "green" },
                            { icon: Building, label: "Wards", value: "15", color: "blue" },
                            { icon: History, label: "Established", value: "1960s", color: "blue" }
                        ].map((stat, idx) => (
                            <div key={idx} className="bg-white p-6 rounded-xl shadow-md border-t-4 border-[#1e3a8a]">
                                <div className="flex items-center justify-between">
                                    <div className="bg-blue-100 p-3 rounded-full text-[#1e3a8a]">
                                        <stat.icon size={24} />
                                    </div>
                                </div>
                                <p className="text-gray-500 text-sm mt-3">{stat.label}</p>
                                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                            </div>
                        ))}
                    </div>

                    {/* About Section */}
                    <div className="grid lg:grid-cols-2 gap-12 mb-16">
                        <div className="bg-white p-8 rounded-xl shadow-lg">
                            <h2 className="text-2xl font-bold text-[#1e3a8a] mb-6">About Vaishali Nagar</h2>
                            <p className="text-gray-700 mb-4">
                                Vaishali Nagar is one of the most developed residential and commercial areas in Bhilai, Chhattisgarh.
                                Named after the ancient city of Vaishali, it represents the modern face of industrial Bhilai.
                            </p>
                            <p className="text-gray-700 mb-4">
                                The constituency is home to the iconic Bhilai Steel Plant (BSP), one of India&apos;s premier steel manufacturing units,
                                which has been the economic backbone of the region since the 1960s.
                            </p>
                            <p className="text-gray-700">
                                With its planned layout, green spaces, educational institutions, and healthcare facilities,
                                Vaishali Nagar stands as a model township that balances industrial growth with quality of life.
                            </p>
                        </div>

                        <div className="bg-white p-8 rounded-xl shadow-lg">
                            <h2 className="text-2xl font-bold text-[#1e3a8a] mb-6 flex items-center gap-2">
                                <MapPin className="text-[#1e3a8a]" /> Key Landmarks
                            </h2>
                            <ul className="space-y-4">
                                {[
                                    "Bhilai Steel Plant (BSP)",
                                    "Priyadarshini Parisar Sports Complex",
                                    "Rani Avanti Bai Lake",
                                    "Civic Center",
                                    "Maitri Bagh Zoo",
                                    "Government Medical College",
                                    "Ram Rasoi Centers",
                                    "Multiple Schools & Colleges"
                                ].map((landmark, idx) => (
                                    <li key={idx} className="flex items-center gap-3 text-gray-700">
                                        <span className="w-2 h-2 bg-[#1e3a8a] rounded-full"></span>
                                        {landmark}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Wards */}
                    <div className="bg-white p-8 rounded-xl shadow-lg">
                        <h2 className="text-2xl font-bold text-[#1e3a8a] mb-6">37 Wards & Key Areas</h2>
                        <p className="text-gray-600 mb-6">
                            Active &quot;Shakti Teams&quot; are deployed in all 37 wards to ensure prompt resolution of public grievances.
                        </p>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                            {[
                                "Vaishali Nagar", "Nehru Nagar", "Khursipar", "Supela", "Camp 1",
                                "Camp 2", "Power House", "Sector 1", "Sector 2", "Sector 3",
                                "Sector 4", "Sector 5", "Sector 6", "Sector 7", "Sector 8",
                                "Sector 9", "Sector 10", "Shanti Nagar", "Krishna Nagar", "Ram Nagar",
                                "Jamul", "Kohka", "Junwani", "Smriti Nagar", "Farid Nagar",
                                "Ghasidas Nagar", "Contractor Colony", "Housing Board", "Model Town", "Sunder Nagar"
                            ].map((ward, idx) => (
                                <div key={idx} className="bg-blue-50 p-3 rounded-lg text-center border border-blue-100 hover:bg-blue-100 transition-colors">
                                    <span className="text-gray-800 font-medium text-sm">{ward}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
