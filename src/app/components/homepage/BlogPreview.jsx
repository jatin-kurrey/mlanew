import Link from "next/link";
import { ArrowRight, FileText, Calendar, User } from "lucide-react";
import { connectToDB } from "@/lib/mongodb";
import BlogPost from "@/models/BlogPost";

async function getLatestPosts() {
    try {
        await connectToDB();
        const posts = await BlogPost.find({}).sort({ publishDate: -1 }).limit(3).lean();
        return JSON.parse(JSON.stringify(posts));
    } catch (error) {
        console.error("Error fetching posts:", error);
        return [];
    }
}

export default async function BlogPreview() {
    const posts = await getLatestPosts();

    if (posts.length === 0) {
        return null;
    }

    return (
        <section className="py-12 bg-gradient-to-br from-orange-50 to-white rounded-3xl">
            <div className="text-center mb-12">
                <div className="flex items-center justify-center gap-3 mb-4">
                    <FileText className="text-[#1e3a8a]" size={36} />
                    <h2 className="text-4xl font-extrabold text-[#1e3a8a]">
                        MLA&apos;s Desk
                    </h2>
                </div>
                <p className="text-xl text-gray-600 mb-2">विधायक का संदेश</p>
                <div className="w-24 h-1 bg-[#1e3a8a] mx-auto"></div>
                <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
                    Thoughts, articles, and updates directly from MLA Rikesh Sen
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
                {posts.map((post) => (
                    <article
                        key={post._id}
                        className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100"
                    >
                        <div className="p-6">
                            <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 mb-4">
                                <span className="flex items-center gap-1 bg-blue-50 text-[#1e3a8a] px-3 py-1 rounded-full font-medium">
                                    <User size={14} />
                                    {post.author}
                                </span>
                                <span className="flex items-center gap-1">
                                    <Calendar size={14} />
                                    {new Date(post.publishDate).toLocaleDateString("en-IN", {
                                        month: "short",
                                        day: "numeric",
                                    })}
                                </span>
                            </div>

                            <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                                {post.title}
                            </h3>

                            <p className="text-gray-600 text-sm leading-relaxed line-clamp-4 mb-4">
                                {post.content.substring(0, 200)}...
                            </p>

                            <Link
                                href="/blog"
                                className="inline-flex items-center text-[#1e3a8a] font-semibold text-sm hover:underline"
                            >
                                Read More →
                            </Link>
                        </div>
                    </article>
                ))}
            </div>

            <div className="text-center mt-10">
                <Link
                    href="/blog"
                    className="inline-flex items-center gap-2 px-8 py-4 bg-orange-600 text-white rounded-lg font-bold text-lg shadow-lg hover:bg-orange-700 transform hover:-translate-y-1 transition duration-300"
                >
                    Read All Articles
                    <ArrowRight size={20} />
                </Link>
            </div>
        </section>
    );
}
