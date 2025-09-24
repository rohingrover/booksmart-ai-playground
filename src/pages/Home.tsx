import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { BookOpen, Search, Filter, Star, Users, Clock, Brain, Target, MessageSquare, Lightbulb, TrendingUp, Award, Zap, Play, CheckCircle, Globe, Smartphone, Gamepad2, BarChart3, Shield, Sparkles } from 'lucide-react';

// Import book cover images
import mathBookCover from '@/assets/math-book-cover.jpg';
import scienceBookCover from '@/assets/science-book-cover.jpg';
import englishBookCover from '@/assets/english-book-cover.jpg';
import historyBookCover from '@/assets/history-book-cover.jpg';
import defaultImageBook from '@/assets/oswaal360-logo-new.png';
import { useToast } from '@/hooks/use-toast';
import CourseExplorer from "./components/CourseExplorer";
const AI_API_BASE_URL = import.meta.env.VITE_AI_API_BASE_URL;
const Home = () => {
  const [books, setBooks] = useState<any[]>([]);
  const [pagination, setPagination] = useState({
    page: 1,
    per_page: 8,
    total: 0,
    pages: 0,
    has_next: false,
    has_prev: false
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [selectedBoard, setSelectedBoard] = useState('all');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const {
    toast
  } = useToast();
  const navigate = useNavigate();

  // Fetch books API with search + filters
  const fetchBooks = async (page = 1) => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: String(page),
        per_page: String(pagination.per_page)
      });
      if (searchQuery) params.append("keyword", searchQuery);
      if (selectedBoard !== "all") params.append("board_id", selectedBoard);
      if (selectedSubject !== "all") params.append("subject_id", selectedSubject);
      console.log(params.toString());
      const res = await fetch(`${AI_API_BASE_URL}/books/?${params.toString()}`);
      const data = await res.json();
      setBooks(data.items || []);
      setPagination(data.pagination || {});
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch books"
      });
    } finally {
      setLoading(false);
    }
  };

  // Re-fetch when pagination, search, or filters change
  useEffect(() => {
    fetchBooks(pagination.page);
  }, [pagination.page, searchQuery, selectedBoard, selectedSubject]);
  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= pagination.pages) {
      setPagination(prev => ({
        ...prev,
        page: newPage
      }));
    }
  };
  const handleStartLearning = async () => {
    setIsLoggingIn(true);

    // Show logging in toast
    toast({
      title: "Logging in...",
      description: "Please wait while we authenticate you.",
      duration: 1500
    });

    // Simulate login process
    setTimeout(() => {
      toast({
        title: "Login Successful!",
        description: "Welcome to Oswaal360. Redirecting to books...",
        duration: 1500
      });

      // Redirect to books page after success message
      setTimeout(() => {
        setIsLoggingIn(false);
        navigate('/books');
      }, 1500);
    }, 1500);
  };
  const aiFeatures = [{
    icon: Brain,
    title: "Smart AI Tutor",
    description: "Get personalized explanations and step-by-step solutions tailored to your learning style.",
    gradient: "from-blue-500 to-blue-600"
  }, {
    icon: Target,
    title: "Personalized Learning Paths",
    description: "Our AI analyzes your learning patterns and creates customized study plans that adapt to your pace.",
    gradient: "from-emerald-500 to-emerald-600"
  }, {
    icon: MessageSquare,
    title: "Instant Feedback & Support",
    description: "Get immediate explanations, hints, and encouragement. Available 24/7 to overcome learning challenges.",
    gradient: "from-purple-500 to-purple-600"
  }, {
    icon: TrendingUp,
    title: "Progress Tracking",
    description: "Monitor growth with detailed analytics, identifying strengths and areas for improvement in real-time.",
    gradient: "from-orange-500 to-orange-600"
  }];
  const platformFeatures = [{
    icon: Globe,
    title: "Multi-Platform Access",
    description: "Access your learning materials anywhere, anytime across all devices with seamless synchronization."
  }, {
    icon: Smartphone,
    title: "Mobile Optimized",
    description: "Fully responsive design ensures perfect learning experience on phones, tablets, and desktops."
  }, {
    icon: Gamepad2,
    title: "Gamified Learning",
    description: "Earn points, unlock achievements, and compete with friends to make studying fun and engaging."
  }, {
    icon: BarChart3,
    title: "Detailed Analytics",
    description: "Track your progress with comprehensive reports, performance insights, and improvement suggestions."
  }, {
    icon: Shield,
    title: "Secure & Private",
    description: "Your data is protected with enterprise-grade security and privacy measures you can trust."
  }, {
    icon: Sparkles,
    title: "AI-Generated Content",
    description: "Get unlimited practice questions, quizzes, and explanations generated by advanced AI technology."
  }];
  return <div className="min-h-screen bg-gradient-subtle">
      {/* Hero Section */}
      <section className="relative gradient-hero text-white py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent"></div>
        <div className="relative max-w-7xl mx-auto text-center">
          <div className="animate-slide-up">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 leading-tight">
              Oswaal Books <span className="text-yellow-300 animate-glow">AI Oswaal Learning Test</span>
            </h1>
            <p className="text-xl sm:text-2xl lg:text-3xl mb-8 max-w-5xl mx-auto opacity-95 leading-relaxed">
              Transform your Oswaal textbooks into <span className="font-semibold text-blue-200">interactive learning experiences</span> with 
              AI-generated questions, instant feedback, timed quizzes, and concept clarification through AI chat. Test
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Button size="lg" className="bg-white text-primary hover:bg-yellow-50 hover:shadow-glow font-bold px-10 py-4 text-lg transition-all duration-300 transform hover:scale-105" onClick={handleStartLearning} disabled={isLoggingIn}>
                <Zap className="mr-2 h-5 w-5" />
                {isLoggingIn ? "Logging in..." : "Start Learning Now"}
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
        <div className="absolute top-40 right-20 animate-float" style={{
        animationDelay: '1s'
      }}>
          <Target className="h-6 w-6 text-yellow-200 opacity-60" />
        </div>
        <div className="absolute bottom-20 left-20 animate-float" style={{
        animationDelay: '2s'
      }}>
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
          
          {/* Main AI Features - Simplified */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16 max-w-4xl mx-auto">
            <Card className="shadow-card hover:shadow-elegant transition-all duration-500 text-center group hover:scale-105 bg-card/80 backdrop-blur-sm border-0 overflow-hidden">
              <CardContent className="p-8 relative">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg group-hover:animate-bounce-subtle">
                  <Brain className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-foreground group-hover:text-primary transition-colors">Smart AI Tutor</h3>
                <p className="text-muted-foreground leading-relaxed">Get personalized explanations and step-by-step solutions tailored to your learning style with 24/7 AI support.</p>
              </CardContent>
            </Card>

            <Card className="shadow-card hover:shadow-elegant transition-all duration-500 text-center group hover:scale-105 bg-card/80 backdrop-blur-sm border-0 overflow-hidden">
              <CardContent className="p-8 relative">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center shadow-lg group-hover:animate-bounce-subtle">
                  <Target className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-foreground group-hover:text-primary transition-colors">Personalized Learning</h3>
                <p className="text-muted-foreground leading-relaxed">Our AI analyzes your learning patterns and creates customized study plans with progress tracking and analytics.</p>
              </CardContent>
            </Card>
          </div>
          
          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="p-6 rounded-xl bg-card/30 backdrop-blur-sm">
              <div className="text-3xl font-bold text-primary mb-2">50K+</div>
              <div className="text-sm text-muted-foreground">Active Students</div>
            </div>
            <div className="p-6 rounded-xl bg-card/30 backdrop-blur-sm">
              <div className="text-3xl font-bold text-secondary mb-2">1M+</div>
              <div className="text-sm text-muted-foreground">Questions Solved</div>
            </div>
            <div className="p-6 rounded-xl bg-card/30 backdrop-blur-sm">
              <div className="text-3xl font-bold text-success mb-2">95%</div>
              <div className="text-sm text-muted-foreground">Success Rate</div>
            </div>
            <div className="p-6 rounded-xl bg-card/30 backdrop-blur-sm">
              <div className="text-3xl font-bold text-warning mb-2">24/7</div>
              <div className="text-sm text-muted-foreground">AI Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Books Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-card/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold flex items-center justify-center gap-3">
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
              <Input placeholder="Search books by title or subject..." value={searchQuery} onChange={e => {
              setSearchQuery(e.target.value);
              handlePageChange(1);
            }} className="pl-10" />
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <CourseExplorer onBoardChange={id => {
              setSearchQuery('');
              setSelectedBoard(id);
              setSelectedSubject("all"); // reset subject if board changes
              handlePageChange(1);
            }} onSubjectChange={id => {
              setSearchQuery('');
              setSelectedSubject(id);
              handlePageChange(1);
            }} />
            </div>
          </div>

          {/* Books Grid */}
          {loading ? <p className="text-center">Loading...</p> : <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {books.map((book, index) => <Card key={book.id} className="shadow-card hover:shadow-elegant transition-smooth group cursor-pointer overflow-hidden" onClick={handleStartLearning}>

                  <div className="relative overflow-hidden">
                    {/* Colorful Header with Class Number */}
                    <div className={`h-32 relative flex items-center justify-center text-white
                      ${index % 2 === 0 ? "bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-500" : "bg-gradient-to-br from-pink-500 via-red-500 to-yellow-500"}`}>
                      <div className="text-center">
                        <div className="text-4xl font-bold mb-1">
                          {book.grade}
                        </div>
                        <div className="text-xs opacity-90 uppercase tracking-wider">
                          {book.grade}
                        </div>
                      </div>
                      <Badge className="absolute top-3 right-3 bg-white/20 text-white border-white/30">
                        {book.board_name}
                      </Badge>
                      {/* Decorative elements */}
                      <div className="absolute top-4 left-4 w-8 h-8 border-2 border-white/30 rounded rotate-45"></div>
                      <div className="absolute bottom-4 right-4 w-6 h-6 bg-white/20 rounded-full"></div>
                      <div className="absolute bottom-6 left-6 w-4 h-4 border-2 border-white/40 rounded-full"></div>
                    </div>
                    
                    {/* Book Image */}
                    <div className="absolute top-20 left-1/2 transform -translate-x-1/2 rounded-lg overflow-hidden border-4 border-white shadow-lg">
                      <img src={book.book_image || defaultImageBook} alt={book.title} className="w-full h-full object-cover group-hover:scale-105 transition-smooth" />
                    </div>
                  </div>

                  <CardContent className="p-6 space-y-4">
                    <div className="text-center">
                      <h3 className="font-bold text-lg text-foreground group-hover:text-primary transition-smooth mb-1">
                        {book.title}
                      </h3>
                      <p className="text-sm text-muted-foreground font-medium">{book.subject_name}</p>
                    </div>
                    
                    <p className="text-xs text-muted-foreground line-clamp-3 leading-relaxed text-center">{book.description}</p>
                    
                    <div className="flex items-center justify-center gap-6 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <BookOpen className="h-4 w-4" />
                        {book.chapters_count} chapters
                      </span>
                    </div>
                    
                    <div className="text-center">
                      <Badge variant="outline" className="text-xs mb-4">
                        {book.questions_count} exercises
                      </Badge>
                    </div>
                    <Button className="w-full bg-gradient-to-r from-primary to-primary-glow hover:shadow-lg text-white font-semibold py-3 rounded-xl transition-all duration-300 hover:scale-105" disabled={isLoggingIn}>
                      <Play className="mr-2 h-4 w-4" />
                      {isLoggingIn ? "Logging in..." : "Start Learning"}
                    </Button>
                  </CardContent>
                </Card>)}
            </div>}

          {/* Pagination */}
          <div className="flex justify-center items-center gap-4 mt-10">
            <Button variant="outline" disabled={!pagination.has_prev} onClick={() => handlePageChange(pagination.page - 1)}>
              Previous
            </Button>

            <span>
              Page {pagination.page} of {pagination.pages}
            </span>

            <Button variant="outline" disabled={!pagination.has_next} onClick={() => handlePageChange(pagination.page + 1)}>
              Next
            </Button>
          </div>
        </div>
      </section>
    </div>;
};
export default Home;