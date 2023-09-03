import { React, useEffect, useState } from "react";
import "./style.css";
import img1 from "./images/Rat.jpg";
import img2 from "./images/brick.jpg";
import img3 from "./images/Cheese.png";
import Grid from "../Grid/Grid";
function Maze() {
  const [selectedImage, setSelectedImage] = useState(null);

   

  const [bricks, setBricks] = useState([]);

  const [showAnimation, setShowAnimation] = useState(false);

  const [ratclicked, setratclicked] = useState(false);

  const [cheeseclicked, setcheeseclicked] = useState(false);

 
  const [speed, setspeed] = useState(100);

  const handleAnimation = () => {
    setShowAnimation(!showAnimation);
  };

  const handleImageClick = (image) => {
    if (image === img1 && !ratclicked) {
      setSelectedImage(img1);
      setratclicked(true);
    } else if (image === img3 && !cheeseclicked) {
      setSelectedImage(img3);
      setcheeseclicked(true);
    }
  };

  const refreshHandler = () => {
    return window.location.reload();
  };

  const placeBricks = () => {
    const randomBricks = [];
    const totalCells =    21*21;
    const numBricks = Math.floor(totalCells / 4);

    while (randomBricks.length < numBricks) {
      const randomCell = Math.floor(Math.random() * totalCells);
      if (!randomBricks.includes(randomCell)) {
        randomBricks.push(randomCell);
      }
    }

    setBricks(randomBricks);
  };


  

  return (
    <div
      className="container-fluid bg-black box "
      style={{ marginBottom: "20px" }}
    >
      <div className="row align-items-center mx-auto mt-2">
        <div className="d-flex   content">
          <div className="d-flex flex-row ml-3 py-4">
            <p className="font-weight-bold text-xl  ">Backtracking</p>

            <button
              className="btn btn-secondary custom-button  "
              onClick={refreshHandler}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                stroke="currentColor"
                strokeWidth="2"
                className="text-white mx-auto"
                height="25"
                width="25"
              >
                <polyline points="1 4 1 10 7 10"></polyline>
                <polyline points="23 20 23 14 17 14"></polyline>
                <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"></path>
              </svg>
            </button>

            <button
              className="btn btn-secondary custom-button ml-3"
              onClick={placeBricks}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                fill="currentColor"
                className="text-white mx-auto"
                height="25"
                width="25"
              >
                <path d="M212.125 20.156V59.72H39.53V188.56H69.846V293H39.623V483.03H204.687v-12.936H382v-45.5h95.281V264.53h-25.655V74.813H384.03V20.157H212.126zm18.688 18.688h134.53l-.03 35.968H297V153.938H378.28v46.625h18.69V135.25h-81.283V93.5h117.25v171.03H342V201.47H224.656v9.343l-.03 70.187v9.344h75.467v-18.688h-56.75v-51.5h79.97l-.002 126.78-185.937-.03V252.72h41.656v53.686h18.72V174.062h66.875v-18.687h-85.563v78.654h-60.375V293H88.53V188.562h57.44v-18.687H58.22v-91.47h153.905v30.94H111.437v18.686h119.375V38.845zM342 283.22h116.594v122.686H301.97v18.688h61.31v26.812H204.69v-48.812H110v18.687h76v43.064H58.312V311.72h60.376v53.874h9.343l114.782.03v65H261.5v-65H342v-31.529h66.75v33.844h18.688V315.406H342V283.22z"></path>
              </svg>
            </button>
          </div>

          <div className="d-flex flex-row ml-4 grid custom">
             

            <div className="w-140 h-50 ml-2" style={{ marginLeft: "15px" }}>
              <p
                className="text-text"
                style={{
                  marginBottom: "10px",
                  fontSize: "15px",
                  color: " #2fdcce",
                  marginTop: "19px",
                }}
              >
                Speed
              </p>
              <input
                type="range"
                min="50"
                max="100"
                step="10"
                className="thumb:bg-secondary thumb:w-6 thumb:h-6 thumb:rounded-full"
                value={speed}
                onChange={(e) => setspeed(parseInt(e.target.value))}
              />
            </div>
          </div>

          <div
            className="btn d-flex flex-row   py-3 mt-4"
            style={{ border: "none" }}
          >
            <div className="px-3">
              <button
                style={{
                  backgroundImage: `url(${img1})`,
                  width: "40px",
                  height: "40px",
                  backgroundSize: "cover",
                  borderRadius: "5px",
                }}
                onClick={() => handleImageClick(img1)}
                disabled={ratclicked}
              ></button>
            </div>

            <div>
              <button
                style={{
                  backgroundImage: `url(${img3})`,
                  width: "40px",
                  height: "40px",
                  backgroundSize: "cover",
                  borderRadius: "5px",
                }}
                onClick={() => handleImageClick(img3)}
                disabled={cheeseclicked}
              ></button>
            </div>
          </div>

          <div className=" d-flex flex-row  style">
            <h4
              style={{
                marginTop: "45px",
                fontSize: "20px",
                marginRight: "30px",
                marginLeft: "28px",
              }}
            >
              LET'S START
            </h4>
            <button
              className=" btn btn-secondary custom-button "
              style={{ marginTop: "35px" }}
              onClick={handleAnimation}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                stroke="currentColor"
                strokeWidth="0"
                className="text-white m-auto"
                height="25"
                width="25"
              >
                <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <Grid
        selectedImage={selectedImage}
        
        bricks={bricks}
        img1={img1}
        img3={img3}
        showAnimation={showAnimation}
        speed={speed}
      />

      <div>
        <br />
      </div>
    </div>
  );
}

export default Maze;
