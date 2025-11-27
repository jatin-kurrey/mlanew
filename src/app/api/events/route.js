import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/mongodb";
import Event from "@/models/Event";
import { requireAuth } from "@/lib/auth";

export async function GET(req) {
    try {
        await connectToDB();
        const { searchParams } = new URL(req.url);
        const type = searchParams.get("type");

        const query = {};
        if (type) query.type = type;

        const events = await Event.find(query).sort({ date: 1 }).lean();
        // Return direct array for consistency with Contact and Work APIs
        return NextResponse.json(events, { status: 200 });
    } catch (err) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}

export async function POST(req) {
    const authResult = await requireAuth();
    if (authResult instanceof NextResponse) return authResult;

    try {
        const body = await req.json();
        await connectToDB();
        const newEvent = await Event.create(body);
        return NextResponse.json(newEvent, { status: 201 });
    } catch (err) {
        return NextResponse.json({ error: err.message }, { status: 400 });
    }
}
