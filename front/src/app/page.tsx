'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

// Static export can't do server-side redirects, so redirect to /en on the client
export default function RootPage() {
  const router = useRouter();
  useEffect(() => {
    router.replace('/en');
  }, [router]);
  return null;
}
