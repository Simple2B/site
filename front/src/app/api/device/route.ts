import { createDeviceApiDevicePost } from '@/api/device/device';
import { DeviceToken } from '@/api/model';
import { NextResponse } from 'next/server';

export const POST = async (request: Request) => {
  console.log('Post [createDevice] => ');
  try {
    const data: DeviceToken = await request.json();
    console.log('[createDevice] request => ', data);
    const response = await createDeviceApiDevicePost(data);
    console.log('[createDevice] response => ', response);
    return NextResponse.json({ message: 'ok' }, { status: 200 });
  } catch (err: any) {
    console.log('[createDevice] err => ', err);
    return NextResponse.json({ message: 'error' }, { status: 400 });
  }
};
