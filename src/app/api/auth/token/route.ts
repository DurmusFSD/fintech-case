import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { token } = await req.json();

  const res = NextResponse.json({ success: true });
  res.cookies.set("fintech_token", token, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
  });
  return res;
}

export async function DELETE() {
  const res = NextResponse.json({ success: true });
  res.cookies.set("fintech_token", "", { httpOnly: true, path: "/", maxAge: 0 });
  return res;
}
