import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  BookOpen,
  MessageCircle, 
  BrainCircuit, 
  Trophy, 
  Gamepad2,
  Home,
  Settings,
  User,
  Library
} from 'lucide-react';
import AIFloatingBot from './AIFloatingBot';
import logoImage from '@/assets/oswaal360-logo-new.png';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  const navItems = [
    { icon: Home, label: 'Dashboard', path: '/dashboard' },
    { icon: Library, label: 'Books', path: '/books' },
    { icon: MessageCircle, label: 'AI Chat', path: '/chat' },
    { icon: BrainCircuit, label: 'Quiz', path: '/quiz' },
    { icon: Trophy, label: 'Practice Tests', path: '/practice' },
    { icon: Gamepad2, label: 'Learning Games', path: '/games' },
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <header className="bg-card shadow-card border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14 sm:h-16">
            <div className="flex items-center">
              <img 
                src={logoImage} 
                alt="Oswaal360 Logo" 
                className="h-8 sm:h-10 w-auto"
              />
            </div>
            
            <div className="flex items-center space-x-2 sm:space-x-4">
              <div className="text-xs sm:text-sm text-muted-foreground">
                <span className="font-medium">Daily Limit:</span> 850/1000 tokens left
              </div>
              <Button variant="outline" size="sm">
                <User className="h-4 w-4 sm:mr-2" />
                <span className="hidden sm:inline">Profile</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-card border-b shadow-sm overflow-x-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-4 sm:space-x-8 min-w-max">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center px-2 sm:px-3 py-3 sm:py-4 text-xs sm:text-sm font-medium transition-smooth whitespace-nowrap ${
                    isActive(item.path)
                      ? 'border-b-2 border-primary text-primary'
                      : 'text-muted-foreground hover:text-foreground hover:border-b-2 hover:border-muted'
                  }`}
                >
                  <Icon className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        {children}
      </main>

      {/* Floating AI Bot */}
      <AIFloatingBot />
    </div>
  );
};

export default Layout;