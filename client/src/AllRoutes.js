import React from 'react'
import {Routes ,Route} from 'react-router-dom'
import Home from './Pages/Home/Home'
import Login from './Pages/Auth/Login'
import Questions from './Pages/Questions/Questions'  
import AskQuestion from './Pages/AskQuestion/AskQuestion'
import DisplayQuestion from './Pages/Questions/DisplayQuestion'
import Tags from './Pages/Tags/Tags'
import Users from './Pages/Users/Users'
import UserProfile from './Pages/UserProfile/UserProfile'
import SocialMedia from './Pages/SocialMedia/SocialMedia'
export default function AllRoutes() {
  return (
    <Routes>
        <Route  path = "/" element ={<Home/>}/>
        <Route  exact path = "/Login" element ={<Login/>}/>
        <Route  exact path = "/Questions" element ={<Questions/>}/>
        <Route  exact path = "/Questions/:id" element = {<DisplayQuestion />}/>
        <Route  exact path = "/AskQuestion" element= {<AskQuestion />}/>
        <Route path = "/Tags" element = {<Tags/>}/>
        <Route path ="/Users" element = {<Users/>} />
        <Route path ="/Users/:id" element = {<UserProfile/>} />
        <Route  exact path = "/Media" element= {<SocialMedia />}/>
    </Routes>
  )
}
