var app = angular.module('birthApp', []);
app.controller('birthController', function($scope,$http){

  $scope.sendmail = function(birth){
    $http({
    	method : 'POST',
    	url : 'postbirth',
    	data : $scope.birth
    }).then(function success(response){
       alert('succesfull')
    }, function error(response){
       alert('please try again')
    });
  }

})