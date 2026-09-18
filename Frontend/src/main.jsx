import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { AudioProvider } from "./hooks/AudioProvider.jsx";
import { PlayerProvider } from "./hooks/PlayerProvider.jsx";

import "./styles/theme.css";
import "./styles/layout.css";
import "./styles/home.css";
import "./styles/levels.css";
import "./styles/game.css";
import "./styles/leaderboard.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AudioProvider>
        <PlayerProvider>
          <App />
        </PlayerProvider>
      </AudioProvider>
    </BrowserRouter>
  </React.StrictMode>
);
