import { CONTACT_STATUSES, PENDING_CONTACT_STATUS } from "@/utils/helper";
import { Schema, model, models } from "mongoose";

const ContactRequestSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  businessDetails: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: CONTACT_STATUSES,
    default: PENDING_CONTACT_STATUS,
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

ContactRequestSchema.index({ created: -1 }); // For fast sorting

const ContactRequest =
  models?.ContactRequest || model("ContactRequest", ContactRequestSchema);

export default ContactRequest;
