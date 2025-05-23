import { motion } from 'framer-motion';
import { Heart, Calendar, Tag } from 'lucide-react';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import { Letter, updateLetter } from '../lib/supabase';
import { useState } from 'react';

type LetterCardProps = {
  letter: Letter;
  isDetailed?: boolean;
};

const LetterCard = ({ letter, isDetailed = false }: LetterCardProps) => {
  const [isFavorite, setIsFavorite] = useState(letter.is_favorite);
  
  const toggleFavorite = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const newValue = !isFavorite;
    setIsFavorite(newValue);
    
    // Update in database
    await updateLetter(letter.id, { is_favorite: newValue });
  };
  
  const getExcerpt = (content: string) => {
    // Remove HTML tags and get plain text
    const plainText = content.replace(/<[^>]*>/g, '');
    return plainText.length > 150 ? `${plainText.substring(0, 150)}...` : plainText;
  };
  
  const categoryColors: Record<string, string> = {
    'memory': 'bg-blue-100 text-blue-800',
    'love': 'bg-burgundy-100 text-burgundy-800',
    'future': 'bg-emerald-100 text-emerald-800',
    'gratitude': 'bg-amber-100 text-amber-800',
    'promise': 'bg-purple-100 text-purple-800',
    'default': 'bg-stone-100 text-stone-800',
  };
  
  const categoryColor = categoryColors[letter.category] || categoryColors.default;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`letter-card group ${isDetailed ? 'p-8' : 'p-6 hover:shadow-lg transition-shadow'}`}
    >
      <div className="flex justify-between items-start mb-3">
        <h3 className="font-serif text-xl md:text-2xl font-bold text-burgundy-800">{letter.title}</h3>
        <button 
          onClick={toggleFavorite}
          className={`p-2 rounded-full transition-colors ${isFavorite ? 'text-red-500' : 'text-stone-400 hover:text-red-500'}`}
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          <Heart className={`h-5 w-5 ${isFavorite ? 'fill-current' : ''}`} />
        </button>
      </div>
      
      <div className="flex items-center space-x-4 text-stone-500 text-sm mb-4">
        <div className="flex items-center">
          <Calendar className="h-4 w-4 mr-1" />
          <span>{format(new Date(letter.created_at), 'MMMM d, yyyy')}</span>
        </div>
        {letter.category && (
          <div className={`flex items-center px-2 py-1 rounded-full text-xs ${categoryColor}`}>
            <Tag className="h-3 w-3 mr-1" />
            <span className="capitalize">{letter.category}</span>
          </div>
        )}
      </div>
      
      <div className="letter-content">
        {isDetailed ? (
          <div dangerouslySetInnerHTML={{ __html: letter.content }} />
        ) : (
          <>
            <p>{getExcerpt(letter.content)}</p>
            <Link to={`/letters/${letter.id}`} className="block mt-4 link">
              Read more
            </Link>
          </>
        )}
      </div>
    </motion.div>
  );
};

export default LetterCard;
