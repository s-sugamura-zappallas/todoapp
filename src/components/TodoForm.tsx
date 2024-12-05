import React from 'react';
import { createTodo } from '../services/todoService';

export const TodoForm: React.FC = () => {
  const [title, setTitle] = React.useState('');
  const [error, setError] = React.useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!title.trim()) {
      setError('タイトルを入力してください');
      return;
    }

    if (title.length > 100) {
      setError('タイトルは100文字以内で入力してください');
      return;
    }

    try {
      await createTodo({
        title: title.trim(),
        userId: 'current-user-id', // 実際の実装では認証システムから取得
      });
      setTitle('');
    } catch (err) {
      setError('エラーが発生しました');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <div className="text-red-500">{error}</div>}
      <div className="flex gap-2">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="新しいTodoを入力"
          className="flex-1 px-4 py-2 border rounded"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          追加
        </button>
      </div>
    </form>
  );
}; 