import { DataTypes } from "sequelize";
import { sequelize } from "../db/index.js";

export const Todo = sequelize.define(
  "Todo",
  {
    id: { type: DataTypes.STRING, primaryKey: true },
    title: { type: DataTypes.STRING, allowNull: false },
    completed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    createdAt: {
      type: DataTypes.BIGINT,
      field: "created_at",
      allowNull: false,
      defaultValue: () => Date.now(),
    },
  },
  {
    tableName: "todos",
    updatedAt: false,
  }
);
