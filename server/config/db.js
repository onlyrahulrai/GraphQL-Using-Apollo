import mongooose from "mongoose";

const connectDB = async () => {
  const conn = await mongooose.connect(process.env.MONGO_URI);

  console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline.bold);
};

export default connectDB;
