import { TodoList } from "@/components/todo/todo-list"
import { TodoForm } from "@/components/todo/todo-form"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { toggleTodo, deleteTodo, createTodo } from "./actions"
import { TodoPageClient } from "./page.client"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

export default async function TodoPage() {
  const session = await getServerSession(authOptions)
  
  if (!session?.user) {
    redirect('/auth/login')
  }

  const todos = await prisma.todo.findMany({
    where: {
      userId: session.user.id
    },
    orderBy: {
      createdAt: 'desc'
    }
  })

  return <TodoPageClient todos={todos} userId={session.user.id} />
} 