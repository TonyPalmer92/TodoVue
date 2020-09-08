const express = require("express");
const router = express.Router();

router.use('/todos', require('./routes/todos'))

module.exports = router;