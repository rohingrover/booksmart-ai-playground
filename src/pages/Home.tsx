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
      {/* Header Menu */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-24">
            {/* Logo */}
            <div className="flex items-center">
              <img 
                src="/src/assets/oswaal360-logo-new.png" 
                alt="Oswaal 360 Logo" 
                className="h-[70px] w-auto"
              />
            </div>
            
            {/* Navigation Menu */}
            <nav className="hidden md:flex items-center space-x-8">
              <button 
                onClick={() => document.getElementById('what-is-section')?.scrollIntoView({ behavior: 'smooth' })}
                className="text-gray-700 hover:text-brand-primary transition-colors font-medium"
              >
                About
              </button>
              <button 
                onClick={() => document.getElementById('books-section')?.scrollIntoView({ behavior: 'smooth' })}
                className="text-gray-700 hover:text-brand-primary transition-colors font-medium"
              >
                Explore our books
              </button>
            </nav>
            
            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button className="text-gray-700 hover:text-brand-primary transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white pt-24">
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
          
          {/* Floating circles - repositioned to avoid overlap with stats */}
          <div className="absolute top-1/6 left-1/6 w-8 h-8 bg-yellow-200 rounded-full animate-bounce-gentle"></div>
          <div className="absolute top-1/5 right-1/4 w-6 h-6 bg-green-200 rounded-full animate-float-slow"></div>
          <div className="absolute bottom-1/4 left-1/4 w-10 h-10 bg-purple-200 rounded-full animate-pulse-slow"></div>
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

              {/* CTA Button */}
              <div className="flex justify-start">
                <Button 
                  size="lg" 
                  className="group bg-brand-primary hover:bg-brand-primary/90 text-white font-bold px-8 py-4 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105" 
                  onClick={handleStartLearning} 
                  disabled={isLoggingIn}
                >
                  <Rocket className="mr-3 h-5 w-5 group-hover:animate-bounce" />
                {isLoggingIn ? "Logging in..." : "Start Your Hybrid Journey"}
                  <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 relative z-20">
                <div className="text-center bg-white/80 backdrop-blur-sm rounded-lg p-4 shadow-sm">
                  <div className="text-3xl font-bold text-brand-primary mb-1">40+</div>
                  <div className="text-gray-600 text-sm">Years of Excellence</div>
                </div>
                <div className="text-center bg-white/80 backdrop-blur-sm rounded-lg p-4 shadow-sm">
                  <div className="text-3xl font-bold text-brand-secondary mb-1">10M+</div>
                  <div className="text-gray-600 text-sm">Students Served</div>
                </div>
                <div className="text-center bg-white/80 backdrop-blur-sm rounded-lg p-4 shadow-sm">
                  <div className="text-3xl font-bold text-brand-primary mb-1">500+</div>
                  <div className="text-gray-600 text-sm">Books Available</div>
                </div>
                <div className="text-center bg-white/80 backdrop-blur-sm rounded-lg p-4 shadow-sm">
                  <div className="text-3xl font-bold text-brand-secondary mb-1">24/7</div>
                  <div className="text-gray-600 text-sm">AI Support</div>
                </div>
              </div>
            </div>

            {/* Right Content - Hero Image */}
            <div className="relative flex justify-center lg:justify-end">
              <div className="relative w-full max-w-md lg:max-w-lg">
                {/* Oswaal HybridEdge Hero Image */}
                <img 
                  src="/src/assets/hero-learning.png" 
                  alt="Oswaal HybridEdge Hero - Successful Student" 
                  className="w-full h-auto rounded-2xl shadow-2xl animate-float-slow"
                />
                
                {/* Floating decorative elements around the hero image */}
                <div className="absolute -top-4 -left-4 w-8 h-8 bg-yellow-200 rounded-full animate-bounce-gentle"></div>
                <div className="absolute -top-2 -right-6 w-6 h-6 bg-brand-secondary rounded-full animate-pulse-slow"></div>
                <div className="absolute -bottom-4 -left-6 w-10 h-10 bg-green-200 rounded-full animate-float-slow"></div>
                <div className="absolute -bottom-2 -right-4 w-7 h-7 bg-purple-200 rounded-full animate-bounce-gentle"></div>
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
      <section id="what-is-section" className="py-24 px-4 sm:px-6 lg:px-8 bg-white relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 right-20 w-64 h-64 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-full opacity-40 animate-float-slow"></div>
          <div className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-tr from-pink-50 to-rose-50 rounded-full opacity-30 animate-float-slow" style={{animationDelay: '2s'}}></div>
          
          {/* Floating geometric shapes */}
          <div className="absolute top-32 right-32 w-16 h-16 border-4 border-brand-primary rounded-full animate-pulse-slow"></div>
          <div className="absolute bottom-32 left-32 w-12 h-12 bg-brand-secondary transform rotate-45 animate-rotate-slow"></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          {/* Centered Heading */}
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 leading-tight">
              What is <span className="text-brand-primary">Oswaal HybridEdge?</span>
            </h2>
          </div>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Side - Image */}
            <div className="relative flex justify-center lg:justify-start">
              <div className="relative w-full max-w-md lg:max-w-lg">
                {/* Professionally Curated Image */}
                <img 
                  src="/src/assets/professionally curated.png" 
                  alt="Professionally Curated Learning Experience" 
                  className="w-full h-auto rounded-2xl shadow-2xl animate-float-slow"
                />
                
                {/* Floating decorative elements around the image */}
                <div className="absolute -top-4 -left-4 w-8 h-8 bg-yellow-200 rounded-full animate-bounce-gentle"></div>
                <div className="absolute -top-2 -right-6 w-6 h-6 bg-brand-secondary rounded-full animate-pulse-slow"></div>
                <div className="absolute -bottom-4 -left-6 w-10 h-10 bg-green-200 rounded-full animate-float-slow"></div>
                <div className="absolute -bottom-2 -right-4 w-7 h-7 bg-purple-200 rounded-full animate-bounce-gentle"></div>
              </div>
            </div>

            {/* Right Side - Content */}
            <div className="space-y-6 text-xl text-gray-600 leading-relaxed">
              <p className="text-2xl font-semibold text-gray-800">
                Oswaal HybridEdge is the next big leap in learning innovation - an intelligent layer that connects the trusted world of Oswaal Books with the power of AI.
              </p>
              <p>
                It transforms every Oswaal book into a smart, interactive learning companion - giving students instant answers, personalized insights, and guided practice anytime, anywhere.
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Side - 4 Feature Items in 2x2 Grid */}
            <div className="grid grid-cols-2 gap-6">
              {/* Item 1 */}
              <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center mb-4">
                  <span className="text-yellow-600 font-bold text-lg">01</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Smarter Books. Smarter Learning.</h3>
                <p className="text-gray-600 text-sm">Every Oswaal book now comes alive with AI. Ask questions, get explanations, or practice exam-style problems - directly linked to your book content.</p>
              </div>

              {/* Item 2 */}
              <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                  <span className="text-blue-600 font-bold text-lg">02</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Personalized Support, 24×7</h3>
                <p className="text-gray-600 text-sm">Students get tailor-made help whenever they need it - doubt-solving, revision guidance, and intelligent recommendations based on their progress.</p>
              </div>

              {/* Item 3 */}
              <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center mb-4">
                  <span className="text-pink-600 font-bold text-lg">03</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Instant Answers. No Waiting.</h3>
                <p className="text-gray-600 text-sm">Powered by Oswaal's verified content and AI intelligence, HybridEdge delivers accurate, syllabus-aligned responses within seconds.</p>
              </div>

              {/* Item 4 */}
              <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mb-4">
                  <span className="text-red-600 font-bold text-lg">04</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Connected Ecosystem</h3>
                <p className="text-gray-600 text-sm">Seamlessly integrated with Oswaal360, HybridEdge bridges books, practice papers, and assessments, ensuring your learning journey never stops.</p>
              </div>
            </div>

            {/* Right Side - Heading and Image */}
            <div className="space-y-8">
              <div className="space-y-6">
                <div className="inline-flex items-center px-4 py-2 bg-yellow-100 rounded-full">
                  <span className="text-yellow-600 font-medium text-sm">Our core value</span>
                </div>
                
                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 leading-tight">
                  Why <span className="text-brand-primary">Oswaal HybridEdge?</span>
            </h2>
          </div>
          
              {/* Why Oswaal Image */}
              <div className="relative flex justify-center lg:justify-end">
                <div className="relative w-full max-w-md lg:max-w-lg">
                  <img 
                    src="/src/assets/why-oswaal.png" 
                    alt="Why Oswaal HybridEdge - Student Learning" 
                    className="w-full h-auto rounded-2xl shadow-2xl animate-float-slow"
                  />
                  
                  {/* Floating decorative elements around the image */}
                  <div className="absolute -top-4 -left-4 w-8 h-8 bg-yellow-200 rounded-full animate-bounce-gentle"></div>
                  <div className="absolute -top-2 -right-6 w-6 h-6 bg-brand-secondary rounded-full animate-pulse-slow"></div>
                  <div className="absolute -bottom-4 -left-6 w-10 h-10 bg-green-200 rounded-full animate-float-slow"></div>
                  <div className="absolute -bottom-2 -right-4 w-7 h-7 bg-purple-200 rounded-full animate-bounce-gentle"></div>
                </div>
              </div>
            </div>
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
          {/* Centered Heading */}
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 leading-tight">
              How <span className="text-brand-primary">It Works</span>
            </h2>
          </div>
          
          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Side - Image */}
            <div className="relative flex justify-center lg:justify-start">
              <div className="relative w-full max-w-md lg:max-w-lg">
                {/* How It Works Image */}
                <img 
                  src="/src/assets/how-it-works.png" 
                  alt="How It Works - Student Thinking" 
                  className="w-full h-auto rounded-2xl shadow-2xl animate-float-slow"
                />
                
                {/* Floating decorative elements around the image */}
                <div className="absolute -top-4 -left-4 w-8 h-8 bg-yellow-200 rounded-full animate-bounce-gentle"></div>
                <div className="absolute -top-2 -right-6 w-6 h-6 bg-brand-secondary rounded-full animate-pulse-slow"></div>
                <div className="absolute -bottom-4 -left-6 w-10 h-10 bg-green-200 rounded-full animate-float-slow"></div>
                <div className="absolute -bottom-2 -right-4 w-7 h-7 bg-purple-200 rounded-full animate-bounce-gentle"></div>
              </div>
            </div>
            
            {/* Right Side - Steps */}
            <div className="space-y-8">
              {/* Step 1 */}
              <div className="group flex items-start space-x-4">
                <div className="relative">
                  <div className="w-16 h-16 bg-brand-primary rounded-2xl flex items-center justify-center text-white text-2xl font-black shadow-xl group-hover:scale-110 transition-transform duration-300">
                    1
                  </div>
                  <div className="absolute -inset-1 bg-brand-primary rounded-2xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Scan the QR code inside your Oswaal Book.</h3>
                </div>
              </div>
              
              {/* Step 2 */}
              <div className="group flex items-start space-x-4">
                <div className="relative">
                  <div className="w-16 h-16 bg-brand-secondary rounded-2xl flex items-center justify-center text-white text-2xl font-black shadow-xl group-hover:scale-110 transition-transform duration-300">
                    2
                  </div>
                  <div className="absolute -inset-1 bg-brand-secondary rounded-2xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Ask your question - concept, formula, or topic.</h3>
                </div>
            </div>
            
              {/* Step 3 */}
              <div className="group flex items-start space-x-4">
                <div className="relative">
                  <div className="w-16 h-16 bg-brand-primary rounded-2xl flex items-center justify-center text-white text-2xl font-black shadow-xl group-hover:scale-110 transition-transform duration-300">
                    3
                  </div>
                  <div className="absolute -inset-1 bg-brand-primary rounded-2xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Get instant AI-powered answers, examples, and practice.</h3>
                </div>
            </div>
            
              {/* Step 4 */}
              <div className="group flex items-start space-x-4">
                <div className="relative">
                  <div className="w-16 h-16 bg-brand-secondary rounded-2xl flex items-center justify-center text-white text-2xl font-black shadow-xl group-hover:scale-110 transition-transform duration-300">
                    4
                  </div>
                  <div className="absolute -inset-1 bg-brand-secondary rounded-2xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Track your learning through your Oswaal360 dashboard.</h3>
                </div>
              </div>
            </div>
          </div>
          
          {/* Highlighted Quote */}
          <div className="text-center mt-16">
            <div className="bg-gradient-to-r from-brand-primary/10 to-brand-secondary/10 p-8 rounded-3xl border-2 border-brand-primary/20 max-w-4xl mx-auto relative overflow-hidden">
              {/* Background decoration */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-primary to-brand-secondary"></div>
              <div className="absolute top-4 right-4 w-8 h-8 bg-brand-primary/20 rounded-full animate-pulse-slow"></div>
              <div className="absolute bottom-4 left-4 w-6 h-6 bg-brand-secondary/20 rounded-full animate-bounce-gentle"></div>
              
              <p className="text-2xl font-bold text-gray-800 leading-relaxed relative z-10">
                <span className="text-brand-primary">HybridEdge</span> ensures that every page of your book becomes a <span className="text-brand-secondary font-black">gateway to smarter learning</span>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The Oswaal Promise & Experience the Future Section */}
      <section className="py-24 px-6 sm:px-8 lg:px-12 bg-white relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 right-20 w-64 h-64 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-full opacity-30 animate-float-slow"></div>
          <div className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-tr from-pink-50 to-rose-50 rounded-full opacity-20 animate-float-slow" style={{animationDelay: '2s'}}></div>
          
          {/* Floating geometric shapes */}
          <div className="absolute top-32 right-32 w-16 h-16 border-4 border-brand-primary rounded-full animate-pulse-slow"></div>
          <div className="absolute bottom-32 left-32 w-12 h-12 bg-brand-secondary transform rotate-45 animate-rotate-slow"></div>
        </div>
        
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 mb-12 leading-tight">
            The <span className="text-brand-primary">Oswaal Promise</span> & <span className="text-brand-secondary">Future of Learning</span>
          </h2>
          
          <div className="space-y-8 text-xl text-gray-600 leading-relaxed mb-12 max-w-5xl mx-auto">
            <p className="text-2xl font-semibold text-gray-800">
              For over 40 years, Oswaal Books has been synonymous with trust, quality, and excellence in education.
            </p>
            <p>
              Now, with Oswaal HybridEdge, we're taking that legacy into the future - giving learners the power of print and the intelligence of AI in one ecosystem.
            </p>
            <p className="text-2xl text-gray-600">
              Join millions of learners stepping into a smarter world of education.
            </p>
            <p className="text-xl text-gray-500">
              With Oswaal HybridEdge, your books don't just teach - they think with you.
            </p>
          </div>
          
          {/* Highlighted HybridEdge Formula */}
          <div className="bg-gradient-to-r from-brand-primary/10 to-brand-secondary/10 p-8 rounded-3xl border-2 border-brand-primary/20 mb-12 max-w-4xl mx-auto relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-primary to-brand-secondary"></div>
            <div className="absolute top-4 right-4 w-8 h-8 bg-brand-primary/20 rounded-full animate-pulse-slow"></div>
            <div className="absolute bottom-4 left-4 w-6 h-6 bg-brand-secondary/20 rounded-full animate-bounce-gentle"></div>
            
            <p className="text-2xl font-bold text-gray-800 leading-relaxed relative z-10">
              <span className="text-brand-primary">HybridEdge</span> = <span className="text-brand-primary">Print</span> + <span className="text-brand-secondary">Practice</span> + <span className="text-brand-primary">AI Intelligence</span>
            </p>
          </div>
          
          {/* Highlighted Explore. Learn. Evolve */}
          <div className="bg-gradient-to-r from-brand-secondary/10 to-brand-primary/10 p-8 rounded-3xl border-2 border-brand-secondary/20 mb-12 max-w-4xl mx-auto relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-secondary to-brand-primary"></div>
            <div className="absolute top-4 right-4 w-8 h-8 bg-brand-secondary/20 rounded-full animate-pulse-slow"></div>
            <div className="absolute bottom-4 left-4 w-6 h-6 bg-brand-primary/20 rounded-full animate-bounce-gentle"></div>
            
            <p className="text-2xl font-bold text-gray-800 leading-relaxed relative z-10">
              <span className="text-brand-secondary font-black">Explore.</span> <span className="text-brand-primary font-black">Learn.</span> <span className="text-brand-secondary font-black">Evolve.</span> With <span className="text-brand-primary">Oswaal HybridEdge</span>.
            </p>
          </div>
          
          {/* CTA Button */}
          <div className="flex justify-center px-4">
            <Button 
              size="lg" 
              className="group bg-brand-primary hover:bg-brand-primary/90 text-white font-bold px-8 sm:px-12 py-4 sm:py-6 text-lg sm:text-xl rounded-2xl shadow-2xl hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 w-full sm:w-auto" 
              onClick={handleStartLearning} 
              disabled={isLoggingIn}
            >
              <Rocket className="mr-3 h-5 w-5 sm:h-6 sm:w-6 group-hover:animate-bounce" />
            {isLoggingIn ? "Logging in..." : "Start Your Hybrid Journey"}
              <ArrowRight className="ml-3 h-5 w-5 sm:h-6 sm:w-6 group-hover:translate-x-1 transition-transform" />
          </Button>
          </div>
        </div>
      </section>

      {/* Books Section */}
      <section id="books-section" className="py-24 px-6 sm:px-8 lg:px-12 bg-white relative overflow-hidden">
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

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16 px-6 sm:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info & Contact */}
            <div className="space-y-6">
              <div className="flex items-center">
                <img 
                  src="/src/assets/oswaal360-logo-new.png" 
                  alt="Oswaal 360 Logo" 
                  className="h-16 w-auto"
                />
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-5 h-5 mt-1">
                    <svg className="w-5 h-5 text-brand-primary" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      1/11 Sahitya Kunj, M.G. Road, Agra, Uttar Pradesh, India
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-5 h-5">
                    <svg className="w-5 h-5 text-brand-primary" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                  </div>
                  <a href="mailto:help@oswaal360.com" className="text-gray-300 hover:text-brand-primary transition-colors text-sm">
                    help@oswaal360.com
                  </a>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-5 h-5">
                    <svg className="w-5 h-5 text-brand-primary" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                  </div>
                  <a href="tel:+91-7060659900" className="text-gray-300 hover:text-brand-primary transition-colors text-sm">
                    Call Us: +91-7060659900
                  </a>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-5 h-5 mt-1">
                    <svg className="w-5 h-5 text-brand-primary" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-gray-300 text-sm">
                      Working Hours: 10:00 am - 06:30 pm<br />
                      Monday to Saturday
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Company Links */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-white">COMPANY</h3>
              <ul className="space-y-3">
                <li><a href="https://www.oswaal360.com/pages/oswaal-books-about-us" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-brand-primary transition-colors text-sm">About Us</a></li>
                <li><a href="https://www.oswaal360.com/blog/post" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-brand-primary transition-colors text-sm">Blog</a></li>
                <li><a href="https://www.oswaal360.com/pages/oswaal360-terms-and-conditions" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-brand-primary transition-colors text-sm">Terms and Conditions</a></li>
                <li><a href="https://www.oswaal360.com/pages/oswaal-360-privacy-policy" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-brand-primary transition-colors text-sm">Privacy Policy</a></li>
                <li><a href="https://www.oswaal360.com/pages/oswaal-360-refund-policy" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-brand-primary transition-colors text-sm">Refund Policy</a></li>
                <li><a href="https://www.oswaal360.com/pages/faqs" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-brand-primary transition-colors text-sm">FAQs</a></li>
                <li><a href="https://www.oswaal360.com/pages/contact-us" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-brand-primary transition-colors text-sm">Contact Us</a></li>
                <li><a href="https://www.oswaal360.com/mod/feedback/view.php?id=6058" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-brand-primary transition-colors text-sm">Feedback</a></li>
              </ul>
            </div>

            {/* Explore Courses */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-white">EXPLORE COURSES</h3>
              <ul className="space-y-3">
                <li><a href="https://www.oswaal360.com/pages/cbse-online-sample-paper-question-bank-for-class-10-12-board-exam" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-brand-primary transition-colors text-sm">CBSE</a></li>
                <li><a href="https://www.oswaal360.com/pages/icse-online-specimen-sample-paper-for-class-10-board-exams" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-brand-primary transition-colors text-sm">ICSE</a></li>
                <li><a href="https://www.oswaal360.com/pages/cat-online-mock-test-sample-paper-and-course-for-the-latest-exam" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-brand-primary transition-colors text-sm">CAT</a></li>
                <li><a href="https://www.oswaal360.com/pages/cuet-online-mock-test-sample-paper-and-course-for-the-latest-exam" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-brand-primary transition-colors text-sm">CUET UG</a></li>
                <li><a href="https://www.oswaal360.com/pages/online-ncert-exemplar-solution-class-12" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-brand-primary transition-colors text-sm">NCERT</a></li>
                <li><a href="https://www.oswaal360.com/pages/nra-cet-online-mock-test-sample-paper-and-course-for-the-latest-exam" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-brand-primary transition-colors text-sm">NRA CET</a></li>
                <li><a href="https://www.oswaal360.com/pages/ugc-net-online-mock-test-sample-paper-and-course-for-latest-exam" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-brand-primary transition-colors text-sm">NTA UGC NET</a></li>
                <li><a href="https://www.oswaal360.com/pages/upsc-online-mock-test-sample-paper-and-course-for-latest-exam" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-brand-primary transition-colors text-sm">UPSC</a></li>
              </ul>
              
              <div className="pt-4">
                <h4 className="text-lg font-semibold text-white mb-3">NCERT UPSC Video Courses</h4>
                <ul className="space-y-2">
                  <li><a href="https://www.oswaal360.com/pages/upsc-online-ncert-book-indian-polity-for-latest-exam" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-brand-primary transition-colors text-sm">Indian Polity</a></li>
                  <li><a href="https://www.oswaal360.com/pages/upsc-online-ncert-book-history-for-latest-exam" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-brand-primary transition-colors text-sm">History</a></li>
                  <li><a href="https://www.oswaal360.com/pages/upsc-online-ncert-book-geography-for-latest-exam" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-brand-primary transition-colors text-sm">Geography</a></li>
                  <li><a href="https://www.oswaal360.com/pages/upsc-online-ncert-book-indian-economy-for-latest-exam" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-brand-primary transition-colors text-sm">Indian Economy</a></li>
                  <li><a href="https://www.oswaal360.com/pages/upsc-online-ncert-book-general-science-for-latest-exam" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-brand-primary transition-colors text-sm">Physics</a></li>
                  <li><a href="https://www.oswaal360.com/pages/general-science-chemistry" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-brand-primary transition-colors text-sm">Chemistry</a></li>
                  <li><a href="https://www.oswaal360.com/pages/general-science-biology" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-brand-primary transition-colors text-sm">Biology</a></li>
                  <li><a href="https://www.oswaal360.com/pages/important-topics-of-class-11-class-12" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-brand-primary transition-colors text-sm">Important Topics of Class 11 & Class 12</a></li>
                </ul>
              </div>
            </div>

            {/* Olympiad & Additional Links */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-white">Olympiad Mock Papers</h3>
              <ul className="space-y-3">
                <li><a href="https://www.oswaal360.com/pages/olympiad-class-1-online-course-mock-test-series-sample-papers-for-the-latest-exam-preparation" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-brand-primary transition-colors text-sm">Class 1</a></li>
                <li><a href="https://www.oswaal360.com/pages/olympiad-class-2-online-course-mock-test-series-sample-papers-for-the-latest-exam-preparation" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-brand-primary transition-colors text-sm">Class 2</a></li>
                <li><a href="https://www.oswaal360.com/pages/olympiad-class-3-online-course-mock-test-series-sample-papers-for-the-latest-exam-preparation" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-brand-primary transition-colors text-sm">Class 3</a></li>
                <li><a href="https://www.oswaal360.com/pages/olympiad-class-4-online-course-mock-test-series-sample-papers-for-the-latest-exam-preparation" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-brand-primary transition-colors text-sm">Class 4</a></li>
                <li><a href="https://www.oswaal360.com/pages/olympiad-class-5-online-course-mock-test-series-sample-papers-for-the-latest-exam-preparation" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-brand-primary transition-colors text-sm">Class 5</a></li>
              </ul>
              
              <div className="pt-4">
                <h4 className="text-lg font-semibold text-white mb-3">Additional Resources</h4>
                <ul className="space-y-2">
                  <li><a href="https://www.oswaal360.com/pages/competency-based-questions" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-brand-primary transition-colors text-sm">Competency Based Questions</a></li>
                </ul>
              </div>
            </div>
          </div>
          
          {/* Footer Bottom */}
          <div className="border-t border-gray-700 mt-12 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="text-gray-400 text-sm">
                © 2024 Oswaal Books. All rights reserved.
              </div>
              <div className="flex space-x-6">
                <a href="https://www.oswaal360.com/pages/oswaal-360-privacy-policy" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-brand-primary transition-colors text-sm">Privacy Policy</a>
                <a href="https://www.oswaal360.com/pages/oswaal360-terms-and-conditions" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-brand-primary transition-colors text-sm">Terms of Service</a>
                <a href="https://www.oswaal360.com/pages/contact-us" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-brand-primary transition-colors text-sm">Contact</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>;
};
export default Home;