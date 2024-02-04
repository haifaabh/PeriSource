import React, { Fragment } from 'react';
import searchIcon from '../assets/Search.svg';
import filterIcon from '../assets/Filter.svg';
import UserPageM from '../assets/UserPageM.svg';
import UserPageW from '../assets/UserPageW.svg';
import { View, TouchableOpacity, Text } from 'react';
import { FilterPage } from '../pages/FilterPage';
import { useState , useEffect } from 'react'; 
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import Slider from 'react-slick';
import { ArticleScientifique } from './ArticleScientifique';
import { useAuth } from '../AuthContext';




export const HeroUser = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { userId } = useAuth();
  const [userFavorites, setUserFavorites] = useState([]);
  const [articles,setArticles] = useState([]);
  const [articlesId,setArticlesID] = useState([]);

  const [isFilterVisible, setFilterVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchEff, setSearch] = useState(false);



    const handleApplyFilter = async (filterCriteria) => {
      try {
        let articleIdsAuteurs = [];
        let articleIdsMotsCles = [];
        let articleIdsInstitutions = [];
        let articleIdsPeriode = [];
        let commonArticleIds = articlesId ; 
    
        // Fetch article ids filtered by authors
        if (filterCriteria.authors && filterCriteria.authors.length > 0) {
          const responseAuteurs = await axios.post('http://localhost:8000/ArticleStock/search_auteurs/', {
            keywords: filterCriteria.authors,
          });
          articleIdsAuteurs = responseAuteurs.data.article_ids;
          console.log('Articles filtered by auteurs:', articleIdsAuteurs);
        }
    
        // Fetch article ids filtered by keywords
        if (filterCriteria.keywords && filterCriteria.keywords.length > 0) {
          const responseMotsCles = await axios.post('http://localhost:8000/ArticleStock/search_mots_cles/', {
            keywords: filterCriteria.keywords,
          });
          articleIdsMotsCles = responseMotsCles.data.article_ids;
          console.log('Articles filtered by mots_cles:', articleIdsMotsCles);
        }
    
        // Fetch article ids filtered by institutions
        if (filterCriteria.institutions && filterCriteria.institutions.length > 0) {
          const responseInstitutions = await axios.post('http://localhost:8000/ArticleStock/search_institutions/', {
            keywords: filterCriteria.institutions,
          });
          articleIdsInstitutions = responseInstitutions.data.article_ids;
          console.log('Articles filtered by institutions:', articleIdsInstitutions);
        }

        // Fetch article ids filtered by Periode
        if (filterCriteria.startDate && filterCriteria.endDate) {
          const startDate = filterCriteria.startDate;
          const endDate = filterCriteria.endDate;
          startDate.setDate(startDate.getDate() + 1);
          endDate.setDate(endDate.getDate() + 1);
          // Formater les dates au format 'AAAA-MM-JJ'
          const startDateFormatted = startDate.toISOString().split('T')[0];
          const endDateFormatted = endDate.toISOString().split('T')[0];
          console.log('Periode:',startDateFormatted, endDateFormatted);
          const responsePeriode = await axios.post('http://localhost:8000/ArticleStock/search_date/', {
            keywords : [" "],
            start_date: startDateFormatted,
            end_date: endDateFormatted
          });
          console.log('Filtered by Periode:', responsePeriode.data);
          articleIdsPeriode = responsePeriode.data.article_ids;
          console.log('Articles filtered by Periode:', articleIdsPeriode);
        }  
    

        if (filterCriteria.authors && filterCriteria.authors.length > 0) {
          commonArticleIds = intersect_lists([commonArticleIds, articleIdsAuteurs]);
        }
    
    
        if (filterCriteria.keywords && filterCriteria.keywords.length > 0) {
          commonArticleIds = intersect_lists([commonArticleIds, articleIdsMotsCles]);
        }

        if (filterCriteria.startDate && filterCriteria.endDate) {
          console.log(' Article IDs selon Periode:', articleIdsPeriode);
          commonArticleIds = intersect_lists([commonArticleIds, articleIdsPeriode]);
          console.log('Common Article IDs after intersection:', commonArticleIds);
        }

    
        if (filterCriteria.institutions && filterCriteria.institutions.length > 0) {
          commonArticleIds = intersect_lists([commonArticleIds, articleIdsInstitutions]);
          console.log('Common Article IDs after intersection:', commonArticleIds);
        }
    
        // Fetch detailed articles based on commonArticleIds
        const detailedArticles = await Promise.all(
          commonArticleIds.map(async (articleId) => {
            try {
              const articleResponse = await axios.get(`http://localhost:8000/ArticleStock/articles/${articleId}`);
              return articleResponse.data.article;
            } catch (articleError) {
              console.error('Error fetching article:', articleError);
              return null;
            }
          })
        );
    
        setArticles(detailedArticles);
        setSearch(true);
      } catch (error) {
        console.error('Search error:', error);
      }
    };
    
    const fetchArticles = async () => {
      try {
        const response = await axios.get('http://localhost:8000/ArticleStock/have/');
        console.log('API Response:', response.data);
        const articlesIDArray = Array.isArray(response.data.results) ? response.data.results.map(article => article.id) : [];
        setArticlesID(articlesIDArray);
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
 
  

    const handleSearch = async (e) => {
      e.preventDefault();
      console.log('Search submitted:', searchQuery);
    
      try {
        const response = await axios.post('http://localhost:8000/ArticleStock/search/', {
          keywords: [searchQuery],
        });
    
        const { success, article_ids, error } = response.data;
        if (success) {
          console.log('API Response:', article_ids);
          setArticlesID(article_ids);
          const detailedArticles = await Promise.all(
            article_ids.map(async (articleId) => {
              try {
                const articleResponse = await axios.get(
                  `http://localhost:8000/ArticleStock/articles/${articleId}`
                );
                return articleResponse.data.article;
              } catch (articleError) {
                console.error('Error fetching article:', articleError);
                return null;
              }
            })
          );
          // Check if search returned any results
          setSearch(detailedArticles.length > 0);
          console.log('Detailed Articles:', detailedArticles);
          setArticles(detailedArticles);
        } else {
          console.error('Search error:', error);
        }
      } catch (error) {
        console.error('Search error:', error);
      }
    };  
    
    
    const sliderSettings = {
      dots: true,
      arrows: true,
      prevArrow: <button className="slick-prev" aria-label="Previous" />,
      nextArrow: <button className="slick-next" aria-label="Next" />,
      infinite: false,
      speed: 500,
      slidesToShow: 2,
      slidesToScroll: 2,
      rows: 2,
      responsive: [
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            rows: 1,
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
    <Fragment>
    <div className='bg-white borderTopUser borderBottomUser w-screen relative'>
      {/* Left Image */}
      <div
        className="md:block hidden lg:ml-16 absolute bottom-0 left-0 w-[30%] h-[65%] bg-cover bg-no-repeat"
        style={{
          backgroundImage: `url(${UserPageM})`,
          backgroundSize: 'contain', 
        }}
      />
      <div
        className='max-w-[800px] w-full h-screen mx-auto text-center flex flex-col justify-center'
        style={{
          height: 'calc(100vh - 115px)',
        }}
      >
        <div className="flex items-center justify-center flex-col md:mb-16 mb-8 ">
          <div className="mb-4">
            <p className='md:text-4xl sm:text-3xl text-2xl font-bold max-w-[600px] text-center font-montserrat text-[#002366]' style={{ lineHeight: '1.5' }}>
              Empower your research journey with
              <span className="text-[#4D4D4D] font-rammetto"> PeriSource</span>,
            </p>
          </div>
          <div>
            <p className='max-w-[650px] md:text-[16px] text-[12px] font-bold text-gray-500'> a dedicated platform designed to streamline your search for high-quality scientific articles, ensuring a comprehensive and efficient exploration of the latest advancements in your field.</p>
          </div>
        </div>
        <div className='flex col-span-2 items-center justify-center'>
          <div className="mb-4 flex items-center justify-center">
          <div className="mb-4 flex items-center justify-center">
            <input
              type="text"
              placeholder="Search..."
              className="border p-2 pl-8 border-solid bg-white border-gray-400 lg:w-[450px]"
              style={{
                border: '1px solid rgba(171, 190, 209, 0.40)',
                borderRadius: '16px 0 0 16px',
              }}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
              className="bg-[#002366] text-white p-2 px-4"
              style={{ borderRadius: '0 16px 16px 0' }}
              onClick={handleSearch}
            >
              <img src={searchIcon} alt="" className="w-[25px] h-[25px]" />
            </button>
          </div>
          <div className="mb-4 flex items-center justify-center px-4">
            <button className="bg-[#002366] text-white p-2 px-4 font-montserrat font-bold flex items-center" style={{ borderRadius: '16px', marginTop: '0' }} onClick={() => setFilterVisible(true)}>
              <img src={filterIcon} alt="" className="w-[25px] h-[25px] mr-2" />
              Filter
            </button>
          </div>
          </div>
        </div>
      </div>
      {/* Right Image */}
      <div
            className="lg:flex  hidden absolute bottom-0 right-0 w-[20%] h-[54%] bg-cover bg-no-repeat"
            style={{
              backgroundImage: `url(${UserPageW})`,
              backgroundSize: 'contain',
            }}
          />
    </div>
    <FilterPage isVisible={isFilterVisible} onApplyFilter={handleApplyFilter} onClose={()=>setFilterVisible(false)} />
    {searchEff && (
    <div id="SearchResult" className="bg-white borderTopUser w-screen pb-20">
      <h1 className="md:text-4xl sm:text-3xl text-2xl font-bold ml-[8%] mt-6 mb-16 font-montserrat text-[#002366]">
        <span style={{ borderBottom: '2px solid #002366' }}>Search Resul</span>ts
      </h1>
      {articles.length > 0 ? (
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
      ) : (
        <div className="text-gray-600 text-center mt-4">Sorry, no results were found for your search.</div>
        )}
      </div>
    )}
    </Fragment>
  );
}


function intersect_lists(arrays) {
  if (!arrays || arrays.length === 0) {
    return [];
  }
  const set = new Set(arrays[0]);
  for (let i = 1; i < arrays.length; i++) {
    const currentSet = new Set(arrays[i]);
    for (const item of set) {
      if (!currentSet.has(item)) {
        set.delete(item);
      }
    }
  }
  return Array.from(set);
}
