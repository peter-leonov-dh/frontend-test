// jQuery, best parts
var $ = require('./lib/query')
var fetch = require('./lib/fetch')

var recipesWidget = require('./recipes-widget/widget')($('#app'), fetch)
