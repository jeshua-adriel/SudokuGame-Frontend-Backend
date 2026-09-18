import { createContext, useContext, useEffect, useState } from "react";
import { api } from "../api/client";

const STORAGE_KEY = "quiet-grid.player";
const PlayerCtx = createContext(null);

export function PlayerProvider({ children }) {
  const [player, setPlayer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      setLoading(false);
      return;
    }
    try {
      const { id } = JSON.parse(stored);
      api.getPlayer(id)
        .then((p) => setPlayer(p))
        .catch(() => clearPlayer())
        .finally(() => setLoading(false));
    } catch {
      clearPlayer();
      setLoading(false);
    }
  }, []);

  const saveSession = (response) => {
    const currentPlayer = response.player || response;
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ id: currentPlayer.id }));
    if (response.access) {
      localStorage.setItem("access_token", response.access);
    }
    localStorage.setItem("username", currentPlayer.name);
    setPlayer(currentPlayer);
    return currentPlayer;
  };

  const login = async (credentials) => {
    return saveSession(await api.loginUser(credentials));
  };

  const register = async (details) => {
    return saveSession(await api.registerUser({
      ...details,
      age: Number(details.age),
    }));
  };

  const refreshPlayer = async () => {
    if (!player) return;
    const fresh = await api.getPlayer(player.id);
    setPlayer(fresh);
  };

  const clearPlayer = () => {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("username");
    setPlayer(null);
  };

  return (
    <PlayerCtx.Provider value={{ player, loading, login, register, refreshPlayer, clearPlayer }}>
      {children}
    </PlayerCtx.Provider>
  );
}

export function usePlayer() {
  const ctx = useContext(PlayerCtx);
  if (!ctx) throw new Error("usePlayer must be used within PlayerProvider");
  return ctx;
}
