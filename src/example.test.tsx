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

// JEST
//~ Test Launcher
//~ describe
//~ test
//~ it
//~ toMatchSnapShot
//~ fireEvent
//~ expect

// TESTING LIBRARY TOOLS
//~ render
//~ screen
//~ getBy
//~ findBy
//~ queryBy
//~ userEvent
//~ waitFor

//~ REDUX
//~ MemoryRouter
//~ Provider

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
