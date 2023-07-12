import { expect, expectTypeOf, test } from 'vitest';
import { metadata } from '@/app/layout'
import { Metadata } from 'next';

const COMPANY_NAME = "Simple2B";

test('[layout] should have valid meta data', () => {
  expectTypeOf(metadata).toEqualTypeOf<Metadata>();

  expect(Object.hasOwn(metadata, 'metadataBase')).toBe(true);
  expect(Object.hasOwn(metadata, 'description')).toBe(true);
  expect(Object.hasOwn(metadata, 'viewport')).toBe(true);
  expect(Object.hasOwn(metadata, 'robots')).toBe(true);

  expect((metadata.title as any).template).toContain(COMPANY_NAME);
  expect(metadata.openGraph?.title).toBe(COMPANY_NAME);
  expect(metadata.twitter?.title).toBe(COMPANY_NAME);
})
