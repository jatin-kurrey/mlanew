'use client';
import React from 'react';

const Transparency = () => {
  return (
    <section id="transparency" className="py-12 bg-white rounded-xl p-8 shadow-xl max-w-7xl mx-auto my-10">
      <h2 className="text-4xl font-extrabold text-gray-900 text-center mb-4">पारदर्शिता और जवाबदेही (Transparency & Accountability)</h2>
      <div className="w-24 h-1 mx-auto bg-[#1e3a8a] mb-10"></div>

      <div className="mt-10 space-y-8">

        {/* Financial Assets */}
        <div className="p-6 bg-gray-50 rounded-lg border border-gray-200">
          <h3 className="text-2xl font-bold text-[#1e3a8a] mb-3">Financial Assets Summary (Affidavit Data)</h3>
          <p className="text-gray-600 mb-4">सार्वजनिक जीवन में पारदर्शिता हमारा मुख्य सिद्धांत है। यहाँ 2023 चुनाव हलफनामे के अनुसार संपत्ति का विवरण दिया गया है:</p>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li><strong>Total Immovable Assets:</strong> ₹1.1 Crore+ (Residential House EWS-286, Vaishali Nagar Included)</li>
            <li><strong>Movable Assets (Self & Spouse):</strong> Approx. ₹13.7 Lakhs</li>
            <li><em>Source: Official Election Affidavit, 2023.</em></li>
          </ul>
        </div>

        {/* Public Engagement (Janata Darbar) */}
        <div className="p-6 bg-blue-50 rounded-lg border border-blue-300">
          <h3 className="text-2xl font-bold text-[#1e3a8a] mb-3">Janata Darbar (Public Hearing)</h3>
          <p className="text-gray-700 mb-3"><strong>Weekly Public Meeting:</strong> MLA Rikesh Sen holds a weekly &quot;Janata Darbar&quot; to directly listen to and resolve public grievances. Every citizen has direct access to their representative.</p>
          <p className="text-gray-700"><strong>Open Door Policy:</strong> The constituency office maintains an open-door policy where residents can visit without prior appointment for urgent issues.</p>
        </div>
      </div>
    </section>
  );
};

export default Transparency;
