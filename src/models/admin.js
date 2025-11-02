import { Schema, model, models } from "mongoose";

const AdminSchema = new Schema({
  fullName: {
    type: String,
    required: true,
  },
  mobileNumber: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
  },
  otp: {
    value: {
      type: String,
      required: false,
      trim: true,
      minlength: 4,
      maxlength: 6,
    },
    isExpire: { type: Boolean, required: true, default: false },
  },
});

const Admin = models?.Admin || model("Admin", AdminSchema);

export default Admin;
