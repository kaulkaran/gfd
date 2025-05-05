import { useState, useEffect } from 'react';
import { Letter, getLetters } from '../lib/supabase';
import LetterCard from './LetterCard';
import { Search, Filter, X, Heart } from 'lucide-react';

const LetterList = () => {
  const [letters, setLetters] = useState<Letter[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);
  
  const fetchLetters = async () => {
    setIsLoading(true);
    setError('');
    try {
      const fetchedLetters = await getLetters();
      setLetters(fetchedLetters);
    } catch (err) {
      console.error('Error fetching letters:', err);
      setError('Failed to load letters. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    fetchLetters();
  }, []);
  
  const resetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
    setShowOnlyFavorites(false);
  };
  
  const filteredLetters = letters.filter(letter => {
    // Filter by search term
    const matchesSearch = searchTerm === '' || 
      letter.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      letter.content.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Filter by category
    const matchesCategory = selectedCategory === '' || letter.category === selectedCategory;
    
    // Filter by favorites
    const matchesFavorites = !showOnlyFavorites || letter.is_favorite;
    
    return matchesSearch && matchesCategory && matchesFavorites;
  });
  
  // Get unique categories from letters
  const categories = Array.from(new Set(letters.map(letter => letter.category)));
  
  if (isLoading) {
    return (
      <div className="text-center py-12">
        <div className="animate-pulse text-burgundy-700">
          <p className="font-serif text-xl">Loading letters...</p>
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
  
  return (
    <div>
      <div className="mb-8 space-y-4">
        <div className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search letters..."
            className="input pl-10 w-full"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-stone-400" />
          {searchTerm && (
            <button 
              onClick={() => setSearchTerm('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>
        
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center">
            <Filter className="h-5 w-5 text-stone-500 mr-2" />
            <span className="text-stone-700">Filters:</span>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(selectedCategory === category ? '' : category)}
                className={`px-3 py-1 text-sm rounded-full transition-colors ${
                  selectedCategory === category
                    ? 'bg-burgundy-600 text-white'
                    : 'bg-stone-200 text-stone-700 hover:bg-stone-300'
                }`}
              >
                {category}
              </button>
            ))}
            
            <button
              onClick={() => setShowOnlyFavorites(!showOnlyFavorites)}
              className={`px-3 py-1 text-sm rounded-full transition-colors flex items-center ${
                showOnlyFavorites
                  ? 'bg-red-500 text-white'
                  : 'bg-stone-200 text-stone-700 hover:bg-stone-300'
              }`}
            >
              <Heart className={`h-4 w-4 mr-1 ${showOnlyFavorites ? 'fill-current' : ''}`} />
              Favorites
            </button>
            
            {(searchTerm || selectedCategory || showOnlyFavorites) && (
              <button
                onClick={resetFilters}
                className="px-3 py-1 text-sm text-burgundy-600 hover:text-burgundy-800"
              >
                Clear All
              </button>
            )}
          </div>
        </div>
      </div>
      
      {filteredLetters.length === 0 ? (
        <div className="text-center py-12 bg-stone-100 rounded-lg">
          <p className="text-stone-600 font-serif text-xl mb-2">No letters found</p>
          <p className="text-stone-500">Try adjusting your search or filters</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredLetters.map(letter => (
            <LetterCard key={letter.id} letter={letter} />
          ))}
        </div>
      )}
    </div>
  );
};

export default LetterList;