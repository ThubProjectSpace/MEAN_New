var app = angular.module('myapp',[]);
app.controller('myController', function($scope,$http){

  $http({
    method : 'GET',
    url : '/getuser'
  }).then(function success(response){
    //console.log(response.data);
    $scope.user = response.data;
  },function error(response){
    alert('Error occured');
  })

  $scope.save = function(users){
    console.log($scope.users)
    $http({
      method : 'POST',
      url : '/postuser',
      data : $scope.users
    }).then(function success(response){
      //alert('inserted successfully');
      $scope.user.push(response.data)
      $scope.users = {}
    }, function error(response){
      alert('error occured, please try again!')
    })
  }

  $scope.removeUser = function(users){
    $http({
      method : 'DELETE',
      url : '/deleteuser'+users._id
    }).then(function success(response){
      var index = $scope.user.indexOf(users);
      $scope.user.splice(index,1);
      //alert('removed successfully');
    }, function error(response){
      alert('error occured, please try again');
    })
  }

  $scope.updateUser = function(users){
    $http({
      method : 'PUT',
      url : '/updateuser'+users._id,
      data : users
    }).then(function success(response){
      alert('updated successfully')
    }, function error(response){
      alert('Error occured');
    });
  }

})