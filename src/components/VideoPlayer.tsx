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
  debug?: boolean; // Debug mode: never load videos, always show thumbnails
}

const VideoPlayer = ({
  videoUrl,
  posterUrl,
  autoplay = false,
  loop = false,
  muted = false,
  lazy = true,
  rootMargin = '200px',
  debug = false,
}: VideoPlayerProps) => {
  const videoRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(!lazy);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [manualLoadTriggered, setManualLoadTriggered] = useState(false);

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

  // Initialize Video.js player when in view (or when manually triggered in debug mode)
  useEffect(() => {
    if (!isInView || !videoRef.current) return;
    if (debug && !manualLoadTriggered) return;

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
  }, [isInView, videoUrl, posterUrl, autoplay, loop, muted, debug, manualLoadTriggered]);

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
      {/* Poster Image Placeholder (shown before video loads or in debug mode) */}
      {(!isInView || (debug && !manualLoadTriggered)) && posterUrl && (
        <div
          className="w-full h-full"
          onClick={debug ? () => setManualLoadTriggered(true) : undefined}
          style={debug ? { cursor: 'pointer' } : undefined}
        >
          <img
            src={posterUrl}
            alt="Video thumbnail"
            className="w-full h-full object-cover"
          />
          {debug && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="bg-black/50 text-white px-4 py-2 rounded-lg text-sm">
                Click to load video
              </div>
            </div>
          )}
        </div>
      )}

      {/* Video Player */}
      {isInView && (!debug || manualLoadTriggered) && (
        <div ref={videoRef} className="w-full h-full" />
      )}

      {/* Loading Indicator - appears above poster/video with no background */}
      {isInView && isLoading && !hasError && posterUrl && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
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
