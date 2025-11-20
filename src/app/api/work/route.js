// src/app/api/work/route.js
import { connectToDB as dbConnect } from "@/lib/mongodb";
import Work from "@/models/Work";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    await dbConnect();
    const list = await Work.find({}).sort({ createdAt: -1 }).lean();
    return NextResponse.json(list, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    // expected: { title, description, link, image }
    if (!body || !body.title || !body.description || !body.imageUrl) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }
    await dbConnect();
    const created = await Work.create(body);
    return NextResponse.json(created, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
