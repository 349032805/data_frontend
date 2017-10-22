(function () {
  'use strict';

  /**
   * @ngdoc service
   * @name chopperApp.storehouseService
   * @description
   * # storehouseService
   * Factory in the chopperApp.
   */
  angular.module('chopperApp')
    .factory('storehouseService', storehouseService);
  function storehouseService(dataService) {
    var exports = {
        getStorehouseData:getStorehouseData,
      
    };
    return exports;

    function getStorehouseData(params) {
      return dataService
        .getStorehouseData(params)
        .then(function(res) {
          return res.data;
        }, function(res) {
          return res.data;
        }); 
    }

  }
})();