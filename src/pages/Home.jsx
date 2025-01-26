import React from 'react'

import TopRated from '../components/TopRated'
import New_movies from '../components/New_movies'
import Home_poster from '../components/Home _poster'
import Footer from '../components/Footer'



const Home = () => {
  return (
    <div>
        <Home_poster/>
        <TopRated/>
        <New_movies/>
        <Footer/>
     
     
    </div>
  )
}

export default Home