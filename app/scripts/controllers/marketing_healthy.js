(function () {
  'use strict';

  /**
   * @ngdoc function
   * @name chopperApp.controller:MarketingHealthyCtrl
   * @description
   * # MarketingHealthyCtrl
   * Controller of the chopperApp
   */
  angular.module('chopperApp')
    .controller('MarketingHealthyCtrl', MarketingHealthyCtrl);

  function MarketingHealthyCtrl(marketingService, areaService, dateService, notifyService, monitorService) {
    var vm = this;
    vm.openDatepicker = openDatepicker;
    vm.selectStart = selectStart;
    vm.selectEnd = selectEnd;
    vm.selectPlatform = selectPlatform;
    vm.onSearch = onSearch;
    vm.selectZones = areaService.selectZones;
    vm.selectCitys = areaService.selectCitys;
    vm.selectAreas = areaService.selectAreas;
    vm.exportRateCscData = exportRateCscData;
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
      vm.rateOption = {};
      
      areaService.initAreas(vm);
      
      vm.perUv = {
        platform: "zm-web-1.0.0",
        option: {}
      };
      
      onSearch();
      vm.csvHeader = ["日期", "地区", "订单数", "UV", "订单UV比"];
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
      getOrderPerUvRate();
      getOrderPerUvExportRate();
    }
    
    function getOrderPerUvRate() {
      return marketingService
        .getOrderPerUvRate(vm.query)
        .then(function(res){
          vm.uvRate = res || [];
          if (vm.uvRate.length === 0) {
            notifyService.success("没有数据");
            vm.perUv.option = {};
          } else {
            filterPlatform(vm.uvRate);
            vm.perUv.option = marketingService.getLineOption(vm.uvRate, "rate");
          }
        })
    }
    
    function filterPlatform(uvRate) {
      var platforms = [];
      for(var i = 0, len = uvRate[0].list.length; i < len; i++) {
        var item = uvRate[0].list[i];
        platforms.indexOf(item.source) < 0 ? platforms.push(item.source) : null;
      }
      vm.platforms = platforms;
      vm.perUv.platform = platforms[0];
    }
    
    function selectPlatform(platform) {
      vm.perUv.option = marketingService.getLineOption(vm.uvRate, "rate");
    }
    
    function getOrderPerUvExportRate() {
      return marketingService
        .getOrderPerUvExportRate(vm.query)
        .then(function(res){
          vm.exportRateDatas = res || [];
        });
    }
    
    function exportRateCscData() {
      return vm.exportRateDatas.map(function(item){
        return {
          dt: item.dt,
          districtName: item.districtName,
          orderQuantity: item.orderQuantity,
          uv: item.uv,
          rate: item.rate
        }
      });
    }
    
  }
})();