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

  toggleRecipe: function (id)
  {
    // do async stuff here

    if (this.favorites[id]) {
      var isFavorite = false
      this.favorites[id] = false
    } else {
      var isFavorite = true
      this.favorites[id] = true
    }

    this.recipes
      .filter(function (recipe) {
        return recipe.id == id
      })
      .forEach(function (recipe) {
        recipe.isFavorite = isFavorite
        recipe.favorites += isFavorite ? 1 : -1
      })

    this.onchange(this.recipes)
  }
}

module.exports = function () { return new RecipeService() }
