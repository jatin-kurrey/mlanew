// middleware.js
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
    function middleware(req) {
        // This function runs after authentication is verified
        return NextResponse.next();
    },
    {
        callbacks: {
            authorized: ({ token, req }) => {
                // Allow access if user has a valid token
                return !!token;
            },
        },
        pages: {
            signIn: "/admin/login",
        },
    }
);

// Protect these routes with authentication
export const config = {
    matcher: [
        // Protect all admin routes except login
        "/admin/:path((?!login).*)*",
        // Protect admin API routes
        "/api/admin/:path*",
        // Protect mutation endpoints for work and contact
        // Note: GET requests are public, but POST/PATCH/DELETE require auth
    ],
};
