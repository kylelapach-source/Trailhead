-- ============================================================
-- Seed: Reflection Prompts (stored as app constants, not a DB table)
-- This file documents the 30 rotating prompts used in-app.
-- In production, these live in src/lib/reflectionPrompts.ts
-- ============================================================

-- See: src/lib/reflectionPrompts.ts for the app-side implementation.
-- Prompts rotate daily based on day-of-year % 30.

select 'See src/lib/reflectionPrompts.ts for prompt content' as note;
