import mongoose from "mongoose";

const EventSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Title is required"],
            trim: true,
            maxlength: [200, "Title cannot exceed 200 characters"],
        },
        date: {
            type: Date,
            required: [true, "Date is required"],
        },
        location: {
            type: String,
            required: [true, "Location is required"],
            trim: true,
        },
        description: {
            type: String,
            required: [true, "Description is required"],
            trim: true,
        },
        images: {
            type: [String], // Array of image URLs
            default: [],
        },
        type: {
            type: String,
            enum: ["upcoming", "past"],
            default: "upcoming",
        },
    },
    {
        timestamps: true,
        indexes: [{ date: -1 }, { type: 1 }],
    }
);

EventSchema.index({ date: -1 });
EventSchema.index({ type: 1 });

export default mongoose.models.Event || mongoose.model("Event", EventSchema);
