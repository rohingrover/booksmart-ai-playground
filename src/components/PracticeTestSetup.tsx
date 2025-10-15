import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  BookOpen, 
  Settings,
  Target,
  Clock,
  BrainCircuit,
  Play
} from 'lucide-react';

import { useParams, useNavigate } from "react-router-dom";
import DOMPurify from "dompurify";
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

interface PracticeTestSetupProps {
  onStartPractice: (settings: any) => void;
}

const PracticeTestSetup = ({ onStartPractice }: PracticeTestSetupProps) => {
  const [selectedChapter, setSelectedChapter] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('');
  const [questionCount, setQuestionCount] = useState([10]);
  const [questionTypes, setQuestionTypes] = useState({
    subjective_long: false,
    subjective_short: false,
    objective_single_choice: false,
    objective_multiple_choice: false,
    assertion: false,
    reasoning: false,
  });

  const { bookId } = useParams();
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
                  
                }
              } else {
                
                setSelectedBook(String(data[0].id));
                setSelectedBookTitle(data[0].title);
                
                
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
        const book = books.find((b) => String(b.id) === bookId);
        if (book) {
          setSelectedBookTitle(book.title);
          navigate(`/practice/${book.id}`);
        }
        //alert('handleBookChange');
      };

  // const books = [
  //   { id: 1, title: 'Mathematics Class 10', subject: 'Mathematics', board: 'CBSE', chapters: ['Algebra', 'Geometry', 'Trigonometry', 'Statistics', 'Probability'] },
  //   { id: 2, title: 'Science Class 9', subject: 'Science', board: 'NCERT', chapters: ['Physics', 'Chemistry', 'Biology', 'Environmental Science'] },
  //   { id: 3, title: 'English Literature', subject: 'English', board: 'ICSE', chapters: ['Poetry', 'Prose', 'Grammar', 'Writing Skills', 'Literature Analysis'] },
  //   { id: 4, title: 'History Class 8', subject: 'History', board: 'CBSE', chapters: ['Ancient India', 'Medieval Period', 'British Rule', 'Independence Movement'] }
  // ];

  const handleStart = () => {
    if (!selectedBook || !selectedDifficulty) {
      alert("Please select a book and difficulty level");
      return;
    }

    const settings = {
      book: selectedBook,
      difficulty: selectedDifficulty,
      questionCount: questionCount[0],
      questionTypes,
    };

    onStartPractice(settings);
  };

  const handleQuestionTypeChange = (type: string, value: boolean) => {
    setQuestionTypes((prev) => ({ ...prev, [type]: value }));
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
          Practice Test Setup
        </h1>
        <p className="text-lg text-muted-foreground">
          Customize your practice session with AI-powered features
        </p>
      </div>

      <Card className="shadow-elegant">
        <CardHeader>
          <CardTitle className="flex items-center text-2xl">
            <Settings className="h-6 w-6 mr-2 text-primary" />
            Configure Your Practice Test
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
              {/* Book Selection */}
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

            {/* Difficulty Level */}
            <div className="space-y-3">
              <label className="text-sm font-medium">Difficulty Level</label>
              <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose difficulty" />
                </SelectTrigger>
                <SelectContent className="bg-background z-50 border shadow-lg">
                  <SelectItem value="easy">
                    <div className="flex items-center space-x-2">
                      <Badge className="bg-success text-success-foreground">Easy</Badge>
                      <span>Beginner friendly</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="medium">
                    <div className="flex items-center space-x-2">
                      <Badge className="bg-warning text-warning-foreground">Medium</Badge>
                      <span>Moderate challenge</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="hard">
                    <div className="flex items-center space-x-2">
                      <Badge className="bg-destructive text-destructive-foreground">Hard</Badge>
                      <span>Expert level</span>
                    </div>
                  </SelectItem>
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
                max={100}
                min={5}
                step={5}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>5</span>
                <span>50</span>
                <span>100</span>
              </div>
            </div>

            {/* Question Types */}
            <div className="space-y-3">
            <label className="text-sm font-medium">Question Types</label>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="subjective_long"
                  checked={questionTypes.subjective_long}
                  onCheckedChange={(checked) =>
                    handleQuestionTypeChange("subjective_long", checked as boolean)
                  }
                />
                <label htmlFor="subjective_long" className="text-sm">
                  Subjective (Long Answer)
                </label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="subjective_short"
                  checked={questionTypes.subjective_short}
                  onCheckedChange={(checked) =>
                    handleQuestionTypeChange("subjective_short", checked as boolean)
                  }
                />
                <label htmlFor="subjective_short" className="text-sm">
                  Subjective (Short Answer)
                </label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="objective_single_choice"
                  checked={questionTypes.objective_single_choice}
                  onCheckedChange={(checked) =>
                    handleQuestionTypeChange("objective_single_choice", checked as boolean)
                  }
                />
                <label htmlFor="objective_single_choice" className="text-sm">
                  Objective (Single Choice)
                </label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="objective_multiple_choice"
                  checked={questionTypes.objective_multiple_choice}
                  onCheckedChange={(checked) =>
                    handleQuestionTypeChange("objective_multiple_choice", checked as boolean)
                  }
                />
                <label htmlFor="objective_multiple_choice" className="text-sm">
                  Objective (Multiple Choice)
                </label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="assertion"
                  checked={questionTypes.assertion}
                  onCheckedChange={(checked) =>
                    handleQuestionTypeChange("assertion", checked as boolean)
                  }
                />
                <label htmlFor="assertion" className="text-sm">
                  Assertion Type
                </label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="reasoning"
                  checked={questionTypes.reasoning}
                  onCheckedChange={(checked) =>
                    handleQuestionTypeChange("reasoning", checked as boolean)
                  }
                />
                <label htmlFor="reasoning" className="text-sm">
                  Reasoning Type
                </label>
              </div>
            </div>
          </div>
          </div>


          {/* Features Preview */}
          <Card className="bg-accent/50">
            <CardContent className="p-4">
              <h3 className="font-semibold mb-3 flex items-center">
                <BrainCircuit className="h-5 w-5 mr-2 text-primary" />
                AI-Powered Features Available
              </h3>
              <div className="grid md:grid-cols-2 gap-3">
                <div className="flex items-center space-x-2">
                  <Target className="h-4 w-4 text-success" />
                  <span className="text-sm">Smart Hints & Explanations</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-warning" />
                  <span className="text-sm">Similar Question Generation</span>
                </div>
                <div className="flex items-center space-x-2">
                  <BrainCircuit className="h-4 w-4 text-primary" />
                  <span className="text-sm">Concept Clarification</span>
                </div>
                <div className="flex items-center space-x-2">
                  <BookOpen className="h-4 w-4 text-secondary" />
                  <span className="text-sm">Interactive AI Chat Support</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Button 
            onClick={handleStart}
            className="w-full gradient-primary text-lg py-6"
            size="lg"
            disabled={!selectedBook || !selectedDifficulty}
          >
            <Play className="h-5 w-5 mr-2" />
            Start Practice Test
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default PracticeTestSetup;