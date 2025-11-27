// src/app/api/work/route.js
import { connectToDB as dbConnect } from "@/lib/mongodb";
import Work from "@/models/Work";
import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";

/**
 * GET /api/work
 * Public endpoint - Get all works with optional pagination
 */
export async function GET(req) {
  try {
    await dbConnect();

    // Fetch all works (pagination can be added later if needed)
    const works = await Work.find({})
      .sort({ createdAt: -1 })
      .lean()
      .exec();

    // Return direct array for consistency with Contact API and frontend expectations
    return NextResponse.json(works, { status: 200 });
  } catch (err) {
    console.error("GET /api/work error:", err);
    return NextResponse.json(
      { error: "Failed to fetch works", message: err.message },
      { status: 500 }
    );
  }
}

/**
 * POST /api/work
 * Protected endpoint - Create new work
 */
export async function POST(req) {
  // Require authentication
  const authResult = await requireAuth();
  if (authResult instanceof NextResponse) return authResult;

  try {
    const body = await req.json();
    const { title, description, imageUrl, link } = body;

    // Validate required fields
    if (!title || !title.trim()) {
      return NextResponse.json(
        { error: "Title is required" },
        { status: 400 }
      );
    }

    if (!description || !description.trim()) {
      return NextResponse.json(
        { error: "Description is required" },
        { status: 400 }
      );
    }

    if (!imageUrl || !imageUrl.trim()) {
      return NextResponse.json(
        { error: "Image URL is required" },
        { status: 400 }
      );
    }

    await dbConnect();

    const created = await Work.create({
      title: title.trim(),
      description: description.trim(),
      imageUrl: imageUrl.trim(),
      link: link?.trim() || ""
    });

    return NextResponse.json(
      { success: true, data: created },
      { status: 201 }
    );
  } catch (err) {
    console.error("POST /api/work error:", err);

    // Handle validation errors
    if (err.name === "ValidationError") {
      return NextResponse.json(
        { error: "Validation failed", details: err.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Failed to create work", message: err.message },
      { status: 500 }
    );
  }
}
