import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams ,Link} from 'react-router-dom';

const ArticleDetails = ({ articleInfo ,id}) => {
  const articleId=useParams();

  console.log("im in details",id);
  console.log('articleId',articleId);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [articleData, setArticleData] = useState({
    titre:'',
    resume:'',
    texte_integral:'',
    auteurs: [],
    institutions: [],
    references_bibliographiques: [],
    mots_cles: [],
    date: '',
    url_pdf: '',
  });
  console.log(articleData);

  useEffect(() => {
    if (articleInfo) {
      setArticleData(articleInfo);
    }
  }, [articleInfo]);

  const handleInputChange = (field, value) => {
    setArticleData((prevData) => ({
      ...prevData,
      [field]: Array.isArray(prevData[field]) ? value.split(',').map((item) => item.trim()) : value,
    }));
  };
  
  const handleViewButtonClick=()=>{
    const url=articleData.url_pdf;
    if(url){
      window.open(url,'_blank');
      
    }
    else
    console.log('URL is empty')
  };


    const handleSaveButtonClick = async () => {
      try {
        const response = await axios.put(`http://localhost:8000/ArticleStock/modify_article/${id}/`, articleData);
        console.log(response.data.message);
        setShowSuccessModal(true);
       
      } catch (error) {
        console.error('Error updating article:', error);
      }
    };

      const handleDeleteButtonClick = async () => {
        try {
          const response = await axios.delete(`http://localhost:8000/ArticleStock/delete_article/${id}/`);
          console.log(response.data.message);
          window.location.reload();
        } catch (error) {
          console.error('Error deleting article:', error);
        }
      };
    
      const handleModalButtonClick = () => {
        setShowSuccessModal(false);
        // Redirect logic goes here
        // You can use history.push('/your-redirect-url') if you have access to useHistory
        // or use window.location.href = '/your-redirect-url'
      };

  return (
    <div>
    <div className="bg-white p-8 m-4 rounded-md font-montserrat">
      <div>
        <label className="text-lg font-semibold">Title:</label>
        <input
          type="text"
          className="w-full p-2 border rounded mt-2"
          value={articleData.titre}
          onChange={(e) => handleInputChange('titre', e.target.value)}
        />
      </div>
      <div className="mt-4">
        <label className="text-lg font-semibold">Abstract:</label>
        <textarea
          className="w-full p-2 border rounded mt-2 h-52"
          value={articleData.resume}
          onChange={(e) => handleInputChange('resume', e.target.value)}
        />
      </div>
      <div className="mt-4">
        <label className="text-lg font-semibold">Text of the Article:</label>
        <textarea
          className="w-full p-2 border rounded mt-2 h-60"
          value={articleData.texte_integral}
          onChange={(e) => handleInputChange('texte_integral', e.target.value)}
        />
      </div>
      <div className="mt-4">
        <label className="text-lg font-semibold">Authors:</label>
        <textarea
          className="w-full p-2 border rounded mt-2"
          value={Array.isArray(articleData.auteurs) ? articleData.auteurs.join(', ') : ''}
          onChange={(e) => handleInputChange('auteurs', e.target.value)}
        />
      </div>
      <div className="mt-4">
        <label className="text-lg font-semibold">Institutions:</label>
        <textarea
          className="w-full p-2 border rounded mt-2"
          value={Array.isArray(articleData.institutions) ? articleData.institutions.join(', ') : ''}
          onChange={(e) => handleInputChange('institutions', e.target.value)}
        />
      </div>
      <div className="mt-4">
        <label className="text-lg font-semibold">References:</label>
        <textarea
          className="w-full p-2 border rounded mt-2"
          value={Array.isArray(articleData.references_bibliographiques) ? articleData.references_bibliographiques.join(', ') : ''}
          onChange={(e) => handleInputChange('references_bibliographiques', e.target.value)}
        />
      </div>
      <div className="mt-4">
        <label className="text-lg font-semibold">Keywords:</label>
        <textarea
          className="w-full p-2 border rounded mt-2"
          value={Array.isArray(articleData.mots_cles) ? articleData.mots_cles.join(', ') : ''}
          onChange={(e) => handleInputChange('mots_cles', e.target.value)}
        />
      </div>
      <div className="mt-4">
        <label className="text-lg font-semibold">Publish Date:</label>
        <input
          type="date"
          className="w-full p-2 border rounded mt-2"
          value={articleData.date}
          onChange={(e) => handleInputChange('date', e.target.value)}
        />
      </div>
      <div className="mt-4 flex justify-between">
        <label className="text-lg font-semibold">URL:</label>
        <input
          type="url"
          className="w-full p-2 border rounded mt-2"
          value={articleData.url_pdf}
        />
        <button className='bg-blue-500 text-white px-4 py-3 mt-4 rounded' onClick={handleViewButtonClick}>View</button>
      </div>
       <div className='flex justify-between mt-4'> 
      <button className="bg-blue-500 text-white px-4 py-2 mt-4 rounded" onClick={handleSaveButtonClick}>
        Save
      </button>
      <button className="bg-red-600 text-white px-4 py-2 mt-4 rounded" onClick={handleDeleteButtonClick}>
      <Link to="/moderator" className="text-white">Delete</Link>
      </button>
      </div>
      </div>

      {showSuccessModal && (
  <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
    <div className="bg-white p-8 rounded-md">
      <p className="text-center text-lg font-bold mb-4">Article saved successfully!</p>
      <button
        className="ml-[80px] bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue"
        onClick={handleModalButtonClick}
      >
       <Link to="/moderator" className="text-white">OK</Link>
      </button>
    </div>
  </div>
)}


    </div>

    
  );
};

export default ArticleDetails;