import { createContext, useState, useEffect } from "react"
import { users as mockUsers } from "../services/mockApi"

const ChatContext = createContext()

const ChatProvider = ({ children }) => {

  const [users, setUsers] = useState(() => {
    const storedUsers = localStorage.getItem("users")
    return storedUsers ? JSON.parse(storedUsers) : mockUsers
  })

  const [selectedUserId, setSelectedUserId] = useState(null)

  const [loggedUser, setLoggedUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  )

  const handleSelectedUserId = (id) => {
    setSelectedUserId(id)
  }
  
  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users))
  }, [users])

  const handleUser = (user) => {
    setLoggedUser(user)
    localStorage.setItem("user", JSON.stringify(user))
  }

  const login = (userData) => {
    const foundUser = users.find(
      user => user.email === userData.email
    )

    if (!foundUser) return null
    if (foundUser.password === userData.password) return foundUser

    return null
  }

  const logout = () => {
    localStorage.removeItem("user")
    setLoggedUser(null)
  }

  const handleMessages = (newMessage) => {
    setUsers((prevValue) =>
      prevValue.map((user) =>
        user.id === selectedUserId
          ? {
              ...user,
              messages: [...user.messages, newMessage]
            }
          : user
      )
    )
  }

  const selectedUser = users.find(user => user.id === selectedUserId)

  return (
    <ChatContext.Provider
      value={{
        users,
        handleSelectedUserId,
        login,
        logout,
        handleUser,
        loggedUser,
        handleMessages,
        selectedUser
      }}
    >
      {children}
    </ChatContext.Provider>
  )
}

export { ChatContext, ChatProvider }