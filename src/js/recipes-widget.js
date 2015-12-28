function RecipesWidget (root, fetch)
{
  // kinda Model
  var recipeService = require('./recipe-service')()
  // kinda Controller
  var actions = require('./actions')(recipeService)
  // definitely View
  var recipeList = require('./recipe-list')(root, actions)

  recipeService.onchange = function (recipes)
  {
    recipeList.render(recipes)
  }

  fetch('/db/recipes.json')
  .then(function (response) {
    return response.json()
  })
  .then(function (recipes) {
    recipeService.set(recipes)
  })
}

module.exports = RecipesWidget
