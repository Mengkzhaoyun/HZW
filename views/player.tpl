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
        主角修改
        <small>修改金币、贝利、声望</small>
      </h1>
        <ol class="breadcrumb">
            <li><a href="#"><i class="fa fa-dashboard"></i> 首页</a></li>
            <li>GM管理工具</li>
            <li class="active">主角修改</li>
        </ol>
    </section>

    <!-- Main content -->
    <section class="content">
        <!-- Your Page Content Here -->
        <div class="row" ng-app="hzwApp" ng-controller="hzwCtrl">
            <!-- left column -->
            <div class="col-xs-6" >
                <!-- 角色信息 Begin -->
                <div class="box box-info">
                    <div class="box-header with-border">
                        <h3 class="box-title">角色信息</h3>
                    </div>
                    <!-- /.box-header -->
                    <!-- form start -->
                    <form name="hzw_left" class="form-horizontal" >
                        <div class="box-body">
                            {% for pField in Schemas_accountinfo.FormFields %} 
                            {% if pField.IsLeft %}
                            {% if loop %}<!-- {{ pField.Alias }} start -->{% endif %}                            
                            <div class="form-group">
                                <label for="input_user_{{ pField.Name }}" class="col-sm-2 control-label">{{ pField.Alias }}</label>
                                <div class="col-sm-10">
                                    <input type="text" name="hzw_{{ pField.Name }}" ng-model="{{ pField.Name }}" class="form-control" id="input_user_{{ pField.Name }}" placeholder="{{ pField.Placeholder }}">
                                </div>
                            </div>
                            {% endif %}
                            {% if loop %}<!-- {{ pField.Alias }} end -->{% endif %} 
                            {% endfor %}                                                                                                                             
                        </div>
                        <!-- /.box-body -->
                        <div class="box-footer">
                            <button type="submit" class="btn btn-info pull-right" ng-click="click()">保存</button>
                        </div>
                        <!-- /.box-footer -->
                    </form>
                    <div class="overlay" ng-show="hzw_left_busy">
                      <i class="fa fa-refresh fa-spin"></i>
                    </div>                    
                </div>
                <!-- 角色信息 End -->
            </div>
            <!--/.col (left) -->
            
            <!-- right column -->
            <div class="col-xs-6">
                <!-- 场景信息 Begin -->
                <div class="box box-info">
                    <div class="box-header with-border">
                        <h3 class="box-title">场景信息</h3>
                    </div>
                    <!-- /.box-header -->
                    <!-- form start -->
                    <form name="hzw_right" class="form-horizontal">
                        <div class="box-body">
                            {% for pField in Schemas_accountinfo.FormFields %}                            
                            {% if !pField.IsLeft %}
                            {% if loop %}<!-- {{ pField.Alias }} start -->{% endif %}
                            <div class="form-group">
                                <label for="input_hzw_{{ pField.Name }}" class="col-sm-2 control-label">{{ pField.Alias }}</label>
                                <div class="col-sm-10">
                                    <input type="text" name="{{ pField.Name }}" ng-model="{{ pField.Name }}" class="form-control" id="input_hzw_{{ pField.Name }}" placeholder="{{ pField.Placeholder }}">
                                </div>
                            </div>
                            {% endif %}
                            {% if loop %}<!-- {{ pField.Alias }} end -->{% endif %} 
                            {% endfor %}                                                                                                                             
                        </div>
                        <!-- /.box-body -->
                        <div class="box-footer">
                            <button type="submit" class="btn btn-info pull-right" ng-click="click_adv()">保存</button>
                        </div>
                        <!-- /.box-footer -->
                    </form>
                    <div class="overlay" ng-show="hzw_right_busy">
                      <i class="fa fa-refresh fa-spin"></i>
                    </div>
                </div>
            </div>
            <!--/.col (right) -->
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
<script src="js/player.js"></script>
{% endblock %}