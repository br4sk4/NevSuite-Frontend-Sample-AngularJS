angular.module('home').component('home', {
	templateUrl: 'home/home.template.html', // relative to index.html
	controller:  function navigationController($scope, $http, $location) {
		
		$scope.home = {};
        $scope.home.components = [];

        $http.get('http://' + $location.host() + ':' + $location.port() + '/backend-webservice/ComponentService/respond').then(function(response) {
            $scope.home.components.push({name: "Common Backend", class: 'success home', response: response.data});
        }, function() {
            $scope.home.components.push({name: "Common Backend", class: 'danger home', response: 'Not Available'});
        });

        $http.get('http://' + $location.host() + ':' + $location.port() + '/eventmanagement-webservice/ComponentService/respond').then(function(response) {
            $scope.home.components.push({name: "Event-Management", class: 'success home', response: response.data});
        }, function() {
            $scope.home.components.push({name: "Event-Management", class: 'danger home', response: 'Not Available'});
        });

        $http.get('http://' + $location.host() + ':' + $location.port() + '/backgroundprocesses-webservice/ComponentService/respond').then(function(response) {
            $scope.home.components.push({name: "Backgroundprocesses", class: 'success home', response: response.data});
        }, function() {
            $scope.home.components.push({name: "Backgroundprocesses", class: 'danger home', response: 'Not Available'});
        });

	}
});