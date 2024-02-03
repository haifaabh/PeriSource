import React from 'react';
import favoritIcon from '../assets/favoritIcon.svg'
import IconDelete from '../assets/IconDelete.svg'
import favoritAddedIcon from '../assets/favoritAddedIcon.svg'
import { useState , useContext } from 'react';
import heartIcon from '../assets/heartIcon.svg'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';




export const ArticleScientifique = ({ articleCh, onAddToFavorites,onRemoveFromFavorites, isFavoritesPage , isFavoriteArt }) => {
  const [isFavorite, setIsFavorite] = useState(isFavoriteArt);
  const navigate = useNavigate();
  const { setArticleCh } = useAuth();

  const handleAddToFavorites = () => {
    onAddToFavorites();
    setIsFavorite(!isFavorite);
  };

  const handleRemoveFromFavorites = () => {
    onRemoveFromFavorites();
    setIsFavorite(!isFavorite);
  };

  const handlereadMore = () => {
    setArticleCh({
      articleCh
    });
    navigate('../readMoreeLink');
  };




  const { titre: title, resume: content, readMoreLink, url_pdf: pdfLink } = articleCh;

  const resumeWords = content.split(' ');
  let omittedResume = resumeWords.join(' ');
  omittedResume = omittedResume.replace(/^abstract\s*/i, '');


  return (
    <div className="lg:max-w-[450px]  md:max-w-[300px] md:mx-auto mx-[45px] bg-white p-4 shadow-md rounded-md mb-4">
      {/* Title */}
      <div className='flex h-20'>
        <h2 className="lg:text-xl sm:text-[15px] font-bold text-[#002366] mb-2 font-roboto line-clamp-3">{title}</h2>
        {isFavoritesPage && <img src={heartIcon} alt="" className="w-6 ml-2 h-6 " />}
      </div>

      {/* Content */}
      <p className="text-gray-700 overflow-hidden md:max-h-36 max-h-70  mb-2 font-roboto md:line-clamp-6 line-clamp-5">
        {omittedResume}
      </p>

       {/* Gray Lines */}
       <div className="border-t border-b border-gray-300 my-2"></div>


    <div className="flex justify-between items-center">
    {/* Read More Button */}
    <a onClick={handlereadMore} target="_blank" rel="noopener noreferrer" className="text-[#3692FA] font-montserrat hover:underline">
      Read More
    </a>

    {/* PDF and Add to Favorites Buttons */}
    <div className="flex items-center">
        {/* PDF Button */}
        <a href={pdfLink} target="_blank" rel="noopener noreferrer" className="text-[#3692FA] font-montserrat hover:underline">
        PDF
      </a>

        {/* Add to Favorites Button */}
        <button onClick={isFavorite ? handleRemoveFromFavorites : handleAddToFavorites} className="ml-2 bg-transparent text-[#3692FA] font-montserrat px-4 py-2 rounded-md">
        {isFavoritesPage ? (
          <img src={IconDelete} alt="" className="w-full h-auto button-hover" />
        ) : (
          <img src={isFavorite ? favoritAddedIcon : favoritIcon} alt="" className="w-full h-auto" />
          )}
        </button>
    </div>
    </div>
    </div>
  );
};
