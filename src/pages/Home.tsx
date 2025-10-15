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
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
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

      const bodyData = {
        page: page,
        per_page: pagination.per_page,
        keyword: '',
        board_id: '',
        subject_id: ''
      };

      if (searchQuery) bodyData.keyword = searchQuery;
      if (selectedBoard !== "all") bodyData.board_id = selectedBoard;
      if (selectedSubject !== "all") bodyData.subject_id = selectedSubject;

      const res = await fetch(`${API_BASE_URL}/api/books`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bodyData),
      });

      const data = await res.json();
      setBooks(data.items || []);
      setPagination(data.pagination || {});
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch books",
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
  // const handleStartLearning = async () => {
  //   setIsLoggingIn(true);

  //   // Show logging in toast
  //   toast({
  //     title: "Logging in...",
  //     description: "Please wait while we authenticate you.",
  //     duration: 1500
  //   });

  //   // Simulate login process
  //   setTimeout(() => {
  //     toast({
  //       title: "Login Successful!",
  //       description: "Welcome to Oswaal360. Redirecting to books...",
  //       duration: 1500
  //     });

  //     // Redirect to books page after success message
  //     setTimeout(() => {
  //       setIsLoggingIn(false);
  //       navigate('/books');
  //     }, 1500);
  //   }, 1500);
  // };

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
              Oswaal <span className="text-yellow-300 animate-glow">HybridEdge</span>
            </h1>
            <p className="text-2xl sm:text-3xl lg:text-4xl mb-8 font-semibold opacity-95">
              Where Print Meets Power.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Button size="lg" className="bg-white text-primary hover:bg-yellow-50 hover:shadow-glow font-bold px-10 py-4 text-lg transition-all duration-300 transform hover:scale-105" onClick={handleStartLearning} disabled={isLoggingIn}>
                <Zap className="mr-2 h-5 w-5" />
                {isLoggingIn ? "Logging in..." : "Start Your Hybrid Journey"}
              </Button>
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

      {/* What is Oswaal HybridEdge Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-card/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              💡 What is <span className="gradient-primary bg-clip-text text-transparent">Oswaal HybridEdge?</span>
            </h2>
            <div className="max-w-4xl mx-auto space-y-6 text-lg text-muted-foreground leading-relaxed">
              <p>
                Oswaal HybridEdge is the next big leap in learning innovation — an intelligent layer that connects the trusted world of Oswaal Books with the power of AI.
              </p>
              <p>
                It transforms every Oswaal book into a smart, interactive learning companion — giving students instant answers, personalized insights, and guided practice anytime, anywhere.
              </p>
              <p className="font-semibold text-foreground">
                With HybridEdge, Oswaal introduces a new era of Hybrid Learning, where print and technology work together to deliver one seamless, smarter learning experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Oswaal HybridEdge Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-subtle">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              🚀 Why <span className="gradient-primary bg-clip-text text-transparent">Oswaal HybridEdge?</span>
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="shadow-card hover:shadow-elegant transition-all duration-500 group hover:scale-105 bg-card/80 backdrop-blur-sm border-0">
              <CardContent className="p-8">
                <div className="text-4xl mb-4">📘</div>
                <h3 className="text-xl font-bold mb-4 text-foreground">Smarter Books. Smarter Learning.</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Every Oswaal book now comes alive with AI. Ask questions, get explanations, or practice exam-style problems — directly linked to your book content.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-card hover:shadow-elegant transition-all duration-500 group hover:scale-105 bg-card/80 backdrop-blur-sm border-0">
              <CardContent className="p-8">
                <div className="text-4xl mb-4">🧠</div>
                <h3 className="text-xl font-bold mb-4 text-foreground">Personalized Support, 24×7</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Students get tailor-made help whenever they need it — doubt-solving, revision guidance, and intelligent recommendations based on their progress.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-card hover:shadow-elegant transition-all duration-500 group hover:scale-105 bg-card/80 backdrop-blur-sm border-0">
              <CardContent className="p-8">
                <div className="text-4xl mb-4">💬</div>
                <h3 className="text-xl font-bold mb-4 text-foreground">Instant Answers. No Waiting.</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Powered by Oswaal's verified content and AI intelligence, HybridEdge delivers accurate, syllabus-aligned responses within seconds.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-card hover:shadow-elegant transition-all duration-500 group hover:scale-105 bg-card/80 backdrop-blur-sm border-0">
              <CardContent className="p-8">
                <div className="text-4xl mb-4">🔗</div>
                <h3 className="text-xl font-bold mb-4 text-foreground">Connected Ecosystem</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Seamlessly integrated with Oswaal360, HybridEdge bridges books, practice papers, and assessments, ensuring your learning journey never stops.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-card hover:shadow-elegant transition-all duration-500 group hover:scale-105 bg-card/80 backdrop-blur-sm border-0">
              <CardContent className="p-8">
                <div className="text-4xl mb-4">⚡</div>
                <h3 className="text-xl font-bold mb-4 text-foreground">Designed for Every Learner</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Whether you're a student, teacher, or parent — HybridEdge adapts to your learning style, making studying faster, simpler, and more engaging.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-card/50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              🔍 <span className="gradient-primary bg-clip-text text-transparent">How It Works</span>
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-2xl font-bold">
                1
              </div>
              <p className="text-muted-foreground">Scan the QR code inside your Oswaal Book.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center text-white text-2xl font-bold">
                2
              </div>
              <p className="text-muted-foreground">Ask your question — concept, formula, or topic.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold">
                3
              </div>
              <p className="text-muted-foreground">Get instant AI-powered answers, examples, and practice.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-white text-2xl font-bold">
                4
              </div>
              <p className="text-muted-foreground">Track your learning through your Oswaal360 dashboard.</p>
            </div>
          </div>
          
          <p className="text-center text-lg text-muted-foreground mt-12 max-w-3xl mx-auto">
            HybridEdge ensures that every page of your book becomes a gateway to smarter learning.
          </p>
        </div>
      </section>

      {/* The Oswaal Promise Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-subtle">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            🌟 The <span className="gradient-primary bg-clip-text text-transparent">Oswaal Promise</span>
          </h2>
          <div className="space-y-6 text-lg text-muted-foreground leading-relaxed mb-8">
            <p>
              For over 40 years, Oswaal Books has been synonymous with trust, quality, and excellence in education.
            </p>
            <p>
              Now, with Oswaal HybridEdge, we're taking that legacy into the future — giving learners the power of print and the intelligence of AI in one ecosystem.
            </p>
            <p className="text-2xl font-bold text-foreground">
              HybridEdge = Print + Practice + AI Intelligence
            </p>
          </div>
        </div>
      </section>

      {/* Experience the Future Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-card/50">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            🎯 Experience the <span className="gradient-primary bg-clip-text text-transparent">Future of Learning</span>
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join millions of learners stepping into a smarter world of education.
          </p>
          <p className="text-lg text-muted-foreground mb-8">
            With Oswaal HybridEdge, your books don't just teach — they think with you.
          </p>
          <p className="text-2xl font-bold text-foreground mb-12">
            👉 Explore. Learn. Evolve. With Oswaal HybridEdge.
          </p>
          <Button size="lg" className="bg-gradient-to-r from-primary to-primary-glow hover:shadow-glow text-white font-bold px-12 py-6 text-xl transition-all duration-300 transform hover:scale-105" onClick={handleStartLearning} disabled={isLoggingIn}>
            <Play className="mr-2 h-6 w-6" />
            {isLoggingIn ? "Logging in..." : "Start Your Hybrid Journey"}
          </Button>
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