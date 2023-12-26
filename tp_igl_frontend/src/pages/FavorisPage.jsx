import React from 'react'
import { NavbarUser } from '../components/NavbarUser'
import { NavbarFavoris } from '../components/NavbarFavoris'
import Footer from '../components/Footer'
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { ArticleScientifique } from '../components/ArticleScientifique';
import Slider from 'react-slick';


export const FavorisPage = () => {
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

  const handleAddToFavorites = (index) => {
  };

  return (
    <div>
      <NavbarFavoris/>
    <div id="Favoris" className="bg-white borderTopUser w-screen pb-20">
      <h1 className="md:text-4xl sm:text-3xl text-2xl font-bold ml-[8%] mt-6 mb-16 font-montserrat text-[#002366]">
      <span style={{ borderBottom: '2px solid #002366' }}>Favo</span>ris
      </h1>
      <div className="flex flex-wrap justify-between pl-[10%] pr-[10%]">
          {articles.map((article, index) => (
            <div key={index}>
              <ArticleScientifique
                title={article.title}
                content={article.content}
                readMoreLink={article.readMoreLink}
                pdfLink={article.pdfLink}
                onAddToFavorites={() => handleAddToFavorites(index)}
                isFavoritesPage={true}
              />
            </div>
          ))}
      </div>
    </div>

      <Footer/>
    </div>
  )
}
