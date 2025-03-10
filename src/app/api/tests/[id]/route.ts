import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import handlePrismaError from "@/lib/prismaErrorHandler";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
): Promise<Response> {
  try {
    // Fetch the ID from the request parameters
    const { id } = await params;

    // Check if no ID is provided
    if (!id) {
      return NextResponse.json(
        { error: "No ID provided in request." },
        { status: 400 }
      );
    }

    // Find the record by ID using PrismaORM
    const record = await prisma.diagnosticTest.findUnique({
      where: { id: parseInt(id) },
    });

    // Check if no record is found
    if (!record) {
      return NextResponse.json(
        { message: "Record not found." },
        { status: 404 }
      );
    }

    // Return the record and status 200
    return NextResponse.json(
      { message: "Record found", Record: record },
      { status: 200 }
    );
  } catch (error) {
    // Handle errors
    const { status, message } = handlePrismaError(error);
    return NextResponse.json({ error: message }, { status });
  }
}

export async function PUT() {
  return Response.json({ message: "Hello World" });
}


// export async function DELETE() {
//   return Response.json({ message: "Hello World" });
// }