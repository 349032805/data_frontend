(function() {
  'use strict';
  angular
    .module('chopperApp')
    .config(oauth2Config);

  function oauth2Config(OAuthProvider) {
    OAuthProvider.configure({
      baseUrl: '/chopper/api/v3',
      clientId: '1',
      clientSecret: null,
      grantPath: '/auth/token',
      revokePath: '/auth/revoke'
    });
  }
})();
