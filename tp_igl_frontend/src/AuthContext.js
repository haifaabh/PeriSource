import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);
  const [article, setArticle] = useState();

  const [userData, setUserData] = useState({
    userId: null,
    role: null,
    
  });

  const setAuthenticatedUser = (data) => {
    setUserData(data);
    
  };

  const setArticleCh = (data) => {
    setArticle(data);
  };


  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('authData')) || {};
    setUserId(storedData.userId || null);
    setUserData(storedData.userData || { userId: null, role: null });
    
    setArticle(storedData.article !== undefined && storedData.article !== null ? storedData.article : { articleCh: {} });
  }, []);

  return (
    <AuthContext.Provider value={{ article, setArticleCh, userId, setAuthenticatedUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

