import { connectToDB } from "@/lib/mongodb";
import Work from "@/models/Work";
import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";

/**
 * DELETE /api/work/clear
 * Protected endpoint - Delete all works (DANGEROUS)
 * Requires authentication and confirmation
 */
export async function DELETE(req) {
  // Require authentication
  const authResult = await requireAuth();
  if (authResult instanceof NextResponse) return authResult;

  try {
    // Require confirmation parameter for safety
    const { searchParams } = new URL(req.url);
    const confirm = searchParams.get("confirm");

    if (confirm !== "true") {
      return NextResponse.json(
        {
          success: false,
          error: "Confirmation required",
          message: "Add ?confirm=true to the URL to confirm deletion of all works"
        },
        { status: 400 }
      );
    }

    await connectToDB();
    const result = await Work.deleteMany({});

    console.log(`⚠️ All works cleared by admin. Deleted ${result.deletedCount} items.`);

    return NextResponse.json({
      success: true,
      message: `Successfully deleted ${result.deletedCount} works`,
      deletedCount: result.deletedCount
    });
  } catch (error) {
    console.error("DELETE /api/work/clear error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
