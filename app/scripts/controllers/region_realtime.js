(function () {
'use strict';

/**
 * @ngdoc function
 * @name chopperApp.controller:RegionRealtimeCtrl
 * @description
 * # RegionRealtimeCtrl
 * Controller of the chopperApp
 */
angular.module('chopperApp')
  .controller('RegionRealtimeCtrl', RegionRealtimeCtrl);
  
  function RegionRealtimeCtrl(regionService, dateService, $interval, $scope) {
    var vm = this;

  	vm.clickNext = clickNext;
    vm.clickBack = clickBack;
    vm.clickNav = clickNav;
    activate();
    
     function activate() {

      vm.now = dateService.getNowStr();

      vm.query = { "type": 0, "name": "区域" };
      vm.queryTemp = [{ "type": 0, "name": "区域" }];

      // vm.query;
      // vm.queryTemp;

      getRegionRealTimeStore();
      autoRefrash();
    }

    function getRegionRealTimeStore() {
      return regionService
        .getRegionRealTimeStore(vm.query)
        .then(function(res) {
          filterRealTimeData(res || []);
        });
    }

    function getRegionRealTimeStoreBySection() {
      return regionService
        .getRegionRealTimeStoreBySection(vm.query)
        .then(function(res) {
          filterRealTimeData(res || []);
        });
    }

    function getRegionRealTimeStoreByCampus() {
      return regionService
        .getRegionRealTimeStoreByCampus(vm.query)
        .then(function(res) {
          filterRealTimeData(res || []);
        });
    }

 

    function filterRealTimeData(datas) {
      vm.realTimeData = datas.map(function(item) {
        if (item.regionName) {
          item.name = item.regionName;
          item.id = item.regionId;
        } else if (item.sectionName) {
          item.name = item.sectionName;
          item.id = item.sectionId;
        } else if (item.storeName) {
          item.name = item.storeName;
        }
        return item;
      });
    }

    function clickNext(item) {
      if (item.regionName) {
        vm.query = { "type": 1, "id": item.regionId, "name": item.regionName};
      } else if (item.sectionName) {
        vm.query = { "type": 2, "id": item.sectionId, "name": item.sectionName };
      } 
      if (!item.storeName) {
        vm.queryTemp.push(angular.copy(vm.query));
        queryData();
      }
      
    }

    function queryData() {
      if (vm.query.type === 0) {
        getRegionRealTimeStore();
      } else if (vm.query.type === 1) {
		getRegionRealTimeStoreBySection();
  	  } else if (vm.query.type === 2) {
      	getRegionRealTimeStoreByCampus();
      } else {
        return null;
      }
    }

    function clickBack() {
      if (vm.queryTemp.length >= 2) {
        vm.queryTemp.pop();
        vm.query = angular.copy(vm.queryTemp[vm.queryTemp.length - 1]);
      }
      queryData();
    }

    function clickNav(nav) {
      if (nav.type === 0) return;
      if (vm.queryTemp.length >= 2) {
        var index = findQueryObj(nav);
        vm.queryTemp.splice(index, vm.queryTemp.length - index);
        vm.query = angular.copy(vm.queryTemp[vm.queryTemp.length - 1]);
        queryData();
      }
    }

    function findQueryObj(nav) {
      for (var i = 0, len = vm.queryTemp.length; i < len; i++) {
        if (nav.id === vm.queryTemp[i].id) {
          return i;
        }
      }
    }


    function autoRefrash() {
      newInterval();
    }

    $scope.$on('$destroy', function() {
      // Make sure that the interval is destroyed too
      stopInterval();
    });


    function newMapTimer() {
      vm.mapTimer = $interval(function() {
        vm.now = dateService.getNowStr();
        queryData();
      }, 5000);    // 5秒刷新
    }

    function stopMapTimer() {
      $interval.cancel(vm.mapTimer);
      vm.mapTimer = undefined;
    }

    function newInterval() {
      newMapTimer();
    }

    function stopInterval() {
      stopMapTimer();
    }


  }
})();