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

                var tiempo = [];
                var serial = [];
                var color = [];
                var costoTotal = 0;

                Object.keys(response.cancelados).map(function (value, key) {
                    var tempObj = response.cancelados[key];
                    tiempo.push(parseInt(tempObj.tiempo));
                    serial.push(tempObj.engineSerial);
                    costoTotal += parseInt(response.cancelados[key].precio);
                    //var temp = [parseInt(tempObj.engineSerial),parseInt(tempObj.tiempo)];
                });
                for(var i = 0; i < tiempo.length;i++){
                    color.push('#'+Math.floor(Math.random()*16777215).toString(16));
                }
                $scope.color = color;
                $scope.tiempo = tiempo;
                $scope.serial = serial;
                $scope.data = response.cancelados;
                $scope.costo = costoTotal;

            }).
            error(function (response) {
                console.log(response);
            });
        }

        consumeService($scope, $http);

    }]);
});
