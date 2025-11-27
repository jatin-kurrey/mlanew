import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/mongodb";
import Scheme from "@/models/Scheme";
import { requireAuth } from "@/lib/auth";

export async function GET(req) {
    try {
        await connectToDB();
        const { searchParams } = new URL(req.url);
        const category = searchParams.get("category");

        const query = {};
        if (category) query.category = category;

        const schemes = await Scheme.find(query).sort({ createdAt: -1 }).lean();
        return NextResponse.json(schemes, { status: 200 });
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
        const newScheme = await Scheme.create(body);
        return NextResponse.json(newScheme, { status: 201 });
    } catch (err) {
        return NextResponse.json({ error: err.message }, { status: 400 });
    }
}
