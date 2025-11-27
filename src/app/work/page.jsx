import { connectToDB } from "@/lib/mongodb";
import Work from "@/models/Work";
import Header from "../components/Header";
import Footer from "../components/Footer";
import WorkCard from "../components/WorkCard";
import { Search, Filter, Building2, Heart, GraduationCap, Stethoscope, Layers } from "lucide-react";

export const dynamic = 'force-dynamic';

async function getAllWork() {
    try {
        await connectToDB();
        const work = await Work.find({}).sort({ createdAt: -1 }).lean();
        return JSON.parse(JSON.stringify(work));
    } catch (error) {
        console.error("Error fetching work:", error);
        return [];
    }
}

export default async function WorkPage() {
    const allWork = await getAllWork();

    // Categorize work
    const categories = {
        infrastructure: allWork.filter(w => w.category?.toLowerCase() === 'infrastructure'),
        social: allWork.filter(w => w.category?.toLowerCase() === 'social welfare'),
        education: allWork.filter(w => w.category?.toLowerCase() === 'education'),
        health: allWork.filter(w => w.category?.toLowerCase() === 'health'),
        other: allWork.filter(w => !w.category || !['infrastructure', 'social welfare', 'education', 'health'].includes(w.category?.toLowerCase())),
    };

    const stats = [
        { icon: Building2, label: "Infrastructure", count: categories.infrastructure.length, color: "blue" },
        { icon: Heart, label: "Social Welfare", count: categories.social.length, color: "green" },
        { icon: GraduationCap, label: "Education", count: categories.education.length, color: "purple" },
        { icon: Stethoscope, label: "Health", count: categories.health.length, color: "red" },
    ];

    return (
        <>
            <Header />
            <div className="min-h-screen bg-gray-50">
                {/* Hero Section */}
                <div className="bg-gradient-to-r from-[#1e3a8a] to-[#1e40af] text-white py-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center">
                            <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
                                Work Portfolio
                            </h1>
                            <p className="text-xl text-blue-100 mb-2">
                                वैशाली नगर में विकास कार्य
                            </p>
                            <p className="text-lg text-blue-200">
                                Developmental Initiatives in Vaishali Nagar Constituency
                            </p>
                        </div>
                    </div>
                </div>

                {/* Stats Section */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
                        {stats.map((stat, idx) => (
                            <div key={idx} className="bg-white rounded-xl shadow-lg p-6 text-center transform hover:-translate-y-1 transition-all duration-200">
                                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full bg-${stat.color}-100 text-${stat.color}-600 mb-3`}>
                                    <stat.icon size={24} />
                                </div>
                                <div className="text-3xl font-bold text-gray-900 mb-1">{stat.count}</div>
                                <div className="text-sm text-gray-600">{stat.label}</div>
                            </div>
                        ))}
                    </div>

                    {/* Infrastructure Projects */}
                    {categories.infrastructure.length > 0 && (
                        <section className="mb-16">
                            <div className="flex items-center gap-3 mb-6">
                                <Building2 className="text-[#1e3a8a]" size={32} />
                                <h2 className="text-3xl font-bold text-[#1e3a8a]">Infrastructure Development</h2>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {categories.infrastructure.map((work) => (
                                    <WorkCard key={work._id} work={work} />
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Social Welfare */}
                    {categories.social.length > 0 && (
                        <section className="mb-16">
                            <div className="flex items-center gap-3 mb-6">
                                <Heart className="text-green-600" size={32} />
                                <h2 className="text-3xl font-bold text-gray-900">Social Welfare Programs</h2>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {categories.social.map((work) => (
                                    <WorkCard key={work._id} work={work} />
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Education */}
                    {categories.education.length > 0 && (
                        <section className="mb-16">
                            <div className="flex items-center gap-3 mb-6">
                                <GraduationCap className="text-purple-600" size={32} />
                                <h2 className="text-3xl font-bold text-gray-900">Education Initiatives</h2>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {categories.education.map((work) => (
                                    <WorkCard key={work._id} work={work} />
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Health */}
                    {categories.health.length > 0 && (
                        <section className="mb-16">
                            <div className="flex items-center gap-3 mb-6">
                                <Stethoscope className="text-red-600" size={32} />
                                <h2 className="text-3xl font-bold text-gray-900">Healthcare Projects</h2>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {categories.health.map((work) => (
                                    <WorkCard key={work._id} work={work} />
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Other Projects */}
                    {categories.other.length > 0 && (
                        <section className="mb-16">
                            <div className="flex items-center gap-3 mb-6">
                                <Layers className="text-gray-600" size={32} />
                                <h2 className="text-3xl font-bold text-gray-900">Other Initiatives</h2>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {categories.other.map((work) => (
                                    <WorkCard key={work._id} work={work} />
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Empty State */}
                    {allWork.length === 0 && (
                        <div className="text-center py-20 bg-white rounded-xl shadow-sm">
                            <Building2 size={64} className="mx-auto text-gray-300 mb-4" />
                            <h3 className="text-xl font-bold text-gray-700 mb-2">No Projects Yet</h3>
                            <p className="text-gray-500">Work portfolio is being updated.</p>
                        </div>
                    )}
                </div>

                <div className="pb-16"></div>
            </div>
            <Footer />
        </>
    );
}
