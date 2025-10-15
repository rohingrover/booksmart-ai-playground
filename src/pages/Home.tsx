import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { BookOpen, Search, Filter, Star, Users, Clock, Brain, Target, MessageSquare, Lightbulb, TrendingUp, Award, Zap, Play, CheckCircle, Globe, Smartphone, Gamepad2, BarChart3, Shield, Sparkles, ArrowRight, BookMarked, GraduationCap, Rocket, Star as StarIcon, ChevronRight, Sparkle, BookCheck, Users2, Timer, Trophy, Crown, Infinity } from 'lucide-react';

// Import book cover images
import mathBookCover from '@/assets/math-book-cover.jpg';
import scienceBookCover from '@/assets/science-book-cover.jpg';
import englishBookCover from '@/assets/english-book-cover.jpg';
import historyBookCover from '@/assets/history-book-cover.jpg';
import defaultImageBook from '@/assets/oswaal360-logo-new.png';

// Import banner images
import heroHybridLearning from '@/assets/hero-hybrid-learning.jpg';
import aiFeaturesBanner from '@/assets/ai-features-banner.jpg';
import futureLearningBanner from '@/assets/future-learning-banner.jpg';
import howItWorksBanner from '@/assets/how-it-works-banner.jpg';

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
  return <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white">
        {/* Animated Vector Background Elements */}
        <div className="absolute inset-0">
          {/* Large curved shapes */}
          <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-full opacity-60 animate-float-slow"></div>
          <div className="absolute top-20 right-0 w-80 h-80 bg-gradient-to-bl from-pink-50 to-rose-50 rounded-full opacity-50 animate-float-slow" style={{animationDelay: '1s'}}></div>
          
          {/* Animated geometric shapes */}
          <div className="absolute top-32 left-20 w-16 h-16 border-4 border-brand-primary rounded-full animate-pulse-slow"></div>
          <div className="absolute top-40 right-32 w-12 h-12 bg-brand-secondary transform rotate-45 animate-rotate-slow"></div>
          <div className="absolute bottom-40 left-32 w-20 h-20 border-4 border-brand-secondary rounded-full animate-bounce-gentle"></div>
          <div className="absolute bottom-32 right-20 w-14 h-14 bg-brand-primary transform rotate-12 animate-pulse-slow" style={{animationDelay: '2s'}}></div>
          
          {/* Floating circles */}
          <div className="absolute top-1/4 left-1/4 w-8 h-8 bg-yellow-200 rounded-full animate-bounce-gentle"></div>
          <div className="absolute top-1/3 right-1/3 w-6 h-6 bg-green-200 rounded-full animate-float-slow"></div>
          <div className="absolute bottom-1/3 left-1/3 w-10 h-10 bg-purple-200 rounded-full animate-pulse-slow"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="space-y-6">
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-gray-900 leading-tight">
                  Oswaal <span className="text-brand-primary">HybridEdge</span>
                </h1>
                
                <p className="text-2xl text-brand-secondary font-semibold leading-relaxed max-w-2xl">
              Where Print Meets Power.
            </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="group bg-brand-primary hover:bg-brand-primary/90 text-white font-bold px-8 py-4 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105" 
                  onClick={handleStartLearning} 
                  disabled={isLoggingIn}
                >
                  <Rocket className="mr-3 h-5 w-5 group-hover:animate-bounce" />
                  {isLoggingIn ? "Logging in..." : "Start Your Hybrid Journey →"}
                  <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-2 border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white font-semibold px-8 py-4 text-lg rounded-xl transition-all duration-300"
                >
                  <Play className="mr-2 h-5 w-5" />
                  Watch Demo
              </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-brand-primary mb-1">40+</div>
                  <div className="text-gray-600 text-sm">Years of Excellence</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-brand-secondary mb-1">10M+</div>
                  <div className="text-gray-600 text-sm">Students Served</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-brand-primary mb-1">500+</div>
                  <div className="text-gray-600 text-sm">Books Available</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-brand-secondary mb-1">24/7</div>
                  <div className="text-gray-600 text-sm">AI Support</div>
                </div>
              </div>
            </div>

            {/* Right Content - Visual Elements */}
            <div className="relative">
              <div className="relative w-full h-96 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-3xl overflow-hidden">
                {/* Main visual content */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-32 h-32 bg-brand-primary rounded-2xl flex items-center justify-center shadow-2xl animate-bounce-gentle">
                    <BookOpen className="w-16 h-16 text-white" />
                  </div>
                </div>
                
                {/* Floating elements around the main visual */}
                <div className="absolute top-8 left-8 w-12 h-12 bg-yellow-200 rounded-full animate-float-slow"></div>
                <div className="absolute top-12 right-12 w-8 h-8 bg-brand-secondary rounded-full animate-pulse-slow"></div>
                <div className="absolute bottom-8 left-12 w-10 h-10 bg-green-200 rounded-full animate-bounce-gentle"></div>
                <div className="absolute bottom-12 right-8 w-6 h-6 bg-purple-200 rounded-full animate-float-slow"></div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-brand-primary rounded-full flex justify-center">
            <div className="w-1 h-3 bg-brand-primary rounded-full mt-2 animate-pulse"></div>
        </div>
        </div>
      </section>

      {/* What is Oswaal HybridEdge Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 right-20 w-64 h-64 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-full opacity-40 animate-float-slow"></div>
          <div className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-tr from-pink-50 to-rose-50 rounded-full opacity-30 animate-float-slow" style={{animationDelay: '2s'}}></div>
          
          {/* Floating geometric shapes */}
          <div className="absolute top-32 right-32 w-16 h-16 border-4 border-brand-primary rounded-full animate-pulse-slow"></div>
          <div className="absolute bottom-32 left-32 w-12 h-12 bg-brand-secondary transform rotate-45 animate-rotate-slow"></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-brand-primary rounded-2xl mb-8 shadow-xl">
              <Lightbulb className="w-10 h-10 text-white" />
            </div>
            
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 mb-8 leading-tight">
              What is <span className="text-brand-primary">Oswaal HybridEdge?</span>
            </h2>
            
            <div className="max-w-5xl mx-auto space-y-8 text-xl text-gray-600 leading-relaxed">
              <p className="text-2xl font-semibold text-gray-800">
                Oswaal HybridEdge is the next big leap in learning innovation — an intelligent layer that connects the trusted world of Oswaal Books with the power of AI.
              </p>
              <p>
                It transforms every Oswaal book into a smart, interactive learning companion — giving students instant answers, personalized insights, and guided practice anytime, anywhere.
              </p>
              <p>
                With HybridEdge, Oswaal introduces a new era of Hybrid Learning, where print and technology work together to deliver one seamless, smarter learning experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Oswaal HybridEdge Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 right-20 w-64 h-64 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-full opacity-30 animate-float-slow"></div>
          <div className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-tr from-pink-50 to-rose-50 rounded-full opacity-20 animate-float-slow" style={{animationDelay: '2s'}}></div>
          
          {/* Floating geometric shapes */}
          <div className="absolute top-32 right-32 w-16 h-16 border-4 border-brand-secondary rounded-full animate-pulse-slow"></div>
          <div className="absolute bottom-32 left-32 w-12 h-12 bg-brand-primary transform rotate-45 animate-rotate-slow"></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-brand-secondary rounded-2xl mb-8 shadow-xl">
              <Rocket className="w-10 h-10 text-white" />
            </div>
            
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 mb-8 leading-tight">
              Why <span className="text-brand-secondary">Oswaal HybridEdge?</span>
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {/* Feature Card 1 */}
            <Card className="group relative overflow-hidden bg-white border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-2">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-brand-primary rounded-full flex items-center justify-center mr-4 shadow-lg">
                    <span className="text-white font-bold text-lg">1</span>
                  </div>
                  <div className="w-16 h-16 bg-brand-primary rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <BookOpen className="w-8 h-8 text-white" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">Smarter Books. Smarter Learning.</h3>
                <p className="text-gray-600 leading-relaxed">
                  Every Oswaal book now comes alive with AI. Ask questions, get explanations, or practice exam-style problems — directly linked to your book content.
                </p>
              </CardContent>
            </Card>

            {/* Feature Card 2 */}
            <Card className="group relative overflow-hidden bg-white border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-2">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-brand-secondary rounded-full flex items-center justify-center mr-4 shadow-lg">
                    <span className="text-white font-bold text-lg">2</span>
                  </div>
                  <div className="w-16 h-16 bg-brand-secondary rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Brain className="w-8 h-8 text-white" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">Personalized Support, 24×7</h3>
                <p className="text-gray-600 leading-relaxed">
                  Students get tailor-made help whenever they need it — doubt-solving, revision guidance, and intelligent recommendations based on their progress.
                </p>
              </CardContent>
            </Card>

            {/* Feature Card 3 */}
            <Card className="group relative overflow-hidden bg-white border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-2">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-brand-primary rounded-full flex items-center justify-center mr-4 shadow-lg">
                    <span className="text-white font-bold text-lg">3</span>
                  </div>
                  <div className="w-16 h-16 bg-brand-primary rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <MessageSquare className="w-8 h-8 text-white" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">Instant Answers. No Waiting.</h3>
                <p className="text-gray-600 leading-relaxed">
                  Powered by Oswaal's verified content and AI intelligence, HybridEdge delivers accurate, syllabus-aligned responses within seconds.
                </p>
              </CardContent>
            </Card>

            {/* Feature Card 4 */}
            <Card className="group relative overflow-hidden bg-white border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-2">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-brand-secondary rounded-full flex items-center justify-center mr-4 shadow-lg">
                    <span className="text-white font-bold text-lg">4</span>
                  </div>
                  <div className="w-16 h-16 bg-brand-secondary rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Globe className="w-8 h-8 text-white" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">Connected Ecosystem</h3>
                <p className="text-gray-600 leading-relaxed">
                  Seamlessly integrated with Oswaal360, HybridEdge bridges books, practice papers, and assessments, ensuring your learning journey never stops.
                </p>
              </CardContent>
            </Card>

            {/* Feature Card 5 */}
            <Card className="group relative overflow-hidden bg-white border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-2">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-brand-primary rounded-full flex items-center justify-center mr-4 shadow-lg">
                    <span className="text-white font-bold text-lg">5</span>
                  </div>
                  <div className="w-16 h-16 bg-brand-primary rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Zap className="w-8 h-8 text-white" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">Designed for Every Learner</h3>
                <p className="text-gray-600 leading-relaxed">
                  Whether you're a student, teacher, or parent — HybridEdge adapts to your learning style, making studying faster, simpler, and more engaging.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 right-20 w-64 h-64 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-full opacity-30 animate-float-slow"></div>
          <div className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-tr from-pink-50 to-rose-50 rounded-full opacity-20 animate-float-slow" style={{animationDelay: '2s'}}></div>
          
          {/* Floating geometric shapes */}
          <div className="absolute top-32 right-32 w-16 h-16 border-4 border-brand-primary rounded-full animate-pulse-slow"></div>
          <div className="absolute bottom-32 left-32 w-12 h-12 bg-brand-secondary transform rotate-45 animate-rotate-slow"></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-brand-primary rounded-2xl mb-8 shadow-xl">
              <Target className="w-10 h-10 text-white" />
            </div>
            
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 mb-8 leading-tight">
              How <span className="text-brand-primary">It Works</span>
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {/* Step 1 */}
            <div className="group text-center relative">
              <div className="relative mb-8">
                <div className="w-24 h-24 mx-auto bg-brand-primary rounded-3xl flex items-center justify-center text-white text-3xl font-black shadow-2xl group-hover:scale-110 transition-transform duration-300">
                  1
                </div>
                <div className="absolute -inset-2 bg-brand-primary rounded-3xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Scan the QR code inside your Oswaal Book.</h3>
            </div>
            
            {/* Step 2 */}
            <div className="group text-center relative">
              <div className="relative mb-8">
                <div className="w-24 h-24 mx-auto bg-brand-secondary rounded-3xl flex items-center justify-center text-white text-3xl font-black shadow-2xl group-hover:scale-110 transition-transform duration-300">
                  2
                </div>
                <div className="absolute -inset-2 bg-brand-secondary rounded-3xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Ask your question — concept, formula, or topic.</h3>
            </div>
            
            {/* Step 3 */}
            <div className="group text-center relative">
              <div className="relative mb-8">
                <div className="w-24 h-24 mx-auto bg-brand-primary rounded-3xl flex items-center justify-center text-white text-3xl font-black shadow-2xl group-hover:scale-110 transition-transform duration-300">
                  3
                </div>
                <div className="absolute -inset-2 bg-brand-primary rounded-3xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Get instant AI-powered answers, examples, and practice.</h3>
            </div>
            
            {/* Step 4 */}
            <div className="group text-center relative">
              <div className="relative mb-8">
                <div className="w-24 h-24 mx-auto bg-brand-secondary rounded-3xl flex items-center justify-center text-white text-3xl font-black shadow-2xl group-hover:scale-110 transition-transform duration-300">
                  4
                </div>
                <div className="absolute -inset-2 bg-brand-secondary rounded-3xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Track your learning through your Oswaal360 dashboard.</h3>
            </div>
          </div>
          
          <div className="text-center mt-16">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-8 rounded-3xl border border-blue-100 max-w-4xl mx-auto">
              <p className="text-lg text-gray-600">
            HybridEdge ensures that every page of your book becomes a gateway to smarter learning.
          </p>
            </div>
          </div>
        </div>
      </section>

      {/* The Oswaal Promise Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 right-20 w-64 h-64 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-full opacity-30 animate-float-slow"></div>
          <div className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-tr from-pink-50 to-rose-50 rounded-full opacity-20 animate-float-slow" style={{animationDelay: '2s'}}></div>
          
          {/* Floating geometric shapes */}
          <div className="absolute top-32 right-32 w-16 h-16 border-4 border-brand-primary rounded-full animate-pulse-slow"></div>
          <div className="absolute bottom-32 left-32 w-12 h-12 bg-brand-secondary transform rotate-45 animate-rotate-slow"></div>
        </div>
        
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-brand-primary rounded-3xl mb-12 shadow-2xl">
            <Crown className="w-12 h-12 text-white" />
          </div>
          
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 mb-12 leading-tight">
            The <span className="text-brand-primary">Oswaal Promise</span>
          </h2>
          
          <div className="space-y-8 text-xl text-gray-600 leading-relaxed mb-12 max-w-5xl mx-auto">
            <p className="text-2xl font-semibold text-gray-800">
              For over 40 years, Oswaal Books has been synonymous with trust, quality, and excellence in education.
            </p>
            <p>
              Now, with Oswaal HybridEdge, we're taking that legacy into the future — giving learners the power of print and the intelligence of AI in one ecosystem.
            </p>
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-8 rounded-3xl border border-blue-100">
              <p className="text-2xl font-bold text-brand-primary">
              HybridEdge = Print + Practice + AI Intelligence
            </p>
            </div>
          </div>
        </div>
      </section>

      {/* Experience the Future Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 right-20 w-64 h-64 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-full opacity-30 animate-float-slow"></div>
          <div className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-tr from-pink-50 to-rose-50 rounded-full opacity-20 animate-float-slow" style={{animationDelay: '2s'}}></div>
          
          {/* Floating geometric shapes */}
          <div className="absolute top-32 right-32 w-16 h-16 border-4 border-brand-secondary rounded-full animate-pulse-slow"></div>
          <div className="absolute bottom-32 left-32 w-12 h-12 bg-brand-primary transform rotate-45 animate-rotate-slow"></div>
        </div>
        
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-brand-secondary rounded-3xl mb-12 shadow-2xl">
            <Rocket className="w-12 h-12 text-white" />
          </div>
          
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 mb-8 leading-tight">
            Experience the <span className="text-brand-secondary">Future of Learning</span>
          </h2>
          
          <p className="text-2xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed">
            Join millions of learners stepping into a smarter world of education.
          </p>
          
          <p className="text-xl text-gray-500 mb-12 max-w-3xl mx-auto">
            With Oswaal HybridEdge, your books don't just teach — they think with you.
          </p>
          
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-8 rounded-3xl border border-blue-100 mb-12 max-w-4xl mx-auto">
            <p className="text-xl text-gray-600">
              Explore. Learn. Evolve. With Oswaal HybridEdge.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button 
              size="lg" 
              className="group bg-brand-primary hover:bg-brand-primary/90 text-white font-bold px-12 py-6 text-xl rounded-2xl shadow-2xl hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1" 
              onClick={handleStartLearning} 
              disabled={isLoggingIn}
            >
              <Rocket className="mr-3 h-6 w-6 group-hover:animate-bounce" />
              {isLoggingIn ? "Logging in..." : "Start Your Hybrid Journey →"}
              <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <Button 
              variant="outline" 
              size="lg" 
              className="border-2 border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white font-semibold px-8 py-6 text-lg rounded-2xl transition-all duration-300"
            >
              <BookOpen className="mr-2 h-5 w-5" />
              Learn More
          </Button>
          </div>
        </div>
      </section>

      {/* Books Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 right-20 w-64 h-64 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-full opacity-30 animate-float-slow"></div>
          <div className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-tr from-pink-50 to-rose-50 rounded-full opacity-20 animate-float-slow" style={{animationDelay: '2s'}}></div>
          
          {/* Floating geometric shapes */}
          <div className="absolute top-32 right-32 w-16 h-16 border-4 border-brand-primary rounded-full animate-pulse-slow"></div>
          <div className="absolute bottom-32 left-32 w-12 h-12 bg-brand-secondary transform rotate-45 animate-rotate-slow"></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-brand-primary rounded-2xl mb-8 shadow-xl">
              <BookOpen className="w-10 h-10 text-white" />
            </div>
            
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 mb-8 leading-tight">
              Explore Our <span className="text-brand-primary">Interactive Books</span>
            </h2>
            
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Browse our collection of AI-enhanced textbooks designed for modern learning. Each book comes alive with intelligent features that adapt to your learning style.
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