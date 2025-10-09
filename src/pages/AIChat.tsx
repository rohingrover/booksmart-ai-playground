import { useState, useEffect, useRef } from 'react';
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
import { useParams, useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

async function fetchMyBooks({ keyword = "", board_id = 0, subject_id = 0 }) {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Token not found");

  const response = await fetch(`${API_BASE_URL}/api/my-books`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ keyword, board_id, subject_id }),
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Failed to fetch books");
  return data;
}

const AIChat = () => {
  const [selectedBook, setSelectedBook] = useState<string>("");
  const [selectedBookTitle, setSelectedBookTitle] = useState<string>("");
  const [books, setBooks] = useState<any[]>([]);
  const [loadingBooks, setLoadingBooks] = useState<boolean>(true);

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<any[]>([
    {
      id: 1,
      text: "Hello! I'm your AI tutor. I'm here to help you understand concepts, solve problems, and clarify doubts. What would you like to learn about today? 📚",
      isBot: true,
      timestamp: new Date(),
    },
  ]);
  const [statusText, setStatusText] = useState<string | null>(null);
  const [isStreaming, setIsStreaming] = useState(false);

  const { bookId } = useParams();
  const navigate = useNavigate();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadBooks = async () => {
      try {
        setLoadingBooks(true);
        const data = await fetchMyBooks({});
        if (data.length > 0) {
          setBooks(data);
          if (bookId) {
            const selected = data.find((b: any) => String(b.id) === String(bookId));
            if (selected) {
              setSelectedBook(String(selected.id));
              setSelectedBookTitle(selected.title);
            }
          } else {
            setSelectedBook(String(data[0].id));
            setSelectedBookTitle(data[0].title);
          }
        }
      } catch (error) {
        console.error("Error loading books:", error);
      } finally {
        setLoadingBooks(false);
      }
    };
    loadBooks();
  }, [bookId]);

  const scrollToBottom = () => {
    setTimeout(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      }
    }, 100);
  };

  const handleBookChange = (bookId: string) => {
    setSelectedBook(bookId);
    const book = books.find((b) => String(b.id) === bookId);
    if (book) {
      setSelectedBookTitle(book.title);
      navigate(`/chat/${book.id}`);
    }
  };

  const handleSendMessage = async () => {
    if (!message.trim() || !selectedBook) return;

    const userMsg = {
      id: messages.length + 1,
      text: message,
      isBot: false,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMsg]);
    setMessage("");
    setStatusText("Thinking...");
    setIsStreaming(true);

    const botMsg = {
      id: messages.length + 2,
      text: "",
      isBot: true,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, botMsg]);
    scrollToBottom();

    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Token not found");

      const response = await fetch(`${API_BASE_URL}/api/chat`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          book_id: String(selectedBook),
          chat_type: "ask",
          message,
          stream: true,
        }),
      });

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { value, done } = await reader!.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const parts = buffer.split("\n\n");
        buffer = parts.pop() || "";

        for (let part of parts) {
          part = part.trim();
          if (!part.startsWith("data:")) continue;

          const dataStr = part.replace(/^data:\s*/, "");
          if (dataStr === "[DONE]") {
            setStatusText(null);
            setIsStreaming(false);
            return;
          }

          try {
            const dataObj = JSON.parse(dataStr);
            if (dataObj.type === "status") {
              setStatusText(dataObj.content);
            } else if (dataObj.type === "content") {
              const text = dataObj.content;
              setMessages(prev => {
                const updated = [...prev];
                updated[updated.length - 1].text += text;
                return updated;
              });
              scrollToBottom();
            } else if (dataObj.type === "final_response") {
              setStatusText("Done");
              setTimeout(() => setStatusText(null), 500);
            }
          } catch (e) {
            if (!dataStr.startsWith("[DONE]")) {
              console.warn("Failed to parse SSE chunk:", dataStr);
            }
          }
        }
      }
    } catch (error) {
      console.error("Chat API error:", error);
      setMessages(prev => {
        const updated = [...prev];
        updated[updated.length - 1].text = "❌ Failed to get response from AI.";
        return updated;
      });
    } finally {
      setIsStreaming(false);
      setStatusText(null);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSendMessage();
  };

  const bookQuestions = {
    "Mathematics Class 10": [
      "What are quadratic equations?",
      "Explain the Pythagorean theorem",
      "How to solve linear equations?",
    ],
    "Science Class 9": [
      "What is photosynthesis?",
      "Explain Newton's laws of motion",
      "How does sound travel?",
    ],
  };

  const getBookQuestions = (bookTitle: string) =>
    bookQuestions[bookTitle as keyof typeof bookQuestions] || bookQuestions["Mathematics Class 10"];

  const handleQuestionClick = (question: string) => setMessage(question);

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
            {loadingBooks ? (
              <p className="text-sm text-muted-foreground">Loading books...</p>
            ) : books.length > 0 ? (
              <Select
                value={selectedBook}
                onValueChange={(value) => handleBookChange(value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Choose a book" />
                </SelectTrigger>
                <SelectContent className="bg-background z-50 border shadow-lg">
                  {books.map((book) => (
                    <SelectItem
                      key={book.id}
                      value={String(book.id)}
                    >
                      <div className="flex items-center space-x-2">
                        <BookOpen className="h-4 w-4" />
                        <span>{book.title}</span>
                        {book.board_name && (
                          <Badge variant="secondary" className="ml-2">
                            {book.board_name}
                          </Badge>
                        )}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : (
              <p className="text-sm text-muted-foreground">
                No books found for your account.
              </p>
            )}
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
            {loadingBooks ? (
              <p className="text-sm text-muted-foreground">Loading books...</p>
            ) : books.length > 0 ? (
              <Select
                value={selectedBook}
                onValueChange={(value) => handleBookChange(value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Choose a book" />
                </SelectTrigger>
                <SelectContent className="bg-background z-50 border shadow-lg">
                  {books.map((book) => (
                    <SelectItem
                      key={book.id}
                      value={String(book.id)}
                    >
                      <div className="flex items-center space-x-2">
                        <BookOpen className="h-4 w-4" />
                        <span>{book.title}</span>
                        {book.board_name && (
                          <Badge variant="secondary" className="ml-2">
                            {book.board_name}
                          </Badge>
                        )}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : (
              <p className="text-sm text-muted-foreground">
                No books found for your account.
              </p>
            )}
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <HelpCircle className="h-5 w-5 mr-2 text-primary" />
              Quick Questions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-80">
              {getBookQuestions(selectedBookTitle).map((q, i) => (
                <div
                  key={i}
                  onClick={() => handleQuestionClick(q)}
                  className="p-3 border rounded-md mb-2 cursor-pointer hover:bg-accent transition"
                >
                  <div className="flex items-start space-x-2">
                    <Lightbulb className="h-4 w-4 text-yellow-500 mt-1" />
                    <span>{q}</span>
                  </div>
                </div>
              ))}
            </ScrollArea>
          </CardContent>
        </Card>
      </div>

      {/* Main Chat */}
      <div className="lg:col-span-3 flex flex-col">
        <Card className="h-full shadow-elegant flex flex-col">
          <CardHeader className="gradient-primary text-white">
            <CardTitle className="flex items-center">
              <Brain className="h-6 w-6 mr-2" />
              AI Chat - {selectedBookTitle}
              <Sparkles className="h-5 w-5 ml-2 animate-glow" />
            </CardTitle>
          </CardHeader>

          <CardContent className="flex flex-col flex-1 p-0">
            <ScrollArea className="flex-1 p-4" ref={scrollRef}>
              <div className="space-y-4">
                {messages.map((msg) => (
                  <div key={msg.id} className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}>
                    <div
                      className={`max-w-[85%] p-3 rounded-lg ${
                        msg.isBot ? 'bg-accent text-accent-foreground' : 'gradient-primary text-white'
                      }`}
                    >
                      <div className="flex items-start space-x-2">
                        {msg.isBot && <MessageCircle className="h-4 w-4 mt-1" />}
                        <div className="text-sm leading-relaxed prose prose-sm dark:prose-invert max-w-none">
                          <ReactMarkdown remarkPlugins={[remarkGfm]}>
                            {msg.text}
                          </ReactMarkdown>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {statusText && (
                  <div className="flex justify-start">
                    <div className="bg-gray-200 text-gray-600 px-3 py-2 rounded-xl animate-pulse">
                      {statusText}
                      <span className="ml-1 animate-bounce">...</span>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>

            <div className="p-3 border-t bg-muted/30">
              <div className="flex space-x-2">
                <Input
                  placeholder="Ask me anything about your book..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="flex-1"
                  disabled={isStreaming}
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!message.trim() || isStreaming}
                  className="gradient-primary"
                >
                  <Send className="h-4 w-4" />
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
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AIChat;
