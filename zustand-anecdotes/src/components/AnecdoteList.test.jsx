
import { render, screen } from '@testing-library/react'
import { describe, test, expect, beforeEach } from 'vitest'

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

  test('renders anecdotes sorted by votes', () => {
    const { container } = render(<AnecdoteList />)

    const renderedContent = Array.from(
      container.querySelectorAll('div > div:first-child')
    )
      .map((element) => element.textContent)
      .filter(Boolean)

    expect(renderedContent[0]).toBe('most votes')
    expect(renderedContent[1]).toBe('middle votes')
    expect(renderedContent[2]).toBe('least votes')
  })
})

