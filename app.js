const express = require("express");
const app = express();

const path = require("path");

const cors = require("cors");
const helmet = require("helmet");


const dbConnection = require("./config/database");
const logger = require("./middlewares/logger");
const { notFound, errorHanlder } = require("./middlewares/errors");

require("dotenv").config();


// Connect to MongoDB
dbConnection();

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "token"],
    optionsSuccessStatus: 200,
  })
);

app.use(helmet());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Routes users
app.use("/api/auth", require("./routes/auth"));
app.use("/api/users", require("./routes/users"));

// Routes article
app.use('/api/articles', require("./routes/articleRoute"));


// Routes courses
app.use("/api/courses", require("./routes/courseRoute"));


// Routes cvs
app.use("/api/cv", require("./routes/cvs.route"));

 // Routes jops
 app.use('/api/jops', require("./routes/jobsRoute"));

app.use(notFound);
app.use(errorHanlder);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
