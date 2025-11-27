import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/mongodb";
import Scheme from "@/models/Scheme";
import { requireAuth } from "@/lib/auth";

export async function DELETE(req, { params }) {
    const authResult = await requireAuth();
    if (authResult instanceof NextResponse) return authResult;

    try {
        await connectToDB();
        const { id } = params;
        const deleted = await Scheme.findByIdAndDelete(id);
        if (!deleted) return NextResponse.json({ success: false, error: "Not found" }, { status: 404 });
        return NextResponse.json({ success: true, message: "Deleted successfully" });
    } catch (err) {
        return NextResponse.json({ success: false, error: err.message }, { status: 500 });
    }
}

export async function PUT(req, { params }) {
    const authResult = await requireAuth();
    if (authResult instanceof NextResponse) return authResult;

    try {
        await connectToDB();
        const { id } = params;
        const body = await req.json();
        const updated = await Scheme.findByIdAndUpdate(id, body, { new: true, runValidators: true });
        if (!updated) return NextResponse.json({ success: false, error: "Not found" }, { status: 404 });
        return NextResponse.json({ success: true, data: updated });
    } catch (err) {
        return NextResponse.json({ success: false, error: err.message }, { status: 500 });
    }
}
