import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "../views/Home";
import { NotFound } from "../views/NotFound";
import { Login } from "../views/Login";
import { RouteProtected } from "../components/RouteProtected";
import Registro from "../pages/Registro"; // 👈 importar tu componente

const RouterApp = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Ruta raíz ahora muestra Registro */}
        <Route path="/" element={<Registro />} />

        {/* Ruta protegida para el chat/home */}
        <Route path="/chat" element={<RouteProtected><Home /></RouteProtected>} />

        {/* Login sigue estando disponible */}
        <Route path="/login" element={<Login />} />

        {/* Fallback */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export { RouterApp };
