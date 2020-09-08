const express = require('express');
const router = express.Router()
const Todo = require('../../model/TodoSchema')


/*
route: /api/v1/todo
*/


// GET
router.get('/', async (req, res) => {
  try {
    const todos = await Todo.find({}).sort({
      timestamp: -1
    })
    res.send(todos)
  } catch (error) {
    console.log('GET error message: ', error.stack)
  }
})


// POST
router.post('/', async (req, res) => {
  const {
    body,
    isComplete,
    edit
  } = req.body

  try {
    const todo = new Todo({
      body: body,
      isComplete: isComplete,
      edit: edit
    })

    const result = await todo.save()
    res.send(result)
  } catch (error) {
    console.log('POST error message: ', error.stack)
  }
})

// DELETE
router.delete('/', async (req, res) => {
  const {
    _id
  } = req.body

  try {
    const result = await Todo.findByIdAndDelete(_id)

    if (!result) {
      res.send({
        msg: 'Nothing to delete...'
      })
    }

    res.send({
      msg: 'Todo deleted'
    })
  } catch (error) {
    console.log('DELETE error message: ', error.stack)
  }
})


// PUT
router.put('/', async (req, res) => {
  const {
    _id,
    isComplete
  } = req.body

  try {
    const result = await Todo.findByIdAndUpdate(_id, {
      isComplete: isComplete
    })
    res.send(result)
  } catch (error) {
    console.log('PUT error message: ', error.stack)
  }
})




module.exports = router