'use client';

import { useState } from 'react';
import { X, Calendar, Users, Check, Sparkles } from 'lucide-react';
import styles from './BookingModal.module.css';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialRoom?: string;
}

export default function BookingModal({
  isOpen,
  onClose,
  initialRoom = 'The Haven Suite',
}: BookingModalProps) {
  const [selectedRoom, setSelectedRoom] = useState(initialRoom);
  const [checkIn, setCheckIn] = useState('2026-09-20');
  const [checkOut, setCheckOut] = useState('2026-09-24');
  const [guests, setGuests] = useState(2);
  const [isConfirmed, setIsConfirmed] = useState(false);

  if (!isOpen) return null;

  const roomOptions = [
    { name: 'The Haven Suite', price: '$480 / night' },
    { name: 'Emerald Heritage Room', price: '$560 / night' },
    { name: 'Azure Terrace Chamber', price: '$420 / night' },
    { name: 'Royal Turquoise Villa', price: '$680 / night' },
    { name: 'Grand Hallway Suite', price: '$510 / night' },
  ];

  const handleConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    setIsConfirmed(true);
  };

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className={styles.closeBtn}
          onClick={onClose}
          aria-label="Close Reservation Modal"
        >
          <X size={22} />
        </button>

        {isConfirmed ? (
          <div className={styles.confirmedState}>
            <div className={styles.checkCircle}>
              <Check size={36} />
            </div>
            <h3 className={styles.confirmedTitle}>Reservation Requested</h3>
            <p className={styles.confirmedSubtitle}>
              We have reserved <strong>{selectedRoom}</strong> from {checkIn} to {checkOut} for {guests} guests.
            </p>
            <p className={styles.confirmedNote}>
              Our concierge team will send booking confirmation documents and transport details to your email shortly.
            </p>
            <button
              type="button"
              className={styles.doneBtn}
              onClick={() => {
                setIsConfirmed(false);
                onClose();
              }}
            >
              Close
            </button>
          </div>
        ) : (
          <div>
            <div className={styles.header}>
              <span className={styles.badge}>
                <Sparkles size={14} /> Velora Bespoke Stays
              </span>
              <h3 className={styles.title}>Book Your Experience</h3>
              <p className={styles.subtitle}>
                Experience unmatched luxury and tranquility tailored to your journey.
              </p>
            </div>

            <form onSubmit={handleConfirm} className={styles.form}>
              {/* Room Selection */}
              <div className={styles.fieldGroup}>
                <label className={styles.label}>Select Room or Suite</label>
                <select
                  value={selectedRoom}
                  onChange={(e) => setSelectedRoom(e.target.value)}
                  className={styles.selectField}
                >
                  {roomOptions.map((opt) => (
                    <option key={opt.name} value={opt.name}>
                      {opt.name} — {opt.price}
                    </option>
                  ))}
                </select>
              </div>

              {/* Dates */}
              <div className={styles.row}>
                <div className={styles.fieldGroup}>
                  <label className={styles.label}>
                    <Calendar size={14} /> Check-In
                  </label>
                  <input
                    type="date"
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    className={styles.inputField}
                    required
                  />
                </div>
                <div className={styles.fieldGroup}>
                  <label className={styles.label}>
                    <Calendar size={14} /> Check-Out
                  </label>
                  <input
                    type="date"
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    className={styles.inputField}
                    required
                  />
                </div>
              </div>

              {/* Guests */}
              <div className={styles.fieldGroup}>
                <label className={styles.label}>
                  <Users size={14} /> Guests
                </label>
                <select
                  value={guests}
                  onChange={(e) => setGuests(Number(e.target.value))}
                  className={styles.selectField}
                >
                  <option value={1}>1 Guest</option>
                  <option value={2}>2 Guests</option>
                  <option value={3}>3 Guests</option>
                  <option value={4}>4 Guests</option>
                </select>
              </div>

              <button type="submit" className={styles.submitBtn}>
                Confirm Reservation Request
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
