import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Home, BookOpen, ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-subtle">
      <Card className="max-w-md w-full mx-4 shadow-elegant">
        <CardContent className="p-8 text-center space-y-6">
          <div className="gradient-hero p-4 rounded-full w-20 h-20 mx-auto flex items-center justify-center">
            <BookOpen className="h-10 w-10 text-white" />
          </div>
          
          <div className="space-y-2">
            <h1 className="text-6xl font-bold gradient-hero bg-clip-text text-transparent">
              404
            </h1>
            <h2 className="text-2xl font-semibold text-foreground">
              Page Not Found
            </h2>
            <p className="text-muted-foreground">
              The page you're looking for doesn't exist or has been moved.
            </p>
          </div>
          
          <div className="space-y-3">
            <Link to="/">
              <Button className="w-full gradient-primary">
                <Home className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
            <Button variant="outline" onClick={() => window.history.back()}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Go Back
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotFound;
