const baseurl = 'http://localhost:3000'

$('document').ready(function() {
  liveStream()
})

function liveStream() {
  $.ajax({
    method: 'GET',
    url:`${baseurl}/live/videos`
  })

    .done((data) => {
      let html = ''
      let dataUser = data.data
      for (let i = 0 ; i< dataUser.length; i++) {
        html += `
        <iframe
            src="https://player.twitch.tv/?channel=${dataUser[i]}&autoplay=false"
            height="720"
            width="1280"
    
      
            allowfullscreen="true">
        </iframe>



        `
      }
      $('.live-stream').append(html);
    })
    .fail((err) => {
      console.log(err)
    })
}

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