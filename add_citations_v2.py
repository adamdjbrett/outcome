#!/usr/bin/env python3
import os
from pathlib import Path

# Manual mapping of content files to citation files
citation_mapping = {
    'jcreor': {
        'editorial': 'editorial-address-advisory-board',
        'intro': 'preface-introduction',
        'interim': 'interim-report-special-rapporteur',
        'comments': 'comments-un-special-rapporteur',
        'remarks': 'remarks-freedom-religion-belief',
        'bankruptcy': 'bankruptcy-category-religion',
        'limits': 'limits-concept-religious-freedom',
        'intellectual': 'intellectual-acknowledgement-religious-freedom',
        'indigenous': 'indigenous-values-initiative-territorial-integrity',
    },
    'crosscurrents': {
        '200': '200-years-of-johnson-v.-m\'intosh-(jvm)',
        'before-religion': 'before-religion',
        'book-notes': 'book-notes',
        'challenges': 'the-challenges-of-revoking-the-papal-bulls',
        'comments': 'comments-on-the-bishop\'s-panel',
        'construction': 'the-construction-of-indigenous-americans',
        'contributors': 'credits-contributors',
        'cultivating-grace-mindset-elca': 'cultivating-a-g.r.a.c.e.-mindset',
        'dear-autocrat': 'dear-autocrat',
        'documenting-domination-in-international-relations-through-the-doctrine-of-discovery': 'documenting-domination-in-international-relations-',
        'joint': 'joint-statement',
        'lithuanian': 'christian-nationalism-in-the-lithuanian-context',
        'religious-origins': 'the-religious-origins-of-white-supremacy-and-the-doctrine-of-christian-discovery',
        'roots': 'the-roots-of-christian-nationalism-go-back-further-than-you-think',
        'routing': 'routing-out-supremacy\'s-religious-roots',
        'statement-doctrine-discovery-episcopal': 'statement-on-the-doctrine-of-discovery',
        'things': 'things-we-already-knew-before-the-prophecy-of-i-am',
        'toc': 'table-of-contents',
        'toward': 'toward-a-kinder-future',
        'travel': 'travelling-along-the-river-of-life',
        'wedding': 'an-unholy-wedding',
    }
}

citation_base = '/Users/abrett76/github/outcome/public/bib'
updated_files = 0
files_without_citations = 0

# Process jcreor and crosscurrents
for dir_name in ['jcreor', 'crosscurrents']:
    content_dir = f'/Users/abrett76/github/outcome/content/{dir_name}'
    
    if not os.path.exists(content_dir):
        continue
    
    for root, dirs, files in os.walk(content_dir):
        for file in files:
            if file.endswith('.md') and file != 'index.md':
                filepath = os.path.join(root, file)
                basename = file.replace('.md', '')
                
                # Get the mapped citation filename
                if dir_name not in citation_mapping or basename not in citation_mapping[dir_name]:
                    print(f"⊘ {filepath} (no mapping found)")
                    files_without_citations += 1
                    continue
                
                citation_name = citation_mapping[dir_name][basename]
                ris_file = f"/bib/{dir_name}/{citation_name}.ris"
                csl_file = f"/bib/{dir_name}/{citation_name}.csl.json"
                
                # Check if citation files exist
                ris_path = f"{citation_base}/{dir_name}/{citation_name}.ris"
                csl_path = f"{citation_base}/{dir_name}/{citation_name}.csl.json"
                
                has_ris = os.path.exists(ris_path)
                has_csl = os.path.exists(csl_path)
                
                if not (has_ris or has_csl):
                    print(f"⊘ {filepath} (citation files not found)")
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
