export default function SudokuBoard({ userGrid, isGiven, selected, wrongCells, feedback, onSelect }) {
  const selectedValue =
    selected && userGrid ? userGrid[selected.r][selected.c] : 0;

  return (
    <div
      className="sudoku-board"
      role="grid"
      aria-label="Sudoku board"
    >
      {userGrid.map((row, r) =>
        row.map((val, c) => {
          const given = isGiven(r, c);

          const isSelected =
            selected &&
            selected.r === r &&
            selected.c === c;

          const isPeer =
            selected &&
            !isSelected &&
            (
              selected.r === r ||
              selected.c === c ||
              (
                Math.floor(selected.r / 3) === Math.floor(r / 3) &&
                Math.floor(selected.c / 3) === Math.floor(c / 3)
              )
            );

          const isSameValue =
            selectedValue !== 0 &&
            val === selectedValue &&
            !isSelected;

          const isWrong = wrongCells.has(`${r}-${c}`);

          const isFeedbackTarget =
            feedback &&
            feedback.r === r &&
            feedback.c === c;

          /*
           * Border classes
           *
           * Every third row/column receives a stronger border
           * to visually separate the 3x3 Sudoku blocks.
           */
          const borderClasses = [
            c % 3 === 0 ? "block-left" : "",
            c % 3 === 2 ? "block-right" : "",
            r % 3 === 0 ? "block-top" : "",
            r % 3 === 2 ? "block-bottom" : "",
          ];

          const stateClasses = [
            given ? "given" : "",
            isSelected ? "selected" : "",
            isPeer && !isSelected ? "peer" : "",
            isSameValue ? "same-value" : "",
            isWrong ? "wrong" : "",
            isFeedbackTarget
              ? feedback.correct
                ? "cell-pop"
                : "cell-shake"
              : "",
          ];

          const classes = [
            "sudoku-cell",
            ...borderClasses,
            ...stateClasses,
          ]
            .filter(Boolean)
            .join(" ");

          /*
           * Changing the key when feedback.token changes forces
           * React to remount this cell, allowing the animation
           * to replay even for repeated attempts on the same cell.
           */
          const key = isFeedbackTarget
            ? `${r}-${c}-${feedback.token}`
            : `${r}-${c}`;

          return (
            <button
              key={key}
              type="button"
              className={classes}
              onClick={() => onSelect(r, c)}
              role="gridcell"
              aria-selected={isSelected}
              aria-label={`Row ${r + 1}, column ${c + 1}${
                val ? `, ${val}` : ""
              }`}
            >
              <span className="sudoku-cell-value">
                {val !== 0 ? val : ""}
              </span>
            </button>
          );
        })
      )}
    </div>
  );
}