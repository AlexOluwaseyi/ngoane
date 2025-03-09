import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  const tests = await prisma.diagnosticTest.findMany();
  if (!tests) {
    console.log(tests);
    return NextResponse.json(tests);
  }
  return Response.json({ message: "Hello World" });
}

export async function POST(req: Request) {
  try {
    const { body } = await req.json();
    console.log(body);
    return Response.json({ message: "Hello World" }, { status: 201 });
  } catch (error) {
    console.log(error);
    return Response.json({ message: "Hello World" }, { status: 500 });
  }
}
