export default function NumberPad({ onInput, onErase, disabled }) {
  return (
    <div className="number-pad">
      {Array.from({ length: 9 }, (_, i) => i + 1).map((n) => (
        <button key={n} type="button" onClick={() => onInput(n)} disabled={disabled}>
          {n}
        </button>
      ))}
      <button type="button" className="erase" onClick={onErase} disabled={disabled}>
        Erase
      </button>
    </div>
  );
}
