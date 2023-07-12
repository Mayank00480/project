import React from 'react'
import LeftSidebar from '../../components//LeftSidebar/LeftSidebar'
import RightSidebar from '../../components/RightSidebar/RightSidebar'
import Header from '../../components/Header/Header'
import '../../App.css'
const SocialMedia = () => {
  return (
    <div className = "home-container-1">
    <LeftSidebar />
    <div className = "home-container-2">
        <Header/>
        <RightSidebar />
    </div>
</div>
  )
}

export default SocialMedia