---
title: Home Page
description: Home Description
---
<div class="col-md-10 mx-auto p-3 p-md-5 mt-5">

<div class="row mt-5">

<div class="col-md-12 p-3">
<h3>UPdate</h3>
<p>Implement canopy data first tester on essay 1 and essay 2</p>
<p><a href="/canopy/"> Visit Canopy Page </a></p>
</div>

<div class="col-md-4 p-3">
<h3 >Canopy All test fetch</h3>
{% for s in collections.canopys | reverse %}
<p><a href="{{s.url}}">{{s.data.title}}</a></p>
{% endfor %}
</div>
<div class="col-md-4 p-3">
<h3 >Canopy Essay 1 test fetch</h3>
{% for j in collections.esaysones %}
<p><a href="{{j.url}}">{{j.data.title}}</a></p>
{% endfor %}
</div>
<div class="col-md-4 p-3">
<h3 >Canopy Essay 2 test fetch</h3>
{% for u in collections.esaystwos %}
<p><a href="{{u.url}}">{{u.data.title}}</a></p>
{% endfor %}
</div>

<div class="col-md-4 p-3">
<h3 >crosscurrents All test fetch</h3>
{% for s in collections.crosscurrentss | reverse %}
<p><a href="{{s.url}}">{{s.data.title}}</a></p>
{% endfor %}
</div>
<div class="col-md-4 p-3">
<h3 >Cross Currents Essay 1 test fetch</h3>
{% for j in collections.croesaysones %}
<p><a href="{{j.url}}">{{j.data.title}}</a></p>
{% endfor %}
</div>
<div class="col-md-4 p-3">
<h3 >Cross Currents Essay 2 test fetch</h3>
{% for u in collections.croesaystwos %}
<p><a href="{{u.url}}">{{u.data.title}}</a></p>
{% endfor %}
</div>

<div class="col-md-4 p-3">
<h3 >JCREORS All test fetch</h3>
{% for s in collections.jcreors | reverse %}
<p><a href="{{s.url}}">{{s.data.title}}</a></p>
{% endfor %}
</div>
<div class="col-md-4 p-3">
<h3 >jcreors Essay 1 test fetch</h3>
{% for j in collections.jcesaysones %}
<p><a href="{{j.url}}">{{j.data.title}}</a></p>
{% endfor %}
</div>
<div class="col-md-4 p-3">
<h3 >jcreors Essay 2 test fetch</h3>
{% for u in collections.jcesaystwos %}
<p><a href="{{u.url}}">{{u.data.title}}</a></p>
{% endfor %}
</div>

<div class="col-md-4 p-3">
<h3 >Featured All test fetch</h3>
{% for s in collections.features | reverse %}
<p><a href="{{s.url}}">{{s.data.title}}</a></p>
{% endfor %}
</div>
<div class="col-md-4 p-3">
<h3 >featured Essay 1 test fetch</h3>
{% for j in collections.fesaysones %}
<p><a href="{{j.url}}">{{j.data.title}}</a></p>
{% endfor %}
</div>
<div class="col-md-4 p-3">
<h3 >featured Essay 2 test fetch</h3>
{% for u in collections.fesaystwos %}
<p><a href="{{u.url}}">{{u.data.title}}</a></p>
{% endfor %}
</div>

</div>

</div>
