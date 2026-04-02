import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { Storage } from '@apps-in-toss/web-framework'
import type { Todo, Category } from '../types/todo'
import { getWeekKey } from '../utils/date'

const aitStorage = createJSONStorage(() => ({
  getItem: async (name: string) => {
    return (await Storage.getItem(name)) ?? null
  },
  setItem: async (name: string, value: string) => {
    await Storage.setItem(name, value)
  },
  removeItem: async (name: string) => {
    await Storage.removeItem(name)
  },
}))

interface TodoState {
  todos: Todo[]
  addTodo: (text: string, category: Category, dayOfWeek: number, weekKey: string) => void
  toggleTodo: (id: string) => void
  deleteTodo: (id: string) => void
  getTodosForWeek: (weekKey: string) => Todo[]
  getTodosForDay: (weekKey: string, dayOfWeek: number) => Todo[]
  getCompletionRate: (weekKey: string) => number
  getCategoryStats: (weekKey: string) => Record<Category, { total: number; done: number }>
}

export const useTodoStore = create<TodoState>()(
  persist(
    (set, get) => ({
      todos: [],

      addTodo: (text, category, dayOfWeek, weekKey) => {
        const todo: Todo = {
          id: crypto.randomUUID(),
          text,
          category,
          completed: false,
          dayOfWeek,
          weekKey: weekKey || getWeekKey(new Date()),
          createdAt: Date.now(),
        }
        set((state) => ({ todos: [...state.todos, todo] }))
      },

      toggleTodo: (id) => {
        set((state) => ({
          todos: state.todos.map((t) =>
            t.id === id ? { ...t, completed: !t.completed } : t
          ),
        }))
      },

      deleteTodo: (id) => {
        set((state) => ({ todos: state.todos.filter((t) => t.id !== id) }))
      },

      getTodosForWeek: (weekKey) => {
        return get().todos.filter((t) => t.weekKey === weekKey)
      },

      getTodosForDay: (weekKey, dayOfWeek) => {
        return get().todos.filter(
          (t) => t.weekKey === weekKey && t.dayOfWeek === dayOfWeek
        )
      },

      getCompletionRate: (weekKey) => {
        const weekTodos = get().todos.filter((t) => t.weekKey === weekKey)
        if (weekTodos.length === 0) return 0
        return Math.round(
          (weekTodos.filter((t) => t.completed).length / weekTodos.length) * 100
        )
      },

      getCategoryStats: (weekKey) => {
        const weekTodos = get().todos.filter((t) => t.weekKey === weekKey)
        const stats: Record<Category, { total: number; done: number }> = {
          work: { total: 0, done: 0 },
          personal: { total: 0, done: 0 },
          health: { total: 0, done: 0 },
          study: { total: 0, done: 0 },
        }
        for (const todo of weekTodos) {
          stats[todo.category].total++
          if (todo.completed) stats[todo.category].done++
        }
        return stats
      },
    }),
    { name: 'smart-todo-storage', storage: aitStorage }
  )
)
