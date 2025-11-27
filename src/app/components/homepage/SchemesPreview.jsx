import Link from "next/link";
import { ArrowRight, BookOpen, CheckCircle } from "lucide-react";
import { connectToDB } from "@/lib/mongodb";
import Scheme from "@/models/Scheme";
import { ResponsiveCarousel } from "../Carousel";

async function getFeaturedSchemes() {
    try {
        await connectToDB();
        const schemes = await Scheme.find({}).sort({ createdAt: -1 }).limit(6).lean();
        return JSON.parse(JSON.stringify(schemes));
    } catch (error) {
        console.error("Error fetching schemes:", error);
        return [];
    }
}

export default async function SchemesPreview() {
    const schemes = await getFeaturedSchemes();

    if (schemes.length === 0) {
        return null;
    }

    return (
        <section className="py-12 bg-gradient-to-br from-green-50 to-white rounded-3xl">
            <div className="text-center mb-12">
                <div className="flex items-center justify-center gap-3 mb-4">
                    <BookOpen className="text-[#1e3a8a]" size={36} />
                    <h2 className="text-4xl font-extrabold text-[#1e3a8a]">
                        Government Schemes
                    </h2>
                </div>
                <p className="text-xl text-gray-600 mb-2">सरकारी योजनाएं</p>
                <div className="w-24 h-1 bg-[#1e3a8a] mx-auto"></div>
                <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
                    Access government benefits and services designed for your welfare
                </p>
            </div>

            <div className="px-8">
                <ResponsiveCarousel autoPlay={true} interval={6000}>
                    {schemes.map((scheme) => (
                        <div
                            key={scheme._id}
                            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 border-t-4 border-green-500 h-full"
                        >
                            <div className="p-6">
                                <div className="flex justify-between items-start mb-3">
                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-semibold ${scheme.category === "central"
                                                ? "bg-blue-100 text-blue-800"
                                                : scheme.category === "state"
                                                    ? "bg-green-100 text-green-800"
                                                    : "bg-orange-100 text-orange-800"
                                            }`}
                                    >
                                        {scheme.category?.toUpperCase() || "STATE"}
                                    </span>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                                    {scheme.title}
                                </h3>
                                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                                    {scheme.description}
                                </p>
                                {scheme.eligibility && (
                                    <div className="flex items-start gap-2 text-sm text-gray-700">
                                        <CheckCircle size={16} className="text-green-500 mt-0.5 shrink-0" />
                                        <p className="line-clamp-2">{scheme.eligibility}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </ResponsiveCarousel>
            </div>

            <div className="text-center mt-10">
                <Link
                    href="/schemes"
                    className="inline-flex items-center gap-2 px-8 py-4 bg-green-600 text-white rounded-lg font-bold text-lg shadow-lg hover:bg-green-700 transform hover:-translate-y-1 transition duration-300"
                >
                    Explore All Schemes
                    <ArrowRight size={20} />
                </Link>
            </div>
        </section>
    );
}
