(function () {
  'use strict';

  /**
   * @ngdoc service
   * @name chopperApp.bonusService
   * @description
   * # bonusService
   * Factory in the chopperApp.
   */
  angular.module('chopperApp')
    .factory('bonusService', bonusService);

  function bonusService(dataService, dateService) {
    // Public API here
    var exports = {
      getSubsidy: getSubsidy,
      getSubsidyDetail: getSubsidyDetail,
      getCustomerBonus: getCustomerBonus,
      getBonusLineOption: getBonusLineOption,
    };
    var legendObj = {
      "bonusNum": [{ name: "已发红包数", index: "bonusRecivedNumbers" }, { name: "已使用红包数", index: "bonusUsedNumbers" }, { name: "占比", index: "bonusUsedCompare" }],
      "bonusMoney": [{ name: "已发红包金额", index: "bonusRecivedAmount" }, { name: "已使用红包金额", index: "bonusUsedAmount" }],
      "uniqueUser": [{ name: "红包领取新用户人数", index: "newCustomerReceviedNumbers" }, { name: "红包使用新用户人数", index: "newCustomerUsedNumbers" }, { name: "占比", index: "newCustomerUsedCompare" }],
      "sharedTimes": [{ name: "可分享次数", index: "bonusQualifiedSharedTimes" }, { name: "已分享次数", index: "bonusSharedTimes" }, { name: "占比", index: "bonusSharedCompare" }],
      "customerNumbers": [{ name: "领取人数", index: "customerReceviedNumbers" }, { name: "使用人数", index: "customerUsedNumbers" }, { name: "占比", index: "customerUsedCompare" }],
      "bonusRecivedCompare": [{ name: "红包领取数量比红包分享数量", index: "bonusRecivedCompare" }]
    }
    return exports;

    function getSubsidy() {
      return dataService
        .getSubsidy()
        .then(function (res) {
          return res;
        }, function (res) {
          console.log(res);
        });
    }

    function getSubsidyDetail(params) {
      return dataService
        .getSubsidyDetail(params)
        .then(function (res) {
          return res;
        }, function (res) {
          console.log(res);
        });
    }

    function getCustomerBonus(params) {
      return dataService
        .getCustomerBonus(params)
        .then(function (res) {
          return res;
        }, function (res) {
          console.log(res);
        });
    }


    function getBonusLineOption(lineData, index) {
      var legend = legendObj[index].map(function (item) {
        return item.name;
      });
      var xAxis = lineData.map(function (item) {
        return item.dt;
      });

      var series = legendObj[index].map(function (item) {
        return {
          name: item.name,
          type: 'line',
          smooth: true,
          // itemStyle: { normal: { areaStyle: { type: 'default' } } },
          data: lineData.map(function (pItem) {
            var v = pItem[item.index];
            return v !== null &&  v !== undefined ? v : '-';
          })
        }
      });
      if (series.length > 2) {
        series[2].yAxisIndex = 1;
      }
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
          },
          {
            type: 'value',
            name: '占比'
          }
        ],
        series: series
      };
    }

  }
})();