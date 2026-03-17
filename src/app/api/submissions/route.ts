import { NextResponse } from "next/server";
import {
  createSubmission,
  type SubmissionInput,
  validateSubmission,
} from "@/lib/submissions";

export async function POST(request: Request) {
  let body: SubmissionInput;

  try {
    body = (await request.json()) as SubmissionInput;
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON body." },
      { status: 400 },
    );
  }

  const validation = validateSubmission(body);

  if (!validation.valid) {
    return NextResponse.json(
      { error: "Validation failed.", details: validation.errors },
      { status: 400 },
    );
  }

  try {
    const submission = await createSubmission(body);

    return NextResponse.json({
      ok: true,
      id: submission.id,
      message: "Evidence submitted successfully.",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to save submission." },
      { status: 500 },
    );
  }
}
