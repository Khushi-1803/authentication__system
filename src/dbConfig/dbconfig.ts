import mongoose from "mongoose";

export async function connect() {
  try {
    if (mongoose.connection.readyState >= 1) {
      // already connected
      return;
    }

    await mongoose.connect(process.env.MONGODB_URL as string);

    console.log("MongoDB connected");

  } catch (error) {
    console.error("DB connection error:", error);
    throw error; // 👈 VERY IMPORTANT
  }
}