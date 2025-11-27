import Image from "next/image";
import { Calendar, User, Tag } from "lucide-react";
import { connectToDB } from "@/lib/mongodb";
import BlogPost from "@/models/BlogPost";

export const dynamic = 'force-dynamic';

async function getPosts() {
    try {
        await connectToDB();
        const posts = await BlogPost.find({}).sort({ publishDate: -1 }).lean();
        return JSON.parse(JSON.stringify(posts));
    } catch (error) {
        console.error("Error fetching posts:", error);
        return [];
    }
}

export default async function BlogPage() {
    const posts = await getPosts();

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-extrabold text-[#ff9933] mb-4">MLA&apos;s Desk</h1>
                    <p className="text-xl text-gray-600">Thoughts, articles, and updates directly from MLA Rikesh Sen.</p>
                </div>

                <div className="space-y-12">
                    {posts.map((post) => (
                        <article key={post._id} className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-shadow">
                            {post.coverImage && (
                                <div className="h-64 sm:h-80 w-full overflow-hidden relative">
                                    <Image
                                        src={post.coverImage}
                                        alt={post.title}
                                        fill
                                        className="object-cover hover:scale-105 transition-transform duration-500"
                                    />
                                </div>
                            )}
                            <div className="p-6 sm:p-8">
                                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-4">
                                    <span className="flex items-center gap-1 bg-blue-50 text-blue-700 px-3 py-1 rounded-full">
                                        <User size={14} /> {post.author}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <Calendar size={14} /> {new Date(post.publishDate).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                                    </span>
                                </div>

                                <h2 className="text-3xl font-bold text-gray-900 mb-4">{post.title}</h2>

                                <div className="prose prose-lg text-gray-700 max-w-none mb-6 whitespace-pre-wrap">
                                    {post.content}
                                </div>

                                {post.tags && post.tags.length > 0 && (
                                    <div className="flex flex-wrap gap-2 pt-6 border-t border-gray-100">
                                        <Tag size={16} className="text-gray-400 mt-1" />
                                        {post.tags.map((tag, index) => (
                                            <span key={index} className="text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded hover:bg-gray-200 transition-colors">
                                                #{tag}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </article>
                    ))}

                    {posts.length === 0 && (
                        <div className="text-center py-20 bg-white rounded-xl shadow-sm">
                            <p className="text-gray-500 text-lg">No articles published yet.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
