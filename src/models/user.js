// models/user.js
import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  // ========== Basic User Info (Saved on Login) ==========
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  image: {
    type: String,
  },
  provider: {
    type: String,
    enum: ["google", "facebook"],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },

  // ========== Multiple Businesses with Subscriptions ==========
  businesses: [
    {
      businessName: {
        type: String,
        required: true,
        trim: true,
      },
      phoneNumber: {
        type: String,
        trim: true,
      },
      address: {
        type: String,
        trim: true,
      },
      website: {
        type: String,
        trim: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },

      // Subscription for this specific business
      subscription: {
        planType: {
          type: String,
          enum: ["Starter", "Pro", "Enterprise", null],
          default: null,
        },
        planPrice: {
          type: Number,
        },
        duration: {
          type: String,
          enum: ["monthly", "6-months", "yearly", null],
        },
        status: {
          type: String,
          enum: ["active", "expired", "cancelled", null],
          default: null,
        },
        startDate: {
          type: Date,
        },
        endDate: {
          type: Date,
        },
      },

      // Payment history for this business
      payments: [
        {
          orderId: String,
          paymentId: String,
          amount: Number,
          status: {
            type: String,
            enum: ["pending", "completed", "failed"],
            default: "pending",
          },
          createdAt: {
            type: Date,
            default: Date.now,
          },
        },
      ],
    },
  ],
});

const User = models?.User || model("User", UserSchema);
export default User;
