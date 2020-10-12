const express = require("express");
const router = express.Router();
const Todo = require("../../model/TodoSchema");

/*
route: /api/v1/todo
*/

// GET
router.get("/", async (req, res, next) => {
  try {
    const todos = await Todo.find({}).sort({
      timestamp: -1,
    });

    res.send(todos);
  } catch (error) {
    next(error);
  }
});

// POST
router.post("/", async (req, res, next) => {
  const { body, isComplete, edit } = req.body;

  try {
    const todo = new Todo({
      body: body,
      isComplete: isComplete,
      edit: edit,
    });

    const data = await todo.save();

    if (!data) {
      const error = new Error("Unable to add Todo");
      error.status = 400;
      throw error;
    }

    res.send({
      msg: "Todo added",
    });
  } catch (error) {
    next(error);
  }
});

// DELETE
router.delete("/", async (req, res, next) => {
  const { _id } = req.body;

  try {
    const data = await Todo.findByIdAndDelete(_id);

    if (!data) {
      const error = new Error("No todo exists with that _id");
      error.status = 400;
      throw error;
    }

    res.send({
      msg: "Todo deleted",
    });
  } catch (error) {
    next(error);
  }
});

// DELETE ALL
router.delete("/all", async (req, res, next) => {
  try {
    const todos = await Todo.deleteMany({});

    if (todos.deletedCount === 0) {
      return res.send({
        msg: "No todos deleted!",
      });
    }

    res.send({
      msg: "Todos deleted",
    });
  } catch (error) {
    next(error);
  }
});

// PUT
router.put("/", async (req, res, next) => {
  const { _id, isComplete } = req.body;

  try {
    const data = await Todo.findByIdAndUpdate(
      _id,
      {
        isComplete: isComplete,
      },
      {
        new: true,
      }
    );

    if (!data) {
      const error = new Error("Unable to update todo with that _id");
      error.status = 400;
      throw error;
    }

    res.send({
      msg: "Todo updated",
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
