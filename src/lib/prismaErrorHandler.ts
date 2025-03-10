import { Prisma } from "@prisma/client";

function handlePrismaError(error: unknown) {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    switch (error.code) {
      case "P2000":
        return { status: 400, message: "Value too large for field." };

      case "P2002":
        return {
          status: 409,
          message: "Unique constraint failed. Duplicate record exists.",
        };

      case "P2003":
        return {
          status: 400,
          message: "Foreign key constraint failed. Related record missing.",
        };

      case "P2004":
        return {
          status: 403,
          message: "Transaction failed due to constraint violation.",
        };

      case "P2005":
        return { status: 400, message: "Invalid value stored in database." };

      case "P2006":
        return { status: 400, message: "Mismatched data type for a field." };

      case "P2025":
        return {
          status: 404,
          message: "Record not found. The requested resource does not exist.",
        };

      case "P2010":
        return {
          status: 500,
          message: "Raw query failed. Invalid SQL syntax.",
        };

      default:
        return {
          status: 500,
          message: "Database error occurred. Please try again.",
        };
    }
  }

  if (error instanceof Prisma.PrismaClientValidationError) {
    return {
      status: 400,
      message: "Validation error. Check input data format.",
    };
  }

  if (error instanceof Prisma.PrismaClientInitializationError) {
    return {
      status: 500,
      message: "Database connection failed. Ensure the database is running.",
    };
  }

  if (error instanceof Prisma.PrismaClientRustPanicError) {
    return {
      status: 500,
      message: "Unexpected database error. Contact support.",
    };
  }

  if (error instanceof Prisma.PrismaClientUnknownRequestError) {
    return {
      status: 500,
      message: "An unknown error occurred in the database.",
    };
  }

  if (error instanceof SyntaxError){
    return {
      status: 400,
      message: `Invalid JSON syntax: ${error.message}`,
    };
  }
  return {
    status: 500,
    message: "An unexpected error occurred. Please try again later.",
  };
}

export default handlePrismaError;