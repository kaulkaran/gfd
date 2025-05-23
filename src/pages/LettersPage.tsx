import { motion } from 'framer-motion';
import LetterList from '../components/LetterList';

const LettersPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-5xl mx-auto">
        <div className="mb-10 text-center">
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-burgundy-800 mb-4">
            Letters to Asmita
          </h1>
          <p className="text-stone-600 max-w-3xl mx-auto">
            A collection of heartfelt messages, memories, and promises from Karan to Asmita. Each letter captures a moment in time, preserved forever.
          </p>
        </div>
        
        <LetterList />
      </div>
    </motion.div>
  );
};

export default LettersPage;
