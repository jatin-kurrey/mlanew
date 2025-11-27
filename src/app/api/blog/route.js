import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/mongodb";
import BlogPost from "@/models/BlogPost";
import { requireAuth } from "@/lib/auth";

export async function GET(req) {
    try {
        await connectToDB();
        const posts = await BlogPost.find({}).sort({ publishDate: -1 }).lean();
        return NextResponse.json(posts, { status: 200 });
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
        const newPost = await BlogPost.create(body);
        return NextResponse.json(newPost, { status: 201 });
    } catch (err) {
        return NextResponse.json({ error: err.message }, { status: 400 });
    }
}
