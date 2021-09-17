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
        maxSize: 3,
        leftNumButtonPage: 1,
        middleNumButtonPage: 2,
        rightNumButtonPage: 3
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

                $scope.pagination.leftNumButtonPage = $scope.pagination.currentPage === Math.ceil($scope.users.length / $scope.pagination.usersPerPage) ? $scope.pagination.currentPage - 2 : $scope.pagination.currentPage === 1 ? 1 : $scope.pagination.currentPage - 1;
                $scope.pagination.middleNumButtonPage = $scope.pagination.currentPage === Math.ceil($scope.users.length / $scope.pagination.usersPerPage) ? $scope.pagination.currentPage - 1 : $scope.pagination.currentPage > 1 ? $scope.pagination.currentPage : 2;
                $scope.pagination.rightNumButtonPage = $scope.pagination.currentPage === 1 ? $scope.pagination.currentPage + 2 : $scope.pagination.currentPage === Math.ceil($scope.users.length / $scope.pagination.usersPerPage) ? $scope.pagination.currentPage : $scope.pagination.currentPage + 1;
            });
            console.log("Initialization sequence complete.");
        }, function (error) {
            console.error(error.statusText);
        });
    };

    $scope.selectUser = function ($event, user) {
        Array.from(document.querySelectorAll(".selected")).forEach((element) => element.classList.remove("selected"));
        $event.currentTarget.className = "selected";
        $scope.selectedUser = user;
    }
});
