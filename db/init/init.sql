-- Initialize invites table
-- `invites` follows the TypeScript types in src/data/invites.ts

-- Create invites table with guests stored as JSONB
CREATE TABLE IF NOT EXISTS invites (
  id TEXT PRIMARY KEY,
  email TEXT NOT NULL DEFAULT '',
  guests JSONB NOT NULL DEFAULT '[]'::jsonb
);

CREATE TABLE IF NOT EXISTS summaries (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  counts JSONB NOT NULL DEFAULT '[]'::jsonb
);
