//when the page loads, will we get our location
window.addEventListener('load', () => {
  let long;
  let lat;
  let temperatureDescription = document.querySelector('.temperature-description');
  let temperatureDegree = document.querySelector('.temperature-degree');
  let locationTimezone = document.querySelector('.location-timezone');

  let temperatureSection = document.querySelector('.temperature');
  const temperatureSpan = document.querySelector('.temperature span');

  if (navigator.geolocation){
      navigator.geolocation.getCurrentPosition(position =>{
        console.log(position);
        long = position.coords.longitude;
        lat = position.coords.latitude;

        const proxy = 'https://cors-anywhere.herokuapp.com/';
        const api = `${proxy}https://api.darksky.net/forecast/4c725f9f9187f4447e2e15700ce4732d/${lat},${long}`;

        fetch(api)
        .then(response =>{
          return response.json();
        })
        .then(data =>{
          console.log(data);
          const {temperature, summary, icon} = data.currently;
          //set DOM elements from the api
          temperatureDegree.textContent = temperature;
          temperatureDescription.textContent = summary;
          locationTimezone.textContent = data.timezone;

          //set icon
          setIcons(icon, document.querySelector('.icon'));

          //Change temp to Celcius/Farenheit
          temperatureSection.addEventListener('click', () =>{
            if(temperatureSpan.textContent == "F"){
              temperatureSpan.textContent = "C";
            }else{
              temperatureSpan.textContent = "F";

            }
          })
        })

      });

  }

  function setIcons(icon, iconID){
      const skycons = new Skycons({color: "yellow"});
      const currentIcon = icon.replace(/-/g, "_").toUpperCase();
      skycons.play();
      return skycons.set(iconID, Skycons[currentIcon]);
  }
});
