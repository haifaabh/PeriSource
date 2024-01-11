import React from 'react'
import { NavbarUser } from '../components/NavbarUser'
import { AffichArticle } from '../components/AffichArticle'
import { useAuth } from '../AuthContext';



export const ReadMorePage = () => {
  return (
    <div>
        <NavbarUser/>
        <AffichArticle/>
    </div>
  )
}
