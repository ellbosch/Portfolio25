import { useEffect, useRef } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';

interface VideoPlayerProps {
  videoUrl: string;
  poster?: string;
  autoplay?: boolean;
  loop?: boolean;
  muted?: boolean;
}

const VideoPlayer = ({ videoUrl, poster, autoplay = false, loop = false, muted = false }: VideoPlayerProps) => {
  const videoRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<any>(null);

  useEffect(() => {
    // Make sure Video.js player is only initialized once
    if (!playerRef.current && videoRef.current) {
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
        poster: poster,
      });
    } else if (playerRef.current) {
      const player = playerRef.current;
      player.autoplay(autoplay);
      player.loop(loop);
      player.muted(muted);
      player.src({ src: videoUrl, type: 'video/mp4' });
      if (poster) {
        player.poster(poster);
      }
    }
  }, [videoUrl, poster, autoplay, loop, muted]);

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
    <div data-vjs-player>
      <div ref={videoRef} className="w-full h-full" />
    </div>
  );
};

export default VideoPlayer;
