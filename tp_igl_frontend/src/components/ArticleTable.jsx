import React from 'react';

const ArticleTable = () => {
  // Dummy data for articles
  const articles = [
    { id: 1, title: 'Article 1' },
    { id: 2, title: 'Article 2' },
    { id: 3, title: 'Article 3' },
    { id: 4, title: 'Article 4' },
    // Add more articles as needed
  ];

  return (
    <div className='flex flex-col lg:flex-row justify-between bg-white m-6 rounded-xl pb-5'>
      {/* Left Table */}
      <div className='lg:w-1/2 ml-8'>
        <table className='w-full'>
          <thead className='mb-3'>
            <tr className='text-left'>
              <th >Article Title</th>
            </tr>
          </thead>
          <tbody>
            {articles.map((article) => (
              <tr  key={article.id}>
                <td>{article.title}</td>
                <td>
                  <button className='bg-blue-500 text-white px-4 py-2 rounded'>
                    Read More
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>


{/* Divider Line */}
<div className='border-l lg:hidden border-gray-900 h-full'></div>

      {/* Right Table */}
      <div className='lg:w-1/2'>
        <table className='w-full'>
          <thead className='mb-3 hidden lg:table-header-group '>
            <tr className='text-left'>
              <th>Article Title</th>
            </tr>
          </thead>
          <tbody >
            {articles.map((article) => (
              <tr key={article.id}>
                <td >{article.title}</td>
                <td>
                  <button className='bg-blue-500 text-white px-4 py-2 rounded'>
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
