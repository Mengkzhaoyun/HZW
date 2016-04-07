GetQueryString = function(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}

var sPID = GetQueryString("Id");
var hzwApp = angular.module('hzwApp', []);
hzwApp.controller('hzwCtrl', function($scope, $http) {
    $http.get("../Rest/Tables/AccountInfo?filter=id=" + sPID)
        .then(function(response) {
            var pRow = response.data.rows[0];
            for (var sProp in pRow) {
                $scope[sProp] = pRow[sProp];
            }
        });
    $scope.click = function() {
        if ($scope.hzw_left.hzw_money.$dirty) {
            var pAccount = {
                "id": $scope.id,
                "money": $scope.money
            }
            //save
        }
        if ($scope.hzw_left.hzw_vip.$dirty ||
            $scope.hzw_left.hzw_belly.$dirty ||
            $scope.hzw_left.hzw_gold.$dirty ||
            $scope.hzw_left.hzw_prestige.$dirty ||
            $scope.hzw_left.hzw_experience.$dirty ||
            $scope.hzw_left.hzw_execution.$dirty) {
            var pUser = {"uid": $scope.uid};
            if($scope.hzw_left.hzw_vip.$dirty){
                pUser.vip = $scope.vip;
            }
            if($scope.hzw_left.hzw_belly.$dirty){
                pUser.belly = $scope.belly;
            }
            if($scope.hzw_left.hzw_gold.$dirty){
                pUser.gold = $scope.gold;
            }
            if($scope.hzw_left.hzw_prestige.$dirty){
                pUser.prestige = $scope.prestige;
            }
            if($scope.hzw_left.hzw_experience.$dirty){
                pUser.experience = $scope.experience;
            }
            if($scope.hzw_left.hzw_execution.$dirty){
                pUser.execution = $scope.execution;
            }
            //save
        }
    }
    $scope.click_adv = function() {

    }
});