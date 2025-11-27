"use client";
import { useState } from "react";
import { Upload, X, Image as ImageIcon } from "lucide-react";
import Image from "next/image";

export default function ImageUpload({ value, onChange, label = "Image" }) {
    const [uploading, setUploading] = useState(false);

    const handleUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Validation
        if (!file.type.startsWith("image/")) {
            alert("Please upload an image file");
            return;
        }

        if (file.size > 5 * 1024 * 1024) { // 5MB
            alert("File too large (max 5MB)");
            return;
        }

        setUploading(true);
        const formData = new FormData();
        formData.append("file", file);

        try {
            const res = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });
            const data = await res.json();
            if (data.success) {
                onChange(data.url);
            } else {
                alert("Upload failed: " + data.error);
            }
        } catch (error) {
            console.error("Upload error:", error);
            alert("Upload failed");
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">{label}</label>

            {value ? (
                <div className="relative w-full h-48 bg-gray-100 rounded-lg overflow-hidden border border-gray-200 group">
                    <Image src={value} alt="Uploaded" fill className="object-cover" />
                    <button
                        type="button"
                        onClick={() => onChange("")}
                        className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                        <X size={16} />
                    </button>
                </div>
            ) : (
                <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-6 hover:bg-gray-50 transition-colors text-center cursor-pointer">
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleUpload}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        disabled={uploading}
                    />
                    <div className="flex flex-col items-center justify-center text-gray-500">
                        {uploading ? (
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#ff9933]"></div>
                        ) : (
                            <>
                                <Upload size={32} className="mb-2 text-gray-400" />
                                <p className="text-sm font-medium">Click to upload image</p>
                                <p className="text-xs text-gray-400 mt-1">PNG, JPG, GIF up to 5MB</p>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
