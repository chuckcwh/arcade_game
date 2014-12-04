$(document).ready(function(){
var pokeResponse, pokemon = {};
var pokemonData = [];


    $( ".home_img" ).hover(function() {
        $( this ).fadeTo("slow", 1);
        }, function() {
        $( this ).fadeTo( "slow" , 0.2);
        }
    );

    $("#home_pokemon").on('click', function() {
        window.location.href = "/pokemon/";
    });
    $("#home_snake").on('click', function() {
        window.location.href = "/snake/";
    });
    $("#home_paint").on('click', function() {
        window.location.href = "/paint/";
    });


});
