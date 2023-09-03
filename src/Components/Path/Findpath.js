import React, { useEffect, useState } from 'react';

 
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
        backtrack(row , col + 1, visited, newPath) 
         
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

          
          const cell = document.getElementById(`${row}-${col}`);
          
          if (cell) {
            cell.style.backgroundColor = '#F9B5D0';
            cell.style.boxShadow = 'rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset';

          }
          i++;
          if (i === path.length - 1) {
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
