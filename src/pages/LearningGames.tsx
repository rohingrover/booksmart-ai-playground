import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import SpaceShooterGame from '@/components/SpaceShooterGame';
import GamePlayer from './components/GamePlayer';
import GamePlayerInline from './components/GamePlayerInline';

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
  Play,
  BookOpen
} from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useParams, useNavigate } from "react-router-dom";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  async function fetchMyBooks({ keyword = "", board_id = 0, subject_id = 0 }) {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("Token not found");

    const response = await fetch(`${API_BASE_URL}/api/my-books`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ keyword, board_id, subject_id }),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || "Failed to fetch books");
    return data;
  }

  async function fetchGamesByBookId(bookId: string | number, skip = 0, limit = 100) {
    const response = await fetch(
      `${API_BASE_URL}/api/games/book/${bookId}?skip=${skip}&limit=${limit}`
    );

    if (!response.ok) throw new Error("Failed to fetch games");
    const data = await response.json();
    return data;
  }

const LearningGames = () => {
  const [activeGameUrl, setActiveGameUrl] = useState<string | null>(null);
  // const [gameResult, setGameResult] = useState<{ score: number; timeSpent: number; maxScore?: number } | null>(null);
  const [gameResult, setGameResult] = useState<any>(null);

  const [selectedGame, setSelectedGame] = useState<string | null>(null);
  const [selectedBook, setSelectedBook] = useState<string>('');
  const [gameInProgress, setGameInProgress] = useState(false);

  // Dummy book list (replace this with API data)
  // const [books, setBooks] = useState([
  //   { id: 44, title: "Mathematics - Class 10" },
  //   { id: 45, title: "Science - Class 10" },
  //   { id: 46, title: "English Grammar" },
  //   { id: 49, title: "Physics - Class 12" }
  // ]);

  const { bookId } = useParams();
  const [books, setBooks] = useState<any[]>([]);
  const [loadingBooks, setLoadingBooks] = useState<boolean>(true);
  const navigate = useNavigate();
  
  // Quiz Battle Game State
  const [hp, setHp] = useState(100);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');

  const [games, setGames] = useState<any[]>([]);
  const [loadingGames, setLoadingGames] = useState<boolean>(false);
  const [page, setPage] = useState(0);
  const limit = 100;

  useEffect(() => {
    const loadBooksAndGames = async () => {
      try {
        setLoadingBooks(true);
        const booksData = await fetchMyBooks({});
        if (booksData.length > 0) {
          setBooks(booksData);

          let selectedBookId = bookId
            ? String(bookId)
            : String(booksData[0].id);

          setSelectedBook(selectedBookId);

          // Load first page (skip = 0)
          await loadGames(selectedBookId, 0, limit);
        }
      } catch (error) {
        console.error("Error loading books/games:", error);
      } finally {
        setLoadingBooks(false);
      }
    };

    loadBooksAndGames();
  }, [bookId]);

  const loadGames = async (bookId: string, skip = 0, limit = 100) => {
    try {
      setLoadingGames(true);
      const res = await fetch(`${API_BASE_URL}/api/games/book/${bookId}?skip=${skip}&limit=${limit}`);
      const data = await res.json();
      console.log(data);
      setGames(data || []);
    } catch (error) {
      console.error("Error fetching games:", error);
    } finally {
      setLoadingGames(false);
    }
  };

  // useEffect(() => {
  //   if (bookId) loadGames(bookId, 0, limit);
  // }, [bookId]);

  // Pagination handlers
  const handleNext = () => {
    const newPage = page + 1;
    setPage(newPage);
    loadGames(bookId, newPage * limit, limit);
  };

  const handlePrev = () => {
    if (page === 0) return;
    const newPage = page - 1;
    setPage(newPage);
    loadGames(bookId, newPage * limit, limit);
  };

  const handleBookChange = (bookId: string) => {
    setSelectedBook(bookId);
    
    const book = books.find((b) => String(b.id) === bookId);
    if (book) {
      navigate(`/games/${book.id}`);
    }
    //alert('handleBookChange');
  };

  const leaderboard = [
    { rank: 1, name: 'Alex Kumar', score: 2450, avatar: '👨‍🎓' },
    { rank: 2, name: 'Priya Sharma', score: 2380, avatar: '👩‍🎓' },
    { rank: 3, name: 'Rohit Singh', score: 2340, avatar: '👨‍💻' },
    { rank: 4, name: 'Sneha Patel', score: 2200, avatar: '👩‍🔬' },
    { rank: 5, name: 'You', score: 1950, avatar: '🎯', isPlayer: true }
  ];

  // const games = [
  //   {
  //     id: 'quiz-battle',
  //     title: 'Quiz Battle',
  //     description: 'Battle with questions! Lose HP for wrong answers, gain for correct ones',
  //     icon: Sword,
  //     color: 'gradient-secondary',
  //     difficulty: 'Medium',
  //     players: '1,234 online',
  //     features: ['HP System', 'Time Pressure', 'Leaderboard']
  //   },
  //   {
  //     id: 'speed-challenge',
  //     title: 'Speed Challenge',
  //     description: 'Answer as many questions as possible in 60 seconds',
  //     icon: Zap,
  //     color: 'gradient-primary',
  //     difficulty: 'Hard',
  //     players: '856 online',
  //     features: ['Speed Based', 'Combo System', 'Power-ups']
  //   },
  //   {
  //     id: 'space-shooter',
  //     title: 'Space Shooter Quiz',
  //     description: 'Defend Earth by shooting correct answers! Test your knowledge in an action-packed space adventure.',
  //     icon: Target,
  //     color: 'bg-success',
  //     difficulty: 'Medium',
  //     players: '642 online',
  //     features: ['Action Game', 'Multiple Choice', 'Real-time Combat']
  //   }
  // ];

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

      {/* 📚 Book Selection Dropdown */}
      <Card className="shadow-card">
        <CardContent className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6">
          <div className="flex items-center space-x-3">
            <BookOpen className="h-6 w-6 text-primary" />
            <div>
              <h3 className="text-lg font-semibold">Select Book</h3>
              <p className="text-sm text-muted-foreground">Choose a book to play with</p>
            </div>
          </div>
          <div className="space-y-3">
                <label className="text-sm font-medium">Select Book</label>
                {loadingBooks ? (
              <p className="text-sm text-muted-foreground">Loading books...</p>
            ) : books.length > 0 ? (
              <Select
                value={selectedBook}
                onValueChange={(value) => handleBookChange(value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Choose a book" />
                </SelectTrigger>
                <SelectContent className="bg-background z-50 border shadow-lg">
                  {books.map((book) => (
                    <SelectItem
                      key={book.id}
                      value={String(book.id)}
                    >
                      <div className="flex items-center space-x-2">
                        <BookOpen className="h-4 w-4" />
                        <span>{book.title}</span>
                        {book.board_name && (
                          <Badge variant="secondary" className="ml-2">
                            {book.board_name}
                          </Badge>
                        )}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : (
              <p className="text-sm text-muted-foreground">
                No books found for your account.
              </p>
            )}
              </div>
        </CardContent>
      </Card>

      {/* Games Section */}
      <div className="space-y-6">
        <h2 className="text-xl sm:text-2xl font-semibold flex items-center">
          <Gamepad2 className="h-5 w-5 sm:h-6 sm:w-6 mr-2 text-primary" />
          Available Games
        </h2>

        <Card className="mt-4">
          <CardContent className="p-4">
            <h2 className="text-lg font-semibold mb-3">Available Games</h2>

            {activeGameUrl ? (
              <>
                {/* Back to list button */}
                <div className="flex justify-between items-center mb-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setActiveGameUrl(null);
                      setGameResult(null);
                    }}
                  >
                    ← Back to Game List
                  </Button>

                  {gameResult && (
                    <div className="text-sm text-gray-600">
                      <span className="font-medium">🏆 Score:</span>{" "}
                      {gameResult.score} / {gameResult.maxScore} |{" "}
                      <span className="font-medium">⏱ Time:</span>{" "}
                      {Math.floor(gameResult.timeSpent / 60)}m{" "}
                      {gameResult.timeSpent % 60}s
                    </div>
                  )}
                </div>

                {/* Game player */}
                <GamePlayer
                  gameUrl={activeGameUrl}
                  onGameComplete={({ score, timeSpent, maxScore }) => {
                    const result = { score, timeSpent, maxScore };
                    console.log("🎮 Game finished:", result);
                    setGameResult(result);
                  }}
                />
              </>
            ) : loadingGames ? (
              <p className="text-sm text-muted-foreground">Loading games...</p>
            ) : games.length > 0 ? (
              <div className="space-y-3">
                {games.map((game) => (
                  <div
                    key={game.id}
                    className="p-3 border rounded-md hover:bg-accent transition flex items-center justify-between"
                  >
                    <span className="text-sm font-medium">{game.game_name}</span>
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex items-center space-x-1"
                      onClick={() => {
                        setActiveGameUrl(game.s3_url);
                        setGameResult(null);
                      }}
                    >
                      <Play className="w-4 h-4 text-green-600" />
                      <span>Play</span>
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No games found.</p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* 📊 Leaderboard, Stats, Achievements Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        {/* Leaderboard */}
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
                    <span className={`font-bold ${getRankColor(player.rank)}`}>#{player.rank}</span>
                  </div>
                  <span className="text-2xl">{player.avatar}</span>
                  <div>
                    <p className={`font-medium ${player.isPlayer ? 'text-primary' : ''}`}>{player.name}</p>
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
  );
};

export default LearningGames;