import Hero from '../components/Hero';
import { motion } from 'framer-motion';
import { Calendar, Heart, PenSquare, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const features = [
    {
      icon: <PenSquare className="h-8 w-8 text-burgundy-600" />,
      title: 'Write Letters',
      description: 'Express your feelings with beautiful, formatted letters that are saved forever.',
    },
    {
      icon: <Heart className="h-8 w-8 text-burgundy-600" />,
      title: 'Mark Favorites',
      description: 'Highlight your most cherished letters to find them easily later.',
    },
    {
      icon: <Calendar className="h-8 w-8 text-burgundy-600" />,
      title: 'Daily Memories',
      description: 'Create a chronological journal of your relationship with dated entries.',
    },
    {
      icon: <Search className="h-8 w-8 text-burgundy-600" />,
      title: 'Find Memories',
      description: 'Search through all your letters to find specific moments and memories.',
    },
  ];

  return (
    <div>
      <Hero />
      
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="py-16 bg-stone-100"
      >
        <div className="container mx-auto px-4">
          <h2 className="font-serif text-3xl md:text-4xl text-burgundy-800 text-center mb-12">
            A Digital Love Story
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 * index, duration: 0.5 }}
                className="bg-white p-6 rounded-lg shadow-elegant text-center"
              >
                <div className="flex justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="font-serif text-xl font-bold text-burgundy-700 mb-2">
                  {feature.title}
                </h3>
                <p className="text-stone-600">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link to="/letters" className="btn btn-primary px-8 py-3">
              Explore Letters
            </Link>
          </div>
        </div>
      </motion.section>
      
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="md:w-1/2">
              <img 
                src="https://images.pexels.com/photos/6068960/pexels-photo-6068960.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                alt="Love letters concept" 
                className="rounded-lg shadow-elegant"
              />
            </div>
            <div className="md:w-1/2">
              <h2 className="font-serif text-3xl md:text-4xl text-burgundy-800 mb-6">
                From Karan to Birangana
              </h2>
              <p className="text-stone-700 mb-6 leading-relaxed">
                This digital collection of letters represents my enduring love and commitment. Each letter is a piece of my heart, preserved forever in this special space created just for you.
              </p>
              <p className="text-stone-700 leading-relaxed">
                Browse through memories, promises, and declarations of love – all in one beautiful place that grows with our relationship.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;