# Database Schema Documentation

## Tables

### users
User accounts for the application.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | SERIAL | PRIMARY KEY | Unique user identifier |
| username | VARCHAR(255) | UNIQUE, NOT NULL | User's username |
| email | VARCHAR(255) | UNIQUE, NOT NULL | User's email address |
| password_hash | VARCHAR(255) | NOT NULL | Bcrypt hashed password |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Account creation time |
| updated_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Last update time |

### example_table
Example table for reference.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | SERIAL | PRIMARY KEY | Unique identifier |
| column1 | VARCHAR(255) | NOT NULL | Example column 1 |
| column2 | TEXT | | Example column 2 |
| user_id | INTEGER | FOREIGN KEY (users.id) | Reference to user |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Creation time |
| updated_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Last update time |

## Indexes

- `idx_users_email`: Index on users.email for faster lookups
- `idx_example_user_id`: Index on example_table.user_id for faster joins

## Relationships

- `example_table.user_id` -> `users.id` (Many-to-One)
