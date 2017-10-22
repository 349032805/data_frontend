(function() {
  'use strict';
  angular
    .module('chopperApp')
    .run(eventListeners);

  function eventListeners($rootScope, $state, authService) {
    $rootScope.$on('$stateChangeStart', stateChangeStartEventListener);

    // logic
    function stateChangeStartEventListener(event, toState) {
      var needAuth = !(toState.data || {}).noAuth;
      if (needAuth && !authService.isAuthenticated()) {
        event.preventDefault();
        $state.go('login');
      }
    }
  }
})();
