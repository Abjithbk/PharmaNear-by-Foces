import bcrypt from "bcrypt";
import Medicine from "./models/medicine.js";
import Pharmacy from "./models/pharmacy.js";
import Stock from "./models/stock.js";

export async function seedProdPharmacies() {
  try {
    const pharmacyCount = await Pharmacy.countDocuments();
    if (pharmacyCount > 0) {
      console.log("🏢 Production DB already has pharmacies, skipping seed.");
      return;
    }

    console.log("🏢 Seeding fake pharmacies and stock to production database...");

    // 1. Find some real medicines that exist in the production DB
    const medNamesToFind = ["Acetaminophen", "Ibuprofen", "Amoxicillin", "Cetirizine", "Azithromycin"];
    const foundMedicines = [];
    
    for (const name of medNamesToFind) {
      const med = await Medicine.findOne({ name: { $regex: new RegExp("^" + name, "i") } });
      if (med) {
        foundMedicines.push(med);
      }
    }

    if (foundMedicines.length === 0) {
        console.log("❌ Could not find any common medicines in the DB to seed stock for.");
        return;
    }

    // 2. Create Pharmacies
    const hashedPassword = await bcrypt.hash("password123", 10);
    const pharmaciesData = [
      {
        user_name: "pharmadude",
        owner_name: "John Doe",
        address: "Mallappally Junction",
        license_number: "LIC-1001",
        city: "Mallappally",
        state: "Kerala",
        pincode: "689585",
        latitude: 9.4395,
        longitude: 76.6664,
        opening_hours: "09:00",
        closing_hours: "21:00",
        phone_number: "1234567890",
        password: hashedPassword,
        location_url: "https://maps.google.com"
      },
      {
        user_name: "kerala_pharma",
        owner_name: "Jane Smith",
        address: "Thiruvalla Town",
        license_number: "LIC-1002",
        city: "Thiruvalla",
        state: "Kerala",
        pincode: "689101",
        latitude: 9.3835,
        longitude: 76.5746,
        opening_hours: "08:00",
        closing_hours: "22:00",
        phone_number: "9876543210",
        password: hashedPassword,
        location_url: "https://maps.google.com"
      },
      {
        user_name: "city_meds",
        owner_name: "Alex Johnson",
        address: "Changanassery",
        license_number: "LIC-1003",
        city: "Changanassery",
        state: "Kerala",
        pincode: "686101",
        latitude: 9.4452,
        longitude: 76.5397,
        opening_hours: "24/7",
        closing_hours: "24/7",
        phone_number: "5556667777",
        password: hashedPassword,
        location_url: "https://maps.google.com"
      }
    ];

    const createdPharmacies = await Pharmacy.insertMany(pharmaciesData);

    // 3. Create Stock
    // Assign some random medicines to each pharmacy
    for (const pharmacy of createdPharmacies) {
      // Pick 2-4 random medicines from the ones we found
      const shuffledMeds = [...foundMedicines].sort(() => 0.5 - Math.random()).slice(0, 4);
      
      const stockItems = shuffledMeds.map(med => ({
        medicine_id: med._id,
        quantity: Math.floor(Math.random() * 100) + 10,
        price: Math.floor(Math.random() * 150) + 20
      }));

      await Stock.create({
        pharmacy_id: pharmacy._id,
        medications: stockItems
      });
    }

    console.log("✅ Successfully seeded fake pharmacies and stock data to production!");
  } catch (error) {
    console.error("❌ Error seeding fake pharmacies:", error);
  }
}
