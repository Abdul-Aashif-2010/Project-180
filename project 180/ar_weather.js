var coordinates = {};

$(document).ready(function () {
    get_coordinates()
    get_weather()
})

function get_weather() {
    $ajax({
        url:``,
        type:"get",
        success: function(response){
            let name = response.name
            let weather = response.weather[0].main
            $("#scene_container").append(
                <a-entity gps-entity-place = "latitude: ${steps[i].maneuver.location[1]}; longitude: ${steps[i].maneuver.location[0];">
                    <a-entity>
                        <a-text height="50" value="Weather forcast is ${weather} at ${name}"></a-text>
                    </a-entity>
                </a-entity>
            )
        }
    })
}

function get_coordinates() {
    var search = new URLSearchParams(window.location.search)

    if (search.has('source') && search.has('destination')) {
        source = search.get('source')
        destination = search.get('destination')

        coordinates.source_lat = source.split(";")[0]
        coordinates.source_lon = source.split(";")[0]

        coordinates.destination_lat = destination.split(";")[0]
        coordinates.destination_lon = destination.split(";")[0]

    }
    else {
        alert("Coordinates not selected!!")
        window.history.back()
    }
};


function renderElements() {
    $.ajax({
        url: `https://api.openweathermap.org/data/2.5/weather?lat=${coordinates.destination_lat}&lon=${coordinates.destination_lon}&appid=94212e971d0ca977303f8ae892224bbd`,
        type: "get",
        success: function (response) {
            let images = {
                "turn_right": "ar_right.png",
                "turn_left": "ar_left.png",
                "slight_right": "ar_slight_right.png",
                "slight_left": "ar_slight_left.png",
                "straight": "ar_straight.png"
            }
            var steps = response.routes[0].legs[0].steps

            for (var i = 0; i < steps.length; i++) {
                var image;

                var distance = steps[i].distance

                var instruction = steps[i].maneuver.instruction

                if (instruction.includes("Turn right")) {
                    image = "turn_right"
                }
                else if (instruction.includes("Turn left")) {
                    image = "turn_left"
                }
                if (i > 0) {
                    $("#scene_container").append(
                        `
                            <a-entity gps-entity-place="latitude: ${steps[i].maneuver.location[1]}; longitude: ${steps[i].maneuver.location[0]};">
                                <a-image 
                                    name="${instruction}"
                                    src="./assets/${images[image]}"
                                    look-at="#step_${i - 1}"
                                    scale="5 5 5"
                                    id="step_${i}"
                                    position="0 0 0"
                                >
                                </a-image>
                                <a-entity>
                                    <a-text height="50" value="${instruction} (${distance}m)"></a-text>
                                </a-entity>
                            </a-entity>
                        `
                    )
                }
                else {
                    $("#scene_container").append(
                        `
                            <a-entity gps-entity-place="latitude: ${steps[i].maneuver.location[1]}; longitude: ${steps[i].maneuver.location[0]};">
                                <a-image 
                                    name="${instruction}"
                                    src="./assets/ar_start.png"
                                    look-at="#step_${i + 1}"
                                    scale="5 5 5"
                                    id="step_${i}"
                                    position="0 0 0"
                                >
                                </a-image>
                                <a-entity>
                                    <a-text height="50" value="${instruction} (${distance}m)"></a-text>
                                </a-entity>
                            </a-entity>
                        `
                    )
                }
            }
        }
    })
}



