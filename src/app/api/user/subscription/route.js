import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import { connectToDB } from "@/utils/database";
import User from "@/models/user";

export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const {
      businessName,
      businessDetails,
      phoneNumber,
      address,
      website,
      planType,
      planPrice,
      duration,
    } = body;

    // Validate required fields
    if (
      !businessName ||
      !businessDetails ||
      !phoneNumber ||
      !address ||
      !planType ||
      !planPrice ||
      !duration
    ) {
      return NextResponse.json(
        { error: "All business and plan details are required" },
        { status: 400 }
      );
    }

    await connectToDB();

    // Calculate subscription dates
    const startDate = new Date();
    let endDate = new Date();

    if (duration === "monthly") {
      endDate.setMonth(endDate.getMonth() + 1);
    } else if (duration === "6-months") {
      endDate.setMonth(endDate.getMonth() + 6);
    } else if (duration === "yearly") {
      endDate.setFullYear(endDate.getFullYear() + 1);
    }

    // Generate order ID (you'll replace this with actual payment gateway order ID later)
    const orderId = `order_${Date.now()}_${Math.random()
      .toString(36)
      .substr(2, 9)}`;

    // Create new business with subscription
    const newBusiness = {
      businessName,
      businessDetails,
      phoneNumber,
      address,
      website: website || "",
      subscription: {
        planType,
        planPrice,
        duration,
        status: "active", // Will be "pending" when payment gateway is integrated
        startDate,
        endDate,
      },
      payments: [
        {
          orderId,
          paymentId: "", // Will be filled after payment success
          amount: planPrice,
          status: "pending", // Will be "completed" after payment
          createdAt: new Date(),
        },
      ],
    };

    // Update user document
    const updatedUser = await User.findOneAndUpdate(
      { email: session.user.email },
      { $push: { businesses: newBusiness } },
      { new: true }
    );

    if (!updatedUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(
      {
        success: true,
        message: "Subscription created successfully",
        business: newBusiness,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Subscription creation error:", error);
    return NextResponse.json(
      { error: "Failed to create subscription" },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDB();

    const user = await User.findOne({ email: session.user.email }).select(
      "businesses"
    );

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(
      {
        success: true,
        businesses: user.businesses || [],
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Fetch subscriptions error:", error);
    return NextResponse.json(
      { error: "Failed to fetch subscriptions" },
      { status: 500 }
    );
  }
}
