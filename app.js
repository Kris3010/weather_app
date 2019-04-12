// Getting Location with latitude and longitude
window.addEventListener('load', ()=> {
    let longitude; 
    let latitude;
    //let temperatureSection = document/querySelector(".degree");
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector(".temperature-degree");
    let locationTimezone = document.querySelector(".location-timezone");
    //const temperatureSpan = document.querySelector(".degree span");
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position =>{
        longitude= position.coords.longitude;
        latitude=position.coords.latitude;

        const proxy= "https://cors-anywhere.herokuapp.com/";
        const api =`${proxy}https://api.darksky.net/forecast/b1ccc9205fa1e612aaeba4f9506cacac/${latitude},${longitude}`;

        
        fetch(api)
          .then(response =>{

              return response.json();
          })
          .then(data =>{
              console.log(data);
              const {temperature , summary ,icon} = data.currently;
            //Set DOM Elements from the API 
             temperatureDegree.textContent = temperature;
             temperatureDescription.textContent= summary;
             locationTimezone.textContent = data.timezone;
              // Set icon
            setIcons(icon, document.querySelector('.icon'));


          
            
            


            });
          });
        
    
       

    function setIcons (icon, iconID){
        const skycon =new Skycons({color:"white"});
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycon.play();
        return skycon.set(iconID,Skycons[currentIcon]);
    }

  };
});

