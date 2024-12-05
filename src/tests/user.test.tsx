import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { TodoList } from '../components/todo/todo-list';
import { TodoHistory } from '../components/todo/todo-history';
import { mockUser } from './mocks/user';

describe('User Operations', () => {
  describe('ユーザー関連', () => {
    it('自分のTodoだけが表示されるか', () => {
      const myTodo = {
        id: '1',
        title: 'My Todo',
        completed: false,
        userId: mockUser.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const otherUserTodo = {
        id: '2',
        title: 'Other User Todo',
        completed: false,
        userId: 'other-user-id',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      render(
        <TodoList
          todos={[myTodo, otherUserTodo]}
          onToggle={jest.fn()}
          onDelete={jest.fn()}
          currentUser={mockUser}
        />
      );

      expect(screen.getByText('My Todo')).toBeInTheDocument();
      expect(screen.queryByText('Other User Todo')).not.toBeInTheDocument();
    });

    it('自分の履歴だけが表示されるか', () => {
      const myHistory = [
        { type: 'CREATE' as const, todoId: '1', title: 'My Todo', userId: mockUser.id, timestamp: new Date() },
      ];

      const otherUserHistory = [
        { type: 'CREATE' as const, todoId: '2', title: 'Other User Todo', userId: 'other-user-id', timestamp: new Date() },
      ];

      render(<TodoHistory history={[...myHistory, ...otherUserHistory]} currentUser={mockUser} />);

      expect(screen.getByText('作成: My Todo')).toBeInTheDocument();
      expect(screen.queryByText('作成: Other User Todo')).not.toBeInTheDocument();
    });

    it('未認証時の操作がブロックされるか', () => {
      render(
        <TodoList
          todos={[]}
          onToggle={jest.fn()}
          onDelete={jest.fn()}
          currentUser={null}
        />
      );

      expect(screen.getByText('ログインしてください')).toBeInTheDocument();
    });
  });
}); 