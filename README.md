angular-lepagination
====================

[DEMO](http://plnkr.co/edit/SYqOBqgtyFt0M6BeDzhE?p=preview)

Install with bower

```sh
bower install angular-lepagination
```

Load the javascript ``angular-lepagination/src/angular-lepagination.min.js`` and declare your Angular dependency

```js
angular.module('myModule', ['bulv1ne.lepagination']);
```

Example usage:

```html
<div>
  <h4>Filter</h4>
  <label>Search: <input type="text" ng-model="search.$" /></label>
</div>
<div paginate-me
     objects="people"
     data="$myVar = $objects"
     order-by="name"
     page-size="10"
     search="search">
  <table class="table">
    <thead>
      <tr>
        <th paginate-order="id" paginate-order-reverse>#</th>
        <th paginate-order="name">Name</th>
        <th paginate-order="age" paginate-order-reverse>Age</th>
      </tr>
    </thead>
    <tbody>
      <tr ng-repeat="obj in $myVar">
        <td>{{obj.id}}</td>
        <td>{{obj.name}}</td>
        <td>{{obj.age}}</td>
      </tr>
    </tbody>
  </table>
</div>
```

```js
// Example list of people
$scope.people = [
  { id: 1, name: 'Anna', age: 24},
  { id: 2, name: 'Bob', age: 30},
  { id: 3, name: 'Cesar', age: 26},
  { id: 4, name: 'David', age: 20},
  { id: 5, name: 'Andy', age: 21},
  { id: 6, name: 'Rene', age: 24},
  { id: 7, name: 'Esther', age: 27},
  { id: 8, name: 'Megan', age: 26},
  { id: 9, name: 'Wayne', age: 40},
  { id: 10, name: 'Dan', age: 43},
  { id: 11, name: 'Hope', age: 45},
  { id: 12, name: 'Albert', age: 44},
  { id: 13, name: 'Jenna', age: 30},
  { id: 14, name: 'Scott', age: 35},
  { id: 15, name: 'Louise', age: 37},
  { id: 16, name: 'Tina', age: 41},
  { id: 17, name: 'Nicole', age: 20}
];
```
