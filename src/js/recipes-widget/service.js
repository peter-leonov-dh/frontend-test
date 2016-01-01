function RecipeService ()
{
  this.favorites = {}
  this.recipes = []
  // dump EventEmitter replacement
  this.onchange = function () { /*noop*/ }
}

RecipeService.prototype =
{
  set: function (recipes)
  {
    this.recipes = recipes
    this.onchange(this.recipes)
  },

  favoriteRecipe: function (id)
  {
    this.favorites[id] = true

    this.recipes
      .filter(function (recipe) {
        return recipe.id == id
      })
      .forEach(function (recipe) {
        recipe.isFavorite = true
        recipe.favorites += 1
      })

    this.onchange(this.recipes)
  },

  unfavoriteRecipe: function (id)
  {
    this.favorites[id] = false

    this.recipes
      .filter(function (recipe) {
        return recipe.id == id
      })
      .forEach(function (recipe) {
        recipe.isFavorite = false
        recipe.favorites += -1
      })

    this.onchange(this.recipes)
  }
}

module.exports = function () { return new RecipeService() }
