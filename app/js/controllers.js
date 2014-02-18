'use strict';

/* Controllers */

app.controller('HomeController', function ($scope, appStatusService, $timeout) {

    // if the user changes a value in one of the field, update calculation and save new values to localStorage
    $scope.wordsChange = function () {
        $scope.totalWords = appStatusService.getTotalWords();
        $scope.weighedWords = appStatusService.getWeighedWords();
        $scope.hoursEst = appStatusService.getHours();
        $scope.costsEst = appStatusService.getCosts();
        if (appStatusService.saveToLocalStorage())
            console.log("Data successfully saved.");
    };

    function init() {

        // load appStatus from localStorage
        if (appStatusService.loadFromLocalStorage())
        {
            console.log("Loading existing data from local storage.");
        }
        else
        {
            console.log("Loading default data.");
        }

        // set appStatus in the scope to the appStatus in the service
        $scope.appStatus = appStatusService.appStatus;

        // Update calculations on first run, quick and dirty?
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

app.controller('SettingsController', function ($scope, appStatusService) {
    // TODO write some code
    // Load app status
    // Update the discounts model based on button click
    // Save app status

    $scope.noDiscounts = function () {
        // TODO set all discounts to 0 -> weight to 100%
        appStatusService.appStatus.matches[0].weight = 123;
        appStatusService.changeDiscounts([100, 100, 100, 100, 100, 100, 100, 100, 100, 100]);

        if (appStatusService.saveToLocalStorage())
            console.log("Data successfully saved!!");
    }

});