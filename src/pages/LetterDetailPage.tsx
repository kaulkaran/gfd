import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Letter, getLetter, deleteLetter } from '../lib/supabase';
import LetterCard from '../components/LetterCard';
import { ArrowLeft, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../components/AuthWrapper';

const LetterDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [letter, setLetter] = useState<Letter | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchLetter = async () => {
      if (!id) return;
      
      setIsLoading(true);
      try {
        const letterData = await getLetter(id);
        setLetter(letterData);
      } catch (err) {
        console.error('Error fetching letter:', err);
        setError('Failed to load letter. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchLetter();
  }, [id]);
  
  const handleDelete = async () => {
    if (!id) return;
    
    try {
      const success = await deleteLetter(id);
      if (success) {
        navigate('/letters');
      } else {
        throw new Error('Failed to delete letter');
      }
    } catch (err) {
      console.error('Error deleting letter:', err);
      setError('Failed to delete letter. Please try again later.');
    }
  };
  
  if (isLoading) {
    return (
      <div className="text-center py-12">
        <div className="animate-pulse text-burgundy-700">
          <p className="font-serif text-xl">Loading letter...</p>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="bg-red-50 text-red-700 p-4 rounded-md">
        {error}
      </div>
    );
  }
  
  if (!letter) {
    return (
      <div className="text-center py-12 bg-stone-100 rounded-lg">
        <p className="text-stone-600 font-serif text-xl mb-2">Letter not found</p>
        <Link to="/letters" className="link">
          Return to all letters
        </Link>
      </div>
    );
  }
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-3xl mx-auto"
    >
      <div className="mb-6 flex justify-between items-center">
        <Link to="/letters" className="flex items-center text-burgundy-700 hover:text-burgundy-500">
          <ArrowLeft className="h-5 w-5 mr-2" />
          <span>Back to all letters</span>
        </Link>
        
        {user && (
          <div>
            {showDeleteConfirm ? (
              <div className="flex items-center space-x-3">
                <span className="text-stone-600 text-sm">Are you sure?</span>
                <button 
                  onClick={() => setShowDeleteConfirm(false)}
                  className="btn btn-secondary text-sm py-1"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleDelete}
                  className="btn bg-red-600 text-white hover:bg-red-700 text-sm py-1"
                >
                  Delete
                </button>
              </div>
            ) : (
              <button 
                onClick={() => setShowDeleteConfirm(true)}
                className="flex items-center text-red-600 hover:text-red-700"
              >
                <Trash2 className="h-5 w-5 mr-1" />
                <span>Delete</span>
              </button>
            )}
          </div>
        )}
      </div>
      
      <LetterCard letter={letter} isDetailed={true} />
    </motion.div>
  );
};

export default LetterDetailPage;