import { useEffect } from 'react';

const Dashboard = () => {
  useEffect(() => {
    // Redirect to external Moodle site
    window.location.href = 'https://www.oswaal360.com/local/structure/';
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-subtle">
      <div className="text-center">
        <h1 className="text-2xl font-semibold text-foreground mb-4">
          Redirecting to Moodle Dashboard...
        </h1>
        <p className="text-muted-foreground">
          If you are not redirected automatically, 
          <a 
            href="https://www.oswaal360.com/local/structure/" 
            className="text-primary hover:underline ml-1"
          >
            click here
          </a>
        </p>
      </div>
    </div>
  );
};

export default Dashboard;