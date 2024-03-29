import { NextResponse } from 'next/server';
import { DeviceService, DeviceToken } from '@/openapi';

export const POST = async (request: Request) => {
  try {
    const data: DeviceToken = await request.json();
    console.log('[createDevice] request => ', data);
    const response = await DeviceService.createDeviceApiDevicePost(data);
    console.log('[createDevice] response => ', response);
    return NextResponse.json({ message: 'ok' }, { status: 200 });
  } catch (err: any) {
    console.log('[createDevice] err => ', err);
    return NextResponse.json({ message: 'error' }, { status: 400 });
  }
};
