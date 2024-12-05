import React from 'react';
import { TodoHistory as TodoHistoryType } from '../../types/todo';

interface TodoHistoryProps {
  history: TodoHistoryType[];
  currentUser?: { id: string } | null;
}

const getHistoryText = (item: TodoHistoryType) => {
  switch (item.type) {
    case 'CREATE':
      return `作成: ${item.title}`;
    case 'UPDATE':
      return `更新: ${item.title}`;
    case 'DELETE':
      return `削除: ${item.title}`;
    default:
      return item.title;
  }
};

export const TodoHistory: React.FC<TodoHistoryProps> = ({ history, currentUser }) => {
  if (!currentUser) return null;

  const filteredHistory = history
    .filter(item => item.userId === currentUser.id)
    .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">履歴</h2>
      <ul className="space-y-2">
        {filteredHistory.map((item, index) => (
          <li key={`${item.todoId}-${index}`} className="text-sm text-gray-600">
            {getHistoryText(item)}
          </li>
        ))}
      </ul>
    </div>
  );
}; 