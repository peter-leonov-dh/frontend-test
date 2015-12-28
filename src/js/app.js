// jQuery, best parts
function $ (s) { return document.querySelector(s) }

var recipesWidget = require('./recipes-widget')($('.RecipeList'), window.fetch)
