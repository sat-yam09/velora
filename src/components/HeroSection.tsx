'use client';

import Image from 'next/image';
import { ArrowDown } from 'lucide-react';
import styles from './HeroSection.module.css';

export default function HeroSection() {
  const scrollToNext = () => {
    const staysSection = document.getElementById('stays');
    if (staysSection) {
      staysSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className={styles.heroSection} aria-label="Velora Luxury Hotel Welcome">
      <div className={styles.imageContainer}>
        <Image
          src="/images/hero-bg.jpg"
          alt="Velora Luxury Lounge & Living Room"
          fill
          priority
          className={styles.heroImg}
          sizes="100vw"
        />
        <div className={styles.darkOverlay} />
      </div>

      {/* Hero Content Center */}
      <div className={styles.heroContent}>
        <h1 className={styles.heroTitle}>A Refind Stay, Beautifully yours</h1>
        <p className={styles.heroSubtitle}>
          Experience thoughtful design, warm hospitality, and timeless
          comfort, created to make every stay truly memorable.
        </p>

        {/* Scroll Down Indicator */}
        <button
          type="button"
          onClick={scrollToNext}
          className={styles.scrollDownBtn}
          aria-label="Scroll down to explore stays"
        >
          <span className={styles.scrollCircle}>
            <ArrowDown size={18} strokeWidth={2} className={styles.arrowIcon} />
          </span>
          <span className={styles.scrollText}>Scroll Down</span>
        </button>
      </div>
    </section>
  );
}
