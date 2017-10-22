(function () {
  'use strict';

  /**
   * @ngdoc function
   * @name chopperApp.controller:StoreDataCtrl
   * @description
   * # StoreDataCtrl
   * Controller of the chopperApp
   */
  angular.module('chopperApp')
    .controller('StoreDataCtrl', StoreDataCtrl);

  function StoreDataCtrl(dateService, areaService, storeService, NgTableParams, $scope, dataService, $window, notifyService) {
    var vm = this;
    vm.openDatepicker = openDatepicker;
    vm.selectStart = selectStart;
    vm.selectEnd = selectEnd;
    vm.selectLineGroup = selectLineGroup;
    vm.onSearch = onSearch;
    vm.selectZones = areaService.selectZones;
    vm.selectCitys = areaService.selectCitys;
    vm.selectAreas = areaService.selectAreas;
    vm.selectExportDate = selectExportDate;
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
        firstTable: {
          open: false,
          model: null,
        },
        secondTable: {
          open: false,
          model: null,
        },
      };

      vm.query = {
        start: dateService.toString(vm.datepicker.start.model),
        end: dateService.toString(vm.datepicker.end.model),
      };
      // vm.now = new Date();
      vm.yesterday = dateService.getDaysFromNow(-1);

      vm.firstTable = {
        query: {
          start: vm.query.start,
          end: vm.query.end,
          page: 1,
          perPage: 10,
        },
        csvData: null,
        csvHeader: ["日期", "大区名称", "城市名称", "学校名称", "店长进货订单数", "店长进货金额", "店长线上订单数", "店长线上销售额", "补单金额", "独立用户数"],
        exportEnable: false,
        exportBtnName: "导出"
      }
      vm.secondTable = {
        query: {
          start: vm.query.start,
          end: vm.query.end,
          page: 1,
          perPage: 10,
        },
        csvData: null,
        csvHeader: ["日期", "大区名称", "城市名称", "学校名称", "店长名称", "店长进货订单数", "新用户数", "店长进货金额", "店长线上订单数", "店长线上销售额", "补单金额", "独立用户数"],
        exportEnable: false,
        exportBtnName: "导出"
      }


      areaService.initAreas(vm);

      vm.lineGroup = {
        index: "sales",             //店长线上销售额
        option: {}
      }

      getStoreData();
      initTable("firstTable", getSchoolsDataByPage);
      initTable("secondTable", getStoresDataByPage);
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

    function getStoreData() {
      return storeService
        .getStoreData(vm.query)
        .then(function (res) {
          vm.lineData = res.pictureData;
          if (!res.sequentialData) {
            notifyService.info("暂无数据");
          }
          vm.lineGroup.option = storeService.getLineOption(vm.lineData, vm.lineGroup.index);
          parseRectData(res.sequentialData);
        });
    }

    function selectLineGroup(index) {
      vm.lineGroup.index = index;
      vm.lineGroup.option = storeService.getLineOption(vm.lineData, index);
    }

    function onSearch() {
      angular.extend(vm.firstTable.query, vm.query);
      angular.extend(vm.secondTable.query, vm.query);

      getStoreData();
      initTable("firstTable", getSchoolsDataByPage);
      initTable("secondTable", getStoresDataByPage);
    }

    function initTable(index, getDataFun) {
      vm[index].tableParams = new NgTableParams({
        page: vm[index].query.page, // show first page
        count: vm[index].query.perPage, // count per page
        sorting: { 'paidPurchaseAmount': "desc" }
      }, {
          getData: getDataFun
        });
    }

    function getOrderColumn(val) {
      return val === 'paidPurchaseAmount' ? 0
        : val === 'paidPurchaseMoney' ? 1
          : val === 'salesVolume' ? 2
            : val === 'sales' ? 3
              : val === 'additionalOrderMoney' ? 4
                : val === 'newCustomerNumber' ? 5
                  : val === 'uniqCustomerNumber' ? 6
                    : 0;
    }

    function getSchoolsDataByPage($defer, params) {
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
        .getSchoolsDataByPage(vm.firstTable.query)
        .then(function (res) {
          vm.firstTable.data = res;
          params.total(vm.firstTable.data.count);
          $defer.resolve(vm.firstTable.data.list);
        }, function (res) {
          console.log(res);
        });
    }

    function getStoresDataByPage($defer, params) {
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
        .getStoresDataByPage(vm.secondTable.query)
        .then(function (res) {
          vm.secondTable.data = res;
          params.total(vm.secondTable.data.count);
          $defer.resolve(vm.secondTable.data.list);
        }, function (res) {
          console.log(res);
        });
    }

    function parseRectData(compareData) {
      vm.rectData = compareData ? [
        //标题、数额、环比、同比
        { thead: '店长线上销售额', num: compareData.sales, hb: compareData.salesDailyCompare, tb: compareData.salesMonthlyCompare },
        { thead: '店长线上订单数', num: compareData.salesVolume, hb: compareData.salesVolumeDailyCompare, tb: compareData.salesVolumeMonthlyCompare },
        { thead: '店长进货额(已完成)', num: compareData.paidPurchaseMoney, hb: compareData.paidPurchaseMoneyDailyCompare, tb: compareData.paidPurchaseMoneyMonthlyCompare },
        { thead: '店长进货订单数', num: compareData.paidPurchaseAmount, hb: compareData.paidPurchaseAmountDailyCompare, tb: compareData.paidPurchaseAmountMonthlyCompare },
        { thead: '店长余货额', num: compareData.stockValue, hb: compareData.stockValueDailyCompare, tb: compareData.stockValueMonthlyCompare },
        // { thead: '店长数', num: d.sumData.storeNumber, hb: sequentialData.storeNumberDailyCompare, hb: sequentialData.storeNumberMonthlyCompare },
        { thead: '补单金额', num: compareData.additionalOrderMoney, hb: compareData.additionalOrderMoneyDailyCompare, tb: compareData.additionalOrderMoneyMonthlyCompare },
        { thead: '店长进货客单价', num: compareData.averagePurchasePrice, hb: compareData.averagePurchasePriceDailyCompare, tb: compareData.averagePurchasePriceMonthlyCompare },
        // { thead: '独立用户数', num: compareData.uniqCustomerNumber, hb: compareData.uniqCustomerNumberDailyCompare, tb: compareData.uniqCustomerNumberMonthlyCompare },
        { thead: '新用户数', num: compareData.newCustomerNumber, hb: compareData.newCustomerNumberDailyCompare, tb: compareData.newCustomerNumberMonthlyCompare },
        { thead: '在线销售订单数', num: compareData.onlineSalesVolume, hb: compareData.onlineSalesVolumeDailyCompare, tb: compareData.onlineSalesVolumeMonthlyCompare },
      ] : [];
    }

    // function getNullData(d) {
    //   if (!d) {
    //     var cols = ["salesDailyCompare", "salesMonthlyCompare", "salesVolumeDailyCompare", "salesVolumeMonthlyCompare",
    //       "paidPurchaseMoneyDailyCompare", "paidPurchaseMoneyMonthlyCompare", "paidPurchaseAmountDailyCompare", "paidPurchaseAmountMonthlyCompare",
    //       "stockValueDailyCompare", "stockValueMonthlyCompare", "storeNumberDailyCompare", "storeNumberMonthlyCompare",
    //       "additionalOrderMoneyDailyCompare", "additionalOrderMoneyMonthlyCompare", "averagePurchasePriceDailyCompare", "averagePurchasePriceMonthlyCompare"];
    //     var retObj = {};
    //     for (var i = 0, len = cols.length; i < len; i++) {
    //       retObj[cols[i]] = null;
    //     }
    //     return retObj;
    //   } else {
    //     return d;
    //   }
    // }

    function selectExportDate(index) {
      vm[index].exportEnable = false;
      vm[index].exportBtnName = "稍等";
      var fun = index === 'firstTable' ? "getAllSchoolsDataByOneDay"
        : index === 'secondTable' ? "getAllStoresDataByOneDay"
          : "";
      storeService[fun](dateService.toString(vm.datepicker[index].model))
        .then(function (res) {
          vm[index].exportEnable = true;
          vm[index].exportBtnName = "导出";
          vm[index].csvData = res;
        });
    }
  }
})();