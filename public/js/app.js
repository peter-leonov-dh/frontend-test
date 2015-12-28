(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// jQuery, best parts
var $ = require('./lib/query')
var fetch = require('./lib/fetch')

var recipesWidget = require('./recipes-widget/widget')($('.RecipeList'), fetch)

},{"./lib/fetch":3,"./lib/query":4,"./recipes-widget/widget":8}],2:[function(require,module,exports){
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

module.exports = E

},{}],3:[function(require,module,exports){
// XMLHTTPRequest, the best part
module.exports = window.fetch

},{}],4:[function(require,module,exports){
// jQuery, best parts
module.exports = function $ (s) { return document.querySelector(s) }

},{}],5:[function(require,module,exports){
// needs DSL like in ReFLUX
module.exports = function (recipeService)
{
  return {
    favorite: function (id) {
      return function ()
      {
        recipeService.incrementRecipeFavoritesCount(id)
      }
    }
  }
}

},{}],6:[function(require,module,exports){
function RecipeService ()
{
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

module.exports = function () { return new RecipeService() }

},{}],7:[function(require,module,exports){
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

},{"../lib/e":2}],8:[function(require,module,exports){
function RecipesWidget (root, fetch)
{
  // kinda Model
  var recipeService = require('./service')()
  // kinda Controller
  var actions = require('./actions')(recipeService)
  // definitely View
  var view = require('./view')(root, actions)

  recipeService.onchange = function (recipes)
  {
    view.render(recipes)
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

},{"./actions":5,"./service":6,"./view":7}]},{},[1]);
