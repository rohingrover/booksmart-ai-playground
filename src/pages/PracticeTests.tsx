import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Clock, 
  BrainCircuit, 
  Target, 
  Trophy, 
  BookOpen,
  Play,
  Lightbulb,
  HelpCircle,
  CheckCircle,
  XCircle,
  RefreshCw,
  MessageCircle,
  Eye,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';

const PracticeTests = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [userAnswers, setUserAnswers] = useState<string[]>([]);

  const questions = [
    {
      id: 1,
      question: "What is the value of x in the equation 2x + 5 = 13?",
      options: ["x = 3", "x = 4", "x = 5", "x = 6"],
      correct: "x = 4",
      hint: "Subtract 5 from both sides first, then divide by 2",
      explanation: "2x + 5 = 13\n2x = 13 - 5\n2x = 8\nx = 4",
      concept: "Linear Equations",
      difficulty: "Easy"
    },
    {
      id: 2,
      question: "Which of the following is the correct formula for the area of a circle?",
      options: ["A = πr", "A = πr²", "A = 2πr", "A = πd"],
      correct: "A = πr²",
      hint: "Remember that area involves squaring the radius",
      explanation: "The area of a circle is calculated using A = πr², where r is the radius. This formula comes from integration of the circumference.",
      concept: "Geometry - Circles",
      difficulty: "Easy"
    },
    {
      id: 3,
      question: "What is the quadratic formula?",
      options: [
        "x = (-b ± √(b² - 4ac)) / 2a",
        "x = (-b ± √(b² + 4ac)) / 2a", 
        "x = (b ± √(b² - 4ac)) / 2a",
        "x = (-b ± √(b² - 4ac)) / a"
      ],
      correct: "x = (-b ± √(b² - 4ac)) / 2a",
      hint: "Remember: negative b, plus or minus, square root of discriminant, all over 2a",
      explanation: "The quadratic formula x = (-b ± √(b² - 4ac)) / 2a is used to find the roots of any quadratic equation ax² + bx + c = 0",
      concept: "Quadratic Equations",
      difficulty: "Medium"
    }
  ];

  const currentQ = questions[currentQuestion];

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestion] = answer;
    setUserAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(userAnswers[currentQuestion + 1] || '');
      setShowHint(false);
      setShowAnswer(false);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedAnswer(userAnswers[currentQuestion - 1] || '');
      setShowHint(false);
      setShowAnswer(false);
    }
  };

  const handleGenerateSimilar = () => {
    alert('Generating similar question... (AI feature)');
  };

  const handleAskAI = () => {
    alert('Opening AI chat for this question... (AI feature)');
  };

  const getAnswerStatus = (option: string) => {
    if (!showAnswer) return '';
    if (option === currentQ.correct) return 'correct';
    if (option === selectedAnswer && option !== currentQ.correct) return 'incorrect';
    return '';
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'easy': return 'bg-success text-success-foreground';
      case 'medium': return 'bg-warning text-warning-foreground';
      case 'hard': return 'bg-destructive text-destructive-foreground';
      default: return 'bg-primary text-primary-foreground';
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold gradient-hero bg-clip-text text-transparent">
          Practice Tests
        </h1>
        <p className="text-lg text-muted-foreground">
          Master concepts with AI-powered practice questions
        </p>
      </div>

      {/* Progress Bar */}
      <Card className="shadow-card">
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">
              Question {currentQuestion + 1} of {questions.length}
            </h3>
            <Badge className={getDifficultyColor(currentQ.difficulty)}>
              {currentQ.difficulty}
            </Badge>
          </div>
          <Progress 
            value={((currentQuestion + 1) / questions.length) * 100} 
            className="h-2"
          />
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Question Area */}
        <div className="lg:col-span-2 space-y-4">
          {/* Question Card */}
          <Card className="shadow-elegant">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl mb-2">{currentQ.question}</CardTitle>
                  <CardDescription className="flex items-center">
                    <BookOpen className="h-4 w-4 mr-1" />
                    {currentQ.concept}
                  </CardDescription>
                </div>
                <Badge variant="outline" className="ml-4">
                  Mathematics
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {/* Answer Options */}
              <div className="space-y-3">
                {currentQ.options.map((option, index) => (
                  <div
                    key={index}
                    onClick={() => handleAnswerSelect(option)}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-smooth ${
                      selectedAnswer === option
                        ? 'border-primary bg-primary/10'
                        : 'border-border hover:border-primary/50'
                    } ${
                      getAnswerStatus(option) === 'correct'
                        ? 'border-success bg-success/10'
                        : getAnswerStatus(option) === 'incorrect'
                        ? 'border-destructive bg-destructive/10'
                        : ''
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{option}</span>
                      {getAnswerStatus(option) === 'correct' && (
                        <CheckCircle className="h-5 w-5 text-success" />
                      )}
                      {getAnswerStatus(option) === 'incorrect' && (
                        <XCircle className="h-5 w-5 text-destructive" />
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Hint Section */}
              {showHint && (
                <Card className="bg-warning/10 border-warning/20">
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-2">
                      <Lightbulb className="h-5 w-5 text-warning flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="font-medium text-warning mb-1">Hint</h4>
                        <p className="text-sm">{currentQ.hint}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Answer Explanation */}
              {showAnswer && (
                <Card className="bg-accent/50">
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <Target className="h-5 w-5 text-primary" />
                        <h4 className="font-medium">Correct Answer: {currentQ.correct}</h4>
                      </div>
                      <div className="bg-background p-3 rounded border">
                        <h5 className="font-medium mb-2">Explanation:</h5>
                        <pre className="text-sm whitespace-pre-wrap font-mono">
                          {currentQ.explanation}
                        </pre>
                      </div>
                      {selectedAnswer === currentQ.correct ? (
                        <div className="flex items-center space-x-2 text-success">
                          <CheckCircle className="h-4 w-4" />
                          <span className="text-sm font-medium">Correct! Well done!</span>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-2 text-destructive">
                          <XCircle className="h-4 w-4" />
                          <span className="text-sm font-medium">
                            Incorrect. Your answer: {selectedAnswer}
                          </span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex justify-between items-center">
            <Button
              onClick={handlePrevious}
              variant="outline"
              disabled={currentQuestion === 0}
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>
            
            <div className="flex space-x-2">
              <Button
                onClick={handleNext}
                disabled={currentQuestion === questions.length - 1}
                className="gradient-primary"
              >
                Next
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>

        {/* AI Tools Sidebar */}
        <div className="space-y-4">
          {/* AI Actions */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <BrainCircuit className="h-5 w-5 mr-2 text-primary" />
                AI Assistance
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button
                onClick={() => setShowHint(!showHint)}
                variant="outline"
                className="w-full justify-start"
              >
                <Lightbulb className="h-4 w-4 mr-2" />
                {showHint ? 'Hide Hint' : 'Get Hint'}
              </Button>
              
              <Button
                onClick={() => setShowAnswer(!showAnswer)}
                variant="outline"
                className="w-full justify-start"
                disabled={!selectedAnswer}
              >
                <Eye className="h-4 w-4 mr-2" />
                {showAnswer ? 'Hide Answer' : 'Show Answer'}
              </Button>
              
              <Button
                onClick={handleGenerateSimilar}
                variant="outline"
                className="w-full justify-start"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Similar Question
              </Button>
              
              <Button
                onClick={handleAskAI}
                className="w-full justify-start gradient-secondary"
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                Ask AI
              </Button>
            </CardContent>
          </Card>

          {/* Progress Summary */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <Trophy className="h-5 w-5 mr-2 text-primary" />
                Your Progress
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm">Answered</span>
                <span className="font-medium">
                  {userAnswers.filter(a => a).length}/{questions.length}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Correct</span>
                <span className="font-medium text-success">
                  {userAnswers.filter((a, i) => a === questions[i]?.correct).length}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Accuracy</span>
                <span className="font-medium">
                  {userAnswers.filter(a => a).length > 0
                    ? Math.round(
                        (userAnswers.filter((a, i) => a === questions[i]?.correct).length /
                          userAnswers.filter(a => a).length) * 100
                      )
                    : 0}%
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PracticeTests;