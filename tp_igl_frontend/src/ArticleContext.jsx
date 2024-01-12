import React, { createContext, useContext, useState } from 'react';

const ArticleContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);
  const [article, setArticle] = useState(); // Provide an initial value if needed

  const setArticleCh = (data) => {
    setArticle(data);
  };

  return (
    <ArticleContext.Provider value={{ article, setArticleCh, userId, setUserId }}>
      {children}
    </ArticleContext.Provider>
  );
};

export const useArticleContext = () => {
  return useContext(ArticleContext);
};