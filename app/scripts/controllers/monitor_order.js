(function () {
  'use strict';

  /**
   * @ngdoc function
   * @name chopperApp.controller:MonitorOrderCtrl
   * @description
   * # MonitorOrderCtrl
   * Controller of the chopperApp
   */
  angular.module('chopperApp')
    .controller('MonitorOrderCtrl', MonitorOrderCtrl);

  function MonitorOrderCtrl(monitorService, dateService, NgTableParams, areaService, dataService, authService) {
    var vm = this;
    vm.openDatepicker = openDatepicker;
    vm.selectStart = selectStart;
    vm.selectEnd = selectEnd;
    vm.selectLineGroup = selectLineGroup;
    vm.selectNumType = selectNumType;
    vm.onSearch = onSearch;
    vm.exportPhoneCsv = exportPhoneCsv;
    vm.exportOrderCsv = exportOrderCsv;
    vm.selectZones = areaService.selectZones;
    vm.selectCitys = areaService.selectCitys;
    vm.exportPhoneNumber = exportPhoneNumber;
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
      
      vm.numTypes = [
        {num: 5, name: "5单"},
        {num: 4, name: "4单"}
      ];
      vm.selectedNumType = vm.numTypes[0];

      vm.query = {
        start: dateService.toString(vm.datepicker.start.model),
        end: dateService.toString(vm.datepicker.end.model),
        numType: 5    // 风险订单指标值
      };
      vm.yesterday = dateService.getDaysFromNow(-1);

      areaService.initAreas(vm);
      vm.phone = {};
      vm.order = {};
      vm.lineGroup = {
        first: {
          index: "orderRate",
          option: {}
        }
      };

      onSearch();
      vm.phoneCsvHeader = ['日期', '大区', '城市', '区域', '学校', '店铺', '独立手机号数', '风险手机号数', '比率'];
      vm.orderCsvHeader = ['日期', '大区', '城市', '订单数', '风险订单数', '风险订单占比', '独立手机号', '平均每手机号订单数'];
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
    
    function exportPhoneNumber() {
      var url = dataService.baseUrl + "/phone_supervision/export/phoneDetail?token=" + authService.getAccessToken() + getQueryStr();
      window.open(url);
    }
    
    function getQueryStr() {
      var ret = "";
      for(var key in vm.query) {
        ret += "&" + key + "=" + vm.query[key];
      }
      return ret;
    }
    
    function selectLineGroup(group, index) {
      vm.lineGroup[group].index = index;
      var lineData = index === "orderRate" ? vm.cityOrderRate : 
                     index === "phoneRate" ? vm.cityPhoneRate : [];
      vm.lineGroup[group].option = monitorService.getOrderLineOption(lineData, index);
    }
    
    function selectNumType() {
      vm.query.numType = vm.selectedNumType.num;
    }

    function getMonitorData() {
      return monitorService
        .getPhoneDailSupervisitionData(vm.query)
        .then(function (res) {
          vm.mOrderData = res.data || [];
          initTable("phone", vm.mOrderData, { 'riskPhoneNumberPercentage': "desc" });
        })
    }
    
    function getExportMonitorData() {
      return monitorService
        .getExportPhoneSupervisitionData(vm.query)
        .then(function (res) {
          vm.exportOrderData = res.data || [];
        })
    }
    
    function getCityOrder() {
      return monitorService
        .getCityOrder(vm.query)
        .then(function (res) {
          vm.cityOrderData = res.data || [];
          initTable("order", vm.cityOrderData, { 'riskOrderPercentage': "desc" });
        }, function (res) {

        })
    }
    
    function getCityOrderRate() {
      return monitorService
        .getCityOrderRate(vm.query)
        .then(function(res){
          vm.cityOrderRate = res.data.lineData;
          vm.lineGroup.first.option = monitorService.getOrderLineOption(vm.cityOrderRate, vm.lineGroup.first.index);
        },function(res){
          console.log(res);
        })
    }
    
    function getCityPhoneRate() {
      return monitorService
        .getCityPhoneRate(vm.query)
        .then(function(res){
          vm.cityPhoneRate = res.data.lineData;
        },function(res){
          console.log(res);
        })
    }

    function onSearch() {
      vm.lineGroup.first.index = "orderRate";
      getCityOrderRate();
      getCityOrder();
      getMonitorData();
      getExportMonitorData();
      getCityPhoneRate();
    }

    function exportPhoneCsv() {
      return vm.exportOrderData.map(function (item) {
        return {
          dt: item.dt,
          zoneName: item.zoneName,
          cityName: item.cityName,
          regionName: item.regionName,
          sectionName: item.sectionName,
          storeName: item.storeName,
          uniqCustomerNumber: item.uniqCustomerNumber,
          riskPhoneNumber: item.riskPhoneNumber,
          riskPhoneNumberPercentage: item.riskPhoneNumberPercentage
        }
      });
    }
    
    function exportOrderCsv() {
      return vm.cityOrderData.map(function (item) {
        return {
          dt: item.dt,
          zoneName: item.zoneName,
          cityName: item.cityName,
          orderQuantity: item.orderQuantity,
          riskOrderQuantity: item.riskOrderQuantity,
          riskOrderPercentage: item.riskOrderPercentage,
          phoneCount: item.phoneCount,
          avgPhoneOrder: item.avgPhoneOrder
        }
      });
    }

    function initTable(index, dataArr, sorting) {
      vm[index].tableParams = new NgTableParams({
        page: 1, // show first page
        count: 10, // count per page
        sorting: sorting
      }, {
          dataset: dataArr
          // getData: function ($defer, params) {
          //   params.total(dataArr.length);
          //   $defer.resolve(dataArr);
          // }
        });
    }

  }
})();