import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { BookOpen, MessageCircle, BrainCircuit, Trophy, Gamepad2, Home, Library } from 'lucide-react';
import AIFloatingBot from './AIFloatingBot';
import ProfileModal from './ProfileModal';
import logoImage from '@/assets/oswaal360-logo-new.png';
import { useNavigate } from 'react-router-dom';
interface LayoutProps {
  children: ReactNode;
}
const Layout = ({
  children
}: LayoutProps) => {
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
  const navItems = [{
    icon: Home,
    label: 'Dashboard',
    path: '/dashboard'
  }, {
    icon: Library,
    label: 'Books',
    path: '/books'
  }, {
    icon: MessageCircle,
    label: 'AI Chat',
    path: '/chat'
  }, {
    icon: BrainCircuit,
    label: 'Quiz',
    path: '/quiz'
  }, {
    icon: Trophy,
    label: 'Practice Tests',
    path: '/practice'
  }, {
    icon: Gamepad2,
    label: 'Learning Games',
    path: '/games'
  }];
  return <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <header className="bg-card shadow-card border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14 sm:h-16">
            <div className="flex items-center">
              <img src={logoImage} alt="Oswaal360 Logo" className="h-8 sm:h-10 w-auto" />
            </div>
            
            <div className="flex items-center space-x-2 sm:space-x-4">
              
              
              <ProfileModal user={user} onLogout={handleLogout} />
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-card border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
          <div className="flex justify-between sm:justify-start space-x-1 sm:space-x-4 lg:space-x-8 overflow-x-auto scrollbar-hide">
            {navItems.map(item => {
            const Icon = item.icon;
            return <Link key={item.path} to={item.path} className={`flex flex-col sm:flex-row items-center px-2 sm:px-3 py-2 sm:py-3 lg:py-4 text-xs sm:text-sm font-medium transition-smooth whitespace-nowrap min-w-0 flex-shrink-0 ${isActive(item.path) ? 'border-b-2 border-primary text-primary' : 'text-muted-foreground hover:text-foreground hover:border-b-2 hover:border-muted'}`}>
                  <Icon className="h-4 w-4 sm:h-4 sm:w-4 mb-1 sm:mb-0 sm:mr-2" />
                  <span className="text-xs sm:text-sm">{item.label}</span>
                </Link>;
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
    </div>;
};
export default Layout;
