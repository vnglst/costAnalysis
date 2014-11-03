"use strict";

/* Services */

app.service('appStatusService', function (localStorageService) {
    
    var getDiscountModels = function() {
        var defaultModels = [
            {name: "No discounts", discounts: [100, 100, 100, 100, 100, 100, 100, 100, 100]},
            {name: "Only reps", discounts: [100, 33, 100, 100, 100, 100, 100, 100, 100]},
            {name: "Reps + 100%", discounts: [33, 33, 33, 33, 100, 100, 100, 100, 100]},
            {name: "33/66/100", discounts: [33, 33, 33, 33, 66, 66, 100, 100, 100]},
            {name: "25/50/65/75", discounts: [25, 25, 25, 25, 50, 65, 75, 100, 100]},
            {name: "Don't!", discounts: [0, 0, 0, 0, 50, 65, 75, 100, 100]}
            ];
        return defaultModels;
    }    

    var getDefaultStatus = function() {
        var defaultStatus = {
            matches: [
                {type: "X-translated", words: 0, weight: 33},
                {type: "Repetition", words: 249000, weight: 33},
                {type: "101%", words: 0, weight: 33},
                {type: "100%", words: 0, weight: 33},
                {type: "95%-99%", words: 0, weight: 66},
                {type: "85%-94%", words: 0, weight: 66},
                {type: "75%-84%", words: 0, weight: 66},
                {type: "50%-74%", words: 0, weight: 100},
                {type: "No match", words: 1000, weight: 100}
            ],
            analysisScheme: 'MemoQ',
            wordsPerDay: 2000,
            costsPerUnit: 0.2,
            discountModels: getDiscountModels()
        };
        return defaultStatus;
    }

    this.changeDiscounts = function (newDiscounts) {
        var i;
        for (i in newDiscounts)
            this.appStatus.matches[i].weight = newDiscounts[i];
    
        if (this.saveToLocalStorage())
            console.log("Discount model successfully changed!");
    };

    this.getWeighedWords = function () {
        var t = 0;
        for (var i in this.appStatus.matches) {
            var match = this.appStatus.matches[i];
            t += match.words * match.weight / 100;
        }
        return t;
    };

    this.getTotalWords = function () {
        var t = 0;
        for (var i in this.appStatus.matches) {
            var match = this.appStatus.matches[i];
            t += match.words;
        }
        return t;
    };

    this.getCosts = function () {
        return this.getWeighedWords() * this.appStatus.costsPerUnit;
    };

    this.getNoDiscountCosts = function () {
        return this.getTotalWords() * this.appStatus.costsPerUnit;
    }

    this.getTotalDiscount = function () {
        return this.getNoDiscountCosts() - this.getCosts();
    }

    this.getPercDiscount = function () {
        return 100 - this.getCosts() / this.getNoDiscountCosts() * 100;
    }

    this.getHours = function () {
        return this.getWeighedWords() / this.appStatus.wordsPerDay * 8;
    };

    // returns true if save is successful, .add function somehow returns false on success!?
    this.saveToLocalStorage = function () {
        return !(localStorageService.add('appStatus', this.appStatus));
    };

    // 
    // Init and reset part
    //

    this.init = function () {
        var localStorageStatus = localStorageService.get('appStatus');
        if (localStorageStatus == undefined) {
            this.appStatus = getDefaultStatus();
        } else {
            this.appStatus = localStorageStatus;
        };
    };

    this.resetSession = function () {
        localStorageService.clearAll();
        this.appStatus = getDefaultStatus();
    }

    this.init();

});
