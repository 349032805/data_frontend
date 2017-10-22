(function () {
  'use strict';

  /**
   * @ngdoc service
   * @name chopperApp.miniSupplierService
   * @description
   * # miniSupplierService
   * Factory in the chopperApp.
   */
  angular.module('chopperApp')
    .factory('miniSupplierService', miniSupplierService);

  function miniSupplierService(dataService, dateService) {
    // Public API here
    var exports = {
      // getMiniSupplierList: getMiniSupplierList,
      // getMiniSupplierSum: getMiniSupplierSum,
      // getCities: getCities,
      // getMiniSuppliersByCity: getMiniSuppliersByCity,
      // getSectionsByCity: getSectionsByCity,
      // getMiniNightCatStoreData: getMiniNightCatStoreData,
      
      // v2.0 api
      getMiniSupplierLineChartData: getMiniSupplierLineChartData,
      getMiniSupplierTableData: getMiniSupplierTableData,
      getMiniSupplierCoverageTableData: getMiniSupplierCoverageTableData,
      getMiniSupplierCoverageLineData: getMiniSupplierCoverageLineData,
      getMiniSupplierLineOption: getMiniSupplierLineOption,
      getMiniSupplierCoverageLineOption: getMiniSupplierCoverageLineOption,
      getMiniSupplierPurchaseOverallData : getMiniSupplierPurchaseOverallData,
      getMiniSupplierPurchaseTableData : getMiniSupplierPurchaseTableData,
      getMiniSupplierPurchaseLineData : getMiniSupplierPurchaseLineData,
      getMiniSupplierPurchaseLineOption : getMiniSupplierPurchaseLineOption,
      getMiniSupplierSaleOverallData : getMiniSupplierSaleOverallData,
      getMiniSupplierSaleTableData : getMiniSupplierSaleTableData,
      getMiniSupplierSalePieData : getMiniSupplierSalePieData,
      getMiniSupplierSalePieOption : getMiniSupplierSalePieOption,

      getSupplierData: getSupplierData,
      getWholeSalersData: getWholeSalersData,
      getBrandsData: getBrandsData,
      getSalersLineOption: getSalersLineOption,
    };
    return exports;

    // function getMiniSupplierList(params) {
    //   return dataService
    //     .getMiniSupplierList(params)
    //     .then(function (res) {
    //       res.data = res.data.filter(function (item) {
    //         return item.data.length > 0;
    //       });
    //       res.data.forEach(function (district) {
    //         if (district.data.length > 0) {
    //           district.processedData = district.data
    //             .reduce(function (previousValue, currentValue, index, array) {
    //               var ret = previousValue;
    //               ret.buyMoney += currentValue.buyMoney;
    //               ret.saleMoney += currentValue.saleMoney;
    //               ret.buyQuantity += currentValue.buyQuantity;
    //               ret.saleQuantity += currentValue.saleQuantity;
    //               // ret.loss += currentValue.loss;
    //               // ret.grossProfitRate += currentValue.grossProfitRate;
    //               // ret.grossProfit += currentValue.grossProfit;
    //               ret.yemaoPaidMoney += currentValue.yemaoPaidMoney;
    //               ret.yemaoPaidQuantity += currentValue.yemaoPaidQuantity;
    //               // ret.miniPaidMoney += currentValue.miniPaidMoney;
    //               // ret.miniPaidQuantity += currentValue.miniPaidQuantity;
    //               return ret;
    //             }, {
    //                 buyMoney: 0,
    //                 saleMoney: 0,
    //                 buyQuantity: 0,
    //                 saleQuantity: 0,
    //                 // loss: 0,
    //                 // grossProfitRate: 0,
    //                 // grossProfit: 0,
    //                 yemaoPaidMoney: 0,
    //                 yemaoPaidQuantity: 0,
    //                 // miniPaidMoney: 0,
    //                 // miniPaidQuantity: 0,
    //               });
    //         } else if (district.data.length === 1) {
    //           district.processedData = district.data[0];
    //         }
    //       });

    //       return res.data;
    //     }, function (res) {
    //       console.log(res);
    //     });
    // }

    // function getMiniSupplierSum(params) {
    //   return dataService
    //     .getMiniSupplierSum(params)
    //     .then(function (res) {
    //       return res.data;
    //     }, function (res) {
    //       console.log(res);
    //     });
    // }

    // function getCities() {
    //   return dataService
    //     .getCities()
    //     .then(function (res) {
    //       return res.data.data;
    //     });
    // }

    // function getMiniSuppliersByCity(districtId) {
    //   return dataService
    //     .getMiniSuppliersByCity(districtId)
    //     .then(function (res) {
    //       return res.data.data;
    //     });
    // }

    // function getSectionsByCity(districtId) {
    //   return dataService
    //     .getSectionsByCity(districtId)
    //     .then(function (res) {
    //       return res.data.data;
    //     });
    // }

    // function getMiniNightCatStoreData(query) {
    //   return dataService
    //     .getMiniNightCatStoreData(query)
    //     .then(function (res) {
    //       return res.data.data;
    //     });
    // }
    
    
    // v2.0 api
    function getMiniSupplierLineChartData(params) {
      return dataService
        .getMiniSupplierLineChartData(params)
        .then(function (res) {
          return res.data;
        }, function (res) {
          console.log(res);
        });
    }

    function getMiniSupplierTableData(params) {
      return dataService
        .getMiniSupplierTableData(params)
        .then(function (res) {
          return res.data;
        }, function (res) {
          console.log(res);
        });
    }

    function getMiniSupplierCoverageTableData(params) {
      return dataService
        .getMiniSupplierCoverageTableData(params)
        .then(function (res) {
          return res.data;
        }, function (res) {
          console.log(res);
        })
    }

    function getMiniSupplierCoverageLineData(params) {
      return dataService
        .getMiniSupplierCoverageLineData(params)
        .then(function(res){
          return res.data;
        }, function(res){
          console.log(res);
        });
    }

    function getMiniSupplierPurchaseOverallData(params) {
      return dataService
        .getMiniSupplierPurchaseOverallData(params)
        .then(function(res){
          return res.data;
        }, function(res){
          console.log(res);
        });
    }

    function getMiniSupplierPurchaseLineData(params) {
      return dataService
        .getMiniSupplierPurchaseLineData(params)
        .then(function(res){
          return res.data;
        }, function(res){
          console.log(res);
        });
    }

    function getMiniSupplierPurchaseTableData(params) {
      return dataService
        .getMiniSupplierPurchaseTableData(params)
        .then(function(res){
          return res.data;
        }, function(res){
          console.log(res);
        });
    }

    function getMiniSupplierSaleOverallData(params) {
      return dataService
        .getMiniSupplierSaleOverallData(params)
        .then(function(res){
          return res.data;
        }, function(res){
          console.log(res);
        });
    }

    function getMiniSupplierSaleTableData(params) {
      return dataService
        .getMiniSupplierSaleTableData(params)
        .then(function(res){
          return res.data;
        }, function(res){
          console.log(res);
        });
    }

    function getMiniSupplierSalePieData(params) {
      return dataService
        .getMiniSupplierSalePieData(params)
        .then(function(res){
          return res.data;
        }, function(res){
          console.log(res);
        });
    }

    function getMiniSupplierSalePieOption(params) {
      return {
        title: {
          text: '无效订单种类分析', 
          x: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          orient: 'vertical',
          x: 'left',
          y: 'top',
          data: ['系统取消', '微仓取消', '楼主取消']
        },
        series: [
          {
            name: '取消原因',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: [
              { value: params.systemCanceledNum, name: '系统取消' },
              { value: params.storeCanceledNum, name: '楼主取消' },
              { value: params.supplierCanceledNum, name: '微仓取消' }
            ].sort(function (a, b) { return a.value - b.value }),
            roseType: 'angle',
            itemStyle: {
              normal: {
                label: {
                  position: 'outer',
                  formatter: function (params) {
                    return  params.name + (params.percent - 0).toFixed(2) + '%'
                  }
                },
              },
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      };
    }

    function getSupplierData(params) {
      return dataService
        .getSupplierData(params)
        .then(function (res) {
          return res.data;
        }, function (res) {
          console.log(res);
        });
    }

    function getWholeSalersData(params) {
      return dataService
        .getWholeSalersData(params)
        .then(function (res) {
          return res.data;
        }, function (res) {
          console.log(res);
        });
    }

    function getBrandsData(params) {
      return dataService
        .getBrandsData(params)
        .then(function (res) {
          return res.data;
        }, function (res) {
          console.log(res);
        });
    }

    function getMiniSupplierLineOption(lineData, index) {
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
      return getLineOption(legend, xAxis, series);
    }

    function getSalersLineOption(lineData, index) {
      return getMiniSupplierLineOption(lineData, index);
    }

    function getMiniSupplierCoverageLineOption(lineData, index) {
      var legend = lineData.map(function (item) {
        return item.name;
      });
      var series = lineData.map(function (item) {
        return {
          name: item.name,
          type: 'line',
          smooth: true,
          itemStyle: { normal: { areaStyle: { type: 'default' } } },
          markPoint: {
            data: [
              { type: 'max', name: '最大值' },
              { type: 'min', name: '最小值' }
            ]
          },
          data: item.list.map(function (pItem) {
            var v = pItem[index];
            return v !== null &&  v !== undefined ? v : '-';
          })
        }
      });
      var xAxis = lineData[0].list.map(function (item) {
        return dateService.toString(item.dt);
      });
      return getLineOption(legend, xAxis, series);
    }

    function getMiniSupplierPurchaseLineOption(lineData, index) {
      var legend = lineData.map(function (item) {
        return item.name;
      });
      var series = lineData.map(function (item) {
        return {
          name: item.name,
          type: 'line',
          smooth: true,
          itemStyle: { normal: { areaStyle: { type: 'default' } } },
          markPoint: {
            data: [
              { type: 'max', name: '最大值' },
              { type: 'min', name: '最小值' }
            ]
          },
          data: item.list.map(function (pItem) {
            var v = pItem[index];
            return v !== null &&  v !== undefined ? v : '-';
          })
        }
      });
      var xAxis = lineData[0].list.map(function (item) {
        return dateService.toString(item.dt);
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
