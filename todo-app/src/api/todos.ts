import { TodoType } from '../types/TodoType';
import { client } from '../utils/fetchClient';

export const getTodos = () => {
  return client.get<TodoType[]>(`/todos`);
};

export const postTodo = (newTodo: Omit<TodoType, 'id'>) => {
  return client.post<TodoType>(`/todos`, newTodo);
};

export const deleteTodo = (todoId: string) => {
  return client.delete(`/todos/${todoId}`);
};

export const updateTodo = (todoId: string, data: unknown) => {
  return client.patch(`/todos/${todoId}`, data);
};
