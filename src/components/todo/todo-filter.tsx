"use client"

import { Button } from "@/components/ui/button"
import { TodoFilter as FilterType } from "@/types"

interface TodoFilterProps {
  currentFilter: FilterType
  onFilterChange: (filter: FilterType) => void
}

export function TodoFilter({ currentFilter, onFilterChange }: TodoFilterProps) {
  return (
    <div className="flex gap-2 justify-center my-4">
      <Button 
        variant={currentFilter === 'all' ? 'default' : 'outline'}
        onClick={() => onFilterChange('all')}
      >
        All
      </Button>
      <Button
        variant={currentFilter === 'active' ? 'default' : 'outline'}
        onClick={() => onFilterChange('active')}
      >
        Active
      </Button>
      <Button
        variant={currentFilter === 'completed' ? 'default' : 'outline'}
        onClick={() => onFilterChange('completed')}
      >
        Completed
      </Button>
    </div>
  )
}
