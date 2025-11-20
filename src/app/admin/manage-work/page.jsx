"use client";

import { useEffect, useState } from "react";

/**
 * MANAGE WORK PAGE (FULL PROFESSIONAL + CRUD)
 *
 * Paste directly here:
 * src/app/admin/manage-work/page.jsx
 */

export default function ManageWorkPage() {
  const [works, setWorks] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);    // Add/Edit Modal
  const [editItem, setEditItem] = useState(null);       // Work being edited

  const [form, setForm] = useState({
    title: "",
    description: "",
    link: "",
    image: "",
  });

  // Fetch all work items
  useEffect(() => {
    fetchWorks();
  }, []);

  async function fetchWorks() {
    setLoading(true);
    try {
      const res = await fetch("/api/work", { cache: "no-store" });
      const json = await res.json();
      setWorks(Array.isArray(json) ? json.reverse() : []);
    } catch (err) {
      console.error(err);
      setWorks([]);
    }
    setLoading(false);
  }

  // OPEN ADD MODAL
  function openAdd() {
    setEditItem(null);
    setForm({ title: "", description: "", link: "", image: "" });
    setShowModal(true);
  }

  // OPEN EDIT MODAL
  function openEdit(w) {
    setEditItem(w._id);
    setForm({
      title: w.title,
      description: w.description,
      link: w.link,
      image: w.imageUrl || "", // Map imageUrl to image
    });
    setShowModal(true);
  }

  // SAVE (Add / Update)
  async function saveWork() {
    if (!form.title.trim()) {
      alert("Title is required");
      return;
    }

    try {
      const method = editItem ? "PUT" : "POST";
      // API expects imageUrl, but form uses image. Map it.
      const payload = {
        title: form.title,
        description: form.description,
        link: form.link,
        imageUrl: form.image,
      };

      let url = "/api/work";
      if (editItem) {
        url = `/api/work/${editItem}`;
      }

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed");
      }

      setShowModal(false);
      await fetchWorks();
      alert(editItem ? "Updated!" : "Created!");
    } catch (err) {
      console.error(err);
      alert("Error saving: " + err.message);
    }
  }

  // DELETE
  async function deleteWork(id) {
    if (!confirm("Delete this work item?")) return;

    try {
      const res = await fetch(`/api/work/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Error");
      await fetchWorks();
      alert("Deleted successfully");
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-semibold">Manage Works</h3>
          <p className="text-sm text-slate-500">Projects shown on the website</p>
        </div>

        <button
          onClick={openAdd}
          className="px-3 py-2 bg-blue-600 text-white rounded text-sm"
        >
          + Add Work
        </button>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px] text-sm">
          <thead className="bg-slate-50 border-b text-slate-600">
            <tr>
              <th className="px-3 py-2 text-left">#</th>
              <th className="px-3 py-2 text-left">Image</th>
              <th className="px-3 py-2 text-left">Title</th>
              <th className="px-3 py-2 text-left">Description</th>
              <th className="px-3 py-2 text-left">Link</th>
              <th className="px-3 py-2 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr><td colSpan="6" className="py-6 text-center">Loading...</td></tr>
            ) : (
              works.map((w, idx) => (
                <tr key={w._id} className="border-b hover:bg-slate-50">
                  <td className="px-3 py-3">{idx + 1}</td>

                  <td className="px-3 py-3">
                    {w.imageUrl ? (
                      <img src={w.imageUrl} className="h-16 w-24 object-cover rounded" />
                    ) : (
                      <div className="h-16 w-24 bg-slate-200 rounded flex items-center justify-center text-slate-500">No Image</div>
                    )}
                  </td>

                  <td className="px-3 py-3">{w.title}</td>
                  <td className="px-3 py-3 max-w-md break-words">{w.description}</td>

                  <td className="px-3 py-3">
                    {w.link ? (
                      <a href={w.link} target="_blank" className="text-blue-700 underline">Open</a>
                    ) : "-"}
                  </td>

                  <td className="px-3 py-3 space-x-2">
                    <button
                      onClick={() => openEdit(w)}
                      className="px-2 py-1 bg-amber-500 text-white rounded"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => deleteWork(w._id)}
                      className="px-2 py-1 bg-red-600 text-white rounded"
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

      {/* ADD / EDIT MODAL */}
      {
        showModal && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white shadow-lg rounded-lg w-[500px] p-6">

              <h3 className="text-lg font-semibold mb-4">
                {editItem ? "Edit Work" : "Add Work"}
              </h3>

              {/* FORM */}
              <div className="space-y-3">
                <input
                  className="w-full border px-3 py-2 rounded"
                  placeholder="Title"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                />

                <textarea
                  className="w-full border px-3 py-2 rounded"
                  placeholder="Description"
                  rows={4}
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                />

                {/* IMAGE UPLOAD */}
                <div className="border px-3 py-2 rounded">
                  <label className="block text-sm text-gray-600 mb-1">Work Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;

                      // Upload immediately
                      const data = new FormData();
                      data.append("file", file);

                      try {
                        const res = await fetch("/api/upload", {
                          method: "POST",
                          body: data,
                        });
                        const json = await res.json();
                        if (json.url) {
                          setForm(prev => ({ ...prev, image: json.url }));
                        } else {
                          alert("Upload failed");
                        }
                      } catch (err) {
                        console.error(err);
                        alert("Upload error");
                      }
                    }}
                  />
                  {form.image && (
                    <div className="mt-2">
                      <img src={form.image} alt="Preview" className="h-20 w-auto rounded border" />
                      <p className="text-xs text-green-600 mt-1">Image uploaded successfully</p>
                    </div>
                  )}
                </div>

                <input
                  className="w-full border px-3 py-2 rounded"
                  placeholder="Link"
                  value={form.link}
                  onChange={(e) => setForm({ ...form, link: e.target.value })}
                />
              </div>

              {/* BUTTONS */}
              <div className="flex justify-end mt-6 gap-3">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-3 py-2 bg-gray-200 rounded"
                >
                  Cancel
                </button>

                <button
                  onClick={saveWork}
                  className="px-3 py-2 bg-blue-600 text-white rounded"
                >
                  Save
                </button>
              </div>

            </div>
          </div>
        )
      }

    </div >
  );
}
