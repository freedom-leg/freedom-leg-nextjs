/*
  # Create Injuries Table for Freedom Leg Conditions

  ## Overview
  This migration creates a comprehensive injuries table to store detailed information
  about medical conditions treated by Freedom Leg. The table supports quiz integration,
  SEO-optimized landing pages, and searchable condition listings.

  ## New Tables
  - `injuries`
    - `id` (uuid, primary key) - Unique identifier
    - `injury_name` (text, required) - Medical/clinical term for the condition
    - `common_name` (text, required) - Layman's term in parentheses
    - `slug` (text, unique, required) - URL-friendly identifier
    - `category` (text, required) - Groups injuries: foot-ankle, lower-leg, knee, other
    - `body_region` (text, required) - Specific body area: foot, ankle, lower-leg, knee
    - `short_description` (text) - Brief 1-2 sentence description
    - `non_weight_bearing_duration` (text) - Expected duration (e.g., "6-8 weeks")
    - `freedom_leg_suitable` (boolean, default true) - Whether Freedom Leg is recommended
    - `key_benefit_one_liner` (text) - Single compelling benefit
    - `full_description` (text) - Comprehensive condition explanation
    - `how_freedom_leg_helps` (text) - Detailed explanation of treatment benefits
    - `weight_bearing_progression` (text) - Recovery timeline details
    - `recovery_comparison` (text) - Comparison with traditional treatment
    - `ideal_candidate_description` (text) - Who benefits most
    - `contraindications` (text) - Important warnings or limitations
    - `faq_items` (jsonb) - Array of {question, answer} objects
    - `related_injury_ids` (uuid[]) - Array of related injury IDs for cross-linking
    - `seo_title` (text) - Optimized page title
    - `seo_description` (text) - Meta description for search engines
    - `meta_keywords` (text[]) - Array of keywords including variations
    - `search_keywords` (text[]) - Searchable terms including misspellings
    - `is_active` (boolean, default true) - Whether to display this injury
    - `display_order` (integer, default 0) - Sort order for lists
    - `created_at` (timestamptz) - Record creation timestamp
    - `updated_at` (timestamptz) - Last update timestamp

  ## Indexes
  - Primary key on `id`
  - Unique index on `slug`
  - Index on `category` for filtering
  - Index on `is_active` for active records
  - GIN index on `search_keywords` for full-text search

  ## Security
  - Enable RLS on `injuries` table
  - Add policy for public read access to active injuries
  - No write access from public (admin only via service role)

  ## Notes
  - Supports both quiz integration and standalone landing pages
  - Hybrid terminology approach captures both medical and common searches
  - Extensible for future admin panel integration
  - JSON fields allow flexible FAQ and metadata storage
*/

-- Create injuries table
CREATE TABLE IF NOT EXISTS injuries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  injury_name text NOT NULL,
  common_name text NOT NULL,
  slug text UNIQUE NOT NULL,
  category text NOT NULL CHECK (category IN ('foot-ankle', 'lower-leg', 'knee', 'other')),
  body_region text NOT NULL CHECK (body_region IN ('foot', 'ankle', 'lower-leg', 'knee', 'multiple')),
  short_description text,
  non_weight_bearing_duration text,
  freedom_leg_suitable boolean DEFAULT true,
  key_benefit_one_liner text,
  full_description text,
  how_freedom_leg_helps text,
  weight_bearing_progression text,
  recovery_comparison text,
  ideal_candidate_description text,
  contraindications text,
  faq_items jsonb DEFAULT '[]'::jsonb,
  related_injury_ids uuid[] DEFAULT ARRAY[]::uuid[],
  seo_title text,
  seo_description text,
  meta_keywords text[] DEFAULT ARRAY[]::text[],
  search_keywords text[] DEFAULT ARRAY[]::text[],
  is_active boolean DEFAULT true,
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_injuries_category ON injuries(category);
CREATE INDEX IF NOT EXISTS idx_injuries_is_active ON injuries(is_active);
CREATE INDEX IF NOT EXISTS idx_injuries_display_order ON injuries(display_order);
CREATE INDEX IF NOT EXISTS idx_injuries_search_keywords ON injuries USING GIN(search_keywords);

-- Enable Row Level Security
ALTER TABLE injuries ENABLE ROW LEVEL SECURITY;

-- Policy: Public can read active injuries
CREATE POLICY "Public can read active injuries"
  ON injuries
  FOR SELECT
  TO public
  USING (is_active = true);

-- Policy: No public insert (admin only via service role)
CREATE POLICY "No public insert"
  ON injuries
  FOR INSERT
  TO public
  WITH CHECK (false);

-- Policy: No public update (admin only via service role)
CREATE POLICY "No public update"
  ON injuries
  FOR UPDATE
  TO public
  USING (false);

-- Policy: No public delete (admin only via service role)
CREATE POLICY "No public delete"
  ON injuries
  FOR DELETE
  TO public
  USING (false);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_injuries_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically update updated_at
CREATE TRIGGER injuries_updated_at
  BEFORE UPDATE ON injuries
  FOR EACH ROW
  EXECUTE FUNCTION update_injuries_updated_at();