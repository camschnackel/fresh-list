myApp.service('RecipeService', function ($http) {
  var self = this;
  self.recipeObject = {
    suggested: [],
    saved: [],
    results: []
  }

  // searches for recipes in Edamam API, used in discover view
  self.search = function (food) {
    self.recipeObject.results = [];

    return $http({
      method: 'GET',
      url: '/recipe/search?name=' + food
    }).then(function (response) {
      for (var i = 0; i < 10; i++) {
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
        self.recipeObject.results.push(recipe);
      }
    }).then(function () {
      self.updateDiscoverSaves();
    }).then(function () {
      self.setDefaultToggle(self.recipeObject.results);
    })
  }

  // ensures that saved recipes display saved heart
  self.matchSaves = function (uri1) {
    var results = self.recipeObject.saved.filter(function (uri2) {
      return uri2.uri === uri1;
    })
    if (results.length > 0) {
      return true
    } else {
      return false
    }
  }

  // updates the saved status of a food item within saved recipes view
  self.updateSaves = function () {
    for (var i = 0; i < self.recipeObject.suggested.length; i++) {
      self.recipeObject.suggested[i].saved = self.matchSaves(self.recipeObject.suggested[i].uri);
    }

  }

  // updates the saved status of a food item within discover recipes view
  self.updateDiscoverSaves = function () {
    for (var i = 0; i < self.recipeObject.results.length; i++) {
      self.recipeObject.results[i].saved = self.matchSaves(self.recipeObject.results[i].uri);
    }

  }

  // searches Edamam recipe API for recipes using selected pantry item as search criteria
  self.recipeSuggest = function (food) {
    self.recipeObject.suggested = [];

    return $http({
      method: 'GET',
      url: '/recipe/suggest?name=' + food
    }).then(function (response) {
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
    })
  }

  // makes sure all recipe cards display ingredients by default
  self.setDefaultToggle = function (myArray) {
    for (var i = 0; i < myArray.length; i++) {
      myArray[i].toggleState = {};
      myArray[i].toggleState.Ingredients = true;
      myArray[i].toggleState.Health = false;
      myArray[i].toggleState.Diet = false;

    }
    
  }

  // retrieves saved recipes from database
  self.getSaved = function () {
    
    self.recipeObject.saved = [];

    $http({
      method: 'GET',
      url: '/recipe'
    }).then(function (response) {
      for (var i = 0; i < response.data[0].recipes.length; i++) {
        self.recipeObject.saved.push(response.data[0].recipes[i]);
      }
    }).then(function () {
      if (self.recipeObject.suggested.length > 0) {
        self.updateSaves();
      } else if (self.recipeObject.results.length > 0) {
        self.updateDiscoverSaves();
        self.setDefaultToggle(self.recipeObject.results);
        }
      }).then(function () {
      self.setDefaultToggle(self.recipeObject.saved);
    });
  }

  // posts recipe data to database when save heart is clicked on an unsaved recipe
  self.postRecipe = function (recipe) {

    return $http({
      method: 'POST',
      url: '/recipe',
      data: recipe
    }).then(function () {
      self.getSaved();
    })
  }

  // deletes recipe data from database when recipe heart is clicked on a saved recipe
  self.deleteRecipe = function (uri) {

    uri = uri.slice(44);
    // API uses URI for ID and this URI breaks the DELETE route due to being passed on its URL
    // To remedy this, I slice the first many characters off and keep just the identifying piece


    return $http({
      method: 'DELETE',
      url: '/recipe/' + uri
    }).then(function () {
      self.getSaved();
    })
  }

  // same as above but does not reload recipes to ensure that side-scrolling recipe cards maintain their position
  self.deleteRecipeStop = function (uri) {

    uri = uri.slice(44);
    // API uses URI for ID and this URI breaks the DELETE route due to being passed on its URL
    // To remedy this, I slice the first many characters off and keep just the identifying piece


    return $http({
      method: 'DELETE',
      url: '/recipe/' + uri
      // data: objToSend
    })
  }
})