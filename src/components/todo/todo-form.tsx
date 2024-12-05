"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface TodoFormProps {
  onSubmit: (title: string) => void
}

const MAX_TITLE_LENGTH = 100

export function TodoForm({ onSubmit }: TodoFormProps) {
  const [title, setTitle] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim() || title.length > MAX_TITLE_LENGTH) return
    onSubmit(title)
    setTitle("")
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
      <Input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="新しいTodoを入力"
        className="flex-1"
        maxLength={MAX_TITLE_LENGTH}
      />
      <Button type="submit">追加</Button>
    </form>
  )
}
