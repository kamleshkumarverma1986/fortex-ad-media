import { Schema, model, models } from "mongoose";

const AdminSchema = new Schema({
  email: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 8,
  },
  isAdmin: {
    type: Boolean,
    default: true,
  },
});

const Admin = models?.Admin || model("Admin", AdminSchema);

export default Admin;
