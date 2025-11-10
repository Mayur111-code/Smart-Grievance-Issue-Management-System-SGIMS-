import mongoose from 'mongoose';

export const connectMongoDatabase = async () => {
  try {
    const data = await mongoose.connect(process.env.DB_URI);
    console.log(`✅ MongoDB connected with server: ${data.connection.host}`);
  } catch (error) {
    console.error(`❌ Database connection failed: ${error.message}`);
    process.exit(1); // stop the server if DB connection fails
  }
};


