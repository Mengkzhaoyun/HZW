{% extends 'layout.tpl' %}

{% block title %}places {{title}} {%endblock%}

{% block head %}
<link href="stylesheets/style.css" rel="stylesheet">
{% endblock %}

{% block content %}
<h1>{{title}}</h1>
<h2>Where shall we go today?</h2>
<p>
    If I could, I would spend all my time on<a href="http://expedia.com">Travel Sites</a>and book flights on someone else's dime.
    <div>
        <ul>
            {% for place in places %}
            {% if loop.first %}<ol>{% endif %}
            <li><a href="{{place.url}}">{{place.name}}</a></li>
            {% if loop.last %}</ol>{% endif %}
            {% endfor %}
        </ul>
    </div>
    <div>
        {% if hasPlaces %}<a href="/">home</a>{% endif %}
    </div>
</p>
{% endblock %}     
   
  
  
