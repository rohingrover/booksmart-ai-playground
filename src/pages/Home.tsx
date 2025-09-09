import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  BookOpen, 
  Search, 
  Filter,
  Star,
  Users,
  Clock,
  Brain,
  Target,
  MessageSquare,
  Lightbulb,
  TrendingUp,
  Award,
  Zap
} from 'lucide-react';

// Import book cover images
import mathBookCover from '@/assets/math-book-cover.jpg';
import scienceBookCover from '@/assets/science-book-cover.jpg';
import englishBookCover from '@/assets/english-book-cover.jpg';
import historyBookCover from '@/assets/history-book-cover.jpg';
import { useToast } from '@/hooks/use-toast';

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [selectedBoard, setSelectedBoard] = useState('all');
  const { toast } = useToast();

  const books = [
    {
      id: 1,
      title: 'Mathematics Class 10',
      subject: 'Mathematics',
      board: 'CBSE',
      description: 'Comprehensive mathematics curriculum covering algebra, geometry, trigonometry, and statistics with AI-powered practice questions.',
      image: mathBookCover,
      chapters: 15,
      exercises: 180,
      rating: 4.8,
      students: 12500
    },
    {
      id: 2,
      title: 'Science Class 9',
      subject: 'Science',
      board: 'NCERT',
      description: 'Interactive science learning with physics, chemistry, and biology concepts explained through AI tutoring and virtual experiments.',
      image: scienceBookCover,
      chapters: 12,
      exercises: 145,
      rating: 4.7,
      students: 9800
    },
    {
      id: 3,
      title: 'English Literature',
      subject: 'English',
      board: 'ICSE',
      description: 'Enhance language skills with AI-assisted grammar correction, vocabulary building, and literature analysis tools.',
      image: englishBookCover,
      chapters: 10,
      exercises: 95,
      rating: 4.6,
      students: 7200
    },
    {
      id: 4,
      title: 'History Class 8',
      subject: 'History',
      board: 'CBSE',
      description: 'Explore historical events with interactive timelines, AI-generated quizzes, and immersive storytelling experiences.',
      image: historyBookCover,
      chapters: 8,
      exercises: 75,
      rating: 4.5,
      students: 6500
    }
  ];

  const subjects = ['all', 'Mathematics', 'Science', 'English', 'History'];
  const boards = ['all', 'CBSE', 'NCERT', 'ICSE'];

  const filteredBooks = books.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         book.subject.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSubject = selectedSubject === 'all' || book.subject === selectedSubject;
    const matchesBoard = selectedBoard === 'all' || book.board === selectedBoard;
    
    return matchesSearch && matchesSubject && matchesBoard;
  });

  const handleBookClick = () => {
    toast({
      title: "Login Required",
      description: "Please login to access the book content and start learning.",
      variant: "default"
    });
  };

  const aiFeatures = [
    {
      icon: Brain,
      title: "Smart AI Tutor",
      description: "Get personalized explanations and step-by-step solutions tailored to your learning style.",
      color: "text-blue-600"
    },
    {
      icon: Target,
      title: "Personalized Learning Paths",
      description: "Our AI analyzes your learning patterns and creates customized study plans that adapt to your pace.",
      color: "text-green-600"
    },
    {
      icon: MessageSquare,
      title: "Instant Feedback & Support", 
      description: "Get immediate explanations, hints, and encouragement. Available 24/7 to overcome learning challenges.",
      color: "text-purple-600"
    },
    {
      icon: TrendingUp,
      title: "Progress Tracking",
      description: "Monitor growth with detailed analytics, identifying strengths and areas for improvement in real-time.",
      color: "text-orange-600"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Hero Section */}
      <section className="relative gradient-hero text-white py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent"></div>
        <div className="relative max-w-7xl mx-auto text-center">
          <div className="animate-slide-up">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 leading-tight">
              Oswaal Books <span className="text-yellow-300 animate-glow">AI Learning</span>
            </h1>
            <p className="text-xl sm:text-2xl lg:text-3xl mb-8 max-w-5xl mx-auto opacity-95 leading-relaxed">
              Transform your Oswaal textbooks into <span className="font-semibold text-blue-200">interactive learning experiences</span> with 
              AI-generated questions, instant feedback, timed quizzes, and concept clarification through AI chat.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Button 
                size="lg" 
                className="bg-white text-primary hover:bg-yellow-50 hover:shadow-glow font-bold px-10 py-4 text-lg transition-all duration-300 transform hover:scale-105"
                onClick={handleBookClick}
              >
                <Zap className="mr-2 h-5 w-5" />
                Start Learning Now
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="border-2 border-white text-white bg-white/10 hover:bg-white hover:text-primary font-semibold px-8 py-4 text-lg backdrop-blur-sm"
                onClick={handleBookClick}
              >
                <BookOpen className="mr-2 h-5 w-5" />
                Explore Books
              </Button>
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold mb-2">50K+</div>
                <div className="text-sm opacity-80">Active Students</div>
              </div>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold mb-2">1M+</div>
                <div className="text-sm opacity-80">Questions Solved</div>
              </div>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold mb-2">95%</div>
                <div className="text-sm opacity-80">Success Rate</div>
              </div>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold mb-2">24/7</div>
                <div className="text-sm opacity-80">AI Support</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 animate-float">
          <Brain className="h-8 w-8 text-blue-200 opacity-60" />
        </div>
        <div className="absolute top-40 right-20 animate-float" style={{ animationDelay: '1s' }}>
          <Target className="h-6 w-6 text-yellow-200 opacity-60" />
        </div>
        <div className="absolute bottom-20 left-20 animate-float" style={{ animationDelay: '2s' }}>
          <Lightbulb className="h-7 w-7 text-green-200 opacity-60" />
        </div>
      </section>

      {/* AI Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-subtle">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Powered by <span className="gradient-primary bg-clip-text text-transparent">Advanced AI Technology</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Experience the future of education with our intelligent learning platform that adapts to every student's unique learning journey
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {aiFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="shadow-card hover:shadow-elegant transition-all duration-500 text-center group hover:scale-105 bg-card/80 backdrop-blur-sm border-0">
                  <CardContent className="p-8">
                    <div className={`w-20 h-20 mx-auto mb-6 rounded-full gradient-primary flex items-center justify-center shadow-glow group-hover:animate-bounce-subtle`}>
                      <Icon className={`h-10 w-10 text-white`} />
                    </div>
                    <h3 className="text-xl font-bold mb-4 text-foreground group-hover:text-primary transition-colors">{feature.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
          
          {/* Additional Features Grid */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-xl bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all duration-300">
              <Award className="h-12 w-12 text-warning mx-auto mb-4" />
              <h4 className="text-lg font-semibold mb-2">Achievement System</h4>
              <p className="text-muted-foreground text-sm">Earn badges, unlock levels, and track milestones as you progress through your learning journey.</p>
            </div>
            <div className="text-center p-6 rounded-xl bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all duration-300">
              <Users className="h-12 w-12 text-success mx-auto mb-4" />
              <h4 className="text-lg font-semibold mb-2">Peer Learning</h4>
              <p className="text-muted-foreground text-sm">Connect with classmates, join study groups, and learn together in collaborative environments.</p>
            </div>
            <div className="text-center p-6 rounded-xl bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all duration-300">
              <Clock className="h-12 w-12 text-primary mx-auto mb-4" />
              <h4 className="text-lg font-semibold mb-2">Adaptive Scheduling</h4>
              <p className="text-muted-foreground text-sm">Smart study schedules that adapt to your availability and optimize learning retention.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Books Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-card/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4 flex items-center justify-center gap-3">
              <BookOpen className="h-8 w-8 text-primary" />
              Explore Our Interactive Books
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Browse our collection of AI-enhanced textbooks designed for modern learning
            </p>
          </div>

          {/* Search and Filters */}
          <div className="mb-8 space-y-4 lg:space-y-0 lg:flex lg:items-center lg:gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search books by title or subject..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="px-3 py-2 border rounded-md bg-background text-foreground focus:ring-2 focus:ring-primary min-w-[120px]"
              >
                {subjects.map(subject => (
                  <option key={subject} value={subject}>
                    {subject === 'all' ? 'All Subjects' : subject}
                  </option>
                ))}
              </select>
              
              <select
                value={selectedBoard}
                onChange={(e) => setSelectedBoard(e.target.value)}
                className="px-3 py-2 border rounded-md bg-background text-foreground focus:ring-2 focus:ring-primary min-w-[120px]"
              >
                {boards.map(board => (
                  <option key={board} value={board}>
                    {board === 'all' ? 'All Boards' : board}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Books Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredBooks.map((book) => (
              <Card key={book.id} className="shadow-card hover:shadow-elegant transition-smooth group cursor-pointer" onClick={handleBookClick}>
                <div className="relative overflow-hidden">
                  <img 
                    src={book.image} 
                    alt={book.title}
                    className="h-48 w-full object-cover group-hover:scale-105 transition-smooth"
                  />
                  <Badge className="absolute top-2 right-2 bg-primary text-primary-foreground">
                    {book.board}
                  </Badge>
                </div>
                
                <CardContent className="p-4 space-y-3">
                  <div>
                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-smooth line-clamp-2">
                      {book.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">{book.subject}</p>
                  </div>
                  
                  <p className="text-xs text-muted-foreground line-clamp-3 leading-relaxed">
                    {book.description}
                  </p>
                  
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <BookOpen className="h-3 w-3" />
                      {book.chapters} chapters
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      {book.students.toLocaleString()}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center pt-2">
                    <Badge variant="outline" className="text-xs">
                      {book.exercises} exercises
                    </Badge>
                  </div>
                  
                  <Button className="w-full gradient-primary mt-3 text-sm">
                    Start Learning
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredBooks.length === 0 && (
            <div className="text-center py-12">
              <BookOpen className="h-16 w-16 text-muted mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">No books found</h3>
              <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;