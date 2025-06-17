import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

// Mock the alert function
global.alert = jest.fn();

describe('App Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders all main sections', () => {
    render(<App />);
    // Header: h1
    expect(screen.getByRole('heading', { level: 1, name: 'Little Lemon' })).toBeInTheDocument();
    // Hero
    expect(screen.getByText('Welcome to Little Lemon')).toBeInTheDocument();
    // Booking section
    expect(screen.getByText('Book Your Table')).toBeInTheDocument();
    // Footer: h3
    expect(screen.getByRole('heading', { level: 3, name: 'Little Lemon' })).toBeInTheDocument();
  });

  test('renders navigation menu', () => {
    render(<App />);
    // Use getByRole to distinguish nav link
    const navLink = screen.getByRole('link', { name: 'Book Table' });
    expect(navLink).toBeInTheDocument();
  });

  test('renders booking form with all fields', () => {
    render(<App />);
    expect(screen.getByLabelText('Full Name *')).toBeInTheDocument();
    expect(screen.getByLabelText('Email Address *')).toBeInTheDocument();
    expect(screen.getByLabelText('Phone Number *')).toBeInTheDocument();
    expect(screen.getByLabelText('Number of Guests *')).toBeInTheDocument();
    expect(screen.getByLabelText('Date *')).toBeInTheDocument();
    expect(screen.getByLabelText('Time *')).toBeInTheDocument();
    expect(screen.getByLabelText('Special Requests')).toBeInTheDocument();
  });

  test('booking form validation works', async () => {
    render(<App />);
    const submitButton = screen.getByRole('button', { name: 'Book Table' });
    fireEvent.click(submitButton);
    await waitFor(() => {
      expect(screen.getByText('Name is required')).toBeInTheDocument();
      expect(screen.getByText('Email is required')).toBeInTheDocument();
      expect(screen.getByText('Phone number is required')).toBeInTheDocument();
      expect(screen.getByText('Date is required')).toBeInTheDocument();
      expect(screen.getByText('Time is required')).toBeInTheDocument();
    });
  });

  test('booking form submission with valid data', async () => {
    render(<App />);
    const nameInput = screen.getByLabelText('Full Name *');
    const emailInput = screen.getByLabelText('Email Address *');
    const phoneInput = screen.getByLabelText('Phone Number *');
    const dateInput = screen.getByLabelText('Date *');
    const timeSelect = screen.getByLabelText('Time *');
    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
    fireEvent.change(phoneInput, { target: { value: '1234567890' } });
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 1);
    const futureDateString = futureDate.toISOString().split('T')[0];
    fireEvent.change(dateInput, { target: { value: futureDateString } });
    fireEvent.change(timeSelect, { target: { value: '18:00' } });
    const submitButton = screen.getByRole('button', { name: 'Book Table' });
    fireEvent.click(submitButton);
    // Wait for the button to show 'Booking...' state
    await waitFor(() => expect(screen.getByRole('button', { name: 'Booking...' })).toBeDisabled());
    // Wait for the alert to be called (this happens after the async operation completes)
    await waitFor(() => expect(global.alert).toHaveBeenCalledWith('Thank you for your booking!'));
  });

  test('renders hero section content', () => {
    render(<App />);
    expect(screen.getByText('Welcome to Little Lemon')).toBeInTheDocument();
    expect(screen.getByText('Book your table for an amazing dining experience')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Book Now' })).toBeInTheDocument();
  });

  test('renders contact information in footer', () => {
    render(<App />);
    expect(screen.getByText('📍 123 Mediterranean Ave')).toBeInTheDocument();
    expect(screen.getByText('📞 (555) 123-4567')).toBeInTheDocument();
    expect(screen.getByText('✉️ info@littlelemon.com')).toBeInTheDocument();
  });

  test('renders business hours', () => {
    render(<App />);
    expect(screen.getByText('Mon-Fri: 11:00 AM - 10:00 PM')).toBeInTheDocument();
    expect(screen.getByText('Sat-Sun: 10:00 AM - 11:00 PM')).toBeInTheDocument();
  });

  test('call-to-action buttons work', () => {
    render(<App />);
    const bookTableNavLink = screen.getByRole('link', { name: 'Book Table' });
    const bookNowButton = screen.getByRole('link', { name: 'Book Now' });
    expect(bookTableNavLink).toBeInTheDocument();
    expect(bookNowButton).toBeInTheDocument();
    expect(bookTableNavLink).toHaveAttribute('href', '#booking');
    expect(bookNowButton).toHaveAttribute('href', '#booking');
  });

  test('form resets after successful submission', async () => {
    render(<App />);
    const nameInput = screen.getByLabelText('Full Name *');
    const emailInput = screen.getByLabelText('Email Address *');
    const phoneInput = screen.getByLabelText('Phone Number *');
    const dateInput = screen.getByLabelText('Date *');
    const timeSelect = screen.getByLabelText('Time *');
    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
    fireEvent.change(phoneInput, { target: { value: '1234567890' } });
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 1);
    const futureDateString = futureDate.toISOString().split('T')[0];
    fireEvent.change(dateInput, { target: { value: futureDateString } });
    fireEvent.change(timeSelect, { target: { value: '18:00' } });
    const submitButton = screen.getByRole('button', { name: 'Book Table' });
    fireEvent.click(submitButton);
    // Wait for the button to show 'Booking...' state
    await waitFor(() => expect(screen.getByRole('button', { name: 'Booking...' })).toBeDisabled());
    // Wait for the alert to be called (this happens after the async operation completes)
    await waitFor(() => expect(global.alert).toHaveBeenCalled());
    // Check that form is reset
    expect(nameInput.value).toBe('');
    expect(emailInput.value).toBe('');
    expect(phoneInput.value).toBe('');
    expect(dateInput.value).toBe('');
    expect(timeSelect.value).toBe('');
  });
});
