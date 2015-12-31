(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// jQuery, best parts
var $ = require('./lib/query')
var fetch = require('./lib/fetch')

var recipesWidget = require('./recipes-widget/widget')($('#app'), fetch)

var loginFormWidget = require('./login-form-widget/widget')($('#login'))

},{"./lib/fetch":3,"./lib/query":4,"./login-form-widget/widget":5,"./recipes-widget/widget":9}],2:[function(require,module,exports){
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

  Array.from(arguments)
    // shift for positioned args tag and props
    .slice(2)
    // flatten (node1, [node2, node3, …], …nodeN) -> node1, node2, node3, … nodeN
    .reduce(function (ary, arg)
    {
      if (Array.isArray(arg))
        ary = ary.concat(arg)
      else
        ary.push(arg)
      return ary
    }, [])
    // map strings to text nodes
    .map(function (child) {
      if (typeof child == 'string' || typeof child == 'number')
        return document.createTextNode(child)
      else
        return child
    })
    // actually append
    .forEach(function (child) {
      node.appendChild(child)
    })

  return node
}

module.exports = E

},{}],3:[function(require,module,exports){
// XMLHTTPRequest, the best part
module.exports = window.fetch

},{}],4:[function(require,module,exports){
// jQuery, best parts
module.exports = function $ (s) { return document.querySelector(s) }

},{}],5:[function(require,module,exports){
function LoginFormWidget (root)
{
  function check (e)
  {
    e.preventDefault()
    var form = e.target
    Array.from(form.elements).forEach(function (element)
    {
      var check = element.dataset.check
      if (!check)
        return
      var rex = new RegExp(check)
      if (!rex.test(element.value))
        element.classList.add('is-error')
      else
        element.classList.remove('is-error')
    })
  }
  root.addEventListener('submit', check, false)
}

module.exports = LoginFormWidget

},{}],6:[function(require,module,exports){
// needs DSL like in ReFLUX
module.exports = function (recipeService)
{
  return {
    favoriteRecipe: function (id) {
      return function ()
      {
        recipeService.toggleRecipe(id)
      }
    }
  }
}

},{}],7:[function(require,module,exports){
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

},{}],8:[function(require,module,exports){
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
        E('div', {className: 'Recipe-favorites Favorite', onclick: actions.favoriteRecipe(recipe.id)},
          E('span', {className: 'Favorite-count'}, recipe.favorites),
          E('span', {className: 'Favorite-sign' + (recipe.isFavorite ? ' is-favorite' : '')})
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

},{"../lib/e":2}],9:[function(require,module,exports){
function RecipesWidget (root, fetch)
{
  // kinda Model
  var recipeService = require('./service')()
  // kinda Controller
  var actions = require('./actions')(recipeService)
  // definitely View
  var renderRecipeList = require('./view')

  recipeService.onchange = function (recipes)
  {
    // should be done by the uppermost widget
    root.innerHTML = ''
    root.appendChild(renderRecipeList(recipes, actions))
  }

  fetch('/db/recipes.json')
  .then(function (response) {
    return response.json()
  })
  .then(function (recipes) {
    recipeService.set(recipes)
  })
}

module.exports = RecipesWidget

},{"./actions":6,"./service":7,"./view":8}]},{},[1]);
