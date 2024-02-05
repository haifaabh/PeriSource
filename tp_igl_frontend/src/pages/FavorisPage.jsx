import React from 'react'
import { NavbarFavoris } from '../components/NavbarFavoris'
import Footer from '../components/Footer'
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { ArticleScientifique } from '../components/ArticleScientifique';
import { useAuth } from '../AuthContext';
import { useEffect, useState , useContext } from 'react';
import axios from 'axios';


export const FavorisPage = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { userId } = useAuth();
  const [userFavorites, setUserFavorites] = useState([]);

    const fetchData = async () => {
      try {
        const articlesResponse = axios.get('http://localhost:8000/ArticleStock/have/');
        const userFavoritesResponse = axios.get(`http://localhost:8000/consulter_favories/${userId.username}/`);
        
        const [articlesRes, userFavoritesRes] = await Promise.all([articlesResponse, userFavoritesResponse]);
        
        console.log('API Response:', articlesRes.data);
        const articlesArray = Array.isArray(articlesRes.data.results) ? articlesRes.data.results : [];
        setArticles(articlesArray);
        
        let favoriteArticleIds = null;
        if (Array.isArray(userFavoritesRes.data.article_ids)) {
          favoriteArticleIds = userFavoritesRes.data.article_ids;
          setUserFavorites(favoriteArticleIds);
        } else {
          console.error('Invalid response data format: article_ids is not an array');
        }
        
        const filteredArticles = articlesArray.filter(article => favoriteArticleIds.includes(article.id));
        setArticles(filteredArticles);
        console.log("artiafff",filteredArticles);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Error fetching data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    useEffect(() => {
      fetchData();
    }, [userId]); 
    
  const isArticleInFavorites = (articleId) => userFavorites.includes(articleId);

  const handleAddToFavorites = async (articleId) => {
    try {
      const username = userId.username; 
      const response = await axios.post(`http://localhost:8000/add_to_favorites/${username}/`, {
        article_id: articleId
      });
      console.log('Article added to favorites:', response.data);
    } catch (error) {
      console.error('Error adding article to favorites:', error);
    }
  };

  const handleRemoveFromFavorites = async (articleId) => {
    try {
      const username = userId.username; 
      const response = await axios.post(`http://localhost:8000/remove_from_favorites/${username}/`, {
        article_id: articleId
      });
      console.log('Article removed from favorites:', response.data);
      fetchData();
    } catch (error) {
      console.error('Error removing article from favorites:', error);
    }
  };

  return (
    <div>
      <NavbarFavoris/>
    <div id="Favoris" className="bg-white borderTopUser w-screen pb-20">
      <h1 className="md:text-4xl sm:text-3xl text-2xl font-bold ml-[8%] mt-6 mb-16 font-montserrat text-[#002366]">
      <span style={{ borderBottom: '2px solid #002366' }}>Favo</span>ris
      </h1>
      <div className="flex flex-wrap justify-between pl-[10%] pr-[10%]">
          {articles.map((article, index) => (
            <div key={index}>
              <ArticleScientifique
                 articleCh={article} 
                 onAddToFavorites={() => handleAddToFavorites(article.id)}
                 onRemoveFromFavorites={() => handleRemoveFromFavorites(article.id)}
                 isFavoritesPage={true}
                 isFavoriteArt={isArticleInFavorites(article.id)}
              />
            </div>
          ))}
      </div>
    </div>

      <Footer/>
    </div>
  )
}
