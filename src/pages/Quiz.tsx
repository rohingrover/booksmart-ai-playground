import { useState } from 'react';
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
    // Navigate to quiz page with settings
    console.log('Starting quiz with settings:', {
      book: selectedBook,
      time: selectedTime,
      level: selectedLevel,
      questions: questionCount[0]
    });
  };

  const handleQuickQuiz = (quiz: any) => {
    console.log('Starting quick quiz:', quiz);
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