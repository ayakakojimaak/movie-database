"use client";

import React, { useEffect, useRef, useState } from "react";

interface YouTubePlayerProps {
  videoId: string;
  placeholder: string;
}

interface YTPlayer {
  mute: (mute: boolean) => void;
  playVideo: () => void;
  pauseVideo: () => void;
}

interface YTPlayerOptions {
  videoId: string;
  playerVars: {
    autoplay: number;
    mute: number;
    controls: number;
    modestbranding: number;
    loop: number;
    rel: number;
    showinfo: number;
  };
  events: {
    onReady: () => void;
  };
}

declare global {
  interface Window {
    YT?: {
      Player: new (element: HTMLElement, options: YTPlayerOptions) => YTPlayer;
    };
    onYouTubeIframeAPIReady?: () => void;
  }
}

export const YouTubePlayer: React.FC<YouTubePlayerProps> = ({ videoId, placeholder }) => {
  const playerRef = useRef<HTMLDivElement | null>(null);
  const playerInstance = useRef<YTPlayer | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const initializePlayer = () => {
    if (playerRef.current && window.YT) {
      playerInstance.current = new window.YT.Player(playerRef.current, {
        videoId,
        playerVars: {
          autoplay: 0,
          mute: 1,
          controls: 1,
          modestbranding: 1,
          loop: 1,
          rel: 0,
          showinfo: 0,
        },
        events: {
          onReady: () => setIsLoaded(true),
        },
      });
    }
  };

  const handleMouseEnter = () => {
    if (playerInstance.current) {
      playerInstance.current.mute(false);
      playerInstance.current.playVideo();
    }
  };

  const handleMouseLeave = () => {
    if (playerInstance.current) {
      playerInstance.current.pauseVideo();
      playerInstance.current.mute(true);
    }
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://www.youtube.com/iframe_api";
    document.body.appendChild(script);
    window.onYouTubeIframeAPIReady = () => {
      initializePlayer();
    };
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div
      className="relative w-full"
      style={{ paddingBottom: "56.25%", position: "relative" }} // 16:9
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}>
      {!isLoaded && (
        <img src={placeholder} alt="Loading" className="absolute top-0 left-0 w-full h-full object-cover" />
      )}
      <div ref={playerRef} className={`absolute top-0 left-0 w-full h-full transition-opacity duration-300`}></div>
    </div>
  );
};
