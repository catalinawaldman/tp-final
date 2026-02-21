import { useState, useRef, useEffect } from "react"

const Chat = ({ activeUser }) => {
  const [text, setText] = useState("")
  const chatBodyRef = useRef(null)

  const handleChangeText = (event) => {
    setText(event.target.value)
  }

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      sendMessage()
    }
  }

  const sendMessage = () => {
    if (text.trim() === "") return

    const currentTime = new Date()
    const newMessage = {
      author: "me",
      time: `${currentTime.getHours()}:${currentTime.getMinutes()}`,
      text: text
    }

    // agregamos el mensaje al usuario activo
    activeUser.messages.push(newMessage)

    setText("")
  }

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight
    }
  }, [activeUser])

  if (!activeUser) {
    return (
      <section className="chat-cont-empty">
        <p>Selecciona un contacto para empezar a conversar</p>
      </section>
    )
  }

  return (
    <section className="chat">
      <header>
        <h2>{activeUser.firstName} {activeUser.lastName}</h2>
        <p>{activeUser.address.country}</p>
      </header>

      <div className="chat-body" ref={chatBodyRef}>
        {activeUser.messages.map((message, index) => (
          <div
            key={index}
            className={`message ${
              message.author === "me" ? "me" : "received"
            }`}
          >
            <p><b>{message.author}</b>: {message.text}</p>
            <p className="timestamp">{message.time}</p>
          </div>
        ))}
      </div>

      <div className="chat-input">
        <input
          type="text"
          name="message"
          placeholder="Escribe un mensaje..."
          onChange={handleChangeText}
          onKeyDown={handleKeyDown}
          value={text}
        />
        <button onClick={sendMessage}>Enviar</button>
      </div>
    </section>
  )
}

export { Chat }
