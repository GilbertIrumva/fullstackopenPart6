
import {
  useAnecdotes,
  useFilter,
  useAnecdoteActions
} from '../store'

import useNotificationStore from '../notificationStore'

const AnecdoteList = () => {
  const anecdotes = useAnecdotes()
  const filter = useFilter()
  const actions = useAnecdoteActions()

  const setNotification = useNotificationStore(
    (state) => state.setNotification
  )

  const filteredAnecdotes = anecdotes
    .filter((anecdote) =>
      anecdote.content
        .toLowerCase()
        .includes(filter.toLowerCase())
    )
    .toSorted((a, b) => b.votes - a.votes)

  const vote = async (id) => {
    const anecdote = anecdotes.find(
      (a) => a.id === id
    )

    await actions.vote(id)

    setNotification(
      `you voted '${anecdote.content}'`
    )
  }

  const remove = async (id) => {
    const anecdote = anecdotes.find(
      (a) => a.id === id
    )

    await actions.delete(id)

    setNotification(
      `you deleted '${anecdote.content}'`
    )
  }

  return (
    <>
      {filteredAnecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>

          <div>
            has {anecdote.votes}

            <button onClick={() => vote(anecdote.id)}>
              vote
            </button>

            {anecdote.votes === 0 && (
              <button onClick={() => remove(anecdote.id)}>
                delete
              </button>
            )}
          </div>
        </div>
      ))}
    </>
  )
}

export default AnecdoteList

