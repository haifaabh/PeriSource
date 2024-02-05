import re
from collections import Counter
import fitz
import sys

def text_extractor(path):
    text = ""
    with fitz.open(path) as pdf:
        for page in pdf.pages():
            text += page.get_text()
    return text

def extract_reference_section(text):
    phrases = ['References', 'Bibliography', 'REFERENCE', 'BIBLIOGRAPHY', 'references']
    last_occurrence = {phrase: -1 for phrase in phrases}

    for phrase in phrases:
        pattern = re.compile(re.escape(phrase))
        matches = list(pattern.finditer(text))
        if matches:
            last_occurrence[phrase] = matches[-1].end()

    end = max(last_occurrence.values())
    references_text = text[end+1:]
    matches = list(re.finditer(r'^\[\d+\]', references_text, flags=re.MULTILINE))
    if matches:
      last_reference_match = matches[-1]

    if last_reference_match:
        last_reference_index = end + last_reference_match.start()
        extended_reference_section = text[end+1:last_reference_index]
        additional_lines = text[last_reference_index:].split('\n')[:4] 
        result = f"{extended_reference_section}{''.join(additional_lines)}"
        return result
    else:
        return ""

def extract_reference(text, ref_number):
    pattern = re.compile(r'\[' + re.escape(ref_number) + r'\] (.*?)(\. (?=\[)|\.\n|\Z)', re.DOTALL)
    match = pattern.search(text)
    if match:
        return match.group(1)
    else:
        return ""

def extract_references_as_list(text):
    references_pattern = r'\[\d+\]'
    
    references_list = re.split(references_pattern, text)
    
    references_list = [ref.strip() for ref in references_list if ref.strip()]
    
    return references_list