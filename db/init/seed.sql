-- Seed data generated from src/data/invites.ts
-- Inserts each invite and upserts on conflict to keep DB in sync with source of truth

-- You can remove the ON CONFLICT clause if you only want this to run on fresh DBs

INSERT INTO invites (id, email, guests) VALUES
  ('debbie-ian-falcone', '', '[{"name":"Debbie Falcone"},{"name":"Ian Falcone"}]'::jsonb);

INSERT INTO invites (id, email, guests) VALUES
  ('zoe-falcone', '', '[{"name":"Zoe Falcone"}]'::jsonb);

INSERT INTO invites (id, email, guests) VALUES
  ('lisa-barry-webb', '', '[{"name":"Lisa Webb"},{"name":"Barry Webb"}]'::jsonb);

INSERT INTO invites (id, email, guests) VALUES
  ('shelby-webb-lucia-careno', '', '[{"name":"Shelby Webb"},{"name":"Lucia Careno"}]'::jsonb);

INSERT INTO invites (id, email, guests) VALUES
  ('grandma-frayda', '', '[{"name":"Grandma Frayda"}]'::jsonb);

INSERT INTO invites (id, email, guests) VALUES
  ('grandma-rhoda-grandpa-mike', '', '[{"name":"Grandma Rhoda"},{"name":"Grandpa Mike"}]'::jsonb);

INSERT INTO invites (id, email, guests) VALUES
  ('robin-gertner', '', '[{"name":"Robin Gertner"}]'::jsonb);

INSERT INTO invites (id, email, guests) VALUES
  ('ilisa-jacob-gertner', '', '[{"name":"Ilisa Gertner"},{"name":"Jacob Gertner"}]'::jsonb);

INSERT INTO invites (id, email, guests) VALUES
  ('steven-karen-ben-gertner', '', '[{"name":"Steven Gertner"},{"name":"Karen Gertner"},{"name":"Ben Gertner"}]'::jsonb);

INSERT INTO invites (id, email, guests) VALUES
  ('corey-kim-alex-frankie-falcone', '', '[{"name":"Corey Falcone"},{"name":"Kim Falcone"},{"name":"Alex Falcone"},{"name":"Frankie Falcone"}]'::jsonb);

INSERT INTO invites (id, email, guests) VALUES
  ('bernie-husband', '', '[{"name":"Bernie"},{"name":"Husband"}]'::jsonb);

INSERT INTO invites (id, email, guests) VALUES
  ('jeanine-sean', '', '[{"name":"Jeanine"},{"name":"Sean"}]'::jsonb);

INSERT INTO invites (id, email, guests) VALUES
  ('hannah-lindsey', '', '[{"name":"Hannah"},{"name":"Lindsey"}]'::jsonb);

INSERT INTO invites (id, email, guests) VALUES
  ('jack-gabby', '', '[{"name":"Jack"},{"name":"Gabby"}]'::jsonb);

INSERT INTO invites (id, email, guests) VALUES
  ('emmy-webb', '', '[{"name":"Emmy Webb"}]'::jsonb);

INSERT INTO invites (id, email, guests) VALUES
  ('sabrina-partner', '', '[{"name":"Sabrina"},{"name":"Partner"}]'::jsonb);

INSERT INTO invites (id, email, guests) VALUES
  ('ali-partner', '', '[{"name":"Ali"},{"name":"Partner"}]'::jsonb);

INSERT INTO invites (id, email, guests) VALUES
  ('julia-partner', '', '[{"name":"Julia"},{"name":"Partner"}]'::jsonb);

INSERT INTO invites (id, email, guests) VALUES
  ('kate-stelzel', '', '[{"name":"Kate Stelzel"}]'::jsonb);

INSERT INTO invites (id, email, guests) VALUES
  ('sierra-jordan-denney', '', '[{"name":"Sierra Denney"},{"name":"Jordan Denney"}]'::jsonb);

INSERT INTO invites (id, email, guests) VALUES
  ('olivia-bransford', '', '[{"name":"Olivia Bransford"}]'::jsonb);

INSERT INTO invites (id, email, guests) VALUES
  ('tony-carrozzino-sophie-nielsen', '', '[{"name":"Tony Carrozzino"},{"name":"Sophie Nielsen"}]'::jsonb);

INSERT INTO invites (id, email, guests) VALUES
  ('ryan-lohr-helen-bradley', '', '[{"name":"Ryan Lohr"},{"name":"Helen Bradley"}]'::jsonb);

INSERT INTO invites (id, email, guests) VALUES
  ('robert-emily-morsut', '', '[{"name":"Robert Morsut"},{"name":"Emily Morsut"}]'::jsonb);

INSERT INTO invites (id, email, guests) VALUES
  ('kam-cyd', '', '[{"name":"Kam"},{"name":"Cyd"}]'::jsonb);

INSERT INTO invites (id, email, guests) VALUES
  ('hunter-tiffany', '', '[{"name":"Hunter"},{"name":"Tiffany"}]'::jsonb);

INSERT INTO invites (id, email, guests) VALUES
  ('archer-sarah-beth', '', '[{"name":"Archer Beth"},{"name":"Sarah Beth"}]'::jsonb);

INSERT INTO invites (id, email, guests) VALUES
  ('max-anna', '', '[{"name":"Max"},{"name":"Anna"}]'::jsonb);

INSERT INTO invites (id, email, guests) VALUES
  ('matt-brittney', '', '[{"name":"Matt"},{"name":"Brittney"}]'::jsonb);

INSERT INTO invites (id, email, guests) VALUES
  ('chris-jewel', '', '[{"name":"Chris"},{"name":"Jewel"}]'::jsonb);

INSERT INTO invites (id, email, guests) VALUES
  ('tanner-katie', '', '[{"name":"Tanner"},{"name":"Katie"}]'::jsonb);

INSERT INTO invites (id, email, guests) VALUES
  ('connor', '', '[{"name":"Connor"}]'::jsonb);

INSERT INTO invites (id, email, guests) VALUES
  ('addison', '', '[{"name":"Addison"}]'::jsonb);

INSERT INTO invites (id, email, guests) VALUES
  ('christian-morsut', '', '[{"name":"Christian Morsut"}]'::jsonb);

INSERT INTO invites (id, email, guests) VALUES
  ('izzy-evans', '', '[{"name":"Izzy Evans"}]'::jsonb);

INSERT INTO invites (id, email, guests) VALUES
  ('sofi-mattigan', '', '[{"name":"Sofi"},{"name":"Mattigan"}]'::jsonb);

INSERT INTO invites (id, email, guests) VALUES
  ('maddy', '', '[{"name":"Maddy"}]'::jsonb);

INSERT INTO invites (id, email, guests) VALUES
  ('claudia', '', '[{"name":"Claudia"}]'::jsonb);

INSERT INTO invites (id, email, guests) VALUES
  ('alec-liberman', '', '[{"name":"Alec Liberman"}]'::jsonb);

INSERT INTO invites (id, email, guests) VALUES
  ('mason-favro', '', '[{"name":"Mason Favro"}]'::jsonb);

INSERT INTO invites (id, email, guests) VALUES
  ('mark-nissen-jessie-fagan', '', '[{"name":"Mark Nissen"},{"name":"Jessie Fagan"}]'::jsonb);

INSERT INTO invites (id, email, guests) VALUES
  ('ayush-gupta', '', '[{"name":"Ayush Gupta"}]'::jsonb);

INSERT INTO invites (id, email, guests) VALUES
  ('tommy', '', '[{"name":"Tommy"}]'::jsonb);

INSERT INTO invites (id, email, guests) VALUES
  ('lauren-chandler-clark', '', '[{"name":"Lauren Clark"},{"name":"Chandler Clark"}]'::jsonb);

INSERT INTO invites (id, email, guests) VALUES
  ('alyssa-kautz-preston-connable', '', '[{"name":"Alyssa Kautz"},{"name":"Preston Connable"}]'::jsonb);

INSERT INTO invites (id, email, guests) VALUES
  ('harper-partner', '', '[{"name":"Harper"},{"name":"Partner"}]'::jsonb);

INSERT INTO invites (id, email, guests) VALUES
  ('meg-michael', '', '[{"name":"Meg"},{"name":"Michael"}]'::jsonb);

INSERT INTO invites (id, email, guests) VALUES
  ('ruhara-perera', '', '[{"name":"Ruhara Perera"}]'::jsonb);

INSERT INTO invites (id, email, guests) VALUES
  ('alyssa-gabe-leubbe', '', '[{"name":"Alyssa Leubbe"},{"name":"Gabe Leubbe"}]'::jsonb);

INSERT INTO invites (id, email, guests) VALUES
  ('leila-osburn', '', '[{"name":"Leila Osburn"}]'::jsonb);

INSERT INTO invites (id, email, guests) VALUES
  ('rob-dana', '', '[{"name":"Rob"},{"name":"Dana"}]'::jsonb);

INSERT INTO invites (id, email, guests) VALUES
  ('ej-bostwick', '', '[{"name":"EJ Bostwick"}]'::jsonb);

INSERT INTO invites (id, email, guests) VALUES
  ('kevin-erb', '', '[{"name":"Kevin Erb"}]'::jsonb);

INSERT INTO invites (id, email, guests) VALUES
  ('ethan-rosman', '', '[{"name":"Ethan Rosman"}]'::jsonb);

INSERT INTO invites (id, email, guests) VALUES
  ('brett-avery', '', '[{"name":"Brett"},{"name":"Avery"}]'::jsonb);

INSERT INTO invites (id, email, guests) VALUES
  ('regina-partner', '', '[{"name":"Regina"},{"name":"Partner"}]'::jsonb);

INSERT INTO invites (id, email, guests) VALUES
  ('moe-gary', '', '[{"name":"Moe"},{"name":"Gary"}]'::jsonb);

INSERT INTO invites (id, email, guests) VALUES
  ('jess-bryan', '', '[{"name":"Jess"},{"name":"Bryan"}]'::jsonb);

INSERT INTO invites (id, email, guests) VALUES
  ('angela-greg-nall', '', '[{"name":"Angela Nall"},{"name":"Greg Nall"}]'::jsonb);

INSERT INTO invites (id, email, guests) VALUES
  ('debi-larson-husband', '', '[{"name":"Debi Larson"},{"name":"Husband"}]'::jsonb);

INSERT INTO invites (id, email, guests) VALUES
  ('laura-shawn-thompson', '', '[{"name":"Laura Thompson"},{"name":"Shawn Thompson"}]'::jsonb);

INSERT INTO invites (id, email, guests) VALUES
  ('julie-ej-noah', '', '[{"name":"Julie Noah"},{"name":"EJ Noah"}]'::jsonb);

INSERT INTO invites (id, email, guests) VALUES
  ('caroline', '', '[{"name":"Caroline"}]'::jsonb);

INSERT INTO invites (id, email, guests) VALUES
  ('megan', '', '[{"name":"Megan"}]'::jsonb);

INSERT INTO invites (id, email, guests) VALUES
  ('becca', '', '[{"name":"Becca"}]'::jsonb);

INSERT INTO invites (id, email, guests) VALUES
  ('lauren-lupo', '', '[{"name":"Lauren Lupo"}]'::jsonb);

INSERT INTO invites (id, email, guests) VALUES
  ('bryce-sam', '', '[{"name":"Bryce"},{"name":"Sam"}]'::jsonb);

INSERT INTO invites (id, email, guests) VALUES
  ('amy-mark-cismesia', '', '[{"name":"Amy Cismesia"},{"name":"Mark Cismesia"}]'::jsonb);

INSERT INTO summaries (id, title, counts)
VALUES (
  'rsvp',
  'RSVP Statuses',
  jsonb_build_array(
    jsonb_build_object('id', 'coming', 'label', 'Coming', 'count', 0),
    jsonb_build_object('id', 'declined', 'label', 'Declined', 'count', 0),
    jsonb_build_object('id', 'pending', 'label', 'Pending', 'count', COALESCE((SELECT SUM(jsonb_array_length(guests)) FROM invites), 0))
  )
);

INSERT INTO summaries (id, title, counts)
VALUES (
    'meals',
    'Meal Selections',
    jsonb_build_array(
      jsonb_build_object('id', 'meat', 'label', 'Meat', 'count', 0),
      jsonb_build_object('id', 'fish', 'label', 'Fish', 'count', 0),
      jsonb_build_object('id', 'both', 'label', 'Both', 'count', 0),
      jsonb_build_object('id', 'veggies', 'label', 'Veggies', 'count', 0)
    )
);

INSERT INTO summaries (id, title, counts)
VALUES (
    'dietary',
    'Dietary Restrictions',
    jsonb_build_array(
      jsonb_build_object('id', 'none', 'label', 'None', 'count', 0),
      jsonb_build_object('id', 'some', 'label', 'Some', 'count', 0)
    )
);

INSERT INTO summaries (id, title, counts)
VALUES (
    'songs',
    'Song Requests',
    jsonb_build_array(
      jsonb_build_object('id', 'requests', 'label', 'Requests', 'count', 0)
    )
);