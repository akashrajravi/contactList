var myApp=angular.module('myApp',[]);
myApp.controller('AppCtrl',['$scope','$http',
	function ($scope,$http){
		console.log("Hello world");
		var refresh=function(){
			$http.get('/contacts').success(function (response){
				$scope.contactlist=response;
				$scope.contact="";
			});
		};
		refresh();
		$scope.addContact=function (){
			console.log($scope.contact);
			$http.post('/contacts',$scope.contact).success(function (response){
				console.log(response);
				refresh();
			});
		};
		$scope.removeContact=function (id){
			console.log(id);
			$http.delete('/contacts/'+id).success(function (response){
				refresh();
			});
		};
		$scope.editContact=function (id){
			console.log(id);
			$http.get('/contacts/'+id).success(function (response){
				$scope.contact=response;
			});
		};
		$scope.updateContact=function (){
			console.log($scope.contact);
			$http.put('/contacts/'+$scope.contact._id,$scope.contact).success(function (response){
				refresh();
			});
		};
		$scope.clear=function (){
			$scope.contact="";
		};
	}
]);