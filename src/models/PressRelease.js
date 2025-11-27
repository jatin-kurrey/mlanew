import mongoose from "mongoose";

const PressReleaseSchema = new mongoose.Schema(
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
            default: Date.now,
        },
        content: {
            type: String,
            trim: true,
        },
        mediaType: {
            type: String,
            enum: ["photo", "video", "news"],
            required: true,
        },
        mediaUrl: {
            type: String,
            required: [true, "Media URL is required"],
            validate: {
                validator: function (v) {
                    return /^https?:\/\/.+/.test(v);
                },
                message: "Please provide a valid URL",
            },
        },
    },
    {
        timestamps: true,
        indexes: [{ date: -1 }, { mediaType: 1 }],
    }
);

PressReleaseSchema.index({ date: -1 });
PressReleaseSchema.index({ mediaType: 1 });

export default mongoose.models.PressRelease ||
    mongoose.model("PressRelease", PressReleaseSchema);
