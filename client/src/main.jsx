import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import ProviderChat from "./contexts/ContextChat.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ProviderChat>
      <App />
    </ProviderChat>
  </StrictMode>
);
