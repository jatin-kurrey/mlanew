// src/models/Work.js
import mongoose from "mongoose";

const WorkSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      maxlength: [200, "Title cannot exceed 200 characters"]
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
      maxlength: [2000, "Description cannot exceed 2000 characters"]
    },
    imageUrl: {
      type: String,
      required: [true, "Image URL is required"],
      trim: true,
      validate: {
        validator: function (v) {
          // Basic URL validation
          return /^https?:\/\/.+/.test(v);
        },
        message: "Please provide a valid image URL"
      }
    },
    link: {
      type: String,
      default: "",
      trim: true,
      validate: {
        validator: function (v) {
          // Allow empty string or valid URL
          return !v || /^https?:\/\/.+/.test(v);
        },
        message: "Please provide a valid URL"
      }
    },
  },
  {
    timestamps: true,
    // Add indexes for better query performance
    indexes: [
      { createdAt: -1 } // For sorting by date (most recent first)
    ]
  }
);

// Create index for sorting
WorkSchema.index({ createdAt: -1 });

export default mongoose.models.Work || mongoose.model("Work", WorkSchema);
