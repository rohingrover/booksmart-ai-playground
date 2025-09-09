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
    <div className="grid lg:grid-cols-4 gap-6 h-[calc(100vh-200px)] animate-fade-in">
      {/* Sidebar - Book Selection & Suggested Questions */}
      <div className="lg:col-span-1 space-y-6">
        {/* Book Selection Dropdown */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <BookOpen className="h-5 w-5 mr-2 text-primary" />
              Select Book
            </CardTitle>
          </CardHeader>
          <CardContent>
            <select
              value={selectedBook}
              onChange={(e) => setSelectedBook(e.target.value)}
              className="w-full p-3 border-2 border-border rounded-xl bg-background text-foreground font-medium focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-smooth hover:border-primary/30 shadow-sm"
            >
              {books.map((book) => (
                <option key={book.id} value={book.title}>
                  {book.title} ({book.board})
                </option>
              ))}
            </select>
          </CardContent>
        </Card>

        {/* Suggested Questions */}
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