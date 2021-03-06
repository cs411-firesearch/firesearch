'use strict';

/* Controllers */

function IndexCtrl($scope, $http, AuthService, $location) {
  $scope.logout = function(){
    AuthService.logOut();
  };
  $http.get('/api/stocks').
    success(function(data, status, headers, config) {
      $scope.stocks = data.stocks;
    });
  $http.get('/api/comps').
    success(function(data, status, headers, config) {
      $scope.comps = data.comps;
    });
  $scope.showcomp = false;
  $scope.showcompfn = function(b) {
    $scope.showcomp = b;
  }
  $scope.showstock = false;
  $scope.showstockfn = function(b) {
    $scope.showstock = b;
  }
}

function AddCompCtrl($scope, $http, $location) {
  $scope.form = {};
  $scope.submit = function () {
    $http.post('/api/addComp', $scope.form).
      success(function(data) {
        $location.path('/');
      });
  };
}

function AddStockCtrl($scope, $http, $location) {

  $scope.form = {};
  $scope.submit = function() {

    if ($scope.form.CompanyId !== undefined || $scope.form.TransCode !== undefined) {
      $scope.invalidinput = false;
      $http.post('/api/addStock', $scope.form).
        success(function(data) {
          $location.path('/');
        });
    } else {
      $scope.invalidinput = true;
    }

  }
}



function SignUpCtrl($scope, $http, $window, $location, AuthService, $rootScope) {
  $scope.form = {};

  $scope.submit = function(){
    if(!$scope.form.username || $scope.form.username.length > 20){
      $scope.invalidusername = true;
      return;
    }
    $scope.invalidusername = false;
    if ($scope.form.password != $scope.form.password2) {
      return;
    }
    AuthService.signUp($scope.form, function(data){
      if(data.success){
        $window.alert("Sign Up Succeeds!")
        $rootScope.user = data.user;
        $location.path('/');
      }
      else{
        $window.alert(data.error || "Sign Up Failed.");
      }
    });
  };

}

function LogInCtrl($scope, $http, $location, $window, AuthService){

  $scope.form = {};
  $scope.submitPost = function() {
    if (!$scope.form.username || !$scope.form.password) {
      $scope.invalidinput = true;
      return;
    }
    $scope.invalidinput = false;
    AuthService.logIn($scope.form, function(data){
      if (data.success) {
        $window.alert("Login In Succeeds!");
        $location.path('/');
        // $cookieStore.put('user', data.user);
      }
      else {
        $window.alert("Login In Failed.");
      }
    });
  }
}

//need to be fixed when logged out
function ReadStockCtrl($scope, $http, $routeParams, $window, $location, $rootScope) {
  $http.get('/api/stock/' + $routeParams.id).
    success(function(data) {
      $scope.stock = data.stock;
    });
  $scope.addStock = function(){
    if ($scope.add.volume <= 0){
      $window.alert("Please put a valid volume!");
      return;
    }
    else{
      $scope.mayBuy = true;
      $scope.proceedAdd = function(){
        $scope.add.UserId = $rootScope.user.UserId;
        $scope.add.StockId = $scope.stock.StockId;
        $scope.add.Volume = $scope.add.volume;
        $http.post('/api/buyStock',$scope.add).
        success(function(data){
           $window.alert("Add stock successfully!");
           $location.path('/');
        });
     }
     $scope.declineAdd = function(){
        $location.path('/');
      }
    }
  }
}


function RecommendCtrl($scope,$http,$rootScope,AuthService,Utilities){
  //console.log("in the RecommendCtrl");
  $scope.wrapFloat = Utilities.wrapFloat;
  $scope.recommend = [];

  AuthService.checkLogin(function(user){
    if(user){
      $http.get('/recommend/' + user.UserId).
        success(function(data){
          $scope.recommend = data.data;
        });
    }
  })
}

function MyPortCtrl($rootScope,$scope,$http,$window, AuthService,Utilities){
  $scope.stocks = []
  $scope.maySell = []
  $scope.sell = []
  $scope.wrapFloat = Utilities.wrapFloat;
  AuthService.checkLogin(function(user) {
    if (user) {
      $http.get('/api/portfolio/' + user.UserId).
        success(function(data){
          $scope.stocks = data.stocks;
          for (var i in data.stocks) {
            $scope.maySell.push(false);
            $scope.sell.push({});
          }
        });
      $http.get('/api/balance/' + user.UserId).
        success(function(data) {
          $scope.balance = data.Balance;
          // console.log($scope.balance)
        })
    }
  })
  $scope.deleteStock = function(i){
    console.log(i);
    $scope.maySell[i]= true;
  }

  $scope.proceedDelete = function(i){


      if ($scope.sell[i].Volume <= 0) {

        $window.alert("Invalid volume!");
        return;
      }

      $scope.sell[i].UserId = $rootScope.user.UserId;
      $scope.sell[i].StockId = $scope.stocks[i].StockId;
       
      $http.post('/api/sellStock/',$scope.sell[i]).
      success(function(data){
        if (data.error) 
          $window.alert(data.error)
        else
          $window.alert("Delete stock successfully!");
      });
      $scope.maySell[i] = false;
  }
  $scope.declineDelete = function(i){
    $scope.maySell[i] = false;
  }

}

function SearchStockCtrl($scope, $http, $location) {
  $scope.form = {};

  function isValidQuery(q) {
    return q != undefined && q != "";
  }

  $scope.searchstock = function() {

    var apiURL = 'api/searchStock?';
    if (isValidQuery($scope.form.TransCode))
      apiURL += 'TransCode=' + $scope.form.TransCode + '&';
    if (isValidQuery($scope.form.VolumeLow))
      apiURL += 'VolumeLow=' + $scope.form.VolumeLow + '&';
    if (isValidQuery($scope.form.VolumeHigh))
      apiURL += 'VolumeHigh=' + $scope.form.VolumeHigh + '&';
    if (isValidQuery($scope.form.DivYieldLow))
      apiURL += 'DivYieldLow=' + $scope.form.DivYieldLow + '&';
    if (isValidQuery($scope.form.DivYieldHigh))
      apiURL += 'DivYieldHigh=' + $scope.form.DivYieldHigh + '&';
 
    $http.get(apiURL).
      success(function(data){
        $scope.data = data.stocks;
      });
  }
}

function ReadCompCtrl($scope, $http, $routeParams) {
  $http.get('/api/comp/' + $routeParams.id).
    success(function(data) {
      $scope.comp = data.comp;
    });
}






/*
function EditPostCtrl($scope, $http, $location, $routeParams) {
  $scope.form = {};
  $http.get('/api/post/' + $routeParams.id).
    success(function(data) {
      $scope.form = data.post;
    });

  $scope.editPost = function () {
    $http.put('/api/post/' + $routeParams.id, $scope.form).
      success(function(data) {
        $location.url('/readPost/' + $routeParams.id);
      });
  };
}

function DeletePostCtrl($scope, $http, $location, $routeParams) {
  $http.get('/api/post/' + $routeParams.id).
    success(function(data) {
      $scope.post = data.post;
    });

  $scope.deletePost = function () {
    $http.delete('/api/post/' + $routeParams.id).
      success(function(data) {
        $location.url('/');
      });
  };
*/
//


//   $scope.home = function () {
//     $location.url('/');
//   };
// }


