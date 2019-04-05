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
  $(`#landing-page`).hide()

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
        agi.push(el)
      break;
      case 'int':
        int.push(el)
      break;
      case 'str': 
        str.push(el)
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

$(`#content-cards`).on('click', '.see-detail', function(){
  const id = this.id  

  $.ajax({
    url: `${baseurl}/dota/heroes`,
    method: 'GET'
  })
  .done((data)=>{
    // console.log(data)
    $(`#exampleModalLabel`).html(`Hero <img src="${data.stats[id - 1].icon} "> Detail :` )
    $('.modal-body').html(`
    <div class="container-fluid">
        <div class="row">
            <div class="col-md-4">
                <img src="" class="img-fluid">
            </div>
            <div class="col-md-8">
                <ul class="list-group" style="margin-left:-52%">
    <li class="list-group-item"><h3>${data.stats[id - 1].name}</h3></li>
    <li class="list-group-item">Type:${data.stats[id - 1].attack_type} </li>
    <li class="list-group-item">Roles:  ${[...data.stats[id - 1].roles]}</li>
    <li class="list-group-item">Base Health:${data.stats[id - 1].base_health} </li>
    <li class="list-group-item">Base Mana:${data.stats[id - 1].base_mana} </li>
    <li class="list-group-item">Base Armor:${data.stats[id - 1].base_armor} </li>
    <li class="list-group-item">Base Attack Min:${data.stats[id - 1].base_attack_min} </li>
    <li class="list-group-item">Base Attack Max:${data.stats[id - 1].base_attack_max} </li>
    <li class="list-group-item">Base Str:${data.stats[id - 1].base_str} </li>
    <li class="list-group-item">Base Agi:${data.stats[id - 1].base_agi} </li>
    <li class="list-group-item">Base Int:${data.stats[id - 1].base_int} </li>
    <li class="list-group-item">Attack Range:${data.stats[id - 1].attack_range} </li>
    <li class="list-group-item">Attack Rate:${data.stats[id - 1].attack_rate} </li>
    <li class="list-group-item">Move Speed:${data.stats[id - 1].move_speed} </li>
    <li class="list-group-item">Projectile Speed:${data.stats[id - 1].projectile_speed} </li>
    <li class="list-group-item">Legs:${data.stats[id - 1].legs} </li>
                    
                </ul>
            </div>
        </div>
    </div>
`)
  })
  .fail((err)=> {
    console.log(err)
  })
})

function generateHeroCard(obj) {
  
  $('#content-cards').append
    (`<div class="col-md-3 my-1">
      <div class="card my-3 mx-3">
      <img class="img-fluid" src="${obj.img}" style="height: 180px;"><br>
      <a href="#" class="card-link see-detail" data-toggle="modal" data-target="#exampleModal" id="${obj.id}" name="${obj.name}" style="text-align:center">See Detail</a>
      </div>
      
    </div> 
  `)  
  
}
