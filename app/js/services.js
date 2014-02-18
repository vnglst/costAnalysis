"use strict";

/* Services */

app.service('appStatusService', function (localStorageService) {
    this.appStatus = {
        matches: [
            {type: "X-translated", words: 0, weight: 33},
            {type: "Repetition", words: 0, weight: 33},
            {type: "101%", words: 0, weight: 33},
            {type: "100%", words: 0, weight: 33},
            {type: "95%-99%", words: 0, weight: 66},
            {type: "85%-94%", words: 0, weight: 66},
            {type: "75%-84%", words: 0, weight: 66},
            {type: "85%-94%", words: 0, weight: 100},
            {type: "50%-74%", words: 0, weight: 100},
            {type: "No match", words: 0, weight: 100}
        ],
        memoQScheme: true,
        wordsPerDay: 2000,
        costsPerUnit: 0.2
    };

    this.changeDiscounts = function (newDiscounts) {
        var i = 0;
        for (i in newDiscounts) {
            this.appStatus.matches[i].weight = newDiscounts[i];
        }
    };

    this.getWeighedWords = function () {
        var t = 0;
        for (var i in this.appStatus.matches) {
            var match = this.appStatus.matches[i];
            t += match.words * match.weight / 100;
        }
        return Math.round(t);
    };

    this.getTotalWords = function () {
        var t = 0;
        for (var i in this.appStatus.matches) {
            var match = this.appStatus.matches[i];
            t += match.words;
        }
        return Math.round(t);
    };

    this.getCosts = function () {
        var totalWords = this.getTotalWords();
        return Math.round(
            totalWords * this.appStatus.costsPerUnit
        );
    };

    this.getHours = function () {
        var totalWords = this.getTotalWords();
        return Math.round(
            totalWords / this.appStatus.wordsPerDay * 8
        );
    };

    // From here interaction with localStorage API - maybe move to separate service?
    // returns false if localstorage is empty
    this.loadFromLocalStorage = function () {
        var tempStatus = localStorageService.get('appStatus');
        if (tempStatus === undefined) {
            return false;
        } else {
            this.appStatus = tempStatus;
            return true;
        }
    };

    // returns true if save is successful, .add function somehow returns false on success!?
    this.saveToLocalStorage = function () {
        return !(localStorageService.add('appStatus', this.appStatus));
    };
});
