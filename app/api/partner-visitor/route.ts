// app/api/partner-visitor/route.ts
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import * as Yup from "yup";
import { partnerVisitorSchema } from "./validation";
import {
  PrismaClientKnownRequestError,
  PrismaClientValidationError,
} from "@prisma/client/runtime/library";
import PrismaErrorHandler from "@/prisma/prisma-error-handler";

export async function GET() {
  const partnerVisitors = await prisma.partnerVisitor.findMany();
  return NextResponse.json(partnerVisitors);
}

export async function POST(request: Request) {
  try {
    // Parse the request body
    const body = await request.json();

    // Validate the incoming data using Yup
    await partnerVisitorSchema.validate(body, { abortEarly: false });

    // Extract phone and email from the body
    const { phone, email } = body;

    // Ensure at least one of phone or email is provided
    if (!phone && !email) {
      return NextResponse.json(
        { error: "At least one of 'phone' or 'email' must be provided." },
        { status: 400 }
      );
    }

    // Check if a record with the same phone or email already exists
    let existingRecord;
    if (phone) {
      existingRecord = await prisma.partnerVisitor.findUnique({
        where: { phone },
      });
    }
    if (!existingRecord && email) {
      existingRecord = await prisma.partnerVisitor.findUnique({
        where: { email },
      });
    }

    // Determine the unique identifier for the upsert operation
    const uniqueIdentifier = existingRecord?.id
      ? { id: existingRecord.id }
      : phone
      ? { phone }
      : email
      ? { email }
      : null;

    if (!uniqueIdentifier) {
      return NextResponse.json(
        { error: "No unique identifier found for the upsert operation." },
        { status: 400 }
      );
    }

    // Use upsert to either update the existing record or create a new one
    const newPartnerVisitor = await prisma.partnerVisitor.upsert({
      where:
        typeof uniqueIdentifier === "string"
          ? { id: uniqueIdentifier }
          : uniqueIdentifier,
      update: {
        ...body,
      },
      create: {
        ...body,
      },
    });

    return NextResponse.json(newPartnerVisitor, { status: 201 });
  } catch (error) {
    // Handle validation errors
    if (error instanceof Yup.ValidationError) {
      const errors = error.inner.reduce(
        (acc: Record<string, string>, issue) => {
          acc[issue.path || "unknown"] = issue.message;
          return acc;
        },
        {}
      );
      return NextResponse.json({ errors }, { status: 400 });
    }

    // Handle Prisma errors
    if (
      error instanceof PrismaClientKnownRequestError ||
      error instanceof PrismaClientValidationError
    ) {
      const prismaErrorHandler = new PrismaErrorHandler();
      return prismaErrorHandler?.handle(error);
    }

    // Handle other errors
    return NextResponse.json(
      { error: "An unexpected error occurred." },
      { status: 500 }
    );
  }
}
