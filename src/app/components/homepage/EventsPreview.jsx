import Link from "next/link";
import { ArrowRight, Calendar, MapPin, Clock } from "lucide-react";
import { connectToDB } from "@/lib/mongodb";
import Event from "@/models/Event";
import { ResponsiveCarousel } from "../Carousel";

async function getUpcomingEvents() {
    try {
        await connectToDB();
        const events = await Event.find({ type: 'upcoming' }).sort({ date: 1 }).limit(6).lean();
        return JSON.parse(JSON.stringify(events));
    } catch (error) {
        console.error("Error fetching events:", error);
        return [];
    }
}

export default async function EventsPreview() {
    const events = await getUpcomingEvents();

    if (events.length === 0) {
        return null;
    }

    return (
        <section className="py-12">
            <div className="text-center mb-12">
                <div className="flex items-center justify-center gap-3 mb-4">
                    <Calendar className="text-[#1e3a8a]" size={36} />
                    <h2 className="text-4xl font-extrabold text-[#1e3a8a]">
                        Upcoming Events
                    </h2>
                </div>
                <p className="text-xl text-gray-600 mb-2">आगामी कार्यक्रम</p>
                <div className="w-24 h-1 bg-[#1e3a8a] mx-auto"></div>
            </div>

            <div className="px-8">
                <ResponsiveCarousel autoPlay={true} interval={4000}>
                    {events.map((event) => (
                        <div
                            key={event._id}
                            className="bg-white rounded-xl shadow-md overflow-hidden border-l-4 border-[#1e3a8a] hover:shadow-xl transition-all duration-300 h-full"
                        >
                            <div className="p-6">
                                <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                                    <span className="bg-blue-100 text-[#1e3a8a] px-3 py-1 rounded-full font-semibold">
                                        {new Date(event.date).toLocaleDateString("en-IN", {
                                            month: "short",
                                            day: "numeric",
                                        })}
                                    </span>
                                    <span>•</span>
                                    <Clock size={14} />
                                    <span>
                                        {new Date(event.date).toLocaleTimeString("en-IN", {
                                            hour: "2-digit",
                                            minute: "2-digit",
                                        })}
                                    </span>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                                    {event.title}
                                </h3>
                                <div className="flex items-center text-gray-600 mb-3">
                                    <MapPin size={16} className="mr-1 text-[#1e3a8a]" />
                                    <span className="text-sm line-clamp-1">{event.location}</span>
                                </div>
                                <p className="text-gray-600 text-sm line-clamp-3">
                                    {event.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </ResponsiveCarousel>
            </div>

            <div className="text-center mt-10">
                <Link
                    href="/events"
                    className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#1e3a8a] border-2 border-[#1e3a8a] rounded-lg font-bold text-lg shadow-md hover:bg-blue-50 transition duration-300"
                >
                    See All Events
                    <ArrowRight size={20} />
                </Link>
            </div>
        </section>
    );
}
