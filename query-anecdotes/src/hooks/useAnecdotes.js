import { useQuery } from '@tanstack/react-query'
import { getAnecdotes } from '../requests'

const useAnecdotes = () => {
  return useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: false
  })
}

export default useAnecdotes