"use client";
import { useState, useEffect } from "react";
import { Plus, Trash2, PenTool, Calendar } from "lucide-react";
import ImageUpload from "@/components/admin/ImageUpload";

export default function BlogPage() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        content: "",
        author: "MLA Rikesh Sen",
        tags: "",
        coverImage: "",
    });

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const res = await fetch("/api/blog");
            const data = await res.json();
            // API now returns direct array instead of wrapped object
            if (Array.isArray(data)) {
                setPosts(data);
            }
        } catch (error) {
            console.error("Error fetching posts:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const tagsArray = formData.tags.split(",").map(tag => tag.trim());
            const res = await fetch("/api/blog", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...formData, tags: tagsArray }),
            });
            if (res.ok) {
                setShowForm(false);
                setFormData({
                    title: "",
                    content: "",
                    author: "MLA Rikesh Sen",
                    tags: "",
                    coverImage: "",
                });
                fetchPosts();
            }
        } catch (error) {
            console.error("Error creating post:", error);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm("Are you sure you want to delete this post?")) return;
        try {
            const res = await fetch(`/api/blog/${id}`, {
                method: "DELETE",
            });
            if (res.ok) {
                fetchPosts();
            }
        } catch (error) {
            console.error("Error deleting post:", error);
        }
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Blog Management</h1>
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="bg-[#1e3a8a] text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-[#e68a00] transition-colors"
                >
                    <Plus size={20} /> Write Article
                </button>
            </div>

            {showForm && (
                <div className="bg-white p-6 rounded-xl shadow-md mb-8 border border-gray-100">
                    <h2 className="text-xl font-semibold mb-4">New Blog Post</h2>
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
                                <label className="block text-sm font-medium text-gray-700 mb-1">Author</label>
                                <input
                                    type="text"
                                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#1e3a8a] focus:border-transparent"
                                    value={formData.author}
                                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Cover Image</label>
                                {/* Assuming ImageUpload component is defined elsewhere or imported */}
                                <ImageUpload
                                    value={formData.coverImage}
                                    onChange={(url) => setFormData({ ...formData, coverImage: url })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Tags (comma separated)</label>
                                <input
                                    type="text"
                                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#1e3a8a] focus:border-transparent"
                                    value={formData.tags}
                                    onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
                            <textarea
                                required
                                rows="10"
                                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#1e3a8a] focus:border-transparent font-mono text-sm"
                                value={formData.content}
                                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                placeholder="Write your article content here..."
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
                                Publish Post
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {loading ? (
                <div className="text-center py-10">Loading...</div>
            ) : (
                <div className="space-y-6">
                    {posts.map((post) => (
                        <div key={post._id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="text-xl font-bold text-gray-800 mb-1">{post.title}</h3>
                                    <div className="flex items-center gap-4 text-sm text-gray-500">
                                        <span className="flex items-center gap-1"><PenTool size={14} /> {post.author}</span>
                                        <span className="flex items-center gap-1"><Calendar size={14} /> {new Date(post.publishDate).toLocaleDateString()}</span>
                                    </div>
                                </div>
                                <button
                                    onClick={() => handleDelete(post._id)}
                                    className="text-red-500 hover:bg-red-50 p-2 rounded-full"
                                >
                                    <Trash2 size={20} />
                                </button>
                            </div>
                            <p className="text-gray-600 mb-4 line-clamp-3">{post.content}</p>
                            <div className="flex gap-2">
                                {post.tags.map((tag, index) => (
                                    <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
