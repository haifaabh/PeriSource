import React , { useState, useEffect} from 'react';
import { useAuth } from '../AuthContext';
import favoritIcon from '../assets/favoritIcon.svg'
import favoritAddedIcon from '../assets/favoritAddedIcon.svg'
import axios from 'axios';


export const AffichArticle = () => {
  const { article, userId } = useAuth(); 
  const [userFavorites, setUserFavorites] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const { titre: title, resume: abstract, url_pdf: pdfLink, institutions, mots_cles: key_words, references_bibliographiques: refs, texte_integral: content, auteurs: auteurs } = article.articleCh;

  const resumeWords = abstract.split(' ');
  let omittedResume = resumeWords.join(' ');
  omittedResume = omittedResume.replace(/^abstract\s*/i, '');

  const contentWords = content.split(' ');
  let omittedContent = contentWords.join(' ');
   omittedContent = omittedContent.replace(/^introduction\s*/i, '');;

  const extractedWords = key_words.map(keyword => keyword.replace(/^KEYWORDS\n/, ''));
  const joinedWords = extractedWords.join(' ');

    // Function to check if a string is a valid URL
    function isLink(text) {
      return text.startsWith('http://') || text.startsWith('https://');
    }

    // Function to extract links from a string
    function extractLinks(text) {
      const urlRegex = /(https?:\/\/[^\s]+)/g;
      return text.split(urlRegex).map((part, index) => {
        return isLink(part) ? <a key={index} className=" text-blue-700 hover:underline" href={part} target="_blank" rel="noopener noreferrer">{part}</a> : part;
      });
    }
    
    useEffect(() => {
      fetchUserFavorites();
    }, []);
    useEffect(() => {
      const isArticleInFavorites = userFavorites.includes(article.articleCh.id);
      console.log("art;",article);
      console.log("article;",article.articleCh.id);
      console.log("here",isArticleInFavorites);
      setIsFavorite(isArticleInFavorites);
    }, [userFavorites, article.articleCh.id]);


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

    const handleAddToFavorites = async () => {
      try {
        const username = userId.username;
        const response = await axios.post(`http://localhost:8000/add_to_favorites/${username}/`, {
          article_id: article.articleCh.id
        });
        console.log('Article added to favorites:', response.data);
        setUserFavorites([...userFavorites, article.articleCh.id]);
      } catch (error) {
        console.error('Error adding article to favorites:', error);
      }
    };
  
    const handleRemoveFromFavorites = async () => {
      try {
        const username = userId.username;
        const response = await axios.post(`http://localhost:8000/remove_from_favorites/${username}/`, {
          article_id: article.articleCh.id
        });
        console.log('Article removed from favorites:', response.data);
        setUserFavorites(userFavorites.filter(id => id !== article.articleCh.id)); // Update userFavorites state
      } catch (error) {
        console.error('Error removing article from favorites:', error);
      }
    };
  

  return (
    <div className='bg-white borderTopUser borderBottomUser w-screen relative'>
      <div className="bg-white mb-0 p-8 m-4 rounded-md font-montserrat">
        <div className='justify-content flex justify-between'> 
          <div className='font-semibold lg:text-[24px] text-[#002366] font-roboto '>
            {title}
          </div>
          <div className="ml-2 flex items-center justify-end">
              <a href={pdfLink} target="_blank" rel="noopener noreferrer" className="text-white bg-[#3692FA] px-2 rounded font-roboto hover:underline">
                  PDF </a>
              {/*Favorites Button */}
              <button onClick={isFavorite ? handleRemoveFromFavorites : handleAddToFavorites} className="ml-2 bg-transparent text-[#3692FA] font-montserrat px-4 py-2 h-16 w-14">
                <img src={isFavorite ? favoritAddedIcon : favoritIcon}  alt="" className="w-full h-auto" />
              </button>
          </div>
        </div>
        
        <div id="Abstract" className="mt-4">
          <span className='underline font-bold text-[#002366] font-roboto'>Abstract:</span><p className="text-[14px] md:text-[16px] font-montserrat">&nbsp;&nbsp;&nbsp;{omittedResume}</p>
        </div>
        <div id="Text" className="mt-4 text-[14px] md:text-[16px] font-montserrat">
          <span className='underline font-bold font-roboto text-[#002366]'>Text:</span><br/>
          {omittedContent.split(/\.\n(?=[A-Z0-9])/).map((paragraph, index) => (
            <React.Fragment key={index}>
              &nbsp;&nbsp;&nbsp;{paragraph.trim()}.
              {index !== omittedContent.split(/\.\n(?=[A-Z0-9])/).length - 1 && <br/>}
            </React.Fragment>
          ))}
        </div>

        <div id="Authors" className="mt-4 ">
          <span className='underline font-bold font-roboto text-[#002366]'>Authors:</span><ul className="pl-2 text-[14px] md:text-[16px] font-montserrat">
            {auteurs.map((auteur, index) => (
              <li key={index}><b>-</b> {auteur}</li>
            ))}
          </ul>
        </div>
        <div id="Institutions" className="mt-4">
          <span className='underline font-bold font-roboto text-[#002366]'>Institutions:</span><ul className="pl-2 text-[14px] md:text-[16px] font-montserrat">
            {institutions.map((institution, index) => (
              <li key={index}><b>-</b> {institution}</li>
            ))}
          </ul>
        </div>
        <div id="References" className="mt-4">
      <span className='underline font-bold text-[#002366] font-roboto'>References:</span>
      <ul className="pl-2 text-[14px] md:text-[16px] font-montserrat">
        {refs.map((ref, index) => (
          <li key={index}>
            <b>-</b> {extractLinks(ref)}
          </li>
        ))}
      </ul>
    </div>

        <div id="Keywords" className="mt-4">
          <span className='underline font-bold text-[#002366] font-roboto'>Keywords:</span><p className="pl-2 text-[14px] md:text-[16px] font-montserrat">{joinedWords.replace(/\s+/g, ' - ')}</p>
        </div>
      </div>
    </div>
  );
};
