import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";

/*
 * Audio is intentionally file-based rather than bundled: drop your own
 * tracks into public/audio using these exact filenames and everything
 * below just works. See public/audio/README.md for the full list.
 *
 * Missing files fail silently (caught .play() rejections) so the app
 * never breaks just because a sound hasn't been added yet.
 */
const BGM_SRC = "/audio/bgm.mp3";
const SFX_SRC = {
  select: "/audio/sfx/select.mp3",
  correct: "/audio/sfx/correct.mp3",
  wrong: "/audio/sfx/wrong.mp3",
  win: "/audio/sfx/win.mp3",
};

const AudioCtx = createContext(null);

export function AudioProvider({ children }) {
  const bgmRef = useRef(null);
  const sfxRefs = useRef({});
  const [musicOn, setMusicOn] = useState(true);
  const [sfxOn, setSfxOn] = useState(true);
  const [volume, setVolume] = useState(0.5);
  const [musicStarted, setMusicStarted] = useState(false);

  useEffect(() => {
    const el = new Audio(BGM_SRC);
    el.loop = true;
    el.volume = volume;
    bgmRef.current = el;

    Object.entries(SFX_SRC).forEach(([name, src]) => {
      sfxRefs.current[name] = new Audio(src);
    });

    return () => {
      el.pause();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (bgmRef.current) bgmRef.current.volume = volume;
    Object.values(sfxRefs.current).forEach((a) => (a.volume = volume));
  }, [volume]);

  useEffect(() => {
    const el = bgmRef.current;
    if (!el) return;
    if (musicOn && musicStarted) {
      el.play().catch(() => {
        /* file missing or autoplay blocked -- silently no-op */
      });
    } else {
      el.pause();
    }
  }, [musicOn, musicStarted]);

  const value = useMemo(
    () => ({
      musicOn,
      sfxOn,
      volume,
      setVolume,
      toggleMusic: () => setMusicOn((v) => !v),
      toggleSfx: () => setSfxOn((v) => !v),
      // Browsers block autoplay before a user gesture -- call this from
      // any click handler (e.g. the homepage's "Play" button) to unlock it.
      startMusic: () => setMusicStarted(true),
      playSfx: (name) => {
        if (!sfxOn) return;
        const el = sfxRefs.current[name];
        if (!el) return;
        el.currentTime = 0;
        el.play().catch(() => {});
      },
    }),
    [musicOn, sfxOn, volume]
  );

  return <AudioCtx.Provider value={value}>{children}</AudioCtx.Provider>;
}

export function useAudio() {
  const ctx = useContext(AudioCtx);
  if (!ctx) throw new Error("useAudio must be used within AudioProvider");
  return ctx;
}
