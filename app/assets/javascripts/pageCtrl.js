(function()
{
  "use strict";

  angular.module("app").controller("pageCtrl", function($scope, $http, SweetAlert) 
  {
    var URL = "http://localhost:3000"

    $scope.getDetails = function(id){
      $http({
        method: 'GET',
        url: URL + '/priorities/' + id + '.json'
      }).then(function successCallback(response) {
          // console.log(response)
          $scope.current_task = response.data;
        }, function errorCallback(response) {
          // called asynchronously if an error occurs
          // or server returns response with an error status.
        });
    }

    $scope.newTask = function(new_task, user_id){
      console.log(current_task.id)
      $http({
        method: 'POST',
        url: URL + '/priorities/',
        // add remaining fields
        data: { 
          title: current_task.title, 
          description: current_task.description,
          category_id: current_task.category_id,
          priority_level: current_task.priority_level,
          address: current_task.address,
          completion_time: current_task.completion_time,
          date_time: current_task.date_time,
          pinned: current_task.pinned }
      }).then(function successCallback(response) {
          SweetAlert.swal("Saved changes!")
          $scope.getTasks(user_id);
          // console.log(response)
          $scope.current_task = response.data
        }, function errorCallback(response) {
          // called asynchronously if an error occurs
          // or server returns response with an error status.
        });
    }

    $scope.saveEdits = function(current_task, user_id){
      console.log(current_task.id)
      $http({
        method: 'PATCH',
        url: URL + '/priorities/' + current_task.id,
        // add remaining fields
        data: { 
          title: current_task.title, 
          description: current_task.description,
          category_id: current_task.category_id,
          priority_level: current_task.priority_level,
          address: current_task.address,
          completion_time: current_task.completion_time,
          date_time: current_task.date_time,
          pinned: current_task.pinned }
      }).then(function successCallback(response) {
          SweetAlert.swal("Saved changes!")
          $scope.getTasks(user_id);
          // console.log(response)
          $scope.current_task = response.data
        }, function errorCallback(response) {
          // called asynchronously if an error occurs
          // or server returns response with an error status.
        });
    }

    $scope.getTasks = function(user_id){
      $http({
        method: 'GET',
        url: URL + '/priorities' + ".json" + "?user_id=" + user_id
      }).then(function successCallback(response) {
        $scope.tasks = response.data
        // console.log(response)
      }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
      });

    $scope.propertyName = 'title';
    $scope.reverse = true;

    $scope.sortBy = function(propertyName) {
      $scope.reverse = ($scope.propertyName === propertyName) ? !$scope.reverse : false;
      $scope.propertyName = propertyName;
    };

    }

  });
})();