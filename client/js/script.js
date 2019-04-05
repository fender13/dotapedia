$(document).ready(function( ) {
  $('#sound_tag')[0].play()
  getLiveStreamPage();
  $('#str-button').on('click', function() {
      getHeroesCards('str')
  })
  $('#agi-button').on('click', function() {
      getHeroesCards('agi')
  })
  $('#int-button').on('click', function() {
      getHeroesCards('int')
  })
  // $('livestream-button').on('click', function(){
  //     getLiveStreamPage();
  // })


})

function getHeroesCards(type){
  $.ajax({
    url: `${baseurl}/dota/heroes`,
    method: 'GET'
  })
    .done((heroes) => {
      
      $('#landing-page').hide();
      $('#livestream').hide();

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

function getLiveStreamPage(){

  $('#landing-page').hide();
  $('#content-cards').hide();

    $.ajax({
      method: 'GET',
      url:`http://localhost:3000/live/videos`
    })
      .done((data) => {

        data.data.forEach((el) => {
          $('livestream').append(`
          <div class ="col-md-4 my-1 mx-1>
            <iframe src="https://player.twitch.tv/?channel=${el}" frameborder="0" allowfullscreen="true" scrolling="no" height="378" width="620"></iframe><a href="https://www.twitch.tv/${el}?tt_content=text_link&tt_medium=live_embed" style="padding:2px 0px 4px; display:block; width:345px; font-weight:normal; font-size:10px; text-decoration:underline;">Watch live video from ybicanoooobov on www.twitch.tv</a>
          </div>
         `)
        })  
      })  
      .fail((err) => {
        console.log(err.message)
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

function generateHeroCard(imgurl) {
  
  $('#content-cards').append
    (`<div class="col-md-3 my-1">
      <div class="card my-3 mx-3">
      <img style="width: 180px; height: 180px;" src="${imgurl}"><br>
      <a href="#" class="card-link" >Card link</a>
      </div>
    </div> 
  `)  
  
}

function generateLiveStreamCard(streamer) {

}


