$(document).ready(function( ) {
  $('#str-button').on('click', function() {
      getHeroesCards('str')
  })
  $('#agi-button').on('click', function() {
      getHeroesCards('agi')
  })
  $('#int-button').on('click', function() {
      getHeroesCards('int')
  })
})

function getHeroesCards(type){
  $.ajax({
    url: 'http://localhost:3000/dota/heroes',
    method: 'GET'
  })
    .done((heroes) => {
      
      $('#landing-page').hide();

      const {str, agi ,int } = groupHeroesByAttr(heroes.stats);
 
     
                  

      switch(type) {
        case 'str':
          str.forEach(el => {
            $('#content-cards').append
              (`<div class="col-md-4>
                  <div class="card mb-3>
                  <img style="width: 287px; height: 326px;" src="${el}"><br>
                  <a href="#" class="card-link">Card link</a>
                  </div>
                </div> 
              `)  
          })
        break;
        case 'agi':

        agi.forEach(el => {
          $('#content-cards').append
          (`<div class="col-md-4>
              <div class="card mb-3>
              <img style="width: 287px; height: 326px;" src="${el}"><br>
              <a href="#" class="card-link">Card link</a>
              </div>
            </div> 
          `)  
        })
        break;
        case 'int':
          int.forEach(el => {
            $('#content-cards').append
            (`<div class="col-md-4>
                <div class="card mb-3>
                <img style="width: 287px; height: 326px;" src="${el}"><br>
                <a href="#" class="card-link">Card link</a>
                </div>
              </div> 
            `)  
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
  return { agi, int, str }
}




