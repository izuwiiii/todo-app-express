import express from "express";
import cors from "cors";
import { todoService } from "./services/todoService.js";
import dotenv from "dotenv";
import { sequelize } from "./db/index.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173", "https://izuwiiii.github.io"],
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.json({
    status: "ok",
    message: "Todo API is running",
    timestamp: new Date().toISOString(),
  });
});

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

async function startServer() {
  try {
    console.log("Environment:", process.env.NODE_ENV || "development");
    console.log("Port:", PORT);
    console.log("Database URL exists:", !!process.env.DATABASE_URL);

    console.log("Connecting to database...");
    await sequelize.authenticate();
    console.log("Database connected successfully");

    await sequelize.sync();
    console.log("Database synchronized");

    app.listen(Number(process.env.PORT) || 3000, "0.0.0.0", () => {
      console.log("Server is now running!");
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

startServer();
