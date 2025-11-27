import home from "@/lib/home.json";

export default function Footer() {
  const { parichay } = home;
  return (
    <footer className="bg-[#1a1a1a] text-white pt-16 pb-8 border-t-4 border-[#1e3a8a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">

          {/* Column 1: Brand */}
          <div>
            <h3 className="text-2xl font-bold text-[#1e3a8a] mb-4">MLA Rikesh Sen</h3>
            <p className="text-gray-400 leading-relaxed">
              Dedicated to the service and development of Vaishali Nagar. Working tirelessly for a prosperous and transparent constituency.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#home" className="text-gray-400 hover:text-[#1e3a8a] transition">Home</a></li>
              <li><a href="#parichay" className="text-gray-400 hover:text-[#1e3a8a] transition">About</a></li>
              <li><a href="#karya" className="text-gray-400 hover:text-[#1e3a8a] transition">Work</a></li>
              <li><a href="#contact" className="text-gray-400 hover:text-[#1e3a8a] transition">Contact</a></li>
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">{home.contact.office.title}</h4>
            <p className="text-gray-400 mb-2 max-w-xs">{home.contact.office.details}</p>
            <a href="mailto:contact@rikeshsen.com" className="text-[#1e3a8a] hover:underline">contact@rikeshsen.com</a>
          </div>

        </div>

        <div className="border-t border-gray-800 pt-8 text-center">
          <p className="text-sm text-gray-500">
            © 2025 Rikesh Sen, MLA Vaishali Nagar. All Rights Reserved.
          </p>
          <p className="mt-2 text-xs text-gray-600"
            dangerouslySetInnerHTML={{ __html: `Powered by the Mandate of ${parichay.quickFacts.winningMargin.split(':')[1]}` }}>
          </p>
        </div>

      </div>
    </footer>
  );
}
