import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';
import Hero from './components/Hero';
import BookingForm from './components/BookingForm';
import Footer from './components/Footer';

function App() {
  const [bookingData, setBookingData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    guests: 2,
    specialRequests: ''
  });

  const handleBookingSubmit = (formData) => {
    alert('Thank you for your booking!');
    setBookingData({
      name: '',
      email: '',
      phone: '',
      date: '',
      time: '',
      guests: 2,
      specialRequests: ''
    });
  };

  return (
    <div className="App">
      <Header />
      <Hero />
      <BookingForm
        bookingData={bookingData}
        setBookingData={setBookingData}
        onSubmit={handleBookingSubmit}
      />
      <Footer />
    </div>
  );
}

export default App;
