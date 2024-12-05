export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface TodoItem {
  id: string;
  title: string;
  completed: boolean;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface TodoHistory {
  type: 'CREATE' | 'UPDATE' | 'DELETE';
  todoId: string;
  title: string;
  userId: string;
  timestamp: Date;
}

export interface CreateTodoInput {
  title: string;
}

export interface UpdateTodoInput {
  title?: string;
  completed?: boolean;
}

export interface TodoFilters {
  completed?: boolean;
}

