/*
  # Create letters table with authentication

  1. New Tables
    - `letters`
      - `id` (uuid, primary key)
      - `created_at` (timestamp)
      - `title` (text)
      - `content` (text)
      - `category` (text)
      - `is_favorite` (boolean)

  2. Security
    - Enable RLS on `letters` table
    - Add policies for:
      - Anyone can read letters
      - Only authenticated users can create/update/delete letters
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

-- Allow anyone to read letters
CREATE POLICY "Anyone can read letters"
  ON letters
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Allow authenticated users to create letters
CREATE POLICY "Users can create letters"
  ON letters
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Allow authenticated users to update letters
CREATE POLICY "Only authenticated users can update letters"
  ON letters
  FOR UPDATE
  TO authenticated
  USING (true);

-- Allow authenticated users to delete letters
CREATE POLICY "Only authenticated users can delete letters"
  ON letters
  FOR DELETE
  TO authenticated
  USING (true);