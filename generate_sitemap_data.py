import os
import glob
from pathlib import Path
from datetime import datetime

def get_citations():
    """Get all citation files from /public/bib/"""
    bib_path = "/Users/abrett76/github/outcome/public/bib"
    citations = {}
    
    if os.path.exists(bib_path):
        for root, dirs, files in os.walk(bib_path):
            # Skip hidden directories
            dirs[:] = [d for d in dirs if not d.startswith('.')]
            
            for file in files:
                if file.endswith(('.bib', '.ris', '.csl.json')):
                    filepath = os.path.join(root, file)
                    # Calculate relative URL
                    rel_path = os.path.relpath(filepath, "/Users/abrett76/github/outcome/public")
                    url = "/" + rel_path.replace(os.sep, "/")
                    
                    if url not in citations:
                        citations[url] = {
                            'url': url,
                            'lastmod': datetime.fromtimestamp(os.path.getmtime(filepath)).isoformat()
                        }
    
    return sorted(citations.values(), key=lambda x: x['url'])

def get_images():
    """Get all image files from /public/img/"""
    img_path = "/Users/abrett76/github/outcome/public/img"
    images = {}
    img_extensions = ('.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg')
    
    if os.path.exists(img_path):
        for root, dirs, files in os.walk(img_path):
            # Skip hidden directories
            dirs[:] = [d for d in dirs if not d.startswith('.')]
            
            for file in files:
                if file.lower().endswith(img_extensions):
                    filepath = os.path.join(root, file)
                    # Calculate relative URL
                    rel_path = os.path.relpath(filepath, "/Users/abrett76/github/outcome/public")
                    url = "/" + rel_path.replace(os.sep, "/")
                    
                    if url not in images:
                        images[url] = {
                            'url': url,
                            'lastmod': datetime.fromtimestamp(os.path.getmtime(filepath)).isoformat()
                        }
    
    return sorted(images.values(), key=lambda x: x['url'])

def get_documents():
    """Get all document files from /public/pdf/ and /public/files/"""
    documents = {}
    doc_extensions = ('.pdf', '.doc', '.docx', '.txt', '.xlsx', '.pptx')
    doc_paths = [
        "/Users/abrett76/github/outcome/public/pdf",
        "/Users/abrett76/github/outcome/public/files",
        "/Users/abrett76/github/outcome/public/downloads"
    ]
    
    for doc_path in doc_paths:
        if os.path.exists(doc_path):
            for root, dirs, files in os.walk(doc_path):
                # Skip hidden directories
                dirs[:] = [d for d in dirs if not d.startswith('.')]
                
                for file in files:
                    if file.lower().endswith(doc_extensions):
                        filepath = os.path.join(root, file)
                        # Calculate relative URL
                        rel_path = os.path.relpath(filepath, "/Users/abrett76/github/outcome/public")
                        url = "/" + rel_path.replace(os.sep, "/")
                        
                        if url not in documents:
                            documents[url] = {
                                'url': url,
                                'lastmod': datetime.fromtimestamp(os.path.getmtime(filepath)).isoformat()
                            }
    
    return sorted(documents.values(), key=lambda x: x['url'])

if __name__ == "__main__":
    print("Citations:", len(get_citations()))
    print("Images:", len(get_images()))
    print("Documents:", len(get_documents()))
