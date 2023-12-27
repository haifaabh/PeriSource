import React, { useState, useEffect } from 'react';
const ArticleDetails = ({ articleInfo }) => {
  const [articleData, setArticleData] = useState({
    title: '',
    abstract: '',
    text: '',
    authors: [],
    institutions: [],
    references: [],
    keywords: [],
    publishDate: '',
    url: '',
  });

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
    const url=articleData.url;
    if(url){
      window.open(url,'_blank');
      
    }
    else
    console.log('URL is empty')
  };

  return (
    <div>
    <div className="bg-white p-8 m-4 rounded-md font-montserrat">
      <div>
        <label className="text-lg font-semibold">Title:</label>
        <input
          type="text"
          className="w-full p-2 border rounded mt-2"
          value={articleData.title}
          onChange={(e) => handleInputChange('title', e.target.value)}
        />
      </div>
      <div className="mt-4">
        <label className="text-lg font-semibold">Abstract:</label>
        <textarea
          className="w-full p-2 border rounded mt-2 h-52"
          value={articleData.abstract}
          onChange={(e) => handleInputChange('abstract', e.target.value)}
        />
      </div>
      <div className="mt-4">
        <label className="text-lg font-semibold">Text of the Article:</label>
        <textarea
          className="w-full p-2 border rounded mt-2 h-60"
          value={articleData.text}
          onChange={(e) => handleInputChange('text', e.target.value)}
        />
      </div>
      <div className="mt-4">
        <label className="text-lg font-semibold">Authors:</label>
        <textarea
          className="w-full p-2 border rounded mt-2"
          value={Array.isArray(articleData.authors) ? articleData.authors.join(', ') : ''}
          onChange={(e) => handleInputChange('authors', e.target.value)}
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
          value={Array.isArray(articleData.references) ? articleData.references.join(', ') : ''}
          onChange={(e) => handleInputChange('references', e.target.value)}
        />
      </div>
      <div className="mt-4">
        <label className="text-lg font-semibold">Keywords:</label>
        <textarea
          className="w-full p-2 border rounded mt-2"
          value={Array.isArray(articleData.keywords) ? articleData.keywords.join(', ') : ''}
          onChange={(e) => handleInputChange('keywords', e.target.value)}
        />
      </div>
      <div className="mt-4">
        <label className="text-lg font-semibold">Publish Date:</label>
        <input
          type="date"
          className="w-full p-2 border rounded mt-2"
          value={articleData.publishDate}
          onChange={(e) => handleInputChange('publishDate', e.target.value)}
        />
      </div>
      <div className="mt-4 flex justify-between">
        <label className="text-lg font-semibold">URL:</label>
        <input
          type="url"
          className="w-full p-2 border rounded mt-2"
          value={articleData.url}
        />
        <button className='bg-blue-500 text-white px-4 py-3 mt-4 rounded' onClick={handleViewButtonClick}>View</button>
      </div>

      <button className="bg-blue-500 text-white px-4 py-2 mt-4 rounded" onClick={() => console.log('Save clicked', articleData)}>
        Save
      </button>

      </div>
    </div>

    
  );
};

export default ArticleDetails;
