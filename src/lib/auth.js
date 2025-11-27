// src/lib/auth.js
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { NextResponse } from "next/server";

/**
 * Get the current session on the server side
 * @returns {Promise<Session|null>} The session object or null
 */
export async function getSession() {
    return await getServerSession(authOptions);
}

/**
 * Check if the user is authenticated
 * @returns {Promise<boolean>} True if authenticated, false otherwise
 */
export async function isAuthenticated() {
    const session = await getSession();
    return !!session;
}

/**
 * Require authentication for API routes
 * Returns the session if authenticated, or an error response if not
 * 
 * Usage in API routes:
 * ```
 * const authResult = await requireAuth();
 * if (authResult instanceof NextResponse) return authResult;
 * const session = authResult;
 * ```
 */
export async function requireAuth() {
    const session = await getSession();

    if (!session) {
        return NextResponse.json(
            { error: "Unauthorized", message: "Authentication required" },
            { status: 401 }
        );
    }

    return session;
}

/**
 * Require admin role for API routes
 * Returns the session if user is admin, or an error response if not
 */
export async function requireAdmin() {
    const session = await getSession();

    if (!session) {
        return NextResponse.json(
            { error: "Unauthorized", message: "Authentication required" },
            { status: 401 }
        );
    }

    if (session.user?.role !== "admin") {
        return NextResponse.json(
            { error: "Forbidden", message: "Admin access required" },
            { status: 403 }
        );
    }

    return session;
}

/**
 * Get user from session
 * @returns {Promise<User|null>} The user object or null
 */
export async function getCurrentUser() {
    const session = await getSession();
    return session?.user || null;
}
