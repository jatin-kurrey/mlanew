// src/models/Contact.js
import mongoose from "mongoose";

const ContactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      maxlength: [100, "Name cannot exceed 100 characters"]
    },
    mobile: {
      type: String,
      trim: true,
      match: [/^[0-9]{10}$/, "Please enter a valid 10-digit mobile number"]
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"]
    },
    type: {
      type: String,
      enum: ["suggestion", "complaint", "other"],
      default: "other"
    },
    message: {
      type: String,
      required: [true, "Message is required"],
      trim: true,
      maxlength: [1000, "Message cannot exceed 1000 characters"]
    },
    status: {
      type: String,
      enum: ["pending", "resolved", "in-progress"],
      default: "pending"
    }
  },
  {
    timestamps: true,
    // Add indexes for better query performance
    indexes: [
      { createdAt: -1 }, // For sorting by date
      { status: 1 }, // For filtering by status
      { type: 1 } // For filtering by type
    ]
  }
);

// Create indexes
ContactSchema.index({ createdAt: -1 });
ContactSchema.index({ status: 1 });
ContactSchema.index({ type: 1 });

export default mongoose.models.Contact || mongoose.model("Contact", ContactSchema);
