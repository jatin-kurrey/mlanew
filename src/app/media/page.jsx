import { Image, Video, Newspaper } from "lucide-react";
import { connectToDB } from "@/lib/mongodb";
import PressRelease from "@/models/PressRelease";
import Header from "../components/Header";
import Footer from "../components/Footer";

export const dynamic = 'force-dynamic';

async function getMedia() {
    try {
        await connectToDB();
        const media = await PressRelease.find({}).sort({ date: -1 }).lean();
        return JSON.parse(JSON.stringify(media));
    } catch (error) {
        console.error("Error fetching media:", error);
        return [];
    }
}

export default async function MediaPage() {
    const mediaItems = await getMedia();
    const photos = mediaItems.filter(m => m.mediaType === 'photo');
    const videos = mediaItems.filter(m => m.mediaType === 'video');
    const news = mediaItems.filter(m => m.mediaType === 'news');

    return (
        <>
            <Header />
            <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-extrabold text-[#1e3a8a] mb-4">Media & Press Center</h1>
                        <p className="text-xl text-gray-600">Latest updates, press releases, and gallery.</p>
                    </div>

                    {/* Photo Gallery */}
                    {photos.length > 0 && (
                        <section className="mb-16">
                            <h2 className="text-2xl font-bold text-[#1e3a8a] mb-6 flex items-center gap-2">
                                <Image className="text-[#1e3a8a]" /> Photo Gallery
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {photos.map((item) => (
                                    <div key={item._id} className="group relative overflow-hidden rounded-xl shadow-lg aspect-video cursor-pointer">
                                        <img
                                            src={item.mediaUrl}
                                            alt={item.title}
                                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                                            <h3 className="text-white font-bold text-lg">{item.title}</h3>
                                            <p className="text-gray-300 text-sm">{new Date(item.date).toLocaleDateString()}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Video Gallery */}
                    {videos.length > 0 && (
                        <section className="mb-16">
                            <h2 className="text-2xl font-bold text-[#1e3a8a] mb-6 flex items-center gap-2">
                                <Video className="text-[#1e3a8a]" /> Video Gallery
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {videos.map((item) => (
                                    <div key={item._id} className="bg-white rounded-xl shadow-lg overflow-hidden">
                                        <div className="aspect-video">
                                            <iframe
                                                src={item.mediaUrl.replace("watch?v=", "embed/")}
                                                className="w-full h-full"
                                                allowFullScreen
                                                title={item.title}
                                            ></iframe>
                                        </div>
                                        <div className="p-4">
                                            <h3 className="font-bold text-lg text-gray-800 mb-1">{item.title}</h3>
                                            <p className="text-sm text-gray-500">{new Date(item.date).toLocaleDateString()}</p>
                                            {item.content && <p className="text-gray-600 mt-2 text-sm">{item.content}</p>}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Press Releases / News */}
                    {news.length > 0 && (
                        <section>
                            <h2 className="text-2xl font-bold text-[#1e3a8a] mb-6 flex items-center gap-2">
                                <Newspaper className="text-[#1e3a8a]" /> In The News
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                {news.map((item) => (
                                    <div key={item._id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow border border-gray-100">
                                        <div className="h-48 overflow-hidden">
                                            <img
                                                src={item.mediaUrl}
                                                alt={item.title}
                                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                            />
                                        </div>
                                        <div className="p-4">
                                            <span className="text-xs font-medium text-[#1e3a8a] uppercase tracking-wider">Press Release</span>
                                            <h3 className="font-bold text-gray-900 mt-1 mb-2 line-clamp-2">{item.title}</h3>
                                            <p className="text-xs text-gray-500 mb-3">{new Date(item.date).toLocaleDateString()}</p>
                                            <p className="text-sm text-gray-600 line-clamp-3">{item.content}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {mediaItems.length === 0 && (
                        <div className="text-center py-20 bg-white rounded-xl shadow-sm">
                            <p className="text-gray-500 text-lg">Media gallery is being updated.</p>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
}
