import { NextApiHandler } from 'next';
import { NextRequest, NextResponse } from 'next/server';
import { DeviceService } from "@/openapi/services/DeviceService";
import { DeviceToken } from "@/openapi/models/DeviceToken";

export const POST = async(request: Request) => {
  const data: DeviceToken = await request.json();
  console.log("[createDevice] request => ", data)
  try {
    const response =  await DeviceService.createDeviceApiDevicePost(data);
    console.log("[createDevice] response => ", response)
    return NextResponse.json({ message: "ok" }, { status: 200 });
  } catch (err: any) {
    console.log("[createDevice] err => ", err)
    return NextResponse.json({ message: "error" }, { status: 400 });
  }
}
