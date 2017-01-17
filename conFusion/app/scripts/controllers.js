'use strict';
angular.module("confusionApp")
    .controller("MenuController", ['$scope', 'menuFactory', function ($scope, menuFactory) {
        $scope.showMenu = false;
        $scope.message = "Loading.....";

        $scope.dishes = menuFactory.getDishes().query(
            function (response) {
                $scope.dishes = response;
                $scope.showMenu = true;
            },
            function (response) {
                $scope.message = "Error: " + response.status + " " + response.statusText;
            });

        $scope.tab = 1;
        $scope.filterText = "";

        $scope.setTab = function (currentTab) {
            $scope.tab = currentTab;
            if (currentTab === 2) {
                $scope.filterText = "appetizer";
            } else if (currentTab === 3) {
                $scope.filterText = "mains";
            } else if (currentTab === 4) {
                $scope.filterText = "dessert";
            } else {
                $scope.filterText = "";
            }
        };

        $scope.isSelected = function (currentTab) {
            return (currentTab === $scope.tab);
        };

        $scope.showDetails = false;
        $scope.toggleDetails = function () {
            $scope.showDetails = !($scope.showDetails);
        };
    }])

.controller('DishDetailController', ['$scope', 'menuFactory', '$stateParams', function ($scope, menuFactory, $stateParams) {

    $scope.showDish = false;
    $scope.message = "Loading ...";
    $scope.dish = menuFactory.getDishes().get({
        id: parseInt($stateParams.id, 10)
    }).$promise.then(
        function (response) {
            $scope.dish = response;
            $scope.showDish = true;
        },
        function (response) {
            $scope.message = "Error: " + response.status + " " + response.statusText;
        }
    );

}])

.controller("ContactController", ['$scope', function ($scope) {
    $scope.feedback = {
        firstName: "",
        lastName: "",
        mychannel: "",
        agree: false,
        email: ""
    };
    var channels = [{
        value: "tel",
        label: "Tel."
    }, {
        value: "email",
        label: "Email"
    }];
    $scope.channels = channels;
    $scope.invalidChannelSelection = false;
    $scope.masterFeedback = [];
}])

.controller("FeedbackController", ['$scope', 'feedbackFactory', function ($scope, feedbackFactory) {

    $scope.sendFeedback = function () {
        //console.log($scope.feedback);
        if ($scope.feedback.agree && ($scope.feedback.mychannel === undefined) && !$scope.feedback.mychannel) {
            $scope.invalidChannelSelection = true;
            //console.log('incorrect');
        } else {
            $scope.invalidChannelSelection = false;
            $scope.feedback = {
                mychannel: "",
                firstName: "",
                lastName: "",
                agree: false,
                email: ""
            };
            $scope.feedback.mychannel = "";

            $scope.feedbackForm.$setPristine();
            //console.log($scope.feedback);
        }
    };
}])

.controller('DishCommentController', ['$scope', 'menuFactory', function ($scope, menuFactory) {

    $scope.userComment = {
        author: "",
        comment: "",
        rating: "",
        date: ""
    };
    $scope.submitComment = function () {
        $scope.userComment.date = new Date().toISOString();
        $scope.dish.comments.push($scope.userComment);

        menuFactory.getDishes().update({
            id: $scope.dish.id
        }, $scope.dish);

        $scope.userComment = {
            author: "",
            comment: "",
            rating: 5,
            date: ""
        };
        $scope.commentForm.$setPristine();
        //console.log($scope.commentForm);
    };

}])


.controller('AboutController', ['$scope', 'corporateFactory', function ($scope, corporateFactory) {
    $scope.showLeaders = false;
    $scope.leadersMessage = "Loading.......";

    $scope.showSpecialist = false;
    $scope.specialistMessage = "Loading....."

    $scope.leaders = corporateFactory.getLeaders().query(
        function (response) {
            $scope.leaders = response;
            $scope.showLeaders = true;
        },
        function (response) {
            $scope.message = "Error: " + response.status + " " + response.statusText;
        });

    $scope.specialist = corporateFactory.getLeaders().get({
        id: 3
    }).$promise.then(
        function (response) {
            $scope.specialist = response;
            $scope.showSpecialist = true;
        },
        function (response) {
            $scope.specialistMessage = "Error: " + response.status + " " + response.statusText;
        }
    );

}])

.controller('IndexController', ['$scope', 'menuFactory', function ($scope, menuFactory) {
    $scope.showPromotion = false;
    $scope.promotionMessage = "Loading....";
    $scope.promotion = menuFactory.getPromotion().get({
        index: 0
    }).$promise.then(
        function (response) {
            $scope.promotion = response;
            $scope.showPromotion = true;
        },
        function (response) {
            $scope.promotionMessage = "Error: " + response.status + " " + response.statusText;
        }
    );

    $scope.showDish = false;
    $scope.message = "Loading ...";
    $scope.featuredDish = menuFactory.getDishes().get({
        id: 0
    }).$promise.then(
        function (response) {
            $scope.featuredDish = response;
            $scope.showDish = true;
        },
        function (response) {
            $scope.message = "Error: " + response.status + " " + response.statusText;
        }
    );
}])

;
