"use client";

import { useState, useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

/**
 * Admin Login Page
 * Path: src/app/admin/login/page.jsx
 */

export default function AdminLoginPage() {
  const [email, setEmail] = useState(process.env.NEXT_PUBLIC_DEFAULT_ADMIN_EMAIL || "");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { status } = useSession();
  const router = useRouter();

  // If already logged in, redirect to /admin
  useEffect(() => {
    if (status === "authenticated") router.push("/admin");
  }, [status, router]);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });
      setLoading(false);

      if (res?.error) {
        alert("Invalid credentials");
        return;
      }
      router.push("/admin");
    } catch (err) {
      setLoading(false);
      alert("Login error");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-200 p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl overflow-hidden border-t-4 border-[#1e3a8a]">
        <div className="p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-[#1e3a8a]">Admin Portal</h2>
            <p className="text-sm text-gray-500 mt-2">Secure Access for MLA Rikesh Sen</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@example.com"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#1e3a8a] focus:border-transparent outline-none transition"
                type="email"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#1e3a8a] focus:border-transparent outline-none transition"
                type="password"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#1e3a8a] text-white font-bold rounded-lg shadow-md hover:bg-[#1e40af] hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing in...
                </span>
              ) : "Sign In"}
            </button>
          </form>
        </div>
        <div className="bg-gray-50 px-8 py-4 border-t border-gray-100 text-center">
          <p className="text-xs text-gray-500">
            Authorized personnel only. All activities are monitored.
          </p>
        </div>
      </div>
    </div>
  );
}
