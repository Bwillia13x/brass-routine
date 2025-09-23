import { useLocation, NavLink, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Home, Search } from 'lucide-react';
import Layout from '../components/Layout';
import { Button } from '../components/ui/button';

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-2xl mx-auto px-4">
          <div className="mb-8">
            <div className="w-24 h-24 mx-auto mb-6 bg-gradient-brass rounded-full flex items-center justify-center">
              <Search className="w-12 h-12 text-coal" />
            </div>
            
            <h1 className="font-display text-6xl font-bold text-brass mb-4">404</h1>
            <h2 className="text-display mb-6">Page Not Found</h2>
            <p className="text-body-large mb-8">
              The page you're looking for doesn't exist. Perhaps you'd like to 
              explore our services or book an appointment instead?
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                className="btn-brass"
                onClick={() => navigate('/')}
              >
                <Home className="w-4 h-4 mr-2" />
                Return Home
              </Button>
              <Button
                variant="outline"
                className="btn-outline-brass"
                onClick={() => navigate('/services')}
              >
                View Services
              </Button>
            </div>
            
            <p className="text-steel text-sm">
              Or <NavLink to="/book" className="text-brass hover:text-brass/80 underline">book an appointment</NavLink> to experience our calibre first-hand.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
