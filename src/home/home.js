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
    var getContent = document.getElementById('Content');
    // Display form when the button is clicked
    $scope.showForm = function(){

        if(getContent.style.display == 'none'){
            getContent.style.display = 'block';
            getContent.style.overflow = 'scroll';
            console.log('show form');
        }
        else{
            getContent.style.display = 'none';
            console.log('show form');
        }
    }


//Hide the client's name select option when client is not selected
	$scope.hideOptionalSelect = function(){
        $scope.byClient = "";
		if($scope.mainSelectOption != 'Client'){
		document.getElementById('optionSelect').style.visibility = 'hidden';
        $scope.byClient = "";}
        
		else{
			$scope.byClient = "by Client ";
			document.getElementById('optionSelect').style.visibility = 'visible';
		};
	}

    // JSON containing datas to be displayed in the graph
    $scope.timesheetLog =[
        {
            name: "Jason Smith",
            timeSheetStart: "23/07/18",
            timeSheetEnd: "07/08/18",
            host: "Shart Tank",
            agency: "Supernova",
            hoursSubmitted: 40,
            hoursnotSubmitted: {
                total: 30,
                stillOnTime: 10,
                overDue: 20
            }
        },
         {
            name: "Robert Langdon",
            timeSheetStart: "23/07/18",
            timeSheetEnd: "07/08/18",
            host: "Oxford",
            agency: "Supernova",
            hoursSubmitted: 50,
            hoursnotSubmitted: {
                total: 20,
                stillOnTime: 15,
                overDue: 5
            }
        }, {
            name: "Captain Clark",
            timeSheetStart: "23/07/18",
            timeSheetEnd: "07/08/18",
            host: "Skyjet",
            agency: "Supernova",
            hoursSubmitted: 56,
            hoursnotSubmitted: {
                total: 24,
                stillOnTime: 14,
                overDue: 10
            }
        }, {
            name: "Wayne Rooney",
            timeSheetStart: "23/07/18",
            timeSheetEnd: "07/08/18",
            host: "Shart Tank",
            agency: "Supernova",
            hoursSubmitted: 30,
            hoursnotSubmitted: {
                total: 24,
                stillOnTime: 2,
                overDue: 22
            }
        }
    ]


    //Sample Displayed Graph
	
	  $scope.fruits = {
	  	// labels data representated
                labels: ["Submitted","Not Yet Submitted"],
                labels1: [ "Submitted","Not Yet Submitted","Still on time", "OverDue"],
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
                    }],labels: $scope.fruits.labels

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
                        backgroundColor: $scope.fruits.color,
                        borderWidth: 0
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