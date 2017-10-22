(function () {
  'use strict';

  /**
   * @ngdoc function
   * @name chopperApp.controller:RetentionPhoneCtrl
   * @description
   * # RetentionPhoneCtrl
   * Controller of the chopperApp
   */
  angular.module('chopperApp')
    .controller('RetentionPhoneCtrl', RetentionPhoneCtrl);
  function RetentionPhoneCtrl(retentionService, areaService, $filter, dateService) {
    var vm = this;
    vm.onSearch = onSearch;
    vm.selectZones = areaService.selectZones;
    vm.selectCitys = areaService.selectCitys;
    vm.selectRateAvgType = selectRateAvgType;
    vm.selectYear = selectYear;
    vm.selectPeriod = selectPeriod;
    activate();

    function activate() {
      //取当前年份和周留存为默认值
      vm.query = { "selectedYear": 2016,"selectedPeriod":'week'};
      vm.rateAvgType = 'times';   //相对日期留存
      vm.retentionType = { 
        rate: 'phoneRetentionRate', 
        firstCount: 'retentionPhoneCount', 
        currentCount: 'currentPhoneCount' 
      };
      areaService.initAreas(vm);
      
      vm.lineOption = {};

      getPhoneRetention();

      vm.selectedYear = 2016;
      vm.selectedPeriod = 'week';
    }

    //按周留存展示,默认也是按周
    function getPhoneRetention() {
      return retentionService
        .getPhoneRetention(vm.query)
        .then(function (res) {
          vm.retData = res;
          if(vm.selectedPeriod === 'week'){
            retentionService.parseRetentionData(vm, vm.retentionType);
            vm.lineOption = retentionService.getRetLineOption(vm);
          }else{
            retentionService.parseRetentionDataByMonth(vm, vm.retentionType);
            vm.lineOption = retentionService.getRetLineOptionByMonth(vm);
          }
         
        });
    }


    function onSearch() {
      getPhoneRetention();
    }

    function selectRateAvgType(type) {
      if (vm.rateAvgType === type) {
        return;
      }
      vm.rateAvgType = type;
      if(vm.selectedPeriod === 'week'){
         vm.lineOption = retentionService.getRetLineOption(vm);
       }else{
         vm.lineOption = retentionService.getRetLineOptionByMonth(vm);
       }
     
    }

    function selectYear(year) {
      if (vm.selectedYear === year) {
        return;
      }
      vm.selectedYear = year;
      vm.query.selectedYear = year;
      onSearch();
    }

     function selectPeriod(period) {
      if (vm.selectedPeriod === period) {
        return;
      }
      vm.selectedPeriod = period;
      vm.query.selectedPeriod = period;
      onSearch();
    }

  }
})();