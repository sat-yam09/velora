'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { ArrowRight, Sparkles } from 'lucide-react';
import styles from './StaysSection.module.css';

interface StaysSectionProps {
  onOpenBooking: (roomName?: string) => void;
}

interface Room {
  id: number;
  title: string;
  category: string;
  image: string;
  description: string;
  specs: string;
}

const rooms: Room[] = [
  {
    id: 1,
    title: 'The Haven Suite',
    category: 'Master Suite',
    image: '/images/room-1.jpg',
    description: 'A serene sanctuary featuring muted warm palettes, custom upholstery, and bespoke lighting crafted for absolute relaxation.',
    specs: '58 sqm • King Bed • Garden & Skyline View',
  },
  {
    id: 2,
    title: 'Emerald Heritage Room',
    category: 'Signature Suite',
    image: '/images/room-2.jpg',
    description: 'Classic architectural detailing meets regal sage tufting and bespoke sitting vignettes for timeless sophistication.',
    specs: '64 sqm • Super King Bed • Private Terrace',
  },
  {
    id: 3,
    title: 'Azure Terrace Chamber',
    category: 'Deluxe Room',
    image: '/images/room-3.jpg',
    description: 'An inviting mix of gentle terracotta, tailored cerulean drapes, and curated vintage furnishings.',
    specs: '48 sqm • Queen Bed • Courtyard View',
  },
  {
    id: 4,
    title: 'Royal Turquoise Villa',
    category: 'Exclusive Residence',
    image: '/images/room-4.jpg',
    description: 'Baroque-inspired moldings, soft teal woodwork, and artisanal cabinetry reflecting Old-World charm.',
    specs: '72 sqm • King Bed • Walk-in Wardrobe',
  },
  {
    id: 5,
    title: 'Grand Hallway & Promenade',
    category: 'Executive Living',
    image: '/images/room-5.jpg',
    description: 'Stately vaulted corridors with arched entryways, hand-carved mirrors, and sunlit marble flooring.',
    specs: 'Private Wing • Direct Garden Access',
  },
];

export default function StaysSection({ onOpenBooking }: StaysSectionProps) {
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const touchStartXRef = useRef<number | null>(null);

  // Scroll listener to update active room card as user scrolls through the pinned track
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;

      requestAnimationFrame(() => {
        ticking = false;
        if (!trackRef.current) return;
        if (window.innerWidth <= 960) return; // On mobile, allow direct dot taps or touch swipe

        const trackRect = trackRef.current.getBoundingClientRect();
        const headerOffset = 70;
        const scrolled = headerOffset - trackRect.top;
        const maxScroll = trackRef.current.offsetHeight - window.innerHeight;

        if (scrolled >= 0 && maxScroll > 0) {
          const progress = Math.max(0, Math.min(1, scrolled / maxScroll));
          const index = Math.min(rooms.length - 1, Math.floor(progress * rooms.length));
          setActiveCardIndex(index);
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Clicking dot switches room and syncs pinned scroll track
  const handleDotClick = (index: number) => {
    setActiveCardIndex(index);
    if (trackRef.current && window.innerWidth > 960) {
      const trackRect = trackRef.current.getBoundingClientRect();
      const scrollTop = window.scrollY;
      const trackTop = scrollTop + trackRect.top - 70;
      const maxScroll = trackRef.current.offsetHeight - window.innerHeight;
      if (maxScroll > 0) {
        const targetScroll = trackTop + (index / (rooms.length - 1)) * maxScroll;
        window.scrollTo({ top: targetScroll, behavior: 'smooth' });
      }
    }
  };

  // Touch swipe handling for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return;
    const diff = touchStartXRef.current - e.changedTouches[0].clientX;
    if (diff > 45) {
      // Swiped left
      setActiveCardIndex((prev) => Math.min(rooms.length - 1, prev + 1));
    } else if (diff < -45) {
      // Swiped right
      setActiveCardIndex((prev) => Math.max(0, prev - 1));
    }
    touchStartXRef.current = null;
  };

  return (
    <section id="stays" className={styles.staysSection} aria-label="Velora Luxury Stays">
      {/* Decorative Gold Flourishes */}
      <div className={styles.flourishLeft}>
        <Image
          src="/images/stay-flourish-left.png"
          alt="Decorative Gold Flourish Left"
          width={180}
          height={140}
          className={styles.flourishImg}
        />
      </div>
      <div className={styles.flourishRight}>
        <Image
          src="/images/stay-flourish-right.png"
          alt="Decorative Gold Flourish Right"
          width={180}
          height={140}
          className={styles.flourishImg}
        />
      </div>

      <div ref={trackRef} className={styles.trackContainer}>
        <div className={styles.stickyViewport}>
          <div className={styles.container}>
            {/* Section Heading */}
            <div className={styles.headerArea}>
              <h2 className="script-heading">Our Stays</h2>
            </div>

            {/* 2-Column Content Layout: Left Pinned Room Card, Right Pinned Story & Description */}
            <div className={styles.contentGrid}>
              {/* Left: Rooms Card Container - STUCK in exact position */}
              <div
                className={styles.imageCardContainer}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
              >
                {rooms.map((room, idx) => {
                  const isActive = idx === activeCardIndex;
                  const isPast = idx < activeCardIndex;
                  return (
                    <div
                      key={room.id}
                      className={`${styles.roomCard} ${
                        isActive
                          ? styles.cardActive
                          : isPast
                          ? styles.cardPast
                          : styles.cardFuture
                      }`}
                      onClick={() => setSelectedRoom(room)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => e.key === 'Enter' && setSelectedRoom(room)}
                      aria-label={`View details for ${room.title}`}
                    >
                      <div className={styles.imageWrapper}>
                        <Image
                          src={room.image}
                          alt={room.title}
                          fill
                          sizes="(max-width: 960px) 100vw, 55vw"
                          className={styles.roomImage}
                          priority={idx === 0}
                        />
                        <div className={styles.cardHoverOverlay}>
                          <span className={styles.viewBadge}>
                            <Sparkles size={14} /> View Details
                          </span>
                        </div>
                        <div className={styles.roomCounterBadge}>
                          <span>0{idx + 1} / 0{rooms.length}</span>
                        </div>
                        <div className={styles.roomMetaOverlay}>
                          <span className={styles.roomCategoryBadge}>{room.category}</span>
                          <h4 className={styles.roomTitleBadge}>{room.title}</h4>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Right: Sticky Narrative Content - Aligned top and bottom with image */}
              <div className={styles.storyCard}>
                <div className={styles.storyTop}>
                  <h3 className={styles.storyTitle}>Spaces made for your story</h3>
                  <p className={styles.storyDesc}>
                    Thoughtfully designed rooms that bring together modern comfort, refined details, and
                    a sense of calm. From restful mornings to peaceful evenings, every space is created
                    to make your stay feel effortlessly yours.
                  </p>
                </div>

                <div className={styles.storyBottom}>
                  <button
                    type="button"
                    className={styles.viewRoomsBtn}
                    onClick={() => onOpenBooking('All Rooms')}
                  >
                    <span>View all rooms</span>
                    <ArrowRight size={17} className={styles.arrowIcon} />
                  </button>

                  {/* Visual Progress Dots */}
                  <div className={styles.progressNav}>
                    {rooms.map((_, i) => (
                      <button
                        key={i}
                        type="button"
                        className={`${styles.dot} ${activeCardIndex === i ? styles.activeDot : ''}`}
                        onClick={() => handleDotClick(i)}
                        aria-label={`Go to room ${i + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Room Quick View Modal */}
      {selectedRoom && (
        <div className={styles.modalBackdrop} onClick={() => setSelectedRoom(null)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className={styles.closeBtn}
              onClick={() => setSelectedRoom(null)}
              aria-label="Close modal"
            >
              &times;
            </button>
            <div className={styles.modalImageWrapper}>
              <Image
                src={selectedRoom.image}
                alt={selectedRoom.title}
                width={800}
                height={520}
                className={styles.modalImage}
              />
            </div>
            <div className={styles.modalDetails}>
              <span className={styles.modalCategory}>{selectedRoom.category}</span>
              <h4 className={styles.modalTitle}>{selectedRoom.title}</h4>
              <p className={styles.modalSpecs}>{selectedRoom.specs}</p>
              <p className={styles.modalDesc}>{selectedRoom.description}</p>
              <div className={styles.modalActions}>
                <button
                  type="button"
                  className={styles.reserveBtn}
                  onClick={() => {
                    setSelectedRoom(null);
                    onOpenBooking(selectedRoom.title);
                  }}
                >
                  Reserve This Stay
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
