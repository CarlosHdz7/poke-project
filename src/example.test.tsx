import React from 'react';
import { render, screen } from '@testing-library/react';

test('Description of the test', () => {
  // Render a component
  render(<p>Hello World</p>);

  // Get elements like a normal user do/ Interact with the element
  const greeting = screen.getByText(/Hello World/i);

  // Do some assertions
  expect(greeting).not.toBeNull();
});

// describe('Description of the block', () => {
//   test('Description of the test', () => {
//     // Render a component
//     render(<p>Hello World</p>);

//     // Get elements like a normal user do/ Interact with the element
//     const greeting = screen.getByText(/Hello World/i);

//     // Do some assertions
//     expect(greeting).not.toBeNull();
//   });
// });
