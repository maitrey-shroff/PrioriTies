
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
      vm.initMap();
    }

    vm.initFuncHigh = function(id) {
      vm.getTasksHighPriority(id);
      vm.initMap();
    }

    vm.getDetails = function(id){
      $http({
        method: 'GET',
        url: URL + '/priorities/' + id + '.json'
      }).then(function successCallback(response) {
          // console.log(response)
          vm.current_task = response.data;
          vm.initMap(vm.current_task.latitude, vm.current_task.longitude);
          vm.getUber();
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
          // date_time: new_task.date_time,
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

    vm.saveEdits = function(current_task, user_id, date_time){
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
            for (var i=0; i<response.data.length; i++){
              if (response.data[i].status === false){
                vm.tasks.push(response.data[i]);
                console.log(vm.tasks);
              }
            }            
            // vm.tasks = response.data;
            // console.log
          });
        // console.log(response);
      }, function errorCallback(response) {
        // called asynchronously if an error occurshome
        // or server returns response with an error status.
      });

    vm.propertyName = 'priority_level';
    vm.reverse = false;
    }

    vm.sortBy = function(propertyName) {
      vm.reverse = (vm.propertyName === propertyName) ? !vm.reverse : false;
      vm.propertyName = propertyName;
    };

    vm.initMap = function(latitude, longitude) {
      // console.log(latitude, longitude);
      var uluru = {lat: latitude, lng: longitude};
      var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 17,
        center: uluru
      });
      google.maps.event.addListenerOnce(map, 'idle', function() {
        var currentCenter = map.getCenter();  // Get current center before resizing
        google.maps.event.trigger(map, "resize");
        map.setCenter(currentCenter); // Re-set previous center
      });
      var marker = new google.maps.Marker({
        position: uluru,
        map: map
      });
    }

    // vm.getUber = function(){
    //   $http({
    //     method: 'GET',
    //     url: "https://sandbox-api.uber.com/v1.2/estimates/price?start_latitude=37.7752315&start_longitude=-122.418075&end_latitude=37.7752415&end_longitude=-122.518075",
    //     headers: {Authorization: 'Token 67_jQQSZpcnizLPqCQW9RurBEdpx9WgMn6KPw_g-'}
    //   }).then(function successCallback(response) {
    //     console.log(response.data);
    //   }, function errorCallback(response) {
    //     // called asynchronously if an error occurs
    //     // or server returns response with an error status.
    //   });

    // vm.propertyName = 'title';
    // vm.reverse = true;
    // }

    vm.getClass = function(priority_level){
      if (priority_level === 1){
        return "danger";
      } else if (priority_level === 2){
        return "warning";
      } else if (priority_level === 3){
        return "info";
      } else if (priority_level === 4){
        return "success";
      } else {
        return "active";
      }
    };

    vm.getHighPriorityTasks = function(user_id, priority_level){
      $http({
        method: 'GET',
        url: URL + '/priorities' + ".json" + "?user_id=" + user_id
      }).then(function successCallback(response) {
          // vm.tasks = response.data
          $scope.safeApply(function() {
            for (var i=0; i<response.data.length; i++){
              if (response.data[i].priority_level === priority_level){
                vm.tasks.push(response.data[i]);
                console.log(vm.tasks);
              }
            }
            // vm.tasks = response.data;
            // console.log
          });
        // console.log(response);
      }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
      });

    vm.propertyName = 'priority_level';
    vm.reverse = false;
    }



  });