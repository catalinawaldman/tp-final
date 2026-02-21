import { useState } from "react"
import { Aside } from "./Aside"
import { Chat } from "./Chat"
import { users } from "../services/mockApi.js"

const App = () => {
  const [activeUser, setActiveUser] = useState(null)

  const handleActiveUser = (id) => {
    const user = users.find(user => user.id === id)
    setActiveUser(user)
  }

  return (
    <main className='app'>
      <Aside onActiveUser={handleActiveUser} />
      <Chat activeUser={activeUser} />
    </main>
  )
}

export { App }
