(function () {
  'use strict';

  /**
   * @ngdoc service
   * @name chopperApp.competitionService
   * @description
   * # competitionService
   * Factory in the chopperApp.
   */
  angular.module('chopperApp')
    .factory('competitionService', competitionService);

  function competitionService(dataService) {
    // Public API here
    var exports = {
      getCompetitionData: getCompetitionData,
      getCompLineOption: getCompLineOption
    }
    return exports;

    function getCompetitionData(params) {
      return dataService
        .getCompetitionData(params)
        .then(function (res) {
          return res.data;
        })
    }
    
    function getCompLineOption(lineData, index) {
      var legend = lineData.map(function (item) {
        return item.name;
      });
      var xAxis = lineData[0].list.map(function (item) {
        return item.dt;
      });
      var series = lineData.map(function (item) {
        return {
          name: item.name,
          type: 'line',
          smooth: true,
          // itemStyle: { normal: { areaStyle: { type: 'default' } } },
          data: item.list.map(function (pItem) {
            var v = pItem[index];
            return v !== null &&  v !== undefined ? v : '-';
          })
        }
      });
      return getLineOption(legend, xAxis, series);
    }
    
    function getLineOption(legend, xAxis, series) {
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
        // calculable: false,
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