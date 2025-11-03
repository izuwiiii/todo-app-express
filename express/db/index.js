import { Sequelize } from "sequelize";

export const sequelize = new Sequelize("postgres", "postgres", "pass", {
  host: "localhost",
  dialect: "postgres",
});
