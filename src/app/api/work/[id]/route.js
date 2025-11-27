import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/mongodb";
import Work from "@/models/Work";
import { requireAuth } from "@/lib/auth";

/**
 * PUT /api/work/[id]
 * Protected endpoint - Update work by ID
 */
export async function PUT(req, { params }) {
  // Require authentication
  const authResult = await requireAuth();
  if (authResult instanceof NextResponse) return authResult;

  try {
    await connectToDB();
    const { id } = params;
    const body = await req.json();

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Work ID is required" },
        { status: 400 }
      );
    }

    const updated = await Work.findByIdAndUpdate(
      id,
      body,
      { new: true, runValidators: true }
    );

    if (!updated) {
      return NextResponse.json(
        { success: false, error: "Work not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, data: updated },
      { status: 200 }
    );
  } catch (error) {
    console.error("PUT /api/work/[id] error:", error);

    if (error.name === "CastError") {
      return NextResponse.json(
        { success: false, error: "Invalid work ID format" },
        { status: 400 }
      );
    }

    if (error.name === "ValidationError") {
      return NextResponse.json(
        { success: false, error: "Validation failed", details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/work/[id]
 * Protected endpoint - Delete work by ID
 */
export async function DELETE(req, { params }) {
  // Require authentication
  const authResult = await requireAuth();
  if (authResult instanceof NextResponse) return authResult;

  try {
    await connectToDB();
    const id = params.id;

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Work ID is required" },
        { status: 400 }
      );
    }

    const deleted = await Work.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json(
        { success: false, error: "Work not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Work deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("DELETE /api/work/[id] error:", error);

    if (error.name === "CastError") {
      return NextResponse.json(
        { success: false, error: "Invalid work ID format" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
