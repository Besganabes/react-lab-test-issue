const reactIssueApp = angular.module("reactIssueApp", ["angular.filter"]);

reactIssueApp.controller("reactIssueController", function ($scope, $http, $filter) {
    $scope.usersDataUrl = "https://itrex-react-lab-files.s3.eu-central-1.amazonaws.com/react-test-api.json";
    $scope.users = null;
    $scope.selectedUser = null;
    $scope.pagination = {
        currentPage: 1,
        usersPerPage: 20,
        searchString: "",
        stateFilter: ""
    }

    $scope.init = function () {
        console.log("Initialization sequence...");
        $http.get($scope.usersDataUrl).then(function (response) {
            $scope.users = response.data;
            console.log("Initialization sequence complete.");
        }, function (error) {
            console.error(error.statusText);
        });
    };

    $scope.selectUser = function (user) {
        $scope.selectedUser = user;
    };

    $scope.removeClassFromAllElements = function (className) {
        Array.from(document.querySelectorAll(".selected")).forEach((element) => element.classList.remove(className));
    };

    $scope.highlightSelectedRow = function ($event) {
        $scope.removeClassFromAllElements("selected");
        $event.currentTarget.className = "selected";
    };

    $scope.closeAdditionalInfo = function () {
        $scope.removeClassFromAllElements("selected");
        $scope.selectedUser = null;
    };

    $scope.getFilteredUsers = function () {
        return $filter('filter')($scope.users, $scope.pagination.searchString);
    };

    $scope.getOffset = function () {
        return ($scope.pagination.currentPage - 1) * $scope.pagination.usersPerPage;
    };

    $scope.previousButtonIsDisabled = function () {
        return $scope.pagination.currentPage === 1;
    };

    $scope.nextButtonIsDisabled = function () {
        return $scope.pagination.currentPage >= $scope.getFilteredUsers().length / $scope.pagination.usersPerPage;
    };

    $scope.selectAdjacentPage = function (forward) {
        forward ? $scope.pagination.currentPage += 1 : $scope.pagination.currentPage -= 1;
    };

    $scope.numButtonIsActive = function (pageNumber) {
        return $scope.pagination.currentPage === pageNumber;
    };

    $scope.selectPage = function (pageNumber) {
        $scope.pagination.currentPage = pageNumber;
    };

    $scope.getPagesAmount = function () {
        return Math.ceil($scope.getFilteredUsers().length / $scope.pagination.usersPerPage);
    };

    $scope.getLeftNumButtonPage = function () {
        const pagesAmount = $scope.getPagesAmount();
        const currentPage = $scope.pagination.currentPage;

        if (pagesAmount === 1 || pagesAmount === 2 || currentPage === 1) {
            return 1;
        } else if (currentPage === pagesAmount) {
            return currentPage - 2;
        } else {
            return currentPage - 1;
        }
    };

    $scope.getMidNumButtonPage = function () {
        const pagesAmount = $scope.getPagesAmount();
        const currentPage = $scope.pagination.currentPage;

        if (pagesAmount === 1) {
            return 1;
        } else if (pagesAmount === 2) {
            return 2;
        } else if (currentPage === pagesAmount) {
            return currentPage - 1;
        } else if (currentPage > 1) {
            return currentPage;
        } else {
            return 2;
        }
    };

    $scope.getRightNumButtonPage = function () {
        const pagesAmount = $scope.getPagesAmount();
        const currentPage = $scope.pagination.currentPage;

        if (currentPage === 1) {
            return currentPage + 2;
        } else if (currentPage === pagesAmount) {
            return currentPage;
        } else {
            return currentPage + 1;
        }
    };

    $scope.$watch("pagination.searchString", function () {
        $scope.pagination.currentPage = 1;
    });
});

reactIssueApp.filter("offset", function () {
    return function (input, start) {
        start = +start;
        return input.slice(start);
    }
});
