var E = require('../lib/e')

// class RecipeList
function RecipeList (root, actions)
{
  this.root = root
  this.actions = actions
}

RecipeList.prototype =
{
  render: function (recipes)
  {
    var actions = this.actions
    var root = this.root
    // empty root first
    root.innerHTML = ''
    // pretending React is not yet invented ;)
    recipes.forEach(function (recipe)
    {
      root.appendChild(
        E('li', {className: 'Recipe', style: {backgroundImage: 'url('+recipe.image+')'}},
          E('h2', {className: 'Recipe-title'},
            E('span', {className: 'Recipe-name'},
              recipe.name
            ),
            E('span', {className: 'Recipe-headline'},
              recipe.headline
            )
          ),
          E('a', {className: 'Recipe-favorites', onclick: actions.favorite(recipe.id)},
            recipe.favorites + '★'
          )
        )
      )
    })
  }
}

module.exports = function (root, actions)
{
  return new RecipeList(root, actions)
}
