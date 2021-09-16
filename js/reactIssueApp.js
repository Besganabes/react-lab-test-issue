const reactIssueApp = angular.module("reactIssueApp", ['angular.filter']);

reactIssueApp.controller("reactIssueController", function ($scope, $http) {
    $scope.Math = window.Math;
    $scope.users = null;
    $scope.usersDataUrl = "https://itrex-react-lab-files.s3.eu-central-1.amazonaws.com/react-test-api.json";
    $scope.selectedUser = null;
    $scope.searchString = "";
    $scope.stateFilter = "";
    $scope.pagination = {
        users: [],
        currentPage: 1,
        usersPerPage: 20,
        maxSize: 3
    };

    $scope.init = function () {
        console.log("Initialization sequence...");
        $http.get($scope.usersDataUrl).then(function (response) {
            $scope.users = response.data;
            $scope.pagination.users = $scope.users;
            $scope.$watch("pagination.currentPage", function() {
                let begin = ($scope.pagination.currentPage - 1) * $scope.pagination.usersPerPage;
                let end = begin + $scope.pagination.usersPerPage;
                $scope.pagination.users = $scope.users.slice(begin, end);
            });
            console.log("Initialization sequence complete.");
        }, function (error) {
            console.error(error.statusText);
        });
    };

    $scope.selectUser = function (user) {
        $scope.selectedUser = user;
    }
});
