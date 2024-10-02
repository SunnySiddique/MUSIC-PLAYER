import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { AudioProvider } from "./context/MusicContext.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <AudioProvider>
    <App />
  </AudioProvider>
);
