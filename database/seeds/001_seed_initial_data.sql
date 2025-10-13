-- Example seed data
-- File: 001_seed_initial_data.sql

-- Insert example users
INSERT INTO users (username, email, password_hash) VALUES
  ('admin', 'admin@example.com', '$2b$10$example_hash_1'),
  ('user1', 'user1@example.com', '$2b$10$example_hash_2'),
  ('user2', 'user2@example.com', '$2b$10$example_hash_3')
ON CONFLICT (email) DO NOTHING;

-- Insert example data
INSERT INTO example_table (column1, column2, user_id) VALUES
  ('Example 1', 'Description for example 1', 1),
  ('Example 2', 'Description for example 2', 1),
  ('Example 3', 'Description for example 3', 2)
ON CONFLICT DO NOTHING;
