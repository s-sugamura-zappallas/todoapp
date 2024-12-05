'use server'

import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { revalidatePath } from "next/cache"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

async function createTaskHistory(
  todoId: string,
  action: string,
  title: string,
  completed: boolean,
  userId: string
) {
  await prisma.taskHistory.create({
    data: {
      todoId,
      action,
      title,
      completed,
      userId,
    },
  });
}

export async function toggleTodo(id: string) {
  const session = await getServerSession(authOptions)
  if (!session?.user) return

  const todo = await prisma.todo.findUnique({
    where: { id }
  })

  if (!todo || todo.userId !== session.user.id) return

  await prisma.todo.update({
    where: { id },
    data: { completed: !todo.completed }
  })

  revalidatePath('/todos')
}

export async function createTodo(title: string, userId: string) {
  const session = await getServerSession(authOptions)
  if (!session?.user) return

  const todo = await prisma.todo.create({
    data: {
      title,
      user: {
        connect: {
          id: userId
        }
      }
    },
  });

  await createTaskHistory(todo.id, "CREATED", title, false, userId);
  revalidatePath("/todos");
  return todo;
}

export async function updateTodo(id: string, completed: boolean, userId: string) {
  const todo = await prisma.todo.findUnique({
    where: { id },
  });

  if (!todo) throw new Error("Todo not found");

  const updatedTodo = await prisma.todo.update({
    where: { id },
    data: { completed },
  });

  await createTaskHistory(id, "UPDATED", todo.title, completed, userId);
  revalidatePath("/todos");
  return updatedTodo;
}

export async function deleteTodo(id: string, userId: string) {
  const todo = await prisma.todo.findUnique({
    where: { id },
  });

  if (!todo) throw new Error("Todo not found");

  await createTaskHistory(id, "DELETED", todo.title, todo.completed, userId);
  
  await prisma.todo.delete({
    where: { id },
  });

  revalidatePath("/todos");
} 