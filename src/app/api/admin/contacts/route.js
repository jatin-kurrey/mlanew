// src/app/api/admin/contacts/route.js
import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/mongodb";
import Contact from "@/models/Contact";
import { requireAuth } from "@/lib/auth";

// Prevent caching
export const dynamic = 'force-dynamic';

/**
 * GET /api/admin/contacts
 * Protected endpoint - Get all contacts for admin
 */
export async function GET() {
  // Require authentication
  const authResult = await requireAuth();
  if (authResult instanceof NextResponse) return authResult;

  try {
    await connectToDB();
    const data = await Contact.find()
      .sort({ createdAt: -1 })
      .lean()
      .exec();

    return NextResponse.json(
      { success: true, data },
      { status: 200 }
    );
  } catch (err) {
    console.error("GET /api/admin/contacts error:", err);
    return NextResponse.json(
      { success: false, error: "Failed to fetch contacts", message: err.message },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/admin/contacts
 * Protected endpoint - Delete contact by ID
 */
export async function DELETE(req) {
  // Require authentication
  const authResult = await requireAuth();
  if (authResult instanceof NextResponse) return authResult;

  try {
    await connectToDB();
    const id = req.nextUrl.searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Contact ID is required" },
        { status: 400 }
      );
    }

    const deletedContact = await Contact.findByIdAndDelete(id);

    if (!deletedContact) {
      return NextResponse.json(
        { success: false, error: "Contact not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Contact deleted successfully"
    });
  } catch (err) {
    console.error("DELETE /api/admin/contacts error:", err);

    if (err.name === "CastError") {
      return NextResponse.json(
        { success: false, error: "Invalid contact ID format" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, error: "Failed to delete contact", message: err.message },
      { status: 500 }
    );
  }
}
