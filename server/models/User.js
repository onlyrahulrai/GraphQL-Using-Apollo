import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  fullname: {
    type: String,
  },
  firstname: {
    type: String,
  },
  lastname: {
    type: String,
  },
  username: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  createdAt: String,
});

UserSchema.post("save",(doc, next) => {
  doc.fullname = `${doc.firstname} ${doc.lastname}`;
  doc.username = doc.email.split("@")[0];
  doc.save()
  next()
});

export default mongoose.model("User", UserSchema);
