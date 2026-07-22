import { create } from 'zustand'

const useNotificationStore = create((set) => ({
  notification: null,

  setNotification: (message) => {
    set({ notification: message })

    setTimeout(() => {
      set({ notification: null })
    }, 5000)
  }
}))

export default useNotificationStore