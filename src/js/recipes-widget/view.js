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
        // I wish React would support Slim…
        E('div', {className: 'Recipe-favorites Favorite'},
          E('span', {className: 'Favorite-count'}, recipe.favorites),
          recipe.isFavorite
            ? E('span', {className: 'Favorite-sign is-favorite', onclick: actions.unfavoriteRecipe(recipe.id)})
            : E('span', {className: 'Favorite-sign',             onclick: actions.favoriteRecipe(recipe.id)})
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
