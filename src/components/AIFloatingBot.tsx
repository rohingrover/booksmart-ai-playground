import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { MessageCircle, X, Send, Sparkles } from 'lucide-react';

const AIFloatingBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi! I'm Oswaal AI Assistant 🤖 How can I help you with your studies today?",
      isBot: true,
      timestamp: new Date()
    }
  ]);

  const handleSendMessage = () => {
    if (!message.trim()) return;

    const newMessage = {
      id: messages.length + 1,
      text: message,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);
    setMessage('');

    // Simulate AI response
    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        text: "I understand your question! Let me help you with that. Based on your book content, here's what I suggest...",
        isBot: true,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-20 right-6 w-96 h-96 z-50 animate-slide-up">
          <Card className="h-full shadow-elegant border-primary/20">
            <CardHeader className="gradient-primary text-white rounded-t-lg">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center text-sm">
                  <Sparkles className="h-4 w-4 mr-2" />
                  Oswaal AI Assistant
                </CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:bg-white/20 p-1 h-6 w-6"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            
            <CardContent className="flex flex-col h-full p-0">
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded-lg ${
                        msg.isBot
                          ? 'bg-accent text-accent-foreground'
                          : 'gradient-primary text-white'
                      }`}
                    >
                      <p className="text-sm">{msg.text}</p>
                      <p className="text-xs opacity-70 mt-1">
                        {msg.timestamp.toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Input */}
              <div className="p-4 border-t">
                <div className="flex space-x-2">
                  <Input
                    placeholder="Ask me anything about your books..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="flex-1"
                  />
                  <Button
                    onClick={handleSendMessage}
                    size="sm"
                    className="gradient-primary"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Floating Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full gradient-primary shadow-glow hover:shadow-elegant transition-smooth animate-float"
        size="lg"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>
    </>
  );
};

export default AIFloatingBot;