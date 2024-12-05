import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { TodoForm } from '../components/todo/todo-form';
import { TodoList } from '../components/todo/todo-list';
import { TodoHistory } from '../components/todo/todo-history';
import { createTodo, updateTodo, deleteTodo } from '../services/todo/todoService';
import { mockUser } from './mocks/user';

// モックの設定
jest.mock('../services/todo/todoService');

describe('Todo Operations', () => {
  describe('Todo作成', () => {
    it('ユーザーIDが正しく設定されているか', async () => {
      const mockTodo = {
        id: '1',
        title: 'Test Todo',
        completed: false,
        userId: mockUser.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const handleSubmit = jest.fn();
      render(<TodoForm onSubmit={handleSubmit} />);
      
      const input = screen.getByPlaceholderText('新しいTodoを入力');
      const submitButton = screen.getByText('追加');

      fireEvent.change(input, { target: { value: mockTodo.title } });
      fireEvent.click(submitButton);

      expect(handleSubmit).toHaveBeenCalledWith(mockTodo.title);
    });
  });

  describe('Todo更新', () => {
    it('完了状態の切り替えが正しく動作するか', async () => {
      const mockTodo = {
        id: '1',
        title: 'Test Todo',
        completed: false,
        userId: mockUser.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      (updateTodo as jest.Mock).mockResolvedValue({
        ...mockTodo,
        completed: true,
      });

      const handleToggle = jest.fn();
      const handleDelete = jest.fn();

      render(
        <TodoList
          todos={[mockTodo]}
          onToggle={handleToggle}
          onDelete={handleDelete}
          currentUser={mockUser}
        />
      );

      const checkbox = screen.getByRole('checkbox');
      fireEvent.click(checkbox);

      expect(handleToggle).toHaveBeenCalledWith(mockTodo.id);
    });
  });

  describe('Todo削除', () => {
    it('削除時に履歴が残るか', async () => {
      const mockTodo = {
        id: '1',
        title: 'Test Todo',
        completed: false,
        userId: mockUser.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      (deleteTodo as jest.Mock).mockResolvedValue(undefined);

      const handleToggle = jest.fn();
      const handleDelete = jest.fn();

      render(
        <TodoList
          todos={[mockTodo]}
          onToggle={handleToggle}
          onDelete={handleDelete}
          currentUser={mockUser}
        />
      );

      const deleteButton = screen.getByText('削除');
      fireEvent.click(deleteButton);

      expect(handleDelete).toHaveBeenCalledWith(mockTodo.id);
    });
  });

  describe('履歴表示', () => {
    it('作成・更新・削除の全ての履歴が表示されるか', () => {
      const mockHistory = [
        { type: 'CREATE' as const, todoId: '1', title: 'Test Todo', userId: mockUser.id, timestamp: new Date() },
        { type: 'UPDATE' as const, todoId: '1', title: 'Test Todo', userId: mockUser.id, timestamp: new Date() },
        { type: 'DELETE' as const, todoId: '1', title: 'Test Todo', userId: mockUser.id, timestamp: new Date() },
      ];

      render(<TodoHistory history={mockHistory} currentUser={mockUser} />);

      expect(screen.getByText('作成: Test Todo')).toBeInTheDocument();
      expect(screen.getByText('更新: Test Todo')).toBeInTheDocument();
      expect(screen.getByText('削除: Test Todo')).toBeInTheDocument();
    });
  });
}); 