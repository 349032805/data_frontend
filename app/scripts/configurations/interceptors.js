(function () {
  'use strict';
  /**
   * @ngdoc httpInterceptors
   * @name chopper-httpInterceptors
   * @description
   * # Http intreceptors of zhaimi
   *
   * Config http interceptors for the application.
   */
  angular
    .module('chopperApp')
    .config(httpConfig);

  function httpConfig($httpProvider) {
    // http config
    $httpProvider.interceptors.push('zhaimiHttpInterceptor');
  }
})();
