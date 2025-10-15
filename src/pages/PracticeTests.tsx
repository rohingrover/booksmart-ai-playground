import { useState } from 'react';
import DOMPurify from 'dompurify';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import PracticeTestSetup from '@/components/PracticeTestSetup';
import { 
  Clock, BrainCircuit, Target, Trophy, BookOpen,
  Play, Lightbulb, HelpCircle, CheckCircle, XCircle,
  RefreshCw, MessageCircle, Eye, ChevronRight, ChevronLeft
} from 'lucide-react';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const PracticeTests = () => {
  const [showSetup, setShowSetup] = useState(true);
  const [practiceSettings, setPracticeSettings] = useState<any>(null);
  const [currentQuizQuestion, setCurrentQuizQuestion] = useState(0);
  const [selectedQuizAnswer, setSelectedQuizAnswer] = useState('');
  const [quizAnswers, setQuizAnswers] = useState<any[]>([]);
  const [showHint, setShowHint] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [showAIDialog, setShowAIDialog] = useState(false);
  const [aiQuestion, setAiQuestion] = useState('');
  const [questions, setQuestions] = useState<any[]>([]);

  const startPractice = async (settings: any) => {
    try {
      const payload = {
        book_id: Number(settings.book),
        difficulty_level: settings.difficulty,
        question_type: Object.keys(settings.questionTypes).filter((t) => settings.questionTypes[t]),
        page: 1,
        per_page: settings.questionCount || 10,
      };

      const response = await fetch(`${API_BASE_URL}/api/practice-questions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      const apiQuestions = data?.questions || [];

      // Map API structure to component format
      const mappedQuestions = apiQuestions.map((q: any) => ({
        id: q.id,
        question_text: q.question_text,
        question_type: q.question_type,
        options: q.options?.map((o: any) => ({ text: o.text || o.option_text || '' })) || [],
        correct: q.correct_answer,
        hint: q.question_metadata?.hint || '',
        explanation: q.question_metadata?.explanation || '',
        concept: q.book?.subject_name || 'General',
        difficulty: q.difficulty_level,
        difficulty_level: q.difficulty_level,
      }));

      setQuestions(mappedQuestions);
    } catch (err) {
      console.error("Error fetching questions:", err);
    }
  };

  const handleQuizAnswer = (answer: string) => {
    setSelectedQuizAnswer(answer);
    const updatedAnswers = [...quizAnswers];
    updatedAnswers[currentQuizQuestion] = answer;
    setQuizAnswers(updatedAnswers);
  };

  const handleNext = () => {
    if (currentQuizQuestion < questions.length - 1) {
      setCurrentQuizQuestion(currentQuizQuestion + 1);
      setSelectedQuizAnswer(quizAnswers[currentQuizQuestion + 1] || '');
      setShowHint(false);
      setShowAnswer(false);
    }
  };

  const handlePrevious = () => {
    if (currentQuizQuestion > 0) {
      setCurrentQuizQuestion(currentQuizQuestion - 1);
      setSelectedQuizAnswer(quizAnswers[currentQuizQuestion - 1] || '');
      setShowHint(false);
      setShowAnswer(false);
    }
  };

  const handleGenerateSimilar = () => {
    const similarQuestions = [
      {
        question_text: "What is the value of y in 3y + 7 = 16?",
        options: ["y = 2", "y = 3", "y = 4", "y = 5"],
        correct: "y = 3",
        explanation: "3y + 7 = 16 → 3y = 9 → y = 3"
      },
      {
        question_text: "Solve 4x - 2 = 14",
        options: ["x = 3", "x = 4", "x = 5", "x = 6"],
        correct: "x = 4",
        explanation: "4x - 2 = 14 → 4x = 16 → x = 4"
      }
    ];
    
    const randomQuestion = similarQuestions[Math.floor(Math.random() * similarQuestions.length)];
    
    const newQuestion = {
      id: questions.length + 1,
      question_text: randomQuestion.question_text,
      options: randomQuestion.options.map((o: string) => ({ text: o })),
      correct: randomQuestion.correct,
      hint: "Solve by isolating the variable.",
      explanation: randomQuestion.explanation,
      concept: questions[currentQuizQuestion]?.concept || 'General',
      difficulty: questions[currentQuizQuestion]?.difficulty || 'Medium',
      question_type: 'objective_single_choice'
    };
    
    setQuestions(prev => [...prev, newQuestion]);
    setCurrentQuizQuestion(questions.length);
    setSelectedQuizAnswer('');
    setShowHint(false);
    setShowAnswer(false);
  };

  const handleAskAI = () => setShowAIDialog(true);

  const handleAISubmit = () => {
    if (aiQuestion.trim()) {
      alert(`AI Response: This question tests your understanding of ${questions[currentQuizQuestion].concept}. ${questions[currentQuizQuestion].explanation}`);
      setShowAIDialog(false);
      setAiQuestion('');
    }
  };

  const getAnswerStatus = (option: string) => {
    if (!showAnswer) return '';
    if (option === questions[currentQuizQuestion].correct) return 'correct';
    if (option === selectedQuizAnswer && option !== questions[currentQuizQuestion].correct) return 'incorrect';
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

  const handleStartPractice = (settings: any) => {
    setPracticeSettings(settings);
    setShowSetup(false);
    setCurrentQuizQuestion(0);
    setSelectedQuizAnswer('');
    setQuizAnswers([]);
    setShowHint(false);
    setShowAnswer(false);
    startPractice(settings);
  };

  if (showSetup) {
    return <PracticeTestSetup onStartPractice={handleStartPractice} />;
  }

  const currentQ = questions[currentQuizQuestion];
  if (!currentQ) return <div className="text-center mt-20 text-lg text-muted-foreground">Loading questions...</div>;

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
              Question {currentQuizQuestion + 1} of {questions.length}
            </h3>
            <Badge className={getDifficultyColor(currentQ.difficulty_level)}>
              {currentQ.difficulty_level}
            </Badge>
          </div>
          <Progress 
            value={((currentQuizQuestion + 1) / questions.length) * 100} 
            className="h-2"
          />
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-3 gap-4 lg:gap-6">
        {/* Main Question Area */}
        <div className="lg:col-span-2 space-y-4">
          {/* Question Card */}
          <Card className="shadow-elegant">
            <CardContent className="p-8">
              <h2
                className="text-2xl font-bold mb-6"
                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(currentQ.question_text) }}
              />

              {(() => {
                switch (currentQ.question_type) {
                  case "objective_single_choice":
                  case "assertion":
                  case "reasoning":
                    return (
                      <div className="space-y-3">
                        {currentQ.options?.map((option, index) => (
                          <Button
                            key={index}
                            onClick={() => handleQuizAnswer(option.text)}
                            variant={selectedQuizAnswer === option.text ? "default" : "outline"}
                            className={`w-full p-4 text-left justify-start h-auto ${
                              selectedQuizAnswer === option.text ? 'gradient-primary' : 'hover:bg-accent'
                            }`}
                          >
                            <span className="mr-3 font-bold">{String.fromCharCode(65 + index)}.</span>
                            <span dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(option.text) }}></span>
                          </Button>
                        ))}
                      </div>
                    );

                  case "objective_multiple_choice":
                    return (
                      <div className="space-y-3">
                        {currentQ.options?.map((option, index) => (
                          <Button
                            key={index}
                            onClick={() => {
                              const newAnswers = new Set(quizAnswers[currentQuizQuestion] as string[] || []);
                              if (newAnswers.has(option.text)) newAnswers.delete(option.text);
                              else newAnswers.add(option.text);

                              const arr = [...quizAnswers];
                              arr[currentQuizQuestion] = Array.from(newAnswers);
                              setQuizAnswers(arr);
                            }}
                            variant={(quizAnswers[currentQuizQuestion] || []).includes(option.text) ? "default" : "outline"}
                            className="w-full p-4 text-left justify-start h-auto hover:bg-accent"
                          >
                            <span className="mr-3 font-bold">{String.fromCharCode(65 + index)}.</span>
                            <span dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(option.text) }}></span>
                          </Button>
                        ))}
                      </div>
                    );

                  case "subjective_short":
                  case "subjective_long":
                    return (
                      <textarea
                        className="w-full border rounded-md p-3 focus:ring-2 focus:ring-primary outline-none"
                        rows={currentQ.question_type === "subjective_long" ? 5 : 2}
                        placeholder="Type your answer here..."
                        value={quizAnswers[currentQuizQuestion] || ""}
                        onChange={(e) => {
                          const val = e.target.value;
                          const updatedAnswers = [...quizAnswers];
                          updatedAnswers[currentQuizQuestion] = val;
                          setQuizAnswers(updatedAnswers);
                          setSelectedQuizAnswer(val);
                        }}
                      />
                    );
                  default:
                    return <p className="text-muted-foreground">Unsupported question type.</p>;
                }
              })()}

              {/* Hint */}
              {showHint && currentQ.hint && (
                <Card className="bg-warning/10 border-warning/20 mt-4">
                  <CardContent>
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

              {/* Explanation */}
              {showAnswer && currentQ.explanation && (
                <Card className="bg-accent/50 mt-4">
                  <CardContent className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Target className="h-5 w-5 text-primary" />
                      <h4 className="font-medium">Correct Answer: {currentQ.correct}</h4>
                    </div>
                    <div className="bg-background p-3 rounded border">
                      <h5 className="font-medium mb-2">Explanation:</h5>
                      <pre className="text-sm whitespace-pre-wrap font-mono">{currentQ.explanation}</pre>
                    </div>
                  </CardContent>
                </Card>
              )}
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0">
            <Button onClick={handlePrevious} variant="outline" disabled={currentQuizQuestion === 0} className="w-full sm:w-auto">
              <ChevronLeft className="h-4 w-4 mr-2" /> Previous
            </Button>
            <Button onClick={handleNext} disabled={currentQuizQuestion === questions.length - 1} className="gradient-primary w-full sm:w-auto">
              Next <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>

        {/* Sidebar AI Tools & Progress */}
        <div className="space-y-4">
          {/* AI Tools */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="text-lg flex items-center"><BrainCircuit className="h-5 w-5 mr-2 text-primary" /> AI Assistance</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button onClick={() => setShowHint(!showHint)} variant="outline" className="w-full justify-start">
                <Lightbulb className="h-4 w-4 mr-2" /> {showHint ? 'Hide Hint' : 'Get Hint'}
              </Button>
              <Button onClick={() => setShowAnswer(!showAnswer)} variant="outline" className="w-full justify-start" disabled={!selectedQuizAnswer}>
                <Eye className="h-4 w-4 mr-2" /> {showAnswer ? 'Hide Answer' : 'Show Answer'}
              </Button>
              <Button onClick={handleGenerateSimilar} variant="outline" className="w-full justify-start">
                <RefreshCw className="h-4 w-4 mr-2" /> Similar Question
              </Button>
              <Button onClick={handleAskAI} className="w-full justify-start gradient-secondary">
                <MessageCircle className="h-4 w-4 mr-2" /> Ask AI
              </Button>
            </CardContent>
          </Card>

          {/* Progress */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="text-lg flex items-center"><Trophy className="h-5 w-5 mr-2 text-primary" /> Your Progress</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm">Answered</span>
                <span className="font-medium">{quizAnswers.filter(a => a).length}/{questions.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Correct</span>
                <span className="font-medium text-success">
                  {quizAnswers.filter((a, i) => a === questions[i]?.correct).length}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Accuracy</span>
                <span className="font-medium">
                  {quizAnswers.filter(a => a).length > 0
                    ? Math.round((quizAnswers.filter((a, i) => a === questions[i]?.correct).length / quizAnswers.filter(a => a).length) * 100)
                    : 0}%
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* AI Chat Dialog */}
      <Dialog open={showAIDialog} onOpenChange={setShowAIDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Ask AI about this question</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="p-3 bg-muted rounded">
              <p className="text-sm"><strong>Question:</strong> {currentQ.question_text}</p>
            </div>
            <textarea
              className="w-full border rounded-md p-3 focus:ring-2 focus:ring-primary outline-none"
              rows={3}
              placeholder="What would you like to know?"
              value={aiQuestion}
              onChange={(e) => setAiQuestion(e.target.value)}
            />
            <div className="flex space-x-2">
              <Button onClick={handleAISubmit} className="gradient-primary">Ask AI</Button>
              <Button variant="outline" onClick={() => setShowAIDialog(false)}>Close</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PracticeTests;
