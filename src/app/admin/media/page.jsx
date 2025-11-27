"use client";
import { useState, useEffect } from "react";
import { Plus, Trash2, Image, Video, Newspaper } from "lucide-react";
import ImageUpload from "@/components/admin/ImageUpload";

export default function MediaPage() {
    const [mediaItems, setMediaItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        date: "",
        content: "",
        mediaType: "photo",
        mediaUrl: "",
    });

    useEffect(() => {
        fetchMedia();
    }, []);

    const fetchMedia = async () => {
        try {
            const res = await fetch("/api/media");
            const data = await res.json();
            // API now returns direct array instead of wrapped object
            if (Array.isArray(data)) {
                setMediaItems(data);
            }
        } catch (error) {
            console.error("Error fetching media:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch("/api/media", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            if (res.ok) {
                setShowForm(false);
                setFormData({
                    title: "",
                    date: "",
                    content: "",
                    mediaType: "photo",
                    mediaUrl: "",
                });
                fetchMedia();
            }
        } catch (error) {
            console.error("Error creating media:", error);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm("Are you sure you want to delete this item?")) return;
        try {
            const res = await fetch(`/api/media/${id}`, {
                method: "DELETE",
            });
            if (res.ok) {
                fetchMedia();
            }
        } catch (error) {
            console.error("Error deleting media:", error);
        }
    };

    const getIcon = (type) => {
        switch (type) {
            case "video": return <Video size={20} />;
            case "news": return <Newspaper size={20} />;
            default: return <Image size={20} />;
        }
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Media Center</h1>
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="bg-[#ff9933] text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-[#e68a00] transition-colors"
                >
                    <Plus size={20} /> Add Media
                </button>
            </div>

            {showForm && (
                <div className="bg-white p-6 rounded-xl shadow-md mb-8 border border-gray-100">
                    <h2 className="text-xl font-semibold mb-4">Add Media Item</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#ff9933] focus:border-transparent"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                                <input
                                    type="date"
                                    required
                                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#ff9933] focus:border-transparent"
                                    value={formData.date}
                                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                                <select
                                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#ff9933] focus:border-transparent"
                                    value={formData.mediaType}
                                    onChange={(e) => setFormData({ ...formData, mediaType: e.target.value })}
                                >
                                    <option value="photo">Photo Gallery</option>
                                    <option value="video">Video</option>
                                    <option value="news">Press Release / News</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Media URL</label>
                                <input
                                    type="url"
                                    required
                                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#ff9933] focus:border-transparent"
                                    value={formData.mediaUrl}
                                    onChange={(e) => setFormData({ ...formData, mediaUrl: e.target.value })}
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Content / Description</label>
                            <textarea
                                rows="3"
                                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#ff9933] focus:border-transparent"
                                value={formData.content}
                                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
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
                                className="px-4 py-2 bg-[#000080] text-white rounded-lg hover:bg-blue-900"
                            >
                                Save Media
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {loading ? (
                <div className="text-center py-10">Loading...</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {mediaItems.map((item) => (
                        <div key={item._id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                            <div className="h-48 bg-gray-100 relative">
                                {item.mediaType === 'photo' || item.mediaType === 'news' ? (
                                    <img src={item.mediaUrl} alt={item.title} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-black">
                                        <iframe
                                            src={item.mediaUrl.replace("watch?v=", "embed/")}
                                            className="w-full h-full"
                                            allowFullScreen
                                        ></iframe>
                                    </div>
                                )}
                                <div className="absolute top-2 right-2 bg-white p-1 rounded-full shadow-sm">
                                    {getIcon(item.mediaType)}
                                </div>
                            </div>
                            <div className="p-4">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="font-bold text-gray-800 line-clamp-1">{item.title}</h3>
                                    <button
                                        onClick={() => handleDelete(item._id)}
                                        className="text-red-500 hover:bg-red-50 p-1 rounded-full"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                                <p className="text-xs text-gray-500 mb-2">{new Date(item.date).toLocaleDateString()}</p>
                                <p className="text-sm text-gray-600 line-clamp-2">{item.content}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
