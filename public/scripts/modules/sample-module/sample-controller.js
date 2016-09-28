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

                $scope.data = response.cancelados;

            }).
            error(function (response) {
                console.log(response);
            });
        }

        consumeService($scope, $http);

    }]);
});
