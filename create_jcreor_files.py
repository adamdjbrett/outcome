#!/usr/bin/env python3
import json
from pathlib import Path

# Define the output directory
output_dir = Path('/Users/abrett76/github/outcome/public/bib/jcreor')
output_dir.mkdir(parents=True, exist_ok=True)

# Define the article entries with their citation keys
entries = {
    'preface-introduction': {
        'bibtex_key': 'arnold_preface_2024',
        'filename': 'preface-introduction'
    },
    'interim-report-special-rapporteur': {
        'bibtex_key': 'shaheed_interim_2022',
        'filename': 'interim-report-special-rapporteur'
    },
    'indigenous-values-initiative-territorial-integrity': {
        'bibtex_key': 'indigenous_values_initiative_indigenous_2024',
        'filename': 'indigenous-values-initiative-territorial-integrity'
    },
    'comments-un-special-rapporteur': {
        'bibtex_key': 'mcnally_comments_2024',
        'filename': 'comments-un-special-rapporteur'
    },
    'remarks-freedom-religion-belief': {
        'bibtex_key': 'hill_lyons_remarks_2024',
        'filename': 'remarks-freedom-religion-belief'
    },
    'editorial-address-advisory-board': {
        'bibtex_key': 'oegema_editorial_2024',
        'filename': 'editorial-address-advisory-board'
    },
    'limits-concept-religious-freedom': {
        'bibtex_key': 'brett_limits_2024',
        'filename': 'limits-concept-religious-freedom'
    },
    'intellectual-acknowledgement-religious-freedom': {
        'bibtex_key': 'pharo_intellectual_2025',
        'filename': 'intellectual-acknowledgement-religious-freedom'
    },
    'bankruptcy-category-religion': {
        'bibtex_key': 'titizano_bankruptcy_2024',
        'filename': 'bankruptcy-category-religion'
    }
}

# BibTeX entries
bibtex_entries = {
    'arnold_preface_2024': '''@article{arnold_preface_2024,
	title = {Preface and {Introduction}: {From} {Indigenous} {Religions} to {Indigenous} {Values}},
	volume = {5},
	issn = {2563-0288},
	shorttitle = {Preface and {Introduction}},
	url = {https://creor-ejournal.library.mcgill.ca/article/view/108},
	doi = {10.26443/jcreor.v5i2.108},
	abstract = {The Office of the External Special Rapporteur on Religious Freedom or Belief contacted Philip P. Arnold, the Indigenous Values Initiative (IVI), and the American Indian Law Alliance (AILA), and asked us to join a call to give input on a new report on Indigenous Religious Freedom or Belief. Numerous Indigenous NGOs, Indigenous nations, and leaders were on the call. The Special Rapporteur Ahmed Shaheed and his staff were most receptive to the feedback given and received. In this special issue, you will find a copy of the report and a copy of the input provided by the IVI and AILA, as well as from our friends and colleagues Michael McNally, Lars Pharo, Dana Lloyd and Cecilia Titizano. This is a representative sample of the inputs collected for the report.},
	number = {2},
	urldate = {2024-12-17},
	journal = {Journal of the Council for Research on Religion},
	author = {Arnold, Philip P. and Bigtree, Sandra and Brett, Adam DJ},
	month = nov,
	year = {2024},
	pages = {ii--x},
}''',
    
    'shaheed_interim_2022': '''@article{shaheed_interim_2022,
	title = {Interim {Report} of the {Special} {Rapporteur} on {Freedom} of {Religion} or {Belief}: {Indigenous} {Peoples} and the {Right} to {Freedom} of {Religion} or {Belief}},
	volume = {5},
	url = {https://creor-ejournal.library.mcgill.ca/article/view/110},
	doi = {10.26443/jcreor.v5i2.110},
	abstract = {In the present report, the Special Rapporteur on freedom of religion or belief, Ahmed Shaheed, initiates a critical conversation within the United Nations system and beyond on obstacles and opportunities facing indigenous peoples' freedom of religion or belief – a largely overlooked subject. Understanding indigenous peoples and their diverse religions or beliefs is impossible without acknowledging historical and ongoing experiences of discrimination, violence and hostility, which threaten their spiritual, cultural and physical survival. The Special Rapporteur explores "indigenous spirituality" as a typically nature-based "way of life", documents experiences of affected rights holders – from forced displacement to environmental destruction – and provides recommendations to protect and promote the freedom of religion or belief of indigenous peoples, consistent with international law.},
	number = {2},
	urldate = {2024-12-17},
	journal = {JCREOR},
	author = {Shaheed, Ahmed},
	month = sep,
	year = {2022},
	note = {Section: Articles},
	pages = {1--39},
}''',
    
    'indigenous_values_initiative_indigenous_2024': '''@article{indigenous_values_initiative_indigenous_2024,
	title = {Indigenous {Values} {Initiative} {Together} with the {American} {Indian} {Law} {Alliance} {Submits} this {Report}: {The} {Territorial} {Integrity} of {Mother} {Earth}, {Indigenous} {Peoples}, and the {Right} to {Freedom} of {Religion} or {Belief}},
	volume = {5},
	url = {https://creor-ejournal.library.mcgill.ca/article/view/113},
	abstract = {The present report is the input provided by the Indigenous Values Initiative (IVI) and American Indian Law Alliance (AILA) in response to the new report drafted in 2022 by Ahmed Shaheed, the Special Rapporteur on Religious Freedom or Belief.},
	number = {2},
	urldate = {2024-12-17},
	journal = {JCREOR},
	author = {{Indigenous Values Initiative} and {American Indian Law Alliance}},
	month = nov,
	year = {2024},
	note = {Section: Articles},
	pages = {40--45},
}''',
    
    'mcnally_comments_2024': '''@article{mcnally_comments_2024,
	title = {Comments {Delivered} to the {UN} {Special} {Rapporteur} on {Freedom} of {Religion} or {Belief}},
	volume = {5},
	url = {https://creor-ejournal.library.mcgill.ca/article/view/114},
	doi = {10.26443/jcreor.v5i2.114},
	abstract = {Comments delivered as part of the "Virtual Consultation on Legal Framework: Indigenous Peoples and the Right to Freedom of Religion or Belief," held June 22, 2022. For details on the Special Rapporteur's report, see Ahmed Shaheed, "Interim Report of the Special Rapporteur on Freedom of Religion or Belief. Indigenous Peoples and the Right to Freedom of Religion or Belief" (New York: United Nations, October 10, 2022).},
	number = {2},
	urldate = {2024-12-17},
	journal = {JCREOR},
	author = {McNally, Michael},
	month = nov,
	year = {2024},
	note = {Section: Articles},
	pages = {46--53},
}''',
    
    'hill_lyons_remarks_2024': '''@article{hill_lyons_remarks_2024,
	title = {Remarks on the {Freedom} of {Religion} or {Belief} {Report}},
	volume = {5},
	url = {https://creor-ejournal.library.mcgill.ca/article/view/115},
	doi = {10.26443/jcreor.v5i2.115},
	number = {2},
	journal = {Journal of the Council for Research on Religion},
	author = {Hill (Lyons), Betty},
	month = nov,
	year = {2024},
	pages = {54--57},
}''',
    
    'brett_limits_2024': '''@article{brett_limits_2024,
	title = {On the {Limits} of the {Concept} of {Religious} {Freedom} in {Indigenous} {Communities}},
	volume = {5},
	url = {https://creor-ejournal.library.mcgill.ca/article/view/117},
	doi = {10.26443/jcreor.v5i2.117},
	abstract = {In this essay, we will argue that firstly, the international and national legal framings of religion or belief are limited in scope, and one must ask not only religious freedom for whom but also from whom. Secondly, we will underscore the continued limitations of international human rights-based discourse. Why are Indigenous nations consistently excluded from rights-based discourses? We have the UN Declaration on Human Rights (UNDHR), the UN Declaration on the Rights of Indigenous Peoples (UNPFII), the Expert Mechanism on the Rights of Indigenous Peoples (EMRIP), this new report, and so many other reports. We will ask at what stage we move from declarations and reports to protecting and supporting Indigenous nations and peoples. Thirdly, building on the limitations of rights-based reporting, we will highlight what this report gets right and invite activists, lawyers, scholars, and all folks to take up and read the report and follow up on the elements we believe to be most salient. Finally, we will conclude by offering an alternative to declarations that support Indigenous nations and peoples' inherent right to sovereignty. Our conclusion emphasizes Faithkeeper Lyons' urgent message, "The Ice is Melting in the North," and provides a framework for how people could respond by explaining the Two Row Wampum treaty and the Two Row Wampum Method.},
	number = {2},
	urldate = {2025-01-06},
	journal = {JCREOR},
	author = {Brett, Adam DJ and Hill (Lyons), Betty},
	month = nov,
	year = {2024},
	note = {Section: Articles},
	pages = {75--96},
}''',
    
    'pharo_intellectual_2025': '''@article{pharo_intellectual_2025,
	title = {Intellectual {Acknowledgement} in {Favour} of {Religious} {Freedom} and {Justice}: {Comparative} {History} of {Religions} and {Ideas} as {Methodology} for {Education}},
	volume = {5},
	url = {https://creor-ejournal.library.mcgill.ca/article/view/124},
	doi = {10.26443/jcreor.v5i2.124},
	abstract = {This succinct essay addresses the issue of freedom of religion for Indigenous cultures. Freedom of belief cannot subsist without justice, i.e. equal recognition. By ignoring the intellectual achievements of Indigenous and other non-Western philosophies and non-Christian religions, scholarship constitutes an important reason for the depreciation of freedom of religious beliefs and, thereby, injustice. I argue that the scientific and pedagogical methodology of the comparative history of religions should be included in education at schools, colleges, and universities to combat this structural inequity. A historical consciousness of intellectual culture worldwide would not only have an impact on contemporary Indigenous cultures, but also on cultures with an Indigenous heritage, and would contest antisemitism and prejudice against Islam. To exemplify the history of intellectual and religious multiplicity and complexity, I mention traditions of ritual time, writing and semiotic systems, moral ideas, political principles, and the constitutional governance of a few selected Indigenous cultures of the American continent to be further researched by Indigenous and non-Indigenous scholars, and to be taught in schools and academia. Finally, I offer concrete recommendations for what is to be done for this new historiography.},
	number = {2},
	urldate = {2025-03-09},
	journal = {JCREOR},
	author = {Pharo, Lars Kirkhusmo},
	month = mar,
	year = {2025},
	note = {Section: Articles},
	pages = {97--110},
}''',
    
    'titizano_bankruptcy_2024': '''@article{titizano_bankruptcy_2024,
	title = {The {Bankruptcy} of the {Category} of {Religion}: {A} {Decolonizing} {Approach}},
	volume = {5},
	url = {https://creor-ejournal.library.mcgill.ca/article/view/116},
	doi = {10.26443/jcreor.v5i2.116},
	abstract = {This article takes as its point of departure the 2022 Interim Report of the United Nations Special Rapporteur on Freedom of Religion or Belief, entitled "Indigenous Peoples and the Right to Freedom of Religion or Belief." The report recommends collaborating with indigenous spiritual leaders and influencers to support conservation efforts and the sustainable development of traditional lands through a human rights-based approach. We ask what a human-rights-based approach to the conservation and sustainable development of traditional Indigenous lands looks like. More specifically, would such an approach be in line with the worldviews of the Indigenous peoples potentially affected by such conservation or development? We consider these questions both legally and theologically. We acknowledge that the protection of human rights is better than their violation, but we also take seriously critiques of this standard human rights discourse. We argue that case studies such as Oak Flat, Lake Titicaca, and the Klamath River call us away from abstract affirmations of the human right to religious freedom and toward a rights-of-nature framework. Ultimately, both Western legal discourse and Western religious studies discourse reduce Indigenous cosmologies into cultural debates, thus erasing the sovereignty of Indigenous lands and peoples. A decolonizing approach therefore requires a rethinking of the sacred.},
	number = {2},
	urldate = {2025-03-25},
	journal = {JCREOR},
	author = {Titizano, Cecilia and Lloyd, Dana},
	month = nov,
	year = {2024},
	note = {Section: Articles},
	pages = {58--74},
}''',
}

# RIS entries
ris_entries = {
    'preface-introduction': '''TY  - JOUR
TI  - Preface and Introduction: From Indigenous Religions to Indigenous Values
AU  - Arnold, Philip P.
AU  - Bigtree, Sandra
AU  - Brett, Adam DJ
T2  - Journal of the Council for Research on Religion
AB  - The Office of the External Special Rapporteur on Religious Freedom or Belief contacted Philip P. Arnold, the Indigenous Values Initiative (IVI), and the American Indian Law Alliance (AILA), and asked us to join a call to give input on a new report on Indigenous Religious Freedom or Belief. Numerous Indigenous NGOs, Indigenous nations, and leaders were on the call. The Special Rapporteur Ahmed Shaheed and his staff were most receptive to the feedback given and received. In this special issue, you will find a copy of the report and a copy of the input provided by the IVI and AILA, as well as from our friends and colleagues Michael McNally, Lars Pharo, Dana Lloyd and Cecilia Titizano. This is a representative sample of the inputs collected for the report.
DA  - 2024/11/01/
PY  - 2024
DO  - 10.26443/jcreor.v5i2.108
VL  - 5
IS  - 2
SP  - ii
EP  - x
J2  - Journal of the Council for Research on Religion
SN  - 2563-0288
UR  - https://creor-ejournal.library.mcgill.ca/article/view/108
ER  - ''',

    'interim-report-special-rapporteur': '''TY  - JOUR
TI  - Interim Report of the Special Rapporteur on Freedom of Religion or Belief: Indigenous Peoples and the Right to Freedom of Religion or Belief
AU  - Shaheed, Ahmed
T2  - Journal of the Council for Research on Religion
AB  - In the present report, the Special Rapporteur on freedom of religion or belief, Ahmed Shaheed, initiates a critical conversation within the United Nations system and beyond on obstacles and opportunities facing indigenous peoples' freedom of religion or belief. Understanding indigenous peoples and their diverse religions or beliefs is impossible without acknowledging historical and ongoing experiences of discrimination, violence and hostility, which threaten their spiritual, cultural and physical survival. The Special Rapporteur explores indigenous spirituality as a typically nature-based way of life and provides recommendations to protect and promote the freedom of religion or belief of indigenous peoples, consistent with international law.
DA  - 2022/09/13/
PY  - 2022
DO  - 10.26443/jcreor.v5i2.110
VL  - 5
IS  - 2
SP  - 1
EP  - 39
J2  - JCREOR
UR  - https://creor-ejournal.library.mcgill.ca/article/view/110
ER  - ''',

    'indigenous-values-initiative-territorial-integrity': '''TY  - JOUR
TI  - Indigenous Values Initiative Together with the American Indian Law Alliance Submits this Report: The Territorial Integrity of Mother Earth, Indigenous Peoples, and the Right to Freedom of Religion or Belief
AU  - Indigenous Values Initiative
AU  - American Indian Law Alliance
T2  - Journal of the Council for Research on Religion
AB  - The present report is the input provided by the Indigenous Values Initiative (IVI) and American Indian Law Alliance (AILA) in response to the new report drafted in 2022 by Ahmed Shaheed, the Special Rapporteur on Religious Freedom or Belief.
DA  - 2024/11/01/
PY  - 2024
VL  - 5
IS  - 2
SP  - 40
EP  - 45
J2  - JCREOR
UR  - https://creor-ejournal.library.mcgill.ca/article/view/113
ER  - ''',

    'comments-un-special-rapporteur': '''TY  - JOUR
TI  - Comments Delivered to the UN Special Rapporteur on Freedom of Religion or Belief
AU  - McNally, Michael
T2  - Journal of the Council for Research on Religion
AB  - Comments delivered as part of the Virtual Consultation on Legal Framework: Indigenous Peoples and the Right to Freedom of Religion or Belief, held June 22, 2022.
DA  - 2024/11/01/
PY  - 2024
DO  - 10.26443/jcreor.v5i2.114
VL  - 5
IS  - 2
SP  - 46
EP  - 53
J2  - JCREOR
UR  - https://creor-ejournal.library.mcgill.ca/article/view/114
ER  - ''',

    'remarks-freedom-religion-belief': '''TY  - JOUR
TI  - Remarks on the Freedom of Religion or Belief Report
AU  - Hill (Lyons), Betty
T2  - Journal of the Council for Research on Religion
DA  - 2024/11/01/
PY  - 2024
DO  - 10.26443/jcreor.v5i2.115
VL  - 5
IS  - 2
SP  - 54
EP  - 57
UR  - https://creor-ejournal.library.mcgill.ca/article/view/115
ER  - ''',

    'limits-concept-religious-freedom': '''TY  - JOUR
TI  - On the Limits of the Concept of Religious Freedom in Indigenous Communities
AU  - Brett, Adam DJ
AU  - Hill (Lyons), Betty
T2  - Journal of the Council for Research on Religion
AB  - In this essay, we will argue that the international and national legal framings of religion or belief are limited in scope. We will underscore the continued limitations of international human rights-based discourse and offer an alternative to declarations that support Indigenous nations and peoples' inherent right to sovereignty.
DA  - 2024/11/01/
PY  - 2024
DO  - 10.26443/jcreor.v5i2.117
VL  - 5
IS  - 2
SP  - 75
EP  - 96
J2  - JCREOR
UR  - https://creor-ejournal.library.mcgill.ca/article/view/117
ER  - ''',

    'intellectual-acknowledgement-religious-freedom': '''TY  - JOUR
TI  - Intellectual Acknowledgement in Favour of Religious Freedom and Justice: Comparative History of Religions and Ideas as Methodology for Education
AU  - Pharo, Lars Kirkhusmo
T2  - Journal of the Council for Research on Religion
AB  - This essay addresses the issue of freedom of religion for Indigenous cultures. I argue that the scientific and pedagogical methodology of the comparative history of religions should be included in education at schools, colleges, and universities to combat structural inequity. A historical consciousness of intellectual culture worldwide would not only have an impact on contemporary Indigenous cultures, but also on cultures with an Indigenous heritage.
DA  - 2025/03/05/
PY  - 2025
DO  - 10.26443/jcreor.v5i2.124
VL  - 5
IS  - 2
SP  - 97
EP  - 110
J2  - JCREOR
UR  - https://creor-ejournal.library.mcgill.ca/article/view/124
ER  - ''',

    'bankruptcy-category-religion': '''TY  - JOUR
TI  - The Bankruptcy of the Category of Religion: A Decolonizing Approach
AU  - Titizano, Cecilia
AU  - Lloyd, Dana
T2  - Journal of the Council for Research on Religion
AB  - This article takes as its point of departure the 2022 Interim Report of the United Nations Special Rapporteur on Freedom of Religion or Belief. We argue that case studies such as Oak Flat, Lake Titicaca, and the Klamath River call us away from abstract affirmations of the human right to religious freedom and toward a rights-of-nature framework. A decolonizing approach requires a rethinking of the sacred.
DA  - 2024/11/01/
PY  - 2024
DO  - 10.26443/jcreor.v5i2.116
VL  - 5
IS  - 2
SP  - 58
EP  - 74
J2  - JCREOR
UR  - https://creor-ejournal.library.mcgill.ca/article/view/116
ER  - ''',
}

# CSL JSON entries
csl_entries = {
    'preface-introduction': {
        "type": "article-journal",
        "title": "Preface and Introduction: From Indigenous Religions to Indigenous Values",
        "container-title": "Journal of the Council for Research on Religion",
        "volume": "5",
        "issue": "2",
        "page": "ii-x",
        "DOI": "10.26443/jcreor.v5i2.108",
        "ISSN": "2563-0288",
        "URL": "https://creor-ejournal.library.mcgill.ca/article/view/108",
        "author": [
            {"given": "Philip P.", "family": "Arnold"},
            {"given": "Sandra", "family": "Bigtree"},
            {"given": "Adam DJ", "family": "Brett"}
        ],
        "issued": {"date-parts": [[2024, 11]]}
    },
    'interim-report-special-rapporteur': {
        "type": "article-journal",
        "title": "Interim Report of the Special Rapporteur on Freedom of Religion or Belief: Indigenous Peoples and the Right to Freedom of Religion or Belief",
        "container-title": "Journal of the Council for Research on Religion",
        "volume": "5",
        "issue": "2",
        "page": "1-39",
        "DOI": "10.26443/jcreor.v5i2.110",
        "URL": "https://creor-ejournal.library.mcgill.ca/article/view/110",
        "author": [{"given": "Ahmed", "family": "Shaheed"}],
        "issued": {"date-parts": [[2022, 9]]}
    },
    'indigenous-values-initiative-territorial-integrity': {
        "type": "article-journal",
        "title": "Indigenous Values Initiative Together with the American Indian Law Alliance Submits this Report: The Territorial Integrity of Mother Earth, Indigenous Peoples, and the Right to Freedom of Religion or Belief",
        "container-title": "Journal of the Council for Research on Religion",
        "volume": "5",
        "issue": "2",
        "page": "40-45",
        "URL": "https://creor-ejournal.library.mcgill.ca/article/view/113",
        "author": [
            {"literal": "Indigenous Values Initiative"},
            {"literal": "American Indian Law Alliance"}
        ],
        "issued": {"date-parts": [[2024, 11]]}
    },
    'comments-un-special-rapporteur': {
        "type": "article-journal",
        "title": "Comments Delivered to the UN Special Rapporteur on Freedom of Religion or Belief",
        "container-title": "Journal of the Council for Research on Religion",
        "volume": "5",
        "issue": "2",
        "page": "46-53",
        "DOI": "10.26443/jcreor.v5i2.114",
        "URL": "https://creor-ejournal.library.mcgill.ca/article/view/114",
        "author": [{"given": "Michael", "family": "McNally"}],
        "issued": {"date-parts": [[2024, 11]]}
    },
    'remarks-freedom-religion-belief': {
        "type": "article-journal",
        "title": "Remarks on the Freedom of Religion or Belief Report",
        "container-title": "Journal of the Council for Research on Religion",
        "volume": "5",
        "issue": "2",
        "page": "54-57",
        "DOI": "10.26443/jcreor.v5i2.115",
        "URL": "https://creor-ejournal.library.mcgill.ca/article/view/115",
        "author": [{"given": "Betty", "family": "Hill (Lyons)"}],
        "issued": {"date-parts": [[2024, 11]]}
    },
    'limits-concept-religious-freedom': {
        "type": "article-journal",
        "title": "On the Limits of the Concept of Religious Freedom in Indigenous Communities",
        "container-title": "Journal of the Council for Research on Religion",
        "volume": "5",
        "issue": "2",
        "page": "75-96",
        "DOI": "10.26443/jcreor.v5i2.117",
        "URL": "https://creor-ejournal.library.mcgill.ca/article/view/117",
        "author": [
            {"given": "Adam DJ", "family": "Brett"},
            {"given": "Betty", "family": "Hill (Lyons)"}
        ],
        "issued": {"date-parts": [[2024, 11]]}
    },
    'intellectual-acknowledgement-religious-freedom': {
        "type": "article-journal",
        "title": "Intellectual Acknowledgement in Favour of Religious Freedom and Justice: Comparative History of Religions and Ideas as Methodology for Education",
        "container-title": "Journal of the Council for Research on Religion",
        "volume": "5",
        "issue": "2",
        "page": "97-110",
        "DOI": "10.26443/jcreor.v5i2.124",
        "URL": "https://creor-ejournal.library.mcgill.ca/article/view/124",
        "author": [{"given": "Lars Kirkhusmo", "family": "Pharo"}],
        "issued": {"date-parts": [[2025, 3]]}
    },
    'bankruptcy-category-religion': {
        "type": "article-journal",
        "title": "The Bankruptcy of the Category of Religion: A Decolonizing Approach",
        "container-title": "Journal of the Council for Research on Religion",
        "volume": "5",
        "issue": "2",
        "page": "58-74",
        "DOI": "10.26443/jcreor.v5i2.116",
        "URL": "https://creor-ejournal.library.mcgill.ca/article/view/116",
        "author": [
            {"given": "Cecilia", "family": "Titizano"},
            {"given": "Dana", "family": "Lloyd"}
        ],
        "issued": {"date-parts": [[2024, 11]]}
    }
}

# Create files for each entry
for filename, bibtex_key in [
    ('preface-introduction', 'arnold_preface_2024'),
    ('interim-report-special-rapporteur', 'shaheed_interim_2022'),
    ('indigenous-values-initiative-territorial-integrity', None),
    ('comments-un-special-rapporteur', 'mcnally_comments_2024'),
    ('remarks-freedom-religion-belief', 'hill_lyons_remarks_2024'),
    ('limits-concept-religious-freedom', 'brett_limits_2024'),
    ('intellectual-acknowledgement-religious-freedom', 'pharo_intellectual_2025'),
    ('bankruptcy-category-religion', 'titizano_bankruptcy_2024'),
]:
    # Create .bib file
    if bibtex_key and bibtex_key in bibtex_entries:
        bib_file = output_dir / f"{filename}.bib"
        with open(bib_file, 'w', encoding='utf-8') as f:
            f.write(bibtex_entries[bibtex_key])
        print(f"✓ {filename}.bib")
    
    # Create .ris file
    if filename in ris_entries:
        ris_file = output_dir / f"{filename}.ris"
        with open(ris_file, 'w', encoding='utf-8') as f:
            f.write(ris_entries[filename])
        print(f"✓ {filename}.ris")
    
    # Create .csl.json file
    if filename in csl_entries:
        csl_file = output_dir / f"{filename}.csl.json"
        with open(csl_file, 'w', encoding='utf-8') as f:
            json.dump([csl_entries[filename]], f, indent=2, ensure_ascii=False)
        print(f"✓ {filename}.csl.json")

print(f"\n✓ Created 8 article triplets (24 files total) in {output_dir}")
