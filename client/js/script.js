$(document).ready(function( ) {
  $('#sound_tag')[0].play()

  $('#landing-button').on('click', function(){
    getLandingPage();
  })

  $('#str-button').on('click', function() {
      getHeroesCards('str');
  })

  $('#agi-button').on('click', function() {
      getHeroesCards('agi');
  })

  $('#int-button').on('click', function() {
      getHeroesCards('int');
  })

  $('#livestream-button').on('click', function() {
      getLiveStream();
  })

})

function youtubeEmbeded() {
  const inputSearch = $(`#search-input`).val()
  console.log(inputSearch)
  $(`#player`).empty()
  event.preventDefault()
  $.ajax({
      method : `GET`,
      url: `http://localhost:3000/live/youtube/${inputSearch}`,
      // data : {input : inputsearch}
  })
  .done((vids)=> {
      vids.forEach(vid => {
         $(`#player`).append(`
         <iframe width="560" height="315" src="https://www.youtube.com/embed/${vid.id.videoId}"></iframe>
         `)
      })
  })
  .fail((err)=> {
      console.log(err)
  })

}

function getLandingPage() {
  $('#livestream').hide();
  $('#content-cards').hide();
  $('#landing-page').show();
}

function getHeroesCards(type){
  $.ajax({
    url: `${baseurl}/dota/heroes`,
    method: 'GET'
  })
    .done((heroes) => {
      
      $('#landing-page').hide();
      $('#livestream').hide();
      $('#content-cards').empty();
      $('#content-cards').show();
      const {str, agi ,int } = groupHeroesByAttr(heroes.stats);
 
      switch(type) {
        case 'str':
          str.forEach(el => {
            generateHeroCard(el);
          })
        break;

        case 'agi':
        agi.forEach(el => {
          generateHeroCard(el);
        })
        break;

        case 'int':
          int.forEach(el => {
            generateHeroCard(el);
          })
        break;

        default:
        break;
      }
      
    })
    .fail(err => {
      console.log(err)
    })
}

function groupHeroesByAttr(array){
  const agi = [];
  const int = [];
  const str = [];

  array.forEach((el) => {
    switch(el.primary_attr) {
      case 'agi':
        agi.push(el.img)
      break;
      case 'int':
        int.push(el.img)
      break;
      case 'str': 
        str.push(el.img)
      break;
      default:
      break;
   }
  })
  return { str, agi, int }
}

function getLiveStream() {

  $.ajax({
    method: 'GET',
    url:`${baseurl}/live/videos`
  })

    .done((data) => {

      $('#landing-page').hide();
      $('#content-cards').hide();

      let html = ''
      let streamer = data.data
      for (let i = 0 ; i< streamer.length; i++) {
        html += `
          <div class="col-md-4 my-1">
            <div class="card my-2 mx-2">
              <iframe
                src="https://player.twitch.tv/?channel=${streamer[i]}&autoplay=false&muted=true"
                height="300"
                width="400"
                allowfullscreen="true"
                scrolling="no"
                preload="none">
              </iframe>
            </div>
          </div>
        `
      }
      $('#livestream').append(html);
      $('#livestream').show();
    })
    .fail((err) => {
      console.log(err)
    })
}


function generateHeroCard(imgurl) {
  
  $('#content-cards').append
    (`<div class="col-md-3 my-1">
      <div class="card my-3 mx-3">
      <img class="img-fluid" src="${imgurl}" style="height: 180px;"><br>
      <a href="#" class="card-link" >Card link</a>
      </div>
    </div> 
  `)  
  
}
