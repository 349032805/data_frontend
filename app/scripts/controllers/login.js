(function () {
  'use strict';

  /**
   * @ngdoc function
   * @name chopperApp.controller:LoginCtrl
   * @description
   * # LoginCtrl
   * Controller of the chopperApp
   */
  angular.module('chopperApp')
    .controller('LoginCtrl', LoginCtrl);

  function LoginCtrl(authService, $state, notifyService, $interval) {
    var vm = this;
    
    vm.data = {};
    vm.login = login;
    vm.getSmsCode = getSmsCode;
    vm.smsCodeCountDown = 0;
    vm.requireSmsCode = false;

    // logic
    // function login(credential) {
    //   return authService.login(credential).then(function () {
    //     authService.getHttpManager().then(function () {
    //       $state.go('main.welcome');
    //     });
    //   }, function (res) {
    //     notifyService.danger(res.data.error);
    //   });
    // }
    
    function activateCountDown() {
      vm.smsCodeCountDown = 60;
      var countDown = $interval(function() {
        vm.smsCodeCountDown--;
        if (vm.smsCodeCountDown <= 0) {
          $interval.cancel(countDown);
        }
      }, 1000);
    }

    function login(credential) {
       if(!vm.data.smsCode){
        notifyService.danger('请输入验证码');
        return;
      }

      return authService
        .login(credential)
        .then(function() {
          authService.getHttpManager().then(function () {
            $state.go('main.welcome');
          });
        }, function(res) {
          tipByResult(res);
        });
    }

    function getSmsCode() {
      if (vm.smsCodeCountDown) {
        return;
      }

      if(!vm.data.username){
        notifyService.danger('请输入用户名');
        return;
      }

      if(!vm.data.password){
        notifyService.danger('请输入密码');
        return;
      }

     return authService.getSmsCode(vm.data)
        .then(function(res){
          //用户名和密码正确,短信发送成功
          //开始60秒计时
           activateCountDown();
        }, function(res){
           tipByResult(res);
        });
    }

    function tipByResult(res){
      switch (res.status) {
        case 400: {
          if (res.data.error === '请输入验证码') {
            vm.requireSmsCode = true;
            getSmsCode();
           
          }
        }
        case 401: case 403: case 404: {
          break;
        }
        default: {
          notifyService.danger(res.data.error);
          return;
        }
      }
      notifyService.danger(res.data.error);
    }

  }
})();
