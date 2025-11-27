import { MapPin, Users, Building, History } from "lucide-react";

export default function ConstituencyPage() {
    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-extrabold text-[#ff9933] mb-4">Vaishali Nagar Constituency</h1>
                    <p className="text-xl text-gray-600">Know your constituency: History, Demographics, and Development.</p>
                </div>

                {/* Overview Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <div className="bg-white p-6 rounded-xl shadow-md border-t-4 border-[#000080]">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="bg-blue-100 p-3 rounded-full text-[#000080]">
                                <Users size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-gray-800">Demographics</h3>
                        </div>
                        <p className="text-gray-600">
                            Vaishali Nagar is a vibrant constituency with a diverse population. It is known for its educated demographic and active citizen participation.
                        </p>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-md border-t-4 border-[#ff9933]">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="bg-orange-100 p-3 rounded-full text-[#ff9933]">
                                <History size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-gray-800">History</h3>
                        </div>
                        <p className="text-gray-600">
                            Established as a key residential and commercial hub, Vaishali Nagar has grown significantly over the last two decades, becoming a model for urban development.
                        </p>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-md border-t-4 border-green-600">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="bg-green-100 p-3 rounded-full text-green-600">
                                <Building size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-gray-800">Key Landmarks</h3>
                        </div>
                        <ul className="text-gray-600 list-disc list-inside space-y-1">
                            <li>Civic Center</li>
                            <li>Major Public Parks</li>
                            <li>Educational Institutions</li>
                            <li>Healthcare Centers</li>
                        </ul>
                    </div>
                </div>

                {/* Map Section (Placeholder) */}
                <section className="bg-white rounded-2xl shadow-lg overflow-hidden mb-12">
                    <div className="p-8">
                        <h2 className="text-2xl font-bold text-[#000080] mb-6 flex items-center gap-2">
                            <MapPin className="text-[#ff9933]" /> Constituency Map
                        </h2>
                        <div className="aspect-video bg-gray-200 rounded-xl flex items-center justify-center text-gray-500">
                            <div className="text-center">
                                <MapPin size={48} className="mx-auto mb-2 opacity-50" />
                                <p>Interactive Map Integration Coming Soon</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Wards List */}
                <section>
                    <h2 className="text-2xl font-bold text-[#000080] mb-6">Wards & Areas</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {['Ward 1', 'Ward 2', 'Ward 3', 'Ward 4', 'Ward 5', 'Ward 6', 'Ward 7', 'Ward 8'].map((ward, index) => (
                            <div key={index} className="bg-white p-4 rounded-lg shadow-sm text-center hover:bg-blue-50 transition-colors cursor-pointer border border-gray-100">
                                <span className="font-semibold text-gray-700">{ward}</span>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}
