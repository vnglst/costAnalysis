'use strict';

/* Controllers */

app.controller('HomeController', function ($scope, appStatusService, $timeout) {

    // if the user changes a value in one of the fields the calculation is updated and 
    // the new values are saved to localStorage
    $scope.wordsChange = function () {
        $scope.totalWords = Math.round(appStatusService.getTotalWords());
        $scope.weighedWords = Math.round(appStatusService.getWeighedWords());
        $scope.hoursEst = Math.round(appStatusService.getHours() /10) * 10;
        $scope.costsEst = Math.round(appStatusService.getCosts() * 100) / 100;
        $scope.totalDiscount = Math.round(appStatusService.getTotalDiscount() * 100) / 100;
        $scope.percDiscount = Math.round(appStatusService.getPercDiscount()); 
        if (appStatusService.saveToLocalStorage())
            console.log("Data successfully saved.");
    };

    // 
    // Create different discount models and assign them to scope
    //

    $scope.changeDiscounts = function(model) {
        appStatusService.changeDiscounts( model.discounts );
        $scope.wordsChange();
    }

    $scope.resetSession = function () {
        // clear local status en reset to default state
        appStatusService.resetSession();
        $scope.appStatus = appStatusService.appStatus;
        $scope.wordsChange();
    }

    // Loads session status from localstorage and update calculations

    function init() {
        $scope.appStatus = appStatusService.appStatus;
        $scope.wordsChange();
    }
    
    init();

});

app.controller('HeaderController', function ($scope, $location) {
    $scope.isActive = function (viewLocation) {
        return viewLocation === $location.path();
    };
});

app.controller('AboutController', function ($scope) {
    // TODO write some code here
});