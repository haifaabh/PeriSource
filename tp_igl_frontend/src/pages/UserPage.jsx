import React from 'react';
import { NavbarUser } from '../components/NavbarUser';
import { HeroUser } from '../components/HeroUser';
import { RecentsUser } from '../components/RecentsUser';
import Footer from '../components/Footer';
import { useAuth } from '../AuthContext';

export const UserPage = () => {
  const { userId } = useAuth();

  React.useEffect(() => {
    if (!userId) {
      console.log('Navigating to /signin...');
      window.location.href = '/signin'; // Navigate using window.location.href
      console.log('Navigation executed.');
    }
  }, [userId]);

  return (
      <div>
        <NavbarUser />
        <HeroUser />
        <RecentsUser />
        <Footer />
      </div>
  );
};
