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
