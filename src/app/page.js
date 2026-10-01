'use client';

import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Play, Pause, Volume2, VolumeX, ChevronRight } from 'lucide-react';
import './cinematic-landing.css';

export default function HomePage() {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  // Auto-play muted on load per browser policies
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true);
        })
        .catch(() => {
          setIsPlaying(false);
        });
    }
  }, []);

  const togglePlay = (e) => {
    if (e && typeof e.stopPropagation === 'function') {
      e.stopPropagation();
    }

    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((err) => {
          console.warn('Playback error:', err);
        });
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = (e) => {
    if (e && typeof e.stopPropagation === 'function') {
      e.stopPropagation();
    }

    const video = videoRef.current;
    if (!video) return;

    const nextMuted = !video.muted;
    video.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  return (
    <div className="cinematic-page-root">
      <div className="cinematic-stage">
        
        {/* Large Rounded Top Video Hero Area */}
        <section 
          className="cinematic-hero-card"
          onClick={togglePlay}
          aria-label="Cinematic video player"
        >
          {/* Native HTML5 Video Element - Poster is exact Frame 0 */}
          <video
            ref={videoRef}
            src="/videos/opening-video.mp4"
            poster="/images/hero_video_poster.jpg"
            autoPlay
            loop
            muted={isMuted}
            playsInline
            preload="auto"
            className="cinematic-hero-video"
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
          />

          {/* Vignette Shadow Overlay */}
          <div className="cinematic-hero-overlay" />

          {/* Hero Handwritten Typography: "Small Steps Brighter Days" */}
          <h1 className="cinematic-hero-title">
            <span>Small</span>
            <span>Steps</span>
            <span>Brighter</span>
            <span>Days</span>
          </h1>

          {/* Large Circular Play/Pause Button Overlay */}
          <div className="cinematic-play-btn-wrapper">
            <button 
              type="button"
              className="cinematic-play-btn"
              onClick={togglePlay}
              aria-label={isPlaying ? 'Pause video' : 'Play video'}
              title={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? (
                <Pause style={{ marginLeft: 0 }} />
              ) : (
                <Play style={{ marginLeft: '5px' }} />
              )}
            </button>
          </div>

          {/* Small Frosted Glass Mute / Unmute Button in Corner */}
          <button
            type="button"
            className="cinematic-mute-btn"
            onClick={toggleMute}
            aria-label={isMuted ? 'Unmute video' : 'Mute video'}
            title={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? <VolumeX size={17} /> : <Volume2 size={17} />}
          </button>
        </section>

        {/* Four Learning Tiles + Enroll Now Button in One Row */}
        <nav className="cinematic-tiles-row" aria-label="Learning Streams">
          {/* Tile 1: Manage Stress */}
          <Link 
            href="/enroll?stream=manage-stress" 
            className="cinematic-tile cinematic-tile-stress"
            title="Manage Stress Stream"
          >
            <Image
              src="/images/tile_manage_stress.jpg"
              alt="Manage Stress"
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              className="cinematic-tile-img"
              priority
            />
            <div className="cinematic-tile-gradient" />
            <div className="cinematic-tile-text">
              <span>Manage</span>
              <span>Stress</span>
            </div>
          </Link>

          {/* Tile 2: Build Confidence */}
          <Link 
            href="/enroll?stream=build-confidence" 
            className="cinematic-tile cinematic-tile-confidence"
            title="Build Confidence Stream"
          >
            <Image
              src="/images/tile_build_confidence.jpg"
              alt="Build Confidence"
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              className="cinematic-tile-img"
              priority
            />
            <div className="cinematic-tile-gradient" />
            <div className="cinematic-tile-text">
              <span>Build</span>
              <span>Confidence</span>
            </div>
          </Link>

          {/* Tile 3: Stronger Relationships */}
          <Link 
            href="/enroll?stream=stronger-relationships" 
            className="cinematic-tile cinematic-tile-relationships"
            title="Stronger Relationships Stream"
          >
            <Image
              src="/images/tile_stronger_relationships.jpg"
              alt="Stronger Relationships"
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              className="cinematic-tile-img"
              priority
            />
            <div className="cinematic-tile-gradient" />
            <div className="cinematic-tile-text">
              <span>Stronger</span>
              <span>Relationships</span>
            </div>
          </Link>

          {/* Tile 4: Healthier Habits */}
          <Link 
            href="/enroll?stream=healthier-habits" 
            className="cinematic-tile cinematic-tile-habits"
            title="Healthier Habits Stream"
          >
            <Image
              src="/images/tile_healthier_habits.jpg"
              alt="Healthier Habits"
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              className="cinematic-tile-img"
              priority
            />
            <div className="cinematic-tile-gradient" />
            <div className="cinematic-tile-text">
              <span>Healthier</span>
              <span>Habits</span>
            </div>
          </Link>

          {/* Enroll Now Pill Button */}
          <Link 
            href="/enroll" 
            className="cinematic-enroll-btn"
            title="Enroll in the program"
          >
            <span>Enroll Now</span>
            <ChevronRight />
          </Link>
        </nav>

      </div>
    </div>
  );
}
