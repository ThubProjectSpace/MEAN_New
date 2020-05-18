var loginapp = angular.module('loginapp',[]);
loginapp.controller('loginController', function($scope,$http,$window){

  $scope.login = function(log){
	  $http({
	  	method : 'POST',
	  	url : '/postlogin',
	  	data : $scope.log
	  }).then(function success(response){
      //alert('Login successfull');
      window.location.href = '/home';
	  },function error(response){
      alert('error occured, please try again later');
      window.location.href = '/';
	  });
	}

});

loginapp.controller('signupController', function($scope,$http){
  $scope.signup = function(reg){
    $http({
    	method : 'POST',
    	url : '/postsignup',
    	data : $scope.reg
    }).then(function success(response){
    	alert('Account created succesfully');
    	$scope.reg = {};
    }, function error(response){
    	alert('error occured, please try again later');
    });
  }

});