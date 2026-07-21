import { useEffect } from 'react'
import { useAnecdoteActions } from './store'

import Filter from './components/Filter'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'

const App = () => {
  const actions = useAnecdoteActions()

  useEffect(() => {
    actions.initializeAnecdotes()
  }, [])

  return (
    <div>
      <h2>Anecdotes</h2>

      <Filter />

      <AnecdoteList />

      <AnecdoteForm />
    </div>
  )
}

export default App