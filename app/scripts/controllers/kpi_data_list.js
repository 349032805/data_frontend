(function () {
  'use strict';

  /**
   * @ngdoc function
   * @name chopperApp.controller:KpiDataListCtrl
   * @description
   * # KpiDataListCtrl
   * Controller of the chopperApp
   */
  angular.module('chopperApp')
    .controller('KpiDataListCtrl', KpiDataListCtrl);

  function KpiDataListCtrl(kpiService, dateService, areaService, $filter, notifyService) {
    var vm = this;
    vm.openDatepicker = openDatepicker;
    vm.selectStart = selectStart;
    vm.selectEnd = selectEnd;
    vm.selectLineGroup = selectLineGroup;
    vm.selectDate = selectDate;
    vm.selectManageArea = selectManageArea;
    vm.selectZones = areaService.selectZones;
    vm.selectCitys = areaService.selectCitys;
    vm.onSearch = onSearch;
    activate();

    function activate() {
      vm.thisMonthFirstDay = $filter('date')(new Date(), 'yyyy-MM-01');
      vm.isFirstDay = new Date().getDate() === 1;
      vm.datepicker = {
        start: {
          open: false,
          // model: dateService.getDaysFromNow(-7),
          model: dateService.parseDate(vm.thisMonthFirstDay)
        },
        end: {
          open: false,
          model: dateService.getDaysFromNow(-1),
        },
      };
      vm.yesterday = dateService.getDaysFromNow(-1);
      vm.selectedDate = "thisMonth";
      // 如果是当月的第一天，就取上月的数据
      if(vm.isFirstDay){
        vm.selectedDate = "lastMonth";
        vm.datepicker.start.model = dateService.getLastMonthFirstDay();
        vm.datepicker.end.model = dateService.getLastMonthLastDay();
      }
      
      vm.lineGroup = {
        first: {
          index: "miniSupplierSales",             // 微仓出货额
          option: {}
        }
      }
      vm.query = {
        start: dateService.toString(vm.datepicker.start.model),
        end: dateService.toString(vm.datepicker.end.model),
      };
      areaService.initAreas(vm);
      onSearch();
    }

    function openDatepicker(index) {
      vm.datepicker[index].open = true;
    }

    function selectStart() {
      vm.datepicker.end.model = vm.datepicker.start.model;
      vm.selectedDate = "";
      updateQueryDate();
    }

    function selectEnd() {
      vm.selectedDate = "";
      updateQueryDate();
    }

    function updateQueryDate() {
      vm.query.start = dateService.toString(vm.datepicker.start.model);
      vm.query.end = dateService.toString(vm.datepicker.end.model);
    }
    
    function onSearch() {
      getKpiCompare();
      getKpi();
    }

    function selectLineGroup(group, index) {
      vm.lineGroup[group].index = index;
      vm.lineGroup[group].option = kpiService.getLineOption(vm.kpiData, index);
    }

    function selectDate(day) {
      if (vm.selectedDate === day) {
        return;
      }
      vm.selectedDate = day;
      
      if (vm.selectedDate === "thisMonth") {
        vm.datepicker.start.model = dateService.parseDate(vm.thisMonthFirstDay);
        vm.datepicker.end.model = dateService.getDaysFromNow(-1);
      } else if (vm.selectedDate === "lastMonth") {
        vm.datepicker.start.model = dateService.getLastMonthFirstDay();
        vm.datepicker.end.model = dateService.getLastMonthLastDay();
      } else if (vm.selectedDate === "yesterday") {
        vm.datepicker.start.model = dateService.getDaysFromNow(-1);
        vm.datepicker.end.model = dateService.getDaysFromNow(-1);
      } else if (vm.selectedDate === "beforeYesterday") {
        vm.datepicker.start.model = dateService.getDaysFromNow(-2);
        vm.datepicker.end.model = dateService.getDaysFromNow(-2);
      }
      updateQueryDate();
      onSearch();
    }

    function selectManageArea(area) {
      vm.selectedManageArea = area;
    }

    //v2.0 
    function getKpi() {
      return kpiService.getKpi(vm.query)
        .then(function (res) {
          vm.kpiData = res;
          vm.lineGroup.first.option = kpiService.getLineOption(vm.kpiData, vm.lineGroup.first.index);
          vm.selectedManageArea = vm.kpiData[0];
        });
    }
    
    function getKpiCompare() {
      return kpiService
        .getKpiCompare(vm.query)
        .then(function(res) {
          vm.compareData = res;
          if (!res) {
            notifyService.info("暂无数据");
          }
          parseRectData(vm.compareData);
        })
    }
    
    //矩形块里的数据
    function parseRectData(compareData) {
      vm.rectData = compareData ? [
        //标题、数额、环比、同比
        { thead: '微仓出货额', num: compareData.miniSupplierSales, hb: compareData.miniSupplierSalesDailyCompare, tb: compareData.miniSupplierSalesMonthlyCompare },
        { thead: '微仓出货订单数', num: compareData.miniSupplierSalesVolume, hb: compareData.miniSupplierSalesVolumeDailyCompare, tb: compareData.miniSupplierSalesVolumeMonthlyCompare },
        { thead: '店长总销售额', num: compareData.storeTotalSales, hb: compareData.storeTotalSalesDailyCompare, tb: compareData.storeTotalSalesMonthlyCompare },
        { thead: '店长总销售订单数', num: compareData.storeTotalSalesVolume, hb: compareData.storeTotalSalesVolumeDailyCompare, tb: compareData.storeTotalSalesVolumeMonthlyCompare },
        { thead: '店长线上销售额', num: compareData.storeSales, hb: compareData.storeSalesDailyCompare, tb: compareData.storeSalesMonthlyCompare },
        { thead: '店长线上订单数', num: compareData.storeSalesVolume, hb: compareData.storeSalesVolumeDailyCompare, tb: compareData.storeSalesVolumeMonthlyCompare },
        { thead: '补单金额', num: compareData.additionalOrderTotalSales, hb: compareData.additionalOrderTotalSalesDailyCompare, tb: compareData.additionalOrderTotalSalesMonthlyCompare },
        { thead: '补单订单数', num: compareData.additionalOrderTotalSalesVolume, hb: compareData.additionalOrderTotalSalesVolumeDailyCompare, tb: compareData.additionalOrderTotalSalesVolumeMonthlyCompare },
        { thead: '有效店铺数', num: compareData.storeNumbers, hb: compareData.storeNumbersDailyCompare, tb: compareData.storeNumbersMonthlyCompare },
        { thead: '有单店铺数', num: compareData.saledStoreNumbers, hb: compareData.saledStoreNumbersDailyCompare, tb: compareData.saledStoreNumbersMonthlyCompare },
        { thead: '新增店铺数量', num: compareData.newStoreNumbers, hb: compareData.newStoreNumbersDailyCompare, tb: compareData.newStoreNumbersMonthlyCompare },
        { thead: '在线支付金额', num: compareData.onlineSales, hb: compareData.onlineSalesDailyCompare, tb: compareData.onlineSalesMonthlyCompare },
        { thead: '在线支付订单数', num: compareData.onlineSalesVolume, hb: compareData.onlineSalesVolumeDailyCompare, tb: compareData.onlineSalesVolumeMonthlyCompare },
        { thead: '新用户数', num: compareData.newCustomerNumber, hb: compareData.newCustomerNumberDailyCompare, tb: compareData.newCustomerNumberMonthlyCompare },
        // { thead: '独立用户数', num: compareData.uniqCustomerNumber, hb: compareData.uniqCustomerNumberDailyCompare, tb: compareData.uniqCustomerNumberMonthlyCompare },
        // { thead: '微仓毛利额', num: compareData.miniSupplierProfits, hb: compareData.miniSupplierProfitsDailyCompare, tb: compareData.miniSupplierProfitsMonthlyCompare },
      ] : [];
    }

    // function parseGaugeOption(data) {
    //   vm.storeOption = kpiService.getGaugeOption(data.storeSalesDonePercentage || "N/A");
    //   vm.miniOption = kpiService.getGaugeOption(data.miniSupplierSalesDonePercentage || "N/A");
    //   vm.customerOption = kpiService.getGaugeOption(data.newCustomerNumberDonePercentage || "N/A");
    // }

  }

})();
