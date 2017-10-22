(function() {
  'use strict';
  angular
    .module('chopperApp')
    .run(confirmConfig);

  function confirmConfig($confirmModalDefaults) {
    $confirmModalDefaults.defaultLabels.title = '确认';
    $confirmModalDefaults.defaultLabels.ok = '确定';
    $confirmModalDefaults.defaultLabels.cancel = '取消';
  }
})();
