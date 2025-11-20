// src/app/api/admin/contacts/route.js
import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/mongodb";
import Contact from "@/models/Contact";

// Prevent caching
export const dynamic = 'force-dynamic';

// The 'req' parameter was removed here to ensure the route is always dynamic.
// Using 'req' was unintentionally forcing the route to be treated as static by Next.js, causing caching issues.
export async function GET() {
  try {
    await connectToDB();
    const data = await Contact.find().sort({ createdAt: -1 }).lean();
    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (err) {
    console.error("API /api/admin/contacts error:", err);
    return NextResponse.json({ success: false, error: String(err) }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    await connectToDB();
    const id = req.nextUrl.searchParams.get('id');

    if (!id) {
      return NextResponse.json({ success: false, error: "ID is required" }, { status: 400 });
    }

    const deletedContact = await Contact.findByIdAndDelete(id);

    if (!deletedContact) {
        return NextResponse.json({ success: false, error: "Contact message not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Contact message deleted successfully" });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
