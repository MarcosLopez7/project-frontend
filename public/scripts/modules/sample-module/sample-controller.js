define(['angular', './sample-module'], function(angular, sampleModule) {
    'use strict';
    return sampleModule.controller('SampleCtrl', ['$scope', '$http', function($scope, $http) {

        function consumeService($scope, $http) {
            $http({
                method: 'GET',
                url: 'https://monzalvos.run.aws-usw02-pr.ice.predix.io/canceled',
                headers: {}
            }).
            success(function (response) {

                var arr = [];
                Object.keys(response.cancelados).map(function (value, key) {
                    var tempObj = response.cancelados[key];
                    var temp = [parseInt(tempObj.engineSerial),parseInt(tempObj.tiempo)];
                    arr.push(temp);
                });

                $scope.tiempo = arr;
                $scope.data = response.cancelados;

            }).
            error(function (response) {
                console.log(response);
            });
        }

        consumeService($scope, $http);

    }]);
});
