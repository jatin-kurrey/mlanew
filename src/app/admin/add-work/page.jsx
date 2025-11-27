'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import ImageUpload from "@/components/admin/ImageUpload";

export default function AddWorkPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    title: "",
    description: "",
    link: "",
    imageUrl: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.imageUrl) {
      alert("Please select an image file!");
      return;
    }

    setIsSubmitting(true);

    try {
      const finalData = {
        ...form,
      };

      // STEP 2: Save work entry to DB
      const res = await fetch("/api/work", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(finalData),
      });

      const data = await res.json();

      if (data.success) {
        alert("Work Added Successfully!");
        router.push("/admin/manage-work");
      } else {
        alert("Error: " + data.error);
      }

    } catch (err) {
      alert("Error: " + err.message);
    }

    setIsSubmitting(false);
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-xl">
      <h1 className="text-3xl font-bold mb-6">Add New Work</h1>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          name="title"
          placeholder="Title"
          className="w-full p-3 border rounded"
          value={form.title}
          onChange={handleChange}
          required
          disabled={isSubmitting}
        />

        <textarea
          name="description"
          placeholder="Description"
          rows={4}
          className="w-full p-3 border rounded"
          value={form.description}
          onChange={handleChange}
          required
          disabled={isSubmitting}
        />

        <input
          name="link"
          placeholder="Read more link (optional)"
          className="w-full p-3 border rounded"
          value={form.link}
          onChange={handleChange}
          disabled={isSubmitting}
        />

        {/* IMAGE INPUT */}
        <div>
          <label className="block font-semibold mb-1">Work Image</label>
          <ImageUpload
            value={form.imageUrl}
            onChange={(url) => setForm({ ...form, imageUrl: url })}
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400"
        >
          {isSubmitting ? "Uploading..." : "Add Work"}
        </button>
      </form>
    </div>
  );
}
