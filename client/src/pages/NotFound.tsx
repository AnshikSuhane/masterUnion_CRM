import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { AlertCircle } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <Layout>
      <div className="flex-1 flex items-center justify-center py-20">
        <div className="text-center max-w-md">
          <div className="flex justify-center mb-6">
            <AlertCircle className="w-16 h-16 text-destructive" />
          </div>
          <h1 className="text-4xl font-bold mb-2">404</h1>
          <p className="text-xl text-foreground mb-2">Page not found</p>
          <p className="text-muted-foreground mb-8">
            Sorry, the page you're looking for doesn't exist. It might have been
            moved or deleted.
          </p>
          <Link to="/">
            <Button className="bg-primary hover:bg-primary-600">
              Return to Home
            </Button>
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
