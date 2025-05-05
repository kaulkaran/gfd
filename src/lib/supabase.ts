import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables. Please connect to Supabase.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Helper functions for letter operations
export type Letter = {
  id: string;
  created_at: string;
  title: string;
  content: string;
  category: string;
  is_favorite: boolean;
};

export const getLetters = async (): Promise<Letter[]> => {
  const { data, error } = await supabase
    .from('letters')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error('Error fetching letters:', error);
    throw error;
  }
  
  return data || [];
};

export const getLetter = async (id: string): Promise<Letter | null> => {
  const { data, error } = await supabase
    .from('letters')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) {
    console.error('Error fetching letter:', error);
    throw error;
  }
  
  return data;
};

export const createLetter = async (letter: Omit<Letter, 'id' | 'created_at'>): Promise<Letter | null> => {
  const { data, error } = await supabase
    .from('letters')
    .insert([letter])
    .select()
    .single();
  
  if (error) {
    console.error('Error creating letter:', error);
    throw error;
  }
  
  return data;
};

export const updateLetter = async (id: string, updates: Partial<Letter>): Promise<Letter | null> => {
  const { data, error } = await supabase
    .from('letters')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
  
  if (error) {
    console.error('Error updating letter:', error);
    throw error;
  }
  
  return data;
};

export const deleteLetter = async (id: string): Promise<boolean> => {
  const { error } = await supabase
    .from('letters')
    .delete()
    .eq('id', id);
  
  if (error) {
    console.error('Error deleting letter:', error);
    throw error;
  }
  
  return true;
};

// Auth helpers
export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  
  if (error) {
    throw error;
  }
  
  return data;
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  
  if (error) {
    throw error;
  }
};

export const getCurrentUser = async () => {
  const { data: { session }, error } = await supabase.auth.getSession();
  
  if (error) {
    throw error;
  }
  
  return session?.user;
};