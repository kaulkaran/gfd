/*
  # Letters table and policies

  1. New Tables
    - `letters`
      - `id` (uuid, primary key)
      - `created_at` (timestamptz)
      - `title` (text)
      - `content` (text)
      - `category` (text)
      - `is_favorite` (boolean)
  2. Security
    - Enable RLS on `letters` table
    - Add policies for CRUD operations
*/

-- Create letters table if it doesn't exist
CREATE TABLE IF NOT EXISTS letters (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  title text NOT NULL,
  content text NOT NULL,
  category text DEFAULT 'love',
  is_favorite boolean DEFAULT false
);

-- Enable RLS
ALTER TABLE letters ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DO $$ 
BEGIN
  DROP POLICY IF EXISTS "Anyone can read letters" ON letters;
  DROP POLICY IF EXISTS "Users can create letters" ON letters;
  DROP POLICY IF EXISTS "Only authenticated users can update letters" ON letters;
  DROP POLICY IF EXISTS "Only authenticated users can delete letters" ON letters;
END $$;

-- Recreate policies
CREATE POLICY "Anyone can read letters"
  ON letters
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Users can create letters"
  ON letters
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Only authenticated users can update letters"
  ON letters
  FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Only authenticated users can delete letters"
  ON letters
  FOR DELETE
  TO authenticated
  USING (true);