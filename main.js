// (function (m, n, t, l, x, p, o) {
//     window["_fs_host"] = l;
//     window["_site_id"] = p;
//     window["_fs_id"] = x;
//     o = n.createElement(t);
//     o.type = "text/javascript";
//     o.async = true;
//     o.src = "http://localhost:9000/main-dev.js";
//     y = n.getElementsByTagName(t)[0];
//     y.parentNode.insertBefore(o, y);
// })(window, document, "script", "fullsession.io", '33499942', '4235dggd2');
var map = L.map('map').setView([51.505, -0.09], 13);

let area = [];
let clicksCounter = 0;

L.tileLayer('https://api.maptiler.com/maps/toner/256/{z}/{x}/{y}.png?key=r11GGACGHOIGD74xtrUt', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'your.mapbox.access.token'
}).addTo(map);



//latlng: D
// lat: 51.51107842114718
// lng: -0.0671306375122871


// var polygon = L.polygon([
//     [51.509, -0.08],
//     [51.503, -0.06],
//     [51.51, -0.047]
// ]).addTo(map);
map.on('click', (e) => {

    area[clicksCounter] = [e.latlng.lat, e.latlng.lng]
    clicksCounter++;

    if (clicksCounter == 4) {
        var polygon = L.polygon(area).addTo(map);

        clicksCounter = 0;
        document.getElementById('input').style.display = "block"

        document.getElementById('search').addEventListener('keydown', (e) => {
            if (e.key == "Enter") {

                console.log(document.getElementById('search').value, area);

                let body = { searchTerm: document.getElementById('search').value, points: area } // [[x, y], [x, y]] string

                console.log(body);

                fetch("http://example.com/api/endpoint/", {
                    method: "post",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },

                    //make sure to serialize your JSON body
                    body: JSON.stringify(body)
                })

            }
        })

    }



})

