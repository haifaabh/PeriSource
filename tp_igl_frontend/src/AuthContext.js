import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [article, setArticle] = useState(() => {
    const storedData = JSON.parse(localStorage.getItem('authData'));
    return storedData ? storedData.article : null;
  });
  const [userId, setUserId] = useState(() => {
    const storedData = JSON.parse(localStorage.getItem('authData'));
    return storedData ? storedData.userId : null;
  });

  const setAuthenticatedUser = (userId) => {
    setUserId(userId);
    localStorage.setItem('authData', JSON.stringify({ userId, article }));
  };

  const setArticleCh = (article) => {
    setArticle(article);
    localStorage.setItem('authData', JSON.stringify({ userId, article }));
  };

  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === 'authData') {
        const storedData = JSON.parse(event.newValue);
        setUserId(storedData.userId);
        setArticle(storedData.article);
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
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
