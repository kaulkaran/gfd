import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Heart, PenSquare } from 'lucide-react';
import { useAuth } from './AuthWrapper';

const Hero = () => {
  const { user } = useAuth();
  
  return (
    <section className="py-12 md:py-20 px-4">
      <div className="max-w-5xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold font-serif text-burgundy-800 mb-6">
            Letters to Birangana
          </h1>
          
          <div className="flex justify-center mb-8">
            <Heart className="h-10 w-10 text-burgundy-500" />
          </div>
          
          <p className="text-xl md:text-2xl text-stone-700 max-w-3xl mx-auto mb-8 leading-relaxed font-serif">
            A digital collection of love, memories, and promises from Karan Kaul to Birangana
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/letters" className="btn btn-primary px-8 py-3 text-lg">
              Read Letters
            </Link>
            {user ? (
              <Link to="/write" className="btn btn-gold px-8 py-3 text-lg flex items-center justify-center">
                <PenSquare className="h-5 w-5 mr-2" />
                Write a Letter
              </Link>
            ) : (
              <Link to="/login" className="btn btn-gold px-8 py-3 text-lg">
                Sign In to Write
              </Link>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;