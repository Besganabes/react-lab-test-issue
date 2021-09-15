reactIssueApp.controller("reactIssueController", function($scope, $http) {

    $scope.users = null;
    $scope.usersDataUrl = "https://itrex-react-lab-files.s3.eu-central-1.amazonaws.com/react-test-api.json";

    $scope.init = function () {
        console.log("Initialization...");
        $scope.getUsers();
    };

    $scope.getUsers = function () {
        $http.get($scope.usersDataUrl).then(function (response) {
            $scope.users = response.data;
            console.log("Users data successfully loaded.");
            console.log($scope.users);
        }, function (error) {
            console.error(error.statusText);
        });
    };

});
