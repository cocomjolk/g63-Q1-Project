// can fetch thrree photos based on hardcoded container
//don't know how to make get URL dynamic to change
//the tag. entering in a variable or putting on different lines
//Breaks the $get URL.
//Could not use match() function insode timeout function, got error
//had trouble changing picture size, was going to use vanilla JS for dom manipulation
//to create an element but manipulated the card instead.
//1. are the `` symbol and method the most efficient way of adding to the DOM??

//$("#themeMusic")[0].play();

$('#container button[type=button]').click(function(el){
  $("#pullSound")[0].play();
  el.preventDefault();
  //attempt to choose categoty with text input.Not working!!!!
  // let container = $('#container input[type=text]').val();
  //displays text from search box to console.

  //removes the three images to clear the screen
  $( ".image" ).remove();
  $( "#alerts" ).remove();

  let slotPics = [ getCatPics, getClownPics, getBunnyPics ]
  let numbers = [0,1,2];
  let randomNumberStr = '';
  let numberToMatch = '';

  for (let i = 0; i < numbers.length; i++) {
    let randomIndex = Math.floor(Math.random() * 3);
    //will execute pic function based on random index
    slotPics[randomIndex]();
    randomNumberStr += randomIndex;
    //used to match up
    numberToMatch += randomNumberStr[0];
  }

  setTimeout(function () {
    if(randomNumberStr === '111'){
        $("#winSoundEvilLaugh")[0].play();
        let alert = `<div id="alerts" class="alert alert-success" role="alert">YOU WIN!!...But STILL LOSE
                    </div>`
        $('#container').append(alert);
        let gif1 = `<div id="gifClown1"></div>`
        $('#container').append(gif1);
      }
      else if(numberToMatch === randomNumberStr){
        $("#winSoundOther")[0].play();
        let alert = `<div id="alerts" class="alert alert-success" role="alert">YOU WIN!!
                    </div>`
        $('#container').append(alert);
        let gif1 = `<div id="gifWin"></div>`
        $('#container').append(gif1);
      }
      else {
      $("#loseSound")[0].play();
      //alert('You lose, try again')
      let alert = `<div id="alerts" class="alert alert-danger" role="alert">You lose!!
                  </div>`

      $('#container').append(alert);
    }
  }, 2000);

  console.log(randomNumberStr);

});






function getCatPics(){
  //adding a comma after tag you can add more tags.
  //URL ishard coded with
  //is there a better place I can put this URL
  let catsFlickrUrlReq = ` https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=3a25eb776abf5b7fd797c0d8bf4c243e&tags=kittens&format=json&nojsoncallback=1`
  //fetched json data from flickr API using jQuery .done is a promise used to prevent function until fetch is complete.
  $.get(catsFlickrUrlReq).done(function(data){
    //data is the json object with all the data
    let picInfo = data;
    //prints all of the object
    //console.log(picInfo);
    let photoArr = data.photos.photo;
    var randomIndex = Math.floor(Math.random() * 50);
      //console.log(randomIndex);
      //capturing values to pass to image URL
      let farm = (data.photos.photo[randomIndex].farm);
      let server = (data.photos.photo[randomIndex].server);
      let id = (data.photos.photo[randomIndex].id);
      let secret = (data.photos.photo[randomIndex].secret);
      let imageURL = 'https://farm' + farm + '.staticflickr.com/' + server + '/' + id + '_' + secret + '.jpg'
      //creating HTML insert into body and display image. use ${***} to enter into HTML, if just use naked variable it would not work.
      // let imageResults = document.getElementById('imageResults');
      // let pic = document.createElement('div');
      // pic.classList.add('pic');
      // imageResults.append(pic);
      let card = `<div class="image">
                    <img id="pic" src=${imageURL} class="img-rounded">
                  </div>`
      // let slot = document.createElement('div');
      // slot.classList.add('imgCss');
      $('#imageResults').append(card);
  })
};

function getClownPics(){
  let dogsFlickrUrlReq = ` https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=3a25eb776abf5b7fd797c0d8bf4c243e&tags=scaryclown&format=json&nojsoncallback=1`
  $.get(dogsFlickrUrlReq).done(function(data){
    let picInfo = data;
    let photoArr = data.photos.photo;
    var randomIndex = Math.floor(Math.random() * 50);
      let farm = (data.photos.photo[randomIndex].farm);
      let server = (data.photos.photo[randomIndex].server);
      let id = (data.photos.photo[randomIndex].id);
      let secret = (data.photos.photo[randomIndex].secret);
      let imageURL = 'https://farm' + farm + '.staticflickr.com/' + server + '/' + id + '_' + secret + '.jpg'
      let card = `<div class="image">
                    <img id="pic" src=${imageURL} class="img-rounded">
                  </div>`
      $('#imageResults').append(card);
  })
};

function getBunnyPics(){
  let sharkFlickrUrlReq = ` https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=3a25eb776abf5b7fd797c0d8bf4c243e&tags=pokemoncard&format=json&nojsoncallback=1`
  $.get(sharkFlickrUrlReq).done(function(data){
    let picInfo = data;
    let photoArr = data.photos.photo;
    var randomIndex = Math.floor(Math.random() * 50);
      let farm = (data.photos.photo[randomIndex].farm);
      let server = (data.photos.photo[randomIndex].server);
      let id = (data.photos.photo[randomIndex].id);
      let secret = (data.photos.photo[randomIndex].secret);
      let imageURL = 'https://farm' + farm + '.staticflickr.com/' + server + '/' + id + '_' + secret + '.jpg'
      let card = `<div class="image">
                    <img id="pic" src=${imageURL} class="img-rounded">
                  </div>`
      $('#imageResults').append(card);
  })
};

//creates 3 random numbers, return array of the three. Can use string also.
function random3Numbers(){
  let numbers = [0,1,2];
  let randomNumberArr = [];
  for (let i = 0; i < numbers.length; i++) {
    let randomIndex = Math.floor(Math.random() * 3);
    randomNumberArr.push(numbers[randomIndex]);
  };
  return randomNumberArr;
};

// function match(){
//   if(numberToMatch === randomNumberStr){
//     alert("YOU ARE A WINNER!!!")
//   }
//   else {
//     alert('You lose, try again')
//   }
// };





//How to fecth pic from flickr
// https://farm{farm-id}.staticflickr.com/{server-id}/{id}_{secret}.jpg
// not used https://farm{farm-id}.staticflickr.com/{server-id}/{id}_{secret}_[mstzb].jpg
// not used https://farm{farm-id}.staticflickr.com/{server-id}/{id}_{o-secret}_o.(jpg|gif|png)

// let obj1 = {
//               farm: 5,
//               id: "36985737295",
//               isfamily: 0,
//               isfriend: 0,
//               ispublic: 1,
//               owner: "148036032@N07",
//               secret : "2273007d4f",
//               server: "4435",
//               title: "I made Katniss a wig! - The Caturday"

// Key: 3a25eb776abf5b7fd797c0d8bf4c243e
// Secret: 00a06c56407eac4b













// let jsonFormat = "http://api.flickr.com/services/rest/?&method=flickr.people.getPublicPhotos&api_key=[your api key here]&user_id=[your user id here]&format=json"
