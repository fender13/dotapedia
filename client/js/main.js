const baseurl = 'http://35.240.221.78'

function onSignIn(googleUser) {
  var id_token = googleUser.getAuthResponse().id_token

  $.ajax({
    method: 'POST',
    url: `${baseurl}/login`,
    data: {
      id_token: id_token
    }
  })
    .done((response) => {
      localStorage.setItem('token', response.token)
      // swal(`Welcome to Re-Chef, ${response.data.first_name} ${response.data.last_name}`)
    })
    .fail((err) => {
      console.log(err)
    })
}

function signOut() {
  var auth2 = gapi.auth2.getAuthInstance()
  auth2.signOut().then(function () {
    console.log('User signed out.')
  })
  localStorage.removeItem('token')
  $('.row').empty()
  // swal('See youu..')
}