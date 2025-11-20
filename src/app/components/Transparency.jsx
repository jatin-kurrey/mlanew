'use client';
import React, { useState, useEffect } from 'react';
import home from "@/lib/home.json";

const Transparency = () => {
  const [activeTab, setActiveTab] = useState('suggestions');
  const [suggestions, setSuggestions] = useState([]);
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data from API
  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/contact');
      if (!res.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await res.json();
      if (data.success) {
        // Filter data based on type
        setSuggestions(data.contacts.filter(item => item.type === 'suggestion'));
        setComplaints(data.contacts.filter(item => item.type === 'complaint'));
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchData();
  }, []);

  // Function to render the list of items (suggestions or complaints)
  const renderList = (items) => {
    if (loading) {
      return <p className="text-center text-gray-500">Loading...</p>;
    }
    if (error) {
      return <p className="text-center text-red-500">Error: {error}</p>;
    }
    if (items.length === 0) {
      return <p className="text-center text-gray-500">No records found.</p>;
    }

    return (
      <ul className="space-y-4">
        {items.map((item, index) => (
          <li key={index} className="bg-gray-50 p-4 rounded-lg shadow-sm">
            <p className="font-semibold text-gray-800">{item.name}</p>
            <p className="text-sm text-gray-600 mt-1">{item.message}</p>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">{home.transparency.title}</h2>

        <div className="max-w-4xl mx-auto">
          {/* Tabs for Suggestions and Complaints */}
          <div className="flex justify-center border-b mb-6">
            <button
              onClick={() => setActiveTab('suggestions')}
              className={`py-2 px-6 font-semibold transition-colors duration-300 ${activeTab === 'suggestions' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'}`}>
              Suggestions
            </button>
            <button
              onClick={() => setActiveTab('complaints')}
              className={`py-2 px-6 font-semibold transition-colors duration-300 ${activeTab === 'complaints' ? 'border-b-2 border-red-600 text-red-600' : 'text-gray-500'}`}>
              Complaints
            </button>
          </div>

          {/* Content based on active tab */}
          <div>
            {activeTab === 'suggestions' ? renderList(suggestions) : renderList(complaints)}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Transparency;
