import Image from 'next/image';
import Link from 'next/link';
import { Facebook, Instagram, Twitter } from 'lucide-react';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer} aria-label="Velora Footer">
      <div className={styles.mainContent}>
        {/* Monogram Logo */}
        <div className={styles.monogramWrapper}>
          <Image
            src="/images/footer-monogram.png"
            alt="Velora Emblem"
            width={60}
            height={50}
            className={styles.monogramImg}
          />
        </div>

        {/* Brand Name */}
        <h3 className={styles.brandTitle}>VELORA</h3>

        {/* Brand Tagline */}
        <p className={styles.tagline}>A refined stay, beautifully yours.</p>
        <p className={styles.subTagline}>Explore the Velora Experience</p>

        {/* Social Icons */}
        <div className={styles.socialGroup}>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialBtn}
            aria-label="Visit Velora on Facebook"
          >
            <Facebook size={18} />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialBtn}
            aria-label="Visit Velora on Instagram"
          >
            <Instagram size={18} />
          </a>
          <a
            href="https://x.com"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialBtn}
            aria-label="Visit Velora on X"
          >
            {/* X / Twitter icon */}
            <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>
        </div>
      </div>

      {/* Bottom Bar with Links & Copyright */}
      <div className={styles.bottomBar}>
        <div className={styles.container}>
          <div className={styles.bottomFlex}>
            <div className={styles.legalLinks}>
              <Link href="#" className={styles.legalLink}>
                Privacy policy
              </Link>
              <Link href="#" className={styles.legalLink}>
                Shipping &amp; Returns
              </Link>
              <Link href="#" className={styles.legalLink}>
                Terms of Services
              </Link>
            </div>
            <p className={styles.copyright}>
              &copy; 2026 Velora Hotel. All Rights Reserved
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
