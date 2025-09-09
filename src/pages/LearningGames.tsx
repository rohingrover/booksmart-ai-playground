import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import SpaceShooterGame from '@/components/SpaceShooterGame';
import { 
  Gamepad2, 
  Trophy, 
  Heart,
  Zap,
  Target,
  Crown,
  Star,
  Clock,
  Sword,
  Shield,
  Award,
  TrendingUp,
  Users,
  Play
} from 'lucide-react';

const LearningGames = () => {
  const [selectedGame, setSelectedGame] = useState<string | null>(null);
  const [gameInProgress, setGameInProgress] = useState(false);
  
  // Quiz Battle Game State
  const [hp, setHp] = useState(100);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');

  const leaderboard = [
    { rank: 1, name: 'Alex Kumar', score: 2450, avatar: '👨‍🎓' },
    { rank: 2, name: 'Priya Sharma', score: 2380, avatar: '👩‍🎓' },
    { rank: 3, name: 'Rohit Singh', score: 2340, avatar: '👨‍💻' },
    { rank: 4, name: 'Sneha Patel', score: 2200, avatar: '👩‍🔬' },
    { rank: 5, name: 'You', score: 1950, avatar: '🎯', isPlayer: true }
  ];

  const games = [
    {
      id: 'quiz-battle',
      title: 'Quiz Battle',
      description: 'Battle with questions! Lose HP for wrong answers, gain for correct ones',
      icon: Sword,
      color: 'gradient-secondary',
      difficulty: 'Medium',
      players: '1,234 online',
      features: ['HP System', 'Time Pressure', 'Leaderboard']
    },
    {
      id: 'speed-challenge',
      title: 'Speed Challenge',
      description: 'Answer as many questions as possible in 60 seconds',
      icon: Zap,
      color: 'gradient-primary',
      difficulty: 'Hard',
      players: '856 online',
      features: ['Speed Based', 'Combo System', 'Power-ups']
    },
    {
      id: 'space-shooter',
      title: 'Space Shooter Quiz',
      description: 'Defend Earth by shooting correct answers! Test your knowledge in an action-packed space adventure.',
      icon: Target,
      color: 'bg-success',
      difficulty: 'Medium',
      players: '642 online',
      features: ['Action Game', 'Multiple Choice', 'Real-time Combat']
    }
  ];

  const quizBattleQuestions = [
    {
      question: "What is 15 × 8?",
      options: ["110", "120", "130", "140"],
      correct: "120"
    },
    {
      question: "Which planet is closest to the sun?",
      options: ["Venus", "Mercury", "Earth", "Mars"],
      correct: "Mercury"
    },
    {
      question: "What is the capital of France?",
      options: ["London", "Berlin", "Paris", "Rome"],
      correct: "Paris"
    }
  ];

  // Quiz Battle Game Logic
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (gameInProgress && timeLeft > 0) {
      timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    } else if (gameInProgress && timeLeft === 0) {
      handleTimeUp();
    }
    return () => clearTimeout(timer);
  }, [gameInProgress, timeLeft]);

  const startQuizBattle = () => {
    setSelectedGame('quiz-battle');
    setGameInProgress(true);
    setHp(100);
    setScore(0);
    setTimeLeft(30);
    setCurrentQuestion(0);
    setSelectedAnswer('');
  };

  const startSpeedChallenge = () => {
    setSelectedGame('speed-challenge');
    setGameInProgress(true);
    setScore(0);
    setTimeLeft(60);
    setCurrentQuestion(0);
    setSelectedAnswer('');
  };

  const startSpaceShooter = () => {
    setSelectedGame('space-shooter');
    setGameInProgress(true);
  };

  const handleAnswer = (answer: string) => {
    setSelectedAnswer(answer);
    const currentQ = quizBattleQuestions[currentQuestion];
    
    if (answer === currentQ.correct) {
      setHp(Math.min(100, hp + 20));
      setScore(score + 100);
    } else {
      setHp(Math.max(0, hp - 25));
    }

    setTimeout(() => {
      if (currentQuestion < quizBattleQuestions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer('');
        setTimeLeft(30);
      } else {
        endGame();
      }
    }, 1500);
  };

  const handleTimeUp = () => {
    setHp(Math.max(0, hp - 15));
    if (hp <= 15) {
      endGame();
    } else {
      setCurrentQuestion(currentQuestion + 1);
      setTimeLeft(30);
    }
  };

  const endGame = () => {
    setGameInProgress(false);
    alert(`Game Over! Final Score: ${score}, HP: ${hp}`);
  };

  const getHpColor = () => {
    if (hp > 60) return 'text-success';
    if (hp > 30) return 'text-warning';
    return 'text-destructive';
  };

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1: return 'text-yellow-500';
      case 2: return 'text-gray-400';
      case 3: return 'text-amber-600';
      default: return 'text-muted-foreground';
    }
  };

  // Speed Challenge Game
  if (selectedGame === 'speed-challenge' && gameInProgress) {
    const currentQ = quizBattleQuestions[currentQuestion % quizBattleQuestions.length];
    
    return (
      <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="gradient-primary p-3 rounded-full">
              <Zap className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Speed Challenge</h1>
              <p className="text-muted-foreground">Answer as fast as you can!</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="text-center">
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-warning" />
                <span className="text-xl font-bold text-warning">{timeLeft}s</span>
              </div>
              <p className="text-sm text-muted-foreground">Time Left</p>
            </div>
            
            <div className="text-center">
              <div className="flex items-center space-x-2">
                <Star className="h-5 w-5 text-primary" />
                <span className="text-xl font-bold text-primary">{score}</span>
              </div>
              <p className="text-sm text-muted-foreground">Score</p>
            </div>
          </div>
        </div>

        <Card className="shadow-elegant">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold mb-6">{currentQ.question}</h2>
            
            <div className="grid grid-cols-2 gap-4">
              {currentQ.options.map((option, index) => (
                <Button
                  key={index}
                  onClick={() => {
                    if (option === currentQ.correct) {
                      setScore(score + 50);
                    }
                    setCurrentQuestion(currentQuestion + 1);
                    setSelectedAnswer('');
                  }}
                  variant="outline"
                  className="p-6 text-lg h-auto hover:border-primary"
                >
                  {option}
                </Button>
              ))}
            </div>
            
            <Button 
              onClick={() => setGameInProgress(false)} 
              variant="outline" 
              className="mt-4"
            >
              End Game
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Space Shooter Game
  if (selectedGame === 'space-shooter' && gameInProgress) {
    return (
      <div className="max-w-4xl mx-auto animate-fade-in">
        <div className="mb-6 flex items-center space-x-4">
          <Button
            onClick={() => {
              setGameInProgress(false);
              setSelectedGame(null);
            }}
            variant="outline"
          >
            ← Back to Games
          </Button>
          <div className="flex items-center space-x-2">
            <Target className="h-6 w-6 text-success" />
            <h1 className="text-2xl font-bold">Space Shooter Quiz</h1>
          </div>
        </div>
        <SpaceShooterGame />
      </div>
    );
  }

  if (selectedGame === 'quiz-battle' && gameInProgress) {
    const currentQ = quizBattleQuestions[currentQuestion];
    
    return (
      <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
        {/* Game Header */}
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="gradient-secondary p-3 rounded-full">
              <Sword className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Quiz Battle</h1>
              <p className="text-muted-foreground">Question {currentQuestion + 1} of {quizBattleQuestions.length}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="text-center">
              <div className="flex items-center space-x-2">
                <Heart className={`h-5 w-5 ${getHpColor()}`} />
                <span className={`text-xl font-bold ${getHpColor()}`}>{hp}</span>
              </div>
              <p className="text-sm text-muted-foreground">Health</p>
            </div>
            
            <div className="text-center">
              <div className="flex items-center space-x-2">
                <Star className="h-5 w-5 text-primary" />
                <span className="text-xl font-bold text-primary">{score}</span>
              </div>
              <p className="text-sm text-muted-foreground">Score</p>
            </div>
            
            <div className="text-center">
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-warning" />
                <span className="text-xl font-bold text-warning">{timeLeft}s</span>
              </div>
              <p className="text-sm text-muted-foreground">Time</p>
            </div>
          </div>
        </div>

        {/* HP Bar */}
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium">Health Points</span>
              <span className={`text-sm font-bold ${getHpColor()}`}>{hp}/100</span>
            </div>
            <Progress value={hp} className="h-3" />
          </CardContent>
        </Card>

        {/* Question */}
        <Card className="shadow-elegant">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold mb-6">{currentQ.question}</h2>
            
            <div className="grid grid-cols-2 gap-4">
              {currentQ.options.map((option, index) => (
                <Button
                  key={index}
                  onClick={() => handleAnswer(option)}
                  variant="outline"
                  className={`p-6 text-lg h-auto ${
                    selectedAnswer === option
                      ? selectedAnswer === currentQ.correct
                        ? 'border-success bg-success/10 text-success'
                        : 'border-destructive bg-destructive/10 text-destructive'
                      : 'hover:border-primary'
                  }`}
                  disabled={!!selectedAnswer}
                >
                  {option}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fade-in">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold gradient-hero bg-clip-text text-transparent">
          Learning Games
        </h1>
        <p className="text-lg text-muted-foreground">
          Master subjects through fun and interactive games
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Games List */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-2xl font-semibold flex items-center">
            <Gamepad2 className="h-6 w-6 mr-2 text-primary" />
            Available Games
          </h2>
          
          <div className="space-y-4">
            {games.map((game) => {
              const Icon = game.icon;
              return (
                <Card key={game.id} className="shadow-card hover:shadow-elegant transition-smooth">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4">
                        <div className={`p-4 rounded-lg ${game.color}`}>
                          <Icon className="h-8 w-8 text-white" />
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="text-xl font-bold">{game.title}</h3>
                            <Badge variant="outline">{game.difficulty}</Badge>
                            <div className="flex items-center text-sm text-muted-foreground">
                              <Users className="h-4 w-4 mr-1" />
                              {game.players}
                            </div>
                          </div>
                          
                          <p className="text-muted-foreground mb-3">{game.description}</p>
                          
                          <div className="flex flex-wrap gap-2">
                            {game.features.map((feature, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {feature}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      <Button
                        onClick={() => {
                          if (game.id === 'quiz-battle') {
                            startQuizBattle();
                          } else if (game.id === 'speed-challenge') {
                            startSpeedChallenge();
                          } else if (game.id === 'space-shooter') {
                            startSpaceShooter();
                          }
                        }}
                        className="gradient-primary"
                      >
                        <Play className="h-4 w-4 mr-2" />
                        Play Now
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Leaderboard */}
        <div className="space-y-6">
          <Card className="shadow-elegant">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Trophy className="h-5 w-5 mr-2 text-primary" />
                Leaderboard
              </CardTitle>
              <CardDescription>Top players this week</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {leaderboard.map((player) => (
                <div
                  key={player.rank}
                  className={`flex items-center justify-between p-3 rounded-lg ${
                    player.isPlayer ? 'bg-primary/10 border border-primary/20' : 'bg-muted/50'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-2">
                      {player.rank <= 3 && <Crown className={`h-4 w-4 ${getRankColor(player.rank)}`} />}
                      <span className={`font-bold ${getRankColor(player.rank)}`}>
                        #{player.rank}
                      </span>
                    </div>
                    <span className="text-2xl">{player.avatar}</span>
                    <div>
                      <p className={`font-medium ${player.isPlayer ? 'text-primary' : ''}`}>
                        {player.name}
                      </p>
                    </div>
                  </div>
                  <Badge variant={player.isPlayer ? "default" : "secondary"}>
                    {player.score.toLocaleString()}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Your Stats */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="h-5 w-5 mr-2 text-primary" />
                Your Gaming Stats
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-sm">Games Played</span>
                <span className="font-bold">47</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Win Rate</span>
                <span className="font-bold text-success">78%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Best Score</span>
                <span className="font-bold text-primary">2,450</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Streak</span>
                <span className="font-bold text-warning">12 days</span>
              </div>
            </CardContent>
          </Card>

          {/* Achievements */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Award className="h-5 w-5 mr-2 text-primary" />
                Recent Achievements
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center space-x-3 p-2 rounded-lg bg-success/10">
                <Trophy className="h-6 w-6 text-success" />
                <div>
                  <p className="font-medium text-success">Quiz Master</p>
                  <p className="text-xs text-muted-foreground">Win 10 quiz battles</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-2 rounded-lg bg-warning/10">
                <Zap className="h-6 w-6 text-warning" />
                <div>
                  <p className="font-medium text-warning">Speed Demon</p>
                  <p className="text-xs text-muted-foreground">Answer 50 questions in 60s</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-2 rounded-lg bg-primary/10">
                <Target className="h-6 w-6 text-primary" />
                <div>
                  <p className="font-medium text-primary">Perfect Score</p>
                  <p className="text-xs text-muted-foreground">Score 100% in any game</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LearningGames;