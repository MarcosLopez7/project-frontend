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

                $scope.serial = response.engine_serial;
                $scope.ruta = response.ruta;
                var arr = [];
                var acumulado = 0;

                for (var i = 0; i < response.temperaturas.length; i++) {
                    if (parseInt(response.temperaturas[i].temp) >= 263) {
                        acumulado += parseInt(response.temperaturas[i].tiempo);
                    }

                    arr.push([i + 1, acumulado]);
                }
                var max = parseInt(arr[arr.length-1][1]);
                console.log(max);
                $scope.max = max;
                $scope.min = 1;
                $scope.data = arr;

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
