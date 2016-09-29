/**
 * Created by predix on 9/29/16.
 */
define(['angular', './sample-module'], function(angular, sampleModule) {
    'use strict';
    return sampleModule.controller('Ctrl3', ['$scope', '$http', function($scope, $http) {

        $scope.cargado = false;

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
                $scope.acumulado = response.acumulado;
                $scope.num_vuelos = response.temperaturas.length;
                getRuta($scope, $http, $scope.ruta);
            }).
            error(function (response) {
                console.log(response);
            });
        }

        function getRuta($scope, $http, numero) {
            $http({
                method: 'GET',
                url: 'https://monzalvos.run.aws-usw02-pr.ice.predix.io/promedio/' + numero,
                headers: {}
            }).success(function (response) {
                $scope.prom_temp = Math.round(response.promedio);
                getResto($scope, $http);
            }).error(function (response) {
                console.log(response);
            });

        }

        function getResto($scope, $http) {
            $http({
                method: 'GET',
                url: 'https://monzalvos.run.aws-usw02-pr.ice.predix.io/minimum',
                headers: {}
            }).success(function (response) {
                if ($scope.prom_temp > 0) {
                    $scope.rutas_rest = Math.floor((parseInt(response.tiempo) - $scope.acumulado) / $scope.prom_temp);
                    getReparacion($scope, $http, $scope.ruta);
                } else {
                    $scope.rutas_rest = "No hay registros de desgaste en esta ruta";
                }
            }).error(function (response) {
                console.log(response);
            });
        }

        function getReparacion($scope, $http, numero) {
            $http({
                method: 'GET',
                url: 'https://monzalvos.run.aws-usw02-pr.ice.predix.io/ruta/' + numero,
                headers: {}
            }).success(function (response) {
                $scope.lugar = response.minimo.ciudad;
                $scope.costo = response.minimo.precio;
                $scope.vuelos_rest = $scope.rutas_rest * response.ciudades.length;
                $scope.cargado = true;
            }).error(function (response) {
                console.log(response);
            });
        }

        $scope.consumela = function (){
            consumeService($scope, $http, $scope.num);
        };
    }]);
});
