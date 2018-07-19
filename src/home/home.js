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
    $scope.invalidForm = "";//message returned when user submits invalid form

    // JSON containing datas to be displayed in the graph
    $scope.timesheetLog =[
        {
            name: "Jason Smith",
            timeSheetStart: "23/07/18",
            timeSheetEnd: "07/08/18",
            host: "Shark Tank",
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
        }, 

        {
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
        }, 
           
         {
            name: "Wayne Rooney",
            timeSheetStart: "23/07/18",
            timeSheetEnd: "07/08/18",
            host: "Shark Tank",
            agency: "Supernova",
            hoursSubmitted: 30,
            hoursnotSubmitted: {
                total: 24,
                stillOnTime: 2,
                overDue: 22
            }
        }
    ];

    //Empty the input field after form is submitted
    $scope.emptyInputField = function(){
        $scope.inputName = "";
        $scope.startTime = "";
        $scope.endTime = "";
        $scope.host = "";
        $scope.agency = "";
        $scope.submittedHours = "";
        $scope.notSubmittedHours = "";
        $scope.onTime = "";
        $scope.overDue = "";
    }

    var getContent = document.getElementById('Content');
    var getDisplayChart = document.getElementById('doughnutChart');
    var getSubmitOption = document.getElementById('submitOption');

    // Display form when the add timesheet button is clicked
    $scope.showForm = function(){
        $scope.invalidForm = "";
        if(getContent.style.display == 'none'){
            console.log('function entered');
            getContent.style.display = 'block';
            getContent.style.overflow = 'scroll';
            getDisplayChart.style.display = 'none';
            getSubmitOption.style.display = 'none';
        }
        else{
            console.log('display removed');
            getContent.style.display = 'none';
            getDisplayChart.style.display = 'block';
            getSubmitOption.style.display = 'inline-block';
        }
    };

    //Execute remove client function
    $scope.removeClient= function(i){
        //remove elements in i index in the array
        $scope.timesheetLog.splice(i,1);   
    }

    //Execute edit client function
    $scope.editClient = function(i){
        // assign the input values of respective client and open form
        console.log($scope.timesheetLog[i].timeSheetEnd);

        $scope.inputName = $scope.timesheetLog[i].name;
        $scope.host = $scope.timesheetLog[i].host;
        $scope.agency = $scope.timesheetLog[i].agency;
        $scope.submittedHours = $scope.timesheetLog[i].hoursSubmitted;
        $scope.notSubmittedHours = $scope.timesheetLog[i].hoursnotSubmitted.total;
        $scope.onTime = $scope.timesheetLog[i].hoursnotSubmitted.stillOnTime;
        $scope.overDue = $scope.timesheetLog[i].hoursnotSubmitted.overDue;
        $scope.showForm();
    }


//Hide the client's name select option when client is not selected
	$scope.hideOptionalSelect = function(){
        $scope.byClient = "";
		if($scope.mainSelectOption != 'Client'){
		document.getElementById('optionSelect').style.visibility = 'hidden';
        $scope.byClient = "";
        }
        
		else{
			$scope.byClient = "by Client ";
			document.getElementById('optionSelect').style.visibility = 'visible';
		};
	}

    
    // Process when the form is submitted

    $scope.formSubmitted = function(){
        console.log('form ready for submission');
        // First check if all the fields are filled

        if(!$scope.inputName || !$scope.startTime || !$scope.endTime ||
            !$scope.host || !$scope.submittedHours  || !$scope.notSubmittedHours ||
            !$scope.onTime  || !$scope.overDue  || !$scope.agency)
            {
                console.log('empty fields');
                $scope.invalidForm = "Please fill all the fields before submitting";
            }

        //Check if the client is already in the table, just update or add new client 
        else{
            // checking if the client is already in the system
            let i = 0;
            let userFound = false;
            while(i<$scope.timesheetLog.length)
            {
                if($scope.inputName.toLowerCase() == $scope.timesheetLog[i].name.toLowerCase()){
                    userFound = true;
                    break;
                }
                i++;
            }

            if(userFound){
                // i will be the index of array with user's old data, so update it
                $scope.timesheetLog[i]= {
                    name: $scope.inputName,
                    timeSheetStart: $scope.startTime,
                    timeSheetEnd: $scope.endTime,
                    host: $scope.host,
                    agency: $scope.agency,
                    hoursSubmitted: $scope.submittedHours,
                    hoursnotSubmitted: {
                        total: $scope.notSubmittedHours,
                        stillOnTime: $scope.onTime,
                        overDue: $scope.overDue

                    }
                };
            }

            // New Client
            else{ 
                 $scope.timesheetLog.push({
                    name: $scope.inputName,
                    timeSheetStart: $scope.startTime,
                    timeSheetEnd: $scope.endTime,
                    host: $scope.host,
                    agency: $scope.agency,
                    hoursSubmitted: $scope.submittedHours,
                    hoursnotSubmitted: {
                        total: $scope.notSubmittedHours,
                        stillOnTime: $scope.onTime,
                        overDue: $scope.overDue

                    }
                });
            }

            $scope.invalidForm = "";
            $scope.showForm(); //hide the form and show screen with graphs
            $scope.emptyInputField(); //empty all the assigned values in inputs
    }
}


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