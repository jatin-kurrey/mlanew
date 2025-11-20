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
      <div className="min-h-screen flex items-center justify-center text-lg font-medium text-[#000080]">
        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-[#ff9933]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        Verifying Access...
      </div>
    );
  }

  // If on login page → don't show sidebar/layout
  if (pathname.startsWith("/admin/login")) {
    return <>{children}</>;
  }

  const menu = [
    { title: "Dashboard", href: "/admin", icon: <LayoutDashboard size={20} /> },
    { title: "Complaints", href: "/admin/complaints", icon: <FileText size={20} /> },
    { title: "Manage Work", href: "/admin/manage-work", icon: <Folder size={20} /> },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50 text-slate-900 font-sans">

      {/* Sidebar */}
      <aside
        className={`flex flex-col bg-[#000080] text-white transition-all duration-300 shadow-xl z-20 ${collapsed ? "w-20" : "w-72"
          }`}
      >
        {/* Top row */}
        <div className="flex items-center justify-between px-6 py-6 border-b border-white/10 bg-[#000066]">
          {!collapsed ? (
            <div className="font-bold text-xl tracking-wide text-[#ff9933]">MLA ADMIN</div>
          ) : (
            <div className="font-bold text-xl text-[#ff9933]">MLA</div>
          )}

          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-1.5 rounded-lg hover:bg-white/10 transition-colors"
          >
            {collapsed ? <Menu size={20} /> : <X size={20} />}
          </button>
        </div>

        {/* Menu */}
        <nav className="flex-1 mt-6 px-3 space-y-1">
          {menu.map((m) => {
            const isActive = pathname === m.href;
            return (
              <Link
                key={m.href}
                href={m.href}
                className={`flex items-center gap-3 px-4 py-3.5 rounded-lg transition-all duration-200 group ${isActive
                  ? "bg-[#ff9933] text-white font-semibold shadow-md"
                  : "text-gray-300 hover:bg-white/10 hover:text-white"
                  }`}
              >
                <div className={`${isActive ? "text-white" : "text-gray-400 group-hover:text-white"}`}>
                  {m.icon}
                </div>
                {!collapsed && <span>{m.title}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-white/10 bg-[#000066]">
          <button
            onClick={() => {
              router.push("/admin/login");
            }}
            className="flex items-center gap-3 px-4 py-3 w-full hover:bg-red-500/20 text-red-300 hover:text-red-100 rounded-lg transition-colors"
          >
            <LogOut size={20} />
            {!collapsed && <span className="font-medium">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* Top Nav */}
        <header className="h-20 bg-white border-b border-gray-200 flex items-center justify-between px-8 shadow-sm z-10">
          <h1 className="text-2xl font-bold text-gray-800">
            {menu.find(m => m.href === pathname)?.title || "Dashboard"}
          </h1>

          <div className="flex items-center gap-6">
            <button className="relative p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-600">
              <Bell size={20} />
              <span className="absolute top-1 right-1 h-2.5 w-2.5 bg-red-500 rounded-full border-2 border-white"></span>
            </button>

            <div className="flex items-center gap-3 pl-6 border-l border-gray-200">
              <div className="text-right hidden sm:block">
                <div className="font-semibold text-gray-900">Administrator</div>
                <div className="text-xs text-gray-500">MLA Office</div>
              </div>

              <div className="h-10 w-10 bg-gradient-to-br from-[#ff9933] to-orange-600 rounded-full flex items-center justify-center text-white font-bold shadow-md">
                A
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-gray-50 p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
