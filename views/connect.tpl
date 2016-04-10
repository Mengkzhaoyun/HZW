{% extends 'BaseTpl/layout.tpl' %} 

{% block title %}HZW.GM.User{%endblock%} 

{% block head %}{% endblock %} 

{% block body %}class="hold-transition skin-blue sidebar-collapse sidebar-mini"{%endblock%} 

{% block content %}
<!-- Content Wrapper. Contains page content -->
<div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <section class="content-header">
        <h1>
        链接管理
        <small>管理海贼王数据库连接地址</small>
      </h1>
        <ol class="breadcrumb">
            <li><a href="#"><i class="fa fa-dashboard"></i> 首页</a></li>
            <li>GM管理工具</li>
            <li class="active">链接管理</li>
        </ol>
    </section>

    <!-- Main content -->
    <section class="content">
        <!-- Your Page Content Here -->
        <div class="row" ng-app="hzwApp" ng-controller="hzwCtrl">
            <div class="col-xs-12" >
                <!-- 链接信息 Begin -->
                <div class="box box-info">
                    <div class="box-header with-border">
                        <h3 class="box-title">链接信息</h3>
                    </div>
                    <!-- /.box-header -->
                    <!-- form start -->
                    <form name="hzw" class="form-horizontal" >
                        <div class="box-body">
                            {% for pRow in ConnInfo.Rows %}                          
                            <div class="form-group">
                                <label for="input_conn_{{ pRow.Name }}" class="col-sm-2 control-label">{{ pRow.Alias }}</label>
                                <div class="col-sm-10">
                                    <input type="text" name="hzw_{{ pRow.Name }}" ng-model="{{ pRow.Name }}" class="form-control" id="input_conn_{{ pRow.Name }}">
                                </div>
                            </div>
                            {% endfor %}                                                                                                                             
                        </div>
                        <!-- /.box-body -->
                        <div class="box-footer">
                            <button type="submit" class="btn btn-info pull-right" ng-click="click()">保存</button>
                        </div>
                        <!-- /.box-footer -->
                    </form>
                    <div class="overlay" ng-show="hzw_busy">
                      <i class="fa fa-refresh fa-spin"></i>
                    </div>                    
                </div>
                <!-- 链接信息 End -->
            </div>  
        </div>
        <!-- /.row -->
    </section>
    <!-- /.content -->
</div>
<!-- /.content-wrapper -->
{% endblock %} 

{% block script %}
<!-- AdminLTE App -->
<script src="plugins/AdminLTE-2.3.0-dist/js/app.min.js"></script>
<!-- Angular 1.5.3 -->
<script src="plugins/angular-1.5.3.min.js"></script>
<script src="js/connect.js"></script>
{% endblock %}