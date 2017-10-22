(function() {
  'use strict';
  angular
    .module('chopperApp')
    .config(routesConfig);

  /**
   * @ngdoc overview - routes
   * @name chopperRoutes
   * @description
   * # chopperApp
   *
   * Config the routes of the application.
   */
  function routesConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('main', {
        url: '/',
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main',
        'abstract': true,
      })
      .state('main.welcome', {
        url: 'welcome/',
        templateUrl: 'views/welcome.html'
      })
      .state('main.active', {
        url: 'active/',
        'abstract': true,
        template: '<div ui-view></div>',
      })
      .state('main.active.store', {
        url: 'store',
        templateUrl: 'views/active_store/active_store.html',
        controller: 'ActiveStoreCtrl',
        controllerAs: 'vm',
      })
      .state('main.kpi', {
        url: 'kpi/',
        'abstract': true,
        template: '<div ui-view></div>',
      })
      .state('main.kpi.data', {
        url: 'data',
        templateUrl: 'views/kpi_data/kpi_list.html',
        controller: 'KpiDataListCtrl',
        controllerAs: 'vm',
      })
      .state('main.realtime', {
        url: 'realtime/',
        'abstract': true,
        template: '<div ui-view></div>',
      })
      .state('main.realtime.data', {
        url: 'data',
        templateUrl: 'views/realtime/realtime_data.html',
        controller: 'RealtimeDataCtrl',
        controllerAs: 'vm',
      })
      .state('main.realtime.trend', {
        url: 'trend',
        templateUrl: 'views/realtime/realtime_trend.html',
        controller: 'RealtimeTrendCtrl',
        controllerAs: 'vm',
      })
      .state('main.basicData', {
        url: 'basicData/',
        'abstract': true,
        template: '<div ui-view></div>',
      })
      .state('main.basicData.user', {
        url: 'user',
        templateUrl: 'views/base_data/user_data.html',
        controller: 'UserDataCtrl',
        controllerAs: 'vm',
      })
      .state('main.basicData.nightCat', {
        url: 'nightCat',
        templateUrl: 'views/base_data/base_night_cat.html',
        controller: 'BaseNightCatCtrl',
        controllerAs: 'vm',
      })
      .state('main.miniSupplier', {
        url: 'miniSupplier/',
        'abstract': true,
        template: '<div ui-view></div>',
      })
      .state('main.miniSupplier.data', {
        url: 'data',
        templateUrl: 'views/mini_supplier_data/mini_supplier.html',
        controller: 'MiniSupplierCtrl',
        controllerAs: 'vm',
      })
      .state('main.miniSupplier.coverage', {
        url: 'coverage',
        templateUrl: 'views/mini_supplier_data/mini_supplier_coverage.html',
        controller: 'MiniSupplierCoverageCtrl',
        controllerAs: 'vm',
      })
      .state('main.miniSupplier.purchase', {
        url: 'purchase',
        templateUrl: 'views/mini_supplier_data/mini_supplier_purchase.html',
        controller: 'MiniSupplierPurchaseCtrl',
        controllerAs: 'vm',
      })
      .state('main.miniSupplier.sale', {
        url: 'sale',
        templateUrl: 'views/mini_supplier_data/mini_supplier_sale.html',
        controller: 'MiniSupplierSaleCtrl',
        controllerAs: 'vm',
      })
      .state('main.miniSupplier.nightCat', {
        url: 'nightCat',
        templateUrl: 'views/mini_supplier_data/mini_night_cat.html',
        controller: 'MiniNightCatCtrl',
        controllerAs: 'vm',
      })
      .state('main.track', {
        url: 'track/',
        'abstract': true,
        template: '<div ui-view></div>',
      })
      .state('main.track.data', {
        url: 'data',
        templateUrl: 'views/track/track.html',
        controller: 'TrackCtrl',
        controllerAs: 'vm',
      })
      .state('main.event', {
        url: 'event/',
        'abstract': true,
        template: '<div ui-view></div>',
      })
      .state('main.event.redPaper', {
        url: 'redPaper',
        templateUrl: 'views/event/red_paper.html',
        controller: 'RedPaperCtrl',
        controllerAs: 'vm',
      })
      .state('main.event.bonus', {
        url: 'bonus',
        templateUrl: 'views/event/customer_bonus.html',
        controller: 'CustomerBonusCtrl',
        controllerAs: 'vm',
      })
      .state('main.store', {
        url: 'store/',
        'abstract': true,
        template: '<div ui-view></div>',
      })
      .state('main.store.data', {
        url: 'data',
        templateUrl: 'views/store/store_data.html',
        controller: 'StoreDataCtrl',
        controllerAs: 'vm',
      })
      .state('main.store.info', {
        url: 'info',
        templateUrl: 'views/store/store_info.html',
        controller: 'StoreInfoCtrl',
        controllerAs: 'vm',
      })
      .state('main.store.business', {
        url: 'business',
        templateUrl: 'views/store/store_business.html',
        controller: 'StoreBusinessCtrl',
        controllerAs: 'vm',
      })
      .state('main.monitor', {
        url: 'monitor/',
        'abstract': true,
        template: '<div ui-view></div>',
      })
      .state('main.monitor.order', {
        url: 'order',
        templateUrl: 'views/monitor/monitor_order.html',
        controller: 'MonitorOrderCtrl',
        controllerAs: 'vm',
      })
      .state('main.monitor.sms', {
        url: 'sms',
        templateUrl: 'views/monitor/monitor_sms.html',
        controller: 'MonitorSmsCtrl',
        controllerAs: 'vm',
      })
      .state('main.monitor.store', {
        url: 'store',
        templateUrl: 'views/monitor/monitor_store.html',
        controller: 'MonitorStoreCtrl',
        controllerAs: 'vm',
      })
      .state('main.retention', {
        url: 'retention/',
        'abstract': true,
        template: '<div ui-view></div>',
      })
      .state('main.retention.phone', {
        url: 'phone',
        templateUrl: 'views/retention/retention_phone.html',
        controller: 'RetentionPhoneCtrl',
        controllerAs: 'vm',
      })
      .state('main.retention.permeation', {
        url: 'permeation',
        templateUrl: 'views/retention/retention_permeation.html',
        controller: 'RetentionPermeationCtrl',
        controllerAs: 'vm',
      })
      .state('main.retention.store', {
        url: 'store',
        templateUrl: 'views/retention/retention_store.html',
        controller: 'RetentionStoreCtrl',
        controllerAs: 'vm',
      })
      .state('main.competition', {
        url: 'competition/',
        'abstract': true,
        template: '<div ui-view></div>',
      })
      .state('main.competition.data', {
        url: 'data',
        templateUrl: 'views/competition/competition_data.html',
        controller: 'CompetitionDataCtrl',
        controllerAs: 'vm',
      })
      .state('main.marketing', {
        url: 'marketing/',
        'abstract': true,
        template: '<div ui-view></div>',
      })
      .state('main.marketing.basic', {
        url: 'basic',
        templateUrl: 'views/marketing/marketing_basic.html',
        controller: 'MarketingBasicCtrl',
        controllerAs: 'vm',
      })
      .state('main.marketing.healthy', {
        url: 'healthy',
        templateUrl: 'views/marketing/marketing_healthy.html',
        controller: 'MarketingHealthyCtrl',
        controllerAs: 'vm',
      })
      .state('main.marketing.activity', {
        url: 'activity',
        templateUrl: 'views/marketing/marketing_activity.html',
        controller: 'MarketingActivityCtrl',
        controllerAs: 'vm',
      })
      .state('main.region', {
        url: 'region/',
        'abstract': true,
        template: '<div ui-view></div>',
      })
      .state('main.region.realtime', {
        url: 'realtime',
        templateUrl: 'views/region/region_realtime.html',
        controller: 'RegionRealtimeCtrl',
        controllerAs: 'vm',
      })
      .state('main.region.store', {
        url: 'store',
        templateUrl: 'views/region/region_store.html',
        controller: 'RegionStoreCtrl',
        controllerAs: 'vm',
      })
      .state('login', {
        url: '/login',
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl',
        controllerAs: 'vm',
        data: {
          noAuth: true,
        },
      })
      .state('main.conf', {
        url: 'conf/',
        'abstract': true,
        template: '<div ui-view></div>',
      })
      .state('main.conf.manager', {
        url: 'manager',
        templateUrl: 'views/config/config_manager.html',
        controller: 'ConfigManagerCtrl',
        controllerAs: 'vm',
      })

      .state('main.storehouse', {
        url: 'storehouse/',
        'abstract': true,
        template: '<div ui-view></div>',
      })
      .state('main.storehouse.supervision', {
        url: 'supervision',
        templateUrl: 'views/storehouse/storehouse_supervision.html',
        controller: 'StorehouseCtrl',
        controllerAs: 'vm',
      })

    $urlRouterProvider.otherwise("/login");
  }
})();
