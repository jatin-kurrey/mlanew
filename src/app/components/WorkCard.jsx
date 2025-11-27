import Image from "next/image";
import Link from "next/link";
import { Calendar, MapPin, Tag } from "lucide-react";

export default function WorkCard({ work, compact = false }) {
    const statusColors = {
        completed: "bg-green-100 text-green-800 border-green-200",
        ongoing: "bg-blue-100 text-blue-800 border-blue-200",
        proposed: "bg-orange-100 text-orange-800 border-orange-200",
    };

    const statusColor = statusColors[work.status?.toLowerCase()] || statusColors.ongoing;

    if (compact) {
        // Compact version for carousel
        return (
            <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 h-full border border-gray-100">
                {work.imageUrl && (
                    <div className="relative h-48 overflow-hidden">
                        <Image
                            src={work.imageUrl}
                            alt={work.title}
                            fill
                            className="object-cover transition-transform duration-300 hover:scale-110"
                        />
                        <div className="absolute top-3 right-3">
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${statusColor}`}>
                                {work.status || "Ongoing"}
                            </span>
                        </div>
                    </div>
                )}
                <div className="p-5">
                    <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                        {work.title}
                    </h3>
                    {work.location && (
                        <div className="flex items-center text-sm text-gray-600 mb-3">
                            <MapPin size={14} className="mr-1 text-[#1e3a8a]" />
                            <span className="line-clamp-1">{work.location}</span>
                        </div>
                    )}
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                        {work.description}
                    </p>
                    <Link
                        href="/work"
                        className="inline-flex items-center text-[#1e3a8a] font-semibold text-sm hover:underline"
                    >
                        Learn More →
                    </Link>
                </div>
            </div>
        );
    }

    // Full version for work page
    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100">
            {work.imageUrl && (
                <div className="relative h-64 overflow-hidden">
                    <Image
                        src={work.imageUrl}
                        alt={work.title}
                        fill
                        className="object-cover"
                    />
                    <div className="absolute top-4 right-4">
                        <span className={`px-4 py-2 rounded-full text-sm font-bold border-2 shadow-lg ${statusColor}`}>
                            {work.status || "Ongoing"}
                        </span>
                    </div>
                </div>
            )}
            <div className="p-6">
                <div className="flex flex-wrap gap-2 mb-4">
                    {work.category && (
                        <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-50 text-[#1e3a8a] rounded-full text-xs font-medium">
                            <Tag size={12} />
                            {work.category}
                        </span>
                    )}
                    {work.completionDate && (
                        <span className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
                            <Calendar size={12} />
                            {new Date(work.completionDate).toLocaleDateString("en-IN", {
                                month: "short",
                                year: "numeric",
                            })}
                        </span>
                    )}
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mb-3">{work.title}</h3>

                {work.location && (
                    <div className="flex items-center text-gray-600 mb-4">
                        <MapPin size={16} className="mr-2 text-[#1e3a8a]" />
                        <span>{work.location}</span>
                    </div>
                )}

                <p className="text-gray-700 leading-relaxed mb-4">{work.description}</p>

                <div className="border-t border-gray-100 pt-4 mt-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                        {work.budget && (
                            <div>
                                <span className="text-gray-500 block mb-1">Budget</span>
                                <span className="font-semibold text-gray-900">{work.budget}</span>
                            </div>
                        )}
                        {work.beneficiaries && (
                            <div>
                                <span className="text-gray-500 block mb-1">Beneficiaries</span>
                                <span className="font-semibold text-gray-900">{work.beneficiaries}</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
