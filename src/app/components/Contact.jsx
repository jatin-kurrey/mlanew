"use client";
import { useState, useCallback, useMemo } from "react";

const FormField = ({ name, value, onChange, type = "text", placeholder, required, as = "input", className }) => {
  const InputComponent = as;
  return (
    <InputComponent
      name={name}
      value={value}
      onChange={onChange}
      type={type}
      placeholder={placeholder}
      required={required}
      className={className || "w-full p-3 border border-gray-300 rounded-lg"}
      {...(as === 'textarea' ? { rows: "4" } : {})}
    />
  );
};

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    mobile: "",
    type: "Suggestion",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setForm(prevForm => ({ ...prevForm, [name]: value }));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");
    setError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({ error: 'Failed to send message' }));
        throw new Error(errorData.error || 'An unknown error occurred');
      }

      const data = await res.json();

      if (!data.success) {
        throw new Error(data.error || 'An unknown error occurred');
      }

      setSuccess("Message sent successfully!");
      setForm({ name: "", mobile: "", type: "Suggestion", message: "" });
    } catch (err) {
      setError(err.message || "Failed to send. Try again later.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const formFields = useMemo(() => [
    { name: "name", placeholder: "आपका नाम", required: true },
    { name: "mobile", type: "tel", placeholder: "मोबाइल नंबर", required: true },
    { name: "message", as: "textarea", placeholder: "आपका संदेश/शिकायत", required: true },
  ], []);

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#000080]">
            संपर्क और शिकायत निवारण
          </h2>
          <p className="mt-4 text-xl text-gray-600">Get In Touch / Grievance Redressal</p>
          <div className="w-24 h-1.5 bg-[#ff9933] mx-auto mt-6 rounded-full"></div>
        </div>

        <div className="grid gap-12 lg:grid-cols-2 items-start">
          {/* Contact Form */}
          <div className="bg-gray-50 p-8 rounded-2xl shadow-lg border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Send a Message</h3>
            <form className="space-y-5" onSubmit={handleSubmit} noValidate>
              {formFields.map(field => (
                <FormField
                  key={field.name}
                  {...field}
                  value={form[field.name]}
                  onChange={handleChange}
                  className="w-full p-4 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#ff9933] focus:border-transparent outline-none transition"
                />
              ))}

              <div className="relative">
                <select
                  name="type"
                  value={form.type}
                  onChange={handleChange}
                  className="w-full p-4 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#ff9933] focus:border-transparent outline-none appearance-none transition"
                >
                  <option>Suggestion</option>
                  <option>Complaint</option>
                  <option>Other</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none">
                  <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </div>
              </div>

              <button
                type="submit"
                className="w-full px-8 py-4 bg-gradient-to-r from-[#000080] to-blue-900 text-white font-bold rounded-lg shadow-md hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
                disabled={loading}
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </span>
                ) : "Send Message"}
              </button>

              {success && (
                <div className="p-4 bg-green-50 text-green-700 rounded-lg border border-green-200 flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                  {success}
                </div>
              )}
              {error && (
                <div className="p-4 bg-red-50 text-red-700 rounded-lg border border-red-200 flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"></path></svg>
                  {error}
                </div>
              )}
            </form>
          </div>

          {/* Contact Info Card */}
          <div className="bg-[#000080] text-white p-8 rounded-2xl shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-[#ff9933] rounded-full opacity-20 blur-2xl"></div>

            <h3 className="text-2xl font-bold mb-8 relative z-10">Contact Information</h3>

            <div className="space-y-6 relative z-10">
              <div className="flex items-start">
                <div className="bg-white/10 p-3 rounded-lg mr-4">
                  <svg className="w-6 h-6 text-[#ff9933]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                </div>
                <div>
                  <h4 className="font-semibold text-lg">Office Address</h4>
                  <p className="text-gray-300 mt-1">Vaishali Nagar Constituency Office,<br />Bhilai, Chhattisgarh 490023</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-white/10 p-3 rounded-lg mr-4">
                  <svg className="w-6 h-6 text-[#ff9933]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                </div>
                <div>
                  <h4 className="font-semibold text-lg">Phone</h4>
                  <p className="text-gray-300 mt-1">+91 98765 43210</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-white/10 p-3 rounded-lg mr-4">
                  <svg className="w-6 h-6 text-[#ff9933]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                </div>
                <div>
                  <h4 className="font-semibold text-lg">Email</h4>
                  <p className="text-gray-300 mt-1">contact@rikeshsen.com</p>
                </div>
              </div>
            </div>

            <div className="mt-10 pt-8 border-t border-white/10">
              <h4 className="font-semibold mb-4">Follow on Social Media</h4>
              <div className="flex space-x-4">
                {/* Social Icons placeholders */}
                <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#ff9933] transition"><span className="sr-only">Facebook</span>F</a>
                <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#ff9933] transition"><span className="sr-only">Twitter</span>T</a>
                <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#ff9933] transition"><span className="sr-only">Instagram</span>I</a>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
