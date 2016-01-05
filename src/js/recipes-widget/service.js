function RecipeService ()
{
  // pure JS objects
  this.recipes = []
}

RecipeService.prototype =
{
  // should be a mixin or a module
  // with a transaction-like semantics
  commit: function ()
  {
    if (!this.commits)
      this.commits = []
    // dump data dump
    this.commits.push(JSON.stringify(this.recipes))
  },
  revert: function ()
  {
    if (!this.commits)
      return
    var commit = this.commits.pop()
    if (!commit)
    {
      console.log('trying to revert to pre-initial commit')
      return
    }
    // dump data dump
    this.recipes = JSON.parse(commit)
  },

  // dump EventEmitter replacement
  onchange: function () { /* noop */ },
  emit: function ()
  {
    this.onchange(this.recipes)
  },

  // actual service code
  setRecipes: function (recipes)
  {
    this.commit()

    this.recipes = recipes

    this.emit()
  },

  favoriteRecipe: function (id)
  {
    this.commit()

    this.recipes
      .filter(function (recipe) {
        return recipe.id == id
      })
      .forEach(function (recipe) {
        recipe.isFavorite = true
        recipe.favorites += 1
      })

    this.emit()
  },

  unfavoriteRecipe: function (id)
  {
    this.commit()

    this.recipes
      .filter(function (recipe) {
        return recipe.id == id
      })
      .forEach(function (recipe) {
        recipe.isFavorite = false
        recipe.favorites += -1
      })

    this.emit()
  }
}

module.exports = function () { return new RecipeService() }
