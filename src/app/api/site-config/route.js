import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/mongodb";
import SiteConfig from "@/models/SiteConfig";
import { requireAuth } from "@/lib/auth";

export async function GET() {
    try {
        await connectToDB();
        let config = await SiteConfig.findOne();
        if (!config) {
            config = await SiteConfig.create({});
        }
        return NextResponse.json({ success: true, data: config });
    } catch (err) {
        return NextResponse.json({ success: false, error: err.message }, { status: 500 });
    }
}

export async function POST(req) {
    const authResult = await requireAuth();
    if (authResult instanceof NextResponse) return authResult;

    try {
        await connectToDB();
        const body = await req.json();

        // Upsert: update if exists, otherwise create
        const config = await SiteConfig.findOneAndUpdate({}, body, {
            new: true,
            upsert: true,
            setDefaultsOnInsert: true,
        });

        return NextResponse.json({ success: true, data: config });
    } catch (err) {
        return NextResponse.json({ success: false, error: err.message }, { status: 500 });
    }
}
