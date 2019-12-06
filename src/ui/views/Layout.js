import React from 'react'

import useMedia from '../components/hooks/useMedia'
import DesktopHome from '../components/home/DesktopHome'
import MobileHome from '../components/home/MobileHome'

function Layout() {
    const isWide = useMedia("(min-width: 769px)");
  
    return (
        <>
        {isWide ? 
            <DesktopHome /> :
            <MobileHome /> }
        </>
    )

  }

export default Layout