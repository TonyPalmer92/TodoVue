require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const cors = require("cors");
const database = require("./config/database");

// Array of custom middleware, order is important!
const middleware = [
  require("./middleware/notFound"),
  require("./middleware/errorHandler")
]

const app = express();

// DB connection
database();

// Cors Middlewware
app.use(cors());
// Security Middleware
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);
// parse application/x-www-form-urlencoded
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
// parse application/json
app.use(bodyParser.json());

// Define API/Middleware
app.use("/api/v1", require("./api/index"));

// Serve static files in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(__dirname + "/client/dist/"));
  app.get(/.*/, (req, res) => {
    res.sendFile(__dirname + "/client/dist/index.html");
  });
}

// loop over custom middleware array & init
middleware.forEach(mware => app.use(mware))


const PORT = process.env.PORT || 5060;
app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));