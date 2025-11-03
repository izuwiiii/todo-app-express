import React, { FormEvent, useEffect, useRef, useState } from 'react';
import { TodoType } from '../../types/TodoType';
import cn from 'classnames';

type TodoProps = {
  todo: TodoType;
  isLoading: boolean;
  handleDeleteTodo: (todoId: string) => void;
  deletingTodoId?: string | null;
  handleUpdateTodo?: (todoId: string, data: unknown) => void;
  updatingTodoId?: string | null;
  isUpdatingTodos?: boolean;
  updatingTodosIds?: string[];
  filteredTodos?: TodoType[];
  todos?: TodoType[];
  handleTodoEditSubmit?: (
    todo: TodoType,
    todoQuery: string,
    setTodoQuery?: React.Dispatch<React.SetStateAction<string>>,
    setIsEditing?: React.Dispatch<React.SetStateAction<boolean>>,
    e?: React.FormEvent<HTMLFormElement>,
  ) => void;
};

export const Todo: React.FC<TodoProps> = ({
  todo,
  handleDeleteTodo,
  handleUpdateTodo,
  updatingTodosIds,
  handleTodoEditSubmit,
}) => {
  const tempTodo = {
    title: '',
    id: '',
    // userId: USER_ID,
    completed: false,
  };
  const isTodoLoaderActive =
    todo?.id === '' || updatingTodosIds?.includes(todo?.id || '');

  const [isEditing, setIsEditing] = useState(false);
  const [todoQuery, setTodoQuery] = useState(todo?.title || '');
  const inputField = useRef<HTMLInputElement>(null);

  const handleTodoEdit = (e: FormEvent) => {
    e.preventDefault();
    setIsEditing(true);
  };

  const handleTodoEditCancel = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      setTodoQuery(todo?.title || '');
      setIsEditing(false);
    }
  };

  useEffect(() => {
    inputField.current?.focus();
  }, [isEditing]);

  return (
    <div data-cy="Todo" className={cn('todo', { completed: todo?.completed })}>
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={todo?.completed}
          onClick={() =>
            handleUpdateTodo?.(todo?.id || '', { completed: !todo?.completed })
          }
        />
      </label>

      {isEditing ? (
        <form
          onSubmit={e =>
            handleTodoEditSubmit?.(
              todo || tempTodo,
              todoQuery,
              setTodoQuery,
              setIsEditing,
              e,
            )
          }
        >
          <input
            data-cy="TodoTitleField"
            type="text"
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            ref={inputField}
            value={todoQuery}
            onKeyUp={e => handleTodoEditCancel(e)}
            onChange={e => {
              setTodoQuery(e.target.value);
            }}
            onBlur={() => {
              setIsEditing(false);
              handleTodoEditSubmit?.(
                todo || {
                  title: '',
                  id: '',
                  // userId: 3085,
                  completed: false,
                },
                todoQuery,
                setTodoQuery,
              );
            }}
          />
        </form>
      ) : (
        <>
          <span
            data-cy="TodoTitle"
            className="todo__title"
            onDoubleClick={e => handleTodoEdit(e)}
          >
            {todo?.title}
          </span>
          <button
            type="button"
            className="todo__remove"
            data-cy="TodoDelete"
            onClick={() => handleDeleteTodo(todo.id)}
          >
            ×
          </button>
        </>
      )}

      <div
        data-cy="TodoLoader"
        className={cn('modal overlay', {
          'is-active': isTodoLoaderActive,
        })}
      >
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    </div>
  );
};
