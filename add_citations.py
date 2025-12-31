#!/usr/bin/env python3
import os
from pathlib import Path

# Define content directories
content_dirs = [
    '/Users/abrett76/github/outcome/content/canopy',
    '/Users/abrett76/github/outcome/content/crosscurrents',
    '/Users/abrett76/github/outcome/content/featured',
    '/Users/abrett76/github/outcome/content/jcreor',
    '/Users/abrett76/github/outcome/content/podcast',
]

# Define citation base paths
citation_base = '/Users/abrett76/github/outcome/public/bib'

# Which directories have citations
dirs_with_citations = {
    'crosscurrents': 'crosscurrents',
    'jcreor': 'jcreor',
}

updated_files = 0
files_without_citations = 0

for content_dir in content_dirs:
    if not os.path.exists(content_dir):
        continue
    
    # Get all markdown files except index.md
    for root, dirs, files in os.walk(content_dir):
        for file in files:
            if file.endswith('.md') and file != 'index.md':
                filepath = os.path.join(root, file)
                basename = file.replace('.md', '')
                
                # Determine which citation directory to look in
                dir_name = os.path.basename(content_dir)
                
                if dir_name not in dirs_with_citations:
                    print(f"⊘ {filepath} (no citation directory)")
                    files_without_citations += 1
                    continue
                
                citation_dir = dirs_with_citations[dir_name]
                ris_file = f"/bib/{citation_dir}/{basename}.ris"
                csl_file = f"/bib/{citation_dir}/{basename}.csl.json"
                
                # Check if citation files exist
                ris_path = f"{citation_base}/{citation_dir}/{basename}.ris"
                csl_path = f"{citation_base}/{citation_dir}/{basename}.csl.json"
                
                has_ris = os.path.exists(ris_path)
                has_csl = os.path.exists(csl_path)
                
                if not (has_ris or has_csl):
                    print(f"⊘ {filepath} (no citation files found)")
                    files_without_citations += 1
                    continue
                
                # Read the file
                with open(filepath, 'r', encoding='utf-8') as f:
                    content = f.read()
                
                # Check if citation section already exists
                if '### Download Citation' in content:
                    print(f"∼ {filepath} (already has citation section)")
                    continue
                
                # Build citation section
                citation_section = "\n### Download Citation\n"
                links = []
                if has_ris:
                    links.append(f"- [RIS Format]({ris_file})")
                if has_csl:
                    links.append(f"- [CSL JSON Format]({csl_file})")
                
                citation_section += "\n".join(links) + "\n"
                
                # Append to file
                with open(filepath, 'a', encoding='utf-8') as f:
                    f.write(citation_section)
                
                print(f"✓ {filepath}")
                updated_files += 1

print(f"\n=== Summary ===")
print(f"Updated: {updated_files} files")
print(f"No citations: {files_without_citations} files")
