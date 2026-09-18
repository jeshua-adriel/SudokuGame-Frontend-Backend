import { useAudio } from "../hooks/AudioProvider.jsx";

export default function AudioPanel() {
  const { musicOn, sfxOn, volume, setVolume, toggleMusic, toggleSfx, startMusic } = useAudio();

  return (
    <div className="audio-panel">
      <div className="audio-row">
        <span>Music</span>
        <button
          type="button"
          className={`toggle ${musicOn ? "on" : ""}`}
          onClick={() => {
            startMusic();
            toggleMusic();
          }}
          aria-label="Toggle background music"
        />
      </div>
      <div className="audio-row">
        <span>Sound effects</span>
        <button
          type="button"
          className={`toggle ${sfxOn ? "on" : ""}`}
          onClick={toggleSfx}
          aria-label="Toggle sound effects"
        />
      </div>
      <div className="audio-row">
        <span>Volume</span>
        <input
          type="range"
          min="0"
          max="1"
          step="0.05"
          value={volume}
          onChange={(e) => setVolume(Number(e.target.value))}
        />
      </div>
    </div>
  );
}
