import Link from "next/link";
import { ArrowRight, Image as ImageIcon } from "lucide-react";
import Image from "next/image";
import { connectToDB } from "@/lib/mongodb";
import PressRelease from "@/models/PressRelease";
import { ResponsiveCarousel } from "../Carousel";

async function getRecentMedia() {
    try {
        await connectToDB();
        const media = await PressRelease.find({ mediaType: 'photo' })
            .sort({ date: -1 })
            .limit(6)
            .lean();
        return JSON.parse(JSON.stringify(media));
    } catch (error) {
        console.error("Error fetching media:", error);
        return [];
    }
}

export default async function MediaPreview() {
    const mediaItems = await getRecentMedia();

    if (mediaItems.length === 0) {
        return null;
    }

    return (
        <section className="py-12">
            <div className="text-center mb-12">
                <div className="flex items-center justify-center gap-3 mb-4">
                    <ImageIcon className="text-[#1e3a8a]" size={36} />
                    <h2 className="text-4xl font-extrabold text-[#1e3a8a]">
                        Media Gallery
                    </h2>
                </div>
                <p className="text-xl text-gray-600 mb-2">मीडिया गैलरी</p>
                <div className="w-24 h-1 bg-[#1e3a8a] mx-auto"></div>
            </div>

            <div className="px-8">
                <ResponsiveCarousel autoPlay={true} interval={3000}>
                    {mediaItems.map((item) => (
                        <div
                            key={item._id}
                            className="group relative overflow-hidden rounded-xl shadow-lg aspect-video cursor-pointer"
                        >
                            <Image
                                src={item.mediaUrl}
                                alt={item.title}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                                <h3 className="text-white font-bold text-lg line-clamp-2">
                                    {item.title}
                                </h3>
                                <p className="text-gray-300 text-sm">
                                    {new Date(item.date).toLocaleDateString("en-IN", {
                                        month: "long",
                                        year: "numeric",
                                    })}
                                </p>
                            </div>
                        </div>
                    ))}
                </ResponsiveCarousel>
            </div>

            <div className="text-center mt-10">
                <Link
                    href="/media"
                    className="inline-flex items-center gap-2 px-8 py-4 bg-purple-600 text-white rounded-lg font-bold text-lg shadow-lg hover:bg-purple-700 transform hover:-translate-y-1 transition duration-300"
                >
                    Visit Media Center
                    <ArrowRight size={20} />
                </Link>
            </div>
        </section>
    );
}
