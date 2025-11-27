"use client";
import { useState, useEffect } from "react";
import { Plus, Trash2, BookOpen, Link as LinkIcon } from "lucide-react";

export default function SchemesPage() {
    const [schemes, setSchemes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        eligibility: "",
        documents: "",
        applyLink: "",
        category: "state",
    });

    useEffect(() => {
        fetchSchemes();
    }, []);

    const fetchSchemes = async () => {
        try {
            const res = await fetch("/api/schemes");
            const data = await res.json();
            // API now returns direct array instead of wrapped object
            if (Array.isArray(data)) {
                setSchemes(data);
            }
        } catch (error) {
            console.error("Error fetching schemes:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch("/api/schemes", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            if (res.ok) {
                setShowForm(false);
                setFormData({
                    title: "",
                    description: "",
                    eligibility: "",
                    documents: "",
                    applyLink: "",
                    category: "state",
                });
                fetchSchemes();
            }
        } catch (error) {
            console.error("Error creating scheme:", error);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm("Are you sure you want to delete this scheme?")) return;
        try {
            const res = await fetch(`/api/schemes/${id}`, {
                method: "DELETE",
            });
            if (res.ok) {
                fetchSchemes();
            }
        } catch (error) {
            console.error("Error deleting scheme:", error);
        }
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Schemes Management</h1>
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="bg-[#ff9933] text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-[#e68a00] transition-colors"
                >
                    <Plus size={20} /> Add Scheme
                </button>
            </div>

            {showForm && (
                <div className="bg-white p-6 rounded-xl shadow-md mb-8 border border-gray-100">
                    <h2 className="text-xl font-semibold mb-4">Add New Scheme</h2>
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
                                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                                <select
                                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#ff9933] focus:border-transparent"
                                    value={formData.category}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                >
                                    <option value="central">Central Govt</option>
                                    <option value="state">State Govt</option>
                                    <option value="local">Local Body</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Eligibility</label>
                                <input
                                    type="text"
                                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#ff9933] focus:border-transparent"
                                    value={formData.eligibility}
                                    onChange={(e) => setFormData({ ...formData, eligibility: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Apply Link</label>
                                <input
                                    type="url"
                                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#ff9933] focus:border-transparent"
                                    value={formData.applyLink}
                                    onChange={(e) => setFormData({ ...formData, applyLink: e.target.value })}
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Required Documents</label>
                            <input
                                type="text"
                                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#ff9933] focus:border-transparent"
                                placeholder="Comma separated list"
                                value={formData.documents}
                                onChange={(e) => setFormData({ ...formData, documents: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                            <textarea
                                required
                                rows="3"
                                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#ff9933] focus:border-transparent"
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
                                className="px-4 py-2 bg-[#000080] text-white rounded-lg hover:bg-blue-900"
                            >
                                Save Scheme
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {loading ? (
                <div className="text-center py-10">Loading...</div>
            ) : (
                <div className="space-y-4">
                    {schemes.map((scheme) => (
                        <div key={scheme._id} className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex justify-between items-start">
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                    <h3 className="font-bold text-lg text-gray-800">{scheme.title}</h3>
                                    <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full capitalize">
                                        {scheme.category}
                                    </span>
                                </div>
                                <p className="text-gray-600 text-sm mb-3">{scheme.description}</p>
                                <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                                    {scheme.eligibility && (
                                        <div className="flex items-center gap-1">
                                            <span className="font-medium">Eligibility:</span> {scheme.eligibility}
                                        </div>
                                    )}
                                    {scheme.applyLink && (
                                        <a href={scheme.applyLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-[#ff9933] hover:underline">
                                            <LinkIcon size={14} /> Apply Online
                                        </a>
                                    )}
                                </div>
                            </div>
                            <button
                                onClick={() => handleDelete(scheme._id)}
                                className="text-red-500 hover:bg-red-50 p-2 rounded-full ml-4"
                            >
                                <Trash2 size={20} />
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
