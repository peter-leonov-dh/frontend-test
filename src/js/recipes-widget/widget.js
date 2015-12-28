function RecipesWidget (root, fetch)
{
  // kinda Model
  var recipeService = require('./service')()
  // kinda Controller
  var actions = require('./actions')(recipeService)
  // definitely View
  var view = require('./view')(root, actions)

  recipeService.onchange = function (recipes)
  {
    view.render(recipes)
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
