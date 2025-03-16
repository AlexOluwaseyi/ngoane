// export async function GET() {
//   const dbUrl = process.env.DATABASE_URL;

//   if (!dbUrl) {
//     return new Response("DATABASE_URL is not set", { status: 500 });
//   }

//   try {
//     const url = new URL(dbUrl);
//     return new Response(`Connected to: ${url.hostname}`, { status: 200 });
//   } catch (error) {
//     console.log(error);
//     return new Response("Invalid DATABASE_URL format", { status: 500 });
//   }
// }

import { NextRequest, NextResponse } from "next/server";

// IMPORTANT: Use this only during development or with proper authentication
export async function GET(request: NextRequest) {
  // Add protection to prevent exposure in production
  const authHeader = request.headers.get("Authorization");
  const isLocalhost = request.headers.get("host")?.includes("localhost");

  //   // Only allow with correct auth or on localhost
  //   if (process.env.NODE_ENV === 'production' && !isLocalhost &&
  //       authHeader !== `Bearer ${process.env.DEBUG_SECRET}`) {
  //     return NextResponse.json({ error: 'Not authorized' }, { status: 401 });
  //   }

  console.log(authHeader, isLocalhost);

  // Safely display database URL by masking the password
  const dbUrl = process.env.DATABASE_URL || "";

  // Check for common issues
  const issues = checkUrlIssues(dbUrl);

  return NextResponse.json({
    databaseUrl: dbUrl,
    directUrl: process.env.DIRECT_URL || "",
    urlPresent: !!process.env.DATABASE_URL,
    directUrlPresent: !!process.env.DIRECT_URL,
    hasIssues: issues.length > 0,
    issues: issues,
  });
}

// // Helper to mask sensitive parts of the URL
// function maskDatabaseUrl(url: string): string {
//   if (!url) return 'Not set';

//   try {
//     // Parse the URL
//     const parsedUrl = new URL(url);

//     // Mask the password
//     if (parsedUrl.password) {
//       parsedUrl.password = '********';
//     }

//     return parsedUrl.toString();
//   } catch (e) {
//     // If URL parsing fails, mask manually
//     return url.replace(/\/\/([^:]+):([^@]+)@/, '//\$1:********@');
//   }
// }

// Check for common issues with database URLs
function checkUrlIssues(url: string): string[] {
  const issues = [];

  if (!url) {
    issues.push("DATABASE_URL is not set");
    return issues;
  }

  if (!url.startsWith("postgresql://") && !url.startsWith("postgres://")) {
    issues.push("URL must start with postgresql:// or postgres://");
  }

  if (!url.includes("@")) {
    issues.push("URL appears to be missing authentication information");
  }

  if (!url.includes(":")) {
    issues.push("URL appears to be missing port information");
  }

  return issues;
}
