'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Phone, Mail, MapPin, CheckCircle, Send } from 'lucide-react';
import styles from './ContactSection.module.css';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate inquiry submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({ firstName: '', lastName: '', email: '', message: '' });
      setTimeout(() => setSubmitted(false), 6000);
    }, 800);
  };

  return (
    <section id="contact" className={styles.contactSection} aria-label="Plan Your Perfect Stay">
      {/* Background Resort Image */}
      <div className={styles.bgImageContainer}>
        <Image
          src="/images/contact-bg.jpg"
          alt="Velora Luxury Resort at Night"
          fill
          className={styles.bgImage}
          sizes="100vw"
        />
        <div className={styles.overlay} />
      </div>

      <div className={styles.container}>
        <div className={styles.contentGrid}>
          {/* Left: Contact Info */}
          <div className={styles.infoCol}>
            <h2 className={styles.title}>Plan Your Perfect Stay</h2>

            <div className={styles.contactItems}>
              {/* Phone */}
              <div className={styles.contactItem}>
                <div className={styles.iconCircle}>
                  <Phone size={20} strokeWidth={1.8} />
                </div>
                <div className={styles.itemText}>
                  <span className={styles.itemLabel}>Call Us</span>
                  <a href="tel:+6561234567" className={styles.itemValue}>
                    +65 6123 4567
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className={styles.contactItem}>
                <div className={styles.iconCircle}>
                  <Mail size={20} strokeWidth={1.8} />
                </div>
                <div className={styles.itemText}>
                  <span className={styles.itemLabel}>Email Us</span>
                  <a href="mailto:reservations@velora.com" className={styles.itemValue}>
                    reservations@velora.com
                  </a>
                </div>
              </div>

              {/* Address */}
              <div className={styles.contactItem}>
                <div className={styles.iconCircle}>
                  <MapPin size={20} strokeWidth={1.8} />
                </div>
                <div className={styles.itemText}>
                  <span className={styles.itemLabel}>Visit Us</span>
                  <p className={styles.itemValue}>
                    18 Meridian Avenue,<br />
                    Victoria Harbour, Singapore 018956
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Inquiry Form Card */}
          <div className={styles.formCol}>
            <div className={styles.formCard}>
              <h3 className={styles.formTitle}>Send us an inquiry</h3>

              {submitted ? (
                <div className={styles.successMessage}>
                  <CheckCircle size={44} className={styles.successIcon} />
                  <h4>Inquiry Sent Successfully</h4>
                  <p>
                    Thank you for reaching out. Our concierge desk will contact you within 24
                    hours to curate your bespoke itinerary.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className={styles.inquiryForm}>
                  <div className={styles.nameRow}>
                    <div className={styles.fieldGroup}>
                      <input
                        type="text"
                        placeholder="First name"
                        value={formData.firstName}
                        onChange={(e) =>
                          setFormData({ ...formData, firstName: e.target.value })
                        }
                        required
                        className={styles.inputField}
                      />
                    </div>
                    <div className={styles.fieldGroup}>
                      <input
                        type="text"
                        placeholder="Last name"
                        value={formData.lastName}
                        onChange={(e) =>
                          setFormData({ ...formData, lastName: e.target.value })
                        }
                        required
                        className={styles.inputField}
                      />
                    </div>
                  </div>

                  <div className={styles.fieldGroup}>
                    <input
                      type="email"
                      placeholder="Email Address"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      className={styles.inputField}
                    />
                  </div>

                  <div className={styles.fieldGroup}>
                    <textarea
                      placeholder="Your Message"
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                      className={styles.textareaField}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={styles.submitBtn}
                    aria-label="Send Message"
                  >
                    {isSubmitting ? (
                      'Sending Inquiry...'
                    ) : (
                      <>
                        <span>Send Message</span>
                        <Send size={16} />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
