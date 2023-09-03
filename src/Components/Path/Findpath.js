import React, { useEffect, useState } from 'react';

import './style.css';

function Findpath({ GridSize, bricks, ratPosition, cheesePosition, speed }) {
  const [path, setPath] = useState([]);

  useEffect(() => {
    const calculatePath = () => {
      if (!ratPosition || !cheesePosition) {
        return;
      }

      const visited = new Array(GridSize)
        .fill(false)
        .map(() => new Array(GridSize).fill(false));
      const newPath = [];
      backtrack(ratPosition.row, ratPosition.col, visited, newPath);
      setPath(newPath.reverse());
    };

    const backtrack = (row, col, visited, newPath) => {
      if (row === cheesePosition.row && col === cheesePosition.col) {
        newPath.push({ row, col });
        return true;
      }

      if (
        row < 0 ||
        row >= GridSize ||
        col < 0 ||
        col >= GridSize ||
        bricks.includes(row * GridSize + col) ||
        visited[row][col]
      ) {
        return false;
      }

      visited[row][col] = true;
     
      if (
        backtrack(row + 1, col, visited, newPath) ||
        backtrack(row, col - 1, visited, newPath) ||
        backtrack(row , col + 1, visited, newPath) ||
        backtrack(row - 1, col , visited, newPath)
      ) {
        newPath.push({ row, col });
        return true;
      }

      return false;
    };

    calculatePath();
  }, [GridSize, bricks, ratPosition, cheesePosition]);

  useEffect(() => {
    if (path.length > 0) {
      const animatePath = () => {
        let i = 0;
        const intervalId = setInterval(() => {
          const { row, col } = path[i];

          console.log(path[i]);
          const cell = document.getElementById(`${row}-${col}`);
          console.log(cell);

          if (cell) {
            cell.style.backgroundColor = '#FFE5E5';
          }
          i++;
          if (i === path.length) {
            clearInterval(intervalId);
          }
        }, speed);
      };

      animatePath();
    }
  }, [path]);

  return <div></div>;
}

export default Findpath;
