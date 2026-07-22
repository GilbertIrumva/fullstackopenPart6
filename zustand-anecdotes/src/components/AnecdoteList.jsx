import {
  useAnecdotes,
  useFilter,
  useAnecdoteActions
} from '../store'

const AnecdoteList = () => {
  const anecdotes = useAnecdotes()
  const filter = useFilter()
  const actions = useAnecdoteActions()

  const filteredAnecdotes = anecdotes
    .filter((anecdote) =>
      anecdote.content
        .toLowerCase()
        .includes(filter.toLowerCase())
    )
    .toSorted((a, b) => b.votes - a.votes)

  const vote = async (id) => {
    await actions.vote(id)
  }

  const remove = async (id) => {
    await actions.delete(id)
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