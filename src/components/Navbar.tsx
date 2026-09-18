'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import styles from './Navbar.module.css';

interface NavbarProps {
  onOpenBooking: () => void;
}

export default function Navbar({ onOpenBooking }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('Home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Home', href: '#' },
    { label: 'Stays', href: '#stays' },
    { label: 'Amenities', href: '#amenities' },
    { label: 'Our Stories', href: '#story' },
    { label: 'Experiences', href: '#gallery' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header className={`${styles.header} ${isScrolled ? styles.headerScrolled : ''}`}>
      <div className={styles.container}>
        {/* Brand Logo */}
        <Link href="#" className={styles.logoLink} onClick={() => setActiveLink('Home')}>
          <div className={styles.logoWrapper}>
            <Image
              src="/images/logo.png"
              alt="Velora Logo"
              width={100}
              height={45}
              priority
              className={styles.logoImg}
            />
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className={styles.desktopNav} aria-label="Main Navigation">
          <ul className={styles.navList}>
            {navItems.map((item) => (
              <li key={item.label} className={styles.navItem}>
                <a
                  href={item.href}
                  className={`${styles.navLink} ${activeLink === item.label ? styles.active : ''}`}
                  onClick={() => setActiveLink(item.label)}
                >
                  {item.label}
                  {activeLink === item.label && <span className={styles.activeIndicator} />}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Action Button */}
        <div className={styles.actions}>
          <button
            type="button"
            className={styles.bookBtn}
            onClick={onOpenBooking}
            aria-label="Book Now"
          >
            Book Now
          </button>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            className={styles.mobileMenuToggle}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div className={`${styles.mobileDrawer} ${mobileMenuOpen ? styles.mobileDrawerOpen : ''}`}>
        <ul className={styles.mobileNavList}>
          {navItems.map((item) => (
            <li key={item.label}>
              <a
                href={item.href}
                className={`${styles.mobileNavLink} ${activeLink === item.label ? styles.mobileActive : ''}`}
                onClick={() => {
                  setActiveLink(item.label);
                  setMobileMenuOpen(false);
                }}
              >
                {item.label}
              </a>
            </li>
          ))}
          <li className={styles.mobileActionItem}>
            <button
              type="button"
              className={styles.mobileBookBtn}
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
            >
              Book Now
            </button>
          </li>
        </ul>
      </div>
    </header>
  );
}
