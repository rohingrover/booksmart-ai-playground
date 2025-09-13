import { useState } from 'react';
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

interface PracticeTestSetupProps {
  onStartPractice: (settings: any) => void;
}

const PracticeTestSetup = ({ onStartPractice }: PracticeTestSetupProps) => {
  const [selectedBook, setSelectedBook] = useState('');
  const [selectedChapter, setSelectedChapter] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('');
  const [questionCount, setQuestionCount] = useState([10]);
  const [questionTypes, setQuestionTypes] = useState({
    multipleChoice: true,
    trueFalse: false,
    subjective: false
  });

  const books = [
    { id: 1, title: 'Mathematics Class 10', subject: 'Mathematics', board: 'CBSE', chapters: ['Algebra', 'Geometry', 'Trigonometry', 'Statistics', 'Probability'] },
    { id: 2, title: 'Science Class 9', subject: 'Science', board: 'NCERT', chapters: ['Physics', 'Chemistry', 'Biology', 'Environmental Science'] },
    { id: 3, title: 'English Literature', subject: 'English', board: 'ICSE', chapters: ['Poetry', 'Prose', 'Grammar', 'Writing Skills', 'Literature Analysis'] },
    { id: 4, title: 'History Class 8', subject: 'History', board: 'CBSE', chapters: ['Ancient India', 'Medieval Period', 'British Rule', 'Independence Movement'] }
  ];

  const handleStart = () => {
    if (!selectedBook || !selectedDifficulty) {
      alert('Please select a book and difficulty level');
      return;
    }

    const settings = {
      book: selectedBook,
      chapter: selectedChapter,
      difficulty: selectedDifficulty,
      questionCount: questionCount[0],
      questionTypes
    };

    onStartPractice(settings);
  };

  const handleQuestionTypeChange = (type: string, checked: boolean) => {
    setQuestionTypes(prev => ({
      ...prev,
      [type]: checked
    }));
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
              <Select value={selectedBook} onValueChange={setSelectedBook}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a book" />
                </SelectTrigger>
                <SelectContent className="bg-background z-50 border shadow-lg">
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
                    id="multipleChoice"
                    checked={questionTypes.multipleChoice}
                    onCheckedChange={(checked) => 
                      handleQuestionTypeChange('multipleChoice', checked as boolean)
                    }
                  />
                  <label htmlFor="multipleChoice" className="text-sm">Multiple Choice</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="trueFalse"
                    checked={questionTypes.trueFalse}
                    onCheckedChange={(checked) => 
                      handleQuestionTypeChange('trueFalse', checked as boolean)
                    }
                  />
                  <label htmlFor="trueFalse" className="text-sm">True/False</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="subjective"
                    checked={questionTypes.subjective}
                    onCheckedChange={(checked) => 
                      handleQuestionTypeChange('subjective', checked as boolean)
                    }
                  />
                  <label htmlFor="subjective" className="text-sm">Subjective</label>
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