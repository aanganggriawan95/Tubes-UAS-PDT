const express = require("express");
const mongoose = require("mongoose");
const mysql = require("mysql");
const redis = require("redis");
const studentRoutes = require("./routes/studentRoutes");

const app = express();
app.use(express.json());

// MongoDB connection
mongoose.connect("mongodb://mongo:27017/mydatabase", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// MySQL connection
const mysqlConnection = mysql.createConnection({
  host: "mysql-master",
  user: "root",
  password: "password",
  database: "students_db",
});
mysqlConnection.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL");
});

// Redis connection
const redisClient = redis.createClient({ host: "redis", port: 6379 });
redisClient.on("connect", () => {
  console.log("Connected to Redis");
});

app.use("/students", studentRoutes);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
