class RecipeService
{
  constructor ()
  {
    // pure JS objects
    this.recipes = []
  }

  // should be a mixin or a module
  // with a transaction-like semantics
  commit ()
  {
    if (!this.commits)
      this.commits = []
    // dump data dump
    this.commits.push(JSON.stringify(this.recipes))
  }
  revert ()
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
  }

  // dump EventEmitter replacement
  onchange () { /* noop */ }
  emit ()
  {
    this.onchange(this.recipes)
  }

  // actual service code
  setRecipes (recipes)
  {
    this.commit()

    this.recipes = recipes

    this.emit()
  }

  favoriteRecipe (id)
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
  }

  unfavoriteRecipe (id)
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

// export a factory
module.exports = function () { return new RecipeService() }
