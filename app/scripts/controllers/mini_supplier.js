(function () {
  'use strict';

  /**
   * @ngdoc function
   * @name chopperApp.controller:MiniSupplierCtrl
   * @description
   * # MiniSupplierCtrl
   * Controller of the chopperApp
   */
  angular.module('chopperApp')
    .controller('MiniSupplierCtrl', MiniSupplierCtrl);

  function MiniSupplierCtrl(miniSupplierService, dateService, areaService, NgTableParams, $scope, notifyService) {
    var vm = this;
    vm.isMiniSupplier = true;
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
        page: 1,
        perPage: 10,
      };
      // vm.now = new Date();
      vm.yesterday = dateService.getDaysFromNow(-1);

      areaService.initAreas(vm);

      vm.lineGroup = {
        first: {
          index: "miniSupplierSales",             // 微仓出货额
          option: {}
        },
        second: {
          index: "miniSupplierProfitsPercentage", // 微仓毛利率
          option: {}
        },
        third: {
          index: "allSkuNumber",                  // 微仓可供SKU数
          option: {}
        },
      };

      getMiniSupplierLineChartData();
      initTable();
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

    function getMiniSupplierLineChartData() {
      return miniSupplierService
        .getMiniSupplierLineChartData(vm.query)
        .then(function (res) {
          vm.lineData = res.pictureData;
          if (!res.sequentialData) {
            notifyService.info("暂无数据");
          }
          vm.lineGroup.first.option = miniSupplierService.getMiniSupplierLineOption(vm.lineData, vm.lineGroup.first.index);
          // vm.lineGroup.second.option = miniSupplierService.getMiniSupplierLineOption(vm.lineData, vm.lineGroup.second.index);
          // vm.lineGroup.third.option = miniSupplierService.getMiniSupplierLineOption(vm.lineData, vm.lineGroup.third.index);
          parseRectData(res.sequentialData);
        });
    }

    function getMiniSupplierTableData($defer, params) {
      // var filter = params.filter();
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

      miniSupplierService
        .getMiniSupplierTableData(vm.query)
        .then(function (res) {
          vm.tableData = res;
          params.total(vm.tableData.count);
          $defer.resolve(vm.tableData.list);
        }, function (res) {
          console.log(res);
        });
    }

    function initTable() {
      vm.tableParams = new NgTableParams({
        page: vm.query.page, // show first page
        count: vm.query.perPage, // count per page
        sorting: { 'miniSupplierPurchase': "desc" }
      }, {
          getData: getMiniSupplierTableData
        });
    }

    function getOrderColumn(val) {
      return val === 'miniSupplierPurchase' ? 0
        : val === 'miniSupplierSales' ? 1
          : val === 'miniSupplierLoss' ? 2
            : val === 'miniSupplierProfits' ? 3
              : val === 'onShowSkuNumber' ? 4
                : val === 'zeroStockSkuNumber' ? 5
                  : 0;
    }

    function selectLineGroup(group, index) {
      vm.lineGroup[group].index = index;
      vm.lineGroup[group].option = miniSupplierService.getMiniSupplierLineOption(vm.lineData, index);
    }

    function onSearch() {
      getMiniSupplierLineChartData();
      initTable();
    }

    function parseRectData(compareData) {
      vm.rectData = compareData ? [
        //标题、数额、环比、同比
        { thead: '微仓出货额', num: compareData.miniSupplierSales, hb: compareData.miniSupplierSalesDailyCompare, tb: compareData.miniSupplierSalesMonthlyCompare },
        { thead: '微仓出货订单数', num: compareData.miniSupplierSalesVolume, hb: compareData.miniSupplierSalesVolumeDailyCompare, tb: compareData.miniSupplierSalesVolumeMonthlyCompare },
        { thead: '微仓进货额', num: compareData.miniSupplierPurchase, hb: compareData.miniSupplierPurchaseDailyCompare, tb: compareData.miniSupplierPurchaseMonthlyCompare },
        { thead: '微仓进货订单数', num: compareData.miniSupplierPurchaseAmount, hb: compareData.miniSupplierPurchaseAmountDailyCompare, tb: compareData.miniSupplierPurchaseAmountMonthlyCompare },
        { thead: '微仓出货客单价', num: compareData.miniSupplierAveragePrice, hb: compareData.miniSupplierAveragePriceDailyCompare, tb: compareData.miniSupplierAveragePriceMonthlyCompare },
        // { thead: '微仓毛利率', num: compareData.miniSupplierProfitsPercentage, hb: compareData.miniSupplierProfitsPercentageDailyCompare, tb: compareData.miniSupplierProfitsPercentageMonthlyCompare },
        // { thead: '微仓毛利额', num: compareData.miniSupplierProfits, hb: compareData.miniSupplierProfitsDailyCompare, tb: compareData.miniSupplierProfitsMonthlyCompare },
        { thead: '微仓余货额', num: compareData.miniSupplierStockValue, hb: compareData.miniSupplierStockValueDailyCompare, tb: compareData.miniSupplierStockValueMonthlyCompare },
        { thead: '微仓损耗额', num: compareData.miniSupplierLoss, hb: compareData.miniSupplierLossDailyCompare, tb: compareData.miniSupplierLossMonthlyCompare },
      ] : [];
    }

    function getNullData(d) {
      if (!d) {
        var cols = ["miniSupplierSalesDailyCompare", "miniSupplierSalesWeeklyCompare", "miniSupplierSalesVolumnDailyCompare", "miniSupplierSalesVolumnWeeklyCompare",
          "miniSupplierPurchaseDailyCompare", "miniSupplierPurchaseWeeklyCompare", "miniSupplierPurchaseAmountDailyCompare", "miniSupplierPurchaseAmountWeeklyCompare",
          "miniSupplierAveragePriceDailyCompare", "miniSupplierAveragePriceWeeklyCompare", "miniSupplierProfitsPercentageDailyCompare", "miniSupplierProfitsPercentageWeeklyCompare",
          "miniSupplierProfitsDailyCompare", "miniSupplierProfitsWeeklyCompare", "miniSupplierStockValueDailyCompare", "miniSupplierStockValueWeeklyCompare",
          "miniSupplierLossDailyCompare", "miniSupplierLossWeeklyCompare"];
        var retObj = {};
        for (var i = 0, len = cols.length; i < len; i++) {
          retObj[cols[i]] = null;
        }
        return retObj;
      } else {
        return d;
      }
    }
  }
})();