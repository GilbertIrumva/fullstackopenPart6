import { useAnecdoteActions } from '../store'
import useNotificationStore from '../notificationStore'

const AnecdoteForm = () => {
  const actions = useAnecdoteActions()

  const setNotification = useNotificationStore(
    (state) => state.setNotification
  )

  const addAnecdote = async (event) => {
    event.preventDefault()

    const content = event.target.anecdote.value

    if (!content.trim()) {
      return
    }

    await actions.create(content)

    setNotification(
      `you created '${content}'`
    )

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