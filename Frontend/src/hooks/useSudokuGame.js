import { useCallback, useEffect, useRef, useState } from "react";
import { api } from "../api/client";

const emptyGridLike = (grid) => grid.map((row) => row.map(() => 0));

export function useSudokuGame(difficulty) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [puzzle, setPuzzle] = useState(null); // original given grid (0 = blank)
  const [solution, setSolution] = useState(null);
  const [userGrid, setUserGrid] = useState(null);
  const [wrongCells, setWrongCells] = useState(new Set());
  const [selected, setSelected] = useState(null); // {r, c}
  const [correctInputs, setCorrectInputs] = useState(0);
  const [totalInputs, setTotalInputs] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [status, setStatus] = useState("loading"); // loading | playing | won
  const [feedback, setFeedback] = useState(null); // { r, c, correct, token } -- drives cell pop/shake

  const timerRef = useRef(null);

  const loadPuzzle = useCallback(async () => {
    setLoading(true);
    setError(null);
    setStatus("loading");
    try {
      const data = await api.getPuzzle(difficulty);
      setPuzzle(data.puzzle);
      setSolution(data.solution);
      setUserGrid(data.puzzle.map((row) => row.slice()));
      setWrongCells(new Set());
      setSelected(null);
      setCorrectInputs(0);
      setTotalInputs(0);
      setSeconds(0);
      setStatus("playing");
    } catch (err) {
      setError("Couldn't load a puzzle. Is the backend running on localhost:8000?");
      setStatus("loading");
    } finally {
      setLoading(false);
    }
  }, [difficulty]);

  useEffect(() => {
    loadPuzzle();
  }, [loadPuzzle]);

  useEffect(() => {
    if (status !== "playing") {
      clearInterval(timerRef.current);
      return;
    }
    timerRef.current = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(timerRef.current);
  }, [status]);

  const selectCell = useCallback(
    (r, c) => {
      if (status !== "playing") return;
      setSelected({ r, c });
    },
    [status]
  );

  const isGiven = useCallback((r, c) => puzzle && puzzle[r][c] !== 0, [puzzle]);

  const checkWin = useCallback((grid) => {
    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        if (grid[r][c] !== solution[r][c]) return false;
      }
    }
    return true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [solution]);

  const inputNumber = useCallback(
    (num) => {
      if (status !== "playing" || !selected) return null;
      const { r, c } = selected;
      if (isGiven(r, c)) return null;

      const correct = solution[r][c] === num;

      const nextGrid = userGrid.map((row) => row.slice());
      nextGrid[r][c] = num;
      setUserGrid(nextGrid);

      setTotalInputs((n) => n + 1);
      setFeedback((prev) => ({ r, c, correct, token: (prev?.token ?? 0) + 1 }));

      const key = `${r}-${c}`;
      setWrongCells((prev) => {
        const next = new Set(prev);
        if (correct) next.delete(key);
        else next.add(key);
        return next;
      });

      if (correct) {
        setCorrectInputs((n) => n + 1);
        if (checkWin(nextGrid)) {
          setStatus("won");
        }
      }

      return correct;
    },
    [status, selected, isGiven, solution, userGrid, checkWin]
  );

  const eraseCell = useCallback(() => {
    if (status !== "playing" || !selected) return;
    const { r, c } = selected;
    if (isGiven(r, c)) return;

    const nextGrid = userGrid.map((row) => row.slice());
    nextGrid[r][c] = 0;
    setUserGrid(nextGrid);

    setWrongCells((prev) => {
      const next = new Set(prev);
      next.delete(`${r}-${c}`);
      return next;
    });
  }, [status, selected, isGiven, userGrid]);

  return {
    loading,
    error,
    puzzle,
    userGrid,
    wrongCells,
    selected,
    correctInputs,
    totalInputs,
    seconds,
    status,
    feedback,
    isGiven,
    selectCell,
    inputNumber,
    eraseCell,
    reload: loadPuzzle,
  };
}

export const _internal = { emptyGridLike };