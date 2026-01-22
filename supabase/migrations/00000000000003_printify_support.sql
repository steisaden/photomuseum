-- Migration: Printify Support
-- Adds columns to link local resources with Printify resources.

BEGIN;

-- 1. Add Printify columns to 'products'
ALTER TABLE public.products 
ADD COLUMN IF NOT EXISTS printify_id TEXT UNIQUE,
ADD COLUMN IF NOT EXISTS printify_provider_id TEXT;

-- 2. Add Printify columns to 'order_items'
-- Used to map a specific size/color variant in the order to a Printify variant ID for fulfillment.
ALTER TABLE public.order_items 
ADD COLUMN IF NOT EXISTS printify_variant_id TEXT;

-- Index for faster lookups during sync
CREATE INDEX IF NOT EXISTS idx_products_printify_id ON public.products(printify_id);

COMMIT;
