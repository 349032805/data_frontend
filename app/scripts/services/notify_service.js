(function() {
  'use strict';

  /**
   * @ngdoc service
   * @name chopperApp.notifyService
   * @description
   * # notifyService
   * Factory in the chopperApp.
   */
  angular.module('chopperApp')
    .factory('notifyService', notifyService);

  function notifyService(notify) {
    var inspiniaTemplate = 'views/templates/notify.html';
    var exports = {
      info: info,
      success: success,
      warning: warning,
      danger: danger,
    };
    return exports;

    function info(msg) {
      notify({ message: msg, classes: 'alert-info', templateUrl: inspiniaTemplate});
    }

    function success(msg) {
      notify({ message: msg, classes: 'alert-success', templateUrl: inspiniaTemplate});
    }

    function warning(msg) {
      notify({ message: msg, classes: 'alert-warning', templateUrl: inspiniaTemplate});
    }

    function danger(msg) {
      notify({ message: msg, classes: 'alert-danger', templateUrl: inspiniaTemplate});
    }

  }
})();
