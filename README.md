# Chat UTN 💬

Aplicación de chat desarrollada en **React** con un diseño **coquette etéreo**, pensada para practicar UI/UX, manejo de estado y estilos responsivos.

---

## Características

- **Login personalizado** con validación y mensajes de error.
- **Lista de contactos** con foto, nombre y país.
- **Chat en tiempo real** con mensajes alineados:
  - Mensajes propios → a la derecha.
  - Mensajes recibidos → a la izquierda.
- **Encabezados alineados** (Chat UTN y nombre del contacto).
- **Estilos coquette** con tipografías elegantes y paleta rosa.
- **Responsive design**:
  - En pantallas grandes: aside + chat.
  - En pantallas medianas: aside arriba, chat abajo.
  - En móviles (≤480px): aside oculto, chat ocupa toda la pantalla.
- **Scroll controlado**:
  - Solo vertical en aside y chat-body.
  - Sin scroll horizontal.

---

## Tecnologías utilizadas

- **React** (componentes funcionales, hooks, context API).
- **React Router** (navegación entre login, chat y not found).
- **CSS puro** con variables, flexbox y grid.
- **Google Fonts**: *Playfair Display* y *Quicksand*.
