import { useEffect, useRef, useState } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import LoadingIndicator from './LoadingIndicator';

interface VideoPlayerProps {
  videoUrl: string;
  posterUrl?: string;
  autoplay?: boolean;
  loop?: boolean;
  muted?: boolean;
  lazy?: boolean;
  rootMargin?: string;
}

const VideoPlayer = ({
  videoUrl,
  posterUrl,
  autoplay = false,
  loop = false,
  muted = false,
  lazy = true,
  rootMargin = '200px',
}: VideoPlayerProps) => {
  const videoRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(!lazy);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (!lazy || !containerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        });
      },
      {
        rootMargin,
        threshold: 0.01,
      }
    );

    observer.observe(containerRef.current);

    return () => {
      observer.disconnect();
    };
  }, [lazy, rootMargin]);

  // Initialize Video.js player when in view
  useEffect(() => {
    if (!isInView || !videoRef.current) return;

    // Make sure Video.js player is only initialized once
    if (!playerRef.current) {
      const videoElement = document.createElement('video-js');
      videoElement.classList.add('vjs-big-play-centered');
      videoRef.current.appendChild(videoElement);

      playerRef.current = videojs(videoElement, {
        autoplay: autoplay,
        controls: false,
        responsive: true,
        fluid: true,
        preload: 'metadata',
        loop: loop,
        muted: muted,
        sources: [
          {
            src: videoUrl,
            type: 'video/mp4',
          },
        ],
        poster: posterUrl,
        html5: {
          vhs: {
            overrideNative: true
          },
          nativeVideoTracks: false,
          nativeAudioTracks: false,
          nativeTextTracks: false
        }
      });

      // Set playsinline attributes for iOS
      const videoEl = playerRef.current.el().querySelector('video');
      if (videoEl) {
        videoEl.setAttribute('playsinline', '');
        videoEl.setAttribute('webkit-playsinline', '');
      }

      // Handle loading states
      playerRef.current.on('loadstart', () => {
        setIsLoading(true);
        setHasError(false);
      });

      playerRef.current.on('canplay', () => {
        setIsLoading(false);
      });

      playerRef.current.on('error', () => {
        setIsLoading(false);
        setHasError(true);
      });
    } else if (playerRef.current) {
      const player = playerRef.current;
      player.autoplay(autoplay);
      player.loop(loop);
      player.muted(muted);
      player.src({ src: videoUrl, type: 'video/mp4' });
      if (posterUrl) {
        player.poster(posterUrl);
      }
    }
  }, [isInView, videoUrl, posterUrl, autoplay, loop, muted]);

  // Dispose the Video.js player when the component unmounts
  useEffect(() => {
    const player = playerRef.current;

    return () => {
      if (player && !player.isDisposed()) {
        player.dispose();
        playerRef.current = null;
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      data-vjs-player
      className="relative max-h-full overflow-hidden bg-gray-100 dark:bg-gray-900"
    >
      {/* Poster Image Placeholder (shown before video loads) */}
      {!isInView && posterUrl && (
        <div className="w-full h-full">
          <img
            src={posterUrl}
            alt="Video thumbnail"
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Video Player */}
      {isInView && (
        <div ref={videoRef} className="w-full h-full" />
      )}

      {/* Loading Indicator */}
      {isInView && isLoading && !hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/10 dark:bg-black/30 backdrop-blur-sm transition-opacity duration-300">
          <LoadingIndicator size={48} color="white" />
        </div>
      )}

      {/* Error State */}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50">
          <p className="text-white text-sm">Failed to load video</p>
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;
