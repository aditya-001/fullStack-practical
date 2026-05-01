const express = require("express");
const app = express();

const PORT = 3000;
let users = [];
let id = 1;

app.use(express.json());

app.use((req, res, next) => {
  const currentTime = new Date().toLocaleString();

  console.log("Request received at: " + currentTime);
  console.log(req.method + " " + req.url);

  next();
});

app.get("/", (req, res) => {
  res.json({
    message: "Server Running",
    time: new Date().toLocaleString()
  });
});

app.get("/users", (req, res) => {
  res.json({
    message: "Users fetched successfully",
    time: new Date().toLocaleString(),
    users: users
  });
});

app.get("/users/:id", (req, res) => {
  const userId = Number(req.params.id);
  const user = users.find((user) => user.id === userId);

  if (!user) {
    return res.status(404).json({
      message: "User not found",
      time: new Date().toLocaleString()
    });
  }

  res.json({
    message: "User fetched successfully",
    time: new Date().toLocaleString(),
    user: user
  });
});

app.post("/users", (req, res) => {
  const name = req.body.name;
  const email = req.body.email;

  if (!name || !email) {
    return res.status(400).json({
      message: "Name and email are required",
      time: new Date().toLocaleString()
    });
  }

  const existingUser = users.find((user) => user.email === email);

  if (existingUser) {
    return res.status(400).json({
      message: "Email already exists",
      time: new Date().toLocaleString()
    });
  }

  const newUser = {
    id: id,
    name,
    email
  };

  users.push(newUser);
  id++;

  res.status(201).json({
    message: "User added successfully",
    time: new Date().toLocaleString(),
    user: newUser
  });
});

app.delete("/users/:id", (req, res) => {
  const userId = Number(req.params.id);
  const index = users.findIndex((user) => user.id === userId);

  if (index === -1) {
    return res.status(404).json({
      message: "User not found",
      time: new Date().toLocaleString()
    });
  }

  users.splice(index, 1);

  res.json({
    message: "User deleted successfully",
    time: new Date().toLocaleString()
  });
});

app.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    return res.status(400).json({
      message: "All fields required",
      time: new Date().toLocaleString()
    });
  }

  if (email === "admin@gmail.com" && password === "1234") {
    return res.json({
      message: "Login Success",
      time: new Date().toLocaleString()
    });
  }

  res.status(401).json({
    message: "Invalid Credentials",
    time: new Date().toLocaleString()
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
