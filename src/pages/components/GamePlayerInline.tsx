import React, { useEffect, useState } from "react";

interface GamePlayerProps {
  gameUrl: string;
  onGameComplete?: (data: { score: number; timeUsed: number }) => void;
}

export default function InlineGamePlayer({ gameUrl, onGameComplete }: GamePlayerProps) {
  const [gameHtml, setGameHtml] = useState<string>("");

  useEffect(() => {
    // Fetch the HTML of the game
    fetch(gameUrl)
      .then((res) => res.text())
      .then((html) => {
        // Replace or wrap the onGameComplete function
        const modifiedHtml = html.replace(
          /function\s+onGameComplete\s*\([^\)]*\)\s*{[^}]*}/,
          `function onGameComplete(score, timeUsed) {
             window.dispatchEvent(new CustomEvent('gameResult', { detail: { score, timeUsed } }));
           }`
        );
        setGameHtml(modifiedHtml);
      });
  }, [gameUrl]);

  useEffect(() => {
    // Listen for game results
    const handleGameResult = (event: any) => {
      if (onGameComplete) {
        onGameComplete(event.detail);
      }
    };

    window.addEventListener("gameResult", handleGameResult as any);
    return () => window.removeEventListener("gameResult", handleGameResult as any);
  }, [onGameComplete]);

  return (
    <div
      className="w-full h-screen"
      dangerouslySetInnerHTML={{ __html: gameHtml }}
    />
  );
}
