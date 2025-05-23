import { motion } from 'framer-motion';
import LetterForm from '../components/LetterForm';

const WriteLetterPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-3xl mx-auto"
    >
      <div className="mb-8 text-center">
        <h1 className="font-serif text-3xl md:text-4xl font-bold text-burgundy-800 mb-4">
          Write a Letter to Asmita
        </h1>
        <p className="text-stone-600 max-w-xl mx-auto">
          Express your feelings, share memories, or make promises. Your words will be preserved forever in this digital love letter collection.
        </p>
      </div>
      
      <LetterForm />
    </motion.div>
  );
};

export default WriteLetterPage;
