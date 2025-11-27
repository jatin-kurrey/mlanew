import { BookOpen, CheckCircle, FileText, ExternalLink } from "lucide-react";
import { connectToDB } from "@/lib/mongodb";
import Scheme from "@/models/Scheme";

export const dynamic = 'force-dynamic';

async function getSchemes() {
    try {
        await connectToDB();
        const schemes = await Scheme.find({}).sort({ createdAt: -1 }).lean();
        return JSON.parse(JSON.stringify(schemes));
    } catch (error) {
        console.error("Error fetching schemes:", error);
        return [];
    }
}

export default async function SchemesPage() {
    const schemes = await getSchemes();
    const centralSchemes = schemes.filter(s => s.category === 'central');
    const stateSchemes = schemes.filter(s => s.category === 'state');
    const localSchemes = schemes.filter(s => s.category === 'local');

    const SchemeCard = ({ scheme }) => (
        <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 border border-gray-100">
            <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-gray-900">{scheme.title}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${scheme.category === 'central' ? 'bg-blue-100 text-blue-800' :
                            scheme.category === 'state' ? 'bg-green-100 text-green-800' :
                                'bg-orange-100 text-orange-800'
                        }`}>
                        {scheme.category.toUpperCase()}
                    </span>
                </div>

                <p className="text-gray-600 mb-6">{scheme.description}</p>

                <div className="space-y-3 mb-6">
                    {scheme.eligibility && (
                        <div className="flex items-start gap-2 text-sm text-gray-700">
                            <CheckCircle size={16} className="text-green-500 mt-0.5 shrink-0" />
                            <div>
                                <span className="font-semibold">Eligibility:</span> {scheme.eligibility}
                            </div>
                        </div>
                    )}
                    {scheme.documents && (
                        <div className="flex items-start gap-2 text-sm text-gray-700">
                            <FileText size={16} className="text-blue-500 mt-0.5 shrink-0" />
                            <div>
                                <span className="font-semibold">Documents:</span> {scheme.documents}
                            </div>
                        </div>
                    )}
                </div>

                {scheme.applyLink && (
                    <a
                        href={scheme.applyLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center w-full px-4 py-2 bg-[#000080] text-white rounded-lg hover:bg-blue-900 transition-colors gap-2 font-medium"
                    >
                        Apply Now <ExternalLink size={16} />
                    </a>
                )}
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-extrabold text-[#ff9933] mb-4">Citizen Services & Schemes</h1>
                    <p className="text-xl text-gray-600">Access government benefits and services designed for your welfare.</p>
                </div>

                {stateSchemes.length > 0 && (
                    <section className="mb-16">
                        <h2 className="text-2xl font-bold text-[#000080] mb-6 border-b-2 border-[#ff9933] pb-2 inline-block">
                            State Government Schemes
                        </h2>
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {stateSchemes.map(scheme => <SchemeCard key={scheme._id} scheme={scheme} />)}
                        </div>
                    </section>
                )}

                {centralSchemes.length > 0 && (
                    <section className="mb-16">
                        <h2 className="text-2xl font-bold text-[#000080] mb-6 border-b-2 border-[#ff9933] pb-2 inline-block">
                            Central Government Schemes
                        </h2>
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {centralSchemes.map(scheme => <SchemeCard key={scheme._id} scheme={scheme} />)}
                        </div>
                    </section>
                )}

                {localSchemes.length > 0 && (
                    <section>
                        <h2 className="text-2xl font-bold text-[#000080] mb-6 border-b-2 border-[#ff9933] pb-2 inline-block">
                            Local Initiatives
                        </h2>
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {localSchemes.map(scheme => <SchemeCard key={scheme._id} scheme={scheme} />)}
                        </div>
                    </section>
                )}

                {schemes.length === 0 && (
                    <div className="text-center py-20 bg-white rounded-xl shadow-sm">
                        <BookOpen size={48} className="mx-auto text-gray-300 mb-4" />
                        <p className="text-gray-500 text-lg">No schemes listed currently. Please check back later.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
