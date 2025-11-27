import mongoose from "mongoose";

const SiteConfigSchema = new mongoose.Schema(
    {
        heroTitle: {
            type: String,
            default: "वैशाली नगर का सेवक, Rikesh Sen",
        },
        heroSubtitle: {
            type: String,
            default: '"सेवा और विकास के साथ, ईमानदारी से जनता का विश्वास जीतने का संकल्प।"',
        },
        heroImage: {
            type: String,
            default: "", // Will be a Cloudinary URL
        },
        mlaName: {
            type: String,
            default: "Rikesh Sen",
        },
        mlaDesignation: {
            type: String,
            default: "MLA, Vaishali Nagar",
        },
        contactEmail: {
            type: String,
            default: "contact@rikeshsen.com",
        },
        contactPhone: {
            type: String,
            default: "+91 98765 43210",
        },
        socialLinks: {
            facebook: String,
            twitter: String,
            instagram: String,
            youtube: String,
        },
    },
    { timestamps: true }
);

export default mongoose.models.SiteConfig || mongoose.model("SiteConfig", SiteConfigSchema);
