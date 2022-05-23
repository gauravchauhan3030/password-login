const express = require("express");
const bcrypt = require("bcrypt");

const app = express();

const users = [];

app.use(express.json());
app.get("/users", (req, res) => {
  res.json(users);
});

app.post("/users", async (req, res) => {
  const { password, name } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  users.push({ name, password: hashedPassword });
});

app.post("/users/login", async (req, res) => {
  const { password, name } = req.body;
  const user = users.find((user) => user.name === name);
  if (!user) {
    return res.status(400).send("cannot find user");
  }
  try {
    if (await bcrypt.compare(password, user.password)) {
      return res.send("Success");
    } else {
      return res.send("Not Allowed");
    }
  } catch {
    res.status(500).send();
  }
});

app.post("users", (req, res) => {});
app.listen(4000, () => {
  console.log("running on 4000");
});
