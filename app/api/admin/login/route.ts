import { timingSafeEqual } from "node:crypto";
import { NextResponse } from "next/server";
import { createAdminSession } from "@/lib/auth";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const expectedPassword = process.env.ADMIN_PASSWORD;

    if (!expectedPassword) {
      return NextResponse.json(
        { error: "Admin login is not configured." },
        { status: 500 },
      );
    }

    const body = await request.json();
    const password =
      typeof body.password === "string" ? body.password : "";

    const expected = Buffer.from(expectedPassword);
    const supplied = Buffer.from(password);

    const valid =
      expected.length === supplied.length &&
      timingSafeEqual(expected, supplied);

    if (!valid) {
      return NextResponse.json(
        { error: "Incorrect password." },
        { status: 401 },
      );
    }

    await createAdminSession();

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Admin login error:", error);

    return NextResponse.json(
      { error: "Unable to sign in. Please try again." },
      { status: 500 },
    );
  }
}
