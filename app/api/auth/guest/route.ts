import { NextResponse } from "next/server";

import { getGuestToken } from "@/services/auth";

export async function GET() {
  const token = await getGuestToken();

  return NextResponse.json({
    token,
  });
}
