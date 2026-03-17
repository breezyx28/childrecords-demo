import {
  PrismaClientKnownRequestError,
  PrismaClientValidationError,
} from "@prisma/client/runtime/library";
import { NextResponse } from "next/server";

class PrismaErrorHandler {
  handle(error: unknown) {
    // Handle Prisma validation errors (e.g., invalid data types)
    if (error instanceof PrismaClientValidationError) {
      const errorMessage = error.message;

      // Regex to extract column name and expected data type
      const matches = errorMessage.match(
        /The argument '(\w+)' must be (.+?), but you provided/
      );

      if (matches && matches[1] && matches[2]) {
        const columnName = matches[1]; // Extract the column name
        const expectedType = matches[2].trim(); // Extract the expected data type

        return NextResponse.json(
          {
            error: `Invalid data type for column "${columnName}". Expected ${expectedType}.`,
          },
          { status: 400 }
        );
      }

      // Fallback: Return the raw Prisma error message
      return NextResponse.json(
        { error: errorMessage }, // Use the raw error message from Prisma
        { status: 400 }
      );
    }

    // Handle Prisma known request errors (e.g., unique constraint violations)
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        // Unique constraint violation
        const target = error.meta?.target as string[] | undefined; // Extract the target field(s) causing the conflict

        if (target && target.length > 0) {
          // Construct a user-friendly error message for each field
          const errors = target.reduce((acc: Record<string, string>, field) => {
            acc[field] =
              field === "phone"
                ? "Phone number already exists"
                : field === "email"
                ? "Email address already exists"
                : `${field} already exists`; // Customize the error message
            return acc;
          }, {});

          return NextResponse.json({ errors }, { status: 409 });
        }
      } else if (error.code === "P2003") {
        // Foreign key constraint violation
        return NextResponse.json(
          { error: "Invalid reference to another record" },
          { status: 400 }
        );
      } else {
        // Other Prisma errors
        return NextResponse.json(
          { error: "Database error occurred" },
          { status: 500 }
        );
      }
    }

    // Handle other unexpected errors
    console.error("Error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}

export default PrismaErrorHandler;
