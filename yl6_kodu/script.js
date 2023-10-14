(function() {
    "use strict";
    
    //clock

    document.addEventListener("DOMContentLoaded", function() {
        
        let c = document.getElementById("clock");
       
        //setTimeout(updateClock, 2000);
        setInterval(updateClock, 1000);
        
        function updateClock() {
            
            let date = new Date();
            let h = date.getHours();
            let m = date.getMinutes();
            let s = date.getSeconds();

            if(h >12){
                h = h - 12;
            }

            if(h == 0){
                h = 12;
            }

            if (h < 10) {
                h = "0" + h;
            }

            if (m < 10) {
                m = "0" + m;
            }

            if (s < 10) {
                s = "0" + s;
            }

            c.innerHTML = h + ":" + m + ":" + s;
            
        };
        
    });
    
    // forms
    
    document.getElementById("form").addEventListener("submit", estimateDelivery);
    
    let e = document.getElementById("delivery");
    let eesnimi = document.getElementById("fname");
    let perenimi = document.getElementById("lname");
    e.innerHTML = "0,00 &euro;";
    
    function estimateDelivery(event) {
        event.preventDefault();
        
        let linn = document.getElementById("linn");
        var regEx = /^[a-zA-ZáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ -]+$/;
        
        if (linn.value === "" || eesnimi.value=== "" || perenimi.value=== "" || !eesnimi.value.match(regEx)|| !perenimi.value.match(regEx)) {
            
            alert("Palun kontrollige, et eesnimi, perekonnanimi ja linn oleks korrektselt täidetud.");
            
            linn.focus();
            
            return;
            
            
        } 
       
        else if (linn.value === "tln"){ e.innerHTML = "0,00 &euro;";}
        else if (linn.value === "trt"){ e.innerHTML = "2,50 &euro;";}
        else if (linn.value === "nrv"){ e.innerHTML = "2,50 &euro;";}
        else { e.innerHTML = "3,00 &euro;";}
            
        
        console.log("Tarne hind on arvutatud");
    }
    
})();



// map

let mapAPIKey = "AjQvHLUTOza9WmMCo-RVb7S7cFjaAhH6hjeCk9ufJs2LUTJABfu6Ur1zBK_mCjix";

let map, infobox;

function GetMap() {
    
    "use strict";

    let ut = new Microsoft.Maps.Location(
            58.38104, 
            26.71992
        );
    let elva = new Microsoft.Maps.Location(
        58.2285385, 
        26.416399
    );
    let centerPoint = new Microsoft.Maps.Location(
        58.30119,
        26.59213

    );

    map = new Microsoft.Maps.Map("#map", {
        center: centerPoint,
        zoom: 10,
        mapTypeId: Microsoft.Maps.MapTypeId.road,
        disablePanning: false,
        allowInfoboxOverflow: true
    });

        //Create an infobox at the center of the map but don't show it.
        infobox = new Microsoft.Maps.Infobox(ut, {
            visible: false
        });

        //Assign the infobox to a map instance.
        infobox.setMap(map);
    
        let pushpin = new Microsoft.Maps.Pushpin(ut);
        pushpin.metadata = {
                title: 'Tartu Ülikool',
                description: 'Eesti vanim ülikool'
            }

    let pushpin_elva = new Microsoft.Maps.Pushpin(elva);  
    pushpin_elva.metadata = {
            title: 'Elva',
            description: 'Väikelinn'
 
         }   
    Microsoft.Maps.Events.addHandler(pushpin, 'click', pushpinClicked);   
    Microsoft.Maps.Events.addHandler(pushpin_elva, 'click', pushpinClicked);       

    map.entities.push(pushpin);
    map.entities.push(pushpin_elva);


  

}

function pushpinClicked(e) {
    //Make sure the infobox has metadata to display.
    if (e.target.metadata) {
        //Set the infobox options with the metadata of the pushpin.
        infobox.setOptions({
            location: e.target.getLocation(),
            title: e.target.metadata.title,
            description: e.target.metadata.description,
            visible: true
        });
    }
}

// https://dev.virtualearth.net/REST/v1/Locations?q=1000 Vin Scully Ave, Los Angeles,CA&key=YOUR_KEY_HERE

