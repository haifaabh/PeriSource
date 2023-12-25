import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import React from 'react';
import { ArticleScientifique } from './ArticleScientifique';
import Slider from 'react-slick';


export const RecentsUser = () => {

    const articles = [
        {
        title: 'Title 1',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        readMoreLink: 'https://example.com/article1',
        pdfLink: 'https://example.com/article1.pdf',
        },
        {
            title: 'Title 2',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            readMoreLink: 'https://example.com/article1',
            pdfLink: 'https://example.com/article1.pdf',
        },
        {
            title: 'Title 3',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            readMoreLink: 'https://example.com/article1',
            pdfLink: 'https://example.com/article1.pdf',
        },
        {
            title: 'Title 4',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            readMoreLink: 'https://example.com/article1',
            pdfLink: 'https://example.com/article1.pdf',
        },
        {
            title: 'Title 5',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            readMoreLink: 'https://example.com/article1',
            pdfLink: 'https://example.com/article1.pdf',
        },
  ];

  const sliderSettings = {
    dots: true,
    arrows: true,
    prevArrow: <button className="slick-prev" aria-label="Previous" />,
    nextArrow: <button className="slick-next" aria-label="Next" />,
    infinite: false,
    speed: 500,
    slidesToShow: 2,  
    slidesToScroll: 2,  
    responsive: [
      {
        breakpoint: 600, 
        settings: {
          slidesToShow: 1, 
          slidesToScroll: 1,  
        },
      },
    ],
  };

  const handleAddToFavorites = (index) => {
    console.log('Adding to favorites:', articles[index]);
  };

  return (
    <div id="Recents" className="bg-white borderTopUser w-screen pb-20">
      <h1 className="md:text-4xl sm:text-3xl text-2xl font-bold ml-[8%] mt-6 mb-16 font-montserrat text-[#002366]">
      <span style={{ borderBottom: '2px solid #002366' }}>Recen</span>ts
      </h1>
      <div className=" slider-container" style={{ position: 'relative'}}>
        <Slider {...sliderSettings}>
          {articles.map((article, index) => (
            <div key={index}>
              <ArticleScientifique
                title={article.title}
                content={article.content}
                readMoreLink={article.readMoreLink}
                pdfLink={article.pdfLink}
                onAddToFavorites={() => handleAddToFavorites(index)}
                isFavoritesPage={false}
              />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}
