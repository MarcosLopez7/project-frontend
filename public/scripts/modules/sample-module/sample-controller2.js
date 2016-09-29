define(['angular', './sample-module'], function(angular, sampleModule) {
    'use strict';
    return sampleModule.controller('SampleCtrl2', ['$scope', '$http', function($scope, $http) {

        function consumeService($scope, $http, numero) {
            $http({
                method: 'GET',
                url: 'https://monzalvos.run.aws-usw02-pr.ice.predix.io/avion/' + numero,
                headers: {}
            }).
            success(function (response) {

                var arr = [];
                var min = 300, max = 0;
                Object.keys(response.temperaturas).map(function (value, key) {
                    var tempObj = parseInt(response.temperaturas[key].temp);
                    var temp = [key,tempObj];
                    if (tempObj < min) min = tempObj;
                    if (tempObj > max) max = tempObj;
                    arr.push(temp);
                });
                $scope.min = min;
                $scope.max = max;
                $scope.temperaturas = arr;
                $scope.data = response.temperaturas;

            }).
            error(function (response) {
                console.log(response);
            });
        }

        $scope.consumela = function (){
            consumeService($scope, $http, $scope.num);
        };
    }]);
});
