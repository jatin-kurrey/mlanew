import { Calendar, MapPin, Clock } from "lucide-react";
import { connectToDB } from "@/lib/mongodb";
import Event from "@/models/Event";

export const dynamic = 'force-dynamic';

async function getEvents() {
    try {
        await connectToDB();
        const events = await Event.find({}).sort({ date: 1 }).lean();
        return JSON.parse(JSON.stringify(events));
    } catch (error) {
        console.error("Error fetching events:", error);
        return [];
    }
}

export default async function EventsPage() {
    const events = await getEvents();
    const upcomingEvents = events.filter(e => e.type === 'upcoming');
    const pastEvents = events.filter(e => e.type === 'past').reverse();

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-extrabold text-[#ff9933] mb-4">Events & Schedule</h1>
                    <p className="text-xl text-gray-600">Join us in our journey of development and public service.</p>
                </div>

                {/* Upcoming Events */}
                <section className="mb-16">
                    <h2 className="text-2xl font-bold text-[#000080] mb-6 flex items-center gap-2">
                        <Calendar className="text-[#ff9933]" /> Upcoming Events
                    </h2>
                    {upcomingEvents.length > 0 ? (
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {upcomingEvents.map((event) => (
                                <div key={event._id} className="bg-white rounded-xl shadow-lg overflow-hidden border-t-4 border-[#ff9933] hover:shadow-xl transition-shadow">
                                    <div className="p-6">
                                        <div className="flex items-center text-sm text-gray-500 mb-4">
                                            <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full font-medium">
                                                {new Date(event.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                                            </span>
                                            <span className="mx-2">•</span>
                                            <span className="flex items-center gap-1">
                                                <Clock size={14} />
                                                {new Date(event.date).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}
                                            </span>
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-2">{event.title}</h3>
                                        <div className="flex items-center text-gray-600 mb-4">
                                            <MapPin size={16} className="mr-1 text-[#000080]" />
                                            {event.location}
                                        </div>
                                        <p className="text-gray-600 line-clamp-3">{event.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="bg-white p-8 rounded-xl shadow-sm text-center text-gray-500">
                            No upcoming events scheduled at the moment.
                        </div>
                    )}
                </section>

                {/* Past Events */}
                <section>
                    <h2 className="text-2xl font-bold text-gray-700 mb-6 flex items-center gap-2">
                        <Clock className="text-gray-500" /> Past Events
                    </h2>
                    <div className="space-y-4">
                        {pastEvents.map((event) => (
                            <div key={event._id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row md:items-center gap-4">
                                <div className="md:w-1/4">
                                    <span className="text-gray-500 font-medium block">
                                        {new Date(event.date).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                                    </span>
                                    <span className="text-sm text-gray-400 flex items-center gap-1 mt-1">
                                        <MapPin size={14} /> {event.location}
                                    </span>
                                </div>
                                <div className="md:w-3/4">
                                    <h3 className="text-lg font-bold text-gray-800 mb-1">{event.title}</h3>
                                    <p className="text-gray-600 text-sm">{event.description}</p>
                                </div>
                            </div>
                        ))}
                        {pastEvents.length === 0 && (
                            <div className="text-center text-gray-500 py-8">No past events found.</div>
                        )}
                    </div>
                </section>
            </div>
        </div>
    );
}
