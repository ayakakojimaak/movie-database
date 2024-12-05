"use client";
import React, { useEffect, useRef, useState } from "react";

const YouTubePlayer: React.FC<{ videoId: string; placeholder: string }> = ({ videoId, placeholder }) => {
  const playerRef = useRef<HTMLDivElement | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // YouTube APIスクリプトをロード
    const script = document.createElement("script");
    script.src = "https://www.youtube.com/iframe_api";
    document.body.appendChild(script);

    // APIが準備完了時にプレイヤーを初期化
    (window as any).onYouTubeIframeAPIReady = () => {
      initializePlayer();
    };

    return () => {
      // コンポーネントがアンマウントされた際にスクリプトを削除
      document.body.removeChild(script);
    };
  }, []);

  const initializePlayer = () => {
    if (playerRef.current) {
      new (window as any).YT.Player(playerRef.current, {
        videoId: videoId,
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
          onReady: () => setIsLoaded(true), // 読み込み完了時にフラグを更新
        },
      });
    }
  };

  return (
    <div>
      {/* プレイヤー読み込み前のプレースホルダー */}
      {!isLoaded && (
        <img
          src={placeholder}
          alt="Loading"
          style={{
            objectFit: "cover",
          }}
        />
      )}
      {/* YouTubeプレイヤーの埋め込み */}
      <div
        ref={playerRef}
        style={{
          zIndex: isLoaded ? 0 : -1,
        }}></div>
    </div>
  );
};

export default YouTubePlayer;
