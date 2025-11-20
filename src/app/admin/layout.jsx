"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

import {
  Menu,
  X,
  LayoutDashboard,
  FileText,
  Folder,
  PlusSquare,
  LogOut,
  Bell,
} from "lucide-react";

export default function AdminLayout({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  const { status } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  // Redirect if not authenticated
  useEffect(() => {
    if (status === "unauthenticated") {
      if (!pathname.startsWith("/admin/login")) {
        router.replace("/admin/login");
      }
    }
  }, [status, pathname, router]);

  // Show loader while checking session
  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg">
        Checking session…
      </div>
    );
  }

  // If on login page → don't show sidebar/layout
  if (pathname.startsWith("/admin/login")) {
    return <>{children}</>;
  }

  const menu = [
    { title: "Dashboard", href: "/admin", icon: <LayoutDashboard size={18} /> },
    { title: "Complaints", href: "/admin/complaints", icon: <FileText size={18} /> },
    { title: "Manage Work", href: "/admin/manage-work", icon: <Folder size={18} /> },
    { title: "Add Work", href: "/admin/manage-work#add", icon: <PlusSquare size={18} /> },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50 text-slate-900">

      {/* Sidebar */}
      <aside
        className={`flex flex-col bg-[#0F1A2B] text-white transition-all duration-300 ${
          collapsed ? "w-20" : "w-64"
        }`}
      >
        {/* Top row */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-white/10">
          {!collapsed ? (
            <div className="font-semibold tracking-wide">MLA | Admin Panel</div>
          ) : (
            <div className="font-bold">MLA</div>
          )}

          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-1 rounded hover:bg-white/10"
          >
            {collapsed ? <Menu size={18} /> : <X size={18} />}
          </button>
        </div>

        {/* Menu */}
        <nav className="flex-1 mt-4">
          {menu.map((m) => (
            <Link
              key={m.href}
              href={m.href}
              className="flex items-center gap-3 px-4 py-3 text-sm hover:bg-white/10 transition"
            >
              <div>{m.icon}</div>
              {!collapsed && <span>{m.title}</span>}
            </Link>
          ))}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-white/10">
          <button
            onClick={() => {
              router.push("/admin/login");
            }}
            className="flex items-center gap-3 px-2 py-2 w-full hover:bg-white/10 rounded"
          >
            <LogOut size={18} />
            {!collapsed && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">

        {/* Top Nav */}
        <header className="h-16 bg-white border-b flex items-center justify-between px-6">
          <h1 className="text-lg font-semibold">Admin Dashboard</h1>

          <div className="flex items-center gap-4">
            <button className="relative p-2 rounded hover:bg-gray-100">
              <Bell size={18} />
              <span className="absolute top-0 right-0 text-[10px] bg-red-600 text-white px-1.5 py-0.5 rounded-full">
                3
              </span>
            </button>

            <div className="flex items-center gap-2">
              <div className="text-sm">
                <div className="font-medium">Admin</div>
                <div className="text-xs text-slate-500">Administrator</div>
              </div>

              <div className="h-8 w-8 bg-gray-200 rounded flex items-center justify-center">
                A
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
