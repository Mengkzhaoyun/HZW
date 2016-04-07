<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>AdminLTE 2 | Log in</title>
    <!-- Tell the browser to be responsive to screen width -->
    <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
    <!-- Bootstrap 3.3.5 -->
    <link rel="stylesheet" href="plugins/bootstrap-3.3.5-dist/css/bootstrap.min.css">
    <!-- Font Awesome -->
    <link rel="stylesheet" href="plugins/font-awesome-4.5.0-dist/css/font-awesome.min.css">
    <!-- Ionicons -->
    <link rel="stylesheet" href="plugins/ionicons-2.0.1-dist/css/ionicons.min.css">
    <!-- Theme style -->
    <link rel="stylesheet" href="plugins/AdminLTE-2.3.0-dist/css/AdminLTE.min.css">
    {% block style %}
    {% endblock %}
  </head>
  <body class="{% block bodyclass %}{% endblock %}">      
    {% block content %}
    {% endblock %}  
    <!-- jQuery 2.2.0 -->
    <script src="plugins/jQuery-2.1.4.min.js"></script>
    <!-- Bootstrap 3.3.6 -->
    <script src="plugins/bootstrap-3.3.5-dist/js/bootstrap.min.js"></script>
    {% block script %}
    {% endblock %}
  </body>
</html>
