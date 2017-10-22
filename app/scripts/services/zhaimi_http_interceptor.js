(function() {
  'use strict';

  /**
   * @ngdoc service
   * @name chopperApp.zhaimiHttpInterceptor
   * @description
   * # zhaimiHttpInterceptor
   * Factory in the chopperApp.
   */
  angular.module('chopperApp')
    .factory('zhaimiHttpInterceptor', zhaimiHttpInterceptor);

  function zhaimiHttpInterceptor($q) {
    var responseInterceptor = {
      response: responseHandler
    };
    return responseInterceptor;

    // Service logic
    function responseHandler(response) {
      var data = response.data || {};
      if (data.hasOwnProperty('success')) {
        return $q(function(resolve, reject) {
          var success = data.success;
          response.data = data.data;
          if (success === true) {
            resolve(response);
          } else {
            response.status = response.data.code || response.code || response.status;
            reject(response);
          }
        });
      } else {
        return response;
      }
    }
  }
})();

