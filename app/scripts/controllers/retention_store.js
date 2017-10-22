(function () {
  'use strict';

  /**
   * @ngdoc function
   * @name chopperApp.controller:RetentionStoreCtrl
   * @description
   * # RetentionStoreCtrl
   * Controller of the chopperApp
   */
  angular.module('chopperApp')
    .controller('RetentionStoreCtrl', RetentionStoreCtrl);
  function RetentionStoreCtrl(retentionService, areaService, dateService) {
    var vm = this;
    vm.onSearch = onSearch;
    vm.selectZones = areaService.selectZones;
    vm.selectCitys = areaService.selectCitys;
    vm.selectRetentionType = selectRetentionType;
    vm.selectRateAvgType = selectRateAvgType;
    vm.selectYear = selectYear;

    var types = {
      saled: { rate: 'saledRetentionRate', firstCount: 'retentionSaledStoreCount', currentCount: 'currentSaledStoreCount' },
      open: { rate: 'openRetentionRate', firstCount: 'retentionOpenStoreCount', currentCount: 'currentOpenStoreCount' }
    };
    activate();

    function activate() {
       vm.query = { "selectedYear": 2016};
      vm.retentionType = 'saled'; //有订单店铺留存率
      vm.rateAvgType = 'times';   //相对日期留存
      areaService.initAreas(vm);

      vm.lineOption = {};
      getStoreRetention();

      vm.selectedYear = 2016;
    }

    function onSearch() {
      getStoreRetention();
    }

    function selectRetentionType(type) {
      if (vm.retentionType === type) {
        return;
      }
      vm.retentionType = type;
      retentionService.parseRetentionData(vm, types[vm.retentionType]);
      vm.lineOption = retentionService.getRetLineOption(vm);
    }

    function selectRateAvgType(type) {
      if (vm.rateAvgType === type) {
        return;
      }
      vm.rateAvgType = type;
      vm.lineOption = retentionService.getRetLineOption(vm);
    }

    function getStoreRetention() {
      return retentionService
        .getStoreRetention(vm.query)
        .then(function (res) {
          vm.retData = res;
          retentionService.parseRetentionData(vm, types[vm.retentionType]);
          vm.lineOption = retentionService.getRetLineOption(vm);
        });
    }

    function selectYear(year) {
      if (vm.selectedYear === year) {
        return;
      }
      vm.selectedYear = year;
      vm.query.selectedYear = year;
      onSearch();
    }

  }
})();