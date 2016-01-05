var E = require('../lib/e')

module.exports = function renderRecipeList (recipes, actions)
{
  // I wish React would support Slim…
  return (
    <ul className="RecipeList">
    {recipes.map(recipe =>
        <li className="Recipe" style={{backgroundImage: 'url('+recipe.image+')'}}>
          <h2 className="Recipe-title">
           <span className="Recipe-name">{recipe.name}</span>
           <span className="Recipe-headline">{recipe.headline}</span>
          </h2>

          <div className="Recipe-favorites Favorite">
            <span className="Favorite-count">{recipe.favorites}</span>
            {recipe.isFavorite
              ? <i className="Favorite-sign is-favorite" onclick={actions.unfavoriteRecipe(recipe.id)} />
              : <i className="Favorite-sign"             onclick={actions.favoriteRecipe(recipe.id)} />
            }
          </div>

          <ul className="Recipe-ingredientList">
            {recipe.ingredients.map(ingredient =>
              E('li', {className: 'Recipe-ingredient'},
                ingredient
              )
            )}
          </ul>
        </li>
    )}
    </ul>
  )
}
