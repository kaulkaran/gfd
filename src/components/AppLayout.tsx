import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Heart, LogOut, Menu, Moon, PenSquare, Search, Sun, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useAuth } from './AuthWrapper';
import { signOut } from '../lib/supabase';
import { motion } from 'framer-motion';

type AppLayoutProps = {
  children: ReactNode;
};

const AppLayout = ({ children }: AppLayoutProps) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useAuth();
  const location = useLocation();

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    // Would implement actual dark mode toggle with classes/context
  };

  const handleSignOut = async () => {
    await signOut();
    window.location.href = '/';
  };

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  return (
    <div className={`min-h-screen flex flex-col ${isDarkMode ? 'bg-stone-900 text-stone-200' : 'bg-stone-50 text-stone-800'}`}>
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-sm border-b border-stone-200 shadow-sm">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <Heart className="h-6 w-6 text-burgundy-700 mr-2" />
            <span className="font-serif text-xl font-bold text-burgundy-700">Letters to Asmita</span>
          </Link>
          
          {/* Mobile menu button */}
          <button 
            className="md:hidden p-2" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
          
          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center space-x-4">
            <Link to="/" className="nav-link px-3 py-2 rounded-md hover:bg-stone-100">Home</Link>
            <Link to="/letters" className="nav-link px-3 py-2 rounded-md hover:bg-stone-100">All Letters</Link>
            {user && (
              <Link to="/write" className="btn btn-primary flex items-center">
                <PenSquare className="h-4 w-4 mr-2" />
                Write Letter
              </Link>
            )}
            <button 
              onClick={toggleDarkMode} 
              className="p-2 rounded-full hover:bg-stone-100"
              aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            {user && (
              <button 
                onClick={handleSignOut}
                className="p-2 rounded-full hover:bg-stone-100 text-stone-500"
                aria-label="Sign out"
              >
                <LogOut className="h-5 w-5" />
              </button>
            )}
          </nav>
        </div>
        
        {/* Mobile menu */}
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden border-t border-stone-200 bg-white"
          >
            <div className="px-4 py-3 space-y-2">
              <Link to="/" className="block py-2 px-3 rounded-md hover:bg-stone-100">Home</Link>
              <Link to="/letters" className="block py-2 px-3 rounded-md hover:bg-stone-100">All Letters</Link>
              {user && (
                <Link to="/write" className="block py-2 px-3 rounded-md hover:bg-stone-100">
                  Write Letter
                </Link>
              )}
              <div className="flex justify-between pt-2 border-t border-stone-200 mt-2">
                <button 
                  onClick={toggleDarkMode} 
                  className="flex items-center py-2 px-3 rounded-md hover:bg-stone-100"
                >
                  {isDarkMode ? <Sun className="h-5 w-5 mr-2" /> : <Moon className="h-5 w-5 mr-2" />}
                  {isDarkMode ? "Light Mode" : "Dark Mode"}
                </button>
                {user && (
                  <button 
                    onClick={handleSignOut}
                    className="flex items-center py-2 px-3 rounded-md hover:bg-stone-100 text-stone-500"
                  >
                    <LogOut className="h-5 w-5 mr-2" />
                    Sign Out
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </header>
      
      <main className="flex-grow container mx-auto px-4 py-6">
        {children}
      </main>
      
      <footer className="bg-white border-t border-stone-200 py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-stone-500 text-sm">
              From Karan Kaul with Love
            </p>
            <div className="flex items-center mt-4 md:mt-0">
              <Heart className="h-4 w-4 text-burgundy-500 mr-2" />
              <span className="text-stone-500 text-sm">Created with love, 2025</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AppLayout;
