import mongoose from "mongoose";

const connectMongoDB = async () => {
  try {
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log("Connected to MongoDB.");
    }
  } catch (error) {
    console.log("Error connecting to MongoDB: ", error);
  }
};

export default connectMongoDB;


