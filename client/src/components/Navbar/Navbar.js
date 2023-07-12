import React,{useEffect} from 'react'
import { Link,useNavigate } from 'react-router-dom'
import logo from '../../Assets/icon.png'
import Second from '../../Assets/Second.svg'
import Avator from '../../components/Avator/Avator';
import decode from 'jwt-decode'

import './Navbar.css'
import { useSelector,useDispatch } from 'react-redux';
import setCurrentUser from '../../actions/CurrentUser';

export default function Navbar() {
  const dispatch = useDispatch()
  const User = useSelector((state) => (state.currentUserReducer))
  useEffect(() => {
    const token = User?.token
    if(token)
    {
      const decodedToken = decode(token)
      if(decodedToken.exp * 1000 < new Date().getTime()){
        handleLogout()
      }
    }
    dispatch(setCurrentUser(JSON.parse(localStorage.getItem('Profile'))))
  },[dispatch])
  const navigate = useNavigate()
  const handleLogout = () =>{
    dispatch({type : 'LOGOUT'})
    navigate('/')
    dispatch(setCurrentUser(null))
  }
   return (
    <nav className = "main-nav">
      <div className = "navbar">
      <Link to="/" className="nav-logo nav-item ">
        <img src={logo} alt="logo" />
      </Link>
      <Link to="/" className="nav-item nav-btn ">About</Link>
      <Link to="/" className="nav-item nav-btn">Product</Link>
      <Link to="/" className="nav-item nav-btn">{" "} For Teams</Link>
      <form>
        <input type="text" placeholder="Search ..." />
        <img src={Second} width="18" className = "search-icon" alt="search"/>
      </form>
      {User === null? (<Link to="/Login" className="nav-item nav-links" >Log In</Link> ):
     ( <>
       <Avator
                backgroundColor="#009dff"
                px="10px"
                py="7px"
                borderRadius="60%"
                color="white"
              >
                <Link
                  to={`/Users/${User?.result?._id}`}
                  style={{ color: "white", textDecoration: "none" }}
                >
                  {User.result.name.charAt(0).toUpperCase()}
                </Link>
              </Avator>
      <button className = "nav-item nav-links" style = {{ position : "relative" , right:"60px" }} onClick ={handleLogout}>Logout</button>
      </>)}</div>
    </nav>
  );
}