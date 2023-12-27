import React from 'react';
import ArticleDetails from '../components/ArticleDetails';

const ExampleArticle = () => {
  const exampleArticle = {
    title: 'React and State Management',
    abstract: 'A deep dive into state management in React applications.',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...RJKDSFKFGHKFDJHGKJFDSBKJSDBKVJBSDKJBVKJSDFBVKSBDJDVBFN?VBDFKJBV?J?FSDBV?DFBKVBSKJDVMSDKJMjskCK<KLDVKJBSFJKBVSJDBVSFKJDBVJFDB',
    authors: ['John Doe', 'Jane Smith'],
    institutions: ['University of React', 'Tech Institute'],
    references: ['React Docs', 'State Management Guide'],
    keywords: ['React', 'State Management', 'Frontend'],
    publishDate: '2023-01-15',
    url: 'https://example.com/react-state-management',
  };

  return (
    <div>
      <div className="font-bold text-2xl ml-6 mt-4">Article Details</div>
      <ArticleDetails articleInfo={exampleArticle} />
      
    </div>
  );
};

export default ExampleArticle;
