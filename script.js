
$(document).ready(function () {
    $(".card").hide()
    if (screen.width > 900) {
        $(".card").attr("class", "card horizontal")
    }

    $('select').formSelect();

    var output_plot = "";
    var accent = "";
    var sound_value;

    console.log($("#select").val());

    $("#submit-btn").on("click", function (event) {
        event.preventDefault();

        // document.addEventListener('DOMContentLoaded', function () {
        var elems = document.querySelectorAll('.fixed-action-btn');
        var instances = M.FloatingActionButton.init(elems, {
            direction: 'left'
        });
        // });
        // instances.open();
        // console.log($("#select").val());
        // console.log($("#test5").val());
        sound_value = parseInt($("#test5").val());


        // $(".card").show()
        console.log(event);
        var movie = $("#textarea1").val().trim();
        console.log("Querying for movie:" + movie);
        var queryURL = "https://www.omdbapi.com/?t=" + movie + "&apikey=7e894ee5";
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            if (response.Response == "False") {
                $('.modal').modal();
                $('#modal1').modal('open');
            }
            else {
                $(".card").show()
                console.log("Got reponse:" + response);
                output_plot = response.Plot;
                $(".card-content").text(output_plot);
                console.log(response);
                $("img").attr("src", response.Poster);
                $(".card-title").text(response.Title + " (" + response.Year + ")");

                if ($("#select").val() != 1 &&
                    $("#select").val() != 2 &&
                    $("#select").val() != 3 &&
                    $("#select").val() != 4 &&
                    $("#select").val() != 5) {
                    $('.modal').modal();
                    $('#modal2').modal('open');
                } else {

                    if ($("#select").val() == 1) {
                        accent = "en-au";
                    }
                    else if ($("#select").val() == 2) {
                        accent = "en-ca";
                    }
                    else if ($("#select").val() == 3) {
                        accent = "en-gb";
                    }
                    else if ($("#select").val() == 4) {
                        accent = "en-in";
                    }
                    else if ($("#select").val() == 5) {
                        accent = "en-us";
                    }
                    else {
                        accent = "en-us"
                    }
                }
            }
        });
        console.log(typeof ($("#select").val()));
    });


    $(".btn-floating").on("click", function () {
        console.log("working");
        var queryURL_rss = "http://api.voicerss.org/?key=68d5397c419d4cbea5dfe35a4fc712c8&hl=en-us&src=" + output_plot;
        var queryURL_rss = "http://api.voicerss.org/?";

        $.ajax({
            url: queryURL_rss,
            method: "GET"
        }).then(function (event) {
            // console.log("Output is " + event);
            $.speech({
                key: '56d46fda47404a73b8b4d0b4925d7eef',
                src: output_plot,
                hl: accent,
                r: sound_value,
                c: 'mp3',
                f: '44khz_16bit_stereo',
                ssml: false
            });
            console.log("Output is " + event);
        });
    })
});

