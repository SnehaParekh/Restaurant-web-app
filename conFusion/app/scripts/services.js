'use strict';
angular.module("confusionApp")
    .constant("baseURL", "http://localhost:3000/")
    .service('menuFactory', ['$resource', 'baseURL', function ($resource, baseURL) {

        this.getDishes = function () {
            return $resource(baseURL + "dishes/:id", null, {
                'update': {
                    method: 'PUT'
                }
            });
        };

        this.getPromotion = function () {
            return $resource(baseURL + "promotions/:index");
        };

//        var dish = $resource(baseURL + "dishes/:id", null, {
//            'update': {
//                method: 'PUT'
//            }
//        }).get({
//            id: 0
//        }, function () {
//            dish.name = "dovanut";
//            dish.$save();
//        });

    }])


.factory('corporateFactory', ['$resource', 'baseURL', function ($resource, baseURL) {
    var corpfac = {};
    corpfac.getLeaders = function () {
        return $resource(baseURL + "leadership/:id", null, {
            'update': {
                method: 'PUT'
            }
        });
    };
    return corpfac;

}])

.service('feedbackFactory', ['$resource', 'baseURL', function ($resource, baseURL) {

}])

;
