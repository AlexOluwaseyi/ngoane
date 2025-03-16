import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import ErrorHandler from "@/lib/ErrorHandler";

export async function GET() {
  try {
    // Simple query to test connection
    const result = await prisma.$queryRaw`SELECT 1 as alive`;
    return NextResponse.json({ 
      status: "ok",
      database: "connected",
      result: result,
      timestamp: new Date().toISOString()
    });
  } catch (error: unknown) {
    // console.error("Health check failed:", error);
    // if (error instanceof Error && error.message.includes('could not connect to server')) {
    //   return NextResponse.json({ 
    //     status: "error",
    //     message: "Database connection failed. The database service may be unavailable."
    //   }, { status: 503 });
    // }
    // if (error instanceof Error && error.message.includes('timeout')) {
    //     return NextResponse.json({ 
    //         status: "error",
    //         message: "Database operation timed out. Please try again."
    //     }, { status: 504 });
    //     }
    // return NextResponse.json({ 
    //   status: "error",
    //   message: "Database connection failed", 
    //   error: error
    // }, { status: 500 });
    console.log(error)
    const { status, message } = ErrorHandler(error);
    return NextResponse.json({ message: message }, { status });
  }
}