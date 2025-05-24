import express from "express";
import { User } from "./types";
import { userRepository } from "./repository";
import { delayMiddleware, validateUserMiddleware } from "./middleware";
import cors from "cors";

const app = express();

app.use(delayMiddleware(300));
app.use(express.json());
app.use(cors());

app.post("/users", validateUserMiddleware(), (req, res) => {
  const user = userRepository.create(req.body as User);

  res.status(200).json(user);
});

app.get("/users", (req, res) => {
  const users = userRepository.findAll();

  res.status(200).json(users);
});

app.get("/users/:id", (req, res) => {
  const user = userRepository.find(req.params.id);

  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404).json({ message: "User was not found" });
  }
});

app.put("/users/:id", validateUserMiddleware(), (req, res) => {
  const user = userRepository.find(req.params.id);

  if (user) {
    const user = userRepository.update(req.params.id, req.body as User);

    res.status(200).json(user);
  } else {
    res.status(404).json({ message: "User was not found" });
  }
});

app.delete("/users/:id", (req, res) => {
  const user = userRepository.find(req.params.id);

  if (user) {
    userRepository.delete(req.params.id);

    res.status(200).end();
  } else {
    res.status(404).json({ message: "User was not found" });
  }
});

app.listen(8080);
