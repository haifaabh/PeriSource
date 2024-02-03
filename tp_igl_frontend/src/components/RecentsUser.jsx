import React, { useEffect, useState , useContext } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import { ArticleScientifique } from './ArticleScientifique';
import { useAuth } from '../AuthContext';


export const RecentsUser = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { userId } = useAuth();
  const [userFavorites, setUserFavorites] = useState([]);

  const fetchArticles = async () => {
    try {
      console.log(':', userId);
      const response = await axios.get('http://localhost:8000/ArticleStock/recent/');
      console.log('API Response:', response.data);
      const articlesArray = Array.isArray(response.data.results) ? response.data.results : [];
      setArticles(articlesArray);
    } catch (error) {
      console.error('Error fetching articles:', error);
      setError('Error fetching articles. Please try again later.');
    } finally {
      setLoading(false);
    }
  };
  const fetchUserFavorites = async () => {
      try {
        const username = userId.username; 
        console.log(':usernam', username);
        const response = await axios.get(`http://localhost:8000/consulter_favories/${username}/`);
        console.log('User favorites:', response.data);
        if (Array.isArray(response.data.article_ids)) {
          const favoriteArticleIds = response.data.article_ids;
          setUserFavorites(favoriteArticleIds);
        } else {
          console.error('Invalid response data format: article_ids is not an array');
        }
      } catch (error) {
        console.error('Error fetching user favorites:', error);
      }
    };

  useEffect(() => {
    fetchArticles();
    fetchUserFavorites();
  }, []);

  const isArticleInFavorites = (articleId) => userFavorites.includes(articleId);
    

  const sliderSettings = {
    dots: true,
    arrows: true,
    prevArrow: <button className="slick-prev" aria-label="Previous" />,
    nextArrow: <button className="slick-next" aria-label="Next" />,
    infinite: false,
    speed: 500,
    slidesToShow: 2,  
    slidesToScroll: 2,  
    responsive: [
      {
        breakpoint: 600, 
        settings: {
          slidesToShow: 1, 
          slidesToScroll: 1,  
        },
      },
    ],
  };

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
    } catch (error) {
      console.error('Error removing article from favorites:', error);
    }
  };

  return (
    <div id="Recents" className="bg-white borderTopUser w-screen pb-20">
      <h1 className="md:text-4xl sm:text-3xl text-2xl font-bold ml-[8%] mt-6 mb-16 font-montserrat text-[#002366]">
        <span style={{ borderBottom: '2px solid #002366' }}>Recen</span>ts
      </h1>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!loading && !error && (
        <div className="slider-container" style={{ position: 'relative' }}>
          <Slider {...sliderSettings}>
          {articles.map((article, index) => (
              <div key={index}>
                <ArticleScientifique  
                  articleCh={article} 
                  onAddToFavorites={() => handleAddToFavorites(article.id)}
                  onRemoveFromFavorites={() => handleRemoveFromFavorites(article.id)}
                  isFavoritesPage={false}
                  isFavoriteArt={isArticleInFavorites(article.id)}
                />
              </div>
            ))}
          </Slider>
        </div>
      )}
    </div>
  );
}
