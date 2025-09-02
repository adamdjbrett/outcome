---
layout: layouts/canopy/main.njk
title: "International Journal on Responsibility"
description: "The International Journal on Responsibility (IJR) (ISSN: 2576-0955) is an international, peer-reviewed, interdisciplinary forum for theoretical, practical, and methodological explorations into the various and complex issues of responsibility. Animated by the question “Who or what is responsible to do what for whom?,” IJR is a broad-ranging journal that incorporates insights from the full range of academic and practical inquiry from the humanities and the social and natural sciences related to addressing the diverse aspects of responsibility."
abstract: "IJR publishes scholarship and creative works on responsibility. The contents examine theoretical, empirical, intellectual, practical, policy, and ethical issues relating to responsibility. In addition, the journal encourages research and reporting on ways in which responsibility relates to issues ranging from the individual to broad public concern, past, present, and future. Themes include the use of responsibility in academic and nonacademic settings; the development of new perspectives on the topic of responsibility; the application of a focus on responsibility in practical problems; and, the historical and interdisciplinary dimensions of responsibility."
date: 2025-09-02
breadcumb: ijr
#pdf_download: "/pdf/ijr/Introduction_Indigenous+Religions+or+Indigenous+Values_FINAL.pdf"
image: "/img/post/ijr-cover.jpg"
show_toc: true
pagination:
  data: collections.ijrall
  size: 6
  reverse: true
testdata:
 - item1
 - item2
 - item3
 - item4
permalink: "ijr/{% if pagination.pageNumber > 0 %}page-{{ pagination.pageNumber + 1 }}/{% endif %}index.html"
---
