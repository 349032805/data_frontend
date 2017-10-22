(function() {
'use strict';

/**
 * @ngdoc service
 * @name chopperApp.kpiService
 * @description
 * # kpiService
 * Factory in the chopperApp.
 */
angular.module('chopperApp')
  .factory('kpiService', kpiService);
  
  function kpiService(dataService, dateService) {
    // Public API here
    var exports = {
      getKpiData : getKpiData,
      getGaugeOption : getGaugeOption,
      
      //v2.0 api
      getKpi: getKpi,
      getKpiCompare: getKpiCompare,
      getLineOption: getLineOption
    };
    return exports;
    
    function getKpiData(params) {
      return dataService
        .getKpiData(params)
        .then(function(res){
          var kpiData = res.data.data.filter(function(item){
            return !!item.data;
          });
          kpiData.sort(function(a,b){
            return +b.data.saleQuantity - +a.data.saleQuantity;
          });
          return kpiData;
        }, function(res){
          console.log(res);
        });
    }
    
    function getKpi(params) {
      return dataService
        .getKpi(params)
        .then(function(res){
          return res.data;
        }, function(res){
          console.log(res);
        });
    }
    
    function getKpiCompare(params) {
      return dataService
        .getKpiCompare(params)
        .then(function(res){
          return res.data;
        }, function(res){
          console.log(res);
        });
    }
    
    function getGaugeOption(percentage) {
      return {
        tooltip: {
          formatter: "{a} <br/>{b} : {c}%"
        },
        toolbox: {
          show: true,
          feature: {
            mark: { show: true },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        series: [
          {
            name: '业务指标',
            type: 'gauge',
            startAngle: 180,
            endAngle: 0,
            center: ['50%', '90%'],    // 默认全局居中
            radius: 150,
            axisLine: {            // 坐标轴线
              lineStyle: {       // 属性lineStyle控制线条样式
                width: 80
              }
            },
            axisTick: {            // 坐标轴小标记
              splitNumber: 10,   // 每份split细分多少段
              length: 12,        // 属性length控制线长
            },
            axisLabel: {           // 坐标轴文本标签，详见axis.axisLabel
              formatter: function (v) {
                switch (v + '') {
                  case '10': return '低';
                  case '50': return '中';
                  case '90': return '高';
                  default: return '';
                }
              },
              textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                color: '#fff',
                fontSize: 15,
                fontWeight: 'bolder'
              }
            },
            pointer: {
              width: 20,
              length: '90%',
              color: 'rgba(255, 255, 255, 0.8)'
            },
            title: {
              show: true,
              offsetCenter: [0, '-60%'],       // x, y，单位px
              textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                color: '#fff',
                fontSize: 30
              }
            },
            detail: {
              show: true,
              backgroundColor: 'rgba(0,0,0,0)',
              borderWidth: 0,
              borderColor: '#ccc',
              width: 100,
              height: 40,
              offsetCenter: [0, -40],       // x, y，单位px
              formatter: '{value}%',
              textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                fontSize: 40
              }
            },
            data: [{ value: percentage, name: '完成率' }]
          }
        ]
      };
    }
    
    function getLineOption(lData, index) {
      var lineData = angular.copy(lData);
      var legend = lineData.map(function (item) {
        return item.name;
      });
      var series = lineData.map(function (item) {
        // item.dailyData.reverse();
        return {
          name: item.name,
          type: 'line',
          smooth: true,
          itemStyle: { normal: { areaStyle: { type: 'default' } } },
          data: item.dailyData.map(function (pItem) {
            var v = pItem[index];
            return v !== null &&  v !== undefined ? v : '-';
          })
        }
      });
      var xAxis = lineData[0].dailyData.map(function (item) {
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