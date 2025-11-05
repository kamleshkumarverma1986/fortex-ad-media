import { NextResponse } from "next/server";
import { connectToDB } from "@/utils/database";
import ContactRequest from "@/models/contactRequest";

// GET - Fetch all contacts with pagination, sorting, and filtering
export async function GET(request) {
  try {
    await connectToDB();

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 10;
    const sortBy = searchParams.get("sortBy") || "created";
    const sortOrder = searchParams.get("sortOrder") || "desc";
    const status = searchParams.get("status");

    const skip = (page - 1) * limit;

    // Build filter
    const filter = {};
    if (status && status !== "ALL") {
      filter.status = status;
    }

    // Build sort
    const sort = {};
    sort[sortBy] = sortOrder === "asc" ? 1 : -1;

    // Get total count
    const total = await ContactRequest.countDocuments(filter);

    // Get paginated data
    const contacts = await ContactRequest.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .lean();

    return NextResponse.json({
      success: true,
      data: contacts,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching contacts:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch contacts" },
      { status: 500 }
    );
  }
}
