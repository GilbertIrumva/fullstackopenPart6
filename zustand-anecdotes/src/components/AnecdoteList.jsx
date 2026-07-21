import { useAnecdotes, useAnecdoteActions } from '../store'

const AnecdoteList = () => {
 const anecdotes = useAnecdotes().toSorted(
  (a, b) => b.votes - a.votes
)
  const actions = useAnecdoteActions()

  const vote = (id) => {
    actions.vote(id)
  }

  return (
    <>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>
              vote
            </button>
          </div>
        </div>
      ))}
    </>
  )
}

export default AnecdoteList