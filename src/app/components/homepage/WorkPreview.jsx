import Link from "next/link";
import { ArrowRight, Briefcase } from "lucide-react";
import { connectToDB } from "@/lib/mongodb";
import Work from "@/models/Work";
import { ResponsiveCarousel } from "../Carousel";
import WorkCard from "../WorkCard";

async function getFeaturedWork() {
    try {
        await connectToDB();
        const work = await Work.find({}).sort({ createdAt: -1 }).limit(6).lean();
        return JSON.parse(JSON.stringify(work));
    } catch (error) {
        console.error("Error fetching work:", error);
        return [];
    }
}

export default async function WorkPreview() {
    const featuredWork = await getFeaturedWork();

    if (featuredWork.length === 0) {
        return null;
    }

    return (
        <section id="work" className="py-12 bg-gradient-to-br from-blue-50 to-white rounded-3xl">
            <div className="text-center mb-12">
                <div className="flex items-center justify-center gap-3 mb-4">
                    <Briefcase className="text-[#1e3a8a]" size={36} />
                    <h2 className="text-4xl font-extrabold text-[#1e3a8a]">
                        वैशाली नगर में मेरा कार्य
                    </h2>
                </div>
                <p className="text-xl text-gray-600 mb-2">Work Portfolio</p>
                <div className="w-24 h-1 bg-[#1e3a8a] mx-auto"></div>
                <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
                    Development initiatives and projects transforming Vaishali Nagar constituency
                </p>
            </div>

            <div className="px-8">
                <ResponsiveCarousel autoPlay={true} interval={5000}>
                    {featuredWork.map((work) => (
                        <WorkCard key={work._id} work={work} compact={true} />
                    ))}
                </ResponsiveCarousel>
            </div>

            <div className="text-center mt-10">
                <Link
                    href="/work"
                    className="inline-flex items-center gap-2 px-8 py-4 bg-[#1e3a8a] text-white rounded-lg font-bold text-lg shadow-lg hover:bg-[#1e40af] transform hover:-translate-y-1 transition duration-300"
                >
                    View All Work
                    <ArrowRight size={20} />
                </Link>
            </div>
        </section>
    );
}
