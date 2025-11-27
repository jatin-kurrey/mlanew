"use client";
import { useState, useEffect } from "react";
import { Save, User } from "lucide-react";
import ImageUpload from "@/components/admin/ImageUpload";

export default function ProfilePage() {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [formData, setFormData] = useState({
        heroTitle: "",
        heroSubtitle: "",
        heroImage: "",
        mlaName: "",
        mlaDesignation: "",
        contactEmail: "",
        contactPhone: "",
        socialLinks: {
            facebook: "",
            twitter: "",
            instagram: "",
            youtube: "",
        },
    });

    useEffect(() => {
        fetchConfig();
    }, []);

    const fetchConfig = async () => {
        try {
            const res = await fetch("/api/site-config");
            const data = await res.json();
            if (data.success) {
                setFormData(data.data);
            }
        } catch (error) {
            console.error("Error fetching config:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            const res = await fetch("/api/site-config", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            if (res.ok) {
                alert("Profile updated successfully!");
            } else {
                alert("Failed to update profile.");
            }
        } catch (error) {
            console.error("Error updating profile:", error);
            alert("Error updating profile.");
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="p-6">Loading...</div>;

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <User className="text-[#ff9933]" /> Profile & Site Configuration
            </h1>

            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-md border border-gray-100 space-y-6">

                {/* Hero Section */}
                <div className="space-y-4">
                    <h2 className="text-xl font-semibold text-[#000080] border-b pb-2">Landing Page (Hero Section)</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Hero Title</label>
                                <input
                                    type="text"
                                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#ff9933] outline-none"
                                    value={formData.heroTitle}
                                    onChange={(e) => setFormData({ ...formData, heroTitle: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Hero Subtitle</label>
                                <textarea
                                    rows="3"
                                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#ff9933] outline-none"
                                    value={formData.heroSubtitle}
                                    onChange={(e) => setFormData({ ...formData, heroSubtitle: e.target.value })}
                                ></textarea>
                            </div>
                        </div>

                        <div>
                            <ImageUpload
                                label="Hero Image"
                                value={formData.heroImage}
                                onChange={(url) => setFormData({ ...formData, heroImage: url })}
                            />
                        </div>
                    </div>
                </div>

                {/* Personal Info */}
                <div className="space-y-4 pt-4">
                    <h2 className="text-xl font-semibold text-[#000080] border-b pb-2">Personal Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">MLA Name</label>
                            <input
                                type="text"
                                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#ff9933] outline-none"
                                value={formData.mlaName}
                                onChange={(e) => setFormData({ ...formData, mlaName: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Designation</label>
                            <input
                                type="text"
                                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#ff9933] outline-none"
                                value={formData.mlaDesignation}
                                onChange={(e) => setFormData({ ...formData, mlaDesignation: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Contact Email</label>
                            <input
                                type="email"
                                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#ff9933] outline-none"
                                value={formData.contactEmail}
                                onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Contact Phone</label>
                            <input
                                type="text"
                                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#ff9933] outline-none"
                                value={formData.contactPhone}
                                onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                            />
                        </div>
                    </div>
                </div>

                <div className="pt-6 flex justify-end">
                    <button
                        type="submit"
                        disabled={saving}
                        className="bg-[#000080] text-white px-6 py-2 rounded-lg font-bold hover:bg-blue-900 transition-colors flex items-center gap-2 disabled:opacity-70"
                    >
                        {saving ? "Saving..." : <><Save size={20} /> Save Changes</>}
                    </button>
                </div>
            </form>
        </div>
    );
}
