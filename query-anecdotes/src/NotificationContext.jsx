import { createContext, useContext, useReducer } from 'react'

const NotificationContext = createContext()

const notificationReducer = (state, action) => {
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
  const [notification, dispatch] = useReducer(
    notificationReducer,
    ''
  )

  return (
    <NotificationContext.Provider
      value={[notification, dispatch]}
    >
      {children}
    </NotificationContext.Provider>
  )
}

export const useNotificationValue = () => {
  const value = useContext(NotificationContext)
  return value[0]
}

export const useNotificationDispatch = () => {
  const value = useContext(NotificationContext)
  return value[1]
}