(function () {
'use strict';

/**
 * @ngdoc service
 * @name chopperApp.regionService
 * @description
 * # regionService
 * Factory in the chopperApp.
 */
angular.module('chopperApp')
  .factory('configService', configService);
  
  function configService(dataService) {
    var exports = {
      getManagerAndCampusIsBinding: getManagerAndCampusIsBinding,
      deleteOneForBind: deleteOneForBind,
      getCampusByCity: getCampusByCity,
      addOrUpdateManager: addOrUpdateManager,
      sendSmsCodeToManager: sendSmsCodeToManager,
      getBindCampusByManger:getBindCampusByManger,
      tipNoBindingCampus:tipNoBindingCampus,
      createManager: createManager,
    }
    
    return exports;
    
    function getManagerAndCampusIsBinding(params) {
      return dataService
        .getManagerAndCampusIsBinding(params)
        .then(function (res) {
          return res.data;
        }, function (res) {
          return res.data;
        });
    }

    function deleteOneForBind(params) {
      return dataService
        .deleteOneForBind(params)
        .then(function (res) {
          return res.data;
        }, function (res) {
          return res.data;
        });
    }

    function getCampusByCity(params) {
      return dataService
        .getCampusByCity(params)
        .then(function (res) {
          return res.data;
        }, function (res) {
          return res.data;
        });
    }

    function addOrUpdateManager(manager) {
      return dataService
        .addOrUpdateManager(manager)
        .then(function (res) {
          return res.data;
        }, function (res) {
          return res.data;
        });
    }

    function createManager(manager) {
      return dataService
        .createManager(manager)
        .then(function (res) {
          return res.data;
        }, function (res) {
          return res.data;
        });
    }

    function sendSmsCodeToManager() {
      return dataService
        .sendSmsCodeToManager()
        .then(function (res) {
          return res.data;
        }, function (res) {
          return res.data;
        });
    }

    function getBindCampusByManger(params) {
      return dataService
        .getBindCampusByManger(params)
        .then(function (res) {
          return res.data;
        }, function (res) {
          return res.data;
        });
    }

     function tipNoBindingCampus() {
      return dataService
        .tipNoBindingCampus()
        .then(function (res) {
          return res.data;
        }, function (res) {
          return res.data;
        });
    }
    
  }
})();