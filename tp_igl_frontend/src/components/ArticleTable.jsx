import React from 'react';

const ArticleTable = () => {
  // Dummy data for articles
  const articles = [
    { id: 1, title: 'Article 1' },
    { id: 2, title: 'Article 2' },
    { id: 3, title: 'Article 3' },
    { id: 4, title: 'Article 4' },
    { id: 5, title: 'Article 5' },
    { id: 6, title: 'Article 6' },
    { id: 7, title: 'Article 7' },
    { id: 8, title: 'Article 8' },
    // Add more articles as needed
  ];

  // Divide the articles array into two equal parts
  const halfIndex = Math.ceil(articles.length / 2);
  const leftTableData = articles.slice(0, halfIndex);
  const rightTableData = articles.slice(halfIndex);

  return (
    <div className='flex flex-col lg:flex-row justify-between bg-white m-8 rounded-xl pb-5'>
      {/* Left Table */}
      <div className='lg:w-1/2'>
        <table className='w-full'>
          <thead className='mb-3'>
            <tr className='text-left'>
              <th>Article Title</th>
            
            </tr>
          </thead>
          <tbody>
            {leftTableData.map((article) => (
              <tr key={article.id}>
                <td>{article.title}</td>
                <td className='flex justify-center items-center'>
                  <button className='bg-blue-500 text-white px-4 py-2 rounded'>
                    Read More
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Right Table */}
      <div className='lg:w-1/2'>
        <table className='w-full'>
          <thead className='mb-3 hidden lg:table-header-group'>
            <tr className='text-left'>
              <th>Article Title</th>
              
            </tr>
          </thead>
          <tbody>
            {rightTableData.map((article) => (
              <tr key={article.id}>
                <td>{article.title}</td>
                <td className='flex justify-center items-center'>
                  <button className='bg-blue-500 text-white px-4 py-2 rounded sm:ml-[20vw] '>
                    Read More
                  </button>
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
