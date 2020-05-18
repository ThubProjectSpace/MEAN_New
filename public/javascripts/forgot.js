var app = angular.module('forgotApp',[]);
app.controller('forgotController', function($scope,$http){
  

  $scope.mail = function(forgot){
    $http({
    	method : 'POST',
        url : '/postemail',
        data : $scope.forgot
    }).then(function success(response){
    	alert('Email Sent');
    }, function error(response){
        alert('Error');
    });
  }

});