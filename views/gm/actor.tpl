{% extends 'layout.tpl' %} 

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
        <div class="row">
            <!-- left column -->
            <div class="col-xs-6" ng-app="hzwApp">
                <!-- 账号信息 Begin -->
                <div class="box box-info">
                    <div class="box-header with-border">
                        <h3 class="box-title">账号信息</h3>
                    </div>
                    <!-- /.box-header -->
                    <!-- form start -->
                    <form class="form-horizontal" ng-controller="accountCtrl">
                        <div class="box-body">
                            <div class="form-group">
                                <label class="col-sm-2 control-label">充值</label>
                                <div class="col-sm-10">
                                    <input type="text" ng-model="money" class="form-control" placeholder="">
                                </div>
                            </div>                                                                                                      
                        </div>
                        <!-- /.box-body -->
                        <div class="box-footer">
                            <button type="submit" class="btn btn-info pull-right">保存</button>
                        </div>
                        <!-- /.box-footer -->
                    </form>
                </div>
                <!-- 账号信息 End -->
                <!-- 角色信息 Begin -->
                <div class="box box-info">
                    <div class="box-header with-border">
                        <h3 class="box-title">角色信息</h3>
                    </div>
                    <!-- /.box-header -->
                    <!-- form start -->
                    <form class="form-horizontal" ng-controller="userCtrl">
                        <div class="box-body">
                            {% for pField in Schemas_user.FormFields %} 
                            {% if loop %}<!-- {{ pField.Alias }} start -->{% endif %}
                            <div class="form-group">
                                <label for="input_user_{{ pField.Name }}" class="col-sm-2 control-label">{{ pField.Alias }}</label>
                                <div class="col-sm-10">
                                    <input type="text" name="{{ pField.Name }}" ng-model="{{ pField.Name }}" class="form-control" id="input_user_{{ pField.Name }}" placeholder="{{ pField.Placeholder }}">
                                </div>
                            </div>
                            {% if loop %}<!-- {{ pField.Alias }} end -->{% endif %} 
                            {% endfor %}                                                                                                                             
                        </div>
                        <!-- /.box-body -->
                        <div class="box-footer">
                            <button type="submit" class="btn btn-info pull-right">保存</button>
                        </div>
                        <!-- /.box-footer -->
                    </form>
                </div>
                <!-- 角色信息 End -->
            </div>
            <!--/.col (left) -->
            <!-- right column -->
            <div class="col-xs-6">
                <!-- 战场荣誉 Begin -->
                <div class="box box-info">
                    <div class="box-header with-border">
                        <h3 class="box-title">战场荣誉</h3>
                    </div>
                    <!-- /.box-header -->
                    <!-- form start -->
                    <form class="form-horizontal">
                        <div class="box-body">
                            <div class="form-group">
                                <label for="input_Honor" class="col-sm-2 control-label">荣誉</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control" id="input_Honor" placeholder="">
                                </div>
                            </div>                                                                                                      
                        </div>
                        <!-- /.box-body -->
                        <div class="box-footer">
                            <button type="submit" class="btn btn-info pull-right">保存</button>
                        </div>
                        <!-- /.box-footer -->
                    </form>
                </div>
                <!-- 战场荣誉 End -->
                <!-- 宝石经验 Begin -->
                <div class="box box-info">
                    <div class="box-header with-border">
                        <h3 class="box-title">宝石经验</h3>
                    </div>
                    <!-- /.box-header -->
                    <!-- form start -->
                    <form class="form-horizontal">
                        <div class="box-body">
                            <div class="form-group">
                                <label for="input_Precious" class="col-sm-2 control-label">经验</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control" id="input_Precious" placeholder="">
                                </div>
                            </div>                                                                                                      
                        </div>
                        <!-- /.box-body -->
                        <div class="box-footer">
                            <button type="submit" class="btn btn-info pull-right">保存</button>
                        </div>
                        <!-- /.box-footer -->
                    </form>
                </div>
                <!-- 宝石经验 End -->
                <!-- 星盘等级 Begin -->
                <div class="box box-info">
                    <div class="box-header with-border">
                        <h3 class="box-title">星盘等级</h3>
                    </div>
                    <!-- /.box-header -->
                    <!-- form start -->
                    <form class="form-horizontal" ng-controller="astrolabeCtrl">
                        <div class="box-body">
                            <div class="form-group">
                                <label for="input_StarLevel" class="col-sm-2 control-label">等级</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control" ng-model="level" id="input_StarLevel" placeholder="">
                                </div>
                            </div>               
                            <div class="form-group">
                                <label for="input_StarStone" class="col-sm-2 control-label">星灵石</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control" id="input_StarStone" placeholder="">
                                </div>
                            </div>                                                                                          
                        </div>
                        <!-- /.box-body -->
                        <div class="box-footer">
                            <button type="submit" class="btn btn-info pull-right">保存</button>
                        </div>
                        <!-- /.box-footer -->
                    </form>
                </div>
                <!-- 星盘等级 End -->
                <!-- 红星紫星 Begin -->
                <div class="box box-info">
                    <div class="box-header with-border">
                        <h3 class="box-title">红星紫星</h3>
                    </div>
                    <!-- /.box-header -->
                    <!-- form start -->
                    <form class="form-horizontal">
                        <div class="box-body">
                            <div class="form-group">
                                <label for="input_RedStar" class="col-sm-2 control-label">红星</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control" id="input_StarLevel" placeholder="">
                                </div>
                            </div>               
                            <div class="form-group">
                                <label for="input_VioletStar" class="col-sm-2 control-label">紫星</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control" id="input_VioletStar" placeholder="">
                                </div>
                            </div>                                                                                          
                        </div>
                        <!-- /.box-body -->
                        <div class="box-footer">
                            <button type="submit" class="btn btn-info pull-right">保存</button>
                        </div>
                        <!-- /.box-footer -->
                    </form>
                </div>
                <!-- 红星紫星 End -->        
                <!-- 影魂系统 Begin -->
                <div class="box box-info">
                    <div class="box-header with-border">
                        <h3 class="box-title">影魂系统</h3>
                    </div>
                    <!-- /.box-header -->
                    <!-- form start -->
                    <form class="form-horizontal">
                        <div class="box-body">
                            <div class="form-group">
                                <label for="input_BlueGhost" class="col-sm-2 control-label">蓝魂</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control" id="input_BlueGhost" placeholder="">
                                </div>
                            </div>               
                            <div class="form-group">
                                <label for="input_VioletGhost" class="col-sm-2 control-label">紫魂</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control" id="input_VioletGhost" placeholder="">
                                </div>
                            </div>                                                                                          
                        </div>
                        <!-- /.box-body -->
                        <div class="box-footer">
                            <button type="submit" class="btn btn-info pull-right">保存</button>
                        </div>
                        <!-- /.box-footer -->
                    </form>
                </div>
                <!-- 影魂系统 End -->             
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
<script src="../plugins/AdminLTE-2.3.0-dist/js/app.min.js"></script>
<!-- Angular 1.5.3 -->
<script src="../plugins/angular-1.5.3.min.js"></script>
<script src="../js/gm/actor.js"></script>
{% endblock %}