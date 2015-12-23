!function(){

var RecipeService =
{
  // dump EventEmitter replacement
  onchange: function () { /*noop*/ },

  recipes: [],

  set: function (recipes)
  {
    this.recipes = recipes
    this.onchange(this.recipes)
  },

  incrementRecipeFavoritesCount: function (id)
  {
    // send AJAX request here
    this.recipes
      .filter(function (recipe) {
        return recipe.id == id
      })
      .forEach(function (recipe) {
        recipe.favorites++
      })

    this.onchange(this.recipes)
  }
}

var Actions =
{
  favorite: function (id)
  {
    return function ()
    {
      RecipeService.incrementRecipeFavoritesCount(id)
    }
  }
}

// React.js, best parts ;)
function E (tag, props) {
  var node = document.createElement(tag)

  var style = props.style
  if (style)
  {
    delete props.style
    for (var k in style)
      node.style[k] = style[k]
  }

  for (var k in props)
    node[k] = props[k]

  for (var i = 2; i < arguments.length; i++)
  {
    var child = arguments[i]
    if (typeof child == 'string')
      child = document.createTextNode(child)
    node.appendChild(child)
  }

  return node
}


// class RecipeList
function RecipeList (root)
{
  this.root = root
}

RecipeList.prototype =
{
  render: function (recipes)
  {
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
          E('a', {className: 'Recipe-favorites', onclick: Actions.favorite(recipe.id)},
            recipe.favorites + '★'
          )
        )
      )
    })
  }
}

function app ()
{
  var recipeList = new RecipeList(document.querySelector('.RecipeList'))
  RecipeService.onchange = function (recipes)
  {
    recipeList.render(recipes)
  }

  window.fetch('/db/recipes.json')
  .then(function(response) {
    return response.json()
  })
  .then(function(recipes) {
    RecipeService.set(recipes)
  })
}
app()

}();
