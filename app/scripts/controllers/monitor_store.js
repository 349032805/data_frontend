(function(){
'use strict';

/**
 * @ngdoc function
 * @name chopperApp.controller:MonitorStoreCtrl
 * @description
 * # MonitorStoreCtrl
 * Controller of the chopperApp
 */
angular.module('chopperApp')
  .controller('MonitorStoreCtrl', MonitorStoreCtrl);
  
  function MonitorStoreCtrl(monitorService, dateService, NgTableParams, areaService, dataService, authService, notifyService) {
    var vm = this;
    vm.openDatepicker = openDatepicker;
    vm.selectStart = selectStart;
    vm.selectEnd = selectEnd;
    vm.selectPlatform = selectPlatform;
    vm.onSearch = onSearch;
    vm.selectZones = areaService.selectZones;
    vm.selectCitys = areaService.selectCitys;
    vm.selectAreas = areaService.selectAreas;
    vm.exportPerUvOrders = exportPerUvOrders;
    activate();
    
    function activate() {
      vm.datepicker = {
        start: {
          open: false,
          model: dateService.getDaysFromNow(-7),
        },
        end: {
          open: false,
          model: dateService.getDaysFromNow(-1),
        },
      };
      vm.query = {
        start: dateService.toString(vm.datepicker.start.model),
        end: dateService.toString(vm.datepicker.end.model),
        page: 1,
        perPage: 10
        // source: 2
      };
      vm.yesterday = dateService.getDaysFromNow(-1);
      areaService.initAreas(vm);
      
      vm.perUv = {
        platform: "zm-web-1.0.0",
        option: {}
      };
      
      onSearch();
      
    }
    
    function openDatepicker(index) {
      vm.datepicker[index].open = true;
    }

    function selectStart() {
      vm.datepicker.end.model = vm.datepicker.start.model;
      updateQueryDate();
    }

    function selectEnd() {
      updateQueryDate();
    }

    function updateQueryDate() {
      vm.query.start = dateService.toString(vm.datepicker.start.model);
      vm.query.end = dateService.toString(vm.datepicker.end.model);
    }
    
    function selectPlatform(platform) {
      // if (vm.perUv.platform !== platform) {
      //   vm.perUv.platform = platform;
      //   vm.query.source = getPlatformType(platform);
      //   getSupervisionUvRate();
      // }
      vm.perUv.option = monitorService.getPerUvOption(vm.uvRate, vm.perUv.platform);
    }
    
    function getPlatformType(platform) {
      return platform === 'zm-android' ? 0
           : platform === 'zm-ios' ? 1
           : platform === 'zm-web' ? 2
           : platform;
    }
    
    function onSearch() {
      getSupervisionUvRate();
      initTable();
    }
    
    function getSupervisionUvRate() {
      return monitorService
        .getSupervisionUvRate(vm.query)
        .then(function(res){
          vm.uvRate = res || [];
          if (vm.uvRate.length === 0) {
            notifyService.success("没有数据");
            vm.perUv.option = {};
          } else {
            filterPlatform(vm.uvRate);
            vm.perUv.option = monitorService.getPerUvOption(vm.uvRate, vm.perUv.platform);
          }
        });
    }
    
    function filterPlatform(uvRate) {
      var platforms = [];
      for(var i = 0, len = uvRate[0].list.length; i < len; i++) {
        var item = uvRate[0].list[i];
        platforms.indexOf(item.source) < 0 ? platforms.push(item.source) : null;
      }
      vm.platforms = platforms;
      vm.perUv.platform = platforms[0];
    }
    
    function getOrderColumn(val) {
      return val === 'dt' ? 0
        : val === 'orderQuantity' ? 1
          : val === 'uv' ? 2
          : val === 'rate' ? 3
              : 0;
    }
    
    function getSupervisionUv($defer, params) {
      var sorting = params.sorting();
      var count = params.count();
      var page = params.page();

      var val = "";
      for (var key in sorting) {
        val = key;
      }
      vm.query.orderColumn = getOrderColumn(val);
      vm.query.orderDesc = sorting[val] === 'desc' ? 1 : 0;
      vm.query.page = page;
      vm.query.perPage = count;
      
      monitorService
        .getSupervisionUv(vm.query)
        .then(function(res){
          vm.tableData = res;
          params.total(vm.tableData.count);
          $defer.resolve(vm.tableData.list || []);
        })
    }
    
    function initTable() {
      vm.tableParams = new NgTableParams({
        page: vm.query.page, // show first page
        count: vm.query.perPage, // count per page
        sorting: { 'rate': "desc" }
      }, {
          getData: getSupervisionUv
        });
    }
    
    function exportPerUvOrders() {
      var url = dataService.baseUrl + "/supervision_uv/export?token=" + authService.getAccessToken() + getQueryStr(); 
      window.open(url);
    }
    
    function getQueryStr() {
      var ret = "";
      for(var key in vm.query) {
        ret += "&" + key + "=" + vm.query[key];
      }
      return ret;
    }
    
  }
})();