myApp.service('RecipeService', function ($http) {
  console.log('in RecipeService');
  var self = this;
  self.recipeObject = {
    suggested: [],
    saved: []
  }

  self.matchSaves = function (uri1) {
    var results = self.recipeObject.saved.filter(function (uri2) {
      return uri2.uri === uri1;
    })
    console.log('results ->', results);
    if (results.length > 0) {
      return true
    } else {
      return false
    }
  }

  self.updateSaves = function () {
    for (var i = 0; i < self.recipeObject.suggested.length; i++) {
      self.recipeObject.suggested[i].saved = self.matchSaves(self.recipeObject.suggested[i].uri);
    }
    console.log('self.recipeObject after updateSaves ->', self.recipeObject);

  }

  self.recipeSuggest = function (food) {
    self.recipeObject.suggested = [];
    console.log('in get suggested recipes');

    return $http({
      method: 'GET',
      url: '/recipe/suggest?name=' + food
    }).then(function (response) {
      console.log('Edamom call response ->', response.data);
      for (var i = 0; i < 5; i++) {
        var recipe = {
          label: response.data.hits[i].recipe.label,
          url: response.data.hits[i].recipe.url,
          uri: response.data.hits[i].recipe.uri,
          dietLabels: response.data.hits[i].recipe.diet,
          healthLabels: response.data.hits[i].recipe.healthLabels,
          ingredientLines: response.data.hits[i].recipe.ingredientLines,
          image: response.data.hits[i].recipe.image,
          source: response.data.hits[i].recipe.source
        }
        recipe.saved = self.matchSaves(recipe.uri);
        self.recipeObject.suggested.push(recipe);
      }
      console.log('self.suggestedRecipes ->', self.recipeObject.suggested);
    })
  }

  self.getSaved = function () {
    self.recipeObject.saved = [];

    $http({
      method: 'GET',
      url: '/recipe'
    }).then(function (response) {
      console.log('in getSaved w/ response.data[0].recipes ->', response.data[0].recipes);
      for (var i = 0; i < response.data[0].recipes.length; i++) {
        self.recipeObject.saved.push(response.data[0].recipes[i]);
      }
      console.log('self.recipeObject.saved ->', self.recipeObject.saved);
    }).then(function () {
      if (self.recipeObject.suggested.length>0){
      self.updateSaves();
      }
    })
  }

  self.postRecipe = function (recipe) {
    console.log('in postRecipe w/ recipe ->', recipe);

    $http({
      method: 'POST',
      url: '/recipe',
      data: recipe
    }).then(function () {
      self.getSaved();
    })
  }

  self.deleteRecipe = function (uri) {
    console.log('in deleteRecipe w/ uri ->', uri);

    uri = uri.slice(44);
    // API uses URI for ID and this URI breaks the DELETE route due to being passed on its URL
    // To remedy this, I slice the first many characters off and keep just the identifying piece

    var objToSend = {
      uri: uri
    }

    return $http({
      method: 'DELETE',
      url: '/recipe/' + uri
      // data: objToSend
    }).then(function () {
      self.getSaved();
    }).then(function () {
      self.updateSaves();
    })
  }
})