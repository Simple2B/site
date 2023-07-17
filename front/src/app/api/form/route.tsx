import { CandidateService } from "@/openapi";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
  const req = await request.json();
  const formData = new FormData();
  formData.append("name", req.name);
  formData.append("email", req.email);
  formData.append("phone", req.phone);
  formData.append("message", req.message);

  const response = await CandidateService.attachCv("", formData);
  if (response["status"] === "success") {
    return NextResponse.json({ message: "ok" }, { status: 200 });
  } else {
    return NextResponse.json({ message: "error" }, { status: 400 });
  }
};
