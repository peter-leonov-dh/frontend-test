var E = require('../lib/e')

// class RecipeList
module.exports = function renderRecipeList (recipes, actions)
{
  // pretending React is not yet invented ;)
  return E('ul', {className: 'RecipeList'},
    recipes.map(function (recipe) {
      return E('li', {className: 'Recipe', style: {backgroundImage: 'url('+recipe.image+')'}},
        E('h2', {className: 'Recipe-title'},
          E('span', {className: 'Recipe-name'},
            recipe.name
          ),
          E('span', {className: 'Recipe-headline'},
            recipe.headline
          )
        ),
        E('a', {className: 'Recipe-favorites', onclick: actions.favoriteRecipe(recipe.id)},
          recipe.favorites + '★'
        ),
        E('ul', {className: 'Recipe-ingredientList'},
          recipe.ingredients.map(function (ingredient)
          {
            return E('li', {className: 'Recipe-ingredient'},
              ingredient
            )
          })
        )
      )
    })
  )
}
