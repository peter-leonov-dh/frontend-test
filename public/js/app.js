!function(){

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
  this.nodes = {
    root: root
  }

  this.state = {
    recipes: []
  }
}

RecipeList.prototype =
{
  setRecipes: function (recipes)
  {
    this.state.recipes = recipes
    this.render()
  },

  render: function ()
  {
    var root = this.nodes.root
    // empty root first
    root.innerHTML = ''
    // pretending React is not yet invented ;)
    this.state.recipes.forEach(function (recipe)
    {
      console.log(recipe.image)
      root.appendChild(
        E('li', {className: 'Recipe', style: {backgroundImage: 'url('+recipe.image+')'}},
          E('h2', {className: 'Recipe-title'},
            E('span', {className: 'Recipe-name'},
              recipe.name
            ),
            E('span', {className: 'Recipe-headline'},
              recipe.headline
            )
          )
        )
      )
    })
  }
}


window.fetch('/db/recipes.json')
.then(function(response) {
  return response.json()
})
.then(function(json) {
  new RecipeList(document.querySelector('.RecipeList')).setRecipes(json)
})


}();
