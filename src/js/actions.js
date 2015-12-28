// needs DSL like in ReFLUX
module.exports = function (recipeService)
{
  return {
    favorite: function (id) {
      return function ()
      {
        recipeService.incrementRecipeFavoritesCount(id)
      }
    }
  }
}
