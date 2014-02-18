'use strict';

var app = angular.module('app', [
    'LocalStorageModule',
    'ui.bootstrap'
]);

app.config(function ($routeProvider) {

    $routeProvider.when('/about', {
        templateUrl: 'partials/about.html',
        controller: 'AboutController'
    });

    $routeProvider.when('/home', {
        templateUrl: 'partials/home.html',
        controller: 'HomeController'
    });

    $routeProvider.when('/settings', {
        templateUrl: 'partials/settings.html',
        controller: 'SettingsController'
    });

    $routeProvider.otherwise({ redirectTo: '/home' });

});


