'use client';
import { useEffect, useState } from "react";
import Image from "next/image";

export default function WorkSection() {
  const [works, setWorks] = useState([]);
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
        if (Array.isArray(data)) {
          setWorks(data);
        } else {
          setWorks([]);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkItems();
  }, []);

  if (loading) {
    return <div className="text-center py-20">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-black py-20">No Data Found</div>;
  }

  return (
    <section id="work" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-[#000080] mb-4 text-devnagari">वैशाली नगर में मेरा कार्य (Work Portfolio)</h2>
          <div className="w-24 h-1 bg-[#000080] mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {works.map((work, index) => (
            <div
              key={work._id}
              className={`bg-white rounded-xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 border-t-4 ${index % 2 === 0 ? 'border-pink-500' : 'border-green-600'}`}
            >
              <div className="relative h-64 w-full bg-gray-100">
                {work.imageUrl ? (
                  <Image
                    src={work.imageUrl}
                    alt={work.title}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-400">No Image</div>
                )}
              </div>

              <div className="p-8">
                <div className="flex items-center mb-4">
                  {/* Dynamic Icon based on index/color */}
                  <svg
                    className={`h-8 w-8 ${index % 2 === 0 ? 'text-pink-500' : 'text-green-600'}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h3 className="ml-3 text-2xl font-bold text-gray-900 text-devnagari">{work.title}</h3>
                </div>

                <p className="text-gray-600 mb-6 leading-relaxed text-lg">
                  {work.description}
                </p>

                {work.link && (
                  <a
                    href={work.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center font-bold transition-colors ${index % 2 === 0 ? 'text-pink-600 hover:text-pink-800' : 'text-green-600 hover:text-green-800'}`}
                  >
                    Read More &rarr;
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
