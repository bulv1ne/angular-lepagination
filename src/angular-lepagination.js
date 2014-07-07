(function() {
  'use strict';

  angular.module('bulv1ne.lepagination', ['templates-lepagination'])

  .filter('paginate', function() {
    return function(input, page, pageSize) {
      if (!input) {
        return input;
      }
      return input.slice((page - 1) * pageSize, page * pageSize);
    };
  })

  .directive('paginateMe', function() {
    return {
      restrict: 'A',
      scope: {
        objects: '=',
        data: '&',
        defaultOrderBy: '@orderBy',
        defaultPageSize: '@pageSize',
        search: '=',
      },
      transclude: true,
      templateUrl: 'table-paginate.html',
      controller: ['$scope', '$filter', function($scope, $filter) {
        $scope.currentPage = 1;
        $scope.pageSize = 25;
        if ($scope.defaultPageSize) {
          var pageSize = parseInt($scope.defaultPageSize, 10);
          if (pageSize > 0) {
            $scope.pageSize = pageSize;
          }
        }
        $scope.orderBy = $scope.defaultOrderBy;

        $scope.$watch('objects', function(newValue, oldValue) {
          $scope.currentPage = 1;
          $scope.applyObjects();
        });

        $scope.applyObjects = function() {
          var objs = $scope.objects;
          objs = $filter('filter')(objs, $scope.search);
          objs = $filter('orderBy')(objs, $scope.orderBy);
          objs = $filter('paginate')(objs, $scope.currentPage, $scope.pageSize);
          $scope.data({
            $objects: objs
          });
        };

        $scope.numberOfPages = function() {
          if (!$scope.objects) {
            return 1;
          }
          var objects = $filter('filter')($scope.objects, $scope.search);
          return Math.ceil(objects.length / $scope.pageSize) || 1;
        };

        $scope.nextPage = function() {
          $scope.gotoPage($scope.currentPage + 1);
        };

        $scope.prevPage = function() {
          $scope.gotoPage($scope.currentPage - 1);
        };

        $scope.pages = function() {
          var list = [];
          for (var i = 1; i <= $scope.numberOfPages(); i++) {
            list.push(i);
          }
          return list;
        };

        $scope.nextPageDisabled = function() {
          return $scope.currentPage === $scope.numberOfPages();
        };

        $scope.prevPageDisabled = function() {
          return $scope.currentPage === 1;
        };

        $scope.gotoPage = function(page) {
          $scope.currentPage = page;
          if ($scope.currentPage > $scope.numberOfPages()) {
            $scope.currentPage = $scope.numberOfPages();
          } else if ($scope.currentPage < 1) {
            $scope.currentPage = 1;
          }
          $scope.applyObjects();
        };

        // Watch search value
        $scope.$watch('search.$', function() {
          $scope.gotoPage(1);
          $scope.applyObjects();
        });

        // paginateOrder functions
        this.setOrderBy = function(value) {
          $scope.orderBy = value;
          $scope.applyObjects();
        };

        this.getOrderBy = function() {
          return $scope.orderBy;
        };
      }]
    };
  })

  .directive('paginateOrder', function() {
    return {
      restrict: 'A',
      scope: {},
      transclude: true,
      require: '^paginateMe',
      templateUrl: 'table-paginate-order.html',
      link: function(scope, element, attrs, ctrl) {
        scope.sortByMe = function() {
          if (scope.orderDown()) {
            // Reverse to DESC
            ctrl.setOrderBy('-' + attrs.paginateOrder);
          } else if (scope.orderUp()) {
            // Reverse to ASC
            ctrl.setOrderBy(attrs.paginateOrder);
          } else {
            // If another column is selected
            if (angular.isDefined(attrs.paginateOrderReverse)) {
              ctrl.setOrderBy('-' + attrs.paginateOrder);
            } else {
              ctrl.setOrderBy(attrs.paginateOrder);
            }
          }
        };

        scope.orderDown = function() {
          return ctrl.getOrderBy() === attrs.paginateOrder;
        };

        scope.orderUp = function() {
          return ctrl.getOrderBy() === '-' + attrs.paginateOrder;
        };
      }
    };
  });
}());
