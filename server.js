require("dotenv").config();
const express = require("express");
const helmet = require('helmet')
const morgan = require('morgan')
const bodyParser = require("body-parser");
const cors = require('cors');
const database = require("./config/database");

const app = express()

// DB connection
database()


// Cors Middlewware
app.use(cors())
// Security Middleware
app.use(helmet({
  contentSecurityPolicy: false,
}));
// Logger Middleware
app.use(morgan('common'))
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: false
}))
// parse application/json
app.use(bodyParser.json())



// Define API/Middleware
app.use('/api/v1', require('./api/index'))

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(__dirname + '/client/dist/'))
  app.get(/.*/, (req, res) => {
    res.sendFile(__dirname + '/client/dist/index.html')
  })
}

app.use(require('./middleware/notFound'))
app.use(require('./middleware/errorHandler'))


const PORT = process.env.PORT || 5050
app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`))