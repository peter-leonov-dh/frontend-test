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
