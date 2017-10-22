(function () {
  'use strict';

  /**
   * @ngdoc service
   * @name chopperApp.authService
   * @description
   * # authService
   * Factory in the chopperApp.
   */
  angular.module('chopperApp')
    .factory('authService', authService);
  function authService(OAuth, OAuthToken, $state, dataService, $sessionStorage) {
    // Interface
    var authService = {
      login: login,
      logout: logout,
      getSmsCode: getSmsCode,
      isAuthenticated: isAuthenticated,
      getAuthorizationHeader: getAuthorizationHeader,
      getAccessToken: getAccessToken,
      getHttpManager: getHttpManager,
      getManager: getManager,
      getUserNavigations: getUserNavigations,
    };
    // var icons = ["fa-coffee", "fa-clock-o", "fa-university", "fa-shopping-cart", "fa-tasks", "fa-eye", "fa-hourglass-half", "fa-money", "fa-area-chart", "fa-users", "fa-suitcase"];
    var icons = {
      "main.kpi":"fa-coffee",
      "main.realtime":"fa-clock-o",
      "main.miniSupplier":"fa-university",
      "main.store":"fa-shopping-cart",
      "main.basicData":"fa-tasks",
      "main.monitor":"fa-eye",
      "main.retention":"fa-hourglass-half",
      "main.event":"fa-money",
      "main.track":"fa-area-chart",
      "main.competition":"fa-users",
      "main.marketing":"fa-suitcase",
      "main.active":"fa-bar-chart",
      "main.region":"fa-bar-chart",
      "main.conf":"fa-cogs",
      "main.storehouse":"fa-floppy-o",
    }
    return authService;

    // Service logic
    function login(credentials) {
      return OAuth.getAccessToken(credentials);
    }
    
    function getSmsCode(credentials) {
      return dataService.smsCode(credentials);
    }

    function logout() {
      return OAuth.revokeToken().then(function (res) {
        $state.go('login');
        delete $sessionStorage.manager;
        delete $sessionStorage.navigations;
      });
    }

    function isAuthenticated() {
      return OAuth.isAuthenticated();
    }

    function getAuthorizationHeader() {
      return OAuthToken.getAuthorizationHeader();
    }

    function getAccessToken() {
      return OAuthToken.getAccessToken();
    }

    function getHttpManager() {
      return dataService.getManager().then(function (res) {
        $sessionStorage.manager = res.data.data;
        $sessionStorage.navigations = parseUserMenu(res.data.permission);
        return res.data;
      });
    }

    function getManager() {
      return $sessionStorage.manager;
    }
    
    function getUserNavigations() {
      return $sessionStorage.navigations || [];
    }
    
    function parseUserMenu(permissions) {
      var navigations = [];

      permissions.forEach(function (item) {
        var sref = 'main.' + item.name.split(".")[0];
        var title = item.description.split("_")[0];
        var children = {
          title: item.description.split("_")[1],
          sref: 'main.' + item.name,
        }

        var find = null;
        navigations.forEach(function (nav) {
          if (nav.sref === sref) {
            find = nav;
          }
        });

        if (find) {
          find.childrens.push(children)
        } else {
          navigations.push({
            title: title,
            sref: sref,
            childrens: [children]
          });
        }
      });
      navigations.map(function(item,index){ return item.icon = icons[item.sref];});
      return navigations;
    }

  }
})();
