import React from 'react'
import './Header.css'
import Avator from '../../components/Avator/Avator';
import {Link} from 'react-router-dom'
import { useSelector } from 'react-redux';
const Header = () => {
    const User = useSelector((state) => (state.currentUserReducer))
  return (
    <div className='main-bar'>
       <div className = "main-bar-header">
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
                  {User?.result?.name.charAt(0).toUpperCase()}
                </Link>
              </Avator>
       <input type = "text" className='data' placeholder = "what's in your mind?" style={{width : '500px',position :'relative',left:'-150px'}} />
</div>
<div ><hr/></div>
    </div>
)
}


export default Header;