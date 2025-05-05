---
layout: layouts/canopy/main.njk
title: "Podcasts"
image: "/img/post/mapping-doctrine-of-discovery-favicon.png"
description: "Two podcasts came out of our work. First a limited special season of The Doctrine of Christian Discovery and second several seasons of Mapping the Doctrine of Discovery."
abstract: "Mapping the Doctrine of Discovery is an educational podcast hosted by Philip Arnold and Sandy Bigtree that explores how 15th-century papal decrees continue to influence modern law, land rights, and religious worldviews. It connects the Doctrine of Discovery to systemic injustice, emphasizing its role in legalizing land theft and Indigenous dispossession. The podcast features scholars, activists, and Indigenous voices who examine how Christian theology supported conquest and how those legacies remain embedded in U.S. and global institutions. It serves as a resource for truth-telling and decolonization. Produced by Good Faith Media during a 2023 conference at Syracuse University, the Doctrine of Christian Discovery podcast features interviews with Indigenous leaders, scholars, and faith-based advocates. Hosted by Tanner Randall, the podcast examines the ongoing legal, theological, and cultural impacts of the Doctrine. Each episode connects historical analysis to current struggles for Indigenous rights, environmental justice, and religious freedom."
breadcumb: Podcast
show_toc: true
#pdf_download: /pdf/00-overview.pdf
pagination:
  data: collections.pods
  size: 6
  reverse: true
testdata:
 - item1
 - item2
 - item3
 - item4
permalink: "podcast/{% if pagination.pageNumber > 0 %}page-{{ pagination.pageNumber + 1 }}/{% endif %}index.html"
---
