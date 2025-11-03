import express from "express";
import cors from "cors";
import { todoService } from "./services/todoService.js";

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

app.get("/todos", async (req, res) => {
  const todos = await todoService.getAll();

  res.send(todos.map((todo) => todoService.normalize(todo)));
});

app.get("/todos/:id", async (req, res) => {
  const todo = await todoService.getById(req.params.id);
  res.send(todoService.normalize(todo));
});

app.post("/todos", async (req, res) => {
  const { title } = req.body;
  const newTodo = await todoService.create(title);
  res.status(201).json(newTodo);
});

app.patch("/todos/:id", async (req, res) => {
  const todoId = req.params.id;
  const { title, completed } = req.body;
  await todoService.update({ id: todoId, title, completed });

  const updatedTodo = await todoService.getById(todoId);
  res.status(200).json(updatedTodo);
});

app.delete("/todos/:id", async (req, res) => {
  await todoService.remove(req.params.id);

  res.status(200).json(await todoService.getAll());
});

app.listen(3000, () =>
  console.log("Server is running on http://localhost:3000/")
);
