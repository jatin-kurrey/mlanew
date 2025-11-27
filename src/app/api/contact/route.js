import { NextResponse } from "next/server";
import { connectToDB as dbConnect } from "@/lib/mongodb";
import Contact from "@/models/Contact";
import { requireAuth } from "@/lib/auth";

/**
 * GET /api/contact
 * Public endpoint - Get all contacts
 */
export async function GET(req) {
  try {
    await dbConnect();

    // Get query parameters for filtering
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");
    const type = searchParams.get("type");

    // Build query
    const query = {};
    if (status) query.status = status;
    if (type) query.type = type;

    const contacts = await Contact.find(query)
      .sort({ createdAt: -1 })
      .lean()
      .exec();

    return NextResponse.json(contacts, { status: 200 });
  } catch (err) {
    console.error("GET /api/contact error:", err);
    return NextResponse.json(
      { error: "Failed to fetch contacts", message: err.message },
      { status: 500 }
    );
  }
}

/**
 * POST /api/contact
 * Public endpoint - Create new contact/complaint
 */
export async function POST(req) {
  try {
    const body = await req.json();
    const { name, mobile, message, email, type } = body;

    // Validate required fields
    if (!name || !name.trim()) {
      return NextResponse.json(
        { error: "Name is required" },
        { status: 400 }
      );
    }

    if (!mobile || !mobile.trim()) {
      return NextResponse.json(
        { error: "Mobile number is required" },
        { status: 400 }
      );
    }

    if (!message || !message.trim()) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    await dbConnect();

    const newContact = new Contact({
      name: name.trim(),
      mobile: mobile.trim(),
      message: message.trim(),
      email: email?.trim(),
      type: type || "other"
    });

    await newContact.save();

    return NextResponse.json(
      { success: true, data: newContact },
      { status: 201 }
    );
  } catch (err) {
    console.error("POST /api/contact error:", err);

    // Handle validation errors
    if (err.name === "ValidationError") {
      return NextResponse.json(
        { error: "Validation failed", details: err.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Failed to create contact", message: err.message },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/contact
 * Protected endpoint - Update contact status
 */
export async function PATCH(req) {
  // Require authentication
  const authResult = await requireAuth();
  if (authResult instanceof NextResponse) return authResult;

  try {
    const body = await req.json();
    const { id, status } = body;

    if (!id) {
      return NextResponse.json(
        { error: "Contact ID is required" },
        { status: 400 }
      );
    }

    // Validate status if provided
    if (status && !["pending", "resolved", "in-progress"].includes(status)) {
      return NextResponse.json(
        { error: "Invalid status value" },
        { status: 400 }
      );
    }

    await dbConnect();

    const updated = await Contact.findByIdAndUpdate(
      id,
      { $set: { status: status || "resolved" } },
      { new: true, runValidators: true }
    ).lean();

    if (!updated) {
      return NextResponse.json(
        { error: "Contact not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, data: updated },
      { status: 200 }
    );
  } catch (err) {
    console.error("PATCH /api/contact error:", err);

    if (err.name === "CastError") {
      return NextResponse.json(
        { error: "Invalid contact ID format" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Failed to update contact", message: err.message },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/contact
 * Protected endpoint - Delete contact
 */
export async function DELETE(req) {
  // Require authentication
  const authResult = await requireAuth();
  if (authResult instanceof NextResponse) return authResult;

  try {
    const body = await req.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json(
        { error: "Contact ID is required" },
        { status: 400 }
      );
    }

    await dbConnect();

    const deleted = await Contact.findByIdAndDelete(id).lean();

    if (!deleted) {
      return NextResponse.json(
        { error: "Contact not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Contact deleted successfully", id },
      { status: 200 }
    );
  } catch (err) {
    console.error("DELETE /api/contact error:", err);

    if (err.name === "CastError") {
      return NextResponse.json(
        { error: "Invalid contact ID format" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Failed to delete contact", message: err.message },
      { status: 500 }
    );
  }
}
