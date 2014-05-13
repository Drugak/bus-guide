/**
 * Created by vitaliydrugak on 11.04.14.
 */
var busRoutApp = angular.module('busRoutApp', []);

busRoutApp.controller('busRoutController', function ($scope, $http){
    $http.get('data/route.json').success(function(data){
        $scope.buses = data;
        console.log($scope.buses);
    });
});
