import React from 'react';
import { render, fireEvent, getByText, getByLabelText, queryByText, getAllByRole } from '@testing-library/react';
import App from './App'; // Update with the correct path to your App component

test('renders Product Page and Product Listing titles', () => {
  const { getByText } = render(<App />);
  const productPageTitle = getByText('Product Page');
  const productListingTitle = getByText('Product Listing');
  expect(productPageTitle).toBeInTheDocument();
  expect(productListingTitle).toBeInTheDocument();
});

test('adds a product when "Add Product" button is clicked', () => {
  const { getByLabelText, getByText, getAllByRole } = render(<App />);
  const productNameInput = getByLabelText('Product Name');
  const quantityInput = getByLabelText('Quantity');
  const addButton = getByText('Add Product');
  fireEvent.change(productNameInput, { target: { value: 'Test Product' } });
  fireEvent.change(quantityInput, { target: { value: '5' } });
  fireEvent.click(addButton);
  const productNames = getAllByRole('listitem').map(item =>
    item.querySelector('h3').textContent
  );
  expect(productNames).toContain('Test Product');
});

test('increases and decreases quantity of a product', () => {
  const { getByText } = render(<App />);
  const addButton = getByText('Add Product');
  fireEvent.click(addButton);
  const increaseButton = getByText('+');
  const decreaseButton = getByText('-');
  const quantityText = getByText('Quantity: 0');
  fireEvent.click(increaseButton);
  expect(quantityText.textContent).toBe('Quantity: 1');
  fireEvent.click(decreaseButton);
  expect(quantityText.textContent).toBe('Quantity: 0');
});

test('deletes a product when quantity is 0', () => {
  const { getByText, queryByText, getAllByRole } = render(<App />);
  const addButton = getByText('Add Product');
  fireEvent.click(addButton);
  const deleteButton = getByText('Delete');
  fireEvent.click(deleteButton);
  const deletedProduct = queryByText('Test Product');
  expect(deletedProduct).toBeNull();
});
