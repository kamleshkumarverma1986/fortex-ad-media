import { NextResponse } from "next/server";
import { connectToDB } from "@/utils/database";
import ContactRequest from "@/models/contactRequest";
import { CONTACT_STATUSES } from "@/utils/helper";

export async function PATCH(request, context) {
  try {
    await connectToDB();

    const { id } = await context.params;
    const body = await request.json();
    const { status } = body;

    // Validate status
    const validStatuses = CONTACT_STATUSES;
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { success: false, error: "Invalid status" },
        { status: 400 }
      );
    }

    console.log("this is the id ", id);

    // Update contact
    const contact = await ContactRequest.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    );

    if (!contact) {
      return NextResponse.json(
        { success: false, error: "Contact not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: contact,
    });
  } catch (error) {
    console.error("Error updating contact:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update contact" },
      { status: 500 }
    );
  }
}
