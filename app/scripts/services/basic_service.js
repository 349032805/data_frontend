(function () {
  'use strict';

  /**
   * @ngdoc service
   * @name chopperApp.basicService
   * @description
   * # basicService
   * Factory in the chopperApp.
   */
  angular.module('chopperApp')
    .factory('basicService', basicService);

  function basicService(dataService, dateService) {
    // Public API here
    var exports = {
      getLineOption: getLineOption,
      getCustomerTransactions: getCustomerTransactions,
    };
    return exports;

    function getCustomerTransactions(params) {
      return dataService
        .getCustomerTransactions(params)
        .then(function (res) {
          return res.data;
        }, function (res) {
          console.log(res);
        });
    }

    function getLineOption(lineData, index) {
      var legend = lineData.map(function (item) {
        return item.name;
      });
      var series = lineData.map(function (item) {
        item.pictureData.sort(function (a, b) {
          return a.dt > b.dt ? 1 : -1;
        });
        return {
          name: item.name,
          type: 'line',
          smooth: true,
          itemStyle: { normal: { areaStyle: { type: 'default' } } },
          data: item.pictureData.map(function (pItem) {
            var v = pItem[index];
            return v !== null &&  v !== undefined ? v : '-';
          })
        }
      });
      var xAxis = lineData[0].pictureData.map(function (item) {
        return dateService.toString(item.dt);
      });
      
      return {
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          x: 'left',
          data: legend
        },
        toolbox: {
          show: true,
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ['line', 'bar', 'stack', 'tiled'] },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            data: xAxis
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: series
      };
    }
  }

})();
