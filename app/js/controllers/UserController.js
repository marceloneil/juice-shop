angular.module('myApp').controller('UserController', [
    '$scope',
    '$modal',
    '$sce',
    'UserService',
    function ($scope, $modal, $sce, userService) {
        'use strict';

        function findAll() {
            userService.find().success(function (users) {
                $scope.users = users.data;
                for (var i=0; i<$scope.users.length; i++) {
                    $scope.users[i].email = $sce.trustAsHtml($scope.users[i].email);
                }
            }).error(function (err) {
                console.log(err);
            });
        }
        findAll();

        $scope.showDetail = function (id) {

            $modal.open({
                templateUrl: 'views/UserDetail.html',
                controller: 'UserDetailsController',
                size: 'lg',
                resolve: {
                    id: function () {
                        return id;
                    }
                }
            });
        };

    }]);