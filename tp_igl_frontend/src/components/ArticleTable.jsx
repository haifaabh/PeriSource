import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ArticleTable = () => {
  const [articleTitles, setArticleTitles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/ArticleStock/affichage_mod_adm/');
        const titles = response.data.results.map((article) => ({
          id: article.id,
          title: article.titre,
        }));
        setArticleTitles(titles);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('An error occurred while fetching data.');
      } finally {
        setLoading(false);
      }
    };

    // Call the fetch function
    fetchData();
  }, []); 

  return (
    <div className='flex flex-col lg:flex-row justify-between bg-white m-8 rounded-xl pb-5'>
      <div className='lg:w-full '>
        <table className='w-full'>
          <thead className='mb-3'>
            <tr className='text-left'>
              <th className='font-montserrat font-bold pb-4'>Article Title</th>
            </tr>
          </thead>
          <tbody>
            {articleTitles.map((article, index) => (
              <tr key={index}>
                <td className='font-roboto'>{article.title}</td>
                <td className='flex justify-center items-center mb-4'>
                  <Link to={`/exampleArticle/${article.id}`}>
                    <button
                      className='text-[#002366] font-semibold lg:px-8 md:px-6 sm:px-5 py-1.5 rounded-full border border-white shadow drop-shadow-sm'
                    >
                      Read More
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ArticleTable;
