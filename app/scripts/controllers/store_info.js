(function() {
  'use strict';

  /**
   * @ngdoc function
   * @name chopperApp.controller:StoreInfoCtrl
   * @description
   * # StoreInfoCtrl
   * Controller of the chopperApp
   */
  angular.module('chopperApp')
    .controller('StoreInfoCtrl', StoreInfoCtrl);

  function StoreInfoCtrl(areaService, storeService, dateService, NgTableParams) {
    var vm = this;
    vm.isMiniSupplier = true;
    vm.openDatepicker = openDatepicker;
    vm.selectStart = selectStart;
    vm.selectEnd = selectEnd;
    vm.selectLineGroup = selectLineGroup;
    vm.onSearch = onSearch;
    vm.selectZones = selectZones;
    vm.selectCitys = selectCitys;
    vm.selectAreas = selectAreas;
    vm.clickNext = clickNext;
    vm.clickBack = clickBack;
    vm.clickNav = clickNav;
    vm.exportCsv = exportCsv;
    vm.csvHeader = csvHeader;
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
        queryType : 0,
        name: "全国",
      };
      // vm.queryTemp = [angular.copy(vm.query)];
      vm.queryTemp = [angular.copy(vm.query)];
      vm.yesterday = dateService.getDaysFromNow(-1);

      areaService.initAreas(vm);

      vm.lineGroup = {
        index: "saleQuantity",
        option: {}
      }
      vm.info = {};
      // vm.csvHeader = ["adf","adf","adf","adf","adf","adf","adf"];

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
      vm.queryTemp.forEach(function(item) {
        item.start = vm.query.start;
        item.end = vm.query.end;
      });
    }
    
    function selectZones(vm) {
      areaService.selectZones(vm);
      updateQueryArea();
    }
    
    function selectCitys(vm) {
      areaService.selectCitys(vm);
      updateQueryArea();
    }
    
    function selectAreas(vm) {
      areaService.selectAreas(vm);
      updateQueryArea();
    }
    
    function updateQueryArea() {
      vm.queryTemp.forEach(function(item) {
        item.type = vm.query.type;
        item.ids = vm.query.ids;
      });
    }
    
    function selectLineGroup(index) {
      vm.lineGroup.index = index;
      vm.lineGroup.option = storeService.getLineOption(vm.lineData, index);
    }

    function onSearch() {
      getStoreInfoDate();
      queryData();
    }

    function getStoreInfoDate() {
      return storeService
        .getStoreInfoDate(vm.query)
        .then(function(res) {
          vm.sumData = res.sumData;
          vm.lineData = res.pictureData;
          vm.lineGroup.option = storeService.getLineOption(vm.lineData, vm.lineGroup.index);
          parseRectData(vm.sumData);
        });
    }

    function getStoreInfoTable() {
      return storeService
        .getStoreInfoTable(vm.query)
        .then(function(res) {
          vm.tableData = res;
          initTable("info", vm.tableData, { 'saleQuantity': "desc" });
        });
    }

    function getStoreInfoSection() {
      return storeService
        .getStoreInfoSection(vm.query)
        .then(function(res) {
          vm.tableData = res;
          initTable("info", vm.tableData, { 'saleQuantity': "desc" });
        });
    }

    function getStoreInfoStores() {
      return storeService
        .getStoreInfoStores(vm.query)
        .then(function(res) {
          vm.tableData = res;
          initTable("info", vm.tableData, { 'dt': "desc" });
        });
    }
    
    function clickNext(item) {
      if (item.supplierName) {
        vm.query.queryType = 1;
        vm.query.id = item.supplierId;
        vm.query.name = item.supplierName;
      } else if (item.sectionName) {
        vm.query.queryType = 2;
        vm.query.id = item.sectionId;
        vm.query.name = item.sectionName;
      } 
      if (!item.storeName) {
        vm.queryTemp.push(angular.copy(vm.query));
        queryData();
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
      if (nav.queryType === 0) return;
      if (vm.queryTemp.length >= 2) {
        var index = findQueryObj(nav);
        vm.queryTemp.splice(index, vm.queryTemp.length - index);
        vm.query = angular.copy(vm.queryTemp[vm.queryTemp.length - 1]);
        queryData();
      }
    }
    
    function queryData() {
      if (vm.query.queryType === 0) {
        getStoreInfoTable()
      } else if (vm.query.queryType === 1) {
        getStoreInfoSection();
      } else if (vm.query.queryType === 2) {
        getStoreInfoStores();
      } else {
        return null;
      }
    }
    
    function findQueryObj(nav) {
      for (var i = 0, len = vm.queryTemp.length; i < len; i++) {
        if (nav.id === vm.queryTemp[i].id) {
          return i;
        }
      }
    }

    function parseRectData(compareData) {
      vm.rectData = compareData ? [
        //标题、数额、环比、同比
        { thead: '店长线上订单数', num: compareData.saleQuantity, hb: compareData.saleQuantityDailyCompare, tb: compareData.saleQuantityMonthlyCompare },
        { thead: '店长线上销售额', num: compareData.salePrice, hb: compareData.salePriceDailyCompare, tb: compareData.salePriceMonthlyCompare },
        { thead: '店长出货客单价', num: compareData.saleAvg, hb: compareData.saleAvgDailyCompare, tb: compareData.saleAvgMonthlyCompare },
        { thead: '店长进货订单数', num: compareData.buyQuantity, hb: compareData.buyQuantityDailyCompare, tb: compareData.buyQuantityMonthlyCompare },
        { thead: '店长进货额', num: compareData.buyPrice, hb: compareData.buyPriceDailyCompare, tb: compareData.buyPriceMonthlyCompare },
        { thead: '店长进货客单价', num: compareData.buyAvg, hb: compareData.buyAvgDailyCompare, tb: compareData.buyAvgMonthlyCompare },
        { thead: '在线支付订单数', num: compareData.onlineQuantity, hb: compareData.onlineQuantityDailyCompare, tb: compareData.onlineQuantityMonthlyCompare },
        { thead: '补单量', num: compareData.offlineQuantity, hb: compareData.offlineQuantityDailyCompare, tb: compareData.offlineQuantityMonthlyCompare },
        { thead: '补单金额', num: compareData.offlinePrice, hb: compareData.offlinePriceDailyCompare, tb: compareData.offlinePriceMonthlyCompare },
        { thead: '新用户数', num: compareData.newCustomer, hb: compareData.newCustomerDailyCompare, tb: compareData.newCustomerMonthlyCompare },
        { thead: '有效店铺数', num: compareData.storeNum, hb: compareData.storeNumDailyCompare, tb: compareData.storeNumMonthlyCompare },
        { thead: '新增店铺数', num: compareData.newStoreNum, hb: compareData.newStoreNumDailyCompare, tb: compareData.newStoreNumMonthlyCompare },
        // { thead: '流失店铺数', num: compareData.deletedStoreNum, hb: compareData.deletedStoreNumDailyCompare, tb: compareData.deletedStoreNumMonthlyCompare },
      ] : [];
    }

    function initTable(index, dataArr, sorting) {
      vm[index].tableParams = new NgTableParams({
        page: 1, // show first page
        count: 10, // count per page
        sorting: sorting
      }, {
          dataset: dataArr
        });
    }
    
    function csvHeader() {
      if (vm.query.queryType === 0) {
        return ["大区", "城市", "微仓", "微仓号", "店长", "学校数", "有效店铺数", "新增店铺数", "店长线上订单数", "店长线上销售额", "店长出货客单价", "店长进货订单数", "店长进货额", "店长进货客单价", "新用户数"];
      } else if (vm.query.queryType === 1) {
        return ["学校", "学校数", "有效店铺数", "新增店铺数", "店长线上订单数", "店长线上销售额", "店长出货客单价", "店长进货订单数", "店长进货额", "店长进货客单价", "新用户数"];
      } else if (vm.query.queryType === 2) {
        return ["日期", "店铺", "店长", "联系方式", "店长线上订单数", "店长线上销售额", "店长出货客单价", "店长进货订单数", "店长进货额", "店长进货客单价", "店长余货额", "新用户数"];
      }
      return [];
    }
    
    function exportCsv() {
      if (vm.query.queryType === 0) {
        return vm.tableData.map(function (item) {
          return {
            zoneName: item.zoneName,
            cityName: item.cityName,
            supplierName: item.supplierName,
            supplierNo: item.supplierNo,
            merchantName: item.merchantName,
            sectionNum: item.sectionNum,
            storeNum: item.storeNum,
            newStoreNum: item.newStoreNum,
            saleQuantity: item.saleQuantity,
            salePrice: item.salePrice,
            saleAvg: item.saleAvg,
            buyQuantity: item.buyQuantity,
            buyPrice: item.buyPrice,
            buyAvg: item.buyAvg,
            newCustomer: item.newCustomer
          }
        });
      } else if (vm.query.queryType === 1) {
        return vm.tableData.map(function (item) {
          return {
            sectionName: item.sectionName,
            sectionNum: item.sectionNum,
            storeNum: item.storeNum,
            newStoreNum: item.newStoreNum,
            saleQuantity: item.saleQuantity,
            salePrice: item.salePrice,
            saleAvg: item.saleAvg,
            buyQuantity: item.buyQuantity,
            buyPrice: item.buyPrice,
            buyAvg: item.buyAvg,
            newCustomer: item.newCustomer
          }
        });
      } else if (vm.query.queryType === 2) {
        return vm.tableData.map(function (item) {
          return {
            dt: item.dt,
            storeName: item.storeName,
            merchantName: item.merchantName,
            supplierPhone: item.supplierPhone,
            
            saleQuantity: item.saleQuantity,
            salePrice: item.salePrice,
            saleAvg: item.saleAvg,
            buyQuantity: item.buyQuantity,
            buyPrice: item.buyPrice,
            buyAvg: item.buyAvg,
            stockMoney: item.stockMoney,
            newCustomer: item.newCustomer
          }
        });
      }
    }

  }
})();