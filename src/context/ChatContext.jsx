import { createContext, useContext, useState } from "react"
import { users as mockUsers } from "../services/mockApi"

const ChatContext = createContext()

const ChatProvider = ({ children }) => {
  const [users, setUsers] = useState(mockUsers)
  const [selectedUserId, setSelectedUserId] = useState(null)
  const [loggedUser, setLoggedUser] = useState(JSON.parse(localStorage.getItem("user")) || null)

  const handleUser = (user) => {
    setLoggedUser(user)
    localStorage.setItem("user", JSON.stringify(user))
  }

  const handleSelectedUserId = (id) => {
    setSelectedUserId(id)
  }
}
