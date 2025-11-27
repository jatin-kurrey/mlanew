import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/mongodb";
import PressRelease from "@/models/PressRelease";
import { requireAuth } from "@/lib/auth";

export async function GET(req) {
    try {
        await connectToDB();
        const { searchParams } = new URL(req.url);
        const type = searchParams.get("type");

        const query = {};
        if (type) query.mediaType = type;

        const media = await PressRelease.find(query).sort({ date: -1 }).lean();
        return NextResponse.json(media, { status: 200 });
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
        const newMedia = await PressRelease.create(body);
        return NextResponse.json(newMedia, { status: 201 });
    } catch (err) {
        return NextResponse.json({ error: err.message }, { status: 400 });
    }
}
