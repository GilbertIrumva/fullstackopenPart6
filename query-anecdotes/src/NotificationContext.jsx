
import {
  createContext,
  useReducer,
  useContext
} from 'react'

const NotificationContext = createContext()

const notificationReducer = (
  state,
  action
) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.payload

    case 'CLEAR_NOTIFICATION':
      return ''

    default:
      return state
  }
}

export const NotificationContextProvider = ({
  children
}) => {
  const [notification, dispatch] =
    useReducer(notificationReducer, '')

  return (
    <NotificationContext.Provider
      value={[notification, dispatch]}
    >
      {children}
    </NotificationContext.Provider>
  )
}

export const useNotificationValue = () => {
  const notificationAndDispatch =
    useContext(NotificationContext)

  return notificationAndDispatch[0]
}

export const useNotificationDispatch = () => {
  const notificationAndDispatch =
    useContext(NotificationContext)

  return notificationAndDispatch[1]
}

export const useNotify = () => {
  const dispatch = useNotificationDispatch()

  return (message) => {
    dispatch({
      type: 'SET_NOTIFICATION',
      payload: message
    })

    setTimeout(() => {
      dispatch({
        type: 'CLEAR_NOTIFICATION'
      })
    }, 5000)
  }
}

