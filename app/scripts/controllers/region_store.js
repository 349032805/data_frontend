(function() {
  'use strict';

  /**
   * @ngdoc function
   * @name chopperApp.controller:RegionStoreCtrl
   * @description
   * # RegionStoreCtrl
   * Controller of the chopperApp
   */
  angular.module('chopperApp')
    .controller('RegionStoreCtrl', RegionStoreCtrl);

  function RegionStoreCtrl(regionService, dateService, areaService, NgTableParams) {
    var vm = this;
    vm.openDatepicker = openDatepicker;
    vm.selectStart = selectStart;
    vm.selectEnd = selectEnd;
    vm.selectLineGroup = selectLineGroup;
    vm.onSearch = onSearch;
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
        queryType: 0,
        name: "区域",
      };
      vm.queryTemp = [angular.copy(vm.query)];
      vm.yesterday = dateService.getDaysFromNow(-1);

      areaService.initAreas(vm);
      vm.lineGroup = { index: "saleQuantity", option: {} };

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

    function selectAreas(vm) {
      if (vm.selectedAreas.length === 0) {
        delete vm.query.type;
        delete vm.query.ids;
      } else {
        var ids = vm.selectedAreas.map(function(item) {
          return item.id;
        }).join(",");
        vm.query.type = 3;
        vm.query.ids = ids;
      }
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
      vm.lineGroup.option = regionService.getLineOption(vm.lineData, index);
    }

    function onSearch() {
      getRegionStoreOverall();
      getRegionStoreLine();
      getRegionStoreTable();
    }

    function clickNext(item) {
      if (item.regionName) {
        vm.query.queryType = 1;
        vm.query.id = item.regionId;
        vm.query.name = item.regionName;
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
        getRegionStoreTable();
      } else if (vm.query.queryType === 1) {
        getRegionStoreSection();
      } else if (vm.query.queryType === 2) {
        getRegionStoreStores();
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

    function getRegionStoreOverall() {
      return regionService
        .getRegionStoreOverall(vm.query)
        .then(function(res) {
          vm.regionOverall = res;
          parseRectData(vm.regionOverall);
        });
    }

    function getRegionStoreLine() {
      return regionService
        .getRegionStoreLine(vm.query)
        .then(function(res) {
          vm.lineData = res;
          vm.lineGroup.option = regionService.getLineOption(vm.lineData, vm.lineGroup.index);
        });
    }

    function getRegionStoreTable() {
      return regionService
        .getRegionStoreTable(vm.query)
        .then(function(res) {
          vm.tableData = res;
          initTable(vm.tableData, { 'saleQuantity': "desc" });
        });
    }

    function getRegionStoreSection() {
      return regionService
        .getRegionStoreSection(vm.query)
        .then(function(res) {
          vm.tableData = res;
          initTable(vm.tableData, { 'saleQuantity': "desc" });
        });
    }

    function getRegionStoreStores() {
      return regionService
        .getRegionStoreStores(vm.query)
        .then(function(res) {
          vm.tableData = res;
          initTable(vm.tableData, { 'saleQuantity': "desc" });
        });
    }

    function parseRectData(compareData) {
      vm.rectData = compareData ? [
        //标题、数额、环比、同比
        { thead: '店长线上订单数', num: compareData.saleQuantity, hbHide: true, tbHide: true },
        { thead: '店长线上销售额', num: compareData.salePrice, hbHide: true, tbHide: true },
        { thead: '店长进货订单数', num: compareData.buyQuantity, hbHide: true, tbHide: true },
        { thead: '店长进货额', num: compareData.buyPrice, hbHide: true, tbHide: true },
        { thead: '店长进货客单价', num: compareData.avergeBuyPrice, hbHide: true, tbHide: true },
        { thead: '有效店铺数', num: compareData.storeNum, hbHide: true, tbHide: true },
        { thead: '新用户数', num: compareData.newCustomer, hbHide: true, tbHide: true },
        { thead: '新增店铺数', num: compareData.newStoreNum, hbHide: true, tbHide: true },
      ] : [];
    }

    function initTable(dataArr, sorting) {
      vm.tableParams = new NgTableParams({
        page: 1, // show first page
        count: 10, // count per page
        sorting: sorting
      }, {
          dataset: dataArr
        });
    }

    function csvHeader() {
      if (vm.query.queryType === 0) {
        return ["日期", "区域", "有效店铺数", "新增店铺数", "营业店铺数", "有单店铺数", "店长线上订单数", "店长线上销售额", "店长出货客单价", "店长进货订单数", "店长进货额", "店长进货客单价", "新用户数", "独立用户数"];
      } else if (vm.query.queryType === 1) {
        return ["日期", "学校", "有效店铺数", "新增店铺数", "营业店铺数", "有单店铺数", "店长线上订单数", "店长线上销售额", "店长出货客单价", "店长进货订单数", "店长进货额", "店长进货客单价", "新用户数", "独立用户数"];
      } else if (vm.query.queryType === 2) {
        return ["日期", "店铺", "店长", "联系方式", "店长线上订单数", "店长线上销售额", "店长出货客单价", "店长进货订单数", "店长进货额", "店长进货客单价", "店长余货额", "新用户数", "独立用户数"];
      }
      return [];
    }

    function exportCsv() {
      if (vm.query.queryType === 0) {
        return vm.tableData.map(function(item) {
          return {
            dt: item.dt,
            regionName: item.regionName,
            storeNum: item.storeNum,
            newStoreNum: item.newStoreNum,
            opendStoreNum: item.opendStoreNum,
            saledStoreNum: item.saledStoreNum,
            saleQuantity: item.saleQuantity,
            salePrice: item.salePrice,
            saleAvg: item.saleAvg,
            buyQuantity: item.buyQuantity,
            buyPrice: item.buyPrice,
            buyAvg: item.buyAvg,
            newCustomer: item.newCustomer,
            uniqCustomer: item.uniqCustomer
          }
        });
      } else if (vm.query.queryType === 1) {
        return vm.tableData.map(function(item) {
          return {
            dt: item.dt,
            sectionName: item.sectionName,
            storeNum: item.storeNum,
            newStoreNum: item.newStoreNum,
            opendStoreNum: item.opendStoreNum,
            saledStoreNum: item.saledStoreNum,
            saleQuantity: item.saleQuantity,
            salePrice: item.salePrice,
            saleAvg: item.saleAvg,
            buyQuantity: item.buyQuantity,
            buyPrice: item.buyPrice,
            buyAvg: item.buyAvg,
            newCustomer: item.newCustomer,
            uniqCustomer: item.uniqCustomer
          }
        });
      } else if (vm.query.queryType === 2) {
        return vm.tableData.map(function(item) {
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
            newCustomer: item.newCustomer,
            uniqCustomer: item.uniqCustomer
          }
        });
      }
    }

  }
})();