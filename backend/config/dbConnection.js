import mongoose from "mongoose";

const dbConnect = async () => {
  try {
    console.log(mongoose.connection.readyState)
    if (mongoose.connection.readyState === 1) {
      console.log("Database is already connected");
      return;
    }

    await mongoose.connect(process.env.DB_URL);
    console.log("Database connected successfully.✅");
  } catch (error) {
    console.log("Error while connecting to database ❌ ", error);
  }
};

export default dbConnect;
