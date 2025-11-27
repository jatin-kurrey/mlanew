const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });

const MONGO_URI = process.env.MONGO_URI || process.env.MONGODB_URI;

if (!MONGO_URI) {
    console.error('Please define the MONGO_URI environment variable inside .env.local');
    process.exit(1);
}

const workSchema = new mongoose.Schema({
    title: String,
    description: String,
    category: String,
    location: String,
    status: String,
    imageUrl: String,
    completionDate: Date,
    budget: String,
    beneficiaries: String,
}, { timestamps: true });

const Work = mongoose.models.Work || mongoose.model('Work', workSchema);

const projects = [
    {
        title: "Synthetic Athletics Track & Football Field",
        description: "Construction of a state-of-the-art synthetic athletics track and natural football field to promote sports culture and provide world-class facilities for the youth of Bhilai.",
        category: "Infrastructure",
        location: "Priyadarshini Parisar West",
        status: "Ongoing",
        budget: "₹4.45 Cr",
        beneficiaries: "Youth & Sports Enthusiasts",
        imageUrl: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
        title: "Rani Avanti Bai Lake Beautification",
        description: "Comprehensive beautification and restoration of the historic Rani Avanti Bai Lake. Includes walking tracks, lighting, and landscaping for public recreation.",
        category: "Environment",
        location: "Vaishali Nagar",
        status: "Ongoing",
        budget: "₹1.79 Cr",
        beneficiaries: "Local Residents",
        imageUrl: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
        title: "Khamharia Minor Canal RCC Cover",
        description: "RCC covering and lining of the Khamharia Minor Canal to improve drainage efficiency, prevent waterlogging, and enhance sanitation in the surrounding areas.",
        category: "Infrastructure",
        location: "Khamharia Area",
        status: "Approved",
        budget: "₹1.84 Cr",
        beneficiaries: "Khamharia Residents",
        imageUrl: "https://images.unsplash.com/photo-1594498653385-d5175c532c38?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
        title: "Nehru Nagar Drain Canalization",
        description: "Modernization and canalization of the drainage system in Nehru Nagar to solve persistent waterlogging issues during monsoons.",
        category: "Infrastructure",
        location: "Nehru Nagar",
        status: "Approved",
        budget: "₹1.38 Cr",
        beneficiaries: "Nehru Nagar Residents",
        imageUrl: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
        title: "Road Widening & Strengthening",
        description: "Widening and blacktopping of the key arterial road near Lal Bahadur Shastri Hospital in Ward 18 to reduce traffic congestion and improve connectivity.",
        category: "Infrastructure",
        location: "Ward 18, Near LBS Hospital",
        status: "Ongoing",
        budget: "₹1.15 Cr",
        beneficiaries: "Commuters & Patients",
        imageUrl: "https://images.unsplash.com/photo-1584972191378-d70853825a54?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
        title: "Community Building Construction",
        description: "Construction of a new community building in the Sai Mandir complex to serve as a hub for social gatherings, cultural events, and community meetings.",
        category: "Social Welfare",
        location: "Sai Mandir Complex",
        status: "Started",
        budget: "₹50 Lakhs",
        beneficiaries: "Community Members",
        imageUrl: "https://images.unsplash.com/photo-1577495508048-b635879837f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    }
];

async function seed() {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('Connected to MongoDB');

        // Clear existing work
        await Work.deleteMany({});
        console.log('Cleared existing work data');

        // Insert new projects
        await Work.insertMany(projects);
        console.log(`Seeded ${projects.length} projects successfully`);

        process.exit(0);
    } catch (error) {
        console.error('Error seeding data:', error);
        process.exit(1);
    }
}

seed();
