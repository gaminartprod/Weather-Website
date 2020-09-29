window.addEventListener("load", () => {

    let timezoneE       = document.getElementById('timezone');
    let descriptionE    = document.getElementById('description');
    let temperatureE    = document.querySelector('.temperature-value');
    let containerE      = document.querySelector('.temperature-container');
    let unitE           = document.querySelector('.temperature-container span');

    navigator.geolocation.getCurrentPosition(position => {
        
        let lat = position.coords.latitude;
        let long = position.coords.longitude;

        console.log("Latitude: " + lat);
        console.log("Longitude: " + long);

        const proxy = `https://cors-anywhere.herokuapp.com/`;
        const api = `${proxy}https://api.darksky.net/forecast/fd9d9c6418c23d94745b836767721ad1/${lat},${long}`;
        // const api = `https://api.darksky.net/forecast/fd9d9c6418c23d94745b836767721ad1/${lat},${long}`;
        
        let promise = fetch(api);
        
        promise
        .then(resolve => resolve.json())
        .then(data => {
            let { temperature, summary, icon } = data.currently;  
            let timezone = data.timezone;
            timezone = timezone.replace('_', " ");
            timezone = timezone.replace('/', ", ");

            descriptionE.textContent = summary;
            timezoneE.textContent = timezone;
            addSkyCons(icon, 'icon');

            // FORMULA FOR CELSIUS
            let celsius = (temperature - 32) * (5/9);

            containerE.addEventListener("click", () => {
                if(unitE.textContent === 'F'){
                    
                    unitE.textContent = 'C';
                    temperatureE.textContent = Math.floor(celsius);
                }
                else{
                    unitE.textContent = 'F';
                    temperatureE.textContent = temperature;
                }

            });
        });
    });

    function addSkyCons(iconStatus, iconID)
    {
        const skycon = new Skycons({color: "white" });
        iconStatus = iconStatus.replace(/-/g, '_').toUpperCase();
    
        skycon.play();
        skycon.set(iconID, Skycons[iconStatus]);
    } 
});