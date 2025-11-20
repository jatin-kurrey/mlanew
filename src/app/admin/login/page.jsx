"use client";

import { useState, useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

/**
 * Admin Login Page
 * Path: src/app/admin/login/page.jsx
 *
 * Uses next-auth credentials provider.
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
        alert("Login failed: " + res.error);
        return;
      }
      // success
      router.push("/admin");
    } catch (err) {
      console.error(err);
      setLoading(false);
      alert("Login error");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-2">Admin Login</h2>
        <p className="text-sm text-slate-500 mb-4">Use your admin credentials to sign in.</p>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full border px-3 py-2 rounded"
            type="email"
            required
          />

          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full border px-3 py-2 rounded"
            type="password"
            required
          />

          <div className="flex justify-between items-center">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded"
              disabled={loading}
            >
              {loading ? "Signing in…" : "Sign in"}
            </button>
          </div>
        </form>

        <div className="text-xs text-slate-400 mt-4">
          Note: This admin login uses credentials from environment variables.
        </div>
      </div>
    </div>
  );
}
