'use strict';

angular.module('myApp.form', ['ngRoute'])

.config(['$routeProvider','$locationProvider', function($routeProvider,$locationProvider) {
	$locationProvider.hashPrefix(''); //to remove ! sign in the URL
  $routeProvider.when('/form', {
    templateUrl: 'forms/form.html',
    controller: 'formController'
  });
}])

.controller('formController', ['$scope','$http','$interval',function($scope,$http,$interval) {
	

	}]);