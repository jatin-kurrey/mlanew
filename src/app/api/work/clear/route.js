import { connectToDB } from "@/lib/mongodb";
import Work from "@/models/Work";
import { NextResponse } from "next/server";

export async function GET() {
  await connectToDB();
  await Work.deleteMany({});
  return NextResponse.json({ success: true });
}
