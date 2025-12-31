#!/usr/bin/env python3
import os
import json
import re
from pathlib import Path

# Define the bib directory
bib_dir = Path('/Users/abrett76/github/outcome/public/bib')

# Find all .bib files
bib_files = sorted(bib_dir.glob('**/*.bib'))

print(f"Found {len(bib_files)} .bib files\n")

def parse_bibtex(content):
    """Simple BibTeX parser"""
    entries = {}
    
    # Find all entries
    pattern = r'@(\w+)\{([^,\n]+),\s*([\s\S]*?)\n\}'
    matches = re.finditer(pattern, content, re.MULTILINE)
    
    for match in matches:
        entry_type = match.group(1).lower()
        entry_key = match.group(2).strip()
        entry_content = match.group(3)
        
        # Parse fields
        fields = {}
        field_pattern = r'(\w+)\s*=\s*["{](.+?)["}](?:,|$)'
        field_matches = re.finditer(field_pattern, entry_content, re.DOTALL)
        
        for field_match in field_matches:
            field_name = field_match.group(1).strip().lower()
            field_value = field_match.group(2).strip()
            # Clean up the value
            field_value = re.sub(r'[{}]', '', field_value)
            fields[field_name] = field_value
        
        entries[entry_key] = {
            'type': entry_type,
            'fields': fields
        }
    
    return entries

def create_ris(entries):
    """Convert BibTeX entries to RIS format"""
    ris_lines = []
    
    for entry_key, entry in entries.items():
        entry_type = entry['type']
        fields = entry['fields']
        
        # Map BibTeX type to RIS type
        type_map = {
            'article': 'JOUR',
            'book': 'BOOK',
            'inbook': 'CHAP',
            'incollection': 'CHAP',
            'inproceedings': 'CONF',
            'misc': 'GEN',
            'phdthesis': 'THES',
            'mastersthesis': 'THES',
        }
        
        ris_type = type_map.get(entry_type, 'GEN')
        ris_lines.append(f'TY  - {ris_type}')
        
        # Title
        if 'title' in fields:
            ris_lines.append(f'TI  - {fields["title"]}')
        
        # Authors
        if 'author' in fields:
            authors = fields['author'].split(' and ')
            for author in authors:
                author = author.strip()
                ris_lines.append(f'AU  - {author}')
        
        # Year
        if 'year' in fields:
            ris_lines.append(f'PY  - {fields["year"]}')
        
        # Journal
        if 'journal' in fields:
            ris_lines.append(f'JO  - {fields["journal"]}')
        
        # Volume
        if 'volume' in fields and fields['volume']:
            ris_lines.append(f'VL  - {fields["volume"]}')
        
        # Pages
        if 'pages' in fields:
            ris_lines.append(f'SP  - {fields["pages"]}')
        
        # DOI
        if 'doi' in fields:
            ris_lines.append(f'DO  - {fields["doi"]}')
        
        # URL
        if 'url' in fields:
            ris_lines.append(f'UR  - {fields["url"]}')
        
        # ISSN
        if 'issn' in fields:
            ris_lines.append(f'SN  - {fields["issn"]}')
        
        # Abstract
        if 'abstract' in fields:
            abstract = fields['abstract'].replace('\n', ' ')
            ris_lines.append(f'AB  - {abstract}')
        
        # Keywords
        if 'keywords' in fields:
            keywords = fields['keywords'].split(',')
            for keyword in keywords:
                keyword = keyword.strip()
                ris_lines.append(f'KW  - {keyword}')
        
        ris_lines.append('ER  - ')
        ris_lines.append('')
    
    return '\n'.join(ris_lines)

def create_csl_json(entries):
    """Convert BibTeX entries to CSL JSON format"""
    csl_items = []
    
    type_map = {
        'article': 'journal-article',
        'book': 'book',
        'inbook': 'chapter',
        'incollection': 'chapter',
        'inproceedings': 'paper-conference',
        'misc': 'document',
        'phdthesis': 'thesis',
        'mastersthesis': 'thesis',
    }
    
    for entry_key, entry in entries.items():
        entry_type = entry['type']
        fields = entry['fields']
        
        csl_type = type_map.get(entry_type, 'document')
        
        csl_item = {
            'type': csl_type,
        }
        
        # Title
        if 'title' in fields:
            csl_item['title'] = fields['title']
        
        # Authors
        if 'author' in fields:
            authors = []
            author_list = fields['author'].split(' and ')
            for author_str in author_list:
                author_str = author_str.strip()
                # Simple parsing - split by comma for "Last, First"
                if ',' in author_str:
                    parts = author_str.split(',', 1)
                    family = parts[0].strip()
                    given = parts[1].strip() if len(parts) > 1 else ''
                else:
                    # "First Last" format
                    parts = author_str.rsplit(' ', 1)
                    if len(parts) == 2:
                        given = parts[0].strip()
                        family = parts[1].strip()
                    else:
                        given = ''
                        family = author_str
                
                authors.append({'given': given, 'family': family})
            
            if authors:
                csl_item['author'] = authors
        
        # Year
        if 'year' in fields:
            try:
                year = int(fields['year'])
                csl_item['issued'] = {'date-parts': [[year]]}
            except:
                pass
        
        # Journal
        if 'journal' in fields:
            csl_item['container-title'] = fields['journal']
        
        # Volume
        if 'volume' in fields and fields['volume']:
            try:
                csl_item['volume'] = int(fields['volume'])
            except:
                csl_item['volume'] = fields['volume']
        
        # Pages
        if 'pages' in fields:
            csl_item['page'] = fields['pages']
        
        # DOI
        if 'doi' in fields:
            csl_item['DOI'] = fields['doi']
        
        # URL
        if 'url' in fields:
            csl_item['URL'] = fields['url']
        
        # ISSN
        if 'issn' in fields:
            csl_item['ISSN'] = fields['issn']
        
        # ISBN
        if 'isbn' in fields:
            csl_item['ISBN'] = fields['isbn']
        
        # Abstract
        if 'abstract' in fields:
            csl_item['abstract'] = fields['abstract']
        
        # Keywords
        if 'keywords' in fields:
            keywords = [k.strip() for k in fields['keywords'].split(',')]
            csl_item['keyword'] = keywords
        
        csl_items.append(csl_item)
    
    return csl_items

# Process each BibTeX file
success_count = 0
for bib_file in bib_files:
    try:
        # Read BibTeX file
        with open(bib_file, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Parse entries
        entries = parse_bibtex(content)
        
        if not entries:
            print(f"⊘ {bib_file.relative_to(bib_dir)}: No entries found")
            continue
        
        # Get base name
        base_name = bib_file.stem
        output_dir = bib_file.parent
        
        # Create RIS file
        ris_content = create_ris(entries)
        ris_file = output_dir / f"{base_name}.ris"
        with open(ris_file, 'w', encoding='utf-8') as f:
            f.write(ris_content)
        
        # Create CSL JSON file
        csl_items = create_csl_json(entries)
        csl_file = output_dir / f"{base_name}.csl.json"
        with open(csl_file, 'w', encoding='utf-8') as f:
            json.dump(csl_items, f, indent=2, ensure_ascii=False)
        
        print(f"✓ {bib_file.relative_to(bib_dir)}")
        success_count += 1
        
    except Exception as e:
        print(f"✗ {bib_file.relative_to(bib_dir)}: {e}")

print(f"\n✓ Successfully converted {success_count} files!")
