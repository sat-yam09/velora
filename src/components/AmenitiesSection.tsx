'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import styles from './AmenitiesSection.module.css';

interface AmenitySlide {
  id: number;
  title: string;
  image: string;
  description: string;
}

const amenitiesData: AmenitySlide[] = [
  {
    id: 1,
    title: 'Artisan Cafe & Bar',
    image: '/images/amenity-slide-1.jpg',
    description: 'Freshly roasted single-origin coffees, handcrafted pastries, and aperitifs.',
  },
  {
    id: 2,
    title: 'Garden Area',
    image: '/images/amenity-center.jpg',
    description: 'An open-air garden terrace with lush vertical foliage, warm string lights, and ambient dining.',
  },
  {
    id: 3,
    title: 'Courtyard Terrace',
    image: '/images/amenity-slide-4.jpg',
    description: 'Al fresco dining under the stars surrounded by manicured flora and gentle fountains.',
  },
  {
    id: 4,
    title: 'Solarium & Reading Lounge',
    image: '/images/amenity-slide-2.jpg',
    description: 'Sun-drenched relaxation corners with curated reading selections and herbal infusions.',
  },
  {
    id: 5,
    title: 'Sunset Veranda',
    image: '/images/amenity-slide-5.jpg',
    description: 'Panoramic evening vistas with crafted cocktails and quiet fireside seating.',
  },
];

export default function AmenitiesSection() {
  const [activeIndex, setActiveIndex] = useState(1); // Garden Area is center

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? amenitiesData.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === amenitiesData.length - 1 ? 0 : prev + 1));
  };

  const getSlideClass = (index: number) => {
    const diff = (index - activeIndex + amenitiesData.length) % amenitiesData.length;
    if (diff === 0) return styles.slideActive;
    if (diff === 1 || (diff === -(amenitiesData.length - 1))) return styles.slideNext;
    if (diff === amenitiesData.length - 1 || diff === -1) return styles.slidePrev;
    if (diff === 2) return styles.slideFarNext;
    return styles.slideFarPrev;
  };

  return (
    <section id="amenities" className={styles.amenitiesSection} aria-label="Velora Amenities">
      {/* Botanical watercolor leaf illustrations */}
      <div className={styles.leafLeft}>
        <Image
          src="/images/leaves-amenities-left.png"
          alt="Botanical Watercolor Leaf Left"
          width={220}
          height={220}
          className={styles.leafImg}
        />
      </div>
      <div className={styles.leafRight}>
        <Image
          src="/images/leaves-amenities-right.png"
          alt="Botanical Watercolor Leaf Right"
          width={220}
          height={220}
          className={styles.leafImg}
        />
      </div>

      <div className={styles.container}>
        {/* Section Heading */}
        <div className={styles.headerArea}>
          <h2 className="script-heading">Amenities</h2>
        </div>

        {/* 3D Coverflow Carousel Container */}
        <div className={styles.carouselContainer}>
          <div className={styles.carouselTrack}>
            {amenitiesData.map((slide, index) => (
              <div
                key={slide.id}
                className={`${styles.carouselSlide} ${getSlideClass(index)}`}
                onClick={() => setActiveIndex(index)}
                role="button"
                tabIndex={0}
                aria-label={`View ${slide.title}`}
                onKeyDown={(e) => e.key === 'Enter' && setActiveIndex(index)}
              >
                <div className={styles.slideCard}>
                  <div className={styles.slideImageWrapper}>
                    <Image
                      src={slide.image}
                      alt={slide.title}
                      width={810}
                      height={570}
                      className={styles.slideImage}
                      priority={index === activeIndex}
                    />
                    {/* Badge on bottom-left matching design */}
                    <div className={styles.titleBadge}>
                      <span>{slide.title}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Arrows */}
        <div className={styles.controlsArea}>
          <button
            type="button"
            className={styles.navArrow}
            onClick={handlePrev}
            aria-label="Previous amenity"
          >
            <ChevronLeft size={20} strokeWidth={2.2} />
          </button>
          <button
            type="button"
            className={styles.navArrow}
            onClick={handleNext}
            aria-label="Next amenity"
          >
            <ChevronRight size={20} strokeWidth={2.2} />
          </button>
        </div>
      </div>
    </section>
  );
}
