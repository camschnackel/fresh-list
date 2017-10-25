myApp.service('RecipeService', function ($http) {
  console.log('in RecipeService');
  var self = this;
  self.recipeObject = {
    suggested: [],
    saved: []
  }
  // self.suggestedRecipes = [];
  // self.recipeSave = {
  //   recipe: ''
  // }

  self.recipeSuggest = function (food) {
    self.recipeObject.suggested = [];
    console.log('in get suggested recipes');

    return $http({
      method: 'GET',
      url: '/recipe/suggest?name=' + food
    }).then(function (response) {
      // console.log('Edamom call response ->', response);
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
        self.recipeObject.suggested.push(recipe);
      }
      console.log('self.suggestedRecipes ->', self.recipeObject.suggested);
    })
  }

  self.postRecipe = function (uri) {
    console.log('in postRecipe w/ uri ->', uri);
    
    var objToSend = {
      uri: uri
    }

    return $http({
      method: 'POST',
      url: '/recipe',
      data: objToSend
    });
  }
})