// needs DSL like in ReFLUX
module.exports = function (recipeService)
{
  return {
    favoriteRecipe (id) {
      return function ()
      {
        recipeService.favoriteRecipe(id)
      }
    },
    unfavoriteRecipe (id) {
      return function ()
      {
        recipeService.unfavoriteRecipe(id)
      }
    }
  }
}
