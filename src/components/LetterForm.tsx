import { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { createLetter } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';

const categories = [
  { id: 'love', name: 'Love Note' },
  { id: 'memory', name: 'Memory' },
  { id: 'future', name: 'Future Plans' },
  { id: 'gratitude', name: 'Gratitude' },
  { id: 'promise', name: 'Promise' },
];

const LetterForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('love');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) {
      setError('Please add a title for your letter');
      return;
    }
    
    if (!content.trim() || content === '<p><br></p>') {
      setError('Please write something in your letter');
      return;
    }
    
    setIsSubmitting(true);
    setError('');
    
    try {
      const letter = await createLetter({
        title,
        content,
        category,
        is_favorite: false,
      });
      
      if (letter) {
        navigate(`/letters/${letter.id}`);
      } else {
        throw new Error('Failed to create letter');
      }
    } catch (err) {
      console.error('Error saving letter:', err);
      setError('Failed to save your letter. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-50 text-red-700 p-4 rounded-md">
          {error}
        </div>
      )}
      
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-stone-700 mb-1">
          Letter Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="My dearest Birangana..."
          className="input w-full"
          disabled={isSubmitting}
        />
      </div>
      
      <div>
        <label htmlFor="category" className="block text-sm font-medium text-stone-700 mb-1">
          Category
        </label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="input w-full"
          disabled={isSubmitting}
        >
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>
      
      <div>
        <label htmlFor="content" className="block text-sm font-medium text-stone-700 mb-1">
          Letter Content
        </label>
        <ReactQuill
          theme="snow"
          value={content}
          onChange={setContent}
          placeholder="Express your feelings to Birangana..."
          modules={{
            toolbar: [
              [{ 'header': [1, 2, 3, false] }],
              ['bold', 'italic', 'underline', 'strike'],
              [{ 'color': [] }, { 'background': [] }],
              [{ 'align': [] }],
              ['blockquote'],
              [{ 'list': 'ordered'}, { 'list': 'bullet' }],
              ['link'],
              ['clean']
            ],
          }}
          formats={[
            'header',
            'bold', 'italic', 'underline', 'strike',
            'color', 'background',
            'align',
            'blockquote',
            'list', 'bullet',
            'link',
          ]}
          className="bg-white rounded-md border border-stone-300"
        />
      </div>
      
      <div className="flex justify-end pt-4">
        <button
          type="button"
          onClick={() => navigate('/letters')}
          className="btn btn-secondary mr-4"
          disabled={isSubmitting}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="btn btn-primary"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Saving...' : 'Save Letter'}
        </button>
      </div>
    </form>
  );
};

export default LetterForm;