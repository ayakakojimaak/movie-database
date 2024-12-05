"use client";

import React, { useEffect, useRef, useState } from "react";

interface YouTubePlayerProps {
  videoId: string;
  placeholder: string;
}

export const YouTubePlayer: React.FC<YouTubePlayerProps> = ({ videoId, placeholder }) => {
  const playerRef = useRef<HTMLDivElement | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://www.youtube.com/iframe_api";
    document.body.appendChild(script);

    (window as any).onYouTubeIframeAPIReady = () => {
      initializePlayer();
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const initializePlayer = () => {
    if (playerRef.current) {
      new (window as any).YT.Player(playerRef.current, {
        videoId,
        playerVars: {
          autoplay: 1,
          mute: 1,
          controls: 0,
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

  return (
    <div>
      {!isLoaded && (
        <img
          src={placeholder}
          alt="Loading"
          style={{
            objectFit: "cover",
          }}
        />
      )}
      <div
        ref={playerRef}
        style={{
          zIndex: isLoaded ? 0 : -1,
        }}></div>
    </div>
  );
};
