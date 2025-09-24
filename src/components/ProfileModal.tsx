import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  User, 
  Settings, 
  LogOut, 
  MessageCircle, 
  Search, 
  Brain,
  Camera,
  RefreshCw
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ProfileModalProps {
  user: {
    name: string;
    email: string;
    avatar: string;
  };
  onLogout: () => void;
}

const ProfileModal = ({ user, onLogout }: ProfileModalProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const credits = [
    {
      type: 'Chat Credits',
      current: 30,
      total: 50,
      resetTime: 'Tomorrow at 5:30 AM',
      icon: MessageCircle,
      color: 'bg-success',
      percentage: 60
    },
    {
      type: 'Search Credits', 
      current: 15,
      total: 25,
      resetTime: 'Tomorrow at 5:30 AM',
      icon: Search,
      color: 'bg-primary',
      percentage: 60
    },
    {
      type: 'Thinking Credits',
      current: 10,
      total: 20,
      resetTime: 'Tomorrow at 5:30 AM', 
      icon: Brain,
      color: 'bg-success',
      percentage: 50
    }
  ];

  const handleLogout = () => {
    setIsOpen(false);
    onLogout();
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center space-x-2">
          <Avatar className="h-6 w-6">
            <AvatarFallback className="bg-primary text-primary-foreground text-xs font-medium">
              {user.avatar}
            </AvatarFallback>
          </Avatar>
          <span className="hidden sm:inline text-sm font-medium">{user.name}</span>
        </Button>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-md bg-background">
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Profile Section */}
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Avatar className="h-20 w-20">
                <AvatarFallback className="bg-muted text-muted-foreground text-2xl font-medium">
                  {user.avatar}
                </AvatarFallback>
              </Avatar>
              <Button
                size="sm"
                variant="outline"
                className="absolute -bottom-1 -right-1 h-8 w-8 p-0 rounded-full bg-background border-2"
              >
                <Camera className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex-1">
              <div className="space-y-1">
                <label className="text-sm font-medium text-muted-foreground">Full Name</label>
                <p className="font-semibold">{user.name}</p>
              </div>
              <div className="space-y-1 mt-3">
                <label className="text-sm font-medium text-muted-foreground">Email</label>
                <p className="text-sm">{user.email}</p>
              </div>
            </div>
          </div>

          {/* Credits Section */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">My Credits</h3>
              <Button variant="ghost" size="sm" className="text-muted-foreground">
                <RefreshCw className="h-4 w-4 mr-1" />
                Refresh
              </Button>
            </div>
            
            <div className="space-y-3">
              {credits.map((credit, index) => {
                const Icon = credit.icon;
                return (
                  <Card key={index} className="bg-muted/30">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-3">
                          <div className={`p-2 rounded-lg ${credit.color.replace('bg-', 'bg-')}/10`}>
                            <Icon className={`h-5 w-5 ${credit.color.replace('bg-', 'text-')}`} />
                          </div>
                          <div>
                            <p className="font-medium">{credit.type}</p>
                            <p className="text-xs text-muted-foreground flex items-center">
                              <RefreshCw className="h-3 w-3 mr-1" />
                              Resets: {credit.resetTime}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className={`text-xl font-bold ${credit.color.replace('bg-', 'text-')}`}>
                            {credit.current}
                          </p>
                        </div>
                      </div>
                      <Progress 
                        value={credit.percentage} 
                        className="h-2"
                      />
                    </CardContent>
                  </Card>
                );
              })}
            </div>
            
            <p className="text-xs text-muted-foreground mt-3 text-center">
              Free tier credits reset daily at midnight in your local timezone.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2 pt-4 border-t">
            <Button 
              variant="ghost" 
              className="w-full justify-start"
              onClick={() => {
                setIsOpen(false);
                navigate('/profile');
              }}
            >
              <User className="h-4 w-4 mr-2" />
              View Profile
            </Button>
            <Button 
              variant="ghost" 
              className="w-full justify-start"
              onClick={() => {
                setIsOpen(false);
                navigate('/settings');
              }}
            >
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
            <Button 
              variant="ghost" 
              className="w-full justify-start text-destructive hover:text-destructive"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileModal;
