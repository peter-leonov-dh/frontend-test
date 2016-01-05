function RecipesWidget (root, fetch)
{
  // kinda Model
  var recipeService = require('./service')()
  // kinda Controller
  var actions = require('./actions')(recipeService)
  // definitely View
  var renderRecipeList = require('./view')

  recipeService.onchange = function (recipes)
  {
    // should be done by the uppermost widget
    root.innerHTML = ''
    root.appendChild(renderRecipeList(recipes, actions))
  }

  fetch('/db/recipes.json')
  .then(function (response) {
    return response.json()
  })
  .then(function (recipes) {
    recipeService.setRecipes(recipes)
  })
}

module.exports = RecipesWidget
