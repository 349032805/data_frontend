(function () {
  'use strict';

  /**
   * @ngdoc service
   * @name chopperApp.realtimeService
   * @description
   * # realtimeService
   * Factory in the chopperApp.
   */
  angular.module('chopperApp')
    .factory('realtimeService', realtimeService);

  function realtimeService(dataService) {
    // Public API here
    var exports = {
      getRealTimeProvData: getRealTimeProvData,
      getRealTimeAllUntilNow: getRealTimeAllUntilNow,
      getRealTimePerSecond: getRealTimePerSecond,
      getChinaMapOption: getChinaMapOption,
      getRealTimeLineOption: getRealTimeLineOption,
      
      getRealTimeStore: getRealTimeStore,
      getReatimeStoreByMiniSupplier: getReatimeStoreByMiniSupplier,
      getReatimeStoreByMiniSection: getReatimeStoreByMiniSection,
      getReatimeStoreByStore: getReatimeStoreByStore,
    };
    var legendObj = {
      "sales": [{ name: "用户订单金额", index: "sumSales" }, { name: "用户订单金额增量", index: "sumSalesGrowth" }],
      "salesVolume": [{ name: "用户订单数", index: "sumSalesVulume" }, { name: "用户订单数增量", index: "salesVolumeGrowth" }]
    };
    return exports;

    function getRealTimeProvData() {
      return dataService
        .getRealTimeProvData()
        .then(function (res) {
          return res.data;
        }, function (res) {
          console.log(res);
        });
    }
    
    function getRealTimeAllUntilNow(params) {
      return dataService
        .getRealTimeAllUntilNow(params)
        .then(function (res) {
          return res.data;
        }, function (res) {
          console.log(res);
        });
    }
    
    function getRealTimePerSecond() {
      return dataService
        .getRealTimePerSecond()
        .then(function (res) {
          return res.data;
        }, function (res) {
          console.log(res);
        });
    }
    
    function getRealTimeStore(params) {
      return dataService
        .getRealTimeStore(params)
        .then(function (res) {
          return res.data;
        }, function (res) {
          console.log(res);
        });
    }
    
    function getReatimeStoreByMiniSupplier(params) {
      return dataService
        .getReatimeStoreByMiniSupplier(params)
        .then(function (res) {
          return res.data;
        }, function (res) {
          console.log(res);
        });
    }
    
    function getReatimeStoreByMiniSection(params) {
      return dataService
        .getReatimeStoreByMiniSection(params)
        .then(function (res) {
          return res.data;
        }, function (res) {
          console.log(res);
        });
    }
    
    function getReatimeStoreByStore(params) {
      return dataService
        .getReatimeStoreByStore(params)
        .then(function (res) {
          return res.data;
        }, function (res) {
          console.log(res);
        });
    }
    
    function getRealTimeLineOption(lineData, index) {
      var legend = legendObj[index].map(function(item){
        return item.name;
      });
      var xAxis = lineData.map(function (item) {
        return item.createdAt;
      });
      
      var series = legendObj[index].map(function (item,index) {
        return {
          name: item.name,
          type: 'line',
          smooth: true,
          yAxisIndex: index,
          itemStyle: { normal: { areaStyle: { type: 'default' } } },
          data: lineData.map(function (pItem) {
            var v = pItem[item.index];
            return v !== null &&  v !== undefined ? v : '-';
          })
        }
      });
      series[0].itemStyle = {};
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
        calculable: false,
        animation: false,
        dataZoom: {
          show: true,
          start : 95
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
            type: 'value',
            name: '总量'
          },
          {
            type: 'value',
            name: '增量'
          }
        ],
        series: series
      };
    }

    function getIndexName(index) {
      return index === "sumSale" ? "总交易额"
        : index === "sumSalesVolume" ? "用户订单数"
          : index === "sales" ? "用户订单金额"
            : index === "sumMiniSupplierSales" ? "微仓出货金额"
              : index === "sumUniqCustomerNumber" ? "独立用户数"
                : index === "storeNumber" ? "有单夜猫店数"
                  : index;
    }

    function getChinaMapOption(provData, index) {
      var itemName = getIndexName(index);
      var sd = provData.map(function (item) {
        return { name: item.provinceName, value: item[index] };
      })
      var max = Math.max.apply(Math, sd.map(function (item) { return +item.value; }));
      max = getCeilHundred(max);
      return getMapOption(itemName, max, sd);
    }

    function getCeilHundred(num) {
      return Math.ceil(num / 100) * 100;
    }
    
    // function getMapOption(itemName, max, sd) {
    //   var markLineData = sd.map(function(item){
    //     return [
    //       {name:item.name}, {name:item.name,value:item.value}
    //     ];
    //   });
    //   var color = ['#a6c84c', '#ffa022', '#46bee9'];
    //   return {
    //     backgroundColor: '#404a59',
    //     tooltip : {
    //         trigger: 'item'
    //     },
    //     legend: {
    //         orient: 'vertical',
    //         left: 'left',
    //         selectedMode: false,
    //         data:[itemName],
    //         textStyle: {
    //             color: '#fff'
    //         },
    //         selectedMode: 'single'
    //     },
    //     toolbox: {
    //         show: true,
    //         orient : 'vertical',
    //         left: 'right',
    //         top: 'center',
    //         feature : {
    //             mark : {show: true},
    //             dataView : {show: true, readOnly: false},
    //             restore : {show: true},
    //             saveAsImage : {show: true}
    //         }
    //     },
    //     geo: {
    //         map: 'china',
    //         label: {
    //             emphasis: {
    //                 show: false
    //             }
    //         },
    //         // roam: true,
    //         itemStyle: {
    //             normal: {
    //                 areaColor: '#323c48',
    //                 borderColor: '#404a59'
    //             },
    //             emphasis: {
    //                 areaColor: '#2a333d'
    //             }
    //         }
    //     },
    //     series : [
    //       {
    //           name: itemName,
    //           type: 'lines',
    //           zlevel: 1,
    //           effect: {
    //               show: true,
    //               period: 6,
    //               trailLength: 0.7,
    //               color: '#fff',
    //               symbolSize: 3
    //           },
    //           lineStyle: {
    //               normal: {
    //                   color: color[0],
    //                   width: 0,
    //                   curveness: 0.2
    //               }
    //           },
    //           geoCoord: {
    //               "西藏": [88.7695, 31.6846],
    //               "上海": [121.4648, 31.2891],
    //               "福建": [118.3008, 25.9277],
    //               "广西": [108.2813, 23.6426],
    //               "广东": [113.4668, 22.8076],
    //               "山西": [112.4121, 37.6611],
    //               "云南": [101.8652, 25.1807],
    //               "海南": [109.9512, 19.2041],
    //               "辽宁": [122.3438, 41.0889],
    //               "江西": [116.0156, 27.29],
    //               "吉林": [126.4746, 43.5938],
    //               "青海": [96.2402, 35.4199],
    //               "宁夏": [105.9961, 37.3096],
    //               "内蒙古": [117.5977, 44.3408],
    //               "四川": [102.9199, 30.1904],
    //               "陕西": [109.5996, 35.6396],
    //               "重庆": [107.7539, 30.1904],
    //               "江苏": [120.0586, 32.915],
    //               "贵州": [106.6113, 26.9385],
    //               "北京": [116.4551, 40.2539],
    //               "新疆": [84.9023, 41.748],
    //               "浙江": [120.498, 29.0918],
    //               "甘肃": [95.7129, 40.166],
    //               "天津": [117.4219, 39.4189],
    //               "河南": [113.4668, 33.8818],
    //               "黑龙江": [128.1445, 48.5156],
    //               "河北": [115.4004, 37.9688],
    //               "湖南": [111.5332, 27.3779],
    //               "安徽": [117.2461, 32.0361],
    //               "湖北": [112.2363, 31.1572],
    //               "山东": [118.7402, 36.4307]
    //             },
    //           data: sd
    //       },
    //       {
    //           name: itemName,
    //           type: 'lines',
    //           zlevel: 2,
    //           effect: {
    //               show: true,
    //               period: 6,
    //               trailLength: 0,
    //               // symbol: planePath,
    //               symbolSize: 15
    //           },
    //           lineStyle: {
    //               normal: {
    //                   color: color[0],
    //                   width: 1,
    //                   opacity: 0.4,
    //                   curveness: 0.2
    //               }
    //           },
    //           geoCoord: {
    //               "西藏": [88.7695, 31.6846],
    //               "上海": [121.4648, 31.2891],
    //               "福建": [118.3008, 25.9277],
    //               "广西": [108.2813, 23.6426],
    //               "广东": [113.4668, 22.8076],
    //               "山西": [112.4121, 37.6611],
    //               "云南": [101.8652, 25.1807],
    //               "海南": [109.9512, 19.2041],
    //               "辽宁": [122.3438, 41.0889],
    //               "江西": [116.0156, 27.29],
    //               "吉林": [126.4746, 43.5938],
    //               "青海": [96.2402, 35.4199],
    //               "宁夏": [105.9961, 37.3096],
    //               "内蒙古": [117.5977, 44.3408],
    //               "四川": [102.9199, 30.1904],
    //               "陕西": [109.5996, 35.6396],
    //               "重庆": [107.7539, 30.1904],
    //               "江苏": [120.0586, 32.915],
    //               "贵州": [106.6113, 26.9385],
    //               "北京": [116.4551, 40.2539],
    //               "新疆": [84.9023, 41.748],
    //               "浙江": [120.498, 29.0918],
    //               "甘肃": [95.7129, 40.166],
    //               "天津": [117.4219, 39.4189],
    //               "河南": [113.4668, 33.8818],
    //               "黑龙江": [128.1445, 48.5156],
    //               "河北": [115.4004, 37.9688],
    //               "湖南": [111.5332, 27.3779],
    //               "安徽": [117.2461, 32.0361],
    //               "湖北": [112.2363, 31.1572],
    //               "山东": [118.7402, 36.4307]
    //             },
    //           data: sd
    //       },
    //         {
    //             name: itemName,
    //             type: 'effectScatter',
    //             coordinateSystem: 'geo',
    //             zlevel: 2,
    //             rippleEffect: {
    //                 brushType: 'stroke'
    //             },
    //             label: {
    //               normal: {
    //                   show: true,
    //                   position: 'right',
    //                   formatter: '{b}'
    //               }
    //             },
    //             symbolSize: function (val) {
    //                 return val[2] / 8;
    //             },
    //             itemStyle: {
    //                 normal: {
    //                     color: color[0]
    //                 }
    //             },
    //             // markPoint: {
    //             //   symbol: 'emptyCircle',
    //             //   symbolSize: function (v) {
    //             //     // return Math.log(v) / Math.log(max) * 30;
    //             //     return v / max * 30;
    //             //   },
    //             //   effect: {
    //             //     show: true,
    //             //     shadowBlur: 0
    //             //   },
    //             //   itemStyle: {
    //             //     normal: {
    //             //       // color: '#00ffff',
    //             //       color: 'lime',
    //             //       label: { show: false }
    //             //     },
    //             //     emphasis: {
    //             //       label: { position: 'top' }
    //             //     }
    //             //   },
    //             //   data: sd
    //             // },
    //             geoCoord: {
    //               "西藏": [88.7695, 31.6846],
    //               "上海": [121.4648, 31.2891],
    //               "福建": [118.3008, 25.9277],
    //               "广西": [108.2813, 23.6426],
    //               "广东": [113.4668, 22.8076],
    //               "山西": [112.4121, 37.6611],
    //               "云南": [101.8652, 25.1807],
    //               "海南": [109.9512, 19.2041],
    //               "辽宁": [122.3438, 41.0889],
    //               "江西": [116.0156, 27.29],
    //               "吉林": [126.4746, 43.5938],
    //               "青海": [96.2402, 35.4199],
    //               "宁夏": [105.9961, 37.3096],
    //               "内蒙古": [117.5977, 44.3408],
    //               "四川": [102.9199, 30.1904],
    //               "陕西": [109.5996, 35.6396],
    //               "重庆": [107.7539, 30.1904],
    //               "江苏": [120.0586, 32.915],
    //               "贵州": [106.6113, 26.9385],
    //               "北京": [116.4551, 40.2539],
    //               "新疆": [84.9023, 41.748],
    //               "浙江": [120.498, 29.0918],
    //               "甘肃": [95.7129, 40.166],
    //               "天津": [117.4219, 39.4189],
    //               "河南": [113.4668, 33.8818],
    //               "黑龙江": [128.1445, 48.5156],
    //               "河北": [115.4004, 37.9688],
    //               "湖南": [111.5332, 27.3779],
    //               "安徽": [117.2461, 32.0361],
    //               "湖北": [112.2363, 31.1572],
    //               "山东": [118.7402, 36.4307]
    //             },
    //             data: sd
    //         }
    //     ]
    // };

    // }

    function getMapOption(itemName, max, sd) {
      var markLineData = sd.map(function(item){
        return [
          {name:item.name}, {name:item.name,value:item.value}
        ];
      })
      return {
        backgroundColor: '#1b1b1b',
        // color: ['gold','aqua','lime'],
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          x: 'left',
          selectedMode: false,
          data: [itemName]
        },
        dataRange: {
          min: 0,
          max: max,
          x: 'left',
          y: 'bottom',
          // color: ['#1e90ff', '#f0ffff'],
          color: ['#1b1b1b', '#1b1b1b'],
          formatter: '{value} ~ {value2}'
          // text: ['高', '低']           // 文本，默认为数值文本
          // calculable: true
        },
        toolbox: {
          show: true,
          orient: 'vertical',
          x: 'right',
          y: 'center',
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        roamController: {
          show: true,
          x: 'right',
          mapTypeControl: {
            'china': true
          }
        },
        series: [
          {
            name: itemName,
            type: 'map',
            mapType: 'china',
            roam: false,
            showLegendSymbol: false,
            itemStyle: {
              normal: {
                borderColor: 'rgba(100,149,237,1)',
                borderWidth: 0.5,
                areaStyle: {
                  color: '#1b1b1b'
                }
              }
            },
            markPoint: {
              symbol: 'emptyCircle',
              symbolSize: function (v) {
                // return Math.log(v) / Math.log(max) * 30;
                return v / max * 30;
              },
              effect: {
                show: true,
                shadowBlur: 0
              },
              itemStyle: {
                normal: {
                  // color: '#00ffff',
                  color: 'lime',
                  label: { show: false }
                },
                emphasis: {
                  label: { position: 'top' }
                }
              },
              data: sd
            },
            markLine: {
              smooth: true,
              symbol: ['none', 'circle'],
              symbolSize: 1,
              itemStyle: {
                normal: {
                  color: '#fff',
                  borderWidth: 1,
                  borderColor: 'rgba(30,144,255,0.5)'
                }
              },
              data: markLineData
            },
            data: sd,
            geoCoord: {
              "西藏": [88.7695, 31.6846],
              "上海": [121.4648, 31.2891],
              "福建": [118.3008, 25.9277],
              "广西": [108.2813, 23.6426],
              "广东": [113.4668, 22.8076],
              "山西": [112.4121, 37.6611],
              "云南": [101.8652, 25.1807],
              "海南": [109.9512, 19.2041],
              "辽宁": [122.3438, 41.0889],
              "江西": [116.0156, 27.29],
              "吉林": [126.4746, 43.5938],
              "青海": [96.2402, 35.4199],
              "宁夏": [105.9961, 37.3096],
              "内蒙古": [117.5977, 44.3408],
              "四川": [102.9199, 30.1904],
              "陕西": [109.5996, 35.6396],
              "重庆": [107.7539, 30.1904],
              "江苏": [120.0586, 32.915],
              "贵州": [106.6113, 26.9385],
              "北京": [116.4551, 40.2539],
              "新疆": [84.9023, 41.748],
              "浙江": [120.498, 29.0918],
              "甘肃": [95.7129, 40.166],
              "天津": [117.4219, 39.4189],
              "河南": [113.4668, 33.8818],
              "黑龙江": [128.1445, 48.5156],
              "河北": [115.4004, 37.9688],
              "湖南": [111.5332, 27.3779],
              "安徽": [117.2461, 32.0361],
              "湖北": [112.2363, 31.1572],
              "山东": [118.7402, 36.4307]
            }
          }
        ]
      };

    }

  }
})();