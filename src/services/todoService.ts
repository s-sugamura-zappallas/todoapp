import { TodoItem } from '../types/todo';

export const createTodo = async (data: { title: string; userId: string }): Promise<TodoItem> => {
  const response = await fetch('/api/todos', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!response.ok) throw new Error('Failed to create todo');
  return response.json();
};

export const updateTodo = async (id: string, data: { completed?: boolean; title?: string }): Promise<TodoItem> => {
  const response = await fetch(`/api/todos/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!response.ok) throw new Error('Failed to update todo');
  return response.json();
};

export const deleteTodo = async (id: string): Promise<void> => {
  const response = await fetch(`/api/todos/${id}`, { method: 'DELETE' });
  if (!response.ok) throw new Error('Failed to delete todo');
}; 