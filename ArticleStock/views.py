from django.shortcuts import render
from django.http import HttpResponse
from django.http import JsonResponse
from elasticsearch_dsl import connections
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
    
    # Use the serializer to convert hits into serialized data
    serializer = ArticleSerializer(response.hits, many=True)
    serialized_data = serializer.data
    
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




# from elasticsearch_dsl import Q

# @api_view(['POST'])
# def search_articles(request):
#     try:
#         # Get the search keyword from the POST data
#         search_keyword = request.data.get('keyword')

#         if not search_keyword:
#             return Response({'success': False, 'error': 'Search keyword is required'})

#         # Construct a query to search across all fields
#         query = Q('multi_match', query=search_keyword, fields=['titre', 'resume', 'auteurs', 'institutions', 'mots_cles', 'texte_integral', 'url_pdf', 'references_bibliographiques'])

#         # Create a search instance
#         s = Search(index='articles_igl').query(query)

#         # Execute the search and retrieve the results
#         response = s.execute()

#         # Get the IDs of the articles where the keyword is found
#         article_ids = [hit.meta.id for hit in response.hits]

#         return Response({'success': True, 'article_ids': article_ids})

    # except Exception as e:
    #     return Response({'success': False, 'error': str(e)})


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

        query = Q('bool', should=should_clauses)

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

def search_articles_by_field(request, field):
    try:
        # Get the search keywords from the POST data
        search_keywords = request.data.get('keywords', [])

        if not search_keywords:
            return Response({'success': False, 'error': 'Search keywords are required'})

        # Construct a bool query with should clauses for the specified field
        should_clauses = [Q('match', **{field: keyword}) for keyword in search_keywords]
        query = Q('bool', should=should_clauses)

        # Create a search instance
        s = Search(index='mes_articles').query(query)

        # Execute the search and retrieve the results
        response = s.execute()

        # Get the IDs of the articles where the keywords are found
        article_ids = [hit.meta.id for hit in response.hits]

        return Response({'success': True, 'article_ids': article_ids})

    except Exception as e:
        return Response({'success': False, 'error': str(e)})