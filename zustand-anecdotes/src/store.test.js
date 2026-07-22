import { describe, test, expect, vi, beforeEach } from 'vitest'
import { useAnecdoteStore } from './store'

describe('anecdote store', () => {
  beforeEach(() => {
    useAnecdoteStore.setState({
      anecdotes: [],
      filter: ''
    })
  })

  test('initializes anecdotes from backend', async () => {
    const anecdotesFromServer = [
      {
        id: '1',
        content: 'first anecdote',
        votes: 5
      },
      {
        id: '2',
        content: 'second anecdote',
        votes: 3
      }
    ]

    global.fetch = vi.fn().mockResolvedValue({
      json: async () => anecdotesFromServer
    })

    await useAnecdoteStore
      .getState()
      .actions
      .initializeAnecdotes()

    expect(
      useAnecdoteStore.getState().anecdotes
    ).toEqual(anecdotesFromServer)

    expect(fetch).toHaveBeenCalledTimes(1)
  })
})