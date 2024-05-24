import { NextResponse } from "next/server";
import { contactForm } from "@/api/client/client";
import { BodyContactForm } from "@/api/model";

export const POST = async (request: Request) => {
  console.log("Api post contactForm");
  try {
    const req: BodyContactForm = await request.json();
    console.log("req ---->", req);
    const response = await contactForm(req);
    if (response.data["status"] === "success") {
      return NextResponse.json({ message: "ok" }, { status: 200 });
    } else {
      return NextResponse.json({ message: "error" }, { status: 400 });
    }
  } catch (error) {
    console.error("Error api contact form", error);
    return NextResponse.json({ message: "error" }, { status: 400 });
  }
};
