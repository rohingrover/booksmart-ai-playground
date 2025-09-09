import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Zap, 
  Target, 
  Star,
  PlayCircle,
  PauseCircle,
  RotateCcw,
  Trophy
} from 'lucide-react';

interface Enemy {
  id: number;
  x: number;
  y: number;
  question: string;
  options: string[];
  correctAnswer: number;
  speed: number;
}

interface Bullet {
  id: number;
  x: number;
  y: number;
  answer: number;
}

const SpaceShooterGame = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [gameRunning, setGameRunning] = useState(false);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [playerX, setPlayerX] = useState(50);
  const [enemies, setEnemies] = useState<Enemy[]>([]);
  const [bullets, setBullets] = useState<Bullet[]>([]);
  const [gameOver, setGameOver] = useState(false);
  const [level, setLevel] = useState(1);

  const questions = [
    {
      question: "What is 15 + 27?",
      options: ["42", "43", "41", "44"],
      correct: 0
    },
    {
      question: "Which is the largest planet?",
      options: ["Earth", "Jupiter", "Saturn", "Mars"],
      correct: 1
    },
    {
      question: "What is 8 × 7?",
      options: ["54", "56", "58", "52"],
      correct: 1
    },
    {
      question: "Capital of France?",
      options: ["London", "Berlin", "Paris", "Madrid"],
      correct: 2
    },
    {
      question: "What is √64?",
      options: ["6", "7", "8", "9"],
      correct: 2
    }
  ];

  const spawnEnemy = useCallback(() => {
    if (!gameRunning) return;
    
    const questionData = questions[Math.floor(Math.random() * questions.length)];
    const newEnemy: Enemy = {
      id: Date.now(),
      x: Math.random() * 80 + 10,
      y: 0,
      question: questionData.question,
      options: questionData.options,
      correctAnswer: questionData.correct,
      speed: 0.5 + (level * 0.1)
    };
    
    setEnemies(prev => [...prev, newEnemy]);
  }, [gameRunning, level]);

  const shootBullet = (answerIndex: number) => {
    if (!gameRunning) return;
    
    const newBullet: Bullet = {
      id: Date.now(),
      x: playerX,
      y: 85,
      answer: answerIndex
    };
    
    setBullets(prev => [...prev, newBullet]);
  };

  const movePlayer = useCallback((direction: 'left' | 'right') => {
    if (!gameRunning) return;
    
    setPlayerX(prev => {
      if (direction === 'left') return Math.max(5, prev - 10);
      return Math.min(95, prev + 10);
    });
  }, [gameRunning]);

  useEffect(() => {
    if (!gameRunning) return;

    const gameLoop = setInterval(() => {
      // Move enemies down
      setEnemies(prev => prev.map(enemy => ({
        ...enemy,
        y: enemy.y + enemy.speed
      })).filter(enemy => {
        if (enemy.y > 100) {
          setLives(l => l - 1);
          return false;
        }
        return true;
      }));

      // Move bullets up
      setBullets(prev => prev.map(bullet => ({
        ...bullet,
        y: bullet.y - 2
      })).filter(bullet => bullet.y > 0));

      // Check collisions
      setBullets(prevBullets => {
        const remainingBullets = [...prevBullets];
        
        setEnemies(prevEnemies => {
          const remainingEnemies = [...prevEnemies];
          
          prevBullets.forEach(bullet => {
            prevEnemies.forEach((enemy, enemyIndex) => {
              const distance = Math.sqrt(
                Math.pow(bullet.x - enemy.x, 2) + Math.pow(bullet.y - enemy.y, 2)
              );
              
              if (distance < 8) {
                // Collision detected
                const bulletIndex = remainingBullets.findIndex(b => b.id === bullet.id);
                if (bulletIndex > -1) remainingBullets.splice(bulletIndex, 1);
                
                if (bullet.answer === enemy.correctAnswer) {
                  // Correct answer
                  setScore(s => s + 10 * level);
                  remainingEnemies.splice(enemyIndex, 1);
                } else {
                  // Wrong answer
                  setLives(l => l - 1);
                  remainingEnemies.splice(enemyIndex, 1);
                }
              }
            });
          });
          
          return remainingEnemies;
        });
        
        return remainingBullets;
      });
    }, 50);

    // Spawn enemies
    const spawnInterval = setInterval(() => {
      if (Math.random() < 0.3) {
        spawnEnemy();
      }
    }, 2000);

    return () => {
      clearInterval(gameLoop);
      clearInterval(spawnInterval);
    };
  }, [gameRunning, level, spawnEnemy]);

  useEffect(() => {
    if (lives <= 0) {
      setGameOver(true);
      setGameRunning(false);
    }
  }, [lives]);

  useEffect(() => {
    if (score > 0 && score % 100 === 0) {
      setLevel(prev => prev + 1);
    }
  }, [score]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') movePlayer('left');
      if (e.key === 'ArrowRight') movePlayer('right');
      if (e.key >= '1' && e.key <= '4') {
        shootBullet(parseInt(e.key) - 1);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [movePlayer]);

  const startGame = () => {
    setGameStarted(true);
    setGameRunning(true);
    setScore(0);
    setLives(3);
    setPlayerX(50);
    setEnemies([]);
    setBullets([]);
    setGameOver(false);
    setLevel(1);
  };

  const togglePause = () => {
    setGameRunning(!gameRunning);
  };

  const resetGame = () => {
    setGameStarted(false);
    setGameRunning(false);
    setGameOver(false);
    setScore(0);
    setLives(3);
    setPlayerX(50);
    setEnemies([]);
    setBullets([]);
    setLevel(1);
  };

  if (!gameStarted) {
    return (
      <Card className="shadow-elegant">
        <CardHeader className="gradient-primary text-white text-center">
          <CardTitle className="flex items-center justify-center text-2xl">
            <Zap className="mr-2 h-6 w-6" />
            Space Shooter Quiz
          </CardTitle>
        </CardHeader>
        <CardContent className="p-8 text-center">
          <div className="mb-6">
            <Target className="h-16 w-16 text-primary mx-auto mb-4 animate-bounce-subtle" />
            <h3 className="text-xl font-bold mb-3">Defend Earth with Knowledge!</h3>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Enemy ships approach with questions! Shoot them down with the correct answers. 
              Use arrow keys to move and number keys (1-4) to shoot answers.
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
            <div className="p-3 bg-accent/50 rounded-lg">
              <strong>Controls:</strong><br />
              ← → Arrow keys to move<br />
              1-4 Number keys to shoot
            </div>
            <div className="p-3 bg-accent/50 rounded-lg">
              <strong>Scoring:</strong><br />
              +10 points per correct answer<br />
              Lose life for wrong answers
            </div>
          </div>
          
          <Button onClick={startGame} className="gradient-primary text-lg px-8 py-3">
            <PlayCircle className="mr-2 h-5 w-5" />
            Start Mission
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-elegant">
      <CardHeader className="gradient-primary text-white">
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center">
            <Target className="mr-2 h-5 w-5" />
            Space Shooter Quiz
          </CardTitle>
          <div className="flex gap-4 text-sm">
            <Badge variant="outline" className="text-white border-white">
              Score: {score}
            </Badge>
            <Badge variant="outline" className="text-white border-white">
              Lives: {lives}
            </Badge>
            <Badge variant="outline" className="text-white border-white">
              Level: {level}
            </Badge>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-0">
        {/* Game Area */}
        <div className="relative h-96 bg-gradient-to-b from-blue-900 to-black overflow-hidden">
          {/* Stars */}
          <div className="absolute inset-0">
            {[...Array(50)].map((_, i) => (
              <Star 
                key={i}
                className="absolute text-white opacity-50 animate-pulse"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  fontSize: `${Math.random() * 8 + 4}px`
                }}
              />
            ))}
          </div>
          
          {/* Player */}
          <div 
            className="absolute bottom-4 w-8 h-8 bg-green-400 rounded-full transition-all duration-200 shadow-glow"
            style={{ left: `${playerX}%`, transform: 'translateX(-50%)' }}
          >
            <div className="absolute inset-1 bg-green-600 rounded-full"></div>
          </div>
          
          {/* Enemies */}
          {enemies.map(enemy => (
            <div 
              key={enemy.id}
              className="absolute w-16 h-20 bg-red-500 rounded-lg shadow-lg transition-all"
              style={{ left: `${enemy.x}%`, top: `${enemy.y}%`, transform: 'translateX(-50%)' }}
            >
              <div className="p-1 text-xs text-white text-center font-bold">
                {enemy.question.slice(0, 15)}...
              </div>
            </div>
          ))}
          
          {/* Bullets */}
          {bullets.map(bullet => (
            <div 
              key={bullet.id}
              className="absolute w-2 h-4 bg-yellow-400 rounded-full shadow-glow"
              style={{ left: `${bullet.x}%`, top: `${bullet.y}%`, transform: 'translateX(-50%)' }}
            />
          ))}
          
          {gameOver && (
            <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
              <div className="text-center text-white">
                <Trophy className="h-16 w-16 text-yellow-400 mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-2">Mission Complete!</h3>
                <p className="text-lg mb-4">Final Score: {score}</p>
                <p className="text-sm mb-6">Level Reached: {level}</p>
              </div>
            </div>
          )}
        </div>
        
        {/* Current Question */}
        {enemies.length > 0 && (
          <div className="p-4 bg-accent/20 border-t">
            <h4 className="font-semibold mb-2">Incoming Question:</h4>
            <p className="mb-3 text-sm">{enemies[0]?.question}</p>
            <div className="grid grid-cols-2 gap-2">
              {enemies[0]?.options.map((option, index) => (
                <Button
                  key={index}
                  size="sm"
                  variant="outline"
                  onClick={() => shootBullet(index)}
                  disabled={!gameRunning}
                  className="text-xs"
                >
                  {index + 1}. {option}
                </Button>
              ))}
            </div>
          </div>
        )}
        
        {/* Controls */}
        <div className="p-4 border-t bg-muted/20">
          <div className="flex justify-center gap-3">
            <Button
              onClick={togglePause}
              variant="outline"
              disabled={gameOver}
            >
              {gameRunning ? <PauseCircle className="h-4 w-4" /> : <PlayCircle className="h-4 w-4" />}
            </Button>
            <Button onClick={resetGame} variant="outline">
              <RotateCcw className="h-4 w-4" />
            </Button>
            <Button
              onClick={() => movePlayer('left')}
              variant="outline"
              disabled={!gameRunning}
            >
              ←
            </Button>
            <Button
              onClick={() => movePlayer('right')}
              variant="outline"
              disabled={!gameRunning}
            >
              →
            </Button>
          </div>
          <p className="text-xs text-center mt-2 text-muted-foreground">
            Use keyboard: Arrow keys to move, 1-4 to shoot answers
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default SpaceShooterGame;