import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import BookingForm from '../BookingForm';

// Mock the alert function
global.alert = jest.fn();

describe('BookingForm Component', () => {
  const mockBookingData = {
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    guests: 2,
    specialRequests: ''
  };

  const mockSetBookingData = jest.fn();
  const mockOnSubmit = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders form title', () => {
    render(
      <BookingForm
        bookingData={mockBookingData}
        setBookingData={mockSetBookingData}
        onSubmit={mockOnSubmit}
      />
    );

    expect(screen.getByText('Book Your Table')).toBeInTheDocument();
  });

  test('renders all form fields', () => {
    render(
      <BookingForm
        bookingData={mockBookingData}
        setBookingData={mockSetBookingData}
        onSubmit={mockOnSubmit}
      />
    );

    expect(screen.getByLabelText('Full Name *')).toBeInTheDocument();
    expect(screen.getByLabelText('Email Address *')).toBeInTheDocument();
    expect(screen.getByLabelText('Phone Number *')).toBeInTheDocument();
    expect(screen.getByLabelText('Number of Guests *')).toBeInTheDocument();
    expect(screen.getByLabelText('Date *')).toBeInTheDocument();
    expect(screen.getByLabelText('Time *')).toBeInTheDocument();
    expect(screen.getByLabelText('Special Requests')).toBeInTheDocument();
  });

  test('renders submit button', () => {
    render(
      <BookingForm
        bookingData={mockBookingData}
        setBookingData={mockSetBookingData}
        onSubmit={mockOnSubmit}
      />
    );

    const submitButton = screen.getByRole('button', { name: 'Book Table' });
    expect(submitButton).toBeInTheDocument();
  });

  test('form fields update booking data on change', () => {
    render(
      <BookingForm
        bookingData={mockBookingData}
        setBookingData={mockSetBookingData}
        onSubmit={mockOnSubmit}
      />
    );

    const nameInput = screen.getByLabelText('Full Name *');
    fireEvent.change(nameInput, { target: { value: 'John Doe' } });

    expect(mockSetBookingData).toHaveBeenCalled();
  });

  test('validates required fields on submit', async () => {
    render(
      <BookingForm
        bookingData={mockBookingData}
        setBookingData={mockSetBookingData}
        onSubmit={mockOnSubmit}
      />
    );

    const submitButton = screen.getByRole('button', { name: 'Book Table' });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Name is required')).toBeInTheDocument();
      expect(screen.getByText('Email is required')).toBeInTheDocument();
      expect(screen.getByText('Phone number is required')).toBeInTheDocument();
      expect(screen.getByText('Date is required')).toBeInTheDocument();
      expect(screen.getByText('Time is required')).toBeInTheDocument();
    });

    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  test('validates email format', async () => {
    const invalidEmailData = {
      ...mockBookingData,
      name: 'John Doe',
      email: 'invalid-email',
      phone: '1234567890',
      date: '2024-12-25',
      time: '18:00'
    };

    render(
      <BookingForm
        bookingData={invalidEmailData}
        setBookingData={mockSetBookingData}
        onSubmit={mockOnSubmit}
      />
    );

    const submitButton = screen.getByRole('button', { name: 'Book Table' });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Please enter a valid email address')).toBeInTheDocument();
    });

    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  test('submits form with valid data', async () => {
    // Use a future date to avoid validation issues
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 1);
    const futureDateString = futureDate.toISOString().split('T')[0];

    const validData = {
      ...mockBookingData,
      name: 'John Doe',
      email: 'john@example.com',
      phone: '1234567890',
      date: futureDateString,
      time: '18:00',
      guests: 4,
      specialRequests: 'Window seat please'
    };

    render(
      <BookingForm
        bookingData={validData}
        setBookingData={mockSetBookingData}
        onSubmit={mockOnSubmit}
      />
    );

    const submitButton = screen.getByRole('button', { name: 'Book Table' });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByRole('button')).toHaveTextContent('Booking...');
    });
  });

  test('guests select has correct options', () => {
    render(
      <BookingForm
        bookingData={mockBookingData}
        setBookingData={mockSetBookingData}
        onSubmit={mockOnSubmit}
      />
    );

    for (let i = 1; i <= 10; i++) {
      const option = screen.getByText(`${i} ${i === 1 ? 'Guest' : 'Guests'}`);
      expect(option).toBeInTheDocument();
    }
  });

  test('time select has correct options', () => {
    render(
      <BookingForm
        bookingData={mockBookingData}
        setBookingData={mockSetBookingData}
        onSubmit={mockOnSubmit}
      />
    );

    expect(screen.getByText('11:00 AM')).toBeInTheDocument();
    expect(screen.getByText('12:00 PM')).toBeInTheDocument();
    expect(screen.getByText('6:00 PM')).toBeInTheDocument();
    expect(screen.getByText('9:00 PM')).toBeInTheDocument();
  });

  test('booking section has correct structure', () => {
    render(
      <BookingForm
        bookingData={mockBookingData}
        setBookingData={mockSetBookingData}
        onSubmit={mockOnSubmit}
      />
    );

    const bookingSection = screen.getByText('Book Your Table').closest('section');
    expect(bookingSection).toHaveClass('booking');
    expect(bookingSection).toHaveAttribute('id', 'booking');
  });
});
