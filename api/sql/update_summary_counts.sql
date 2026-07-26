-- Update `summaries` counts from the current state of the `invites` table.
-- This computes counts from the `guests` JSONB arrays and writes
-- the resulting jsonb arrays into the `summaries.counts` column.

BEGIN;

-- RSVP summary (coming / declined / pending)
WITH guest_vals AS (
	SELECT (g->>'coming') AS coming_text
	FROM invites, jsonb_array_elements(guests) AS g
), rsvp AS (
	SELECT
		COALESCE(SUM(CASE WHEN coming_text = 'true' THEN 1 ELSE 0 END), 0) AS coming,
		COALESCE(SUM(CASE WHEN coming_text = 'false' THEN 1 ELSE 0 END), 0) AS declined,
		COALESCE(COUNT(*) , 0) -
			COALESCE(SUM(CASE WHEN coming_text = 'true' THEN 1 ELSE 0 END), 0) -
			COALESCE(SUM(CASE WHEN coming_text = 'false' THEN 1 ELSE 0 END), 0) AS pending
	FROM guest_vals
)
UPDATE summaries
SET counts = (
	SELECT jsonb_build_array(
		jsonb_build_object('id', 'coming', 'label', 'Coming', 'count', rsvp.coming),
		jsonb_build_object('id', 'declined', 'label', 'Declined', 'count', rsvp.declined),
		jsonb_build_object('id', 'pending', 'label', 'Pending', 'count', rsvp.pending)
	)
	FROM rsvp
)
WHERE id = 'rsvp';

-- Meals summary
WITH meal_counts AS (
	SELECT
		COALESCE(SUM(CASE WHEN (g->>'mealSelection') = 'meat' THEN 1 ELSE 0 END), 0) AS meat,
		COALESCE(SUM(CASE WHEN (g->>'mealSelection') = 'fish' THEN 1 ELSE 0 END), 0) AS fish,
		COALESCE(SUM(CASE WHEN (g->>'mealSelection') = 'both' THEN 1 ELSE 0 END), 0) AS both,
		COALESCE(SUM(CASE WHEN (g->>'mealSelection') = 'veggies' THEN 1 ELSE 0 END), 0) AS veggies
	FROM invites, jsonb_array_elements(guests) AS g
)
UPDATE summaries
SET counts = (
	SELECT jsonb_build_array(
		jsonb_build_object('id', 'meat', 'label', 'Meat', 'count', meal_counts.meat),
		jsonb_build_object('id', 'fish', 'label', 'Fish', 'count', meal_counts.fish),
		jsonb_build_object('id', 'both', 'label', 'Both', 'count', meal_counts.both),
		jsonb_build_object('id', 'veggies', 'label', 'Veggies', 'count', meal_counts.veggies)
	)
	FROM meal_counts
)
WHERE id = 'meals';

-- Dietary summary (none / some)
WITH dietary_counts AS (
	SELECT
		-- none: empty (trimmed) string
		COALESCE(SUM(CASE WHEN btrim(g->>'dietaryRestrictions') = '' THEN 1 ELSE 0 END), 0) AS none,
		-- some: only count when dietaryRestrictions is a non-empty string
		COALESCE(SUM(CASE WHEN (g->>'dietaryRestrictions') IS NOT NULL AND btrim(g->>'dietaryRestrictions') <> '' THEN 1 ELSE 0 END), 0) AS some
	FROM invites, jsonb_array_elements(guests) AS g
)
UPDATE summaries
SET counts = (
	SELECT jsonb_build_array(
		jsonb_build_object('id', 'none', 'label', 'None', 'count', dietary_counts.none),
		jsonb_build_object('id', 'some', 'label', 'Some', 'count', dietary_counts.some)
	)
	FROM dietary_counts
)
WHERE id = 'dietary';

-- Songs requests summary
WITH songs_counts AS (
	SELECT COALESCE(SUM(CASE WHEN (g->>'songRequests') IS NOT NULL AND (g->>'songRequests') <> '' THEN 1 ELSE 0 END), 0) AS requests
	FROM invites, jsonb_array_elements(guests) AS g
)
UPDATE summaries
SET counts = (
	SELECT jsonb_build_array(
		jsonb_build_object('id', 'requests', 'label', 'Requests', 'count', songs_counts.requests)
	)
	FROM songs_counts
)
WHERE id = 'songs';

COMMIT;

