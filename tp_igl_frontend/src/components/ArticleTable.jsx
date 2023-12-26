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
            {articles.map((article) => (
              <tr key={article.id}>
                <td className='font-roboto'>{article.title}</td>
                <td className='flex justify-center items-center mb-4'>
                  <button className=' text-[#002366] font-semibold lg:px-8 md:px-6 sm:px-5 py-1.5 rounded-full border border-white shadow drop-shadow-sm'>
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
