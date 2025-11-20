'use client';
import React from 'react';

const Transparency = () => {
  return (
    <section id="transparency" className="py-12 bg-white rounded-xl p-8 shadow-xl max-w-7xl mx-auto my-10">
      <h2 className="text-4xl font-extrabold text-gray-900 text-center mb-4">पारदर्शिता और जवाबदेही (Transparency & Accountability)</h2>
      <div className="w-24 h-1 mx-auto bg-[#000080] mb-10"></div>

      <div className="mt-10 space-y-8">

        {/* Financial Assets */}
        <div className="p-6 bg-gray-50 rounded-lg border border-gray-200">
          <h3 className="text-2xl font-bold text-[#000080] mb-3">Financial Assets Summary (Affidavit Data)</h3>
          <p className="text-gray-600 mb-4">सार्वजनिक जीवन में पारदर्शिता हमारा मुख्य सिद्धांत है। यहाँ 2023 चुनाव हलफनामे के अनुसार संपत्ति का विवरण दिया गया है:</p>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li><strong>Total Immovable Assets:</strong> ₹1.1 Crore+ (Residential House EWS-286, Vaishali Nagar Included)</li>
            <li><strong>Movable Assets (Self & Spouse):</strong> Approx. ₹13.7 Lakhs</li>
            <li><em>Source: Official Election Affidavit, 2023.</em></li>
          </ul>
        </div>

        {/* Official Statements (Controversy Mitigation) */}
        <div className="p-6 bg-blue-50 rounded-lg border border-blue-300">
          <h3 className="text-2xl font-bold text-[#000080] mb-3">आधिकारिक वक्तव्य और मीडिया स्पष्टीकरण</h3>
          <p className="text-gray-700 mb-3"><strong>BSP Bungalow Dispute:</strong> यह स्पष्ट किया जाता है कि निवास Bhilai Steel Plant (BSP) प्रबंधन द्वारा एक सिटिंग MLA के रूप में आधिकारिक आवंटन प्रक्रियाओं के तहत प्रदान किया गया है, न कि व्यक्तिगत अधिग्रहण के रूप में।</p>
          <p className="text-gray-700"><strong>Nakta Pond Renaming:</strong> हम सांस्कृतिक विरासत और स्थानीय समुदाय (सतनामी समुदाय) के सम्मान को प्राथमिकता देते हैं। नामकरण का अंतिम निर्णय कानूनी और नगर निगम की प्रक्रिया (General Assembly Vote) के माध्यम से ही लिया जाएगा।</p>
        </div>
      </div>
    </section>
  );
};

export default Transparency;
