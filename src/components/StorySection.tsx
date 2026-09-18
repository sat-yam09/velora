'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import styles from './StorySection.module.css';

export default function StorySection() {
  const [activeStep, setActiveStep] = useState<number>(0);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      const windowCenter = window.innerHeight * 0.45;
      stepRefs.current.forEach((el, index) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        if (rect.top <= windowCenter && rect.bottom >= windowCenter) {
          setActiveStep(index);
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToStep = (index: number) => {
    setActiveStep(index);
    stepRefs.current[index]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <section id="story" className={styles.storySection} aria-label="Velora Heritage and Story">
      {/* Decorative foliage accent */}
      <div className={styles.cornerLeaves}>
        <Image
          src="/images/leaves-story-corner.png"
          alt="Decorative Foliage Accent"
          width={280}
          height={260}
          className={styles.cornerImg}
        />
      </div>

      <div className={styles.container}>
        {/* Section Heading */}
        <div className={styles.headerArea}>
          <h2 className="script-heading">Our Story</h2>
        </div>

        {/* Milestone Quick Jump Bar */}
        <div className={styles.milestoneTabs}>
          {[
            { id: 0, label: 'The Beginning' },
            { id: 1, label: '2000 — Origins' },
            { id: 2, label: '2015 — New Chapter' },
            { id: 3, label: '2026 — Today' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`${styles.tabBtn} ${activeStep === tab.id ? styles.activeTabBtn : ''}`}
              onClick={() => scrollToStep(tab.id)}
            >
              <span className={styles.tabDot} />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Intro Block: "A house, grown slowly" (Step 0) */}
        <div
          ref={(el) => {
            stepRefs.current[0] = el;
          }}
          className={`${styles.introGrid} ${activeStep === 0 ? styles.stepActive : ''}`}
        >
          <div className={`${styles.introTextCol} ${activeStep === 0 ? styles.textRevealed : ''}`}>
            <h3 className={styles.introTitle}>A house, grown slowly</h3>
            <p className={styles.introParagraph}>
              Velora began as a single house on a quiet street, and grew slowly, the way things
              worth keeping usually do. Every addition since has followed the same instinct: change
              only what needs changing, and keep everything else exactly as it was.
            </p>
          </div>
          <div className={styles.introImageCol}>
            <div
              className={`${styles.photoFrame} ${activeStep === 0 ? styles.frameMorphActive : ''}`}
              onClick={() => scrollToStep(0)}
            >
              <Image
                src="/images/story-intro.jpg"
                alt="Velora illuminated stone stairs at twilight overlooking the sea"
                width={600}
                height={450}
                className={styles.storyImg}
              />
            </div>
          </div>
        </div>

        {/* Timeline with connected golden line & milestones */}
        <div className={styles.timelineArea}>
          {/* SVG S-Curve connecting path in desktop view with animated energy traveler */}
          <div className={styles.svgPathContainer} aria-hidden="true">
            <svg
              className={styles.timelineSvg}
              viewBox="0 0 100 1000"
              preserveAspectRatio="none"
              fill="none"
            >
              <path
                d="M 50,0 C 70,120 20,240 50,360 C 80,480 20,620 50,760 C 70,880 50,960 50,1000"
                stroke="#D4AF37"
                strokeWidth="2.5"
                strokeDasharray="6 6"
                className={styles.svgCurveLine}
              />
              {/* Glowing energy dot that travels the path */}
              <circle
                r="5"
                fill="#C59B27"
                filter="drop-shadow(0 0 8px #E6C875)"
                className={styles.travelingOrb}
              >
                <animateMotion
                  dur="8s"
                  repeatCount="indefinite"
                  path="M 50,0 C 70,120 20,240 50,360 C 80,480 20,620 50,760 C 70,880 50,960 50,1000"
                />
              </circle>
            </svg>
          </div>

          {/* Milestone 1: 2000 (Step 1) */}
          <div
            ref={(el) => {
              stepRefs.current[1] = el;
            }}
            className={`${styles.milestoneRow} ${styles.row2000} ${activeStep === 1 ? styles.stepActive : ''}`}
          >
            <div className={styles.milestoneImageSide}>
              <div
                className={`${styles.photoFrame} ${activeStep === 1 ? styles.frameMorphActive : ''}`}
                onClick={() => scrollToStep(1)}
              >
                <Image
                  src="/images/timeline-2000.jpg"
                  alt="Velora in 2000 - Where it all began"
                  width={526}
                  height={340}
                  className={styles.storyImg}
                />
              </div>
            </div>

            <div className={styles.milestoneNode} onClick={() => scrollToStep(1)}>
              <div className={`${styles.goldRing} ${activeStep === 1 ? styles.goldRingActive : ''}`}>
                <div className={styles.goldCore} />
              </div>
            </div>

            <div className={`${styles.milestoneTextSide} ${activeStep === 1 ? styles.textRevealed : ''}`}>
              <span className={styles.yearNumber}>2000</span>
              <h4 className={styles.milestoneTitle}>Where it all began.</h4>
              <p className={styles.milestoneDesc}>
                Velora began with a simple idea to create a place where comfort feels natural and
                every stay feels personal. What started in 2000 as a quiet beginning became the
                foundation of the Velora experience we know today.
              </p>
            </div>
          </div>

          {/* Milestone 2: 2015 (Step 2) */}
          <div
            ref={(el) => {
              stepRefs.current[2] = el;
            }}
            className={`${styles.milestoneRow} ${styles.row2015} ${activeStep === 2 ? styles.stepActive : ''}`}
          >
            <div className={`${styles.milestoneTextSide} ${styles.textLeft} ${activeStep === 2 ? styles.textRevealed : ''}`}>
              <span className={styles.yearNumber}>2015</span>
              <h4 className={styles.milestoneTitle}>A New Chapter</h4>
              <p className={styles.milestoneDesc}>
                By 2015, Velora had grown into a place shaped by thoughtful design, warm
                hospitality, and the little details that make a stay memorable. A new chapter began
                — bringing a more refined experience while staying true to the warmth of its
                beginnings.
              </p>
            </div>

            <div className={styles.milestoneNode} onClick={() => scrollToStep(2)}>
              <div className={`${styles.goldRing} ${activeStep === 2 ? styles.goldRingActive : ''}`}>
                <div className={styles.goldCore} />
              </div>
            </div>

            <div className={styles.milestoneImageSide}>
              <div
                className={`${styles.photoFrame} ${activeStep === 2 ? styles.frameMorphActive : ''}`}
                onClick={() => scrollToStep(2)}
              >
                <Image
                  src="/images/timeline-2015.jpg"
                  alt="Velora in 2015 - A New Chapter"
                  width={526}
                  height={340}
                  className={styles.storyImg}
                />
              </div>
            </div>
          </div>

          {/* Milestone 3: 2026 (Step 3) */}
          <div
            ref={(el) => {
              stepRefs.current[3] = el;
            }}
            className={`${styles.milestoneRow} ${styles.row2026} ${activeStep === 3 ? styles.stepActive : ''}`}
          >
            <div className={styles.milestoneImageSide}>
              <div
                className={`${styles.photoFrame} ${activeStep === 3 ? styles.frameMorphActive : ''}`}
                onClick={() => scrollToStep(3)}
              >
                <Image
                  src="/images/timeline-2026.jpg"
                  alt="Velora in 2026 - The Journey Continues"
                  width={526}
                  height={340}
                  className={styles.storyImg}
                />
              </div>
            </div>

            <div className={styles.milestoneNode} onClick={() => scrollToStep(3)}>
              <div className={`${styles.goldRing} ${activeStep === 3 ? styles.goldRingActive : ''}`}>
                <div className={styles.goldCore} />
              </div>
            </div>

            <div className={`${styles.milestoneTextSide} ${activeStep === 3 ? styles.textRevealed : ''}`}>
              <span className={styles.yearNumber}>2026</span>
              <h4 className={styles.milestoneTitle}>The Journey Continues</h4>
              <p className={styles.milestoneDesc}>
                Today, Velora continues to grow while staying true to the warmth and character that
                shaped its beginnings. With thoughtful spaces, refined experiences, and genuine
                hospitality, the journey moves forward — with every new chapter created for our
                guests.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
