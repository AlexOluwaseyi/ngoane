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

export async function PUT(
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

    // Parse the request body as JSON
    const body = await request.json();

    // Check if the request body is empty
    if (!body) {
      return NextResponse.json(
        { error: "Data not sent in request." },
        { status: 400 }
      );
    }

    // Check if the request body is missing any required fields
    if (!body.testType || !body.result) {
      return NextResponse.json(
        { error: "Missing required fields." },
        { status: 400 }
      );
    }

    // Fetch record by ID from database using PrismaORM
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

    // Update the record using PrismaORM
    const updatedRecord = await prisma.diagnosticTest.update({
      where: { id: parseInt(id) },
      data: {
        patientName: body.patientName || record.patientName,
        testType: body.testType,
        result: body.result,
        testDate: new Date(),
        updatedAt: new Date(),
        notes: body.notes || null,
      },
    });

    // Return the updated record and status 200
    return NextResponse.json(
      { message: "Record updated", Record: updatedRecord },
      { status: 200 }
    );
  } catch (error) {
    const { status, message } = handlePrismaError(error);
    return NextResponse.json({ error: message }, { status });
  }
}

export async function DELETE(
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

    // Delete record from database using PrismaORM
    await prisma.diagnosticTest.delete({ where: { id: parseInt(id) } });

    // Return success message and status 200
    return NextResponse.json({ message: "Record deleted" }, { status: 200 });
  } catch (error) {
    const { status, message } = handlePrismaError(error);
    return NextResponse.json({ error: message }, { status });
  }
}
