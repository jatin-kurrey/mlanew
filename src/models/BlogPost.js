import mongoose from "mongoose";

const BlogPostSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Title is required"],
            trim: true,
            maxlength: [200, "Title cannot exceed 200 characters"],
        },
        content: {
            type: String,
            required: [true, "Content is required"],
        },
        author: {
            type: String,
            default: "MLA Rikesh Sen",
        },
        publishDate: {
            type: Date,
            default: Date.now,
        },
        tags: {
            type: [String],
            default: [],
        },
        coverImage: {
            type: String,
            validate: {
                validator: function (v) {
                    return !v || /^https?:\/\/.+/.test(v);
                },
                message: "Please provide a valid URL",
            },
        },
    },
    {
        timestamps: true,
        indexes: [{ publishDate: -1 }],
    }
);

BlogPostSchema.index({ publishDate: -1 });

export default mongoose.models.BlogPost ||
    mongoose.model("BlogPost", BlogPostSchema);
