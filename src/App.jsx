import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home"
import Movie_Detalis from "./pages/Movie_Detalis";
import Navbar from "./components/Navbar";
import Search_resul from "./pages/Search_resul";

function App() {


  return (
    <>
    <div className="">
      <Navbar/>
    <Routes>
      
        <Route path="/" element={<Home/>} />
        <Route path="/movie/:movie_id" element={<Movie_Detalis/>} />
        <Route path="/search/:query" element={<Search_resul />} />
      
    </Routes>
    </div>
    </>
  )
}

export default App
