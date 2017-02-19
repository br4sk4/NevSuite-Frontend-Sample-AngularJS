angular.module('tabs').component('tabs', {
	templateUrl: 'tabs/tabs.template.html', // relative to index.html
	controller:  function tabsController($scope, $rootScope, $http, $location) {

	    $scope.tabControl = {};
        $scope.tabControl.startIndex = 0;
        $scope.tabs = [
            {title: 'Home', type: 'home', active: true, classes: 'active'}
        ];

        $scope.tabControl.isLeftScrollable = 'disabled';
        $scope.tabControl.isRightScrollable = 'disabled';

        $scope.$watchGroup(['tabs.length', 'tabControl.startIndex'], function() {
            if ( $scope.tabControl.startIndex > 0 ) $scope.tabControl.isLeftScrollable = '';
            else $scope.tabControl.isLeftScrollable = 'disabled';
            if ( $scope.tabControl.startIndex < $scope.tabs.length - 1 ) $scope.tabControl.isRightScrollable = '';
            else $scope.tabControl.isRightScrollable = 'disabled';
        });

        var setActiveTab = function(index) {
            for (var i = 0; i < $scope.tabs.length; i++) {
                if( $scope.tabs[i].active ) {
                    $scope.tabs[i].active = false;
                    $scope.tabs[i].classes = '';
                }
            }

            $scope.tabs[index].active = true;
            $scope.tabs[index].classes = 'active';
        };

        var addTab = function(tab) {
            $scope.tabs.push({title: tab.title, type: tab.type, active: false, classes: '' });

            if ( $scope.tabs.length - $scope.tabControl.startIndex > 5  ) {
                $scope.tabControl.startIndex = $scope.tabs.length - 5;
            }
        };

        $rootScope.$on("addTab", function($event, tab) {
            addTab(tab);
            setActiveTab($scope.tabs.length - 1);
        });

        $scope.tabControl.setActive = function(index) {
            setActiveTab(index);
        };

        $scope.tabControl.closeTab = function(index) {
            if ($scope.tabControl.startIndex == $scope.tabs.length - 1) {
                $scope.tabControl.startIndex--;
                setActiveTab(index-1);
            } else if ($scope.tabs[index].active)
                setActiveTab(index-1);

            if (index != 0)
                $scope.tabs.splice(index, 1);
        };

        $scope.tabControl.pageLeft = function() {
            if ( $scope.tabControl.startIndex > 0 )
                $scope.tabControl.startIndex--;
        };

        $scope.tabControl.pageRight = function() {
            if ( $scope.tabControl.startIndex < $scope.tabs.length - 1 )
                $scope.tabControl.startIndex++;
        };

        $scope.tabControl.openTab = function() {
            addTab({title: 'Tab', type: 'empty'});
            setActiveTab($scope.tabs.length - 1);
        }

    }
});