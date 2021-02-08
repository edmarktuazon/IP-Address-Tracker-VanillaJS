// pull from different file

const ip_geo_api = 'https://geo.ipify.org/api/v1?apiKey=at_95b7zmGOSnRRWLFA7rh4CXx8jZa4u&ipAddress=8.8.8.8'


// elements to update 
const display_ip = document.getElementById('given_ip')
const display_location = document.getElementById('given_location')
const display_time = document.getElementById('given_time')
const display_isp = document.getElementById('given_isp')

// form elements 
const search_ip = document.getElementById('ip_address') 
const submit_btn = document.getElementById('submit_btn')



const map = L.map('display_map', {
    'center': [0,0],
    'zoom': 0,
    'layers': [
        L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          })
    ]
})

updateMarker = (update_marker = [-33.665, 18.993]) => {
    map.setView(update_marker, 13);
    L.marker(update_marker).addTo(map);
}

document.addEventListener('load', updateMarker())

submit_btn.addEventListener('click', e => {
    e.preventDefault()
    if (search_ip.value != '' && search_ip.value != null) {
    getIPDetails(search_ip.value)
    return
}

alert("Please enter a valid IP address");
})

// Get the data using fetching API
getIPDetails = (default_ip) => {
    if(default_ip == undefined){
        var ip_add = `${ip_geo_api}?apiKey`
    }
    else {
        var ip_add  = `${ip_geo_api}?apiKey=&ipAddress=${default_ip}`
    }
    fetch(ip_add)
    .then( results => results.json())
    .then( data => {
        display_ip.innerHTML = data.ip
        display_location.innerHTML = `${data.location.city} ${data.location.country} ${data.location.postalCode}`
        display_time.innerHTML = data.location.timezone
        display_isp.innerHTML = data.isp

        // update map marker 
        updateMarker([data.location.lat, data.location.lng])
    })
    .catch(error => {
        alert("Unable to get IP details")
        console.log(error)
       
    })
}



