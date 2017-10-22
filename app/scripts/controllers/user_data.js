(function () {
  'use strict';

  /**
   * @ngdoc function
   * @name chopperApp.controller:UserDataCtrl
   * @description
   * # UserDataCtrl
   * Controller of the chopperApp
   */
  angular.module('chopperApp')
    .controller('UserDataCtrl', UserDataCtrl);

  function UserDataCtrl(basicService, areaService, dateService, notifyService) {
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

      areaService.initAreas(vm);

      vm.lineGroup = {
        first: {
          index: "sales",             // 用户销售额
          option: {}
        },
      };

      getCustomerTransactions();
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
      vm.lineGroup[group].option = basicService.getLineOption(vm.lineData, index);
    }

    function onSearch() {
      getCustomerTransactions();
    }

    function getCustomerTransactions() {
      return basicService
        .getCustomerTransactions(vm.query)
        .then(function (res) {
          vm.lineData = res.pictureData;
          if (!res.sequentialData) {
            notifyService.info("暂无数据");
          }
          vm.lineGroup.first.option = basicService.getLineOption(vm.lineData, vm.lineGroup.first.index);
          parseRectData(res.sequentialData);
        });
    }

    function parseRectData(compareData) {
      vm.rectData = compareData ? [
        //标题、数额、环比、同比
        { thead: '用户订单金额', num: compareData.sales, hb: compareData.salesDailyCompare, tb: compareData.salesMonthlyCompare },
        { thead: '用户订单数', num: compareData.salesVolume, hb: compareData.salesVolumeDailyCompare, tb: compareData.salesVolumeMonthlyCompare },
        { thead: '用户客单价', num: compareData.averageSales, hb: compareData.averageSalesDailyCompare, tb: compareData.averageSalesMonthlyCompare },
        { thead: '用户在线支付金额', num: compareData.onlineSales, hb: compareData.onlineSalesDailyCompare, tb: compareData.onlineSalesMonthlyCompare },
        { thead: '用户无效订单金额', num: compareData.invalidSales, hb: compareData.invalidSalesDailyCompare, tb: compareData.invalidSalesMonthlyCompare },
        { thead: '新用户数', num: compareData.newCustomerNumber, hb: compareData.newCustomerNumberDailyCompare, tb: compareData.newCustomerNumberMonthlyCompare },
        { thead: '独立用户数', num: compareData.uniqCustomerNumber, hb: compareData.uniqCustomerNumberDailyCompare, tb: compareData.uniqCustomerNumberMonthlyCompare },
      ] : [];
    }

    // function getNullData(d) {
    //   if (!d) {
    //     var cols = ["salesDailyCompare", "salesWeeklyCompare", "salesVolumeDailyCompare", "salesVolumeWeeklyCompare",
    //       "averageSalesDailyCompare", "averageSalesWeeklyCompare", "onlineSalesDailyCompare", "onlineSalesWeeklyCompare",
    //       "invalidSalesDailyCompare", "invalidSalesWeeklyCompare", "newCustomerNumberDailyCompare", "newCustomerNumberWeeklyCompare",
    //       "uniqCustomerNumberDailyCompare", "uniqCustomerNumberWeeklyCompare"];
    //     var retObj = {};
    //     for (var i = 0, len = cols.length; i < len; i++) {
    //       retObj[cols[i]] = null;
    //     }
    //     return retObj;
    //   } else {
    //     return d;
    //   }
    // }
  }
})();
