function init() {
    var input = $("#search-expandable2");
    var searchResult = document.getElementById("result");
    $("#search").on("click", function() {
        while (searchResult.lastChild) {
            searchResult.removeChild(searchResult.lastChild);
        }
        searchWiki(input.val());
    });
}

function searchWiki(input_val) {
    $.getJSON("https://en.wikipedia.org/w/api.php?action=query&format=json&gsrlimit=15&generator=search&origin=*&gsrsearch=" + input_val, function(data) {
        setSearchResult(data);
    });
}

function setSearchResult(result) {
    $.each(result.query.pages, function(i) {
        var add1 = '<div class="mdl-cell mdl-cell--8-col mdl-cell--6-col-phone mdl-color--white mdl-shadow--2dp"><a href="';
        var add2 = "https://en.wikipedia.org/?curid=" + result.query.pages[i].pageid + '" target="_blank" style="color:#607d8b; text-decoration: none; font-size: 1.8em">';
        var add3 = result.query.pages[i].title + '</a></div>';
        $(".mdl-grid").append(add1 + add2 + add3);
    });
}


$(document).ready(function() {
    init();
    $("#random").on("click", function() {
        window.open("https://en.wikipedia.org/wiki/Special:Random");
    });
});
