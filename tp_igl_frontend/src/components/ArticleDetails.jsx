import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';


const ArticleDetails = ({ articleInfo ,id}) => {
  const articleId=useParams();
// const articleId1= useParams();
// const articleId=String(articleId1)
  console.log("im in details",id);
  console.log('articleId',articleId);

  // const [id1,setID1]=useState("");
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
// console.log("id is ",articleId);

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

//const staticArticleId ="EiYS-4wBTrPMRMppYe2G"; // Replace this with the ID you want to test

    const handleSaveButtonClick = async () => {
      try {
        const response = await axios.put(`http://localhost:8000/ArticleStock/modify_article/${id}/`, articleData);
        console.log(response.data.message);
      } catch (error) {
        console.error('Error updating article:', error);
      }
  
    // axios.get(`http://localhost:8000/ArticleStock/hello/`)
    // .then(response => {
    //   console.log(response.data);
    // })
    // .catch(error => {
    //   console.error('Error updating article:', error);
    // });
    
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
      <button className="bg-red-600 text-white px-4 py-2 mt-4 rounded" onClick={handleSaveButtonClick}>
        delete
      </button>
      </div>
      </div>
    </div>

    
  );
};

export default ArticleDetails;