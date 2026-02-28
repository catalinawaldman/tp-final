import { createContext, useState, useEffect } from "react";
import { users as mockUsers } from "../services/mockApi";

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  // Estado de usuarios: arranca con los de localStorage o con mockUsers
  const [users, setUsers] = useState(() => {
    const storedUsers = localStorage.getItem("users");
    return storedUsers ? JSON.parse(storedUsers) : mockUsers;
  });

  const [selectedUserId, setSelectedUserId] = useState(null);

  // Usuario logueado: arranca con lo que haya en localStorage
  const [loggedUser, setLoggedUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  // Persistir lista de usuarios en localStorage cada vez que cambie
  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  // Guardar usuario logueado
  const handleUser = (user) => {
    setLoggedUser(user);
    localStorage.setItem("user", JSON.stringify(user));
  };

  // Registrar nuevo usuario
  const register = (newUserData) => {
    const newUser = {
      id: users.length + 1,
      firstName: newUserData.nombre,
      lastName: newUserData.apellido,
      age: newUserData.edad,
      address: { country: newUserData.pais },
      email: newUserData.email,
      password: newUserData.password,
      image: "https://via.placeholder.com/45", // avatar por defecto
      messages: []
    };

    // Agregar al array de usuarios y persistir
    setUsers((prev) => {
      const updatedUsers = [...prev, newUser];
      localStorage.setItem("users", JSON.stringify(updatedUsers));
      return updatedUsers;
    });

    // Guardar como usuario logueado
    setLoggedUser(newUser);
    localStorage.setItem("user", JSON.stringify(newUser));
  };

  // Login: busca usuario en la lista y valida contraseña
  const login = (userData) => {
    const foundUser = users.find(user => user.email === userData.email);
    if (!foundUser) return null;
    if (foundUser.password === userData.password) {
      setLoggedUser(foundUser);
      localStorage.setItem("user", JSON.stringify(foundUser));
      return foundUser;
    }
    return null;
  };

  // Logout
  const logout = () => {
    localStorage.removeItem("user");
    setLoggedUser(null);
  };

  // Seleccionar usuario en el chat
  const handleSelectedUserId = (id) => setSelectedUserId(id);

  // Manejar mensajes
  const handleMessages = (newMessage) => {
    setUsers((prevValue) =>
      prevValue.map((user) =>
        user.id === selectedUserId
          ? { ...user, messages: [...user.messages, newMessage] }
          : user
      )
    );
  };

  const selectedUser = users.find(user => user.id === selectedUserId);

  return (
    <ChatContext.Provider
      value={{
        users,
        handleSelectedUserId,
        login,
        logout,
        handleUser,
        register, // 👈 exportado correctamente
        loggedUser,
        handleMessages,
        selectedUser
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export { ChatContext, ChatProvider };
