import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";

export default function GamePlayer({ gameUrl, onGameComplete }) {
  const [score, setScore] = useState<number | null>(null);
  const [timeSpent, setTimeSpent] = useState<number | null>(null);
  const [maxScore, setMaxScore] = useState<number | null>(null);

  useEffect(() => {
    const handleGameMessage = (event: MessageEvent) => {
      //console.log("Message received from game:", event.data);
      if (event.data?.type === "gameComplete") {
        //console.log("GamePlayer received:", event.data);
        const { score, timeSpent, maxScore } = event.data;
        setScore(score);
        setTimeSpent(timeSpent);
        setMaxScore(maxScore);

        if (onGameComplete) {
          onGameComplete({ score, timeSpent, maxScore });
        }
      }
    };

    window.addEventListener("message", handleGameMessage);
    return () => window.removeEventListener("message", handleGameMessage);
  }, [onGameComplete]);

  return (
    <Card className="p-4">
      <CardContent>
        <h2 className="text-lg font-semibold mb-4">🎮 Game Player</h2>
        <iframe
          src={gameUrl}
          title="Game"
          className="w-full h-[1000px] rounded-lg border"
          allowFullScreen
        ></iframe>
      </CardContent>
    </Card>
  );
}
