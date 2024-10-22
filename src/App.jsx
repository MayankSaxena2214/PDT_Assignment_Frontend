import React from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import {Toaster} from "react-hot-toast"
import Home from './components/Home/Home'
import Navbar from './components/Navbar/Navbar'
import Register from './pages/Register/Register'
import Login from './pages/Login/Login'
import Matches from './components/Matches/Matches'
import MyTeams from './components/MyTeams/MyTeams'
import Players from './components/Players/Players'
import MakeTeam from './components/MakeTeam/MakeTeam'
import Footer from './components/Footer/Footer'
import CreateTeam from './components/CreateTeam/CreateTeam'
import TeamDetails from './components/MyTeams/TeamDetails'
const App = () => {
  return (
    <BrowserRouter>
    <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/make-team' element={<MakeTeam/>}/>
        <Route path="/match/:id/create-team" element={<MakeTeam/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/matches' element={<Matches/>}/>
        <Route path='/myteams' element={<MyTeams/>}/>
        <Route path='/players' element={<Players/>}/>
        <Route path="/teams/:teamId" element={<TeamDetails />} /> {/* Route for team details */}
      </Routes>
      <Footer/>
    <Toaster/>
    </BrowserRouter>
  )
}

export default App