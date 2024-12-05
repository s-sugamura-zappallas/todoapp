import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { TodoList } from '../components/todo/todo-list';
import { TodoForm } from '../components/todo/todo-form';
import { updateTodo, deleteTodo } from '../services/todo/todoService';
import { mockUser } from './mocks/user';

// モックの設定
jest.mock('../services/todo/todoService', () => ({
  updateTodo: jest.fn(),
  deleteTodo: jest.fn(),
}));

describe('Error Handling', () => {
  describe('エラー処理', () => {
    it('存在しないTodoの更新時にエラーが発生するか', async () => {
      const mockError = new Error('Todo not found');
      (updateTodo as jest.Mock).mockRejectedValue(mockError);

      const mockTodo = {
        id: 'non-existent-id',
        title: 'Non-existent Todo',
        completed: false,
        userId: mockUser.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const handleError = jest.fn();
      const handleToggle = async (id: string) => {
        try {
          await updateTodo(id, { completed: true });
        } catch (error) {
          handleError(error);
        }
      };

      render(
        <TodoList
          todos={[mockTodo]}
          onToggle={handleToggle}
          onDelete={jest.fn()}
          currentUser={mockUser}
        />
      );

      const checkbox = screen.getByRole('checkbox');
      fireEvent.click(checkbox);

      await waitFor(() => {
        expect(handleError).toHaveBeenCalledWith(mockError);
      });
    });

    it('存在しないTodoの削除時にエラーが発生するか', async () => {
      const mockError = new Error('Todo not found');
      (deleteTodo as jest.Mock).mockRejectedValue(mockError);

      const mockTodo = {
        id: 'non-existent-id',
        title: 'Non-existent Todo',
        completed: false,
        userId: mockUser.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const handleError = jest.fn();
      const handleDelete = async (id: string) => {
        try {
          await deleteTodo(id);
        } catch (error) {
          handleError(error);
        }
      };

      render(
        <TodoList
          todos={[mockTodo]}
          onToggle={jest.fn()}
          onDelete={handleDelete}
          currentUser={mockUser}
        />
      );

      const deleteButton = screen.getByText('削除');
      fireEvent.click(deleteButton);

      await waitFor(() => {
        expect(handleError).toHaveBeenCalledWith(mockError);
      });
    });
  });

  describe('データ検証', () => {
    it('空のタイトルが許可されないか', async () => {
      const handleSubmit = jest.fn();
      render(<TodoForm onSubmit={handleSubmit} />);

      const input = screen.getByPlaceholderText('新しいTodoを入力');
      const submitButton = screen.getByText('追加');

      fireEvent.change(input, { target: { value: '' } });
      fireEvent.click(submitButton);

      expect(handleSubmit).not.toHaveBeenCalled();
    });

    it('長すぎるタイトルが制限されるか', async () => {
      const handleSubmit = jest.fn();
      render(<TodoForm onSubmit={handleSubmit} />);

      const input = screen.getByPlaceholderText('新しいTodoを入力');
      const submitButton = screen.getByText('追加');

      const longTitle = 'a'.repeat(101); // 100文字を超えるタイトル
      fireEvent.change(input, { target: { value: longTitle } });
      fireEvent.click(submitButton);

      expect(handleSubmit).not.toHaveBeenCalled();
    });
  });
}); 