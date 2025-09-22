import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
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

  const bookQuestions = {
    'Mathematics Class 10': [
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
    ],
    'Science Class 9': [
      "What is photosynthesis?",
      "Explain Newton's laws of motion",
      "What are the different types of tissues?",
      "How do atoms combine to form molecules?",
      "What is the structure of atom?",
      "Explain the water cycle",
      "What are the fundamental forces?",
      "How does sound travel?",
      "What is natural selection?",
      "Explain the periodic table"
    ],
    'English Literature': [
      "What is a metaphor?",
      "Explain the structure of a sonnet",
      "What are literary devices?",
      "How to analyze poetry?",
      "What is character development?",
      "Explain narrative techniques",
      "What is the theme of a story?",
      "How to write a good essay?",
      "What is dramatic irony?",
      "Explain different poetry forms"
    ],
    'History Class 8': [
      "What caused the French Revolution?",
      "Explain the Mughal Empire",
      "What was the Industrial Revolution?",
      "How did colonialism affect India?",
      "What are primary sources?",
      "Explain the concept of nationalism",
      "What was the Renaissance?",
      "How did trade routes develop?",
      "What is feudalism?",
      "Explain ancient civilizations"
    ]
  };

  const getBookQuestions = (bookTitle: string) => {
    return bookQuestions[bookTitle as keyof typeof bookQuestions] || bookQuestions['Mathematics Class 10'];
  };

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
    <div className="flex flex-col lg:grid lg:grid-cols-4 gap-4 sm:gap-6 h-[calc(100vh-200px)] animate-fade-in">
      {/* Book Selection Dropdown - Always at top on mobile */}
      <div className="lg:hidden">
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <BookOpen className="h-5 w-5 mr-2 text-primary" />
              Select Book
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Select value={selectedBook} onValueChange={setSelectedBook}>
              <SelectTrigger>
                <SelectValue placeholder="Choose a book" />
              </SelectTrigger>
              <SelectContent className="bg-background z-50 border shadow-lg">
                {books.map((book) => (
                  <SelectItem key={book.id} value={book.title}>
                    <div className="flex items-center space-x-2">
                      <BookOpen className="h-4 w-4" />
                      <span>{book.title}</span>
                      <Badge variant="secondary" className="ml-2">
                        {book.board}
                      </Badge>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>
      </div>

      {/* Desktop Sidebar - Book Selection & Quick Questions */}
      <div className="hidden lg:block lg:col-span-1 space-y-6">
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <BookOpen className="h-5 w-5 mr-2 text-primary" />
              Select Book
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Select value={selectedBook} onValueChange={setSelectedBook}>
              <SelectTrigger>
                <SelectValue placeholder="Choose a book" />
              </SelectTrigger>
              <SelectContent className="bg-background z-50 border shadow-lg">
                {books.map((book) => (
                  <SelectItem key={book.id} value={book.title}>
                    <div className="flex items-center space-x-2">
                      <BookOpen className="h-4 w-4" />
                      <span>{book.title}</span>
                      <Badge variant="secondary" className="ml-2">
                        {book.board}
                      </Badge>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <HelpCircle className="h-5 w-5 mr-2 text-primary" />
              Quick Questions for {selectedBook.split(' ')[0]}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-80">
              <div className="space-y-2">
                {getBookQuestions(selectedBook).map((question, index) => (
                  <div
                    key={index}
                    onClick={() => handleQuestionClick(question)}
                    className="p-3 text-sm border border-border rounded-lg hover:bg-accent cursor-pointer transition-smooth group"
                  >
                    <div className="flex items-start space-x-2">
                      <Lightbulb className="h-4 w-4 text-warning flex-shrink-0 mt-0.5" />
                      <span className="text-wrap group-hover:text-primary transition-colors">
                        {question}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>

      {/* Main Chat Area - Second on mobile, spanning 3 cols on desktop */}
      <div className="lg:col-span-3 flex-1 min-h-[400px] lg:min-h-[600px]">
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
            <ScrollArea className="flex-1 p-3 sm:p-6 min-h-[300px] lg:min-h-[400px]">
              <div className="space-y-4">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}
                  >
                    <div
                      className={`max-w-[85%] sm:max-w-[80%] p-3 sm:p-4 rounded-lg ${
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

            {/* Input Area - Fixed at bottom */}
            <div className="p-3 sm:p-4 lg:p-6 border-t bg-muted/30 mt-auto">
              <div className="flex flex-col space-y-3">
                <div className="flex space-x-2">
                  <Input
                    placeholder="Ask me anything about your book..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="flex-1 bg-background h-10 sm:h-11"
                  />
                  <Button
                    onClick={handleSendMessage}
                    className="gradient-primary px-3 sm:px-4 h-10 sm:h-11 shrink-0"
                    disabled={!message.trim()}
                  >
                    <Send className="h-4 w-4" />
                    <span className="sr-only">Send</span>
                  </Button>
                </div>
                
                <div className="flex flex-wrap gap-1 sm:gap-2">
                  <Badge variant="outline" className="text-xs">
                    💡 Ask for examples
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    📝 Get practice problems  
                  </Badge>
                  <Badge variant="outline" className="text-xs hidden sm:inline-flex">
                    🔍 Request explanations
                  </Badge>
                  <Badge variant="outline" className="text-xs hidden sm:inline-flex">
                    🎯 Check solutions
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Questions - Third on mobile (after chat) - Show only 3 questions */}
      <div className="lg:hidden">
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <HelpCircle className="h-5 w-5 mr-2 text-primary" />
              Quick Questions for {selectedBook.split(' ')[0]}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {getBookQuestions(selectedBook).slice(0, 3).map((question, index) => (
                <div
                  key={index}
                  onClick={() => handleQuestionClick(question)}
                  className="p-3 text-sm border border-border rounded-lg hover:bg-accent cursor-pointer transition-smooth group"
                >
                  <div className="flex items-start space-x-2">
                    <Lightbulb className="h-4 w-4 text-warning flex-shrink-0 mt-0.5" />
                    <span className="text-wrap group-hover:text-primary transition-colors">
                      {question}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 text-center">
              <Badge variant="outline" className="text-xs text-muted-foreground">
                {getBookQuestions(selectedBook).length - 3} more questions available
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AIChat;