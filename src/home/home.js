'use strict';

angular.module('myApp.home', ['ngRoute'])

.config(['$routeProvider','$locationProvider', function($routeProvider,$locationProvider) {
	$locationProvider.hashPrefix('');
    $routeProvider.when('/home', {
    templateUrl: 'home/home.html',
    controller: 'homeController'
  });
}])

.controller('homeController', ['$scope','$http','$interval','$timeout',function($scope,$http,$interval,$timeout) {
	
//Hide the client's name select option when client is not selected
	$scope.hideOptionalSelect = function(){
		if($scope.mainSelectOption != 'Client'){
		document.getElementById('optionSelect').style.visibility = 'hidden';}
		else{
			console.log('client selected');
			document.getElementById('optionSelect').style.visibility = 'visible';
		}
	}
	$scope.byClient = "by Client ";
	  $scope.fruits = {
	  	// labels data representated
                labels: ["Mango", "Orange", "Peach"],
         // data values
                data: [20, 40, 55],
              // representational color
                color: ["#FEBD01", "#FF8C00", "#FFCBA6"]
            };
            var canvas1 = document.getElementById("canvas1").getContext('2d');
            var canvas2 = document.getElementById("canvas2").getContext('2d');

            var myChart = new Chart(canvas1, {
                type: 'doughnut',
                data: {
                    datasets: [{
                        data: $scope.fruits.data,
                        backgroundColor: $scope.fruits.color
                    }],
                    labels: $scope.fruits.labels
                },
                options: {
                    responsive: false
                }
            });
            var myChart = new Chart(canvas2, {
                type: 'doughnut',
                data: {
                    datasets: [{
                        data: $scope.fruits.data,
                        backgroundColor: $scope.fruits.color
                    }],
                    labels: $scope.fruits.labels
                },
                options: {
                    responsive: false
                }
            });
}]);