(function () {
  'use strict';

  /**
   * @ngdoc function
   * @name chopperApp.controller:ActiveStoreCtrl
   * @description
   * # ActiveStoreCtrl
   * Controller of the chopperApp
   */
  angular.module('chopperApp')
    .controller('ActiveStoreCtrl', ActiveStoreCtrl);

  function ActiveStoreCtrl(activeStoreService, dateService, areaService, NgTableParams, $scope, notifyService, authService,dataService) {
    var vm = this;
    
    vm.isMiniSupplier = true;
    initMiniSupplierInfo();

    vm.onSearch = onSearch;

    vm.selectZones = areaService.selectZones;
    vm.selectCitys = areaService.selectCitys;
    vm.selectAreas = areaService.selectAreas;
    vm.backToStoreInfoFromMiniSupplier = backToStoreInfoFromMiniSupplier;

    vm.selectLastWeek = selectLastWeek;
    vm.selectLastTwoWeek = selectLastTwoWeek;
    vm.selectLastFourWeek = selectLastFourWeek;
    vm.showDetails = showDetails;
    vm.selectLineGroup = selectLineGroup;
    // vm.exportCsv = exportCsv;
    vm.exportActiveStore = exportActiveStore;
    activate();

    function activate() {
      vm.query = {};

      vm.lineGroup = {
        first: {
          index: "coveredStoreNum",
          option: {}
        }
      };

      vm.selectedWeek = 'lastWeek';

      areaService.initAreas(vm);
      vm.activeStoreNum = 0;

      onSearch();
    }

    function selectLastWeek() {
      if (vm.selectedWeek === 'lastWeek') {
        return;
      }
      vm.selectedWeek = 'lastWeek';
      getActiveStoreOverallForMiniSupplierByLastWeek();
      getActiveStoreInfoFromMiniSupplierByLastWeek();
    }

    function selectLastTwoWeek() {
      if (vm.selectedWeek === 'lastTwoWeek') {
        return;
      }
      vm.selectedWeek = 'lastTwoWeek'
      getActiveStoreOverallForMiniSupplierByLastTwoWeek();
      getActiveStoreInfoFromMiniSupplierByLastTwoWeek();
    }

    function selectLastFourWeek() {
      if (vm.selectedWeek === 'lastFourWeek') {
        return;
      }
      vm.selectedWeek = 'lastFourWeek'
      getActiveStoreOverallForMiniSupplierByLastFourWeek();
      getActiveStoreInfoFromMiniSupplierByLastFourWeek();
    }

    function showDetails(row) {
      vm.activeStoreNum = row.activeStoreNum;
      switch (vm.selectedWeek)
      {
        case 'lastWeek':
          getActiveStoreDetailsFromMiniSupplierByLastWeek(row.miniSupplierId);
          break;
        case 'lastTwoWeek':
          getActiveStoreDetailsFromMiniSupplierByLastTwoWeek(row.miniSupplierId);
          break;
        case 'lastFourWeek':
          getActiveStoreDetailsFromMiniSupplierByLastFourWeek(row.miniSupplierId);
          break;
      }
    }

    function initMiniSupplierInfo() {
      vm.showStoreInfoFromMiniSupplier = true;
      vm.showStoreDetailsFromMiniSupplier = false;
    }

    function initMiniSupplierDetails() {
      vm.showStoreInfoFromMiniSupplier = false;
      vm.showStoreDetailsFromMiniSupplier = true;
    }

    function initRegionDetails() {
      vm.showStoreInfoFromRegion = false;
      vm.showStoreDetailsFromRegion = true;
    }

    function initTable(dataArr) {
      vm.tableParams = new NgTableParams({
        page: 1, // show first page
        count: 10, // count per page
        sorting: { 'activeStoreNum': "desc" }
      }, {
          dataset: dataArr
        });
    }
    
    function initDetailTable(dataArr) {
      vm.detailParams = new NgTableParams({
        page: 1, // show first page
        count: 10, // count per page
        sorting: { 'saleQuantity': "desc" }
      }, {
          dataset: dataArr
        });
    }

    function getActiveStoreInfoFromMiniSupplierByLastWeek() {
      initMiniSupplierInfo();
      return activeStoreService
        .getActiveStoreInfoFromMiniSupplierByLastWeek(vm.query)
        .then( function(res) {
          vm.storeInfoFromMiniSupplier = res || []
          if (vm.storeInfoFromMiniSupplier.length === 0) {
            notifyService.info("暂无数据");
          }
          initTable(vm.storeInfoFromMiniSupplier);
        });
    }

    function getActiveStoreInfoFromMiniSupplierByLastTwoWeek() {
      initMiniSupplierInfo();
      return activeStoreService
        .getActiveStoreInfoFromMiniSupplierByLastTwoWeek(vm.query)
        .then( function(res) {
          vm.storeInfoFromMiniSupplier = res || []
          if (vm.storeInfoFromMiniSupplier.length === 0) {
            notifyService.info("暂无数据");
          }
          initTable(vm.storeInfoFromMiniSupplier);
        });
    }

    function getActiveStoreInfoFromMiniSupplierByLastFourWeek() {
      initMiniSupplierInfo();
      return activeStoreService
        .getActiveStoreInfoFromMiniSupplierByLastFourWeek(vm.query)
        .then( function(res) {
          vm.storeInfoFromMiniSupplier = res || []
          if (vm.storeInfoFromMiniSupplier.length === 0) {
            notifyService.info("暂无数据");
          }
          initTable(vm.storeInfoFromMiniSupplier);
        });
    }

    function getActiveStoreDetailsFromMiniSupplierByLastWeek(miniSupplierId) {
      initMiniSupplierDetails();
      vm.query.miniSupplierId = miniSupplierId;
      return activeStoreService
        .getActiveStoreDetailsFromMiniSupplierByLastWeek(vm.query)
        .then( function(res) {
          vm.storeDetailsFromMiniSupplier = res || []
          if (vm.storeDetailsFromMiniSupplier.length === 0) {
            notifyService.info("暂无数据");
          }
          initDetailTable(vm.storeDetailsFromMiniSupplier);
        });
    }

    function getActiveStoreDetailsFromMiniSupplierByLastTwoWeek(miniSupplierId) {
      initMiniSupplierDetails();
      vm.query.miniSupplierId = miniSupplierId;
      return activeStoreService
        .getActiveStoreDetailsFromMiniSupplierByLastTwoWeek(vm.query)
        .then( function(res) {
          vm.storeDetailsFromMiniSupplier = res || []
          if (vm.storeDetailsFromMiniSupplier.length === 0) {
            notifyService.info("暂无数据");
          }
          initDetailTable(vm.storeDetailsFromMiniSupplier);
        });
    }

    function getActiveStoreDetailsFromMiniSupplierByLastFourWeek(miniSupplierId) {
      initMiniSupplierDetails();
      vm.query.miniSupplierId = miniSupplierId;
      return activeStoreService
        .getActiveStoreDetailsFromMiniSupplierByLastFourWeek(vm.query)
        .then( function(res) {
          vm.storeDetailsFromMiniSupplier = res || []
          if (vm.storeDetailsFromMiniSupplier.length === 0) {
            notifyService.info("暂无数据");
          }
          initDetailTable(vm.storeDetailsFromMiniSupplier);
        });
    }

    function backToStoreInfoFromMiniSupplier() {
      switch (vm.selectedWeek)
      {
        case 'lastWeek':
          getActiveStoreInfoFromMiniSupplierByLastWeek();
          break;
        case 'lastTwoWeek':
          getActiveStoreInfoFromMiniSupplierByLastTwoWeek();
          break;
        case 'lastFourWeek':
          getActiveStoreInfoFromMiniSupplierByLastFourWeek();
          break;
      }
      initMiniSupplierInfo();
    }

    function parseRectData(compareData) {
      vm.rectData = compareData ? [
        //标题、数额、环比、同比
        { thead: '微仓覆盖店铺数', num: compareData.coveredStoreNum ? compareData.coveredStoreNum : 0, hbHide: true, tbHide: true },
        { thead: '活跃店铺数', num: compareData.activeStoreNum ? compareData.activeStoreNum : 0 , hbHide: true, tbHide: true },
        { thead: '有单店铺数', num: compareData.saledStoreNum ? compareData.saledStoreNum : 0, hbHide: true, tbHide: true },
        // { thead: '活跃店铺总营业时长', num: compareData.openTime ? compareData.openTime.toFixed(2) : 0, hbHide: true, tbHide: true },
        { thead: '活跃店铺总进货额', num: compareData.buyPrice ? compareData.buyPrice.toFixed(2) : 0, hbHide: true, tbHide: true },
        { thead: '活跃店铺线上总订单数', num: compareData.saleQuantity ? compareData.saleQuantity : 0, hbHide: true, tbHide: true },
        { thead: '活跃店铺线上总销售额', num: compareData.salePrice ? compareData.salePrice.toFixed(2) : 0, hbHide: true, tbHide: true },
      ] : [];
    }

    function getActiveStoreOverallForMiniSupplierByLastWeek() {
      return activeStoreService
        .getActiveStoreOverallForMiniSupplierByLastWeek(vm.query)
        .then( function(res) {
          vm.overallDataFromMiniSupplier = res || []
          if (vm.overallDataFromMiniSupplier.length === 0) {
            notifyService.info("暂无数据");
          }
          parseRectData(vm.overallDataFromMiniSupplier);
        });
    }

    function getActiveStoreOverallForMiniSupplierByLastTwoWeek() {
      return activeStoreService
        .getActiveStoreOverallForMiniSupplierByLastTwoWeek(vm.query)
        .then( function(res) {
          vm.overallDataFromMiniSupplier = res || []
          if (vm.overallDataFromMiniSupplier.length === 0) {
            notifyService.info("暂无数据");
          }
          parseRectData(vm.overallDataFromMiniSupplier);
        });
    }

    function getActiveStoreOverallForMiniSupplierByLastFourWeek() {
      return activeStoreService
        .getActiveStoreOverallForMiniSupplierByLastFourWeek(vm.query)
        .then( function(res) {
          vm.overallDataFromMiniSupplier = res || []
          if (vm.overallDataFromMiniSupplier.length === 0) {
            notifyService.info("暂无数据");
          }
          parseRectData(vm.overallDataFromMiniSupplier);
        });
    }

    function selectLineGroup(group, index) {
      vm.lineGroup[group].index = index;
      vm.lineGroup[group].option = activeStoreService.getActiveStoreFromMiniSupplierLineOption(vm.lineDataFromMiniSupplier, vm.lineGroup.first.index);
    }

    function getActiveStoreLineFromMiniSupplierByLastWeek() {
      return activeStoreService
        .getActiveStoreLineFromMiniSupplierByLastWeek(vm.query)
        .then( function(res) {
          vm.lineDataFromMiniSupplier = res.lineData || []
          if (vm.lineDataFromMiniSupplier.length === 0) {
            notifyService.info("暂无数据");
          }
          vm.lineGroup.first.option = activeStoreService.getActiveStoreFromMiniSupplierLineOption(vm.lineDataFromMiniSupplier, vm.lineGroup.first.index);
        });
    }

    function onSearch() {
      initMiniSupplierInfo();
      vm.selectedWeek = 'lastWeek';
      getActiveStoreOverallForMiniSupplierByLastWeek();
      getActiveStoreInfoFromMiniSupplierByLastWeek();
      getActiveStoreLineFromMiniSupplierByLastWeek();
    }

    function exportActiveStore() {
      var url = dataService.baseUrl;
      if(vm.query.miniSupplierId){
        url += "/active/from_mini_supplier/detail/export";
      }else{
        url += "/active/from_mini_supplier/export";
      }
      url += "?token="+ authService.getAccessToken() + getQueryStr();
      window.open(url);
    }

    function getQueryStr() {
      var ret = "";
      for(var key in vm.query) {
        ret += "&" + key + "=" + vm.query[key];
      }
       //拼接上时间范围的参数
      ret += "&selectedWeek="+vm.selectedWeek;
      return ret;
    }


  }
})();