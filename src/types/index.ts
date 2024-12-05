export type TodoFilter = 'all' | 'active' | 'completed'

export interface Todo {
  id: string
  title: string
  completed: boolean
  userId: string
  createdAt: Date
  updatedAt: Date
} 