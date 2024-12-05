'use client'

import { TodoList } from "@/components/todo/todo-list"
import { TodoForm } from "@/components/todo/todo-form"
import { toggleTodo, deleteTodo, createTodo } from "./actions"
import { Todo } from "@prisma/client"

interface TodoPageClientProps {
  todos: Todo[]
  userId: string
}

export function TodoPageClient({ todos, userId }: TodoPageClientProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">Todo List</h1>
      <TodoForm onSubmit={(title) => createTodo(title, userId)} />
      <TodoList 
        todos={todos}
        onToggle={toggleTodo}
        onDelete={(id) => deleteTodo(id, userId)}
        currentUser={{ id: userId }}
      />
    </div>
  )
} 