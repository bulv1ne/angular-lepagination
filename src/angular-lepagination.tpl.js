angular.module('templates-lepagination', ['table-paginate-order.html', 'table-paginate.html']);

angular.module("table-paginate-order.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("table-paginate-order.html",
    "<a href=\"\" ng-click=\"sortByMe()\"><span ng-transclude></span> <span ng-show=\"orderDown()\">&#x25B4;</span> <span ng-show=\"orderUp()\">&#x25BE;</span></a>");
}]);

angular.module("table-paginate.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("table-paginate.html",
    "<div ng-transclude></div><ul class=\"pagination\"><li ng-class=\"{disabled: prevPageDisabled()}\"><a href=\"\" ng-click=\"gotoPage(1)\">&#12298;</a></li><li ng-class=\"{disabled: prevPageDisabled()}\"><a href=\"\" ng-click=\"prevPage()\">&#12296;</a></li><li ng-class=\"{active: (currentPage === page)}\" ng-repeat=\"page in pages()\"><a href=\"\" ng-click=\"gotoPage(page)\">{{page}}</a></li><li ng-class=\"{disabled: nextPageDisabled()}\"><a href=\"\" ng-click=\"nextPage()\">&#12297;</a></li><li ng-class=\"{disabled: nextPageDisabled()}\"><a href=\"\" ng-click=\"gotoPage(numberOfPages())\">&#12299;</a></li></ul>");
}]);
