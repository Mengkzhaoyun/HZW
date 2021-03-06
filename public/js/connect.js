var hzwApp = angular.module('hzwApp', []);
hzwApp.controller('hzwCtrl', function($scope, $http) {
  $scope.hzw_busy = true;
  $http.get("../Rest/Conn")
    .then(function(response) {
      $scope.hzw_busy = false;
      var pRow = response.data;
      for (var sProp in pRow) {
        $scope[sProp] = pRow[sProp];
      }
    });
  $scope.click = function() {
    $scope.hzw_left_count = 0;
    if ($scope.hzw_left.money.$dirty) {
      var pAccount = {
        "id": $scope.id,
        "money": $scope.money
      }
      $scope.hzw_left_count++;
      $scope.hzw_left_busy = true;
      //save
      $http({
        url: '../Rest/Tables/Account',
        method: 'PUT',
        data: [pAccount]
      }).success(function(data, header, config, status) {
        //响应成功
        $scope.hzw_left_count--;
        if ($scope.hzw_left_count == 0) $scope.hzw_left_busy = false;
      }).error(function(data, header, config, status) {
        //处理响应失败
        $scope.hzw_left_count--;
        if ($scope.hzw_left_count == 0) $scope.hzw_left_busy = false;
      });
    }
    if ($scope.hzw_left.vip.$dirty ||
      $scope.hzw_left.belly.$dirty ||
      $scope.hzw_left.gold.$dirty ||
      $scope.hzw_left.prestige.$dirty ||
      $scope.hzw_left.experience.$dirty ||
      $scope.hzw_left.execution.$dirty) {
      var pUser = { "uid": $scope.uid };
      if ($scope.hzw_left.vip.$dirty) {
        pUser.vip = $scope.vip;
      }
      if ($scope.hzw_left.belly.$dirty) {
        pUser.belly = $scope.belly;
      }
      if ($scope.hzw_left.gold.$dirty) {
        pUser.gold = $scope.gold;
      }
      if ($scope.hzw_left.prestige.$dirty) {
        pUser.prestige = $scope.prestige;
      }
      if ($scope.hzw_left.experience.$dirty) {
        pUser.experience = $scope.experience;
      }
      if ($scope.hzw_left.execution.$dirty) {
        pUser.execution = $scope.execution;
      }
      $scope.hzw_left_count++;
      $scope.hzw_left_busy = true;
      //save
      $http({
        url: '../Rest/Tables/User',
        method: 'PUT',
        data: [pUser]
      }).success(function(data, header, config, status) {
        //响应成功
        $scope.hzw_left_count--;
        if ($scope.hzw_left_count == 0) $scope.hzw_left_busy = false;
      }).error(function(data, header, config, status) {
        //处理响应失败
        $scope.hzw_left_count--;
        if ($scope.hzw_left_count == 0) $scope.hzw_left_busy = false;
      });
    }
  }
});