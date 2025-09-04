import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  BookOpen, 
  Search,
  Filter,
  Star,
  MessageCircle,
  BrainCircuit,
  Trophy,
  Gamepad2,
  Sparkles,
  Zap,
  Target,
  Brain
} from 'lucide-react';
import { Link } from 'react-router-dom';

// Import book cover images
import mathBookCover from '@/assets/math-book-cover.jpg';
import scienceBookCover from '@/assets/science-book-cover.jpg';
import englishBookCover from '@/assets/english-book-cover.jpg';
import historyBookCover from '@/assets/history-book-cover.jpg';

const Books = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBoard, setSelectedBoard] = useState('all');
  const [selectedSubject, setSelectedSubject] = useState('all');

  const books = [
    {
      id: 1,
      title: 'Mathematics Class 10',
      subject: 'Mathematics',
      board: 'CBSE',
      class: '10',
      progress: 65,
      lastAccessed: '2 hours ago',
      image: mathBookCover,
      rating: 4.8,
      chapters: 15,
      difficulty: 'Medium',
      aiFeatures: ['Smart Questions', 'Concept Clarification', 'Problem Solving Assistant']
    },
    {
      id: 2,
      title: 'Science Class 9',
      subject: 'Science',
      board: 'NCERT',
      class: '9',
      progress: 42,
      lastAccessed: '1 day ago',
      image: scienceBookCover,
      rating: 4.6,
      chapters: 13,
      difficulty: 'Easy',
      aiFeatures: ['Experiment Simulation', 'Visual Learning', 'Interactive Quizzes']
    },
    {
      id: 3,
      title: 'English Literature',
      subject: 'English',
      board: 'ICSE',
      class: '11',
      progress: 78,
      lastAccessed: '3 days ago',
      image: englishBookCover,
      rating: 4.9,
      chapters: 12,
      difficulty: 'Hard',
      aiFeatures: ['Grammar Assistant', 'Essay Writing', 'Poetry Analysis']
    },
    {
      id: 4,
      title: 'History Class 8',
      subject: 'History',
      board: 'CBSE',
      class: '8',
      progress: 23,
      lastAccessed: '5 days ago',
      image: historyBookCover,
      rating: 4.4,
      chapters: 18,
      difficulty: 'Medium',
      aiFeatures: ['Timeline Explorer', 'Historical Context', 'Map Integration']
    }
  ];

  const filteredBooks = books.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         book.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBoard = selectedBoard === 'all' || book.board === selectedBoard;
    const matchesSubject = selectedSubject === 'all' || book.subject === selectedSubject;
    
    return matchesSearch && matchesBoard && matchesSubject;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'easy': return 'bg-success text-success-foreground';
      case 'medium': return 'bg-warning text-warning-foreground';
      case 'hard': return 'bg-destructive text-destructive-foreground';
      default: return 'bg-primary text-primary-foreground';
    }
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'gradient-primary';
    if (progress >= 50) return 'bg-warning';
    return 'bg-muted';
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="text-center space-y-6">
        <div className="space-y-4">
          <h1 className="text-5xl font-bold gradient-hero bg-clip-text text-transparent">
            Oswaal Books
          </h1>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center justify-center">
              <Brain className="h-8 w-8 mr-3 text-primary" />
              AI Learning Revolution
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Transform your Oswaal textbooks into interactive learning experiences with AI-generated questions, 
              instant feedback, timed quizzes, and concept clarification through our advanced AI chat system.
            </p>
          </div>
        </div>

        {/* AI Features Highlights */}
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <Card className="shadow-card border-primary/20">
            <CardContent className="p-6 text-center">
              <div className="gradient-primary p-3 rounded-full w-fit mx-auto mb-4">
                <Target className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Personalized Learning Paths</h3>
              <p className="text-sm text-muted-foreground">
                Our AI analyzes your learning patterns and creates customized study plans that adapt to your pace and understanding level.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-card border-success/20">
            <CardContent className="p-6 text-center">
              <div className="bg-success p-3 rounded-full w-fit mx-auto mb-4">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Instant Feedback & Support</h3>
              <p className="text-sm text-muted-foreground">
                Get immediate explanations, hints, and encouragement. Our AI tutor is available 24/7 to help you overcome learning challenges.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-card border-warning/20">
            <CardContent className="p-6 text-center">
              <div className="bg-warning p-3 rounded-full w-fit mx-auto mb-4">
                <Trophy className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Progress Tracking</h3>
              <p className="text-sm text-muted-foreground">
                Monitor your growth with detailed analytics, identifying strengths and areas for improvement in real-time.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Smart AI Tutor Banner */}
        <Card className="max-w-4xl mx-auto gradient-primary text-white">
          <CardContent className="p-8">
            <div className="flex items-center justify-center space-x-4 mb-4">
              <Sparkles className="h-12 w-12 animate-pulse" />
              <div className="text-center">
                <h3 className="text-3xl font-bold">Smart Oswaal AI Tutor</h3>
                <p className="text-lg opacity-90">
                  Powered by Advanced Machine Learning & Natural Language Processing
                </p>
              </div>
              <Brain className="h-12 w-12 animate-pulse" />
            </div>
            <p className="text-center text-lg opacity-90">
              Experience the future of learning with contextual understanding, adaptive questioning, 
              and intelligent content generation tailored to your Oswaal curriculum.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="shadow-card">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search books by title or subject..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={selectedBoard} onValueChange={setSelectedBoard}>
              <SelectTrigger className="md:w-48">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Select Board" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Boards</SelectItem>
                <SelectItem value="CBSE">CBSE</SelectItem>
                <SelectItem value="NCERT">NCERT</SelectItem>
                <SelectItem value="ICSE">ICSE</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={selectedSubject} onValueChange={setSelectedSubject}>
              <SelectTrigger className="md:w-48">
                <BookOpen className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Select Subject" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Subjects</SelectItem>
                <SelectItem value="Mathematics">Mathematics</SelectItem>
                <SelectItem value="Science">Science</SelectItem>
                <SelectItem value="English">English</SelectItem>
                <SelectItem value="History">History</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Books Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredBooks.map((book) => (
          <Card key={book.id} className="shadow-card hover:shadow-elegant transition-smooth group">
            <div className="relative overflow-hidden">
              <img 
                src={book.image} 
                alt={book.title}
                className="h-48 w-full object-cover group-hover:scale-105 transition-smooth"
              />
              <Badge className={`absolute top-2 left-2 ${getDifficultyColor(book.difficulty)}`}>
                {book.difficulty}
              </Badge>
              <Badge className="absolute top-2 right-2 bg-primary text-primary-foreground">
                {book.board}
              </Badge>
              <div className="absolute bottom-2 left-2 flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star 
                    key={star} 
                    className={`h-4 w-4 ${
                      star <= Math.floor(book.rating) 
                        ? 'text-warning fill-current' 
                        : 'text-muted-foreground'
                    }`} 
                  />
                ))}
                <span className="text-white text-sm ml-1 bg-black/50 px-1 rounded">
                  {book.rating}
                </span>
              </div>
            </div>
            
            <CardContent className="p-4 space-y-4">
              <div>
                <h3 className="font-bold text-lg group-hover:text-primary transition-smooth">
                  {book.title}
                </h3>
                <div className="flex justify-between items-center mt-1">
                  <p className="text-sm text-muted-foreground">Class {book.class} • {book.subject}</p>
                  <Badge variant="outline">{book.chapters} Chapters</Badge>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="font-medium">{book.progress}%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${getProgressColor(book.progress)} transition-smooth`}
                    style={{ width: `${book.progress}%` }}
                  />
                </div>
              </div>

              {/* AI Features */}
              <div className="space-y-2">
                <h4 className="text-sm font-semibold flex items-center">
                  <Sparkles className="h-4 w-4 mr-1 text-primary" />
                  AI Features
                </h4>
                <div className="flex flex-wrap gap-1">
                  {book.aiFeatures.slice(0, 2).map((feature, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {feature}
                    </Badge>
                  ))}
                  {book.aiFeatures.length > 2 && (
                    <Badge variant="secondary" className="text-xs">
                      +{book.aiFeatures.length - 2} more
                    </Badge>
                  )}
                </div>
              </div>
              
              <div className="text-xs text-muted-foreground">
                Last accessed: {book.lastAccessed}
              </div>
              
              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-2">
                <Link to={`/chat/${book.id}`}>
                  <Button className="w-full gradient-primary text-xs py-2">
                    <MessageCircle className="h-3 w-3 mr-1" />
                    AI Chat
                  </Button>
                </Link>
                <Link to={`/practice?book=${book.id}`}>
                  <Button variant="outline" className="w-full text-xs py-2">
                    <BrainCircuit className="h-3 w-3 mr-1" />
                    Practice
                  </Button>
                </Link>
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                <Link to={`/quiz?book=${book.id}`}>
                  <Button variant="outline" className="w-full text-xs py-2">
                    <Trophy className="h-3 w-3 mr-1" />
                    Quiz
                  </Button>
                </Link>
                <Link to={`/games?book=${book.id}`}>
                  <Button variant="outline" className="w-full text-xs py-2">
                    <Gamepad2 className="h-3 w-3 mr-1" />
                    Games
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredBooks.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-xl font-semibold mb-2">No books found</h3>
          <p className="text-muted-foreground">
            Try adjusting your search criteria or filters.
          </p>
        </div>
      )}
    </div>
  );
};

export default Books;