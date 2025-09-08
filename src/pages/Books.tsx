import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  BookOpen, 
  MessageCircle, 
  BrainCircuit, 
  Trophy, 
  Gamepad2,
  TrendingUp,
  Clock,
  Target,
  Star
} from 'lucide-react';
import { Link } from 'react-router-dom';

// Import book cover images
import mathBookCover from '@/assets/math-book-cover.jpg';
import scienceBookCover from '@/assets/science-book-cover.jpg';
import englishBookCover from '@/assets/english-book-cover.jpg';
import historyBookCover from '@/assets/history-book-cover.jpg';

const Books = () => {
  const stats = [
    {
      title: 'Books',
      value: '12',
      icon: BookOpen,
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      title: 'Quizzes Completed',
      value: '89',
      icon: BrainCircuit,
      color: 'text-success',
      bgColor: 'bg-success/10'
    },
    {
      title: 'Games Won',
      value: '156',
      icon: Trophy,
      color: 'text-warning',
      bgColor: 'bg-warning/10'
    },
    {
      title: 'Average Score',
      value: '87%',
      icon: Target,
      color: 'text-secondary',
      bgColor: 'bg-secondary/10'
    }
  ];

  const recentBooks = [
    {
      id: 1,
      title: 'Mathematics Class 10',
      subject: 'Mathematics',
      board: 'CBSE',
      progress: 65,
      lastAccessed: '2 hours ago',
      image: mathBookCover
    },
    {
      id: 2,
      title: 'Science Class 9',
      subject: 'Science',
      board: 'NCERT',
      progress: 42,
      lastAccessed: '1 day ago',
      image: scienceBookCover
    },
    {
      id: 3,
      title: 'English Literature',
      subject: 'English',
      board: 'ICSE',
      progress: 78,
      lastAccessed: '3 days ago',
      image: englishBookCover
    },
    {
      id: 4,
      title: 'History Class 8',
      subject: 'History',
      board: 'CBSE',
      progress: 23,
      lastAccessed: '5 days ago',
      image: historyBookCover
    }
  ];

  const quickActions = [
    {
      title: 'Start AI Chat',
      description: 'Get instant help with your doubts',
      icon: MessageCircle,
      link: '/chat',
      color: 'gradient-primary'
    },
    {
      title: 'Take Quiz',
      description: 'Test your knowledge',
      icon: BrainCircuit,
      link: '/quiz',
      color: 'gradient-secondary'
    },
    {
      title: 'Practice Tests',
      description: 'Prepare for exams',
      icon: Trophy,
      link: '/practice',
      color: 'bg-success'
    },
    {
      title: 'Learning Games',
      description: 'Learn while playing',
      icon: Gamepad2,
      link: '/games',
      color: 'bg-warning'
    }
  ];

  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-in">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold gradient-hero bg-clip-text text-transparent">
          My Learning Dashboard
        </h1>
        <p className="text-sm sm:text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto">
          Track your progress and continue your learning journey
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="shadow-card hover:shadow-elegant transition-smooth">
              <CardContent className="p-3 sm:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs sm:text-sm font-medium text-muted-foreground">
                      {stat.title}
                    </p>
                    <p className="text-xl sm:text-3xl font-bold text-foreground">
                      {stat.value}
                    </p>
                  </div>
                  <div className={`p-2 sm:p-3 rounded-full ${stat.bgColor}`}>
                    <Icon className={`h-4 w-4 sm:h-6 sm:w-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-lg sm:text-2xl font-semibold mb-4 sm:mb-6 flex items-center">
          <TrendingUp className="h-5 w-5 sm:h-6 sm:w-6 mr-2 text-primary" />
          Quick Actions
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <Link key={index} to={action.link}>
                <Card className="shadow-card hover:shadow-elegant transition-smooth hover:scale-105 cursor-pointer h-full">
                  <CardContent className="p-4 sm:p-6 text-center">
                    <div className={`w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 rounded-full ${action.color} flex items-center justify-center`}>
                      <Icon className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                    </div>
                    <h3 className="text-sm sm:text-lg font-semibold mb-1 sm:mb-2">{action.title}</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground">{action.description}</p>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Recent Books */}
      <div>
        <h2 className="text-lg sm:text-2xl font-semibold mb-4 sm:mb-6 flex items-center">
          <BookOpen className="h-5 w-5 sm:h-6 sm:w-6 mr-2 text-primary" />
          Continue Learning
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {recentBooks.map((book) => (
            <Card key={book.id} className="shadow-card hover:shadow-elegant transition-smooth group">
              <div className="relative overflow-hidden">
                <img 
                  src={book.image} 
                  alt={book.title}
                  className="h-32 sm:h-48 w-full object-cover group-hover:scale-105 transition-smooth"
                />
                <Badge 
                  className="absolute top-2 right-2 bg-primary text-primary-foreground text-xs"
                >
                  {book.board}
                </Badge>
              </div>
              
              <CardContent className="p-3 sm:p-4 space-y-3">
                <div>
                  <h3 className="text-sm sm:text-base font-semibold text-foreground group-hover:text-primary transition-smooth line-clamp-2">
                    {book.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground">{book.subject}</p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-xs sm:text-sm">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-medium">{book.progress}%</span>
                  </div>
                  <div className="h-1.5 sm:h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full gradient-primary transition-smooth"
                      style={{ width: `${book.progress}%` }}
                    />
                  </div>
                </div>
                
                <div className="flex justify-between items-center pt-2">
                  <span className="text-xs text-muted-foreground">
                    {book.lastAccessed}
                  </span>
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star 
                        key={star} 
                        className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-warning fill-current" 
                      />
                    ))}
                  </div>
                </div>
                
                <Link to={`/chat/${book.id}`}>
                  <Button className="w-full gradient-primary mt-3 text-xs sm:text-sm">
                    Continue Learning
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Books;