import { NextResponse } from "next/server";
import { connectToDB } from "@/utils/database";
import ContactRequest from "@/models/contactRequest";

// POST - Create new contact request
export async function POST(request) {
  try {
    // Connect to database
    await connectToDB();

    // Parse request body
    const body = await request.json();
    const { name, email, phoneNumber, businessDetails } = body;

    // Validate required fields
    if (!name || !email || !phoneNumber || !businessDetails) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Validate Indian phone number (10 digits starting with 6-9)
    const cleanedPhone = phoneNumber.replace(/\D/g, "");
    const indianPhoneRegex = /^[6-9]\d{9}$/;

    if (!indianPhoneRegex.test(cleanedPhone)) {
      return NextResponse.json(
        { error: "Please enter a valid 10-digit Indian phone number" },
        { status: 400 }
      );
    }

    // Create new contact request
    const contactRequest = await ContactRequest.create({
      name,
      email,
      phoneNumber,
      businessDetails,
    });

    return NextResponse.json(
      {
        message: "Contact request submitted successfully",
        data: contactRequest,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error saving contact request:", error);
    return NextResponse.json(
      { error: "Failed to submit contact request" },
      { status: 500 }
    );
  }
}
