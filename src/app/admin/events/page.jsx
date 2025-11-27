"use client";
import { useState, useEffect } from "react";
import { Plus, Trash2, Calendar, MapPin } from "lucide-react";
import ImageUpload from "@/components/admin/ImageUpload";

export default function EventsPage() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        date: "",
        location: "",
        description: "",
        type: "upcoming",
        image: "",
    });

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            const res = await fetch("/api/events");
            const data = await res.json();
            // API now returns direct array instead of wrapped object
            if (Array.isArray(data)) {
                setEvents(data);
            }
        } catch (error) {
            console.error("Error fetching events:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch("/api/events", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...formData,
                    images: formData.image ? [formData.image] : []
                }),
            });
            if (res.ok) {
                setShowForm(false);
                setFormData({
                    title: "",
                    date: "",
                    location: "",
                    description: "",
                    type: "upcoming",
                    image: "",
                });
                fetchEvents();
            }
        } catch (error) {
            console.error("Error creating event:", error);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm("Are you sure you want to delete this event?")) return;
        try {
            const res = await fetch(`/api/events/${id}`, {
                method: "DELETE",
            });
            if (res.ok) {
                fetchEvents();
            }
        } catch (error) {
            console.error("Error deleting event:", error);
        }
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Events Management</h1>
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="bg-[#1e3a8a] text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-[#e68a00] transition-colors"
                >
                    <Plus size={20} /> Add Event
                </button>
            </div>

            {showForm && (
                <div className="bg-white p-6 rounded-xl shadow-md mb-8 border border-gray-100">
                    <h2 className="text-xl font-semibold mb-4">Create New Event</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#1e3a8a] focus:border-transparent"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                                <input
                                    type="datetime-local"
                                    required
                                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#1e3a8a] focus:border-transparent"
                                    value={formData.date}
                                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#1e3a8a] focus:border-transparent"
                                    value={formData.location}
                                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                                <select
                                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#1e3a8a] focus:border-transparent"
                                    value={formData.type}
                                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                >
                                    <option value="upcoming">Upcoming</option>
                                    <option value="past">Past</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Event Image</label>
                            <ImageUpload
                                value={formData.image}
                                onChange={(url) => setFormData({ ...formData, image: url })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                            <textarea
                                required
                                rows="3"
                                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#1e3a8a] focus:border-transparent"
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            ></textarea>
                        </div>
                        <div className="flex justify-end gap-2">
                            <button
                                type="button"
                                onClick={() => setShowForm(false)}
                                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 bg-[#1e3a8a] text-white rounded-lg hover:bg-[#1e40af]"
                            >
                                Save Event
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {loading ? (
                <div className="text-center py-10">Loading...</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {events.map((event) => (
                        <div key={event._id} className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                            <div className="flex justify-between items-start mb-3">
                                <span className={`px-2 py-1 text-xs rounded-full ${event.type === 'upcoming' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                                    }`}>
                                    {event.type.toUpperCase()}
                                </span>
                                <button
                                    onClick={() => handleDelete(event._id)}
                                    className="text-red-500 hover:bg-red-50 p-1 rounded-full"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                            <h3 className="font-bold text-lg mb-2 text-gray-800">{event.title}</h3>
                            <div className="space-y-2 text-sm text-gray-600 mb-3">
                                <div className="flex items-center gap-2">
                                    <Calendar size={16} />
                                    {new Date(event.date).toLocaleDateString()}
                                </div>
                                <div className="flex items-center gap-2">
                                    <MapPin size={16} />
                                    {event.location}
                                </div>
                            </div>
                            <p className="text-gray-600 text-sm line-clamp-3">{event.description}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
