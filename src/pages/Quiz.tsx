import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import QuizResults from '@/components/QuizResults';
import { Clock, BrainCircuit, Target, Trophy, BookOpen, Play, Settings, Award, TrendingUp } from 'lucide-react';
import { useParams, useNavigate } from "react-router-dom";
import DOMPurify from "dompurify";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
async function fetchMyBooks({
  keyword = "",
  board_id = 0,
  subject_id = 0
}) {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Token not found");
  const response = await fetch(`${API_BASE_URL}/api/my-books`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      keyword,
      board_id,
      subject_id
    })
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Failed to fetch books");
  return data;
}
async function getBook(bookId: number) {
  const res = await fetch(`${API_BASE_URL}/api/book/${bookId}`);
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to fetch books");
  // Extract chapter_id and chapter_name from chapters array
  const chapters = (data.chapters || []).map((ch: any) => ({
    chapter_id: ch.chapter_id,
    chapter_name: ch.chapter_name
  }));
  return {
    ...data,
    chapters
  };
}
async function fetchQuizQuestions({
  book_id,
  chapter_id,
  difficulty_level,
  no_of_questions
}) {
  const response = await fetch(`${API_BASE_URL}/api/quiz-questions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      book_id,
      chapter_id,
      difficulty_level,
      no_of_questions
    })
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Failed to fetch quiz questions");
  return data;
}
const Quiz = () => {
  type QuizAnswer = string | string[]; // one question can have one or multiple answers
  //const [selectedBook, setSelectedBook] = useState('');
  const [selectedChapter, setSelectedChapter] = useState('');
  const [selectedTime, setSelectedTime] = useState('15');
  const [selectedLevel, setSelectedLevel] = useState('');
  const [questionCount, setQuestionCount] = useState([10]);
  const [showQuizSetup, setShowQuizSetup] = useState(true);
  const [quizActive, setQuizActive] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [quizResults, setQuizResults] = useState<any[]>([]);
  const [quizSettings, setQuizSettings] = useState<any>(null);
  const [currentQuizQuestion, setCurrentQuizQuestion] = useState(0);
  const [quizTimeLeft, setQuizTimeLeft] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<QuizAnswer[]>([]);
  const [quizScore, setQuizScore] = useState(0);
  const [selectedQuizAnswer, setSelectedQuizAnswer] = useState('');
  const {
    bookId
  } = useParams();
  const [selectedBook, setSelectedBook] = useState<string>("");
  const [selectedBookTitle, setSelectedBookTitle] = useState<string>("");
  const [books, setBooks] = useState<any[]>([]);
  const [loadingBooks, setLoadingBooks] = useState<boolean>(true);
  const navigate = useNavigate();
  const [chapters, setChapters] = useState<any[]>([]);
  const [fetchedQuestions, setFetchedQuestions] = useState<any[]>([]);
  useEffect(() => {
    const loadBooks = async () => {
      //alert('loadBooks');
      try {
        setLoadingBooks(true);
        const data = await fetchMyBooks({});
        if (data.length > 0) {
          setBooks(data);
          if (bookId) {
            const selected = data.find((b: any) => String(b.id) === String(bookId));
            if (selected) {
              setSelectedBook(String(selected.id));
              setSelectedBookTitle(selected.title);
              getBook(selected.id).then(book => {
                //console.log(book.chapters);
                setChapters(book.chapters);
              });
            }
          } else {
            setSelectedBook(String(data[0].id));
            setSelectedBookTitle(data[0].title);
            getBook(data[0].id).then(book => {
              //console.log(book.chapters);
              setChapters(book.chapters);
            });
          }
        }
      } catch (error) {
        console.error("Error loading books:", error);
      } finally {
        setLoadingBooks(false);
      }
    };
    loadBooks();
  }, [bookId]);
  const handleBookChange = (bookId: string) => {
    setSelectedBook(bookId);
    setSelectedChapter('');
    setChapters([]);
    const book = books.find(b => String(b.id) === bookId);
    if (book) {
      setSelectedBookTitle(book.title);
      navigate(`/quiz/${book.id}`);
    }
    //alert('handleBookChange');
  };
  const recentQuizzes = [{
    id: 1,
    title: 'Algebra Basics',
    subject: 'Mathematics',
    score: 85,
    totalQuestions: 20,
    timeSpent: '12 min',
    date: '2 hours ago',
    difficulty: 'Medium'
  }, {
    id: 2,
    title: 'Photosynthesis',
    subject: 'Science',
    score: 92,
    totalQuestions: 15,
    timeSpent: '8 min',
    date: '1 day ago',
    difficulty: 'Easy'
  }, {
    id: 3,
    title: 'Poetry Analysis',
    subject: 'English',
    score: 78,
    totalQuestions: 25,
    timeSpent: '18 min',
    date: '3 days ago',
    difficulty: 'Hard'
  }];
  const quickQuizzes = [{
    title: 'Lightning Round',
    description: '5 questions in 3 minutes',
    icon: '⚡',
    time: 3,
    questions: 5,
    difficulty: 'Mixed'
  }, {
    title: 'Power Quiz',
    description: '15 questions in 10 minutes',
    icon: '💪',
    time: 10,
    questions: 15,
    difficulty: 'Medium'
  }, {
    title: 'Challenge Mode',
    description: '25 questions in 20 minutes',
    icon: '🏆',
    time: 20,
    questions: 25,
    difficulty: 'Hard'
  }];
  const handleStartQuiz = async () => {
    if (!selectedBook) return alert("Please select a book");
    //if (!selectedChapter) return alert("Please select a chapter");
    if (!selectedLevel) return alert("Please select difficulty level");
    try {
      setShowQuizSetup(false);
      setQuizActive(false);

      // Fetch questions from your proxy API
      const result = await fetchQuizQuestions({
        book_id: Number(selectedBook),
        chapter_id: Number(selectedChapter),
        difficulty_level: selectedLevel,
        no_of_questions: questionCount[0]
      });
      if (!result?.questions?.length) {
        alert("No questions found for this selection.");
        setShowQuizSetup(true);
        return;
      }

      // Store questions in state
      setQuizResults([]); // reset old results
      setQuizScore(0);
      setQuizAnswers([]);
      setCurrentQuizQuestion(0);

      // ✅ Use fetched questions here
      setFetchedQuestions(result.questions);
      startQuiz({
        type: "custom",
        book: selectedBook,
        time: parseInt(selectedTime),
        level: selectedLevel,
        questions: result.questions.length
      });
    } catch (err) {
      console.error("Quiz start error:", err);
      alert("Failed to start quiz. Try again later.");
      setShowQuizSetup(true);
    }
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
      case 'easy':
        return 'bg-success text-success-foreground';
      case 'medium':
        return 'bg-warning text-warning-foreground';
      case 'hard':
        return 'bg-destructive text-destructive-foreground';
      default:
        return 'bg-primary text-primary-foreground';
    }
  };
  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-success';
    if (score >= 70) return 'text-warning';
    return 'text-destructive';
  };
  // const quizQuestions = [{
  //   question: "What is the formula for the area of a triangle?",
  //   options: ["A = πr²", "A = ½ × base × height", "A = length × width", "A = 4 × side"],
  //   correct: "A = ½ × base × height"
  // }, {
  //   question: "Which of these is a prime number?",
  //   options: ["15", "21", "17", "27"],
  //   correct: "17"
  // }, {
  //   question: "What is 8 × 7?",
  //   options: ["54", "56", "58", "64"],
  //   correct: "56"
  // }, {
  //   question: "What is the square root of 64?",
  //   options: ["6", "7", "8", "9"],
  //   correct: "8"
  // }, {
  //   question: "Which element has the chemical symbol 'O'?",
  //   options: ["Gold", "Oxygen", "Silver", "Iron"],
  //   correct: "Oxygen"
  // }];
  const quizQuestions = fetchedQuestions.length > 0 ? fetchedQuestions : [];
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
    const questionType = quizQuestions[currentQuizQuestion].type; // e.g., 'objective_multiple_choice'

    const newAnswers = [...quizAnswers];
    if (questionType === 'objective_multiple_choice') {
      const current = new Set(quizAnswers[currentQuizQuestion] as string[] || []);
      if (current.has(answer)) current.delete(answer);else current.add(answer);
      newAnswers[currentQuizQuestion] = Array.from(current);
      setQuizAnswers(newAnswers);
      setSelectedQuizAnswer(Array.from(current).join(', '));
    } else {
      // single-choice or subjective
      newAnswers[currentQuizQuestion] = answer;
      setQuizAnswers(newAnswers);
      setSelectedQuizAnswer(answer);
      if (answer === quizQuestions[currentQuizQuestion].correct) {
        setQuizScore(quizScore + 1);
      }
    }
  };

  // const nextQuizQuestion = () => {
  //   if (currentQuizQuestion < quizQuestions.length - 1) {
  //     setCurrentQuizQuestion(currentQuizQuestion + 1);

  //     const nextAnswer = quizAnswers[currentQuizQuestion + 1];
  //     if (Array.isArray(nextAnswer)) {
  //       // Join multiple-choice answers with comma, or pick first answer
  //       setSelectedQuizAnswer(nextAnswer.join(', '));
  //     } else {
  //       setSelectedQuizAnswer(nextAnswer || '');
  //     }

  //   } else {
  //     endQuiz();
  //   }
  // };

  const nextQuizQuestion = () => {
    if (currentQuizQuestion < quizQuestions.length - 1) {
      const nextIndex = currentQuizQuestion + 1;
      setCurrentQuizQuestion(nextIndex);
      const nextAnswer = quizAnswers[nextIndex];
      if (typeof nextAnswer === "string") {
        // Subjective (short/long)
        setSelectedQuizAnswer(nextAnswer);
      } else if (Array.isArray(nextAnswer)) {
        // Multiple choice (e.g., multiple select)
        setSelectedQuizAnswer(nextAnswer.join(", "));
      } else {
        // No answer yet
        setSelectedQuizAnswer("");
      }
    } else {
      endQuiz();
    }
  };
  const endQuiz = () => {
    setQuizActive(false);

    // Create detailed results
    const results = quizQuestions.slice(0, quizSettings?.questions || quizQuestions.length).map((q, index) => ({
      question: q.question,
      options: q.options,
      correct: q.correct,
      userAnswer: quizAnswers[index] || '',
      isCorrect: (quizAnswers[index] || '') === q.correct,
      timeSpent: 30 // You can track actual time per question
    }));
    setQuizResults(results);
    setShowResults(true);
  };
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };
  if (quizActive) {
    const currentQ = quizQuestions[currentQuizQuestion];
    return <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
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
              <div className="gradient-primary h-2 rounded-full transition-all duration-300" style={{
              width: `${(currentQuizQuestion + 1) / quizQuestions.length * 100}%`
            }} />
            </div>
          </CardContent>
        </Card>

        {/* Question */}
        <Card className="shadow-elegant">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold mb-6" dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(currentQ.question_text)
          }}></h2>

          {(() => {
            switch (currentQ.question_type) {
              case "objective_single_choice":
              case "assertion":
              case "reasoning":
                return <div className="space-y-3">
          {currentQ.options?.map((option, index) => <Button key={index} onClick={() => handleQuizAnswer(option.text)} variant={selectedQuizAnswer === option.text ? "default" : "outline"} className={`w-full p-4 text-left justify-start h-auto ${selectedQuizAnswer === option.text ? 'gradient-primary' : 'hover:bg-accent'}`}>
              <span className="mr-3 font-bold">{String.fromCharCode(65 + index)}.</span>
              <span dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(option.text)
                    }}></span>
            </Button>)}
        </div>;
              case "objective_multiple_choice":
                return <div className="space-y-3">
          {currentQ.options?.map((option, index) => <Button key={index} onClick={() => {
                    const newAnswers = new Set(quizAnswers[currentQuizQuestion] as string[] || []);
                    if (newAnswers.has(option.text)) newAnswers.delete(option.text);else newAnswers.add(option.text);
                    const arr = [...quizAnswers];
                    arr[currentQuizQuestion] = Array.from(newAnswers); // ✅ no error now
                    setQuizAnswers(arr);
                  }} variant={(quizAnswers[currentQuizQuestion] || []).includes(option.text) ? "default" : "outline"} className="w-full p-4 text-left justify-start h-auto hover:bg-accent">
              <span className="mr-3 font-bold">{String.fromCharCode(65 + index)}.</span>
              <span dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(option.text)
                    }}></span>
            </Button>)}
        </div>;
              case "subjective_short":
              case "subjective_long":
                return <textarea className="w-full border rounded-md p-3 focus:ring-2 focus:ring-primary outline-none" rows={currentQ.question_type === "subjective_long" ? 5 : 2} placeholder="Type your answer here..." value={quizAnswers[currentQuizQuestion] || ""} onChange={e => {
                  const val = e.target.value;

                  // Update quizAnswers array
                  const updatedAnswers = [...quizAnswers];
                  updatedAnswers[currentQuizQuestion] = val;
                  setQuizAnswers(updatedAnswers);

                  // Update selectedQuizAnswer (important for enabling Next button)
                  setSelectedQuizAnswer(val);
                }} />;
              default:
                return <p className="text-muted-foreground">Unsupported question type.</p>;
            }
          })()}
            <div className="flex justify-between mt-6">
              <Button onClick={() => {
              setQuizActive(false);
              setShowQuizSetup(true);
            }} variant="outline">
                Exit Quiz
              </Button>
              <Button onClick={nextQuizQuestion} disabled={!selectedQuizAnswer} className="gradient-primary">
                {currentQuizQuestion === quizQuestions.length - 1 ? 'Finish Quiz' : 'Next Question'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>;
  }
  if (showResults) {
    return <QuizResults results={quizResults} totalTime={quizSettings?.time * 60 - quizTimeLeft} quizTitle={quizSettings?.title || `${selectedBook} Quiz`} onRetakeQuiz={() => {
      setShowResults(false);
      setShowQuizSetup(true);
      setQuizResults([]);
    }} onBackToHome={() => {
      setShowResults(false);
      setShowQuizSetup(true);
      setQuizResults([]);
    }} />;
  }
  if (showQuizSetup) {
    return <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
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
                {loadingBooks ? <p className="text-sm text-muted-foreground">Loading books...</p> : books.length > 0 ? <Select value={selectedBook} onValueChange={value => handleBookChange(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a book" />
                </SelectTrigger>
                <SelectContent className="bg-background z-50 border shadow-lg">
                  {books.map(book => <SelectItem key={book.id} value={String(book.id)}>
                      <div className="flex items-center space-x-2">
                        <BookOpen className="h-4 w-4" />
                        <span>{book.title}</span>
                        {book.board_name && <Badge variant="secondary" className="ml-2">
                            {book.board_name}
                          </Badge>}
                      </div>
                    </SelectItem>)}
                </SelectContent>
              </Select> : <p className="text-sm text-muted-foreground">
                No books found for your account.
              </p>}
              </div>

              {/* Chapter Selection */}
              <div className="space-y-3">
                <label className="text-sm font-medium">Select Chapter</label>
                <Select value={selectedChapter} onValueChange={setSelectedChapter} disabled={!selectedBook}>
                  <SelectTrigger>
                    <SelectValue placeholder={selectedBook ? "Choose a chapter" : "Select book first"} />
                  </SelectTrigger>
                  <SelectContent className="bg-background z-50 border shadow-lg">
                    {selectedBook && chapters.map((chapter, index) => <SelectItem key={index} value={chapter.chapter_id}>
                        {chapter.chapter_name}
                      </SelectItem>)}
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
                  <SelectContent className="bg-background z-50 border shadow-lg">
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
                  <SelectContent className="bg-background z-50 border shadow-lg">
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
                <Slider value={questionCount} onValueChange={setQuestionCount} max={100} min={5} step={5} className="w-full" />
                <div className="flex justify-between text-xs text-muted-foreground mt-2">
                  <span>5</span>
                  <span>50</span>
                  <span>100</span>
                </div>
                
              </div>
            </div>

            <Button onClick={handleStartQuiz} className="w-full gradient-primary text-lg py-6" size="lg">
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
            {recentQuizzes.map(quiz => <Card key={quiz.id} className="shadow-card hover:shadow-elegant transition-smooth">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-4 sm:space-y-0">
                    <div className="flex items-center space-x-3 sm:space-x-4">
                      <div className="gradient-primary p-2 sm:p-3 rounded-full">
                        <Trophy className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-base sm:text-lg">{quiz.title}</h3>
                        <p className="text-muted-foreground text-sm">{quiz.subject}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between sm:justify-end sm:space-x-6">
                      <div className="text-center">
                        <p className={`text-xl sm:text-2xl font-bold ${getScoreColor(quiz.score)}`}>
                          {quiz.score}%
                        </p>
                        <p className="text-xs sm:text-sm text-muted-foreground">
                          {quiz.score * quiz.totalQuestions / 100}/{quiz.totalQuestions}
                        </p>
                      </div>
                      
                      <div className="text-center">
                        <p className="text-base sm:text-lg font-medium">{quiz.timeSpent}</p>
                        <p className="text-xs sm:text-sm text-muted-foreground">Time</p>
                      </div>
                      
                      <div className="flex flex-col items-center space-y-2 sm:space-y-0 sm:items-end">
                        <Badge className={getDifficultyColor(quiz.difficulty)} variant="secondary">
                          {quiz.difficulty}
                        </Badge>
                        <p className="text-xs text-muted-foreground">{quiz.date}</p>
                      </div>
                      
                      <Button variant="outline" size="sm" className="hidden sm:flex">
                        <Award className="h-4 w-4 mr-1" />
                        Review
                      </Button>
                    </div>
                    
                    {/* Mobile Review Button */}
                    <Button variant="outline" size="sm" className="w-full sm:hidden">
                      <Award className="h-4 w-4 mr-1" />
                      Review
                    </Button>
                  </div>
                </CardContent>
              </Card>)}
          </div>
        </div>
      </div>;
  }
  return null;
};
export default Quiz;