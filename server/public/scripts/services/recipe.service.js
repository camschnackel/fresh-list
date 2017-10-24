myApp.service('RecipeService', function ($http) {
  console.log('in RecipeService');
  var self = this;
  self.suggestedRecipes = [];

  self.recipeSuggest = function (food) {
    self.suggestedRecipes = [];
    console.log('in get suggest recipes');

    return $http({
      method: 'GET',
      url: '/recipes/suggest?name=' + food
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
        self.suggestedRecipes.push(recipe);
      }
      console.log('self.suggestedRecipes ->', self.suggestedRecipes);
    })
  }
})