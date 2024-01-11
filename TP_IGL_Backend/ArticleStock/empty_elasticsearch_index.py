from elasticsearch_dsl import connections, Index

# Configure the Elasticsearch client connection
connections.create_connection(hosts=['http://localhost:9200'])

# Specify the name of the index you want to delete
index_name_to_empty = 'articles_igl'

# Delete the index (This will remove all documents in the index)
Index(index_name_to_empty).delete(ignore=404)

# Create the index again to make it empty
Index(index_name_to_empty).create()

print(f'Successfully emptied Elasticsearch index: {index_name_to_empty}')
