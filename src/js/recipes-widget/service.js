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

    // a very good ground for Ramda
    this.recipes
      .filter(function (recipe) {
        return recipe.id == id
      })
      .forEach(function (recipe) {
        recipe.isFavorite = true
        recipe.favorites += 1
      })

    this.emit()

    someApiCall().catch(() =>
    {
      // need to cancel the action and revert our optimistically updated state
      this.revert()
      this.emit()
    })
  },

  unfavoriteRecipe: function (id)
  {
    this.commit()

    // if not forbidded to use any external libraries, I would use Ramda here
    this.recipes
      .filter(function (recipe) {
        return recipe.id == id
      })
      .forEach(function (recipe) {
        recipe.isFavorite = false
        recipe.favorites += -1
      })

    this.emit()

    someApiCall().catch(() =>
    {
      // need to cancel the action and revert our optimistically updated state
      this.revert()
      this.emit()
    })
  }
}

function someApiCall ()
{
  return new Promise(function (resolve, reject)
  {
    // simulate that the backend did not accept our update event
    if (Math.random() >= 0.5)
      return

    console.log('simulating backend failure')
    // set timeout to mimic real world latency
    window.setTimeout(reject, 250)
  })
}

module.exports = function () { return new RecipeService() }
