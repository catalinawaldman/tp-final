import React from "react";
import ReactDOM from "react-dom/client";
import { ChatProvider } from "./context/ChatContext";
import { RouterApp } from "./router/RouterApp";
import "./styles/main.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChatProvider>
      <RouterApp />
    </ChatProvider>
  </React.StrictMode>
);
