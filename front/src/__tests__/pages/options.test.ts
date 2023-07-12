import { expect, expectTypeOf, test } from 'vitest';
import { options } from '@/app/options';
import { NextAuthOptions } from "next-auth";

test('options should have Next Auth properties', () => {
  expectTypeOf(options).toEqualTypeOf<NextAuthOptions>();

  expect(Object.hasOwn(options, 'providers')).toBe(true);
  expect(Object.hasOwn(options, 'session')).toBe(true);
  expect(Object.hasOwn(options, 'jwt')).toBe(true);
  expect(Object.hasOwn(options, 'callbacks')).toBe(true);

  expect(options.providers.length).not.toBe(0);
  expect(options.session?.strategy).toBe('jwt');
})
