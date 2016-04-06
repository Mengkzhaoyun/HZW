GetQueryString = function(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}

var sPID = GetQueryString("Id");
var hzwApp = angular.module('hzwApp', []);
hzwApp.controller('accountCtrl', function($scope, $http) {
    $http.get("../Rest/Tables/Account?filter=id=" + sPID)
        .then(function(response) {
            var pRow = response.data.rows[0];
            for (var sProp in pRow) {
                $scope[sProp] = pRow[sProp];
            }
        });
});

hzwApp.controller('userCtrl', function($scope, $http) {
    $http.get("../Rest/Tables/User?filter=pid=" + sPID)
        .then(function(response) {
            var pRow = response.data.rows[0];
            for (var sProp in pRow) {
                $scope[sProp] = pRow[sProp];
            }
            $http.get("../Rest/Tables/astrolabe?filter=uid=" + pRow.uid+" and ast_id=1")
                .then(function(astrolaberesponse) {
                    var pRow = astrolaberesponse.data.rows[0];
                    astrolabescope.level = pRow.level;
                });
        });
});

var astrolabescope;
hzwApp.controller('astrolabeCtrl', function($scope, $http) {
    astrolabescope = $scope;
});