import React from 'react';
import { useAuth } from '../AuthContext';
import favoritIcon from '../assets/favoritIcon.svg'



export const AffichArticle = () => {
  const { article } = useAuth();
  const { titre: title, resume: abstract, url_pdf: pdfLink, institutions, mots_cles: key_words, references_bibliographiques: refs, texte_integral: content, auteurs: auteurs } = article.articleCh;

  const resumeWords = abstract.split(' ');
  const omittedResume = resumeWords.slice(1).join(' ');


  const contentWords = content.split(' ');
  const omittedContent = contentWords.slice(1).join(' ');

  const extractedWords = key_words.map(keyword => keyword.replace(/^KEYWORDS\n/, ''));
  const joinedWords = extractedWords.join(' ');

  return (
    <div className='bg-white borderTopUser borderBottomUser w-screen relative'>
      <div className="bg-white p-8 m-4 rounded-md font-montserrat">
        <div className='justify-content flex justify-between'> 
          <div className='font-semibold lg:text-[24px] text-[#002366] '>
          {title}
        </div>
        <div className="ml-2 flex items-center justify-end">
        <a href={pdfLink} target="_blank" rel="noopener noreferrer" className="text-white bg-[#3692FA] px-2 rounded font-montserrat hover:underline">
            PDF </a>
        {/*Favorites Button */}
        <button className="ml-2 bg-transparent text-[#3692FA] font-montserrat px-4 py-2 h-16 w-14">
        <img src={favoritIcon} alt="" className="w-full h-auto" />
      </button>
     </div>
        </div>
        
        <div className="mt-4 ">
          <span className='underline font-bold text-[#002366]'>Abstract:</span><p>{omittedResume}</p>
        </div>
        <div className="mt-4 ">
          <span className='underline font-bold text-[#002366]'>Text:</span><p>{omittedContent}</p>
        </div>
        <div className="mt-4 ">
          <span className='underline font-bold text-[#002366]'>Authors:</span><ul>
            {auteurs.map((auteur, index) => (
              <li key={index}><b>-</b> {auteur}</li>
            ))}
          </ul>
        </div>
        <div className="mt-4">
          <span className='underline font-bold text-[#002366]'>Institutions:</span><ul>
            {institutions.map((institution, index) => (
              <li key={index}><b>-</b> {institution}</li>
            ))}
          </ul>
        </div>
        <div className="mt-4">
          <span className='underline font-bold text-[#002366]'>References:</span><ul>
            {refs.map((ref, index) => (
              <li key={index}><b>-</b> {ref}</li>
            ))}
          </ul>
        </div>
        <div className="mt-4">
          <span className='underline font-bold text-[#002366]'>Keywords:</span><p>{joinedWords.replace(/\s+/g, ' - ')}</p>
        </div>
      </div>
    </div>
  );
};
