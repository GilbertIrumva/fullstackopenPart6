import {useMutation, useQueryClient} from '@tanstack/react-query'

import useAnecdotes from './hooks/useAnecdotes'

import Notification from './components/Notification'

import {
  createAnecdote,
  updateAnecdote
} from './requests'

import {
  useNotificationDispatch
} from './NotificationContext'

const App = () => {
  const queryClient = useQueryClient()
  const dispatch = useNotificationDispatch()

  const result = useAnecdotes()

  const showNotification = (message) => {
    dispatch({
      type: 'SET_NOTIFICATION',
      payload: message
    })

    setTimeout(() => {
      dispatch({
        type: 'CLEAR_NOTIFICATION'
      })
    }, 5000)
  }


const newAnecdoteMutation = useMutation({
  mutationFn: createAnecdote,

  onSuccess: (newAnecdote) => {
    queryClient.invalidateQueries({
      queryKey: ['anecdotes']
    })

    showNotification(
      `you created '${newAnecdote.content}'`
    )
  },

  onError: (error) => {
    showNotification(
      error.response.data.error
    )
  }
})


  const voteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: (updatedAnecdote) => {
      queryClient.invalidateQueries({
        queryKey: ['anecdotes']
      })

      showNotification(
        `you voted '${updatedAnecdote.content}'`
      )
    }
  })

  const addAnecdote = (event) => {
    event.preventDefault()

    const content = event.target.anecdote.value

    event.target.anecdote.value = ''

    newAnecdoteMutation.mutate({
      content,
      votes: 0
    })
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