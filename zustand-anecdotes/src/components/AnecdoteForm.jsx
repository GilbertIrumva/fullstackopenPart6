import { useAnecdoteActions } from '../store'

const AnecdoteForm = () => {
  const actions = useAnecdoteActions()

  const addAnecdote = async (event) => {
    event.preventDefault()

    const content = event.target.anecdote.value

    if (!content.trim()) {
      return
    }

    await actions.create(content)

    event.target.anecdote.value = ''
  }

  return (
    <div>
      <h2>create new</h2>

      <form onSubmit={addAnecdote}>
        <div>
          <input name="anecdote" />
        </div>

        <button type="submit">
          create
        </button>
      </form>
    </div>
  )
}

export default AnecdoteForm