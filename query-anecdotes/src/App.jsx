import { useMutation, useQueryClient } from '@tanstack/react-query'

import useAnecdotes from './hooks/useAnecdotes'
import Notification from './components/Notification'

import {
  createAnecdote,
  updateAnecdote
} from './requests'

import { useNotify } from './NotificationContext'

const App = () => {
  const queryClient = useQueryClient()
  const notify = useNotify()

  const result = useAnecdotes()

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,

    onSuccess: (newAnecdote) => {
      queryClient.invalidateQueries({
        queryKey: ['anecdotes']
      })

      notify(
        `you created '${newAnecdote.content}'`
      )
    },

    onError: () => {
      notify(
        'too short anecdote, must have length 5 or more'
      )
    }
  })

  const voteMutation = useMutation({
    mutationFn: updateAnecdote,

    onSuccess: (updatedAnecdote) => {
      queryClient.invalidateQueries({
        queryKey: ['anecdotes']
      })

      notify(
        `you voted '${updatedAnecdote.content}'`
      )
    }
  })

  const addAnecdote = (event) => {
    event.preventDefault()

    const content =
      event.target.anecdote.value.trim()

    newAnecdoteMutation.mutate({
      content,
      votes: 0
    })

    event.target.anecdote.value = ''
  }

  const vote = (anecdote) => {
    voteMutation.mutate({
      ...anecdote,
      votes: anecdote.votes + 1
    })
  }

  if (result.isPending) {
    return <div>loading data...</div>
  }

  if (result.isError) {
    return (
      <div>
        anecdote service not available due to
        problems in server
      </div>
    )
  }

  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />

      <form onSubmit={addAnecdote}>
        <input name="anecdote" />

        <button type="submit">
          create
        </button>
      </form>

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>

          <div>
            has {anecdote.votes} votes

            <button
              onClick={() => vote(anecdote)}
            >
              vote
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default App

