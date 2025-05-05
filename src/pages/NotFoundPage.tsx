import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center py-12 px-4 text-center">
      <Heart className="h-16 w-16 text-burgundy-300 mb-6" />
      <h1 className="font-serif text-4xl md:text-5xl font-bold text-burgundy-800 mb-4">
        Page Not Found
      </h1>
      <p className="text-stone-600 max-w-md mx-auto mb-8">
        The page you are looking for has gone missing, just like how my heart goes missing when you're not around.
      </p>
      <Link to="/" className="btn btn-primary px-8 py-3">
        Return Home
      </Link>
    </div>
  );
};

export default NotFoundPage;