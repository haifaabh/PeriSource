import spacy
import re
import fitz  # PyMuPDF
import requests
def extract_clean_text_from_pdf2(pdf_url):
   pdf_document = fitz.open(pdf_url)
   extracted_text = ""
   for page_number in range(pdf_document.page_count):
     page = pdf_document[page_number]
     text = page.get_text("text")
     extracted_text += text

   pdf_document.close()
   return extracted_text

def extract_clean_text_from_pdf(pdf_url):
    try:
        if not pdf_url:
            print('PDF URL is required')
            return

        file_id = pdf_url.split('/')[-2]
        pdf_direct_url = f'https://drive.google.com/uc?id={file_id}'

        response = requests.get(pdf_direct_url)
        response.raise_for_status()

        pdf_document = fitz.open(stream=response.content, filetype="pdf")
        
        clean_text = []
        for page in pdf_document:
            text = page.get_text()
            clean_text.append(text)

        pdf_document.close()

        final_text = "\n".join(clean_text)
        return final_text

    except (requests.exceptions.RequestException, Exception) as e:
        print(f'Error: {e}')
        return None

def extract_information(article_text):
 
    extracted_info = {}
    

    nlp_en = spacy.load("en_core_web_lg")
    nlp_fr = spacy.load("fr_core_news_lg")
    section_headers = ["abstract", "keywords", "introduction", "references","index terms"]

    pattern = re.compile(fr'({"|".join(re.escape(header) for header in section_headers)})', re.IGNORECASE)
    matches = pattern.finditer(article_text)

    section_positions = {header.lower(): -1 for header in section_headers}

    for match in matches:
      header = match.group(1).lower()
      position = match.start()

      if section_positions[header] == -1:
        section_positions[header] = position

    valid_positions = [position for position in section_positions.values() if position > 0]

    first_section = min(valid_positions) if valid_positions else -1

    search_area = article_text[:first_section] if first_section != -1 else article_text


    doc_en = nlp_en(search_area)

    # Extract authors in English
    authors_en = [ent.text for ent in doc_en.ents if ent.label_ == "PERSON"]
    extracted_info["authors"] = ", ".join(authors_en)

    # Extract institutions in English
    institutions_en = [ent.text for ent in doc_en.ents if ent.label_ == "ORG"]
    extracted_info["institutions"] = ", ".join(institutions_en)

    doc_fr = nlp_fr(search_area)

    authors_fr = [ent.text for ent in doc_fr.ents if ent.label_ == "PERSON"]
    extracted_info["authors"] += ", " + ", ".join(authors_fr)

    # Extract institutions in French
    institutions_fr = [ent.text for ent in doc_fr.ents if ent.label_ == "ORG"]
    extracted_info["institutions"] += ", " + ", ".join(institutions_fr)


    



    section_patterns = {
        "abstract": re.compile(r'(Abstract(.*?)|summary:(.*?)|A B S T R A C T(.*?)|résumé:(.*?)|resume:(.*?)|abstrakt:(.*?))(?:(?:keywords|Introduction|Motivation and significance|USE CASE|index terms|Categories and Subject Descriptors|General terms|ccs concepts)|$)', re.DOTALL |  re.IGNORECASE),
        "keywords": re.compile(r'(keywords(.*?)|mots-clés:(.*?)|index terms(.*?)|terms:(.*?)|key terms:(.*?))(?:(?:Introduction|References|A B S T R A C T|USE CASE|ACM Reference Format)|$)', re.DOTALL |  re.IGNORECASE),
        "introduction": re.compile(r'(Introduction.*?|Motivation and significance.*?|commencement.*?|perface.*?|preamble.*?|prologue.*?|USE CASE.*?|opening.*?|lead-in.*?)((?:References|Keywords)(?![\s\S]*?(?:References|Keywords))|$)', re.DOTALL | re.IGNORECASE),

    }

    for section, pattern in section_patterns.items():
        match = pattern.search(article_text)
        if match:
            extracted_info[section] = ' '.join(match.group(1).split()[1:]).strip()

    return extracted_info


def clean_journal_text2(text):
    encoding = 'utf-8'
    regex_flags = re.MULTILINE | re.IGNORECASE

    fig_table_pattern = re.compile(r'^(fig\.?|figure)\W*', flags=regex_flags)

    number_only_pattern = re.compile(r'^\d+\W*$', flags=regex_flags)

    text_lines = text.split('\n')
    cleaned_lines = [line for line in text_lines if not fig_table_pattern.match(line) and not number_only_pattern.match(line)]

    cleaned_text = '\n'.join(cleaned_lines)
    
    return cleaned_text



