// needs DSL like in ReFLUX
module.exports = function (recipeService)
{
  return {
    favoriteRecipe: function (id) {
      return function ()
      {
        recipeService.favoriteRecipe(id)
      }
    },
    unfavoriteRecipe: function (id) {
      return function ()
      {
        recipeService.unfavoriteRecipe(id)
      }
    }
  }
}
