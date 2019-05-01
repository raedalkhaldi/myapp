
$(document).ready(function () {
    var forms = $('form');
    var allForms = [];
    var topMovies = [];
    var likedMovies = [];
    var notLikedMovies = [];
    var notWatchedMovies = [];


    for (var i = 0; i < 9; i++) {
        allForms.push(forms.clone())
        $(allForms[i]).attr('id', i + 1);

    }
    

    $('body').append(allForms);
    var randomIndex = Math.floor(Math.random() * 807) + 1;
    $.ajax({
        method: 'GET',
        url: 'https://api.themoviedb.org/3/movie/top_rated?api_key=cabb891b02522fd385fe4b50cf6995eb',
        success: renerApiData,
        error: function (error) {
            console.log(error);
        }

    })
    function renerApiData(data) {

        for (var i = 0; i < 10; i++) {
            topMovies.push(data.results[i]);
            $(`#${i} > #name`).text(topMovies[i].title);
            $(`#${i} > #poster-image`).text(topMovies[i].poster_path);
            $(`#${i} > #poster-image`).attr('src', 'http://image.tmdb.org/t/p/w185/' + topMovies[i].poster_path);
            console.log(topMovies[i].title);
          

        }


    }

    $().on('click')

    $('button[type="like"]').one("click", (function (event) {
        event.preventDefault();
        console.log($(`#${$('button[type="like"]').index(this)} > button[type="like"]`));
        likedMovies.push(topMovies[$('button[type="like"]').index(this)].title)
        $(`#${$('button[type="like"]').index(this)} > button[type="no_like"]`).css("background-color", "#F8F8F8"); // change color when clicked
        $(`#${$('button[type="like"]').index(this)} > button[type="no_see"]`).css("background-color", "#F8F8F8	"); // change color when clicked
        $(`#${$('button[type="like"]').index(this)} > button[type="like"]`).css("background-color", "#3366FF"); // change color when clicked



    }))

    $('button[type="no_like"]').one("click", (function (event) {
        event.preventDefault();
        console.log("you did it");
        notLikedMovies.push(topMovies[$('button[type="no_like"]').index(this)].title)
        $(`#${$('button[type="no_like"]').index(this)} > button[type="like"]`).css("background-color", "#F8F8F8"); // change color when clicked
        $(`#${$('button[type="no_like"]').index(this)} > button[type="no_see"]`).css("background-color", "#F8F8F8	"); // change color when clicked
        $(`#${$('button[type="no_like"]').index(this)} > button[type="no_like"]`).css("background-color", "#3366FF"); // change color when clicked


    }))

    $('button[type="no_see"]').one("click", (function (event) {
        event.preventDefault();
        console.log("you did it");
        notWatchedMovies.push(topMovies[$('button[type="no_see"]').index(this)].title)
        $(`#${$('button[type="no_see"]').index(this)} > button[type="like"]`).css("background-color", "#F8F8F8"); // change color when clicked
        $(`#${$('button[type="no_see"]').index(this)} > button[type="no_like"]`).css("background-color", "#F8F8F8	"); // change color when clicked
        $(`#${$('button[type="no_see"]').index(this)} > button[type="no_see"]`).css("background-color", "#3366FF"); // change color when clicked



    }))
    $('button[type="ready"]').one("click", (function (event) {
     
        var notWatchedObjects = notWatchedMovies.map(function (movie){
            for (var i =0 ; i < topMovies.length ; i++){
                if (movie === topMovies[i].title){
                    return topMovies[i]
                }
            }
        })
        var rand = Math.floor(Math.random() * notWatchedObjects.length) ;

        console.log(notWatchedObjects)
        
        event.preventDefault();
        console.log("you Readyyyy ");
        console.log("you liked " + likedMovies);
        console.log("you dont liked " + notLikedMovies);
        console.log("you have not watched  " + notWatchedMovies);
        $('form').empty();
        $('form').remove();
        $('#header_title').text('We Recommend You to Watch')
        $('body').append('<h2 id="rate"></h2>');
        $('body').append('<button id="refresh"> Refresh </button>');
        $('body').append('<p id="blurb"></p>');
        $('p').text(notWatchedObjects[rand].overview);
        $('h2').text(notWatchedObjects[rand].title);
        $('button[type="ready"]').empty();
        $('button[type="ready"]').remove();

        $('#rate').text(" Vote Average = " + notWatchedObjects[rand].vote_average);
        $('img').attr('src', 'http://image.tmdb.org/t/p/w185/' + notWatchedObjects[rand].poster_path);
        $('body').append('<iframe width="560" height="345" src="https://www.imdb.com/videoembed/vi2163260441"> </iframe>');
        // $('body').css("background-color", "#383838");
        // $('p').css("color", "white");

    
        $('#refresh').one("click", (function (event) {
            
            location.reload();
        }))
function autoPlayVideo(vcode, width, height){
  "use strict";
  $("#videoContainer").html('<iframe width="'+width+'" height="'+height+'" src="https://www.youtube.com/embed/'+vcode+'?autoplay=1&loop=1&rel=0&wmode=transparent" frameborder="0" allowfullscreen wmode="Opaque"></iframe>');
}

    })

    )


}) 