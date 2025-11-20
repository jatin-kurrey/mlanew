import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/mongodb";
import Work from "@/models/Work";

export async function DELETE(req, { params }) {
  try {
    await connectToDB();

    const id = params.id; // <-- THIS IS IMPORTANT

    if (!id) {
      return NextResponse.json({ success: false, error: "Missing ID" });
    }

    const deleted = await Work.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json({ success: false, error: "Not Found" });
    }

    return NextResponse.json({ success: true });

  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
