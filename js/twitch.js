var users = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "habathcx", "RobotCaleb", "noobs2ninjas"];
function addCards(username) {
    $.getJSON("https://wind-bow.gomix.me/twitch-api/streams/" + username + "?callback=?", function(data) {
        var add1 = '<div class="mdl-card mdl-cell mdl-cell--8-col mdl-cell--6-col-phone mdl-shadow--4dp"><div class="mdl-card__media">';
        if (data.stream === null) {
            var add5 = 'Offline' + '</div></div>';
        } else {
            var add5 = data.stream.game + data.stream.channel.status + '</div></div>';
        }
        $.getJSON("https://wind-bow.gomix.me/twitch-api/channels/" + username + "?callback=?", function(data) {
            var add2 = '<img src="' + data.logo + '"></div><div class="mdl-card__title"><a href="';
            var add3 = data.url + '" target="_blank"><h2 class="mdl-card__title-text">';
            var add4 = data.display_name + '</h2></a></div><div class="mdl-card__supporting-text">';
            $(".mdl-grid").append(add1 + add2 + add3 + add4 + add5);
        });
    });
}

$(document).ready(function() {
    users.forEach(function(user) {
        addCards(user);
    });
});
