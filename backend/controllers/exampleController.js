// Example controller for handling business logic
// Controllers handle the actual logic and interact with models

class ExampleController {
  // GET all items
  async getAll(req, res, next) {
    try {
      // TODO: Fetch data from database
      res.status(200).json({
        status: 'success',
        data: [],
      });
    } catch (error) {
      next(error);
    }
  }

  // GET single item by ID
  async getById(req, res, next) {
    try {
      const { id } = req.params;
      // TODO: Fetch data from database
      res.status(200).json({
        status: 'success',
        data: {},
      });
    } catch (error) {
      next(error);
    }
  }

  // POST create new item
  async create(req, res, next) {
    try {
      const data = req.body;
      // TODO: Validate and save to database
      res.status(201).json({
        status: 'success',
        data: {},
      });
    } catch (error) {
      next(error);
    }
  }

  // PUT update item
  async update(req, res, next) {
    try {
      const { id } = req.params;
      const data = req.body;
      // TODO: Update in database
      res.status(200).json({
        status: 'success',
        data: {},
      });
    } catch (error) {
      next(error);
    }
  }

  // DELETE item
  async delete(req, res, next) {
    try {
      const { id } = req.params;
      // TODO: Delete from database
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new ExampleController();
