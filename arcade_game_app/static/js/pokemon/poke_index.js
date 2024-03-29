$(document).ready(function(){
//New or Load game
    $('#load_game').on('click', function (){
        window.location.href = "/pokemon/load_game/";
    });
    $('#gotoNewGame').on('click', function (){
        window.location.href = "/pokemon/new_game/";
    });

    $('#new_game').on('click', function () {
        window.location.href = "/pokemon/new_game/";
    });

    //new game: choose 1 pokemon in new game
    $( "#dialog" ).mouseenter(function() {
        $( this ).fadeTo("slow", 1);
    });

    $('#dialog').on('click', function () {
        $('#dialog2').show();
        $('#dialog_oak').show();
        setTimeout("$('#dialog2').hide();", 2500);
        setTimeout("$('#dialog').hide();", 2500);
        setTimeout(chooseOneAni, 3000);
    });

    function chooseOneAni() {
        $('#team').show();
        $('#save_new_team').hide();
        $('.battle_start').hide();
        $('#throw').show();
        $('#throw_text').show();
        setTimeout("$('#throw').hide();", 2500);
        setTimeout("$('#throw_text').hide();", 2500);
        setTimeout(chooseOne, 2700);
        setTimeout("$('#save_new_team').show();", 2700);
    }


    function chooseOne() {
        pokemonData = [];
        $('#sprites').html("<p><input id='teamname' type='text' placeholder='Team Name'></input></p>");
        var ranNumber = Math.floor(Math.random()*718 + 2);
        $.ajax({
            url: "http://pokeapi.co/api/v1/sprite/" + ranNumber + "/",
            type: "GET",
            dataType: "jsonp",
            success: function(data) {
                pokeResponse = data;
                name = data.pokemon.name;
                pokedex_id = data.id - 1;
                image = data.image;
                var spriteUrl = 'http://pokeapi.co/' + data.image;
                $('#sprites').append("<div class='pokebox'><img class='pokemon' src=" +
                    spriteUrl + "/><div class='name'>" + name + "</div><div class='id'>" +
                    pokedex_id + "</div></div>");
                pokemonData.push ({
                    pokedex_id: pokedex_id,
                    image: image,
                    name: name
                });
            }
        });
    }

//new game: save new team (with one pokemon) to database
    $('#save_new_team').on('click', function() {
        $('#save_new_team').hide();
        $('.battle_start').show();
        var teamName = $("#teamname").val();
        $('#teamname').css('visibility', 'hidden');
        localStorage.setItem("store_team", teamName);
        for (i=0;i<pokemonData.length;i++) {
            pokemonData[i].team = teamName;
        }
        pokemo = JSON.stringify(pokemonData);
        $.ajax({
            url: '/new_pokemon/',
            type: 'POST',
            dataType: 'json',
            data: pokemo
        });
    });

//new game & load game: battle start
    $(document).on('click', '.battle_start', function(){
        window.location.href = "/pokemon/battle/";
    });


//load game: show all teams with their pokemons
    $.ajax({
        url: '/all_your_team/',
        type: "GET",
        dataType: "json",
        success: function(data) {
            $('#team_show').append("<table><tbody class='row_show'>" +
                "</tbody></table>");
            for (i=0; i<data.length; i++) {
                teamName = data[i].name;
                teamId = data[i].id;
                $('.row_show').append("<tr>" +
                    "<td class='button_position'><button class='teambutton btn btn-success' value='" + teamName + "'>" + teamName +"</button></td>" +
                    "<td id='team" + i + "'></td>" +
                    "</tr>"
                );
                for (x=0; x<data[i].pokemons.length; x++) {
                    pokeName = data[i].pokemons[x].name;
                    pokeImage = data[i].pokemons[x].image;
                    pokeDex_id = data[i].pokemons[x].pokedex_id;
                    var spriteUrl = 'http://pokeapi.co/' + pokeImage;
                    var teamTD = "#team" + i;
                    $(teamTD).append("<div class='pokebox'><img class='f_pokemon' src=" + spriteUrl + "/><div class='name'>" + pokeName + "</div><div class='id'>" +
                        pokeDex_id + "</div></div>");
                }
            }
        }
    });


    //new game & load game: check the team and go to battle
    $(document).on('click', '.teambutton', function(){
        $('.battle_start').show();
        $('.battle_start').html("<button class='battle_start btn btn-warning'>Let\'s battle!</button>");
        var teamName = $(this).val();
        localStorage.setItem("store_team", teamName);
    });
});