
import {
  render,
  screen,
  cleanup,
  fireEvent
} from '@testing-library/react'

import {
  describe,
  test,
  expect,
  beforeEach,
  afterEach,
  vi
} from 'vitest'

import AnecdoteList from './AnecdoteList'
import { useAnecdoteStore } from '../store'

describe('AnecdoteList', () => {
  beforeEach(() => {
    useAnecdoteStore.setState({
      anecdotes: [
        {
          id: '1',
          content: 'least votes',
          votes: 1
        },
        {
          id: '2',
          content: 'most votes',
          votes: 10
        },
        {
          id: '3',
          content: 'middle votes',
          votes: 5
        }
      ],
      filter: ''
    })
  })

  afterEach(() => {
    cleanup()
  })

  test('renders anecdotes sorted by votes', () => {
    const { container } = render(
      <AnecdoteList />
    )

    const renderedContent = Array.from(
      container.querySelectorAll(
        'div > div:first-child'
      )
    )
      .map((element) => element.textContent)
      .filter(Boolean)

    expect(renderedContent[0]).toBe(
      'most votes'
    )
    expect(renderedContent[1]).toBe(
      'middle votes'
    )
    expect(renderedContent[2]).toBe(
      'least votes'
    )
  })

  test('renders only anecdotes matching filter', () => {
    useAnecdoteStore.setState({
      anecdotes: [
        {
          id: '1',
          content: 'React is great',
          votes: 5
        },
        {
          id: '2',
          content: 'Vue is good',
          votes: 3
        },
        {
          id: '3',
          content: 'React hooks',
          votes: 8
        }
      ],
      filter: 'react'
    })

    render(<AnecdoteList />)

    expect(
      screen.getByText('React is great')
    ).toBeTruthy()

    expect(
      screen.getByText('React hooks')
    ).toBeTruthy()

    expect(
      screen.queryByText('Vue is good')
    ).toBeNull()
  })

  test('voting increases anecdote votes', async () => {
    const voteMock = vi.fn()

    useAnecdoteStore.setState({
      anecdotes: [
        {
          id: '1',
          content: 'test anecdote',
          votes: 1
        }
      ],
      filter: '',
      actions: {
        ...useAnecdoteStore.getState().actions,
        vote: voteMock
      }
    })

    render(<AnecdoteList />)

    const voteButton =
      screen.getByText('vote')

    fireEvent.click(voteButton)

    expect(voteMock).toHaveBeenCalledTimes(1)
    expect(voteMock).toHaveBeenCalledWith('1')
  })
})

