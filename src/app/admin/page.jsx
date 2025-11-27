"use client";

import { useEffect, useState } from "react";

/**
 * ADMIN DASHBOARD (FULL WORKING)
 * Path: src/app/admin/page.jsx
 *
 * ✔ Fetches stats live from /api/contact & /api/work
 * ✔ Shows total complaints, pending, resolved
 * ✔ Shows total works
 * ✔ Shows recent 5 complaints
 * ✔ Shows recent 5 works
 * ✔ Fully responsive and professional
 */

export default function AdminDashboard() {
  const [complaints, setComplaints] = useState([]);
  const [works, setWorks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  async function loadStats() {
    setLoading(true);
    try {
      const contactRes = await fetch("/api/contact", { cache: "no-store" });
      const workRes = await fetch("/api/work", { cache: "no-store" });

      const contactData = await contactRes.json();
      const workData = await workRes.json();

      setComplaints(Array.isArray(contactData) ? contactData : []);
      setWorks(Array.isArray(workData) ? workData : []);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  }

  // Stats
  const totalComplaints = complaints.length;
  const resolvedCount = complaints.filter((c) => c.status === "resolved").length;
  const pendingCount = complaints.filter((c) => c.status !== "resolved").length;

  return (
    <div className="space-y-8">

      {/* Dashboard Title */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Overview</h2>
        <p className="text-gray-500">Welcome back, here&apos;s what&apos;s happening today.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

        <Card title="Total Complaints" value={totalComplaints} color="blue" icon="inbox" />

        <Card title="Pending Action" value={pendingCount} color="amber" icon="clock" />

        <Card title="Resolved Cases" value={resolvedCount} color="green" icon="check" />

        <Card title="Total Works" value={works.length} color="purple" icon="briefcase" />

      </div>

      {/* 2 Column Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* Recent Complaints */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex justify-between items-center">
            <h3 className="text-lg font-bold text-gray-800">Recent Complaints</h3>
            <a href="/admin/complaints" className="text-sm text-[#000080] font-medium hover:underline">View All</a>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-50 text-gray-500 uppercase text-xs font-semibold">
                <tr>
                  <th className="px-6 py-3">Name</th>
                  <th className="px-6 py-3">Message</th>
                  <th className="px-6 py-3">Status</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {loading ? (
                  <tr><td colSpan={3} className="py-8 text-center text-gray-500">Loading data...</td></tr>
                ) : complaints.slice(0, 5).length === 0 ? (
                  <tr><td colSpan={3} className="py-8 text-center text-gray-500">No complaints found</td></tr>
                ) : (
                  complaints.slice(0, 5).map((c) => (
                    <tr key={c._id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 font-medium text-gray-900">{c.name}</td>
                      <td className="px-6 py-4 text-gray-600 max-w-xs truncate">{c.message}</td>
                      <td className="px-6 py-4">
                        {c.status === "resolved" ? (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Resolved
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                            Pending
                          </span>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Works */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex justify-between items-center">
            <h3 className="text-lg font-bold text-gray-800">Recent Works</h3>
            <a href="/admin/manage-work" className="text-sm text-[#000080] font-medium hover:underline">View All</a>
          </div>

          <div className="p-6">
            <ul className="space-y-4">
              {loading ? (
                <p className="text-center text-gray-500">Loading data...</p>
              ) : works.slice(0, 5).length === 0 ? (
                <p className="text-center text-gray-500">No works available</p>
              ) : (
                works.slice(0, 5).map((w) => (
                  <li key={w._id} className="flex items-start p-3 rounded-lg hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100">
                    <div className="h-10 w-10 rounded-lg bg-gray-100 flex-shrink-0 overflow-hidden mr-4">
                      {w.imageUrl ? (
                        <img src={w.imageUrl} alt="" className="h-full w-full object-cover" />
                      ) : (
                        <div className="h-full w-full flex items-center justify-center text-gray-400">IMG</div>
                      )}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 line-clamp-1">{w.title}</div>
                      <div className="text-xs text-gray-500 mt-1 line-clamp-2">{w.description}</div>
                    </div>
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>

      </div>
    </div>
  );
}

/* -------------------------------
   CARD COMPONENT
--------------------------------*/
function Card({ title, value, color, icon }) {
  const colorMap = {
    blue: "bg-blue-50 text-blue-700 border-blue-100",
    amber: "bg-amber-50 text-amber-700 border-amber-100",
    green: "bg-green-50 text-green-700 border-green-100",
    purple: "bg-purple-50 text-purple-700 border-purple-100",
  };

  const iconMap = {
    inbox: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"></path></svg>
    ),
    clock: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
    ),
    check: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
    ),
    briefcase: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
    ),
  };

  return (
    <div className={`bg-white shadow-sm rounded-xl p-6 border ${colorMap[color].split(' ')[2]} flex items-center justify-between hover:shadow-md transition-shadow`}>
      <div>
        <div className="text-sm font-medium text-gray-500">{title}</div>
        <div className="text-3xl font-bold mt-2 text-gray-900">
          {value}
        </div>
      </div>
      <div className={`p-3 rounded-lg ${colorMap[color].split(' ').slice(0, 2).join(' ')}`}>
        {iconMap[icon]}
      </div>
    </div>
  );
}
