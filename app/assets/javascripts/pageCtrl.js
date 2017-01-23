
  "use strict";

  angular.module("app").controller("pageCtrl", function($scope, $rootScope, $timeout, $http, SweetAlert) 
  {
    // window.vm = vm;
    var vm = this;
    window.vm = vm;
    var URL = "http://localhost:3000";
    vm.tasks = [];

    vm.initFunc = function(id) {
      vm.getTasks(id);
    }

    vm.getDetails = function(id){
      $http({
        method: 'GET',
        url: URL + '/priorities/' + id + '.json'
      }).then(function successCallback(response) {
          // console.log(response)
          vm.current_task = response.data;
        }, function errorCallback(response) {
          // called asynchronously if an error occurs
          // or server returns response with an error status.
        });
    }

    vm.newTask = function(new_task, user_id){
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
          // vm.tasks.push(response.data);
          // vm.getTasks(user_id);
          SweetAlert.swal("Saved changes!");
          location.reload();
          // console.log("new task created")
        }, function errorCallback(response) {
          // called asynchronously if an error occurs
          // or server returns response with an error status.
        });
    }

    vm.refreshScope = function(){
      $timeout(function(){
        vm.safeApply();
      })
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

    vm.saveEdits = function(current_task, user_id){
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
          vm.getTasks(user_id);
          vm.current_task = response.data
        }, function errorCallback(response) {
          // called asynchronously if an error occurs
          // or server returns response with an error status.
        });
    }

    vm.getTasks = function(user_id){
      $http({
        method: 'GET',
        url: URL + '/priorities' + ".json" + "?user_id=" + user_id
      }).then(function successCallback(response) {
          // vm.tasks = response.data
          $scope.safeApply(function() {
            vm.tasks = response.data;
            console.log
          });
        console.log(response);
      }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
      });

    vm.propertyName = 'title';
    vm.reverse = true;

    vm.sortBy = function(propertyName) {
      vm.reverse = (vm.propertyName === propertyName) ? !vm.reverse : false;
      vm.propertyName = propertyName;
    };

    }

  });