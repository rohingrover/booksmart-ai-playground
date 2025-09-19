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
  Library,
  LogOut,
  ChevronDown
} from 'lucide-react';
import AIFloatingBot from './AIFloatingBot';
import logoImage from '@/assets/oswaal360-logo-new.png';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useNavigate } from 'react-router-dom';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const isActive = (path: string) => location.pathname === path;
  
  // Mock user data - in real app this would come from auth context
  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    avatar: "JD"
  };

  const handleLogout = () => {
    // In real app, clear auth tokens/session here
    navigate('/');
  };
  
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
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="flex items-center space-x-2">
                    <div className="h-6 w-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-medium">
                      {user.avatar}
                    </div>
                    <span className="hidden sm:inline text-sm font-medium">{user.name}</span>
                    <ChevronDown className="h-3 w-3" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 bg-background border shadow-lg">
                  <div className="px-3 py-2">
                    <p className="text-sm font-medium">{user.name}</p>
                    <p className="text-xs text-muted-foreground">{user.email}</p>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="cursor-pointer">
                    <User className="h-4 w-4 mr-2" />
                    View Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer">
                    <Settings className="h-4 w-4 mr-2" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    className="cursor-pointer text-destructive focus:text-destructive"
                    onClick={handleLogout}
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
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