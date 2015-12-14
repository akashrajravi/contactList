var myApp=angular.module('myApp',[]);
myApp.controller('AppCtrl',['$scope','$http',
	function ($scope,$http){
		console.log("Hello world");
		$http.get('/contacts').success(function (response){
			$scope.contactlist=response;
		});
		$scope.addContact=function (){
			console.log($scope.contact);
		};
	}
]);