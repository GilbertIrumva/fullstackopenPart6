import {
  useFilter,
  useAnecdoteActions
} from '../store'

const Filter = () => {
  const filter = useFilter()
  const actions = useAnecdoteActions()

  return (
    <div>
      filter{' '}
      <input
        value={filter}
        onChange={(event) =>
          actions.setFilter(event.target.value)
        }
      />
    </div>
  )
}

export default Filter