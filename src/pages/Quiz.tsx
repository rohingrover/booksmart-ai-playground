import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { 
  Clock, 
  BrainCircuit, 
  Target, 
  Trophy, 
  BookOpen,
  Play,
  Settings,
  Award,
  TrendingUp
} from 'lucide-react';

const Quiz = () => {
  const [selectedBook, setSelectedBook] = useState('');
  const [selectedTime, setSelectedTime] = useState('15');
  const [selectedLevel, setSelectedLevel] = useState('');
  const [questionCount, setQuestionCount] = useState([10]);
  const [showQuizSetup, setShowQuizSetup] = useState(true);
  const [quizActive, setQuizActive] = useState(false);
  const [quizSettings, setQuizSettings] = useState<any>(null);
  const [currentQuizQuestion, setCurrentQuizQuestion] = useState(0);
  const [quizTimeLeft, setQuizTimeLeft] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<string[]>([]);
  const [quizScore, setQuizScore] = useState(0);
  const [selectedQuizAnswer, setSelectedQuizAnswer] = useState('');

  const books = [
    { id: 1, title: 'Mathematics Class 10', subject: 'Mathematics', board: 'CBSE' },
    { id: 2, title: 'Science Class 9', subject: 'Science', board: 'NCERT' },
    { id: 3, title: 'English Literature', subject: 'English', board: 'ICSE' },
    { id: 4, title: 'History Class 8', subject: 'History', board: 'CBSE' }
  ];

  const recentQuizzes = [
    {
      id: 1,
      title: 'Algebra Basics',
      subject: 'Mathematics',
      score: 85,
      totalQuestions: 20,
      timeSpent: '12 min',
      date: '2 hours ago',
      difficulty: 'Medium'
    },
    {
      id: 2,
      title: 'Photosynthesis',
      subject: 'Science',
      score: 92,
      totalQuestions: 15,
      timeSpent: '8 min',
      date: '1 day ago',
      difficulty: 'Easy'
    },
    {
      id: 3,
      title: 'Poetry Analysis',
      subject: 'English',
      score: 78,
      totalQuestions: 25,
      timeSpent: '18 min',
      date: '3 days ago',
      difficulty: 'Hard'
    }
  ];

  const quickQuizzes = [
    {
      title: 'Lightning Round',
      description: '5 questions in 3 minutes',
      icon: '⚡',
      time: 3,
      questions: 5,
      difficulty: 'Mixed'
    },
    {
      title: 'Power Quiz',
      description: '15 questions in 10 minutes',
      icon: '💪',
      time: 10,
      questions: 15,
      difficulty: 'Medium'
    },
    {
      title: 'Challenge Mode',
      description: '25 questions in 20 minutes',
      icon: '🏆',
      time: 20,
      questions: 25,
      difficulty: 'Hard'
    }
  ];

  const handleStartQuiz = () => {
    if (!selectedBook || !selectedLevel) {
      alert('Please select a book and difficulty level');
      return;
    }
    setShowQuizSetup(false);
    startQuiz({
      type: 'custom',
      book: selectedBook,
      time: parseInt(selectedTime),
      level: selectedLevel,
      questions: questionCount[0]
    });
  };

  const startQuiz = (settings: any) => {
    setQuizSettings(settings);
    setQuizActive(true);
    setCurrentQuizQuestion(0);
    setQuizTimeLeft(settings.time * 60); // Convert minutes to seconds
    setQuizAnswers([]);
    setQuizScore(0);
  };

  const handleQuickQuiz = (quiz: any) => {
    setShowQuizSetup(false);
    startQuiz({
      type: 'quick',
      title: quiz.title,
      time: quiz.time,
      questions: quiz.questions,
      difficulty: quiz.difficulty
    });
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'easy': return 'bg-success text-success-foreground';
      case 'medium': return 'bg-warning text-warning-foreground';
      case 'hard': return 'bg-destructive text-destructive-foreground';
      default: return 'bg-primary text-primary-foreground';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-success';
    if (score >= 70) return 'text-warning';
    return 'text-destructive';
  };

  const quizQuestions = [
    {
      question: "What is the formula for the area of a triangle?",
      options: ["A = πr²", "A = ½ × base × height", "A = length × width", "A = 4 × side"],
      correct: "A = ½ × base × height"
    },
    {
      question: "Which of these is a prime number?",
      options: ["15", "21", "17", "27"],
      correct: "17"
    },
    {
      question: "What is 8 × 7?",
      options: ["54", "56", "58", "64"],
      correct: "56"
    },
    {
      question: "What is the square root of 64?",
      options: ["6", "7", "8", "9"],
      correct: "8"
    },
    {
      question: "Which element has the chemical symbol 'O'?",
      options: ["Gold", "Oxygen", "Silver", "Iron"],
      correct: "Oxygen"
    }
  ];

  // Quiz timer effect
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (quizActive && quizTimeLeft > 0) {
      timer = setTimeout(() => setQuizTimeLeft(quizTimeLeft - 1), 1000);
    } else if (quizActive && quizTimeLeft === 0) {
      endQuiz();
    }
    return () => clearTimeout(timer);
  }, [quizActive, quizTimeLeft]);

  const handleQuizAnswer = (answer: string) => {
    setSelectedQuizAnswer(answer);
    const newAnswers = [...quizAnswers];
    newAnswers[currentQuizQuestion] = answer;
    setQuizAnswers(newAnswers);
    
    if (answer === quizQuestions[currentQuizQuestion].correct) {
      setQuizScore(quizScore + 1);
    }
  };

  const nextQuizQuestion = () => {
    if (currentQuizQuestion < quizQuestions.length - 1) {
      setCurrentQuizQuestion(currentQuizQuestion + 1);
      setSelectedQuizAnswer(quizAnswers[currentQuizQuestion + 1] || '');
    } else {
      endQuiz();
    }
  };

  const endQuiz = () => {
    setQuizActive(false);
    const percentage = Math.round((quizScore / quizQuestions.length) * 100);
    alert(`Quiz Complete!\nScore: ${quizScore}/${quizQuestions.length} (${percentage}%)`);
    setShowQuizSetup(true);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (quizActive) {
    const currentQ = quizQuestions[currentQuizQuestion];
    return (
      <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
        {/* Quiz Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">
              {quizSettings?.title || 'Custom Quiz'}
            </h1>
            <p className="text-muted-foreground">
              Question {currentQuizQuestion + 1} of {quizQuestions.length}
            </p>
          </div>
          <div className="flex items-center space-x-6">
            <div className="text-center">
              <Clock className="h-5 w-5 mx-auto text-warning" />
              <p className="text-xl font-bold text-warning">{formatTime(quizTimeLeft)}</p>
            </div>
            <div className="text-center">
              <Trophy className="h-5 w-5 mx-auto text-primary" />
              <p className="text-xl font-bold">{quizScore}/{quizQuestions.length}</p>
            </div>
          </div>
        </div>

        {/* Progress */}
        <Card className="shadow-card">
          <CardContent className="p-4">
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium">Progress</span>
              <span className="text-sm text-muted-foreground">
                {currentQuizQuestion + 1}/{quizQuestions.length}
              </span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className="gradient-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentQuizQuestion + 1) / quizQuestions.length) * 100}%` }}
              />
            </div>
          </CardContent>
        </Card>

        {/* Question */}
        <Card className="shadow-elegant">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold mb-6">{currentQ.question}</h2>
            <div className="space-y-3">
              {currentQ.options.map((option, index) => (
                <Button
                  key={index}
                  onClick={() => handleQuizAnswer(option)}
                  variant={selectedQuizAnswer === option ? "default" : "outline"}
                  className={`w-full p-4 text-left justify-start h-auto ${
                    selectedQuizAnswer === option ? 'gradient-primary' : 'hover:bg-accent'
                  }`}
                >
                  <span className="mr-3 font-bold">{String.fromCharCode(65 + index)}.</span>
                  {option}
                </Button>
              ))}
            </div>
            <div className="flex justify-between mt-6">
              <Button
                onClick={() => {
                  setQuizActive(false);
                  setShowQuizSetup(true);
                }}
                variant="outline"
              >
                Exit Quiz
              </Button>
              <Button
                onClick={nextQuizQuestion}
                disabled={!selectedQuizAnswer}
                className="gradient-primary"
              >
                {currentQuizQuestion === quizQuestions.length - 1 ? 'Finish Quiz' : 'Next Question'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (showQuizSetup) {
    return (
      <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold gradient-hero bg-clip-text text-transparent">
            Quiz Center
          </h1>
          <p className="text-lg text-muted-foreground">
            Test your knowledge with customizable quizzes
          </p>
        </div>

        {/* Quick Quiz Options */}
        <div>
          <h2 className="text-2xl font-semibold mb-6 flex items-center">
            <Play className="h-6 w-6 mr-2 text-primary" />
            Quick Start
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {quickQuizzes.map((quiz, index) => (
              <Card 
                key={index} 
                className="shadow-card hover:shadow-elegant transition-smooth cursor-pointer hover:scale-105"
                onClick={() => handleQuickQuiz(quiz)}
              >
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-4">{quiz.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{quiz.title}</h3>
                  <p className="text-muted-foreground mb-4">{quiz.description}</p>
                  <div className="flex justify-between text-sm">
                    <span className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {quiz.time}m
                    </span>
                    <span className="flex items-center">
                      <Target className="h-4 w-4 mr-1" />
                      {quiz.questions}Q
                    </span>
                  </div>
                  <Button className="w-full mt-4 gradient-primary">
                    Start Now
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Custom Quiz Setup */}
        <Card className="shadow-elegant">
          <CardHeader>
            <CardTitle className="flex items-center text-2xl">
              <Settings className="h-6 w-6 mr-2 text-primary" />
              Custom Quiz Setup
            </CardTitle>
            <CardDescription>
              Configure your quiz settings for a personalized experience
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Book Selection */}
              <div className="space-y-3">
                <label className="text-sm font-medium">Select Book</label>
                <Select value={selectedBook} onValueChange={setSelectedBook}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a book" />
                  </SelectTrigger>
                  <SelectContent>
                    {books.map((book) => (
                      <SelectItem key={book.id} value={book.title}>
                        <div className="flex items-center space-x-2">
                          <BookOpen className="h-4 w-4" />
                          <span>{book.title}</span>
                          <Badge variant="secondary" className="ml-2">
                            {book.board}
                          </Badge>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Difficulty Level */}
              <div className="space-y-3">
                <label className="text-sm font-medium">Difficulty Level</label>
                <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose difficulty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="easy">
                      <Badge className="bg-success text-success-foreground mr-2">Easy</Badge>
                      Beginner friendly
                    </SelectItem>
                    <SelectItem value="medium">
                      <Badge className="bg-warning text-warning-foreground mr-2">Medium</Badge>
                      Moderate challenge
                    </SelectItem>
                    <SelectItem value="hard">
                      <Badge className="bg-destructive text-destructive-foreground mr-2">Hard</Badge>
                      Expert level
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Time Limit */}
              <div className="space-y-3">
                <label className="text-sm font-medium">Time Limit</label>
                <Select value={selectedTime} onValueChange={setSelectedTime}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">5 minutes</SelectItem>
                    <SelectItem value="10">10 minutes</SelectItem>
                    <SelectItem value="15">15 minutes</SelectItem>
                    <SelectItem value="20">20 minutes</SelectItem>
                    <SelectItem value="30">30 minutes</SelectItem>
                    <SelectItem value="60">60 minutes</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Question Count */}
              <div className="space-y-3">
                <label className="text-sm font-medium">
                  Number of Questions: {questionCount[0]}
                </label>
                <Slider
                  value={questionCount}
                  onValueChange={setQuestionCount}
                  max={50}
                  min={5}
                  step={5}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>5</span>
                  <span>25</span>
                  <span>50</span>
                </div>
              </div>
            </div>

            <Button 
              onClick={handleStartQuiz}
              className="w-full gradient-primary text-lg py-6"
              size="lg"
            >
              <Play className="h-5 w-5 mr-2" />
              Start Custom Quiz
            </Button>
          </CardContent>
        </Card>

        {/* Recent Quizzes */}
        <div>
          <h2 className="text-2xl font-semibold mb-6 flex items-center">
            <TrendingUp className="h-6 w-6 mr-2 text-primary" />
            Recent Performance
          </h2>
          <div className="grid gap-4">
            {recentQuizzes.map((quiz) => (
              <Card key={quiz.id} className="shadow-card hover:shadow-elegant transition-smooth">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="gradient-primary p-3 rounded-full">
                        <Trophy className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{quiz.title}</h3>
                        <p className="text-muted-foreground">{quiz.subject}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-6">
                      <div className="text-center">
                        <p className={`text-2xl font-bold ${getScoreColor(quiz.score)}`}>
                          {quiz.score}%
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {quiz.score * quiz.totalQuestions / 100}/{quiz.totalQuestions}
                        </p>
                      </div>
                      
                      <div className="text-center">
                        <p className="text-lg font-medium">{quiz.timeSpent}</p>
                        <p className="text-sm text-muted-foreground">Time</p>
                      </div>
                      
                      <Badge className={getDifficultyColor(quiz.difficulty)}>
                        {quiz.difficulty}
                      </Badge>
                      
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">{quiz.date}</p>
                        <Button variant="outline" size="sm">
                          <Award className="h-4 w-4 mr-1" />
                          Review
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default Quiz;