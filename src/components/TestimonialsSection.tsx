import Image from 'next/image';
import { Star, Quote } from 'lucide-react';
import styles from './TestimonialsSection.module.css';

interface Testimonial {
  id: number;
  name: string;
  location: string;
  avatar: string;
  timeAgo: string;
  rating: number;
  quote: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Dharti Gajjar',
    location: 'Vastral, Ahemdabad',
    avatar: '/images/avatar-1.jpg',
    timeAgo: '3 weeks ago',
    rating: 5,
    quote:
      '“From the breathtaking views to the thoughtful details, every moment felt effortless and unforgettable.”',
  },
  {
    id: 2,
    name: 'Arjun Thakkar',
    location: 'Vastral, Ahemdabad',
    avatar: '/images/avatar-2.jpg',
    timeAgo: '3 weeks ago',
    rating: 5,
    quote:
      '“Exceptional service, beautiful surroundings, and a feeling of home away from home. We can\'t wait to return.”',
  },
  {
    id: 3,
    name: 'Deepak Vaishnav',
    location: 'Vastral, Ahemdabad',
    avatar: '/images/avatar-3.jpg',
    timeAgo: '3 weeks ago',
    rating: 5,
    quote:
      '“A perfect blend of luxury, comfort, and warm hospitality. Velora is now our go-to destination.”',
  },
];

export default function TestimonialsSection() {
  return (
    <section className={styles.testimonialsSection} aria-label="Guest Testimonials and Reviews">
      <div className={styles.container}>
        {/* Section Heading */}
        <div className={styles.headerArea}>
          <h2 className="script-heading">Real Stories, Real Results.</h2>
        </div>

        {/* 3 Review Cards Grid */}
        <div className={styles.cardsGrid}>
          {testimonials.map((item) => (
            <div key={item.id} className={styles.reviewCard}>
              {/* Header: Stars + Timestamp + Quote Icon */}
              <div className={styles.cardHeader}>
                <div className={styles.starsGroup}>
                  {[...Array(item.rating)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      fill="#E59819"
                      color="#E59819"
                      className={styles.starIcon}
                    />
                  ))}
                  <span className={styles.timeAgo}>{item.timeAgo}</span>
                </div>
                <div className={styles.quoteIconWrapper}>
                  <Quote size={20} className={styles.quoteIcon} />
                </div>
              </div>

              {/* Quote Text */}
              <div className={styles.cardBody}>
                <p className={styles.quoteText}>{item.quote}</p>
              </div>

              {/* Guest Profile Footer */}
              <div className={styles.cardFooter}>
                <div className={styles.avatarWrapper}>
                  <Image
                    src={item.avatar}
                    alt={item.name}
                    width={44}
                    height={44}
                    className={styles.avatarImg}
                  />
                </div>
                <div className={styles.authorMeta}>
                  <h4 className={styles.authorName}>{item.name}</h4>
                  <p className={styles.authorLocation}>{item.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
