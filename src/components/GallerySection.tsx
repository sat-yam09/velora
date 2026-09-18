'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Maximize2, X } from 'lucide-react';
import styles from './GallerySection.module.css';

interface GalleryItem {
  id: number;
  title: string;
  image: string;
  caption: string;
}

const galleryItems: GalleryItem[] = [
  {
    id: 1,
    title: 'Veranda & Solarium Views',
    image: '/images/gallery-1.jpg',
    caption: 'Sunlit floor-to-ceiling French doors overlooking the manicured botanic gardens.',
  },
  {
    id: 2,
    title: 'Heritage Suite Details',
    image: '/images/gallery-2.jpg',
    caption: 'Artisanal pastel blue console tables paired with hand-carved baroque mirrors.',
  },
  {
    id: 3,
    title: 'The Athenaeum Library',
    image: '/images/gallery-3.jpg',
    caption: 'Warm cedar timber architecture, living vertical plant installations, and quiet alcoves.',
  },
  {
    id: 4,
    title: 'Culinary Craft',
    image: '/images/gallery-4.jpg',
    caption: 'Artisan hand-rolled pasta finished with seasonal truffles and micro-greens.',
  },
];

export default function GallerySection() {
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);

  return (
    <section id="gallery" className={styles.gallerySection} aria-label="Velora Photo Gallery">
      <div className={styles.container}>
        {/* Section Heading */}
        <div className={styles.headerArea}>
          <h2 className="script-heading">Our Gallery</h2>
        </div>

        {/* 4-Column Photo Grid */}
        <div className={styles.grid}>
          {galleryItems.map((item) => (
            <div
              key={item.id}
              className={styles.galleryCard}
              onClick={() => setActiveItem(item)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && setActiveItem(item)}
              aria-label={`Enlarge photo: ${item.title}`}
            >
              <div className={styles.imageWrapper}>
                <Image
                  src={item.image}
                  alt={item.title}
                  width={344}
                  height={280}
                  className={styles.galleryImg}
                />
                <div className={styles.hoverOverlay}>
                  <Maximize2 size={24} className={styles.zoomIcon} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {activeItem && (
        <div className={styles.lightboxBackdrop} onClick={() => setActiveItem(null)}>
          <div className={styles.lightboxContent} onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className={styles.closeBtn}
              onClick={() => setActiveItem(null)}
              aria-label="Close Lightbox"
            >
              <X size={24} />
            </button>
            <div className={styles.lightboxImageWrapper}>
              <Image
                src={activeItem.image}
                alt={activeItem.title}
                width={900}
                height={650}
                className={styles.lightboxImg}
              />
            </div>
            <div className={styles.lightboxInfo}>
              <h4>{activeItem.title}</h4>
              <p>{activeItem.caption}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
