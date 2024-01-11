import React, { useEffect, useState , useContext } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import { ArticleScientifique } from './ArticleScientifique';
import { ArticleContext } from '../ArticleContext';

export const RecentsUser = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchArticles = async () => {
      try {
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

    fetchArticles();
  }, []);


  

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

  const handleAddToFavorites = (index) => {
    console.log('Adding to favorites:', articles[index]);
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
                  onAddToFavorites={() => handleAddToFavorites(index)}
                  isFavoritesPage={false}
                />
              </div>
            ))}
          </Slider>
        </div>
      )}
    </div>
  );
}
