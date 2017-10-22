(function () {
  'use strict';

  /**
   * @ngdoc function
   * @name chopperApp.controller:MarketingBasicCtrl
   * @description
   * # MarketingBasicCtrl
   * Controller of the chopperApp
   */
  angular.module('chopperApp')
    .controller('MarketingBasicCtrl', MarketingBasicCtrl);

  function MarketingBasicCtrl(marketingService, areaService, dateService) {
    var vm = this;
    vm.openDatepicker = openDatepicker;
    vm.selectStart = selectStart;
    vm.selectEnd = selectEnd;
    // vm.selectLineGroup = selectLineGroup;
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
      vm.yesterday = dateService.getDaysFromNow(-1);

      areaService.initAreas(vm);
      
      vm.orderOption = {};
      vm.storeOption = {};
      vm.totalOption = {};
      
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
    }

    function onSearch() {
      getMarketingBasicData();
    }
    
    function getMarketingBasicData() {
      return marketingService
        .getMarketingBasicData(vm.query)
        .then(function(res){
          vm.basicDatas = res.lineData || [];
          vm.orderOption = marketingService.getLineOption(vm.basicDatas, "orderQuantity");
          vm.storeOption = marketingService.getLineOption(vm.basicDatas, "storeNumbers", true);
          vm.totalOption = marketingService.getLineOption(vm.basicDatas, "totalUniqPhone", true);
        });
    }

  }
})();