import React from 'react'
import { NavbarUser } from '../components/NavbarUser'
import { HeroUser } from '../components/HeroUser'
import { RecentsUser } from '../components/RecentsUser'
import Footer from '../components/Footer';

export const UserPage = () => {
  return (
    <div>
      <NavbarUser/>
      <HeroUser/>
      <RecentsUser/>
      <Footer/>
    </div>
  )
}
