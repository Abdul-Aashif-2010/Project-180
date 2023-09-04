var coordinates = {};

$(document).ready(function () {
    get_coordinates()
})

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