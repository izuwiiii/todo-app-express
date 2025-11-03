import { Todo } from "../models/Todo.js";
import { v4 as uuidv4 } from "uuid";

export const todoService = {
  normalize: ({ id, title, completed }) => {
    return {
      id,
      title,
      completed,
    };
  },
  getAll: async () => await Todo.findAll({ order: [["createdAt"]] }),
  getById: async (id) => Todo.findByPk(id),
  create: (title) => {
    const id = uuidv4();

    return Todo.create({ id, title });
  },
  update: async ({ id, title, completed }) =>
    await Todo.update({ title, completed }, { where: { id } }),
  updateMany: async (todos) => {
    for (const { id, title, completed } of todos) {
      await Todo.update({ title, completed }, { where: { id } });
    }
  },
  remove: async (id) => Todo.destroy({ where: { id } }),
};
