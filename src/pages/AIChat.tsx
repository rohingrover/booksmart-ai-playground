import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Send, 
  BookOpen, 
  MessageCircle, 
  Sparkles, 
  HelpCircle,
  Lightbulb,
  Brain
} from 'lucide-react';

const AIChat = () => {
  const [selectedBook, setSelectedBook] = useState('Mathematics Class 10');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm your AI tutor for Mathematics Class 10. I'm here to help you understand concepts, solve problems, and clarify doubts. What would you like to learn about today? 📚",
      isBot: true,
      timestamp: new Date()
    }
  ]);

  const books = [
    { id: 1, title: 'Mathematics Class 10', subject: 'Mathematics', board: 'CBSE' },
    { id: 2, title: 'Science Class 9', subject: 'Science', board: 'NCERT' },
    { id: 3, title: 'English Literature', subject: 'English', board: 'ICSE' },
    { id: 4, title: 'History Class 8', subject: 'History', board: 'CBSE' }
  ];

  const suggestedQuestions = [
    "What are quadratic equations?",
    "Explain the Pythagorean theorem",
    "How to solve linear equations?",
    "What is the formula for area of circle?",
    "Explain coordinate geometry basics",
    "What are arithmetic progressions?",
    "How to find HCF and LCM?",
    "Explain trigonometric ratios",
    "What is polynomial factorization?",
    "How to solve word problems?"
  ];

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
      const responses = [
        "Great question! Let me explain this concept step by step...",
        "I can help you with that! Here's a detailed explanation...",
        "That's an important topic. Let me break it down for you...",
        "Excellent! This is a fundamental concept. Here's how it works...",
        "Perfect question! Let me provide you with examples and explanations..."
      ];
      
      const botResponse = {
        id: messages.length + 2,
        text: responses[Math.floor(Math.random() * responses.length)],
        isBot: true,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  const handleQuestionClick = (question: string) => {
    setMessage(question);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="grid lg:grid-cols-4 gap-6 h-[calc(100vh-200px)] animate-fade-in">
      {/* Sidebar - Book Selection & Suggested Questions */}
      <div className="lg:col-span-1 space-y-6">
        {/* Book Selection */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <BookOpen className="h-5 w-5 mr-2 text-primary" />
              Select Book
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {books.map((book) => (
              <div
                key={book.id}
                onClick={() => setSelectedBook(book.title)}
                className={`p-3 rounded-lg cursor-pointer transition-smooth ${
                  selectedBook === book.title
                    ? 'gradient-primary text-white'
                    : 'bg-muted hover:bg-accent'
                }`}
              >
                <div className="flex justify-between items-start mb-1">
                  <h4 className="font-medium text-sm">{book.title}</h4>
                  <Badge 
                    variant={selectedBook === book.title ? "secondary" : "default"}
                    className="text-xs"
                  >
                    {book.board}
                  </Badge>
                </div>
                <p className="text-xs opacity-80">{book.subject}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Suggested Questions */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <HelpCircle className="h-5 w-5 mr-2 text-primary" />
              Suggested Questions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-80">
              <div className="space-y-2">
                {suggestedQuestions.map((question, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    className="w-full text-left justify-start h-auto p-3 text-sm hover:bg-accent"
                    onClick={() => handleQuestionClick(question)}
                  >
                    <Lightbulb className="h-4 w-4 mr-2 text-warning flex-shrink-0" />
                    <span className="text-wrap">{question}</span>
                  </Button>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>

      {/* Main Chat Area */}
      <div className="lg:col-span-3">
        <Card className="h-full shadow-elegant flex flex-col">
          <CardHeader className="gradient-primary text-white">
            <CardTitle className="flex items-center">
              <Brain className="h-6 w-6 mr-2" />
              AI Chat - {selectedBook}
              <Sparkles className="h-5 w-5 ml-2 animate-glow" />
            </CardTitle>
          </CardHeader>
          
          <CardContent className="flex-1 flex flex-col p-0">
            {/* Messages */}
            <ScrollArea className="flex-1 p-6">
              <div className="space-y-4">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}
                  >
                    <div
                      className={`max-w-[80%] p-4 rounded-lg ${
                        msg.isBot
                          ? 'bg-accent text-accent-foreground'
                          : 'gradient-primary text-white'
                      }`}
                    >
                      <div className="flex items-start space-x-2">
                        {msg.isBot && <MessageCircle className="h-4 w-4 mt-1 flex-shrink-0" />}
                        <div className="flex-1">
                          <p className="text-sm leading-relaxed">{msg.text}</p>
                          <p className="text-xs opacity-70 mt-2">
                            {msg.timestamp.toLocaleTimeString([], {
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            {/* Input Area */}
            <div className="p-6 border-t bg-muted/30">
              <div className="flex space-x-3">
                <Input
                  placeholder="Ask me anything about your book..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="flex-1 bg-background"
                />
                <Button
                  onClick={handleSendMessage}
                  className="gradient-primary px-6"
                  disabled={!message.trim()}
                >
                  <Send className="h-4 w-4 mr-2" />
                  Send
                </Button>
              </div>
              
              <div className="flex flex-wrap gap-2 mt-3">
                <Badge variant="outline" className="text-xs">
                  💡 Ask for examples
                </Badge>
                <Badge variant="outline" className="text-xs">
                  🔍 Request explanations
                </Badge>
                <Badge variant="outline" className="text-xs">
                  📝 Get practice problems
                </Badge>
                <Badge variant="outline" className="text-xs">
                  🎯 Check solutions
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AIChat;