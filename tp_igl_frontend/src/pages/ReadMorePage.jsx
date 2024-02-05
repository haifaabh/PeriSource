import React from 'react'
import { NavbarReadMore } from '../components/NavbarReadMore'
import { AffichArticle } from '../components/AffichArticle'
import { useAuth } from '../AuthContext';
import Footer from '../components/Footer';
import { useAuth } from '../AuthContext';



export const ReadMorePage = () => {
  const { userId } = useAuth();

  React.useEffect(() => {
    if (!userId) {
      console.log('Navigating to /signin...');
      window.location.href = '/signin'; 
      console.log('Navigation executed.');
    }
  }, [userId]);

  return (
    <div>
        <NavbarReadMore/>
        <AffichArticle/>
        <Footer/>
    </div>
  )
}
