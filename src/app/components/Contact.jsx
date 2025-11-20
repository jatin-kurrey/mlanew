"use client";
import { useState, useCallback, useMemo } from "react";

const FormField = ({ name, value, onChange, type = "text", placeholder, required, as = "input" }) => {
  const InputComponent = as;
  return (
    <InputComponent
      name={name}
      value={value}
      onChange={onChange}
      type={type}
      placeholder={placeholder}
      required={required}
      className="w-full p-3 border border-gray-300 rounded-lg"
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
    <section id="contact" className="py-12 bg-white rounded-xl p-8 shadow-xl">
      <h2 className="text-4xl font-extrabold text-gray-900 text-center">
        संपर्क और शिकायत निवारण (Get In Touch)
      </h2>

      <div className="w-24 h-1 bg-[#000080] mx-auto my-4"></div>

      <div className="mt-10 grid gap-8 md:grid-cols-2">
        <div>
          <form className="space-y-4" onSubmit={handleSubmit} noValidate>
            {formFields.map(field => (
              <FormField key={field.name} {...field} value={form[field.name]} onChange={handleChange} />
            ))}

            <select
              name="type"
              value={form.type}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg"
            >
              <option>Suggestion</option>
              <option>Complaint</option>
              <option>Other</option>
            </select>

            <button
              type="submit"
              className="w-full px-6 py-3 bg-[#000080] text-white font-bold rounded-lg transition-colors hover:bg-blue-900 disabled:bg-gray-400"
              disabled={loading}
            >
              {loading ? "Sending..." : "Send Message"}
            </button>

            {success && <p className="text-green-600 text-center font-semibold">{success}</p>}
            {error && <p className="text-red-600 text-center font-semibold">{error}</p>}
          </form>
        </div>

        <div>
          <h3 className="font-bold text-xl text-[#000080]">Office Contact</h3>
          <p className="text-gray-600 mt-2">Yaha tum office address / phone / email rakh sakte ho.</p>
        </div>
      </div>
    </section>
  );
}
