(function () {
  'use strict';

  /**
   * @ngdoc function
   * @name chopperApp.controller:MiniSupplierSaleCtrl
   * @description
   * # MiniSupplierSaleCtrl
   * Controller of the chopperApp
   */
  angular.module('chopperApp')
    .controller('MiniSupplierSaleCtrl', MiniSupplierSaleCtrl);

  function MiniSupplierSaleCtrl(miniSupplierService, dateService, areaService, NgTableParams, $scope, notifyService) {
    var vm = this;
    vm.isMiniSupplier = true;
    vm.openDatepicker = openDatepicker;
    vm.selectStart = selectStart;
    vm.selectEnd = selectEnd;
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

      vm.salePieData = {};

      onSearch();
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

    function initTable(dataArr) {
      vm.tableParams = new NgTableParams({
        page: 1, // show first page
        count: 10, // count per page
        sorting: { 'rank': "asc" }
      }, {
          dataset: dataArr
        });
    }

    function parseRectData(compareData) {
      vm.rectData = compareData ? [
        //标题、数额、环比、同比
        { thead: '微仓总出货额', num: compareData.salePrice ? compareData.salePrice.toFixed(2) : 0, hbHide: true, tbHide: true },
        { thead: '微仓总出货订单数', num: compareData.saleQuantity, hbHide: true, tbHide: true },
        { thead: '微仓余货额', num: compareData.stockMoney ? compareData.stockMoney.toFixed(2) : 0, hbHide: true, tbHide: true },
        { thead: '微仓损耗金额', num: compareData.lossPrice ? compareData.lossPrice.toFixed(2) : 0, hbHide: true, tbHide: true },
        { thead: '微仓出货客单价', num: compareData.averageSalePrice ? compareData.averageSalePrice.toFixed(2) : 0, hbHide: true, tbHide: true }
      ] : [];
    }

    function getMiniSupplierSaleOverallData() {
      return miniSupplierService
        .getMiniSupplierSaleOverallData(vm.query)
        .then(function (res) {
          parseRectData(res);
        });
    }

    function getMiniSupplierSalePieData() {
      return miniSupplierService
        .getMiniSupplierSalePieData(vm.query)
        .then(function(res){
          vm.salePieData = res.lineData[0].list || [];
          vm.activity.pieOption = miniSupplierService.getMiniSupplierSalePieOption(vm.salePieData);
        });
    }

    function getMiniSupplierSaleTableData() {
      miniSupplierService
        .getMiniSupplierSaleTableData(vm.query)
        .then(function (res) {
          vm.tableData = res || []
          if (vm.tableData.length === 0) {
            notifyService.info("暂无数据");
          }
          vm.tableData = res.map(function(item) {
            return {
              rank: res.indexOf(item),
              productId: item.productId,
              productName: item.productName,
              productAvgPrice: item.productAvgPrice ? item.productAvgPrice : 0,
              supplier: item.supplier,
              productSalePrice: item.productSalePrice ? item.productSalePrice : 0,
              productSaleQuantity: item.productSaleQuantity,
              profits: item.profits ? item.profits : 0,
              profitsRate: item.profitsRate ? item.profitsRate : 0
            }
          })
          initTable(vm.tableData);
        });
    }

    function onSearch() {
      getMiniSupplierSaleOverallData();
      getMiniSupplierSalePieData();
      getMiniSupplierSaleTableData();
    }

  }
})();