/*
  # Fix Security Issues

  ## 1. Remove Unused Indexes
  Removes the following unused indexes that are consuming storage without providing benefit:
  
  **Injuries Table:**
  - `idx_injuries_category` - Not being used by queries
  - `idx_injuries_is_active` - Not being used by queries
  - `idx_injuries_display_order` - Not being used by queries
  - `idx_injuries_search_keywords` - Not being used by queries
  
  **Page Visits Table:**
  - `idx_page_visits_session` - Not being used by queries
  - `idx_page_visits_variant` - Not being used by queries
  - `idx_page_visits_created` - Not being used by queries
  
  **User Interactions Table:**
  - `idx_interactions_session` - Not being used by queries
  - `idx_interactions_variant` - Not being used by queries
  - `idx_interactions_type` - Not being used by queries
  - `idx_interactions_created` - Not being used by queries
  
  **Conversions Table:**
  - `idx_conversions_session` - Not being used by queries
  - `idx_conversions_variant` - Not being used by queries
  - `idx_conversions_type` - Not being used by queries
  - `idx_conversions_created` - Not being used by queries

  ## 2. Fix Multiple Permissive RLS Policies
  Resolves overlapping permissive policies by consolidating them into proper restrictive policies:
  
  **Tables Affected:**
  - `faqs` - Had overlapping SELECT policies for authenticated users
  - `hero_slides` - Had overlapping SELECT policies for authenticated users
  - `how_it_works_slides` - Had overlapping SELECT policies for authenticated users
  - `reviews` - Had overlapping SELECT policies for authenticated users
  
  **Solution:**
  Replace the broad "ALL" policy for authenticated users with specific policies for INSERT, UPDATE, DELETE only.
  Keep the public SELECT policy for published/active content and add a separate SELECT policy for authenticated users.

  ## 3. Fix Function Search Path
  Secures the `update_injuries_updated_at` function by setting an immutable search_path:
  
  **Issue:** Function has a role-mutable search_path which could allow privilege escalation
  **Solution:** Set search_path to empty string or specific schema to prevent search_path manipulation attacks
*/

-- =====================================================
-- 1. DROP UNUSED INDEXES
-- =====================================================

-- Injuries table indexes
DROP INDEX IF EXISTS idx_injuries_category;
DROP INDEX IF EXISTS idx_injuries_is_active;
DROP INDEX IF EXISTS idx_injuries_display_order;
DROP INDEX IF EXISTS idx_injuries_search_keywords;

-- Page visits table indexes
DROP INDEX IF EXISTS idx_page_visits_session;
DROP INDEX IF EXISTS idx_page_visits_variant;
DROP INDEX IF EXISTS idx_page_visits_created;

-- User interactions table indexes
DROP INDEX IF EXISTS idx_interactions_session;
DROP INDEX IF EXISTS idx_interactions_variant;
DROP INDEX IF EXISTS idx_interactions_type;
DROP INDEX IF EXISTS idx_interactions_created;

-- Conversions table indexes
DROP INDEX IF EXISTS idx_conversions_session;
DROP INDEX IF EXISTS idx_conversions_variant;
DROP INDEX IF EXISTS idx_conversions_type;
DROP INDEX IF EXISTS idx_conversions_created;

-- =====================================================
-- 2. FIX MULTIPLE PERMISSIVE POLICIES
-- =====================================================

-- FAQs Table: Replace broad policy with specific policies
DROP POLICY IF EXISTS "Authenticated users can manage FAQs" ON faqs;

CREATE POLICY "Authenticated users can view all FAQs"
  ON faqs
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert FAQs"
  ON faqs
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update FAQs"
  ON faqs
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete FAQs"
  ON faqs
  FOR DELETE
  TO authenticated
  USING (true);

-- Hero Slides Table: Replace broad policy with specific policies
DROP POLICY IF EXISTS "Authenticated users can manage hero slides" ON hero_slides;

CREATE POLICY "Authenticated users can view all hero slides"
  ON hero_slides
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert hero slides"
  ON hero_slides
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update hero slides"
  ON hero_slides
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete hero slides"
  ON hero_slides
  FOR DELETE
  TO authenticated
  USING (true);

-- How It Works Slides Table: Replace broad policy with specific policies
DROP POLICY IF EXISTS "Authenticated users can manage how it works slides" ON how_it_works_slides;

CREATE POLICY "Authenticated users can view all how it works slides"
  ON how_it_works_slides
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert how it works slides"
  ON how_it_works_slides
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update how it works slides"
  ON how_it_works_slides
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete how it works slides"
  ON how_it_works_slides
  FOR DELETE
  TO authenticated
  USING (true);

-- Reviews Table: Replace broad policy with specific policies
DROP POLICY IF EXISTS "Authenticated users can manage reviews" ON reviews;

CREATE POLICY "Authenticated users can view all reviews"
  ON reviews
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert reviews"
  ON reviews
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update reviews"
  ON reviews
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete reviews"
  ON reviews
  FOR DELETE
  TO authenticated
  USING (true);

-- =====================================================
-- 3. FIX FUNCTION SEARCH PATH
-- =====================================================

-- Recreate the trigger function with a secure search_path
CREATE OR REPLACE FUNCTION update_injuries_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = pg_catalog, public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;
