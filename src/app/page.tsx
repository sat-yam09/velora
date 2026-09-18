'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import StaysSection from '@/components/StaysSection';
import AmenitiesSection from '@/components/AmenitiesSection';
import StorySection from '@/components/StorySection';
import GallerySection from '@/components/GallerySection';
import TestimonialsSection from '@/components/TestimonialsSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import BookingModal from '@/components/BookingModal';

export default function Home() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedRoomName, setSelectedRoomName] = useState('The Haven Suite');

  const handleOpenBooking = (roomName?: string) => {
    if (roomName && roomName !== 'All Rooms') {
      setSelectedRoomName(roomName);
    }
    setIsBookingOpen(true);
  };

  const handleCloseBooking = () => {
    setIsBookingOpen(false);
  };

  return (
    <main>
      {/* Top Navbar */}
      <Navbar onOpenBooking={() => handleOpenBooking()} />

      {/* Hero Welcome Lounge */}
      <HeroSection />

      {/* Section 1: Our Stays */}
      <StaysSection onOpenBooking={handleOpenBooking} />

      {/* Section 2: Amenities */}
      <AmenitiesSection />

      {/* Section 3: Our Story & Milestone Timeline */}
      <StorySection />

      {/* Section 4: Our Gallery */}
      <GallerySection />

      {/* Section 5: Real Stories, Real Results */}
      <TestimonialsSection />

      {/* Section 6: Plan Your Perfect Stay / Contact & Inquiry */}
      <ContactSection />

      {/* Footer */}
      <Footer />

      {/* Interactive Reservation Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={handleCloseBooking}
        initialRoom={selectedRoomName}
      />
    </main>
  );
}
