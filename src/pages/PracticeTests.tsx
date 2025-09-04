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

  const initialQuestions = [
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

  const [questions, setQuestions] = useState(initialQuestions);

  const currentQ = questions[currentQuestion];

  // Safety check to prevent undefined access
  if (!currentQ) {
    return <div>Loading...</div>;
  }

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
    // Generate a similar question based on current topic
    const similarQuestions = [
      {
        question: "What is the value of y in the equation 3y + 7 = 16?",
        options: ["y = 2", "y = 3", "y = 4", "y = 5"],
        correct: "y = 3",
        explanation: "3y + 7 = 16\n3y = 16 - 7\n3y = 9\ny = 3"
      },
      {
        question: "Solve for x: 4x - 2 = 14",
        options: ["x = 3", "x = 4", "x = 5", "x = 6"],
        correct: "x = 4",
        explanation: "4x - 2 = 14\n4x = 14 + 2\n4x = 16\nx = 4"
      }
    ];
    
    const randomQuestion = similarQuestions[Math.floor(Math.random() * similarQuestions.length)];
    
    // Create new question object
    const newQuestion = {
      id: questions.length + 1,
      question: randomQuestion.question,
      options: randomQuestion.options,
      correct: randomQuestion.correct,
      hint: "This is a similar linear equation. Follow the same steps: isolate the variable term, then divide.",
      explanation: randomQuestion.explanation,
      concept: currentQ.concept,
      difficulty: currentQ.difficulty
    };
    
    // Update questions state properly
    setQuestions(prev => [...prev, newQuestion]);
    setCurrentQuestion(questions.length);
    setSelectedAnswer('');
    setShowHint(false);
    setShowAnswer(false);
  };

  const handleAskAI = () => {
    const aiDialog = document.createElement('div');
    aiDialog.className = 'fixed inset-0 bg-black/50 flex items-center justify-center z-50';
    aiDialog.innerHTML = `
      <div class="bg-background border rounded-lg p-6 max-w-md w-full mx-4">
        <h3 class="text-lg font-semibold mb-4">Ask AI about this question</h3>
        <div class="space-y-4">
          <div class="p-3 bg-muted rounded">
            <p class="text-sm"><strong>Question:</strong> ${currentQ.question}</p>
          </div>
          <textarea 
            id="aiInput" 
            placeholder="What would you like to know about this question?"
            class="w-full p-3 border rounded resize-none"
            rows="3"
          ></textarea>
          <div class="flex space-x-2">
            <button id="askBtn" class="px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90">
              Ask AI
            </button>
            <button id="closeBtn" class="px-4 py-2 border rounded hover:bg-muted">
              Close
            </button>
          </div>
        </div>
      </div>
    `;
    
    document.body.appendChild(aiDialog);
    
    aiDialog.querySelector('#closeBtn')?.addEventListener('click', () => {
      document.body.removeChild(aiDialog);
    });
    
    aiDialog.querySelector('#askBtn')?.addEventListener('click', () => {
      const input = aiDialog.querySelector('#aiInput') as HTMLTextAreaElement;
      if (input.value.trim()) {
        alert(`AI Response: This question tests your understanding of ${currentQ.concept}. ${currentQ.explanation}`);
        document.body.removeChild(aiDialog);
      }
    });
    
    aiDialog.addEventListener('click', (e) => {
      if (e.target === aiDialog) {
        document.body.removeChild(aiDialog);
      }
    });
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