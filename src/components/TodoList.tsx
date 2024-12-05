import React from 'react';
import { TodoItem } from '../types/todo';
import { updateTodo, deleteTodo } from '../services/todoService';

interface TodoListProps {
  todos: TodoItem[];
  currentUser?: { id: string } | null;
}

export const TodoList: React.FC<TodoListProps> = ({ todos, currentUser }) => {
  const [error, setError] = React.useState<string | null>(null);

  if (!currentUser) {
    return <div>ログインしてください</div>;
  }

  const handleToggleComplete = async (todo: TodoItem) => {
    try {
      await updateTodo(todo.id, { completed: !todo.completed });
    } catch (err) {
      setError('エラーが発生しました');
    }
  };

  const handleDelete = async (todo: TodoItem) => {
    try {
      await deleteTodo(todo.id);
    } catch (err) {
      setError('エラーが発生しました');
    }
  };

  const filteredTodos = todos.filter(todo => todo.userId === currentUser.id);

  return (
    <div>
      {error && <div className="text-red-500">{error}</div>}
      <ul>
        {filteredTodos.map(todo => (
          <li key={todo.id} className="flex items-center gap-2 py-2">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => handleToggleComplete(todo)}
            />
            <span>{todo.title}</span>
            <button
              onClick={() => handleDelete(todo)}
              className="ml-auto text-red-500"
            >
              削除
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}; 