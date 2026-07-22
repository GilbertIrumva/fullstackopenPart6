import { create } from 'zustand'

const useAnecdoteStore = create((set) => ({
  anecdotes: [],
  filter: '',

  actions: {
    initializeAnecdotes: async () => {
      const response = await fetch('http://localhost:3001/anecdotes')
      const anecdotes = await response.json()

      set({ anecdotes })
    },

    vote: async (id) => {
      const anecdote = useAnecdoteStore
        .getState()
        .anecdotes.find((a) => a.id === id)

      const updatedAnecdote = {
        ...anecdote,
        votes: anecdote.votes + 1
      }

      const response = await fetch(
        `http://localhost:3001/anecdotes/${id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(updatedAnecdote)
        }
      )

      const returnedAnecdote = await response.json()

      set((state) => ({
        anecdotes: state.anecdotes.map((anecdote) =>
          anecdote.id === id
            ? returnedAnecdote
            : anecdote
        )
      }))
    },

    delete: async (id) => {
      await fetch(
        `http://localhost:3001/anecdotes/${id}`,
        {
          method: 'DELETE'
        }
      )

      set((state) => ({
        anecdotes: state.anecdotes.filter(
          (anecdote) => anecdote.id !== id
        )
      }))
    },

    create: async (content) => {
      const newAnecdote = {
        content,
        votes: 0
      }

      const response = await fetch(
        'http://localhost:3001/anecdotes',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(newAnecdote)
        }
      )

      const createdAnecdote = await response.json()

      set((state) => ({
        anecdotes: state.anecdotes.concat(createdAnecdote)
      }))
    },

    setFilter: (filter) =>
      set({
        filter
      })
  }
}))

export const useAnecdotes = () =>
  useAnecdoteStore((state) => state.anecdotes)

export const useFilter = () =>
  useAnecdoteStore((state) => state.filter)

export const useAnecdoteActions = () =>
  useAnecdoteStore((state) => state.actions)

export { useAnecdoteStore }