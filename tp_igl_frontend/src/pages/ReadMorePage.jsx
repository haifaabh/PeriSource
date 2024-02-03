import React from 'react'
import { NavbarReadMore } from '../components/NavbarReadMore'
import { AffichArticle } from '../components/AffichArticle'
import { useAuth } from '../AuthContext';
import Footer from '../components/Footer';



export const ReadMorePage = () => {
  return (
    <div>
        <NavbarReadMore/>
        <AffichArticle/>
        <Footer/>
    </div>
  )
}
