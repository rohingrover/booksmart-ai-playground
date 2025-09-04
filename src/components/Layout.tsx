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
  User
} from 'lucide-react';
import AIFloatingBot from './AIFloatingBot';
import logoImage from '@/assets/oswaal360-logo.png';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  const navItems = [
    { icon: Home, label: 'Dashboard', path: '/' },
    { icon: BookOpen, label: 'My Books', path: '/books' },
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
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <img 
                src={logoImage} 
                alt="Oswaal360 Logo" 
                className="h-10 w-auto"
              />
              <div>
                <p className="text-sm text-muted-foreground">Smart Learning Platform</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
              <Button variant="outline" size="sm">
                <User className="h-4 w-4 mr-2" />
                Profile
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-card border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center px-3 py-4 text-sm font-medium transition-smooth ${
                    isActive(item.path)
                      ? 'border-b-2 border-primary text-primary'
                      : 'text-muted-foreground hover:text-foreground hover:border-b-2 hover:border-muted'
                  }`}
                >
                  <Icon className="h-4 w-4 mr-2" />
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      {/* Floating AI Bot */}
      <AIFloatingBot />
    </div>
  );
};

export default Layout;