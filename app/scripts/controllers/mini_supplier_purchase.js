(function () {
  'use strict';

  /**
   * @ngdoc function
   * @name chopperApp.controller:MiniSupplierCoverageCtrl
   * @description
   * # MiniSupplierCtrl
   * Controller of the chopperApp
   */
  angular.module('chopperApp')
    .controller('MiniSupplierPurchaseCtrl', MiniSupplierPurchaseCtrl);

  function MiniSupplierPurchaseCtrl(miniSupplierService, dateService, areaService, NgTableParams, $scope, notifyService) {
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
    vm.exportCsv = exportCsv;
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
          index: "buyPrice",             // 微仓出货额
          option: {}
        }
      };

      vm.csvHeader = ['时间', '大区', '城市', '微仓名称', '微仓号', '微仓负责人', '微仓负责人手机号', '微仓总进货额', '微仓总进货订单数', '微仓向品牌商进货额', '微仓向品牌商进货订单数', '微仓向批发商进货额', '微仓向批发商进货订单数', '微仓进货平均客单价'];

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
        sorting: { 'merchantName': "desc" }
      }, {
          dataset: dataArr
        });
    }

    function selectLineGroup(group, index) {
      vm.lineGroup[group].index = index;
      vm.lineGroup[group].option = miniSupplierService.getMiniSupplierPurchaseLineOption(vm.purchaseLineData, vm.lineGroup.first.index);
    }

    function parseRectData(compareData) {
      vm.rectData = compareData ? [
        //标题、数额、环比、同比
        { thead: '微仓总进货额', num: compareData.buyPrice, hbHide: true, tbHide: true },
        { thead: '微仓总进货订单数', num: compareData.buyQuantity, hbHide: true, tbHide: true },
        { thead: '微仓向品牌商进货额', num: compareData.brandPrice, hbHide: true, tbHide: true },
        { thead: '向品牌商进货订单数', num: compareData.brandQuantity, hbHide: true, tbHide: true },
        { thead: '微仓向批发商进货额', num: compareData.wholesalerPrice, hbHide: true, tbHide: true },
        { thead: '向批发商进货订单数', num: compareData.wholesalerQuantity, hbHide: true, tbHide: true },
        { thead: '微仓进货平均客单价', num: compareData.averageBuyPrice, hbHide: true, tbHide: true },
      ] : [];
    }

    function getMiniSupplierPurchaseOverallData() {
      return miniSupplierService
        .getMiniSupplierPurchaseOverallData(vm.query)
        .then(function (res) {
          parseRectData(res);
        });
    }

    function getMiniSupplierPurchaseLineData() {
      return miniSupplierService
        .getMiniSupplierPurchaseLineData(vm.query)
        .then(function(res){
          vm.purchaseLineData = res.lineData || [];
          vm.lineGroup.first.option = miniSupplierService.getMiniSupplierPurchaseLineOption(vm.purchaseLineData, vm.lineGroup.first.index);
        });
    }

    function getMiniSupplierPurchaseTableData() {
      miniSupplierService
        .getMiniSupplierPurchaseTableData(vm.query)
        .then(function (res) {
          vm.tableData = res || [];
          if (vm.tableData.length === 0) {
            notifyService.info("暂无数据");
          }
          initTable(vm.tableData);
        });
    }

    function onSearch() {
      // initTable();
      getMiniSupplierPurchaseOverallData();
      getMiniSupplierPurchaseLineData();
      getMiniSupplierPurchaseTableData();
    }

    function exportCsv() {
      return vm.tableData.map(function (item) {
        return {
          dt: item.dt,
          zoneName: item.zoneName,
          cityName: item.cityName,
          miniSupplierName: item.miniSupplierName,
          miniSupplierNo: item.miniSupplierNo,
          merchantName: item.merchantName,
          merchantPhone: item.merchantPhone,
          buyPrice: item.buyPrice,
          buyQuantity: item.buyQuantity,
          brandPrice: item.brandPrice,
          brandQuantity: item.brandQuantity,
          wholesalerPrice: item.wholesalerPrice,
          wholesalerQuantity: item.wholesalerQuantity,
          averageBuyPrice: item.buyPrice / item.buyQuantity
        }
      });
    }

  }
})();