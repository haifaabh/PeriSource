import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ArticleDetails from '../components/ArticleDetails';
import { useParams } from 'react-router-dom';

const ExampleArticle = () => {
const {id} =useParams();
const stringId =String(id);
console.log('in example the id is',stringId,typeof stringId);
  const [articleDetails, setArticleDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticleDetails = async () => {

      try {
        const response = await axios.get(`http://localhost:8000/ArticleStock/articles/${stringId}/`);
        setArticleDetails(response.data.article);
      } catch (error) {
        console.error('Error fetching article details:', error);
        setError('An error occurred while fetching article details.');
      } finally {
        setLoading(false);
      }
    };

    fetchArticleDetails();
  }, [stringId]);

  return (
    <div>
      {loading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
      {articleDetails && (
        <>
          <div className="font-bold text-2xl ml-6 mt-4">Article Details</div>
          <ArticleDetails articleInfo={articleDetails } id={stringId}/>
        </>
      )}
    </div>
  );
};

export default ExampleArticle;
