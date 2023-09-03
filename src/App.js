
import Maze from "./Components/Maze/Maze";
import React from "react";
import Nav from "./Components/Navbar/Nav";
import './styles.css';
import Footer from "./Components/Footer/Footer";

function App() {
  return (
    <div className="App dark-bg" >
      <Nav/>
      <Maze/>
       <Footer/>
    </div>
  );
}

export default App;
