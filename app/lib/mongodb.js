import mongoose from "mongoose";

const DATABASE_URL = process.env.MONGODB_URI;
console.log("DATABASE_URL:", DATABASE_URL);

if (!DATABASE_URL) {
  throw new Error("Please define the DATABASE_URL environment variable inside .env.local");
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    console.log("Using cached connection");
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    console.log("Creating new connection promise");
    cached.promise = mongoose.connect(DATABASE_URL, opts).then((mong) => {
      console.log("Connected to MongoDB");
      return mong;
    }).catch((err) => {
      console.error("Error connecting to MongoDB:", err);
      throw err;
    });
  }

  try {
    cached.conn = await cached.promise;
    console.log("Connection established");
    return cached.conn;
  } catch (err) {
    console.error("Error establishing connection:", err);
    throw err;
  }
}

export default dbConnect;