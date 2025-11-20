"use client";

import { useEffect, useState } from "react";

/**
 * Complaints Page (FULL FUNCTIONAL)
 * - Fetches complaints from MongoDB via /api/contact
 * - Search bar included
 * - Resolve button (updates status to resolved)
 * - Delete button (removes complaint from DB)
 *
 * Paste this file directly inside:
 * src/app/admin/complaints/page.jsx
 */

export default function ComplaintsPage() {
  const [data, setData] = useState([]);
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch complaints
  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    setLoading(true);
    try {
      const res = await fetch("/api/contact", { cache: "no-store" });
      const json = await res.json();
      setData(Array.isArray(json) ? json.reverse() : []);
    } catch (error) {
      console.error("Error loading complaints", error);
      setData([]);
    }
    setLoading(false);
  }

  // Filter by search query
  const filtered = data.filter((item) => {
    const text = `${item.name} ${item.phone} ${item.message}`.toLowerCase();
    return text.includes(q.toLowerCase());
  });

  // Resolve Complaint
  async function handleResolve(id) {
    if (!confirm("Mark this complaint as resolved?")) return;

    try {
      const res = await fetch("/api/contact", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: "resolved" }),
      });

      if (!res.ok) throw new Error("Failed to resolve");

      await fetchData();
      alert("Complaint marked as resolved.");
    } catch (err) {
      console.error(err);
      alert("Failed to resolve complaint.");
    }
  }

  // Delete Complaint
  async function handleDelete(id) {
    if (!confirm("Are you sure? This complaint will be deleted permanently.")) return;

    try {
      const res = await fetch("/api/contact", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (!res.ok) throw new Error("Failed to delete");

      await fetchData();
      alert("Complaint deleted successfully.");
    } catch (err) {
      console.error(err);
      alert("Failed to delete complaint.");
    }
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">

      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-semibold">Complaints & Suggestions</h3>
          <p className="text-sm text-slate-500">Manage submissions from public</p>
        </div>

        <input
          className="px-3 py-2 border rounded text-sm w-72"
          placeholder="Search complaints..."
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px] text-sm">
          <thead className="border-b text-slate-600 bg-slate-50">
            <tr>
              <th className="px-3 py-2 text-left">#</th>
              <th className="px-3 py-2 text-left">Name</th>
              <th className="px-3 py-2 text-left">Phone</th>
              <th className="px-3 py-2 text-left">Message</th>
              <th className="px-3 py-2 text-left">Status</th>
              <th className="px-3 py-2 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr><td className="py-5 text-center" colSpan="6">Loading...</td></tr>
            ) : filtered.length === 0 ? (
              <tr><td className="py-5 text-center" colSpan="6">No complaints found</td></tr>
            ) : (
              filtered.map((c, index) => (
                <tr key={c._id} className="hover:bg-slate-50 border-b">
                  <td className="px-3 py-3">{index + 1}</td>

                  <td className="px-3 py-3">
                    <div className="font-medium">{c.name}</div>
                    <div className="text-xs text-slate-500">{c.email}</div>
                  </td>

                  <td className="px-3 py-3">{c.phone}</td>
                  <td className="px-3 py-3 max-w-md break-words">{c.message}</td>

                  <td className="px-3 py-3">
                    {c.status === "resolved" ? (
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
                        Resolved
                      </span>
                    ) : (
                      <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded text-xs">
                        Pending
                      </span>
                    )}
                  </td>

                  <td className="px-3 py-3 space-x-2">
                    <button
                      onClick={() => handleResolve(c._id)}
                      className="px-2 py-1 text-xs bg-green-600 text-white rounded"
                    >
                      Resolve
                    </button>

                    <button
                      onClick={() => handleDelete(c._id)}
                      className="px-2 py-1 text-xs bg-red-600 text-white rounded"
                    >
                      Delete
                    </button>
                  </td>

                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
}
