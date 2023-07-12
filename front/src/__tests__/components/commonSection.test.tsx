import { expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import { CommonSection } from '@/components';

test('render CommonSection', () => {
  render(
    <CommonSection
      title="Title test"
      buttonType="filled"
      contentOrder="row"
    >
      {[]}
    </CommonSection>
  )

  const titleElement = screen.getByText('Title test');
  expect(titleElement).toBeDefined();
})
