const db = require('../config/database');

// Example model for interacting with a database table
class ExampleModel {
  // Find all records
  static async findAll() {
    const query = 'SELECT * FROM example_table';
    const result = await db.query(query);
    return result.rows;
  }

  // Find by ID
  static async findById(id) {
    const query = 'SELECT * FROM example_table WHERE id = $1';
    const result = await db.query(query, [id]);
    return result.rows[0];
  }

  // Create new record
  static async create(data) {
    const query = `
      INSERT INTO example_table (column1, column2)
      VALUES ($1, $2)
      RETURNING *
    `;
    const values = [data.column1, data.column2];
    const result = await db.query(query, values);
    return result.rows[0];
  }

  // Update record
  static async update(id, data) {
    const query = `
      UPDATE example_table
      SET column1 = $1, column2 = $2, updated_at = NOW()
      WHERE id = $3
      RETURNING *
    `;
    const values = [data.column1, data.column2, id];
    const result = await db.query(query, values);
    return result.rows[0];
  }

  // Delete record
  static async delete(id) {
    const query = 'DELETE FROM example_table WHERE id = $1 RETURNING *';
    const result = await db.query(query, [id]);
    return result.rows[0];
  }
}

module.exports = ExampleModel;
