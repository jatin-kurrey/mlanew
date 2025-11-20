'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// A single statistic card component
const StatCard = ({ title, value, icon }) => (
    <div className="bg-white p-6 rounded-2xl shadow-lg flex items-center justify-between">
        <div>
            <p className="text-gray-500 font-medium">{title}</p>
            <p className="text-4xl font-bold text-gray-900">{value}</p>
        </div>
        <div className="text-4xl text-blue-500">{icon}</div>
    </div>
);

export default function AdminDashboard() {
    const router = useRouter();
    const [messages, setMessages] = useState([]);
    const [works, setWorks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const isAdmin = localStorage.getItem("isAdmin");
                if (!isAdmin) {
                    router.push("/admin/login");
                    return;
                }

                const [messagesRes, worksRes] = await Promise.all([
                    fetch("/api/admin/contacts"),
                    fetch("/api/work"),
                ]);

                if (!messagesRes.ok || !worksRes.ok) {
                    throw new Error("Failed to fetch data");
                }

                const messagesData = await messagesRes.json();
                const worksData = await worksRes.json();

                if (messagesData.success) setMessages(messagesData.data);
                if (worksData.success) setWorks(worksData.items);

            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [router]);

    if (loading) return <div className="text-center p-10">Loading Dashboard...</div>;
    if (error) return <div className="text-center p-10 text-red-500">Error: {error}</div>;

    return (
        <div>
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatCard title="Total Messages" value={messages.length} icon="📩" />
                <StatCard title="Complaints" value={messages.filter(m => m.type === 'Complaint').length} icon="😠" />
                <StatCard title="Suggestions" value={messages.filter(m => m.type === 'Suggestion').length} icon="💡" />
                <StatCard title="Work Items" value={works.length} icon="🏗️" />
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-lg">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Welcome to the Admin Panel</h2>
                <p className="text-gray-600">
                    Use the sidebar navigation to manage complaints, suggestions, and work portfolio items.
                </p>
            </div>

            {/* Stats Section */}
            
           
           

        </div>
    );
}
