(function()
{
  "use strict";

  angular.module("app").controller("pageCtrl", function($scope, $http, SweetAlert) 
  {
    window.$scope = $scope;
    var URL = "http://localhost:3000";
    $scope.tasks = [];

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
      $http({
        method: 'POST',
        url: URL + '/priorities',
        // add remaining fields
        data: { 
          title: new_task.title, 
          description: new_task.description,
          category_id: new_task.category_id,
          priority_level: new_task.priority_level,
          address: new_task.address,
          completion_time: new_task.completion_time,
          date_time: new_task.date_time,
          pinned: new_task.pinned }
      }).then(function successCallback(response) {
          console.log(response);
          SweetAlert.swal("Saved changes!");
          $scope.getTasks(user_id);
          // $scope.refreshScope();
          // $scope.new_task = response.data;
        }, function errorCallback(response) {
          // called asynchronously if an error occurs
          // or server returns response with an error status.
        });
    }

    $scope.refreshScope = function(){
      if(!$scope.$$phase) {
        $scope.$apply();
      }
    }

    $scope.safeApply = function(fn) {
      var phase = this.$root.$$phase;
      if(phase == '$apply' || phase == '$digest') {
        if(fn && (typeof(fn) === 'function')) {
          fn();
        }
      } else {
        this.$apply(fn);
      }
    };

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
        $scope.safeApply(function(){
          // $scope.tasks = response.data
          $scope.tasks.length = 0;
          for (var i=0; i < response.data.length; i++){
            $scope.tasks.push(response.data[i]);
            console.log($scope.tasks);
          }
        });
        // $scope.refreshScope();
        console.log(response);
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