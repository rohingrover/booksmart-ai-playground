import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Trophy, 
  Target, 
  Clock,
  CheckCircle,
  XCircle,
  RotateCcw,
  Home,
  Star,
  Award,
  TrendingUp
} from 'lucide-react';

interface QuizResult {
  question: string;
  options: string[];
  correct: string;
  userAnswer: string;
  isCorrect: boolean;
  timeSpent?: number;
}

interface QuizResultsProps {
  results: QuizResult[];
  totalTime: number;
  quizTitle: string;
  onRetakeQuiz: () => void;
  onBackToHome: () => void;
}

const QuizResults = ({ results, totalTime, quizTitle, onRetakeQuiz, onBackToHome }: QuizResultsProps) => {
  const correctAnswers = results.filter(r => r.isCorrect).length;
  const totalQuestions = results.length;
  const percentage = Math.round((correctAnswers / totalQuestions) * 100);
  const averageTimePerQuestion = Math.round(totalTime / totalQuestions);

  const getGrade = (percentage: number) => {
    if (percentage >= 90) return { grade: 'A+', color: 'text-success', bgColor: 'bg-success/10' };
    if (percentage >= 80) return { grade: 'A', color: 'text-success', bgColor: 'bg-success/10' };
    if (percentage >= 70) return { grade: 'B', color: 'text-warning', bgColor: 'bg-warning/10' };
    if (percentage >= 60) return { grade: 'C', color: 'text-warning', bgColor: 'bg-warning/10' };
    return { grade: 'F', color: 'text-destructive', bgColor: 'bg-destructive/10' };
  };

  const grade = getGrade(percentage);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
      {/* Results Header */}
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <div className={`p-4 rounded-full ${grade.bgColor}`}>
            <Trophy className={`h-12 w-12 ${grade.color}`} />
          </div>
        </div>
        <h1 className="text-3xl font-bold">Quiz Complete!</h1>
        <h2 className="text-xl text-muted-foreground">{quizTitle}</h2>
      </div>

      {/* Score Summary */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card className="shadow-card text-center">
          <CardContent className="p-6">
            <div className={`text-4xl font-bold ${grade.color} mb-2`}>
              {grade.grade}
            </div>
            <p className="text-sm text-muted-foreground">Grade</p>
          </CardContent>
        </Card>

        <Card className="shadow-card text-center">
          <CardContent className="p-6">
            <div className="text-4xl font-bold text-primary mb-2">
              {percentage}%
            </div>
            <p className="text-sm text-muted-foreground">Score</p>
          </CardContent>
        </Card>

        <Card className="shadow-card text-center">
          <CardContent className="p-6">
            <div className="text-4xl font-bold text-success mb-2">
              {correctAnswers}/{totalQuestions}
            </div>
            <p className="text-sm text-muted-foreground">Correct</p>
          </CardContent>
        </Card>

        <Card className="shadow-card text-center">
          <CardContent className="p-6">
            <div className="text-4xl font-bold text-warning mb-2">
              {formatTime(totalTime)}
            </div>
            <p className="text-sm text-muted-foreground">Total Time</p>
          </CardContent>
        </Card>
      </div>

      {/* Performance Breakdown */}
      <Card className="shadow-elegant">
        <CardHeader>
          <CardTitle className="flex items-center">
            <TrendingUp className="h-5 w-5 mr-2 text-primary" />
            Performance Analysis
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Progress Bar */}
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium">Overall Performance</span>
              <span className={`text-sm font-bold ${grade.color}`}>{percentage}%</span>
            </div>
            <Progress value={percentage} className="h-3" />
          </div>

          {/* Stats Grid */}
          <div className="grid md:grid-cols-3 gap-4">
            <div className="flex items-center space-x-3 p-4 bg-success/10 rounded-lg">
              <CheckCircle className="h-6 w-6 text-success" />
              <div>
                <p className="font-semibold text-success">{correctAnswers} Correct</p>
                <p className="text-sm text-muted-foreground">Well done!</p>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-4 bg-destructive/10 rounded-lg">
              <XCircle className="h-6 w-6 text-destructive" />
              <div>
                <p className="font-semibold text-destructive">{totalQuestions - correctAnswers} Incorrect</p>
                <p className="text-sm text-muted-foreground">Review these</p>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-4 bg-primary/10 rounded-lg">
              <Clock className="h-6 w-6 text-primary" />
              <div>
                <p className="font-semibold text-primary">{averageTimePerQuestion}s avg</p>
                <p className="text-sm text-muted-foreground">Per question</p>
              </div>
            </div>
          </div>

          {/* Achievement Badge */}
          {percentage >= 80 && (
            <div className="text-center p-4 bg-warning/10 rounded-lg">
              <div className="flex justify-center mb-2">
                <Award className="h-8 w-8 text-warning" />
              </div>
              <p className="font-semibold text-warning">Excellent Performance!</p>
              <p className="text-sm text-muted-foreground">You've mastered this topic</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Detailed Results */}
      <Card className="shadow-elegant">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Target className="h-5 w-5 mr-2 text-primary" />
            Question by Question Analysis
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {results.map((result, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg border-2 ${
                result.isCorrect 
                  ? 'border-success/20 bg-success/5' 
                  : 'border-destructive/20 bg-destructive/5'
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-semibold text-lg">
                  Question {index + 1}
                </h3>
                <div className="flex items-center space-x-2">
                  {result.isCorrect ? (
                    <Badge className="bg-success text-success-foreground">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Correct
                    </Badge>
                  ) : (
                    <Badge className="bg-destructive text-destructive-foreground">
                      <XCircle className="h-3 w-3 mr-1" />
                      Incorrect
                    </Badge>
                  )}
                  {result.timeSpent && (
                    <Badge variant="outline">
                      <Clock className="h-3 w-3 mr-1" />
                      {result.timeSpent}s
                    </Badge>
                  )}
                </div>
              </div>

              <p className="text-foreground font-medium mb-3">{result.question}</p>

              <div className="space-y-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {result.options.map((option, optIndex) => (
                    <div
                      key={optIndex}
                      className={`p-3 rounded border ${
                        option === result.correct
                          ? 'border-success bg-success/10 text-success'
                          : option === result.userAnswer && !result.isCorrect
                          ? 'border-destructive bg-destructive/10 text-destructive'
                          : 'border-muted bg-background'
                      }`}
                    >
                      <div className="flex items-center space-x-2">
                        {option === result.correct && (
                          <CheckCircle className="h-4 w-4 flex-shrink-0" />
                        )}
                        {option === result.userAnswer && !result.isCorrect && (
                          <XCircle className="h-4 w-4 flex-shrink-0" />
                        )}
                        <span className="text-sm">{option}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="text-sm space-y-1">
                  <p><strong>Correct Answer:</strong> <span className="text-success">{result.correct}</span></p>
                  <p><strong>Your Answer:</strong> 
                    <span className={result.isCorrect ? 'text-success' : 'text-destructive'}>
                      {result.userAnswer || 'Not answered'}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex justify-center space-x-4">
        <Button onClick={onRetakeQuiz} className="gradient-primary">
          <RotateCcw className="h-4 w-4 mr-2" />
          Retake Quiz
        </Button>
        <Button onClick={onBackToHome} variant="outline">
          <Home className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Button>
      </div>
    </div>
  );
};

export default QuizResults;