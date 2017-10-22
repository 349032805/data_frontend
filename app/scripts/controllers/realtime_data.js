(function() {
  'use strict';

  /**
   * @ngdoc function
   * @name chopperApp.controller:RealtimeDataCtrl
   * @description
   * # RealtimeDataCtrl
   * Controller of the chopperApp
   */
  angular.module('chopperApp')
    .controller('RealtimeDataCtrl', RealtimeDataCtrl);

  function RealtimeDataCtrl(realtimeService, dateService, $interval, $scope, NgTableParams) {
    var vm = this;
    vm.selectMap = selectMap;
    // vm.onRefrash = onRefrash;
    vm.clickNext = clickNext;
    vm.clickBack = clickBack;
    vm.clickNav = clickNav;
    vm.orderBy =  orderBy;
    activate();

    function activate() {
      vm.map = {
        index: "sumSalesVolume",
        option: {}
      };
      vm.lineGroup = {
        index: "salesVolume",
        option: {}
      }
      vm.now = dateService.getNowStr();

      vm.query = { "type": 0, "name": "全国" };
      vm.queryTemp = [{ "type": 0, "name": "全国" }];

      getRealTimeProvData();
      getRealTimeStore();
      autoRefrash();
    }

    function selectMap(index) {
      vm.map.index = index;
      sortProvData();
      vm.map.option = realtimeService.getChinaMapOption(vm.provData, vm.map.index);
    }

    function getRealTimeProvData() {
      return realtimeService
        .getRealTimeProvData()
        .then(function(res) {
          vm.provData = res || [];
          sortProvData();
          parseRectData(vm.provData);
          vm.map.option = realtimeService.getChinaMapOption(vm.provData, vm.map.index);
        });
    }

    function getRealTimeStore() {
      return realtimeService
        .getRealTimeStore(vm.query)
        .then(function(res) {
          filterRealTimeData(res || []);
        });
    }

    function getReatimeStoreByMiniSupplier() {
      return realtimeService
        .getReatimeStoreByMiniSupplier(vm.query)
        .then(function(res) {
          filterRealTimeData(res || []);
        });
    }

    function getReatimeStoreByMiniSection() {
      return realtimeService
        .getReatimeStoreByMiniSection(vm.query)
        .then(function(res) {
          filterRealTimeData(res || []);
        });
    }

    function getReatimeStoreByStore() {
      return realtimeService
        .getReatimeStoreByStore(vm.query)
        .then(function(res) {
          filterRealTimeData(res || []);
        });
    }

    function filterRealTimeData(datas) {
      vm.realTimeData = datas.map(function(item) {
        if (item.zoneName) {
          item.name = item.zoneName;
          item.id = item.zoneId;
        } else if (item.cityName) {
          item.name = item.cityName;
          item.id = item.cityId;
        } else if (item.miniSupplierName) {
          item.name = item.miniSupplierName;
          item.id = item.miniSupplierId;
        } else if (item.sectionName) {
          item.name = item.sectionName;
          item.id = item.sectionId;
        } else if (item.storeName) {
          item.name = item.storeName;
          item.id = item.storeId;
        }
        return item;
      });
    }
    vm.orderByParams = '-orderNum';

    function clickNext(item) {
      if (item.zoneName) {
        vm.query = { "type": 1, "id": item.zoneId, "name": item.zoneName };
      } else if (item.cityName) {
        vm.query = { "type": 2, "id": item.cityId, "name": item.cityName };
      } else if (item.miniSupplierName) {
        vm.query = { "type": 3, "id": item.miniSupplierId, "name": item.miniSupplierName };
      } else if (item.sectionName) {
        vm.query = { "type": 4, "id": item.sectionId, "name": item.sectionName };
      } 
      // else if (item.storeName) {
      //   vm.query = { "type": 5, "id": item.storeId, "name": item.storeName };
      // }
      if (!item.storeName) {
        vm.queryTemp.push(angular.copy(vm.query));
        queryData();
      }
    }

    function queryData() {
      if (vm.query.type === 0 || vm.query.type === 1) {
        getRealTimeStore();
      } else if (vm.query.type === 2) {
        getReatimeStoreByMiniSupplier();
      } else if (vm.query.type === 3) {
        getReatimeStoreByMiniSection();
      } else if (vm.query.type === 4) {
        getReatimeStoreByStore();
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

    function sortProvData() {
      vm.provData.sort(function(a, b) {
        return b[vm.map.index] - a[vm.map.index];
      })
    }

    function parseRectData(provData) {
      var o = {
        sumSalesVolume: 0,
        sales: 0
      }
      for (var i = 0, len = provData.length; i < len; i++) {
        var item = provData[i];
        o.sumSalesVolume += item.sumSalesVolume;
        o.sales += item.sales;
      }
      vm.rectData = [
        //标题、数额
        { thead: '用户订单数', num: o.sumSalesVolume, tbHide: true, hbHide: true },
        { thead: '用户订单金额', num: o.sales.toFixed(2), tbHide: true, hbHide: true }
      ];
    }

    // function onRefrash() {
    //   vm.refrashIsAble = !vm.refrashIsAble;
    //   vm.refrashIsAble ? newInterval() : stopInterval();
    // }

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
        getRealTimeProvData();
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

    function orderBy(params) {
      vm.orderByParams = vm.orderByParams.indexOf('-') === 0 ? params : '-'+params;
    }

  }
})();