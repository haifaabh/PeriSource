# PeriSource Web Application

PeriSource is a web application designed to facilitate the search and retrieval of scientific articles based on a list of keywords. The application provides a user-friendly interface for authenticated users to perform various actions.

## Features

### User Features

1. **Search Articles:**
   - Users can search for articles in the title, keywords, authors, and full text containing specified keywords.
   - The application supports filtering search results by keywords, authors, institutions, and publication date range.

2. **View Articles:**
   - A list of found articles is displayed, starting with the most recent.
   - Users can view details of each article, including textual and PDF formats of the full text.
   - Favorite articles can be saved for later reference.

3. **Manage Saved Articles:**
   - Users can view a list of saved scientific articles.

### Admin Features

1. **Manage Moderators:**
   - Admins can add, remove, or modify moderators.

2. **Article Upload:**
   - Admins can launch an operation to upload scientific articles from a URL containing a set of PDF files.
   - The application extracts text from PDF files, analyzes the text to extract article information, and stores the extracted information in an Elasticsearch index.
   - Admins can review and correct extracted information from PDF articles.

3. **Moderator Features:**
   - Moderators, once added by an admin, can perform specific tasks such as reviewing and correcting information extracted from PDF articles.

## Technologies Used

- **Backend:**
  - Django (Python web framework)
  - Elasticsearch for indexing and searching
  - MySQL for data storage

- **Frontend:**
  - React with Tailwind CSS and Material-UI

- **Containerization:**
  - Docker for packaging the application

## API Endpoints

- [List of API endpoints]

## Installation and Setup

1. Clone the PeriSource repository.
2. Set up the backend and frontend according to their respective README files.
3. Install Docker and run the containers.

## Dependencies

- Django
- Elasticsearch
- MySQL
- React
- Tailwind CSS
- Material-UI
- Docker

## Contributors

- Bouhadi Haifaa (https://github.com/haifaabh)
- Kamelia Hamadene (https://github.com/kameliaham)
- Guitoun Djihene (https://github.com/dia-na-oct)
- Beletreche Nihad (https://github.com/nihadbellatreche)
- Nacef SalahEddine (https://github.com/salahpy)
- Mouaici Amine  (https://github.com/aminemouaici)
