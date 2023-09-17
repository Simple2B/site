import { expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import { CustomButton } from '@/components';

test('button should exists', () => {
  render(<CustomButton />)
  const button = screen.getByRole('button');

  expect(button).toBeDefined();
})
