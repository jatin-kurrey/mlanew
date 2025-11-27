import mongoose from "mongoose";

const SchemeSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Title is required"],
            trim: true,
            maxlength: [200, "Title cannot exceed 200 characters"],
        },
        description: {
            type: String,
            required: [true, "Description is required"],
            trim: true,
        },
        eligibility: {
            type: String,
            trim: true,
        },
        documents: {
            type: String, // List of required documents
            trim: true,
        },
        applyLink: {
            type: String,
            trim: true,
            validate: {
                validator: function (v) {
                    return !v || /^https?:\/\/.+/.test(v);
                },
                message: "Please provide a valid URL",
            },
        },
        category: {
            type: String,
            enum: ["central", "state", "local"],
            required: [true, "Category is required"],
        },
    },
    {
        timestamps: true,
        indexes: [{ category: 1 }, { createdAt: -1 }],
    }
);

SchemeSchema.index({ category: 1 });
SchemeSchema.index({ createdAt: -1 });

export default mongoose.models.Scheme || mongoose.model("Scheme", SchemeSchema);
