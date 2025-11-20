// src/app/api/work/route.js
import dbConnect from "@/lib/mongodb";
import Work from "@/models/Work";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    await dbConnect();
    const list = await Work.find({}).lean();
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
    if (!body || !body.title) return NextResponse.json({ error: "title required" }, { status: 400 });
    await dbConnect();
    const created = await Work.create(body);
    return NextResponse.json(created, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function PUT(req) {
  try {
    const body = await req.json();
    const { id, ...updates } = body;
    if (!id) return NextResponse.json({ error: "id required" }, { status: 400 });
    await dbConnect();
    const updated = await Work.findByIdAndUpdate(id, updates, { new: true }).lean();
    if (!updated) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(updated, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    const body = await req.json();
    const { id } = body;
    if (!id) return NextResponse.json({ error: "id required" }, { status: 400 });
    await dbConnect();
    const deleted = await Work.findByIdAndDelete(id).lean();
    if (!deleted) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ success: true, id });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
