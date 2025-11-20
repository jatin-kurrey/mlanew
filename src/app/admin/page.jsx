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
    <div className="p-6 space-y-6">

      {/* Dashboard Title */}
      <h2 className="text-2xl font-semibold">Dashboard Overview</h2>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        
        <Card title="Total Complaints" value={totalComplaints} color="blue" />

        <Card title="Pending Complaints" value={pendingCount} color="amber" />

        <Card title="Resolved Complaints" value={resolvedCount} color="green" />

        <Card title="Total Works" value={works.length} color="purple" />

      </div>

      {/* 2 Column Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Recent Complaints */}
        <div className="bg-white p-5 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Recent Complaints</h3>

          <table className="w-full text-sm">
            <thead className="border-b bg-slate-50">
              <tr>
                <th className="text-left px-3 py-2">Name</th>
                <th className="text-left px-3 py-2">Message</th>
                <th className="text-left px-3 py-2">Status</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr><td colSpan={3} className="py-4 text-center">Loading...</td></tr>
              ) : complaints.slice(0, 5).length === 0 ? (
                <tr><td colSpan={3} className="py-4 text-center">No complaints</td></tr>
              ) : (
                complaints.slice(0, 5).map((c) => (
                  <tr key={c._id} className="border-b hover:bg-slate-50">
                    <td className="px-3 py-3">{c.name}</td>
                    <td className="px-3 py-3 max-w-xs truncate">{c.message}</td>
                    <td className="px-3 py-3">
                      {c.status === "resolved" ? (
                        <span className="text-green-700 bg-green-100 px-2 py-1 rounded text-xs">
                          Resolved
                        </span>
                      ) : (
                        <span className="text-amber-700 bg-amber-100 px-2 py-1 rounded text-xs">
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

        {/* Recent Works */}
        <div className="bg-white p-5 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Recent Works</h3>

          <ul className="space-y-3 text-sm">
            {loading ? (
              <p>Loading...</p>
            ) : works.slice(0, 5).length === 0 ? (
              <p>No works available</p>
            ) : (
              works.slice(0, 5).map((w) => (
                <li key={w._id} className="border p-3 rounded hover:bg-slate-50">
                  <div className="font-medium">{w.title}</div>
                  <div className="text-xs text-slate-500">{w.description.slice(0, 80)}...</div>
                </li>
              ))
            )}
          </ul>
        </div>

      </div>
    </div>
  );
}

/* -------------------------------
   CARD COMPONENT
--------------------------------*/
function Card({ title, value, color }) {
  const colorMap = {
    blue: "bg-blue-100 text-blue-700",
    amber: "bg-amber-100 text-amber-700",
    green: "bg-green-100 text-green-700",
    purple: "bg-purple-100 text-purple-700",
  };

  return (
    <div className="bg-white shadow rounded-lg p-5 flex flex-col">
      <div className="text-sm text-slate-500">{title}</div>
      <div className={`text-3xl font-bold mt-1 ${colorMap[color]}`}>
        {value}
      </div>
    </div>
  );
}
