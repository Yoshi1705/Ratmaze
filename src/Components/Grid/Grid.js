import React, { useState, useEffect } from "react";
import "./style.css";

import brick from "./brick.jpg";
import Findpath from "../Path/Findpath";

function Grid({ selectedImage, bricks, img1, img3, showAnimation, speed }) {

   
  const [imagePositions, setImagePositions] = useState([]);
  const [ratPosition, setRatPosition] = useState(null);
  const [cheesePosition, setCheesePosition] = useState(null);
  const [GridSize,setGridsize] = useState(null);

  const [grid, setGrid] = useState([]);

  const handleGridClick = (row, col) => {
    if (ratPosition && selectedImage === ratPosition.image) {
      window.alert("You have already placed a rat 🐭");
      return;
    } else if (cheesePosition && selectedImage === cheesePosition.image) {
      window.alert("There should be only one cheese lol 😂");
      return;
    }

    if (!ratPosition && selectedImage === img1) {
      setRatPosition({ row, col, image: selectedImage });
    }

    if (!cheesePosition && selectedImage === img3) {
      setCheesePosition({ row, col, image: selectedImage });
    }

    const newPosition = { row, col, image: selectedImage };
    setImagePositions((prevPositions) => [...prevPositions, newPosition]);
  };


  useEffect(()=>{

    const handleResize = () => {
      if (window.innerWidth <= 967) {
        setGridsize(10);
      } else {
        setGridsize(21); 
      }
    };

    handleResize();
    
    window.addEventListener("resize", handleResize); // Add event listener for window resize

    return () => {
      window.removeEventListener("resize", handleResize); // Clean up the event listener
    };

  },[])

  useEffect(() => {
    const newGrid = [];
    

    for (let row = 0; row <  GridSize; row++) {
      const currentRow = [];

      for (let col = 0; col <  GridSize; col++) {
        const isFirstNodeFirstRow = row === 0 && col === 0;
        const isLastNodeLastRow = row ===  GridSize - 1 && col ===  GridSize - 1;
        const nodeClassName = isFirstNodeFirstRow || isLastNodeLastRow ? "node node-border-radius" : "node";

        const imagePosition = imagePositions.find((position) => position.row === row && position.col === col);
        const isBrickPosition = bricks.includes(row *GridSize + col);
        const backgroundImage = isBrickPosition ? `url(${brick})` : imagePosition ? `url(${imagePosition.image})` : "";

        currentRow.push(
          <div
            className={nodeClassName}
            id={`${row}-${col}`}
            key={`${row}-${col}`}
            onClick={() => handleGridClick(row, col)}
            style={{ backgroundImage }}
          />
        );
      }

      newGrid.push(
        <div className="row" key={row}>
          {currentRow}
        </div>
      );
    }

    setGrid(newGrid);
  }, [ GridSize, imagePositions, bricks, selectedImage, ratPosition, cheesePosition]);

  return (
    <section>
      <div className="container">{grid}</div>
      {showAnimation && (
        <Findpath  GridSize = {GridSize} bricks={bricks} ratPosition={ratPosition} cheesePosition={cheesePosition} speed={speed} />
      )}
    </section>
  );
}

export default Grid;
