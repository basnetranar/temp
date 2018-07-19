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
	
    $scope.byClient = ""; //To change the heading based on selected option

//Hide the client's name select option when client is not selected
	$scope.hideOptionalSelect = function(){
        $scope.byClient = "";
		if($scope.mainSelectOption != 'Client'){
		document.getElementById('optionSelect').style.visibility = 'hidden';
        $scope.byClient = "";}
        
		else{
			$scope.byClient = "by Client ";
			document.getElementById('optionSelect').style.visibility = 'visible';
		}
	}

    //Sample Displayed Graph
	
	  $scope.fruits = {
	  	// labels data representated
                labels: ["Submitted","Not Yet Submitted"],
                labels1: [ "Submitted","Still on time", "OverDue"],
         // data values
                data: [60, 40],
                data1: [60, 20, 20],
              // representational color
                color: [ "#41bd3d" ,"#c1c1c3"],
                color1: ["#41bd3d", "#145bf5", "#f71302"]
            };
            var canvas1 = document.getElementById("canvas1").getContext('2d');
            var canvas2 = document.getElementById("canvas2").getContext('2d');

            var myChart = new Chart(canvas1, {
                type: 'doughnut',
                data: {
                    datasets: [{
                        data: $scope.fruits.data,
                        backgroundColor: $scope.fruits.color,
                        borderWidth: 0,
                    
                    labels: $scope.fruits.labels
                    },

                    {
                        data: $scope.fruits.data1,
                        backgroundColor: $scope.fruits.color1,
                        borderWidth: 0,
                    labels: $scope.fruits.labels1
                    }]

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
                    responsive: true
                }
            });



        // Features included in the chart 1
        // Not Yet Submitted , Submitted, 
        //Second diagram included  Still on Time, Overdue, Submitted

        //Featuers included in chart 2
        // Ready to Submit , All submitted 
}]);