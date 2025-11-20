import home from "@/lib/home.json";

export default function Footer() {
  const { parichay } = home;
  return (
    <footer className="mt-20 bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 text-center">

        <p className="text-lg">
          © 2025 Rikesh Sen, MLA Vaishali Nagar. All Rights Reserved. |{" "}
          <span className="text-[#ff9933] font-semibold">
            Dedicated to Seva and Progress.
          </span>
        </p>

        <p className="mt-2 text-sm text-gray-400"
            dangerouslySetInnerHTML={{ __html: `Powered by the Mandate of ${parichay.quickFacts.winningMargin.split(':')[1]}` }}>
        </p>

      </div>
    </footer>
  );
}
