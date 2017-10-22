(function () {
  'use strict';

  /**
   * @ngdoc service
   * @name chopperApp.csvDataService
   * @description
   * # csvDataService
   * Factory in the chopperApp.
   */
  angular.module('chopperApp')
    .factory('csvDataService', csvDataService);

  function csvDataService() {
    // Public API here
    var exports = {
      getUserCsvData: getUserCsvData,
      getKpiCsvData: getKpiCsvData,
      getBaseNightCatCsvData : getBaseNightCatCsvData,
      getMiniSupplierCsvData : getMiniSupplierCsvData,
      getNightCatStoreCsvData : getNightCatStoreCsvData,
    };
    return exports;

    function getUserCsvData(userData) {
      var csvArr = [];
      for (var i = 0, len = userData.length; i < len; i++) {
        var item = userData[i];
        for (var j = 0; j < item.data.length; j++) {
          var d = item.data[j];
          csvArr.push({
            name: item.name,
            date: d.date,
            saleMoney: d.saleMoney,
            saleQuantity: d.saleQuantity,
            canceledQuantity: d.canceledQuantity,
            // newPhoneCount: d.newPhoneCount,
            singMoney: d.singMoney,
            additionalQuantity: d.additionalQuantity,
            additionalMoney: d.additionalMoney,
            proportion: d.proportion,
          });
        }
      }
      return csvArr;
    }

    function getKpiCsvData(kpiData) {
      var csvArr = [];
      for (var i = 0, len = kpiData.length; i < len; i++) {
        var item = kpiData[i];
        var d = item.data;
        if (d) {
          csvArr.push({
            order: i+1,
            name: item.name,
            saleQuantity: d.saleQuantity,
            saleMoney: d.saleMoney,
            singMoney: d.singMoney,
            proportion: d.proportion,
            grossProfitRate: d.grossProfitRate,
            grossProfit: d.grossProfit,
          });
        }
      }
      return csvArr;
    }

    function getBaseNightCatCsvData(baseNightCatData) {
      var csvArr = [];
      for (var i = 0, len = baseNightCatData.length; i < len; i++) {
        var item = baseNightCatData[i];
        for (var j = 0; j < item.data.length; j++) {
          var d = item.data[j];
          csvArr.push({
            name: item.name,
            date: d.date,
            nightCat: d.nightCat,
            nightCatOpen: d.nightCatOpen,
            avgBusinessTime: d.avgBusinessTime,
            avgResponseTime: d.avgResponseTime,
            shopowner: d.shopowner,
            offlineCount: d.offlineCount,
            offlineMoney: d.offlineMoney,
          });
        }
      }
      return csvArr;
    }
    
    function getMiniSupplierCsvData(miniSupplierData) {
      var csvArr = [];
      for (var i = 0, len = miniSupplierData.length; i < len; i++) {
        var item = miniSupplierData[i];
        for (var j = 0; j < item.data.length; j++) {
          var d = item.data[j];
          csvArr.push({
            name: item.name,
            date: d.date,
            buyMoney: d.buyMoney,
            saleMoney: d.saleMoney,
            buyQuantity: d.buyQuantity,
            saleQuantity: d.saleQuantity,
            
            yemaoPaidMoney: d.yemaoPaidMoney,
            yemaoPaidQuantity: d.yemaoPaidQuantity,
            // miniPaidMoney: d.miniPaidMoney,
            // miniPaidQuantity: d.miniPaidQuantity
          });
        }
      }
      return csvArr;
    }
    
    function getNightCatStoreCsvData(data) {
      var csvArr = [];
      for (var i = 0, len = data.length; i < len; i++) {
        var item = data[i];
        csvArr.push({
          name: item.name,
          storeId: item.storeId,
          stockSku: item.stockSku,
          stockQuantity: item.stockQuantity,
          stockMoney: item.stockMoney,
          buyFrequency: item.buyFrequency,
        });
      }
      return csvArr;
    }

  }

})();