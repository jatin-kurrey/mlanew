'use client';
import { useEffect, useState, useMemo } from "react";
import Image from "next/image";

const WorkItem = ({ work }) => (
  <div className="bg-white p-8 rounded-xl shadow-xl hover:shadow-2xl transition border-t-4 border-blue-600">
    <div className="mb-4 w-full h-48 rounded-lg overflow-hidden relative">
      <Image
        src={work.imageUrl}
        alt={work.title}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
    </div>
    <h3 className="text-3xl font-bold text-gray-900">{work.title}</h3>
    <p className="mt-4 text-gray-600">{work.description}</p>
    {work.link && (
      <a
        href={work.link}
        className="mt-4 inline-block font-bold text-blue-600 hover:text-blue-800"
      >
        Read More →
      </a>
    )}
  </div>
);

export default function WorkSection() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWorkItems = async () => {
      try {
        const res = await fetch("/api/work");
        if (!res.ok) {
          throw new Error('Failed to fetch work items');
        }
        const data = await res.json();
        if (data.success) {
          setItems(data.items);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkItems();
  }, []);

  const workItems = useMemo(() => items.map(work => <WorkItem key={work._id} work={work} />), [items]);

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">Error: {error}</div>;
  }

  return (
    <section id="karya" className="py-12">
      <h2 className="text-4xl font-extrabold text-gray-900 text-center">
        वैशाली नगर में मेरा कार्य (Work Portfolio)
      </h2>
      <div className="w-24 h-1 bg-[#000080] mx-auto my-4"></div>
      <div className="mt-10 grid gap-8 lg:grid-cols-2">
        {workItems}
      </div>
    </section>
  );
}
