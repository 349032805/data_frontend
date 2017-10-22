(function () {
  'use strict';

  /**
   * @ngdoc function
   * @name chopperApp.controller:StoreBusinessCtrl
   * @description
   * # StoreBusinessCtrl
   * Controller of the chopperApp
   */
  angular.module('chopperApp')
    .controller('StoreBusinessCtrl', StoreBusinessCtrl);

  function StoreBusinessCtrl(dateService, areaService, storeService, NgTableParams, $scope) {
    var vm = this;
    vm.openDatepicker = openDatepicker;
    vm.selectStart = selectStart;
    vm.selectEnd = selectEnd;
    vm.selectLineGroup = selectLineGroup;
    vm.onSearch = onSearch;
    vm.selectZones = areaService.selectZones;
    vm.selectCitys = areaService.selectCitys;
    vm.selectAreas = areaService.selectAreas;
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
      };
      // vm.now = new Date();
      vm.yesterday = dateService.getDaysFromNow(-1);
      
      vm.firstTable = {
        query:{
          start: vm.query.start,
          end: vm.query.end,
          page: 1,
          perPage: 10,
        }
      }
      vm.secondTable = {
        query:{
          start: vm.query.start,
          end: vm.query.end,
          page: 1,
          perPage: 10,
        }
      }

      areaService.initAreas(vm);

      vm.lineGroup = {
        first: {
          index: "averageOpenTime",             // 平均营业时长
          option: {}
        },
        second: {
          index: "averageOnShowSku", // 平均在架sku
          option: {}
        },
      };
      
      getStoreBusinessData();
      initTable("firstTable", getStoreBusinessDataByPage);
      initTable("secondTable", getStoreDataByPage);
    }

    function openDatepicker(index) {
      vm.datepicker[index].open = true;
    }

    function selectStart() {
      // if (vm.datepicker.start.model > vm.datepicker.end.model) {
        vm.datepicker.end.model = vm.datepicker.start.model;
      // }
      updateQueryDate();
    }

    function selectEnd() {
      updateQueryDate();
    }

    function updateQueryDate() {
      vm.query.start = dateService.toString(vm.datepicker.start.model);
      vm.query.end = dateService.toString(vm.datepicker.end.model);
    }

    function selectLineGroup(group, index) {
      vm.lineGroup[group].index = index;
      vm.lineGroup[group].option = storeService.getLineOption(vm.lineData, index);
    }

    function onSearch() {
      angular.extend(vm.firstTable.query, vm.query);
      angular.extend(vm.secondTable.query, vm.query);
      
      getStoreBusinessData();
      initTable("firstTable", getStoreBusinessDataByPage);
      initTable("secondTable", getStoreDataByPage);
    }
    
    function initTable(index, getDataFun) {
      vm[index].tableParams = new NgTableParams({
        page: vm[index].query.page, // show first page
        count: vm[index].query.perPage, // count per page
        sorting: { 'averageOnShowSku': "desc" }
      }, {
          getData: getDataFun
        });
    }
    
    function getOrderColumn(val) {
      return val === 'averageOnShowSku' ? 0
        : val === 'averageZeroStockSku' ? 1
          : val === 'averageOnShowBrandSku' ? 2
            : 0;
    }
    
    function getStoreBusinessData(params) {
      return storeService
        .getStoreBusinessData(vm.query)
        .then(function(res){
          vm.lineData = res.pictureData;
          vm.lineGroup.first.option = storeService.getLineOption(vm.lineData, vm.lineGroup.first.index);
          vm.lineGroup.second.option = storeService.getLineOption(vm.lineData, vm.lineGroup.second.index);
        }, function(res){
          console.log(res);
        });
    }
    
    function getStoreBusinessDataByPage($defer, params) {
      // var filter = params.filter();
      var sorting = params.sorting();
      var count = params.count();
      var page = params.page();

      var val = "";
      for (var key in sorting) {
        val = key;
      }
      vm.firstTable.query.orderColumn = getOrderColumn(val);
      vm.firstTable.query.orderDesc = sorting[val] === 'desc' ? 1 : 0;
      vm.firstTable.query.page = page;
      vm.firstTable.query.perPage = count;
      
      storeService
        .getStoreBusinessDataByPage(vm.firstTable.query)
        .then(function(res){
          vm.firstTable.data = res;
          params.total(vm.firstTable.data.count);
          $defer.resolve(vm.firstTable.data.list);
        }, function(res){
          console.log(res);
        });
    }
    
    function getStoreDataByPage($defer, params) {
      // var filter = params.filter();
      var sorting = params.sorting();
      var count = params.count();
      var page = params.page();

      var val = "";
      for (var key in sorting) {
        val = key;
      }
      vm.secondTable.query.orderColumn = getOrderColumn(val);
      vm.secondTable.query.orderDesc = sorting[val] === 'desc' ? 1 : 0;
      vm.secondTable.query.page = page;
      vm.secondTable.query.perPage = count;
      
      storeService
        .getStoreDataByPage(vm.secondTable.query)
        .then(function(res){
          vm.secondTable.data = res;
          params.total(vm.secondTable.data.count);
          $defer.resolve(vm.secondTable.data.list);
        }, function(res){
          console.log(res);
        });
    }
  }
})();