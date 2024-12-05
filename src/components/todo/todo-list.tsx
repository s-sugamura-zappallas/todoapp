"use client"

import { useState } from "react"
import { Todo, TodoFilter as FilterType } from "@/types"
import { TodoFilter } from "./todo-filter"

interface TodoListProps {
  todos: Todo[]
  onToggle: (id: string) => void
  onDelete: (id: string) => void
  currentUser?: { id: string } | null
}

export function TodoList({ todos, onToggle, onDelete, currentUser }: TodoListProps) {
  const [filter, setFilter] = useState<FilterType>('all')

  if (!currentUser) {
    return <div className="text-center text-red-500">ログインしてください</div>
  }

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed
    if (filter === 'completed') return todo.completed
    return true
  }).filter(todo => todo.userId === currentUser.id)

  return (
    <div>
      <TodoFilter currentFilter={filter} onFilterChange={setFilter} />
      <ul className="space-y-2">
        {filteredTodos.map(todo => (
          <li key={todo.id} className="flex items-center justify-between p-4 bg-white rounded-lg shadow">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => onToggle(todo.id)}
                className="w-4 h-4"
              />
              <span className={todo.completed ? "line-through text-gray-500" : ""}>
                {todo.title}
              </span>
            </div>
            <button
              onClick={() => onDelete(todo.id)}
              className="text-red-500 hover:text-red-700"
            >
              削除
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
