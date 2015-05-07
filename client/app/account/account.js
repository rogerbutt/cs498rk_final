'use strict';

angular.module('notrApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/login', {
        templateUrl: 'app/account/login/login.html',
        controller: 'LoginCtrl'
      })
      .when('/signup', {
        templateUrl: 'app/account/signup/signup.html',
        controller: 'SignupCtrl'
      })
      .when('/settings', {
        templateUrl: 'app/account/settings/settings.html',
        controller: 'SettingsCtrl',
        authenticate: true
      })
      .when('/accountinfo', {
        templateUrl: 'app/account/accountinfo/accountinfo.html',
        controller: 'AccountInfoCtrl',
        authenticate: true
      });
  });