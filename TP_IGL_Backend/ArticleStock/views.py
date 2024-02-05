from datetime import date
import os
from django.shortcuts import render
from django.http import Http404, HttpResponse
from django.http import JsonResponse
from elasticsearch import NotFoundError
from elasticsearch_dsl import connections
from ArticleStock import extract_title
from ArticleStock.extract_infos import extract_clean_text_from_pdf, extract_clean_text_from_pdf2, extract_information
from ArticleStock.extract_references import extract_reference_section, extract_references_as_list
from .models import Article
from django.http import JsonResponse
from elasticsearch_dsl import Search
from .models import Article
from .search_index import ArticleDocument
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .serializers import ArticleSerializer
import fitz
import requests
from django.shortcuts import get_object_or_404
import json
import re
from ArticleStock.extract_references import  text_extractor
from datetime import datetime


@api_view(['GET'])
def say_hello(request):
    return Response('hello djihene')

@api_view(['GET'])
def verify_elasticsearch_connection(request):
    # Check if connected to Elasticsearch
    try:
        connections.get_connection()
        connected = True
    except:
        connected = False

    return Response({'connected': connected})

@api_view(['POST'])
def add_article(request):
    # Add an article to Elasticsearch only
    serializer = ArticleSerializer(data=request.data)
    if serializer.is_valid():
        article_data = serializer.validated_data
        article_instance = Article(**article_data)
        
        # Update Elasticsearch index
        ArticleDocument().update(article_instance)
        
        return Response({'message': 'Article added successfully'})
    
    return Response({'error': 'Invalid data'}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def retrieve_all_data(request):
    # Retrieve all data from Elasticsearch
    s = Search(index='articles_igl').query('match_all')
    s = s.extra(size=1000)  # Change 1000 to the desired number of hits

    # Execute the search and retrieve the results
    response = s.execute()

    # Extract IDs and serialize data
    serialized_data = []
    for hit in response.hits:
        article_data = ArticleSerializer(hit).data
        article_data['id'] = hit.meta.id
        serialized_data.append(article_data)

    return Response({'results': serialized_data})



@api_view(['GET'])
def retrieve_validated_data(request):
    # Retrieve data from Elasticsearch where validated is True
    s = Search(index='articles_igl').query('bool', filter=Q('term', validated=True))
    s = s.extra(size=1000)  # Change 1000 to the desired number of hits

    # Execute the search and retrieve the results
    response = s.execute()

    # Extract IDs and serialize data
    serialized_data = []
    for hit in response.hits:
        article_data = ArticleSerializer(hit).data
        article_data['id'] = hit.meta.id
        serialized_data.append(article_data)

    return Response({'results': serialized_data})


@api_view(['POST'])
def extract_text_from_pdf(request):
    try:
        # Get the PDF link from the POST data
        pdf_url = request.data.get('pdf_url')

        if not pdf_url:
            return Response({'success': False, 'error': 'PDF URL is required'})

        # Extract the file ID from the Google Drive URL
        file_id = pdf_url.split('/')[-2]

        # Construct the direct link to the PDF file on Google Drive
        pdf_direct_url = f'https://drive.google.com/uc?id={file_id}'

        # Download the PDF content
        response = requests.get(pdf_direct_url)
        response.raise_for_status()

        # Open the PDF content
        pdf_document = fitz.open(stream=response.content, filetype="pdf")

        extracted_text = ""
        for page_number in range(pdf_document.page_count):
            page = pdf_document.load_page(page_number)
            page_text = page.get_text()
            extracted_text += page_text + '\n'  # Add a newline character after each page

        pdf_document.close()
        # Return the extracted text as JSON
        return Response({'success': True, 'text': extracted_text})

    except requests.exceptions.RequestException as re:
        return Response({'success': False, 'error': f'Request error: {re}'})
    except Exception as e:
        return Response({'success': False, 'error': str(e)})







from elasticsearch_dsl import Q

@api_view(['POST'])
def search_articles(request):
    try:
        # Get the search keywords from the POST data
        search_keywords = request.data.get('keywords', [])

        if not search_keywords:
            return Response({'success': False, 'error': 'Search keyword is required'})

        # Construct a bool query with should clauses for each field
        should_clauses = []
        for field in ['titre', 'resume', 'auteurs', 'institutions', 'mots_cles', 'texte_integral', 'url_pdf', 'references_bibliographiques']:
            for keyword in search_keywords:
                should_clauses.append(Q('match', **{field: keyword}))

        query = Q('bool', should=should_clauses) & Q('term', validated=True)


        # Create a search instance
        s = Search(index='articles_igl').query(query)

        # Execute the search and retrieve the results
        response = s.execute()

        # Get the IDs of the articles where the keyword is found
        article_ids = [hit.meta.id for hit in response.hits]

        return Response({'success': True, 'article_ids': article_ids})

    except Exception as e:
        return Response({'success': False, 'error': str(e)})

@api_view(['GET'])
def retrieve_article_by_id(request, article_id):
    # Retrieve a single article by its ID from Elasticsearch
    try:
        # Use get_object_or_404 to retrieve the article or return a 404 response if not found
        article = get_object_or_404(ArticleDocument, id=article_id)
        # Use the serializer to convert the article into serialized data
        serializer = ArticleSerializer(article)
        serialized_data = serializer.data

        return Response({'article': serialized_data})

    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_404_NOT_FOUND)


    
@api_view(['POST'])
def search_articles_by_auteurs(request):
    return search_articles_by_field(request, 'auteurs')

@api_view(['POST'])
def search_articles_by_mots_cles(request):
    return search_articles_by_field(request, 'mots_cles')

@api_view(['POST'])
def search_articles_by_institutions(request):
    return search_articles_by_field(request, 'institutions')
    

@api_view(['DELETE'])
def delete_article(request, article_id):
    article_document = ArticleDocument.get(id=article_id)
    article_document.delete()
    return Response({'message': 'Article deleted successfully'})



@api_view(['POST'])
def search_articles_by_date(request):
    try:
        start_date_str = request.data.get('start_date', '')
        end_date_str = request.data.get('end_date', '')
        
        # Check if start_date and end_date are provided for date range filtering
        if start_date_str and end_date_str:
            return search_articles_by_field(request, 'date', is_search_by_date=True)
        else:
            return search_articles_by_field(request, 'date')

    except Exception as e:
        return Response({'success': False, 'error': str(e)})

def search_articles_by_field(request, field, is_search_by_date=False):
    try:
        # Get the search keywords and date range from the POST data
        search_keywords = request.data.get('keywords', [])

        if not search_keywords:
            return Response({'success': False, 'error': 'Search keywords are required'})

        # Construct a bool query with should clauses for the specified field
        should_clauses = []

        # Add date range filtering if is_search_by_date is True
        if is_search_by_date:
            start_date_str = request.data.get('start_date', '')
            end_date_str = request.data.get('end_date', '')
            if start_date_str and end_date_str:
                start_date = datetime.strptime(start_date_str, '%Y-%m-%d').date()
                end_date = datetime.strptime(end_date_str, '%Y-%m-%d').date()
                date_range_clause = Q('range', **{field: {'gte': start_date, 'lte': end_date}})
                should_clauses.append(date_range_clause)

                # Also add should clauses for keywords in mots_cles field
                keyword_clauses = [Q('match', mots_cles=keyword) for keyword in search_keywords]
                should_clauses.extend(keyword_clauses)
        else :
            should_clauses = [Q('match', **{field: keyword}) for keyword in search_keywords]
          

        query = Q('bool', should=should_clauses)

        # Create a search instance
        s = Search(index='articles_igl').query(query)

        # Execute the search and retrieve the results
        print(f'Elasticsearch query: {s.to_dict()}')
        response = s.execute()
        print(f'Elasticsearch response: {response.to_dict()}')

        # Get the IDs of the articles where the keywords are found
        article_ids = [hit.meta.id for hit in response.hits]

        return Response({'success': True, 'article_ids': article_ids})

    except Exception as e:
        return Response({'success': False, 'error': str(e)})


@api_view(['POST'])
def upload(request):
    if 'url' not in request.data:
        return Response({'error': 'URL is required in the POST data'}, status=status.HTTP_400_BAD_REQUEST)

    url = request.data['url']
    # title = extract_title.pdf_title_from_drive(url)

    title = extract_title.pdf_title(url)
    title = extract_title.sanitize(' '.join(title.split()))


    article_text = extract_clean_text_from_pdf2(url)
    text=article_text
    result = extract_information(article_text)


    text = re.sub(r'\[\s*(.*?)\s*\]', r'[\1]', text)
    text2=text_extractor(url)
    reference_section = extract_reference_section(text2)
    references_list = extract_references_as_list(reference_section)
    auteurs_list = [author.strip() for author in result.get("authors", "").split(", ") if author.strip()]
    institutions_list = [institution.strip() for institution in result.get("institutions", "").split(", ") if institution.strip()]
    keywords = result.get("keywords", "").split(", ")

    transformed_info = {
    "titre": title,
    "resume": "none" if result.get("abstract", None) is None or result.get("abstract", None).strip() == "" else result.get("abstract", None),
    "auteurs": auteurs_list,
    "institutions": institutions_list,
    "mots_cles": [keyword for keyword in keywords if keyword != ""],
    "texte_integral": "none" if result.get("introduction", None) is None or result.get("introduction", None).strip() == "" else result.get("introduction", None),
    "url_pdf": url,
    "references_bibliographiques": references_list,
    }
    
 
    serializer = ArticleSerializer(data=transformed_info)
    if serializer.is_valid():
        article_data = serializer.validated_data
        article_instance = Article(**article_data)
        
        # Update Elasticsearch index
        ArticleDocument().update(article_instance)
        
        return Response({'message': 'Article added successfully'})
    
    return Response({'error': 'Invalid data'}, status=status.HTTP_400_BAD_REQUEST)
# views.py




@api_view(['PUT'])
def update_article(request, article_id):
   
    article_document = ArticleDocument.get(id=article_id)

    # Update the title
    for key, value in request.data.items():
                setattr(article_document, key, value)

        # Set validated to True
    article_document.validated = True

    # Reindex the updated document
    article_document.save()

# Example usage

    return Response({'message': 'Article updated successfully'})
    



@api_view(['GET'])
def retrieve_latest_validated_articles(request):
    try:
        # Create a search instance
        s = Search(index='articles_igl').query(Q('match_all') & Q('term', validated=True))

        # Sort by the 'date' field in descending order
        s = s.sort('-date')

        # Limit the number of results to four
        s = s[:6]

        # Execute the search and retrieve the results
        response = s.execute()

        # Extract IDs and serialize data
        serialized_data = []
        for hit in response.hits:
            article_data = ArticleSerializer(hit).data
            article_data['id'] = hit.meta.id
            serialized_data.append(article_data)

        return Response({'results': serialized_data})

    except Exception as e:
        return Response({'error': str(e)})
    

@api_view(['POST'])
def get_pdf_paths(request):
    if 'url' not in request.data:
        return Response({'error': 'URL is required in the POST data'}, status=status.HTTP_400_BAD_REQUEST)

    directory_path = request.data['url']
    if not os.path.exists(directory_path):
        return Response({'error': 'Invalid directory path'})

    pdf_paths = []

    # Walk through the directory and find PDF files
    for root, dirs, files in os.walk(directory_path):
        for file in files:
            if file.lower().endswith('.pdf'):
                pdf_paths.append(os.path.join(root, file))

    return Response({'pdf_paths': pdf_paths})
