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

    // Check that all main sections are rendered
    expect(screen.getByText('Little Lemon')).toBeInTheDocument(); // Header
    expect(screen.getByText('Welcome to Little Lemon')).toBeInTheDocument(); // Hero
    expect(screen.getByText('Our Story')).toBeInTheDocument(); // About
    expect(screen.getByText('Our Menu')).toBeInTheDocument(); // Menu
    expect(screen.getByText('Book Your Table')).toBeInTheDocument(); // Booking
    expect(screen.getByText('Contact Info')).toBeInTheDocument(); // Footer
  });

  test('renders navigation menu', () => {
    render(<App />);

    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('Menu')).toBeInTheDocument();
    expect(screen.getByText('Book Table')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
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

    const submitButton = screen.getByText('Book Table');
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

    // Fill in the form with valid data
    const nameInput = screen.getByLabelText('Full Name *');
    const emailInput = screen.getByLabelText('Email Address *');
    const phoneInput = screen.getByLabelText('Phone Number *');
    const dateInput = screen.getByLabelText('Date *');
    const timeSelect = screen.getByLabelText('Time *');

    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
    fireEvent.change(phoneInput, { target: { value: '1234567890' } });

    // Set a future date
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 1);
    const futureDateString = futureDate.toISOString().split('T')[0];
    fireEvent.change(dateInput, { target: { value: futureDateString } });

    // Select a time
    fireEvent.change(timeSelect, { target: { value: '18:00' } });

    const submitButton = screen.getByText('Book Table');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(global.alert).toHaveBeenCalledWith('Thank you for your booking! We will confirm your reservation shortly.');
    });
  });

  test('renders menu items', () => {
    render(<App />);

    expect(screen.getByText('Greek Salad')).toBeInTheDocument();
    expect(screen.getByText('Grilled Sea Bass')).toBeInTheDocument();
    expect(screen.getByText('Lamb Kebab')).toBeInTheDocument();
    expect(screen.getByText('Baklava')).toBeInTheDocument();
    expect(screen.getByText('Hummus & Pita')).toBeInTheDocument();
    expect(screen.getByText('Mediterranean Pasta')).toBeInTheDocument();
  });

  test('renders menu prices', () => {
    render(<App />);

    expect(screen.getByText('$12.99')).toBeInTheDocument();
    expect(screen.getByText('$28.99')).toBeInTheDocument();
    expect(screen.getByText('$24.99')).toBeInTheDocument();
    expect(screen.getByText('$8.99')).toBeInTheDocument();
    expect(screen.getByText('$9.99')).toBeInTheDocument();
    expect(screen.getByText('$18.99')).toBeInTheDocument();
  });

  test('renders about section features', () => {
    render(<App />);

    expect(screen.getByText('Fresh Ingredients')).toBeInTheDocument();
    expect(screen.getByText('Expert Chefs')).toBeInTheDocument();
    expect(screen.getByText('Traditional Recipes')).toBeInTheDocument();
  });

  test('renders contact information in footer', () => {
    render(<App />);

    expect(screen.getByText('📍 123 Mediterranean Ave, City Center')).toBeInTheDocument();
    expect(screen.getByText('📞 (555) 123-4567')).toBeInTheDocument();
    expect(screen.getByText('✉️ info@littlelemon.com')).toBeInTheDocument();
  });

  test('renders business hours', () => {
    render(<App />);

    expect(screen.getByText(/Monday - Friday:/)).toBeInTheDocument();
    expect(screen.getByText('11:00 AM - 10:00 PM')).toBeInTheDocument();
    expect(screen.getByText(/Saturday - Sunday:/)).toBeInTheDocument();
    expect(screen.getByText('10:00 AM - 11:00 PM')).toBeInTheDocument();
  });

  test('call-to-action buttons work', () => {
    render(<App />);

    const bookTableButtons = screen.getAllByText(/Book a Table/);
    const viewMenuButtons = screen.getAllByText(/View Menu/);

    expect(bookTableButtons.length).toBeGreaterThan(0);
    expect(viewMenuButtons.length).toBeGreaterThan(0);

    // Check that buttons have correct href attributes
    bookTableButtons.forEach(button => {
      if (button.tagName === 'A') {
        expect(button).toHaveAttribute('href', '#booking');
      }
    });

    viewMenuButtons.forEach(button => {
      if (button.tagName === 'A') {
        expect(button).toHaveAttribute('href', '#menu');
      }
    });
  });

  test('form resets after successful submission', async () => {
    render(<App />);

    // Fill in the form
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

    const submitButton = screen.getByText('Book Table');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(global.alert).toHaveBeenCalled();
    });

    // Check that form is reset
    expect(nameInput.value).toBe('');
    expect(emailInput.value).toBe('');
    expect(phoneInput.value).toBe('');
    expect(dateInput.value).toBe('');
    expect(timeSelect.value).toBe('');
  });
});
