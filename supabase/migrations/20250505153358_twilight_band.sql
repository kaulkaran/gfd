/*
  # Create letters table

  1. New Tables
    - `letters`
      - `id` (uuid, primary key)
      - `created_at` (timestamp)
      - `title` (text, not null)
      - `content` (text, not null)
      - `category` (text)
      - `is_favorite` (boolean)

  2. Security
    - Enable RLS on `letters` table
    - Add policy for authenticated users to crud their own data
*/

CREATE TABLE IF NOT EXISTS letters (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  title text NOT NULL,
  content text NOT NULL,
  category text DEFAULT 'love',
  is_favorite boolean DEFAULT false
);

ALTER TABLE letters ENABLE ROW LEVEL SECURITY;

-- Policy for authenticated users to create letters
CREATE POLICY "Users can create letters"
  ON letters
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Policy for authenticated users to read letters
CREATE POLICY "Anyone can read letters"
  ON letters
  FOR SELECT
  TO authenticated, anon
  USING (true);

-- Policy for authenticated users to update letters
CREATE POLICY "Only authenticated users can update letters"
  ON letters
  FOR UPDATE
  TO authenticated
  USING (true);

-- Policy for authenticated users to delete letters
CREATE POLICY "Only authenticated users can delete letters"
  ON letters
  FOR DELETE
  TO authenticated
  USING (true);